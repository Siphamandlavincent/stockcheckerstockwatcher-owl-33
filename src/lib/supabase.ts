import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'crypto-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const anonymizeIP = async (ip: string) => {
  return sha256(ip).toString();
};