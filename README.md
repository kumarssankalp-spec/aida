# AIDA Corporation Website

A modern, high-performance website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Supabase** for AIDA Corporation - a leading technology solutions provider specializing in AI, Big Data, Technology Services, and Digital Marketing.

## 🚀 Features Overview

### Core Technologies
- ⚡ **Next.js 15** with App Router & Server-Side Rendering (SSR)
- 🔷 **TypeScript** - Fully type-safe codebase
- 🎨 **Tailwind CSS** - Utility-first styling with custom animations
- 🗄️ **Supabase** - PostgreSQL database with Row Level Security
- 📧 **EmailJS** - Contact form email delivery
- 🍪 **Cookie Consent** - GDPR compliant tracking

### Pages & Routes
- 🏠 **Home** (`/`) - Hero section with animated background, services showcase
- 📖 **About** (`/about`) - Company mission, vision, values, and team
- ❓ **FAQ** (`/faq`) - Frequently asked questions
- 👥 **Team** (`/team`) - Meet our team members
- 📞 **Contact** (`/contact`) - Contact form with validation
- 🚀 **Get Started** (`/get-started`) - Lead capture form with full tracking
- 💼 **Service Pages**:
  - `/services/big-data-analysis` - Big Data & Analytics solutions
  - `/services/artificial-intelligence` - AI & Machine Learning services
  - `/services/technology-services` - Tech consulting & development
  - `/services/digital-marketing` - Digital marketing strategies
- ⚖️ **Legal Pages**:
  - `/legal/privacy-policy` - Privacy policy
  - `/legal/terms-conditions` - Terms & conditions
  - `/legal/disclaimer` - Legal disclaimer
  - `/legal/cookie-policy` - Cookie usage policy

### Advanced Features

#### 1. **User Journey Tracking System**
- 📊 Tracks complete user journey across all pages
- 🕒 Session-based tracking with persistent user IDs
- 📍 Geolocation tracking (country, city, region, timezone)
- 🖥️ Device fingerprinting (browser, OS, screen resolution, mobile/tablet detection)
- 🔗 Referrer tracking and UTM parameter capture
- ⏱️ Time spent per page and scroll depth tracking
- 🔄 Revisit detection with visit history
- 💾 Automatic save to Supabase `user_journeys` table

#### 2. **Lead Data Capture System**
- 📝 Separate lead form on "Get Started" and "Digital Marketing" pages
- 👤 Captures: First name, last name, email, phone, company, services, message
- 🌍 Full tracking data: geolocation, device info, UTM parameters
- 💾 Saves to dedicated `lead_data` table via secure API route
- 🔐 Uses Supabase service role key for server-side inserts
- ✅ Independent from user journey system

#### 3. **Newsletter Subscription**
- 📬 Footer newsletter signup form
- 💾 Stores in `newsletter_subscribers` table
- ✉️ Optional email notification integration

#### 4. **SEO Optimization**
- 🔍 Complete meta tags with Open Graph and Twitter Cards
- 🗺️ Dynamic sitemap generation (`/sitemap.xml`)
- 🤖 Robots.txt configuration (`/robots.txt`)
- 📊 Structured data for all pages
- 🎯 Keyword-optimized content
- 📱 Mobile-first responsive design
- ⚡ Optimized Core Web Vitals

#### 5. **Email Integration (EmailJS)**
- 📧 Contact form submissions via EmailJS
- ✅ Form validation and error handling
- 🔔 Real-time success/error notifications

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation & Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
aida/
├── app/
│   ├── api/                      # API Routes
│   │   └── lead/
│   │       └── route.ts          # Server-side lead submission API
│   ├── about/                    # About page
│   ├── contact/                  # Contact form page
│   ├── faq/                      # FAQ page
│   ├── team/                     # Team page
│   ├── get-started/              # Lead capture page
│   ├── legal/                    # Legal pages
│   │   ├── privacy-policy/
│   │   ├── terms-conditions/
│   │   ├── disclaimer/
│   │   └── cookie-policy/
│   ├── services/                 # Service pages
│   │   ├── big-data-analysis/
│   │   ├── artificial-intelligence/
│   │   ├── technology-services/
│   │   └── digital-marketing/
│   ├── layout.tsx                # Root layout with tracking
│   ├── page.tsx                  # Homepage with animated hero
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt config
│   └── globals.css               # Global styles + animations
│
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer with newsletter signup
│   ├── CookieConsent.tsx         # GDPR cookie consent banner
│   ├── JourneyTracker.tsx        # User journey tracking component
│   ├── ScrollToTop.tsx           # Scroll to top button
│   └── ui/                       # UI components
│       ├── aether-flow-hero.tsx  # Animated hero section
│       └── scrollstack.tsx       # Scroll-based animations
│
├── lib/
│   ├── supabase.ts               # Supabase client + data functions
│   ├── journeyTracking.ts        # User journey tracking logic
│   ├── emailService.ts           # EmailJS integration
│   └── analytics.ts              # Analytics utilities
│
├── types/
│   └── vanta.d.ts                # TypeScript declarations
│
├── public/                       # Static assets
│   ├── favicon_io/               # Favicons
│   └── ai_page/                  # Images
│
├── SQL Files (Database Setup)
│   ├── LEAD_DATA_TABLE.sql       # Lead data table schema
│   ├── FIX_LEAD_DATA_OWNERSHIP.sql  # RLS policies fix
│   ├── DELETE_ALL_DATA.sql       # Clear all data utility
│   └── TRACKING_EXPLAINED.md     # Journey tracking documentation
│
└── Configuration Files
    ├── .env                      # Environment variables
    ├── next.config.ts            # Next.js configuration
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.ts        # Tailwind CSS config
    └── package.json              # Dependencies
```

## 🗄️ Database Schema

### 1. `user_journeys` Table
Stores complete user session tracking data:
- Session ID, User ID (persistent across sessions)
- Pages visited with timestamps and time spent
- Device info: browser, OS, screen resolution, mobile/tablet
- Geolocation: country, city, region, postal code, coordinates
- UTM parameters, referrer, language, locale
- Email, name, phone (if provided via forms)
- Revisit tracking with visit history

### 2. `lead_data` Table
Captures lead form submissions from "Get Started" page:
- Contact info: first name, last name, email, phone, company
- Services interested in, message
- Complete tracking data (inherited from journey)
- Source page, UTM parameters
- Email sent status, contacted flag
- **Uses service role API route** for secure inserts

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. **Import** your GitHub repository
4. Select **Framework Preset:** Next.js

### Step 3: Add Environment Variables
In Vercel Dashboard → **Project Settings** → **Environment Variables**, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production, Preview, Development |
| `FRONTEND_URL` | `https://aidacorp.in` | Production |

**⚠️ Important:** Never commit `.env` to GitHub. Add it to `.gitignore`.

### Step 4: Deploy
Click **"Deploy"** - Vercel will automatically:
- Build the Next.js app
- Enable SSR
- Set up CDN
- Generate optimized assets

### Step 5: Configure Domain
1. In Vercel → **Project Settings** → **Domains**
2. Add your custom domain: `aidacorp.in`
3. Update DNS records as instructed

// Track events
trackEvent(eventName, eventData)

// Save journey to Supabase
saveJourneyToSupabase(data)
```

### Lead Submission (`app/api/lead/route.ts`)
```typescript
// POST /api/lead
// Accepts lead data and saves to lead_data table
// Uses SUPABASE_SERVICE_ROLE_KEY for secure insert
```

### Email Service (`lib/emailService.ts`)
```typescript
// Send contact form email
sendContactForm(formData)

// Save journey + lead data
saveJourneyToSupabase(data)
```

### Newsletter (`lib/supabase.ts`)
```typescript
// Subscribe to newsletter
subscribeToNewsletter(email, name, phone)
```

## 🎨 Customization Guide

### 1. Update Company Information
- **Contact Details:** `app/contact/page.tsx`
- **About Content:** `app/about/page.tsx`
- **Team Members:** `app/team/page.tsx`
- **Footer Links:** `components/Footer.tsx`

### 2. Modify Services
- **Service Pages:** `app/services/[service-name]/page.tsx`
- **Add New Service:** Create new folder in `app/services/`

### 3. Update SEO
- **Global Meta:** `app/layout.tsx`
- **Page Meta:** Each `page.tsx` file has its own metadata
- **Sitemap URLs:** `app/sitemap.ts`
## 📊 Analytics & Tracking

### Automatic Tracking
- ✅ **Page Views** - Every page visit tracked with timestamp
- ✅ **Time on Page** - Measures engagement per page
- ✅ **Scroll Depth** - Tracks how far users scroll
- ✅ **Device Fingerprinting** - Browser, OS, screen resolution
- ✅ **Geolocation** - Country, city, region, timezone
- ✅ **UTM Parameters** - Campaign tracking
## 🌐 SEO Best Practices

- ✅ **Server-Side Rendering (SSR)** - All pages pre-rendered for search engines
- ✅ **Semantic HTML** - Proper heading hierarchy, landmarks
- ✅ **Meta Tags** - Complete title, description, keywords for each page
- ✅ **Open Graph** - Social media preview cards (Facebook, LinkedIn)
- ✅ **Twitter Cards** - Twitter-specific meta tags
- ✅ **Dynamic Sitemap** - Auto-generated `sitemap.xml`
- ✅ **Robots.txt** - Search engine crawling rules
- ✅ **Structured Data** - JSON-LD schemas (coming soon)
- ✅ **Fast Load Times** - Optimized images, code splitting
- ✅ **Mobile-First** - Responsive design
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Clean URLs** - `/about`, `/services/ai`, etc.
- ✅ **Core Web Vitals** - Optimized LCP, FID, CLS

## 📱 Responsive Design

Fully responsive across all devices using Tailwind breakpoints:
- **xs:** < 640px (small mobile)
- **sm:** 640px+ (mobile)
- **md:** 768px+ (tablet)
## 🐛 Troubleshooting

### Issue: "Permission denied for table lead_data"
**Solution:** Run `FIX_LEAD_DATA_OWNERSHIP.sql` in Supabase SQL Editor

### Issue: Environment variables not loading
**Solution:** Restart dev server: `npm run dev`

### Issue: Journey tracking not working
**Solution:** Check browser console for errors, ensure Supabase is configured

### Issue: Contact form not sending emails
**Solution:** Verify EmailJS credentials in `.env` file

### Issue: Build errors on Vercel
**Solution:** Ensure all environment variables are set in Vercel dashboard

## 📚 Documentation Files

- `TRACKING_EXPLAINED.md` - Complete journey tracking documentation
- `LEAD_DATA_TABLE.sql` - Lead data table schema
- `FIX_LEAD_DATA_OWNERSHIP.sql` - RLS policy fixes
- `DELETE_ALL_DATA.sql` - Clear all data utility
- `README.md` - This file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📞 Support

For questions or issues:
- **Website:** [aidacorp.in](https://aidacorp.in)
- **Email:** contact@aidacorp.in
- **GitHub Issues:** Create an issue in this repository

## 📄 License

© 2025 AIDA Corporation. All rights reserved.

---

## 🎯 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create Supabase project
- [ ] Run database SQL scripts
- [ ] Configure `.env` file
- [ ] Run `npm run dev`
- [ ] Test all forms (contact, newsletter, get started)
- [ ] Verify journey tracking in Supabase
- [ ] Set up EmailJS (optional)
- [ ] Deploy to Vercel
- [ ] Add environment variables to Vercel
- [ ] Configure custom domain

---

**Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Supabase**

**Stack:** Next.js • React • TypeScript • Tailwind CSS • Supabase • PostgreSQL • EmailJS • Verceltion
- 🔑 **Service Role Key** - Secure server-side API routes
- 🚫 **Environment Variables** - Sensitive keys never exposed to client
- 🔒 **HTTPS Only** - Secure connections enforced
- 🍪 **Cookie Consent** - User permission before tracking
- 📝 **Input Validation** - Form data sanitization
- 🔐 **Rate Limiting** - API route protection (configurable)licy, terms, cookie policy

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
2. **Import project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
3. **Configure:**
   - Framework Preset: Next.js
   - Root Directory: `./`
4. **Deploy** - Vercel will automatically build and deploy

Your site will have automatic SSR enabled!

## 📊 Analytics & Tracking

The website includes comprehensive tracking capabilities:

- **Page Views:** Automatically tracked
- **User Journey:** Session-based journey tracking
- **Events:** Button clicks, form submissions, scroll depth
- **Cookie Consent:** GDPR-compliant consent management

## 🌐 SEO Best Practices Implemented

- ✅ Server-side rendering for all pages
- ✅ Semantic HTML structure
- ✅ Optimized meta tags and descriptions
- ✅ Open Graph and Twitter Card support
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Fast page load times
- ✅ Mobile-responsive design
- ✅ Accessible markup
- ✅ Clean URL structure

## 📱 Responsive Design

The site is fully responsive with Tailwind's default breakpoints:
- **sm:** 640px (mobile)
- **md:** 768px (tablet)
- **lg:** 1024px (laptop)
- **xl:** 1280px (desktop)
- **2xl:** 1536px (large desktop)

## 📄 License

© 2025 AIDA Corporation. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
