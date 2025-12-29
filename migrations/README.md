# Database Migrations

This directory contains SQL migrations for Phase 3 features: events table, idempotency keys, and performance indexes.

## Migration Files

1. **001_create_events_table.sql** - Creates the `events` table for server-side event validation and pricing
2. **002_create_idempotency_keys_table.sql** - Creates the `idempotency_keys` table for preventing duplicate operations
3. **003_add_indexes_for_performance.sql** - Adds database indexes for query performance under high load

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open each migration file in order (001, 002, 003)
4. Copy and paste the SQL into the editor
5. Click **Run** to execute

### Option 2: Supabase CLI

If you have Supabase CLI installed:

```bash
# Link to your project (if not already linked)
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

### Option 3: Direct SQL Execution

You can also execute the SQL directly via the Supabase REST API or any PostgreSQL client.

## Verification

After applying migrations, verify the tables exist:

```sql
-- Check events table
SELECT * FROM events LIMIT 5;

-- Check idempotency_keys table structure
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'idempotency_keys';

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename IN ('events', 'idempotency_keys', 'event_registrations');
```

## Sample Events

The migration includes sample events. Update them according to your actual events:

- Tech Quiz: ₹50
- Coding Competition: ₹100
- Hackathon: ₹200
- Robotics Workshop: ₹150

To add or update events:

```sql
-- Add a new event
INSERT INTO events (name, entry_fee, is_active)
VALUES ('New Event', 75.00, true);

-- Update an existing event
UPDATE events
SET entry_fee = 60.00
WHERE name = 'Tech Quiz';
```

## Important Notes

- **RLS Policies**: The migrations include Row Level Security (RLS) policies. Make sure your Supabase service role has proper access.
- **Idempotency Keys**: Expired keys are automatically cleaned up by the application, but you can also run the cleanup function manually:
  ```sql
  SELECT cleanup_expired_idempotency_keys();
  ```
- **Indexes**: The performance indexes are critical for handling 8k-10k concurrent users. Do not skip migration 003.
