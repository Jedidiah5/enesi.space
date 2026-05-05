import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "portfolio_admin";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sign(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminToken(secret: string): string {
  const exp = Date.now() + MAX_AGE_MS;
  const body = `${exp}`;
  const sig = sign(secret, body);
  return Buffer.from(`${body}.${sig}`).toString("base64url");
}

export function verifyAdminToken(secret: string, token: string | undefined): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const dot = raw.lastIndexOf(".");
    if (dot === -1) return false;
    const body = raw.slice(0, dot);
    const sig = raw.slice(dot + 1);
    const expected = sign(secret, body);
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const exp = Number(body);
    if (!Number.isFinite(exp) || Date.now() > exp) return false;
    return true;
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE;
