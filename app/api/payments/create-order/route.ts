import type { NextRequest } from 'next/server'
import { createOrder } from '@/lib/server/controllers/payments-controller'

export async function POST(request: NextRequest) {
  return createOrder(request)
}

