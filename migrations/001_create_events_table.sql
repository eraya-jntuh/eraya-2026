-- Create events table for server-side event validation and pricing
-- This replaces client-trusted pricing with database-backed values

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  entry_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index on name for fast lookups
CREATE INDEX IF NOT EXISTS idx_events_name ON events(name);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can read active events (for validation)
CREATE POLICY "Public can read active events"
  ON events
  FOR SELECT
  USING (is_active = true);

-- Only admins can insert/update/delete events
-- (This will be enforced by service layer, but RLS adds defense in depth)
CREATE POLICY "Admins can manage events"
  ON events
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert sample events (adjust as needed)
INSERT INTO events (name, entry_fee, is_active) VALUES
  ('Tech Quiz', 50.00, true),
  ('Coding Competition', 100.00, true),
  ('Hackathon', 200.00, true),
  ('Robotics Workshop', 150.00, true)
ON CONFLICT (name) DO NOTHING;

