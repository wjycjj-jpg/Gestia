import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flitunxtewyfyalpbwvb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaXR1bnh0ZXd5ZnlhbHBid3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMTYzMDEsImV4cCI6MjA5OTg5MjMwMX0.gCZIHF1-jr27qxvFNtpXc6H-gft9cNrbwfpNy3T_U9k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
