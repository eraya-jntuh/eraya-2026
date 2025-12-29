-- Create idempotency_keys table for preventing duplicate payment/registration operations
-- This ensures idempotency for critical operations like registrations with payments

CREATE TABLE IF NOT EXISTS idempotency_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key TEXT NOT NULL UNIQUE,
  request_hash TEXT NOT NULL,
  response_status INTEGER NOT NULL,
  response_body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_idempotency_keys_key ON idempotency_keys(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_idempotency_keys_expires_at ON idempotency_keys(expires_at);

-- Create function to clean up expired idempotency keys (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_idempotency_keys()
RETURNS void AS $$
BEGIN
  DELETE FROM idempotency_keys
  WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Enable RLS (idempotency keys are internal, no public access needed)
ALTER TABLE idempotency_keys ENABLE ROW LEVEL SECURITY;

-- Deny all access via anon key (service role bypasses RLS)
-- This table should only be accessed server-side using service role credentials
-- The anon key should never have access to idempotency keys
CREATE POLICY "Deny all anon access to idempotency keys"
  ON idempotency_keys
  FOR ALL
  USING (false); -- Deny all access via anon key (service role bypasses RLS anyway)

-- Note: In production, you may want to add a scheduled job to clean up expired keys
-- This can be done via pg_cron extension or external cron job

