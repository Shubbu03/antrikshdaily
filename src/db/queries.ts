import { desc } from 'drizzle-orm'
import { companies as seedCompanies } from '@/features/companies/data-access/companies'
import { stories as seedStories } from '@/features/signals/data-access/stories'
import { getDb } from './index'
import { mapStory } from './map'
import { companiesTable, storiesTable } from './schema'

export async function listCompanies() {
  const db = getDb()
  if (!db) return seedCompanies

  const rows = await db.select().from(companiesTable).orderBy(companiesTable.name)
  return rows.length > 0 ? rows : seedCompanies
}

export async function listStories() {
  const db = getDb()
  if (!db) return seedStories

  const rows = await db.select().from(storiesTable).orderBy(desc(storiesTable.date))
  return rows.length > 0 ? rows.map(mapStory) : seedStories
}
