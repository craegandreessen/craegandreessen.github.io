# 🚀 HuntFlow Setup Guide

## ✅ What's Been Built

Your complete HuntFlow MVP is ready! Here's everything that's been implemented:

### 🎨 Frontend (Next.js 15 + TypeScript)
- ✅ Landing page with masculine design
- ✅ Authentication pages (signup, login, OAuth)
- ✅ 3-step onboarding flow
- ✅ Full dashboard with sidebar navigation
- ✅ Deadline hero component with countdown
- ✅ Points summary cards
- ✅ Upcoming deadlines list
- ✅ Quick actions panel
- ✅ Responsive mobile design

### 🔐 Authentication
- ✅ Google OAuth
- ✅ Apple OAuth
- ✅ Facebook OAuth
- ✅ Email/password
- ✅ Secure session management
- ✅ Protected routes middleware

### 🗄️ Database (Supabase PostgreSQL)
- ✅ 10 core tables with relationships
- ✅ Row Level Security (RLS) on all tables
- ✅ Encrypted credential storage
- ✅ 50 US states + 10 Canadian provinces seeded
- ✅ 18 species pre-loaded
- ✅ Example 2026 deadline data (8 western states)

### 🎨 Design System
- ✅ Masculine color palette (charcoal, green, bronze)
- ✅ Custom fonts (Inter, Recoleta, Geist Mono)
- ✅ Reusable UI components (Button, Input, Label)
- ✅ Tailwind CSS with custom theme
- ✅ Dark mode first

### 📚 Documentation
- ✅ Complete README with setup instructions
- ✅ Data requirements guide for all 50 states
- ✅ Monetization strategy
- ✅ API automation recommendations

---

## 🎯 Next Steps to Launch

### Step 1: Set Up Supabase (15 minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Choose a name (e.g., "huntflow-prod")
   - Select region closest to your users
   - Generate a strong database password

2. **Run Database Migrations**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run
   - Copy contents of `supabase/migrations/002_seed_data.sql`
   - Paste and run
   - Verify tables exist in Table Editor

3. **Get API Keys**
   - Go to Settings → API
   - Copy:
     - Project URL
     - `anon` public key
     - `service_role` key (keep secret!)

### Step 2: Configure OAuth Providers (30 minutes)

**Google OAuth:**
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
6. In Supabase: Authentication → Providers → Google
7. Paste Client ID and Client Secret

**Apple OAuth:**
1. Go to https://developer.apple.com
2. Certificates, Identifiers & Profiles → Identifiers
3. Create new Services ID
4. Enable "Sign in with Apple"
5. Add redirect URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
6. In Supabase: Authentication → Providers → Apple
7. Configure with Services ID and Team ID

**Facebook OAuth:**
1. Go to https://developers.facebook.com
2. My Apps → Create App → Consumer
3. Add Facebook Login product
4. Settings → Basic → Copy App ID and App Secret
5. Add OAuth redirect URI in Facebook Login settings
6. In Supabase: Authentication → Providers → Facebook
7. Paste App ID and App Secret

### Step 3: Environment Variables

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ NEVER commit `.env.local` to git!**

### Step 4: Install & Run Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open http://localhost:3000

### Step 5: Test the Flow

1. **Sign up** with email or OAuth
2. **Complete onboarding:**
   - Select resident state
   - Choose hunting states & species
   - Skip points import
3. **View dashboard:**
   - See upcoming deadlines
   - Check stats cards
   - Explore sidebar navigation

### Step 6: Deploy to Vercel (10 minutes)

1. **Push to GitHub** (already done ✅)

2. **Import to Vercel:**
   - Go to https://vercel.com
   - New Project → Import from GitHub
   - Select your repository
   - Add environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXT_PUBLIC_APP_URL (set to your Vercel URL)
     ```
   - Click Deploy

3. **Update OAuth Redirect URLs:**
   - Add your Vercel URL to all OAuth provider settings
   - Format: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`

4. **Update Supabase Site URL:**
   - Go to Supabase → Authentication → URL Configuration
   - Set Site URL to your Vercel domain
   - Add to Redirect URLs

---

## 📊 Adding Real 2026 Deadline Data

Right now you have **sample data** for 8 western states. To make HuntFlow production-ready:

### Option 1: Manual Entry (Recommended for MVP)

1. **Create Google Sheet** with columns:
   - state_code, species_slug, season_year
   - application_deadline, draw_date
   - point_type, base_fee, nonresident_fee
   - notes

2. **Gather Data** from state websites:
   - Start with Montana, Wyoming, Colorado (highest demand)
   - Use `DATAREQUIREMENTS.md` as checklist
   - Verify deadlines are accurate!

3. **Import to Supabase:**
   ```sql
   -- Insert into state_species table
   INSERT INTO public.state_species
   (state_id, species_id, season_year, application_deadline, ...)
   SELECT s.id, sp.id, 2026, '2026-03-15', ...
   FROM states s, species sp
   WHERE s.code = 'MT' AND sp.slug = 'elk';
   ```

### Option 2: Hire a VA (Upwork/Fiverr)

- **Budget**: $200-500
- **Timeline**: 1-2 weeks
- **Deliverable**: Complete 2026 deadline data for all 50 states
- **Template**: Provide Google Sheets template from DATAREQUIREMENTS.md

### Option 3: Partner with GoHunt

- **Cost**: Licensing fee or revenue share
- **Benefit**: Automatic data updates, draw odds
- **Contact**: https://gohunt.com/contact

---

## 🎨 Customization Options

### Change Colors
Edit `tailwind.config.ts`:
```typescript
hunter: {
  bronze: { DEFAULT: "#cd7f32" }, // Change this
  green: { DEFAULT: "#2d5016" },  // And this
}
```

### Add Custom Fonts
1. Download fonts to `public/fonts/`
2. Update `app/layout.tsx`:
```typescript
const customFont = localFont({
  src: "../public/fonts/YourFont.woff2",
  variable: "--font-custom",
});
```

### Add Logo
1. Place logo in `public/logo.png`
2. Update `app/page.tsx` and sidebar components

---

## 🔒 Security Checklist

Before launching publicly:

- [ ] Enable Supabase RLS policies (already done ✅)
- [ ] Set up email rate limiting in Supabase
- [ ] Add CAPTCHA to signup form (optional)
- [ ] Enable Supabase MFA for admin accounts
- [ ] Set up Supabase backups (automatic in paid tier)
- [ ] Use environment variables for all secrets (✅)
- [ ] Enable HTTPS only in production (Vercel does this)
- [ ] Set up error monitoring (Sentry recommended)

---

## 💰 Monetization Setup

### Stripe Integration (Phase 2)

When ready to accept payments:

1. **Create Stripe Account** - https://stripe.com
2. **Install Stripe:**
   ```bash
   npm install @stripe/stripe-js stripe
   ```
3. **Add Subscription Logic:**
   - Create Stripe products (Free, Premium, Pro)
   - Add checkout page
   - Webhook for subscription updates
   - Update `profiles.subscription_tier` on payment

### Pricing Pages
- Create `/pricing` page
- Add comparison table (Free vs Premium vs Pro)
- CTA buttons linking to Stripe checkout

---

## 📈 Analytics Setup

Add PostHog or Vercel Analytics:

```bash
npm install posthog-js
```

Track key events:
- Sign ups
- Onboarding completion
- Deadline views
- Application creations
- Subscription upgrades

---

## 🐛 Known Issues / Future Improvements

### Current Limitations:
1. **Fonts**: Recoleta font files not included (using fallback). Purchase font license or use free alternative.
2. **Textures**: Wood/camo textures referenced but not included. Add to `public/textures/`.
3. **Email Notifications**: Not implemented yet. Requires Resend or SendGrid integration.
4. **Push Notifications**: Not implemented. Needs service worker + Firebase Cloud Messaging.

### Phase 2 Features to Build:
1. **Credentials Vault UI** - Form to add/edit encrypted portal logins
2. **Points Management Pages** - Add/edit point data
3. **Applications Pages** - Create/track applications
4. **Calendar View** - Visual timeline of deadlines
5. **Notification Settings** - Email/push preferences
6. **Profile Settings** - Edit user info
7. **Admin Panel** - Update deadline data without SQL

---

## 🎉 You're Ready to Launch!

### Quick Launch Checklist:
- [ ] Supabase project created & migrations run
- [ ] OAuth providers configured
- [ ] Environment variables set
- [ ] Deployed to Vercel
- [ ] Test user flow (signup → onboarding → dashboard)
- [ ] Add 10 western states deadline data
- [ ] Invite beta users

### Share on Social Media:
"Just launched HuntFlow 🦌 - never miss a hunting application deadline again! Track preference points, deadlines, and manage credentials for all 50 states in one place. Beta testers wanted!"

---

**Questions?** Check README.md and DATAREQUIREMENTS.md for detailed info.

**Good luck! 🎯 Time to help hunters never miss a deadline again.**
