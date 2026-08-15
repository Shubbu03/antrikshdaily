import { createHash } from 'node:crypto'
import { companies } from '@/features/companies/data-access/companies'
import { stories } from '@/features/signals/data-access/stories'
import { getDb } from './index'
import { companyIdForName, parseDisplayDate } from './map'
import { fetchFeed } from './rss'
import { companiesTable, storiesTable } from './schema'
import { rssSources } from './sources'

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
      },
    })
  }

  let upserted = 0
  for (const story of stories) {
    await db.insert(storiesTable).values({
      id: story.id,
      companyId: companyIdForName(story.company),
      company: story.company,
      category: story.category,
      date: parseDisplayDate(story.date),
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
        date: parseDisplayDate(story.date),
        metric: story.metric,
        metricLabel: story.metricLabel,
        accent: story.accent,
      },
    })
    upserted += 1
  }

  let fetched = 0
  let skippedFeeds = 0
  for (const source of rssSources) {
    try {
      const items = await fetchFeed(source.url)
      for (const item of items) {
        await db.insert(storiesTable).values({
          id: storyIdFromUrl(item.url),
          companyId: source.companyId,
          company: source.company,
          category: source.category,
          date: item.date,
          title: item.title,
          summary: item.summary || item.title,
          source: source.source,
          url: item.url,
          metric: '',
          metricLabel: 'Source update',
          accent: source.accent,
        }).onConflictDoNothing({ target: storiesTable.url })
        fetched += 1
      }
    } catch (error) {
      skippedFeeds += 1
      console.warn(error instanceof Error ? error.message : error)
    }
  }

  return { companies: companies.length, upserted, fetched, skippedFeeds }
}

if (import.meta.main) {
  ingest()
    .then((result) => {
      console.log(
        `Ingest complete. companies=${result.companies} seedStories=${result.upserted} feedItemsSeen=${result.fetched} feedsSkipped=${result.skippedFeeds}`,
      )
    })
    .catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : error)
      process.exit(1)
    })
}
