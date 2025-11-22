# 📋 HuntFlow Data Requirements Guide

This document outlines **exactly** what data you need to collect for all 50 US states (+ 10 Canadian provinces) to keep HuntFlow accurate and valuable.

## 🎯 Overview

HuntFlow tracks hunting application deadlines, draw dates, point systems, and fees across North America. To provide value, this data must be:
- **Accurate** (verified from official sources)
- **Current** (updated annually, preferably by November)
- **Comprehensive** (all major big game species per state)

## 📊 Data Collection Checklist

### For Each State-Species Combination

#### 1. Basic Information
- [ ] **State Code** (e.g., MT, WY, CO)
- [ ] **State Name** (e.g., Montana)
- [ ] **Species Name** (e.g., Elk, Mule Deer, Pronghorn)
- [ ] **Species Slug** (e.g., elk, mule-deer, pronghorn)
- [ ] **Season Year** (e.g., 2026)

#### 2. Critical Dates
- [ ] **Application Deadline** (exact date, format: YYYY-MM-DD)
- [ ] **Draw Results Date** (when results are posted)
- [ ] **Season Start** (optional, for reference)
- [ ] **Season End** (optional, for reference)

#### 3. Point System Information
- [ ] **Point Type**:
  - `preference` - Guaranteed tag at max points (WY, CO)
  - `bonus` - Squared/weighted bonus (MT, ID, AZ)
  - `hybrid` - Combination system (UT)
  - `none` - Pure random (NM)
- [ ] **Max Points** - Current highest point holder (for analytics)
- [ ] **Point Cost** - Cost to buy a point
- [ ] **Automatic Point Award** - Do you get a point when unsuccessful?

#### 4. Fee Structure
- [ ] **Application Fee** (non-refundable)
- [ ] **License Fee (Resident)** (if drawn)
- [ ] **License Fee (Nonresident)** (if drawn)
- [ ] **Preference Point Fee** (if applicable)
- [ ] **Combo License Required?** (Yes/No + cost)
- [ ] **Other Fees** (habitat stamp, conservation license, etc.)

#### 5. Application Details
- [ ] **Portal URL** - Direct link to online application system
- [ ] **Hunting License Required?** - Must have base license before applying?
- [ ] **Residency Requirements** - How long to qualify as resident?
- [ ] **Party Application** - Can you apply as a group?
- [ ] **Youth Opportunities** - Special tags/odds for youth hunters?

#### 6. Draw Odds & Statistics (Optional but Valuable)
- [ ] **2025 Draw Odds** - % success rate by point level
- [ ] **Total Applicants** - How many people applied in 2025
- [ ] **Tags Available** - Total quota
- [ ] **Point Creep** - Average points needed (trend over 5 years)

#### 7. Special Notes
- [ ] **Leftover Tags** - Are there leftover tag sales?
- [ ] **OTC Available** - Over-the-counter tags available?
- [ ] **Landowner Tags** - Private land tags/vouchers available?
- [ ] **Special Hunts** - Archery-only, muzzleloader, etc.
- [ ] **Unit-Specific Info** - Different rules per hunt unit?

---

## 🌎 Complete State List (50 States + 10 Provinces)

### Priority 1: Western States (High-Value Big Game)
These states have the most serious hunters and complex point systems:

| State | Key Species | Point Type | Difficulty |
|-------|------------|------------|-----------|
| **Montana** | Elk, Mule Deer, Bighorn | Bonus (squared) | High |
| **Wyoming** | Elk, Deer, Antelope, Moose | Preference | High |
| **Colorado** | Elk, Deer, Pronghorn | Preference (weighted) | High |
| **Idaho** | Elk, Deer, Moose | Bonus | Medium |
| **Utah** | Elk, Deer, Bison, Bighorn | Bonus (squared) | High |
| **Arizona** | Elk, Deer, Bighorn, Bison | Bonus (squared) | Very High |
| **New Mexico** | Elk, Oryx, Ibex, Barbary | None (random) | Medium |
| **Nevada** | Elk, Bighorn, Mule Deer | Bonus (squared) | Very High |
| **Oregon** | Elk, Deer, Pronghorn | Preference | Medium |
| **Washington** | Elk, Deer, Moose | Preference | Medium |

### Priority 2: Great Plains & Midwest
| State | Key Species | Notes |
|-------|------------|-------|
| **North Dakota** | Deer, Pronghorn | Limited entry |
| **South Dakota** | Deer, Pronghorn, Bighorn | Good nonresident opportunity |
| **Nebraska** | Deer, Pronghorn | Mostly OTC |
| **Kansas** | Deer, Pronghorn | Preference points |
| **Oklahoma** | Deer | Mostly OTC |
| **Texas** | Exotic species, Deer | Mostly private land |
| **Wisconsin** | Deer, Bear | Some draws |
| **Minnesota** | Deer, Moose | Limited moose lottery |
| **Iowa** | Deer | Preference points |
| **Missouri** | Deer, Turkey | Mostly OTC |

### Priority 3: Eastern States
| State | Key Species | Notes |
|-------|------------|-------|
| **Pennsylvania** | Deer, Bear | Some draws |
| **New York** | Deer, Bear | Limited entry for some units |
| **Maine** | Moose, Deer, Bear | Moose lottery very popular |
| **Vermont** | Deer, Moose | Limited moose |
| **Others** | Check individually | Many are OTC or minimal draw systems |

### Canadian Provinces (Bonus Market)
| Province | Key Species | Notes |
|----------|------------|-------|
| **Alberta** | Elk, Moose, Bighorn | Draw system |
| **British Columbia** | Elk, Moose, Bighorn, Grizzly | Complex draw |
| **Saskatchewan** | Elk, Moose | Some draws |
| **Manitoba** | Moose, Elk | Limited entry |
| **Others** | Check individually | Varies widely |

---

## 🔍 Where to Find This Data

### Official State Agency Websites
**Always the primary source.** Each state's Department of Fish & Wildlife publishes:
- Annual draw regulations (PDF)
- Application deadline calendars
- Fee schedules
- Point system rules
- Historical draw statistics

**Example URLs:**
- Montana: https://fwp.mt.gov
- Wyoming: https://wgfd.wyo.gov
- Colorado: https://cpw.state.co.us

### Commercial Data Providers
These services aggregate data (subscription required):

1. **GoHunt** (https://gohunt.com)
   - **Best for**: Draw odds, point data, unit research
   - **Cost**: ~$150/year
   - **API?**: Potentially licensable

2. **Huntin' Fool** (https://huntinfool.com)
   - **Best for**: Draw strategies, point consulting
   - **Cost**: ~$125/year
   - **API?**: No public API

3. **Epic Outdoors** (https://epicoutdoors.com)
   - **Best for**: Western states focus
   - **Cost**: ~$50/year
   - **API?**: No

4. **Toprut** (https://toprut.com)
   - **Best for**: Mapping + draw data
   - **Cost**: $30-100/year
   - **API?**: Potentially

### Community Resources
- **Rokslide.com** - Forum with deadline reminders
- **HuntTalk** - Randy Newberg's forum
- **24hourcampfire.com** - Old-school hunting forum
- **State-specific Facebook groups**

---

## 🤖 Automation Strategies

### 1. Web Scraping (Ethical & Legal)

**Best for**: Public, structured data on official websites

**Tools:**
- Puppeteer (Node.js)
- Playwright (cross-browser)
- Cheerio (HTML parsing)

**Example: Scraping Montana FWP**
```javascript
// Pseudocode
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://fwp.mt.gov/hunt/draw-information');

const deadlines = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.deadline-item')).map(item => ({
    species: item.querySelector('.species').textContent,
    deadline: item.querySelector('.date').textContent,
    // ... more fields
  }));
});
```

**Frequency**: Run monthly (Nov-Mar) to catch updates

**Legal Considerations:**
- Only scrape public data
- Respect robots.txt
- Rate limit requests (1 req/second max)
- Don't overwhelm servers
- Cache data, don't re-fetch constantly

### 2. API Partnerships

**Option A: License from GoHunt**
- Negotiate data feed license ($$$)
- Revenue share model (10-20% of subscription fees)
- White-label their draw odds data

**Option B: Build own partnerships**
- Contact state agencies directly
- Some states provide data feeds (Montana, Colorado)
- Free or low-cost for nonprofit use

### 3. Crowdsourcing (Community Contributions)

**Implementation:**
1. Create admin panel for data entry
2. Allow Pro subscribers to submit updates
3. Moderator approval workflow
4. Reward contributors (free month per 5 verified submissions)

**Benefits:**
- Distributed workload
- Community engagement
- Real-time updates

**Risks:**
- Accuracy issues (need verification)
- Spam/trolling (need moderation)

### 4. Hybrid Approach (Recommended)

**Phase 1 (Year 1):**
- Manual data entry for Priority 1 states (10 western states)
- Hire VA or seasonal workers ($500-1000/month, Nov-Feb)
- Use spreadsheet template → import to Supabase

**Phase 2 (Year 2):**
- Build web scraper for top 5 states (MT, WY, CO, ID, UT)
- Partner with GoHunt for draw odds API
- Add community submission feature for Premium users

**Phase 3 (Year 3):**
- Full automation for 20+ states
- Machine learning for deadline prediction
- Automatic notification when states publish new data

---

## 📝 Data Entry Template

Use this Google Sheets template for manual data collection:

| State Code | State Name | Species | Season Year | App Deadline | Draw Date | Point Type | Resident Fee | Nonresident Fee | Portal URL | Notes |
|------------|-----------|---------|-------------|-------------|----------|-----------|-------------|----------------|-----------|-------|
| MT | Montana | Elk | 2026 | 2026-03-15 | 2026-04-30 | bonus | $20 | $850 | https://fwp.mt.gov | Combo required |
| WY | Wyoming | Elk | 2026 | 2026-01-31 | 2026-03-31 | preference | $15 | $700 | https://wgfd.wyo.gov | Regular & special |

**Import Process:**
1. Export as CSV
2. Run SQL import script (see `/scripts/import-data.sql`)
3. Verify in Supabase dashboard

---

## 🎯 Annual Update Workflow

### November
- [ ] Monitor state websites for new regulation postings
- [ ] Download all 2026 season PDFs
- [ ] Start spreadsheet for 2026 data

### December
- [ ] Complete Priority 1 states (10 western states)
- [ ] Import to Supabase staging environment
- [ ] QA/testing

### January
- [ ] Complete Priority 2 states (Great Plains, Midwest)
- [ ] Push to production
- [ ] Email blast to users: "2026 deadlines now live!"

### February-October
- [ ] Monitor for mid-season changes
- [ ] Update leftover tag sales
- [ ] Track point creep (after draw results)

---

## 🚀 Quick Start: Getting Your First 10 States Live

**Week 1: Western Big 5**
1. Montana (elk, deer, pronghorn, bighorn)
2. Wyoming (elk, deer, pronghorn, moose)
3. Colorado (elk, deer, pronghorn)
4. Idaho (elk, deer, moose)
5. Utah (elk, deer, bison)

**Week 2: Western Next 5**
6. Arizona (elk, deer, bighorn)
7. New Mexico (elk, oryx, ibex)
8. Nevada (elk, bighorn, deer)
9. Oregon (elk, deer)
10. Washington (elk, deer)

**This gives you 80% of serious big game hunters!**

---

## 📞 Need Help?

If you're stuck gathering data or need recommendations on automation:
- Email: data@huntflow.app
- Consult with Huntin' Fool or GoHunt
- Hire a hunting industry VA (Upwork, Fiverr)

---

**Remember:** Accuracy > Speed. It's better to have 10 states with perfect data than 50 states with errors. Hunters will lose trust fast if deadlines are wrong.
