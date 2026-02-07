import { resend } from "@/lib/email/client";

const FROM_EMAIL = "Eraya 2026 <no-reply@eraya.org>"; // Replace with verified domain if available, or use testing one

export const EmailService = {
  async sendRegistrationEmail(email: string, name: string, eventName: string, registrationId: string) {
    if (!process.env.RESEND_API_KEY) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${registrationId}`;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Start the Ritual: Entry Pass for ${eventName}`,
        html: `
          <div style="font-family: sans-serif; color: #1a0a0f; background-color: #fdf5e6; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d4af37; padding: 20px; border-radius: 8px;">
              <h1 style="color: #8b1538; text-align: center; font-family: 'Times New Roman', serif;">Welcome to ERAYA 2026</h1>
              <p>Dear ${name},</p>
              <p>Your place in the circle is secured. You have successfully registered for <strong>${eventName}</strong>.</p>
              <div style="text-align: center; margin: 30px 0; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <p style="margin-bottom: 15px; font-weight: bold; color: #8b1538;">YOUR ENTRY PASS QR CODE</p>
                <img src="${qrUrl}" alt="Entry Pass QR Code" style="width: 200px; height: 200px; border: 2px solid #d4af37; border-radius: 4px;" />
                <p style="font-size: 12px; color: #666; margin-top: 10px;">ID: ${registrationId}</p>
              </div>
              <p>Present this QR code at the venue entry. Prepare yourself for the experience that awaits at JNTU Hyderabad on February 26-27, 2026.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://eraya.org/dashboard" style="background-color: #8b1538; color: #d4af37; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Your Ticket</a>
              </div>
              <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
                © 2026 Eraya. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });
      console.log(`📧 Registration email sent to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send registration email:", error);
    }
  },

  async sendPaymentSuccessEmail(email: string, name: string, amount: number, orderId: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Offering Accepted: Payment Receipt for Order ${orderId}`,
        html: `
          <div style="font-family: sans-serif; color: #1a0a0f; background-color: #fdf5e6; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d4af37; padding: 20px; border-radius: 8px;">
              <h1 style="color: #8b1538; text-align: center; font-family: 'Times New Roman', serif;">Payment Successful</h1>
              <p>Dear ${name},</p>
              <p>Your offering has been accepted. We have received your payment of <strong>₹${amount}</strong>.</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://eraya.org/dashboard" style="background-color: #8b1538; color: #d4af37; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Dashboard</a>
              </div>
              <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
                © 2026 Eraya. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });
      console.log(`📧 Payment success email sent to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send payment email:", error);
    }
  },

  async sendPaymentFailedEmail(email: string, name: string, orderId: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Action Required: Payment Failed for Order ${orderId}`,
        html: `
          <div style="font-family: sans-serif; color: #1a0a0f; background-color: #fdf5e6; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #8b1538; padding: 20px; border-radius: 8px;">
              <h1 style="color: #8b1538; text-align: center; font-family: 'Times New Roman', serif;">Payment Failed</h1>
              <p>Dear ${name},</p>
              <p>We were unable to process your payment for Order <strong>${orderId}</strong>.</p>
              <p>Please try again or contact support if the issue persists.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://eraya.org/dashboard" style="background-color: #8b1538; color: #d4af37; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Retry Payment</a>
              </div>
              <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
                © 2026 Eraya. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });
      console.log(`📧 Payment failed email sent to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send payment failure email:", error);
    }
  }
};
