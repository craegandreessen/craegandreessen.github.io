-- HuntFlow Initial Database Schema
-- This migration creates all core tables with proper RLS policies

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS & PROFILES
-- =====================================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  resident_state_code TEXT, -- Two-letter state code (e.g., 'MT', 'WY')
  phone_number TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- STATES & SPECIES
-- =====================================================

-- US States and Canadian Provinces
CREATE TABLE public.states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL, -- e.g., 'MT', 'WY', 'AB' (Alberta)
  name TEXT NOT NULL, -- e.g., 'Montana', 'Wyoming'
  country TEXT NOT NULL DEFAULT 'US' CHECK (country IN ('US', 'CA')),
  portal_url TEXT,
  flag_icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Species (elk, deer, antelope, etc.)
CREATE TABLE public.species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- e.g., 'Elk', 'Mule Deer', 'Pronghorn Antelope'
  slug TEXT UNIQUE NOT NULL, -- e.g., 'elk', 'mule-deer', 'pronghorn'
  icon_name TEXT, -- Lucide icon name or custom icon reference
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- State-specific species configuration (deadlines, point systems, fees)
CREATE TABLE public.state_species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES public.species(id) ON DELETE CASCADE,
  season_year INTEGER NOT NULL, -- e.g., 2026
  application_deadline DATE NOT NULL,
  draw_date DATE,
  point_type TEXT CHECK (point_type IN ('preference', 'bonus', 'hybrid', 'none')),
  base_fee DECIMAL(10, 2),
  nonresident_fee DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(state_id, species_id, season_year)
);

-- Enable RLS (public read access for state/species data)
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_species ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read states and species
CREATE POLICY "Anyone can view states"
  ON public.states FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view species"
  ON public.species FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view state species"
  ON public.state_species FOR SELECT
  USING (true);

-- =====================================================
-- USER HUNTING PREFERENCES
-- =====================================================

-- States user hunts in (many-to-many)
CREATE TABLE public.user_states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  is_resident BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, state_id)
);

-- Species user hunts (many-to-many)
CREATE TABLE public.user_species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES public.species(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, species_id)
);

-- Enable RLS
ALTER TABLE public.user_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_species ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own states"
  ON public.user_states FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own species"
  ON public.user_species FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- APPLICATIONS & TRACKING
-- =====================================================

-- User applications for draws
CREATE TABLE public.user_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  state_species_id UUID NOT NULL REFERENCES public.state_species(id) ON DELETE CASCADE,
  season_year INTEGER NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN (
    'not_started',
    'in_progress',
    'submitted',
    'drawn',
    'unsuccessful',
    'unknown'
  )),
  confirmation_number TEXT,
  notes TEXT,
  submitted_at TIMESTAMPTZ,
  result_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, state_species_id, season_year)
);

-- Enable RLS
ALTER TABLE public.user_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own applications"
  ON public.user_applications FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- PREFERENCE & BONUS POINTS
-- =====================================================

CREATE TABLE public.user_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES public.species(id) ON DELETE CASCADE,
  season_year INTEGER NOT NULL,
  preference_points INTEGER DEFAULT 0,
  bonus_points INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, state_id, species_id, season_year)
);

-- Enable RLS
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own points"
  ON public.user_points FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- SECURE CREDENTIAL VAULT
-- =====================================================

-- Encrypted credentials for state portals
CREATE TABLE public.user_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  username_encrypted TEXT NOT NULL, -- Encrypted with pgcrypto
  password_encrypted TEXT NOT NULL, -- Encrypted with pgcrypto
  notes TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, state_id)
);

-- Enable RLS
ALTER TABLE public.user_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own credentials"
  ON public.user_credentials FOR ALL
  USING (auth.uid() = user_id);

-- Helper functions for encryption/decryption
-- NOTE: In production, use a separate encryption key stored in environment variables
CREATE OR REPLACE FUNCTION encrypt_credential(plaintext TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(pgp_sym_encrypt(plaintext, encryption_key), 'base64');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_credential(encrypted TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN pgp_sym_decrypt(decode(encrypted, 'base64'), encryption_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- NOTIFICATIONS & PREFERENCES
-- =====================================================

CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  email_enabled BOOLEAN DEFAULT TRUE,
  push_enabled BOOLEAN DEFAULT FALSE,
  deadline_reminder_days INTEGER DEFAULT 14, -- Remind N days before deadline
  weekly_digest BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deadline_reminder', 'draw_result', 'system', 'update')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notification preferences"
  ON public.notification_preferences FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Profiles
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_resident_state ON public.profiles(resident_state_code);

-- State Species
CREATE INDEX idx_state_species_deadline ON public.state_species(application_deadline);
CREATE INDEX idx_state_species_season ON public.state_species(season_year);
CREATE INDEX idx_state_species_state ON public.state_species(state_id);

-- Applications
CREATE INDEX idx_applications_user ON public.user_applications(user_id);
CREATE INDEX idx_applications_status ON public.user_applications(status);
CREATE INDEX idx_applications_deadline ON public.user_applications(user_id, season_year);

-- Points
CREATE INDEX idx_points_user ON public.user_points(user_id);
CREATE INDEX idx_points_state_species ON public.user_points(state_id, species_id);

-- Notifications
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read);
CREATE INDEX idx_notifications_created ON public.notifications(created_at DESC);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON public.states
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_state_species_updated_at BEFORE UPDATE ON public.state_species
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_applications_updated_at BEFORE UPDATE ON public.user_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_points_updated_at BEFORE UPDATE ON public.user_points
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credentials_updated_at BEFORE UPDATE ON public.user_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGER: Auto-create profile on user signup
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE public.states IS 'US States and Canadian Provinces';
COMMENT ON TABLE public.species IS 'Huntable species (elk, deer, antelope, etc.)';
COMMENT ON TABLE public.state_species IS 'State-specific draw configuration per species and season';
COMMENT ON TABLE public.user_applications IS 'User application tracking for draws';
COMMENT ON TABLE public.user_points IS 'Preference and bonus point tracking';
COMMENT ON TABLE public.user_credentials IS 'Encrypted credentials for state portals';
COMMENT ON TABLE public.notifications IS 'User notifications and alerts';
