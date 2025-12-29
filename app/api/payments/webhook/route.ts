import type { NextRequest } from 'next/server'
import { webhook } from '@/lib/server/controllers/payments-controller'

export async function POST(request: NextRequest) {
  return webhook(request)
}

