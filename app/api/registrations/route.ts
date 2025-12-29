import type { NextRequest } from 'next/server'
import { postRegistration } from '@/lib/server/controllers/registrations-controller'

export async function POST(request: NextRequest) {
  return postRegistration(request)
}

