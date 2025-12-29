import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/server/http/handler'
import { registrationSchema } from '@/lib/server/schemas/registration'
import { getRequestIp, getUserAgent } from '@/lib/server/http/request'
import { submitRegistration } from '@/lib/server/services/registrations-service'
import { rateLimiters } from '@/lib/server/http/rate-limit'

export const postRegistration = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.registration(req, async () => {
    const body = await req.json()
    const parsed = registrationSchema.parse(body)

    const result = await submitRegistration({
      ...parsed,
      userAgent: getUserAgent(req),
      ip: getRequestIp(req),
    })

    // Handle idempotency: return cached response if available
    if (result.cachedResponse) {
      return NextResponse.json(result.cachedResponse.body, { status: result.cachedResponse.status })
    }

    // Handle errors
    if (!result.success) {
      // Check for duplicate registration error (unique constraint violation)
      if (result.error?.includes('23505') || result.error?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'You have already registered for this event with this email address' },
          { status: 409 }
        )
      }

      // Check for event validation errors
      if (result.error?.includes('not found') || result.error?.includes('inactive')) {
        return NextResponse.json({ error: result.error }, { status: 404 })
      }

      console.error('Registration error:', result.error)
      return NextResponse.json(
        { error: result.error || 'Failed to save registration. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        entryFee: result.entryFee, // Return server-calculated fee for confirmation
      },
      { status: 201 }
    )
  })
})


