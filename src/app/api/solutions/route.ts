import { db } from '@/db'
import { systems } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await db.select().from(systems)
  return NextResponse.json(result)
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = await db.insert(systems).values(body).returning()
  return NextResponse.json(result)
}