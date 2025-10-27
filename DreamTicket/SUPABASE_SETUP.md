# 🚀 Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your Dream Ticket app.

## 📋 Prerequisites

- A Supabase account (free tier available at https://supabase.com)
- Node.js and npm installed
- Dream Ticket app project

## 🔧 Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Fill in the details:
   - **Project Name**: Dream Ticket
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the closest region to your users
4. Click **"Create new project"** and wait 2-3 minutes

## 🔑 Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll need two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

3. Open `src/config/supabase.ts` and replace:
   ```typescript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
   ```

## 🗄️ Step 3: Create Database Tables

In your Supabase dashboard, go to **SQL Editor** and run these queries:

### 1. Users Table (Extended Profile)
```sql
-- Create users table for extended profile information
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  age INTEGER,
  location TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### 2. Tickets Table
```sql
-- Create tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lucky_number TEXT NOT NULL,
  template_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  motivational_quote TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tickets
CREATE POLICY "Users can view own tickets"
  ON tickets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own tickets
CREATE POLICY "Users can insert own tickets"
  ON tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own tickets
CREATE POLICY "Users can delete own tickets"
  ON tickets
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX tickets_user_id_idx ON tickets(user_id);
CREATE INDEX tickets_created_at_idx ON tickets(created_at DESC);
```

### 3. Notifications Table
```sql
-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  icon TEXT DEFAULT '🔔',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
  ON notifications
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_created_at_idx ON notifications(created_at DESC);
```

## 📦 Step 4: Set Up Storage Buckets

Go to **Storage** in your Supabase dashboard and create two buckets:

### 1. User Avatars Bucket
1. Click **"New bucket"**
2. Name: `user-avatars`
3. **Public bucket**: ✅ Yes
4. Click **"Create bucket"**

### 2. Ticket Images Bucket
1. Click **"New bucket"**
2. Name: `ticket-images`
3. **Public bucket**: ✅ Yes
4. Click **"Create bucket"**

### Set Storage Policies

For each bucket, go to **Policies** and add:

```sql
-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload own files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access
CREATE POLICY "Public read access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'user-avatars');
```

*(Repeat similar policies for `ticket-images` bucket)*

## 🔐 Step 5: Enable Authentication Providers (Optional)

### Email Authentication (Already Enabled)
Email/password authentication is enabled by default.

### Facebook Authentication
1. Go to **Authentication** → **Providers** → **Facebook**
2. Enable Facebook
3. Add your Facebook App ID and Secret
4. Copy the callback URL to your Facebook App settings

### Google Authentication
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google
3. Add your Google Client ID and Secret
4. Copy the callback URL to your Google Cloud Console

## ✅ Step 6: Test Your Setup

Run your app and try:

1. **Sign Up**: Create a new account
2. **Sign In**: Log in with your credentials
3. **Generate Ticket**: Create a lucky ticket
4. **View Profile**: Check your profile information
5. **Notifications**: Check if notifications work

## 🔒 Security Best Practices

1. **Never commit your Supabase credentials to Git**
   - Add `src/config/supabase.ts` to `.gitignore` after adding your keys
   - Or use environment variables

2. **Use Row Level Security (RLS)**
   - All tables have RLS enabled
   - Users can only access their own data

3. **Keep your anon key public-safe**
   - The anon key is safe to use in client-side code
   - RLS policies protect your data

## 📊 Database Schema Diagram

```
┌─────────────────┐
│   auth.users    │ (Supabase Auth)
│  - id (PK)      │
│  - email        │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
┌─────────────────┐          ┌──────────────────┐
│     users       │          │     tickets      │
│  - id (FK)      │          │  - id (PK)       │
│  - email        │          │  - user_id (FK)  │
│  - full_name    │          │  - lucky_number  │
│  - avatar_url   │          │  - template_name │
│  - phone        │          │  - image_url     │
│  - age          │          │  - quote         │
│  - location     │          │  - created_at    │
│  - bio          │          └──────────────────┘
└─────────────────┘
         │
         ▼
┌──────────────────┐
│  notifications   │
│  - id (PK)       │
│  - user_id (FK)  │
│  - title         │
│  - message       │
│  - icon          │
│  - is_read       │
│  - created_at    │
└──────────────────┘
```

## 🎯 Next Steps

Now that Supabase is set up, you can:

1. ✅ Update `LoginScreen.tsx` to use Supabase authentication
2. ✅ Update `SignUpScreen.tsx` to use Supabase registration
3. ✅ Update `ProfileScreen.tsx` to load user data from Supabase
4. ✅ Save generated tickets to Supabase
5. ✅ Load notifications from Supabase in real-time

## 🆘 Troubleshooting

### "Invalid API Key" Error
- Double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Make sure there are no extra spaces
- Verify you're using the **anon/public** key, not the service key

### "Row Level Security Policy Violation"
- Make sure RLS policies are created correctly
- Check that users are authenticated before accessing data
- Review policy conditions in SQL Editor

### Images Not Uploading
- Verify storage buckets are created
- Check bucket policies allow uploads
- Ensure buckets are set to public

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Need help?** Check the Supabase Discord community or documentation.

