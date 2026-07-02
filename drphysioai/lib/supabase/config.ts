/**
 * Supabase project config for DrPhysioAI.
 * These are public values (URL + publishable key) — safe to ship to the browser;
 * row-level security protects the data. Env vars override the baked-in defaults.
 */
export const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://uyakkdalfopuamkacxqd.supabase.co"
).trim();

export const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_WIhmnTyACPwqD4kKTw2T4Q_DkaazXFF"
).trim();
