import { createClient } from '@supabase/supabase-js';

// Publishable (anon) key + project URL — Supabase's "sb_publishable_" keys are
// designed to ship inside the client bundle (RLS policies, not key secrecy,
// protect the data). Hardcoded as a fallback so the app works in production
// even when a hosting platform's build step doesn't inject VITE_ env vars;
// import.meta.env still wins when set, so local/.env-based overrides work too.
const FALLBACK_SUPABASE_URL = 'https://tmleheqlyeirqluqtpqb.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_awaPaCZhzKgqLMQFTcbhPQ_cWbCI-Ln';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

