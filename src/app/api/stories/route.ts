import { NextResponse } from 'next/server'
import { listStories } from '@/db/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const stories = await listStories()
  return NextResponse.json({ stories })
}
