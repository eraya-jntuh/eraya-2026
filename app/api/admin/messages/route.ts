import type { NextRequest } from 'next/server'
import { getAdminMessages } from '@/lib/server/controllers/admin-controller'

export async function GET(request: NextRequest) {
  return getAdminMessages(request)
}


