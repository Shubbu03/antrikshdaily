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

function getClient() {
  const url = getDatabaseUrl()
  if (!url) return null

  globalForDb.pg ??= postgres(url, { max: 1 })
  return globalForDb.pg
}

export function getDb() {
  const client = getClient()
  if (!client) return null
  return drizzle(client, { schema })
}

export async function closeDb() {
  if (!globalForDb.pg) return
  await globalForDb.pg.end({ timeout: 5 })
  globalForDb.pg = undefined
}
