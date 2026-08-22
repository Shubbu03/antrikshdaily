import { desc, gte } from 'drizzle-orm'
import { companies as seedCompanies, type Company } from '@/features/companies/data-access/companies'
import { stories as seedStories } from '@/features/signals/data-access/stories'
import { getDb } from './index'
import { mapStory, parseDisplayDate } from './map'
import { companiesTable, storiesTable, type CompanyRow } from './schema'
import { isFreshStory, storyCutoffDate } from './story-filter'

function mapCompany(row: CompanyRow): Company {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    focus: row.focus,
    stage: row.stage,
    founded: row.founded,
    summary: row.summary,
    building: row.building,
    win: row.win,
    url: row.url,
    accent: row.accent,
    initials: row.initials,
    xHandle: row.xHandle,
  }
}

export async function listCompanies() {
  const db = getDb()
  if (!db) return seedCompanies

  const rows = await db.select().from(companiesTable).orderBy(companiesTable.name)
  return rows.length > 0 ? rows.map(mapCompany) : seedCompanies
}

function recentSeedStories() {
  return seedStories
    .filter((story) => isFreshStory(parseDisplayDate(story.date)))
    .sort((left, right) => parseDisplayDate(right.date).getTime() - parseDisplayDate(left.date).getTime())
}

export async function listStories() {
  const db = getDb()
  if (!db) return recentSeedStories()

  const rows = await db.select().from(storiesTable)
    .where(gte(storiesTable.date, storyCutoffDate()))
    .orderBy(desc(storiesTable.date))
  return rows.length > 0 ? rows.map(mapStory) : recentSeedStories()
}
