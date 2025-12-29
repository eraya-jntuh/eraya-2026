import type { NextRequest } from 'next/server'
import { getAdminRegistrations } from '@/lib/server/controllers/admin-controller'

export async function GET(request: NextRequest) {
  return getAdminRegistrations(request)
}


