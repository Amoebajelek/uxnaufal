/**
 * Session token utilities — edge-compatible (Web Crypto API).
 *
 * Cookie format: `{sessionId}:{expiresTimestamp}:{hmacBase64url}`
 *
 * - sessionId   : UUID stored in admin_sessions table
 * - expiresTimestamp : Unix ms, checked before DB hit
 * - hmacBase64url   : HMAC-SHA256 of `sessionId:expiresTimestamp`, base64url
 *
 * Middleware verifies the HMAC **without** a DB call for performance.
 * DB is only queried when listing / revoking sessions via the API.
 */

export const SESSION_COOKIE = "uxnaufal_session";

export const SESSION_DURATION = {
  /** 8 hours — default (no "remember me") */
  short: 60 * 60 * 8,
  /** 30 days — "remember me" */
  long: 60 * 60 * 24 * 30,
};

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "dev-only-fallback-change-in-production"
  );
}

async function importKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function hmacSign(data: string): Promise<string> {
  const key = await importKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64url(sig);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Create a signed token to store in the cookie.
 * @param sessionId  UUID from admin_sessions table
 * @param expiresAt  Unix ms timestamp
 */
export async function createSessionToken(
  sessionId: string,
  expiresAt: number,
): Promise<string> {
  const payload = `${sessionId}:${expiresAt}`;
  const sig = await hmacSign(payload);
  return `${payload}:${sig}`;
}

/**
 * Verify a session token value from the cookie.
 * Returns `{ valid: true, sessionId }` on success.
 * Returns `{ valid: false, sessionId: "" }` on failure or expiry.
 */
export async function verifySessionToken(
  token: string | undefined,
): Promise<{ valid: boolean; sessionId: string }> {
  if (!token) return { valid: false, sessionId: "" };

  // token = "<sessionId>:<expiresMs>:<sig>"
  // sessionId is UUID (no colons), expiresMs is a number (no colons),
  // sig is base64url (no colons) — so split(":", 3) is safe.
  const colonTwo = token.indexOf(":", token.indexOf(":") + 1);
  if (colonTwo < 0) return { valid: false, sessionId: "" };

  const payload = token.slice(0, colonTwo);
  const sig = token.slice(colonTwo + 1);
  const firstColon = payload.indexOf(":");
  const sessionId = payload.slice(0, firstColon);
  const expiresMs = parseInt(payload.slice(firstColon + 1), 10);

  if (isNaN(expiresMs) || Date.now() > expiresMs) {
    return { valid: false, sessionId: "" };
  }

  const expectedSig = await hmacSign(payload);
  if (expectedSig !== sig) return { valid: false, sessionId: "" };

  return { valid: true, sessionId };
}
