-- Create payments table for Razorpay payment tracking
-- This table stores payment records linked to event registrations

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10, 2) NOT NULL, -- Amount in rupees (server-calculated)
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED')),
  payment_method TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON payments(registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order_id ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

-- Add payment_status column to event_registrations for quick status checks
ALTER TABLE event_registrations 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'PENDING' 
CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED'));

-- Create index on payment_status
CREATE INDEX IF NOT EXISTS idx_event_registrations_payment_status ON event_registrations(payment_status);

-- Create updated_at trigger for payments (uses existing function)
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Public can insert payments (for order creation)
CREATE POLICY "Public can create payments"
  ON payments
  FOR INSERT
  WITH CHECK (true);

-- Users can read their own payments (via registration)
CREATE POLICY "Users can read their own payments"
  ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM event_registrations
      WHERE event_registrations.id = payments.registration_id
      AND event_registrations.email = (SELECT email FROM auth.users WHERE auth.users.id = auth.uid())
    )
  );

-- Admins can read all payments
CREATE POLICY "Admins can read all payments"
  ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Service role can update payments (for webhooks)
-- Note: Webhooks use service role, so they bypass RLS
-- This policy is for defense in depth
CREATE POLICY "Service role can update payments"
  ON payments
  FOR UPDATE
  USING (true); -- Service role bypasses RLS anyway

