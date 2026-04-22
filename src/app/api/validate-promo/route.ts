import { NextRequest, NextResponse } from 'next/server'
import { validatePromoCode } from '@/lib/promo'

// Simple in-memory rate limiter (per serverless instance — best-effort brute-force protection)
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { valid: false, error: 'Too many requests.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const code = typeof body?.code === 'string' ? body.code.trim() : ''

    if (!code) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const discount = validatePromoCode(code)

    if (discount > 0) {
      return NextResponse.json({ valid: true, discount })
    }
    return NextResponse.json({ valid: false })
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
