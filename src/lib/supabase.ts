import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Validate if we are still using placeholders at runtime (browser)
if (typeof window !== 'undefined') {
  if (supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
    console.error('⚠️ Supabase Error: Missing or incorrect Environment Variables. Please check Vercel settings and REDEPLOY.')
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
