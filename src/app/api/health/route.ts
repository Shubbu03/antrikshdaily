import { NextResponse } from 'next/server'
import { hasDatabase } from '@/db'

export function GET() {
  return NextResponse.json({
    ok: true,
    database: hasDatabase(),
  })
}
