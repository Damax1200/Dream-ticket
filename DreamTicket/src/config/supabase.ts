import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANT: Supabase credentials configured
// Get them from: https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://ombzjcggnrulgyllphsg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYnpqY2dnbnJ1bGd5bGxwaHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDA1MjcsImV4cCI6MjA3NzA3NjUyN30.SO7W57q28yeK2PqovI9rp_JdjQUmixWF5kCBJqBviCg';

// Create Supabase client with AsyncStorage for session persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database Types (you can expand these as needed)
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  age?: number;
  location?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  user_id: string;
  lucky_number: string;
  template_name: string;
  image_url: string;
  motivational_quote: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  icon: string;
  is_read: boolean;
  created_at: string;
}

