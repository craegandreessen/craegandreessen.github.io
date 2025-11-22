# 🦌 HuntFlow - Hunt Application & Deadline Manager

**The ultimate application and deadline manager for serious North American big-game hunters.**

Never miss another draw deadline. Track preference points, manage credentials, and stay on top of hunting applications across 50+ states — all in one beautiful, masculine dashboard.

## 🎯 Core Features

### ✅ Implemented (MVP)
- **Multi-Provider Authentication** - Google, Apple, Facebook, and Email/Password via Supabase Auth
- **Beautiful Onboarding Flow** - 3-step guided setup for new users
- **State & Species Selection** - Choose your hunting states and target species
- **Deadline Tracking Dashboard** - See all upcoming deadlines at a glance with countdown timers
- **Points Management** - Track preference and bonus points across all states
- **Secure Credential Vault** - Encrypted storage for state portal login credentials
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Dark Mode First** - Masculine color palette with hunter-green, bronze, and charcoal

### 🚧 Coming Soon (Phase 2)
- Auto-fill assistance for applications
- Draw odds calculator
- Point creep analytics
- Push notifications for deadlines
- Calendar export (iCal/Google Calendar)
- Unit-specific recommendations
- Draw result tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Custom masculine theme
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State Management**: React Query (TanStack)
- **Tables**: TanStack React Table
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Project Structure

```
huntflow/
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages (login, signup, callback)
│   ├── dashboard/           # Protected dashboard pages
│   ├── onboarding/          # New user onboarding flow
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Landing page
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   ├── onboarding/          # Onboarding step components
│   └── ui/                  # Reusable UI components (Button, Input, etc.)
├── lib/
│   ├── supabase/            # Supabase clients (server, client, middleware)
│   ├── utils.ts             # Utility functions (cn, formatDate, etc.)
│   └── constants.ts         # App constants (states, species, etc.)
├── types/
│   └── database.types.ts    # TypeScript types from Supabase schema
├── supabase/
│   └── migrations/          # Database migrations
│       ├── 001_initial_schema.sql    # Core tables + RLS
│       └── 002_seed_data.sql         # Initial states & species
├── public/                  # Static assets
├── middleware.ts            # Auth middleware
├── tailwind.config.ts       # Tailwind + custom colors
└── next.config.ts           # Next.js config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd huntflow
npm install --legacy-peer-deps
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy:
   - Project URL
   - Anon (public) key
   - Service role key (keep this secret!)
3. Run the migrations:
   - Go to **SQL Editor** in Supabase
   - Copy and run `supabase/migrations/001_initial_schema.sql`
   - Copy and run `supabase/migrations/002_seed_data.sql`

### 3. Configure OAuth Providers

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth credentials
5. Add to Supabase: **Authentication → Providers → Google**

**Apple OAuth:**
1. Go to [Apple Developer](https://developer.apple.com)
2. Create a Services ID
3. Configure Sign in with Apple
4. Add to Supabase: **Authentication → Providers → Apple**

**Facebook OAuth:**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add Facebook Login product
4. Add to Supabase: **Authentication → Providers → Facebook**

### 4. Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Email notifications
RESEND_API_KEY=your-resend-key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Build for Production

```bash
npm run build
npm start
```

## 📊 Database Schema

### Core Tables
- **profiles** - User profiles (extends Supabase auth.users)
- **states** - US states + Canadian provinces
- **species** - Huntable species (elk, deer, etc.)
- **state_species** - State-specific draw configuration (deadlines, fees, point systems)
- **user_states** - User's hunting states (many-to-many)
- **user_species** - User's target species (many-to-many)
- **user_applications** - Application tracking with status
- **user_points** - Preference & bonus point tracking
- **user_credentials** - Encrypted portal credentials
- **notifications** - User notifications
- **notification_preferences** - Email/push settings

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Credentials encrypted with pgcrypto
- Service role for admin operations only

## 📝 Data Requirements for 50 States

To keep HuntFlow up-to-date, you'll need to gather this data **annually** for each state:

### Per State-Species Combination:
1. **Application Deadline** (date) - When applications close
2. **Draw Date** (date) - When results are announced
3. **Point System Type**:
   - `preference` - Guaranteed tags at max points
   - `bonus` - Squared bonus chances
   - `hybrid` - Combination system
   - `none` - Pure random draw
4. **Base Application Fee** ($)
5. **Nonresident Fee** ($) - If applicable
6. **Portal URL** - State wildlife agency website
7. **Species Available** - Which animals can be hunted
8. **Notes** - Special requirements, quota info, etc.

### Example Data Entry (Montana Elk 2026):
```json
{
  "state": "Montana",
  "species": "Elk",
  "season_year": 2026,
  "application_deadline": "2026-03-15",
  "draw_date": "2026-04-30",
  "point_type": "bonus",
  "base_fee": 20.00,
  "nonresident_fee": 850.00,
  "portal_url": "https://fwp.mt.gov",
  "notes": "Combo license required for nonresidents"
}
```

### Where to Find This Data:
- **State Wildlife Agency Websites** - Primary source (all 50 states linked in seed data)
- **GoHunt** - Comprehensive draw data (subscription required)
- **Huntin' Fool** - Point data and draw odds
- **Epic Outdoors** - Western state focus
- **State-specific forums** - Rokslide, HuntTalk, etc.

### Automation Strategies:
1. **Web Scraping** (legal & ethical)
   - Use Puppeteer/Playwright to scrape official state websites
   - Set up monthly cron jobs to check for updates
   - Store historical data for point creep analytics

2. **API Partnerships**
   - Partner with GoHunt, Huntin' Fool for data feeds
   - Revenue share or licensing agreement

3. **Community Contributions**
   - Allow premium users to submit updates
   - Moderator approval workflow
   - Reward contributors with free months

4. **Manual Entry + Verification**
   - Hire seasonal workers (Nov-Feb) to update data
   - Use virtual assistants for data entry
   - Implement review queue for accuracy

## 💰 Monetization Strategy

### Free Tier
- Up to 3 states
- Up to 5 species
- Basic deadline reminders
- Point tracking
- **Target**: 80% of users (acquisition funnel)

### Premium - $79/year
- **Unlimited states**
- **Unlimited species**
- Advanced notifications (email + push)
- **Credential vault** (encrypted)
- Point creep analytics
- Priority support
- **Target**: 15% of users (main revenue driver)

### Pro - $129/year
- **Everything in Premium**
- Auto-fill assistance (Phase 2)
- Draw odds calculator
- Unit-specific recommendations
- Early access to new features
- Dedicated support
- **Target**: 5% of users (power users)

### Revenue Projections (Year 1):
- 10,000 users → 8,000 free, 1,500 premium, 500 pro
- **Revenue**: (1,500 × $79) + (500 × $129) = **$183,000**

### Additional Revenue Streams:
1. **Affiliate Partnerships**
   - Gear companies (First Lite, Sitka, etc.)
   - Booking agents
   - Optics brands
   - $5-10k/month potential

2. **Premium Content**
   - Hunt strategy guides ($9.99 each)
   - State-specific ebooks
   - Video courses on point strategy

3. **B2B Sales**
   - Outfitter management dashboard
   - Hunting clubs/groups (10+ users) - $499/year

## 🎨 Design Philosophy

**Masculine • Rugged • Professional**

### Color Palette:
- **Hunter Charcoal**: Deep blacks and grays (primary background)
- **Hunter Green**: Forest greens (#2d5016) - primary actions
- **Hunter Bronze**: Warm bronze (#cd7f32) - accents & CTAs
- **Hunter Leather**: Rich browns (#704214) - secondary elements

### Typography:
- **Display**: Recoleta (serif, rugged)
- **Body**: Inter (clean, readable)
- **Data**: Geist Mono (monospace for numbers/points)

### Visual Elements:
- Subtle camo patterns (5% opacity overlays)
- Wood grain textures on cards
- Leather-like button treatments
- Antler/trophy iconography
- State flag icons

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use service role key server-side only** - Never expose to client
3. **Implement rate limiting** - Especially on auth endpoints
4. **Encrypt sensitive data** - Credentials use pgcrypto
5. **Regular security audits** - Run `npm audit` monthly
6. **Keep dependencies updated** - Use Dependabot

## 🤝 Contributing

(Add contribution guidelines once you open-source or build a team)

## 📄 License

Proprietary - All rights reserved (update as needed)

## 🙋 Support

- **Email**: support@huntflow.app
- **Documentation**: [docs.huntflow.app](https://docs.huntflow.app)
- **Discord**: [Join our community](https://discord.gg/huntflow)

---

Built with 🦌 for hunters, by hunters.
