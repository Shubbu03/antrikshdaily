import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const companiesTable = pgTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  focus: text('focus').notNull(),
  stage: text('stage').notNull(),
  founded: text('founded').notNull(),
  summary: text('summary').notNull(),
  building: text('building').array().notNull().default([]),
  win: text('win').notNull(),
  url: text('url').notNull(),
  accent: text('accent').notNull(),
  initials: text('initials').notNull(),
  xHandle: text('x_handle'),
})

export const storiesTable = pgTable('stories', {
  id: text('id').primaryKey(),
  companyId: text('company_id').references(() => companiesTable.id),
  company: text('company').notNull(),
  category: text('category').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  source: text('source').notNull(),
  url: text('url').notNull().unique(),
  metric: text('metric').notNull().default(''),
  metricLabel: text('metric_label').notNull().default(''),
  accent: text('accent').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('stories_date_idx').on(table.date),
])

export type CompanyRow = typeof companiesTable.$inferSelect
export type StoryRow = typeof storiesTable.$inferSelect
