-- Add database indexes for query performance
-- These indexes support the high-traffic scenario (8k-10k users)

-- Index on event_registrations for common queries
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_name ON event_registrations(event_name);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON event_registrations(email);
CREATE INDEX IF NOT EXISTS idx_event_registrations_created_at ON event_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_registrations_transaction_id ON event_registrations(transaction_id);

-- Composite index for duplicate check (event_name, email) - already covered by unique constraint
-- But adding explicit index for faster lookups
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_email ON event_registrations(event_name, email);

-- Index on contact_messages for admin queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Index on profiles for role-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

