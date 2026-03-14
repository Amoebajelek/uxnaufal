-- ================================================================
-- uxnaufal portfolio — Supabase schema
-- Run this once in: Supabase Dashboard → SQL Editor → Run
-- ================================================================

-- ── 1. Admin credentials (single-row table) ───────────────────
CREATE TABLE IF NOT EXISTS admin_config (
  id       INTEGER PRIMARY KEY DEFAULT 1,
  username TEXT    NOT NULL DEFAULT 'admin',
  password TEXT    NOT NULL DEFAULT 'admin',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default admin row (admin / admin)
INSERT INTO admin_config (id, username, password)
VALUES (1, 'admin', 'admin')
ON CONFLICT (id) DO NOTHING;

-- ── 2. Portfolio projects ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio (
  id           TEXT PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  type         TEXT,
  year         TEXT,
  duration     TEXT,
  role         TEXT,
  client       TEXT,
  live_url     TEXT,
  description  TEXT NOT NULL DEFAULT '',
  tags         JSONB NOT NULL DEFAULT '[]',
  color        TEXT NOT NULL DEFAULT '#1a1a1a',
  accent       TEXT NOT NULL DEFAULT '#ffffff',
  thumbnail    TEXT,
  external_href TEXT,
  skills       JSONB NOT NULL DEFAULT '[]',
  sections     JSONB NOT NULL DEFAULT '[]',
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_updated_at ON portfolio;
CREATE TRIGGER portfolio_updated_at
  BEFORE UPDATE ON portfolio
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS admin_config_updated_at ON admin_config;
CREATE TRIGGER admin_config_updated_at
  BEFORE UPDATE ON admin_config
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 3. Row-Level Security ──────────────────────────────────────
-- Portfolio: public can read
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "portfolio_public_read"
  ON portfolio FOR SELECT USING (true);

-- Allow service-role key to do everything (used server-side only)
CREATE POLICY "portfolio_service_all"
  ON portfolio FOR ALL USING (auth.role() = 'service_role');

-- Admin config: only service-role key
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_config_service_all"
  ON admin_config FOR ALL USING (auth.role() = 'service_role');
