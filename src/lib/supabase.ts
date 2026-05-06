import { createClient } from '@supabase/supabase-js'

// Use fallback placeholders so the build doesn't throw during SSR prerendering.
// Actual values come from NEXT_PUBLIC_* env vars at runtime (Vercel / .env.local).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
