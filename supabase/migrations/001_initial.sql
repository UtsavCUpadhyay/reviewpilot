-- ============================================================
-- ReviewPilot — Complete Database Schema
-- Migration: 001_initial.sql
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── PROFILES ─────────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'pro', 'agency')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'trialing' CHECK (
    subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'incomplete')
  ),
  trial_ends_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  -- Limits per plan
  locations_limit INT DEFAULT 1,
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  last_login_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── LOCATIONS ────────────────────────────────────────────────
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  -- Identity
  name TEXT NOT NULL,
  business_type TEXT,
  website TEXT,
  phone TEXT,
  address TEXT,
  -- Google Business
  google_place_id TEXT,
  google_account_id TEXT,
  google_location_id TEXT,
  google_access_token TEXT,
  google_refresh_token TEXT,
  google_token_expires_at TIMESTAMPTZ,
  google_connected BOOLEAN DEFAULT false,
  -- Settings
  auto_respond BOOLEAN DEFAULT false,
  auto_respond_threshold INT DEFAULT 3, -- only auto-respond to reviews >= this rating
  response_tone TEXT DEFAULT 'professional' CHECK (
    response_tone IN ('professional', 'friendly', 'formal', 'casual')
  ),
  -- Stats (denormalized for performance)
  avg_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_responded INT DEFAULT 0,
  last_polled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RESPONSE SETTINGS ────────────────────────────────────────
CREATE TABLE response_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE UNIQUE NOT NULL,
  business_name TEXT,
  business_type TEXT,
  owner_name TEXT,
  -- Tone & Style
  custom_instructions TEXT,
  include_reviewer_name BOOLEAN DEFAULT true,
  include_business_name BOOLEAN DEFAULT true,
  max_response_length INT DEFAULT 200,
  -- Custom templates (optional overrides)
  positive_template TEXT, -- for 4-5 star
  neutral_template TEXT,  -- for 3 star
  negative_template TEXT, -- for 1-2 star
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── REVIEWS ──────────────────────────────────────────────────
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  -- Google data
  google_review_id TEXT UNIQUE NOT NULL,
  reviewer_name TEXT,
  reviewer_photo_url TEXT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content TEXT,
  review_date TIMESTAMPTZ NOT NULL,
  -- Response tracking
  responded BOOLEAN DEFAULT false,
  response_text TEXT,
  response_generated_at TIMESTAMPTZ,
  response_posted_at TIMESTAMPTZ,
  response_source TEXT CHECK (response_source IN ('ai', 'manual', 'edited_ai')),
  response_edited BOOLEAN DEFAULT false,
  -- Status workflow
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'ai_generated', 'approved', 'posted', 'skipped', 'failed')
  ),
  -- Metadata
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX reviews_location_id_idx ON reviews(location_id);
CREATE INDEX reviews_status_idx ON reviews(status);
CREATE INDEX reviews_rating_idx ON reviews(rating);
CREATE INDEX reviews_review_date_idx ON reviews(review_date DESC);

CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── REVIEW REQUEST CAMPAIGNS ─────────────────────────────────
CREATE TABLE review_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  channel TEXT DEFAULT 'sms' CHECK (channel IN ('sms', 'email', 'both')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  message_template TEXT,
  -- Stats
  total_sent INT DEFAULT 0,
  total_clicked INT DEFAULT 0,
  total_reviews_generated INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── REVIEW REQUESTS ───────────────────────────────────────────
CREATE TABLE review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES review_campaigns(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  channel TEXT NOT NULL CHECK (channel IN ('sms', 'email')),
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'sent', 'delivered', 'clicked', 'bounced', 'failed')
  ),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  -- Tracking
  tracking_token UUID DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX review_requests_location_idx ON review_requests(location_id);

-- ── AUTOMATION LOG ───────────────────────────────────────────
CREATE TABLE automation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'skipped', 'pending')),
  metadata JSONB DEFAULT '{}',
  error_message TEXT,
  duration_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX automation_log_user_idx ON automation_log(user_id);
CREATE INDEX automation_log_created_idx ON automation_log(created_at DESC);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_log ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_own" ON profiles FOR ALL USING (auth.uid() = id);

-- Locations
CREATE POLICY "locations_own" ON locations FOR ALL
  USING (user_id = auth.uid());

-- Response Settings
CREATE POLICY "response_settings_own" ON response_settings FOR ALL
  USING (location_id IN (SELECT id FROM locations WHERE user_id = auth.uid()));

-- Reviews
CREATE POLICY "reviews_own" ON reviews FOR ALL
  USING (location_id IN (SELECT id FROM locations WHERE user_id = auth.uid()));

-- Campaigns
CREATE POLICY "campaigns_own" ON review_campaigns FOR ALL
  USING (location_id IN (SELECT id FROM locations WHERE user_id = auth.uid()));

-- Review Requests
CREATE POLICY "review_requests_own" ON review_requests FOR ALL
  USING (location_id IN (SELECT id FROM locations WHERE user_id = auth.uid()));

-- Automation Log
CREATE POLICY "log_own" ON automation_log FOR ALL USING (user_id = auth.uid());

-- ── FUNCTIONS ────────────────────────────────────────────────

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update location stats when review is added/updated
CREATE OR REPLACE FUNCTION update_location_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE locations
  SET
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE location_id = NEW.location_id),
    total_responded = (SELECT COUNT(*) FROM reviews WHERE location_id = NEW.location_id AND responded = true),
    avg_rating = (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM reviews WHERE location_id = NEW.location_id)
  WHERE id = NEW.location_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER reviews_update_location_stats
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_location_stats();

-- ── SEED DATA (for testing) ──────────────────────────────────
-- Remove this section in production or wrap with a flag
-- INSERT INTO ... (add test data here during dev)
