import type { ContactInput } from '@/lib/server/schemas/contact'
import { insertContactMessage } from '@/lib/server/repos/contact-repo'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactMessage(input: ContactInput & { userAgent: string | null; ip: string | null }) {
  const result = await insertContactMessage(input)

  if (!result.error && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: 'Eraya Contact <onboarding@resend.dev>',
        to: ['festjntuh@gmail.com'],
        subject: `New Contact: ${input.name}`,
        html: `
          <h2>New Message from Eraya Website</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Phone:</strong> ${input.phone}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
        `,
        replyTo: input.email
      })
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError)
      // Continue execution, don't fail the request just because email failed
    }
  }

  return result
}


