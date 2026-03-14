-- ================================================================
-- Migration 002: Analytics page views
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ================================================================

CREATE TABLE IF NOT EXISTS page_views (
  id         BIGSERIAL PRIMARY KEY,
  path       TEXT        NOT NULL,
  referrer   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS page_views_path_idx       ON page_views (path);
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Only service-role key (server API) can read/write
CREATE POLICY "page_views_service_all"
  ON page_views FOR ALL
  USING (auth.role() = 'service_role');
