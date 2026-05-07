-- ============================================================
-- 004_admin_security.sql
-- Password hash migration for /dashboard credentials
-- Run this in Supabase SQL Editor after 003_sessions.sql
-- ============================================================

alter table admin_config
  add column if not exists password_hash text;

alter table admin_config
  alter column password drop not null,
  alter column password drop default;

-- Remove the insecure seeded default when it has never been changed.
update admin_config
set password = null
where id = 1
  and password = 'admin'
  and password_hash is null;
