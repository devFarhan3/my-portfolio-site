import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-public-key')) {
  console.warn('Supabase credentials missing or using placeholders! Submissions will fail until you configure them in your .env file.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
