import { NextResponse } from 'next/server'
import { listCompanies } from '@/db/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const companies = await listCompanies()
  return NextResponse.json({ companies })
}
