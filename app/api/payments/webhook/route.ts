import type { NextRequest } from 'next/server'
import { webhook } from '@/lib/server/controllers/payments-controller'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  return webhook(request)
}

