import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn("⚠️ RESEND_API_KEY is missing in environment variables. Email sending will fail.");
}

// Use a dummy key during build/dev if missing to prevent initialization errors
export const resend = new Resend(apiKey || 're_123456789');
