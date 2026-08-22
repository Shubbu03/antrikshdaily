import { createHash } from 'node:crypto'
import { eq, lt } from 'drizzle-orm'
import { companies } from '@/features/companies/data-access/companies'
import { stories } from '@/features/signals/data-access/stories'
import { closeDb, getDb } from './index'
import { companyIdForName, parseDisplayDate } from './map'
import { storyCategoryFor } from './match-company'
import { fetchNewsroom } from './newsrooms'
import { fetchFeed, type RssItem } from './rss'
import { companiesTable, storiesTable } from './schema'
import { newsSources, type NewsSource } from './sources'
import {
  acceptFetchedStory,
  dedupeStories,
  isFreshStory,
  resolveGoogleNewsStory,
  storiesAreDuplicates,
  storyCutoffDate,
} from './story-filter'

function storyIdFromUrl(url: string) {
  return createHash('sha1').update(url).digest('hex').slice(0, 16)
}

export async function ingest() {
  const db = getDb()
  if (!db) {
    throw new Error('DATABASE_URL is not set')
  }

  for (const company of companies) {
    await db.insert(companiesTable).values(company).onConflictDoUpdate({
      target: companiesTable.id,
      set: {
        name: company.name,
        city: company.city,
        focus: company.focus,
        stage: company.stage,
        founded: company.founded,
        summary: company.summary,
        building: company.building,
        win: company.win,
        url: company.url,
        accent: company.accent,
        initials: company.initials,
        xHandle: company.xHandle,
      },
    })
  }

  await db.delete(storiesTable).where(eq(storiesTable.metricLabel, 'Source update'))
  await db.delete(storiesTable).where(lt(storiesTable.date, storyCutoffDate()))

  let upserted = 0
  const keptSeed: IncomingStory[] = []
  for (const story of stories) {
    const date = parseDisplayDate(story.date)
    if (!isFreshStory(date)) continue

    await db.insert(storiesTable).values({
      id: story.id,
      companyId: companyIdForName(story.company),
      company: story.company,
      category: story.category,
      date,
      title: story.title,
      summary: story.summary,
      source: story.source,
      url: story.url,
      metric: story.metric,
      metricLabel: story.metricLabel,
      accent: story.accent,
    }).onConflictDoUpdate({
      target: storiesTable.url,
      set: {
        title: story.title,
        summary: story.summary,
        source: story.source,
        category: story.category,
        date,
        metric: story.metric,
        metricLabel: story.metricLabel,
        accent: story.accent,
      },
    })
    keptSeed.push({
      companyId: companyIdForName(story.company),
      company: story.company,
      category: story.category,
      date,
      title: story.title,
      summary: story.summary,
      source: story.source,
      url: story.url,
      accent: story.accent,
    })
    upserted += 1
  }

  let fetched = 0
  let inserted = 0
  let skippedFeeds = 0
  const incoming: IncomingStory[] = []
  for (const source of newsSources) {
    try {
      const items = await collectSourceItems(source)
      fetched += items.length
      incoming.push(...items)
    } catch (error) {
      skippedFeeds += 1
      console.warn(error instanceof Error ? error.message : error)
    }
  }

  const unique = dedupeStories(incoming).filter((item) => (
    !keptSeed.some((seed) => seed.url === item.url || storiesAreDuplicates(seed, item))
  ))

  for (const item of unique) {
    const written = await db.insert(storiesTable).values({
      id: storyIdFromUrl(item.url),
      companyId: item.companyId,
      company: item.company,
      category: item.category,
      date: item.date,
      title: item.title,
      summary: item.summary,
      source: item.source,
      url: item.url,
      metric: '',
      metricLabel: 'Source update',
      accent: item.accent,
    }).onConflictDoNothing({ target: storiesTable.url }).returning({ id: storiesTable.id })
    inserted += written.length
  }

  return { companies: companies.length, upserted, fetched, inserted, skippedFeeds }
}

type IncomingStory = {
  companyId: string | null
  company: string
  category: NewsSource['category']
  date: Date
  title: string
  summary: string
  source: string
  url: string
  accent: string
}

async function collectSourceItems(source: NewsSource): Promise<IncomingStory[]> {
  const raw = source.kind === 'html' && source.parseHtml
    ? await fetchNewsroom(source.url, source.parseHtml)
    : await fetchFeed(source.url)

  const ranked = [...raw].sort((left, right) => right.date.getTime() - left.date.getTime())
  const items: IncomingStory[] = []

  for (const item of ranked) {
    const mapped = mapIncomingStory(source, item)
    if (!mapped) continue
    items.push(mapped)
    if (items.length >= source.maxItems) break
  }

  return items
}

function mapIncomingStory(source: NewsSource, item: RssItem): IncomingStory | null {
  if (source.kind === 'google-news') {
    if (!acceptFetchedStory({
      title: item.title,
      summary: item.summary,
      date: item.date,
      requireCompanyInTitle: true,
      allowIndustry: true,
    })) return null

    const resolved = resolveGoogleNewsStory(item.title, item.summary)
    if (!resolved) return null

    return {
      companyId: resolved.companyId,
      company: resolved.company,
      category: resolved.category,
      date: item.date,
      title: item.title,
      summary: item.summary || item.title,
      source: item.publication || source.source,
      url: item.url,
      accent: resolved.accent,
    }
  }

  if (!acceptFetchedStory({
    title: item.title,
    summary: item.summary,
    date: item.date,
    officialCompany: source.company,
  })) return null

  const company = companies.find((entry) => entry.id === source.companyId) ?? null

  return {
    companyId: source.companyId,
    company: source.company,
    category: company ? storyCategoryFor(company, item.title) : source.category,
    date: item.date,
    title: item.title,
    summary: item.summary || item.title,
    source: source.source,
    url: item.url,
    accent: source.accent,
  }
}

if (import.meta.main) {
  try {
    const result = await ingest()
    console.log(
      `Ingest complete. companies=${result.companies} seedStories=${result.upserted} feedItemsSeen=${result.fetched} feedItemsInserted=${result.inserted} feedsSkipped=${result.skippedFeeds}`,
    )
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  } finally {
    await closeDb()
    process.exit(process.exitCode ?? 0)
  }
}
