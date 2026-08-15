import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || null
}

const globalForDb = globalThis as typeof globalThis & {
  pg?: ReturnType<typeof postgres>
}

export function hasDatabase() {
  return Boolean(getDatabaseUrl())
}

export function getDb() {
  const url = getDatabaseUrl()
  if (!url) return null

  const client = globalForDb.pg ?? postgres(url, { max: 1 })
  if (process.env.NODE_ENV !== 'production') {
    globalForDb.pg = client
  }

  return drizzle(client, { schema })
}
