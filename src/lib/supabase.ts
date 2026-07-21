import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase URL and Anon Key must be set in environment variables');
  console.error('Locally: create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  console.error('In production: set those variables in the hosting platform\'s build environment.');
} else {
  console.log('✅ Supabase client initialized');
}

// createClient throws synchronously on an empty/invalid URL. Since this module
// is statically imported (supabase.ts -> substack.ts -> App.tsx), that throw
// would happen before React ever mounts, crashing the whole app to a blank
// screen. Fall back to a syntactically valid placeholder so a missing config
// degrades to failed network calls (already handled by callers) instead.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

