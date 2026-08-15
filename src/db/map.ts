import { companies as seedCompanies } from '@/features/companies/data-access/companies'
import type { Story } from '@/features/signals/data-access/stories'
import type { StoryRow } from './schema'

export function companyIdForName(name: string) {
  return seedCompanies.find((company) => company.name === name)?.id ?? null
}

export function parseDisplayDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Could not parse date: ${value}`)
  }
  return parsed
}

export function formatStoryDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function mapStory(row: StoryRow): Story {
  return {
    id: row.id,
    company: row.company,
    category: row.category as Story['category'],
    date: formatStoryDate(row.date),
    title: row.title,
    summary: row.summary,
    source: row.source,
    url: row.url,
    metric: row.metric,
    metricLabel: row.metricLabel,
    accent: row.accent,
  }
}
