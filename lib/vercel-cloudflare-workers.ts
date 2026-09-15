// Vercel-only compatibility shim for the Cloudflare env import used by lib/db.ts.
// It intentionally exposes environment variables only; D1 remains a Cloudflare-only binding.
export const env = process.env;
