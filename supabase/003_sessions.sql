-- ============================================================
-- 003_sessions.sql
-- Login session tracking for /dashboard
-- Run this in Supabase SQL Editor
-- ============================================================

create table if not exists admin_sessions (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  ip         text,
  user_agent text,
  is_active  boolean     not null default true
);

-- Indexes for common queries
create index if not exists admin_sessions_active_idx
  on admin_sessions (is_active, expires_at desc);

-- RLS: only service_role can read/write
alter table admin_sessions enable row level security;

create policy "service_role only"
  on admin_sessions
  using (auth.role() = 'service_role');
