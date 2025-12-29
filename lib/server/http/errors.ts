import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class AppError extends Error {
  readonly status: number
  readonly code: string
  readonly expose: boolean

  constructor(message: string, opts: { status: number; code: string; expose?: boolean }) {
    super(message)
    this.name = 'AppError'
    this.status = opts.status
    this.code = opts.code
    this.expose = opts.expose ?? true
  }
}

export function badRequest(message: string) {
  return new AppError(message, { status: 400, code: 'bad_request' })
}

export function unauthorized(message = 'Unauthorized') {
  return new AppError(message, { status: 401, code: 'unauthorized' })
}

export function internalError(message = 'Internal server error') {
  return new AppError(message, { status: 500, code: 'internal_error', expose: false })
}

function fromUnknownError(err: unknown): AppError {
  if (err instanceof AppError) return err
  if (err instanceof ZodError) return new AppError('Validation failed', { status: 400, code: 'validation_failed' })
  return internalError()
}

/**
 * Centralized API error mapping. Keeps error payloads stable and avoids leaking internals.
 * Note: For Zod validation we keep the existing `{ error, details }` shape used by the UI.
 */
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ZodError) {
    return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 })
  }

  const appErr = fromUnknownError(err)
  const message = appErr.expose ? appErr.message : 'Internal server error'
  return NextResponse.json({ error: message }, { status: appErr.status })
}


