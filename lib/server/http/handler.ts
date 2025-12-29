import type { NextRequest } from 'next/server'
import { toErrorResponse } from './errors'

export type RouteHandler = (req: NextRequest) => Promise<Response>

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req) => {
    try {
      return await handler(req)
    } catch (err) {
      return toErrorResponse(err)
    }
  }
}


