import type { NextRequest } from 'next/server'
import { postContact } from '@/lib/server/controllers/contact-controller'

export async function POST(request: NextRequest) {
  return postContact(request)
}

