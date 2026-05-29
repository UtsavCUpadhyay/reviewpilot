import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uapvekifcptnqzqtfawq.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcHZla2lmY3B0bnF6cXRmYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODE5MTIsImV4cCI6MjA5NTU1NzkxMn0.YNCg2yEDZSpG67RwiMfQiZC3qsRMCAi1eNXoc39gyF4'

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON)
}
