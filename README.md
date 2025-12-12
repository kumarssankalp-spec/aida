# AIDA Corporation Website

to use 
https://video.wixstatic.com/video/11062b_164f323661ce4045a0cf93375453524f/1080p/mp4/file.mp4


A modern, SEO-friendly website built with Next.js 15, TypeScript, and Tailwind CSS for AIDA Corporation - a leading technology solutions provider specializing in AI, Big Data, Technology Services, and Digital Marketing.

## 🚀 Features

### Core Features
- ✅ **Server-Side Rendering (SSR)** - Automatic SSR with Next.js App Router for optimal SEO
- ✅ **Fully Responsive** - Mobile-first design that works on all screen sizes
- ✅ **Fast Performance** - Optimized for Core Web Vitals and page speed
- ✅ **TypeScript** - Type-safe code for better development experience
- ✅ **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Pages
- 🏠 **Home Page** - Hero section, services overview, and CTAs
- 📖 **About Us** - Company mission, vision, story, and core values
- 📞 **Contact** - Contact form with validation and contact information
- 💼 **Service Pages**:
  - Big Data & Analysis
  - Artificial Intelligence
  - Technology Services
  - Digital Marketing
- ⚖️ **Legal Pages**:
  - Privacy Policy
  - Terms of Service
  - Disclaimer
  - Cookie Policy

### SEO Optimization
- 🔍 Complete meta tags and Open Graph support
- 🗺️ Dynamic sitemap generation
- 🤖 Robots.txt configuration
- 📊 Structured metadata for all pages
- 🎯 Keyword optimization
- 📱 Mobile-friendly and responsive

### Cookie Consent & Tracking
- 🍪 Cookie consent banner
- 📈 User journey tracking
- 📊 Analytics integration ready (Google Analytics, Facebook Pixel, etc.)
- 🎯 Event tracking utilities
- 🔒 GDPR compliant

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
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── legal/              # Legal pages
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   ├── disclaimer/
│   │   └── cookie-policy/
│   ├── services/           # Service pages
│   │   ├── big-data-analysis/
│   │   ├── artificial-intelligence/
│   │   ├── technology-services/
│   │   └── digital-marketing/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots.txt
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with links
│   └── CookieConsent.tsx   # Cookie banner
├── lib/
│   └── analytics.ts        # Tracking utilities
└── public/                 # Static assets
```

## 🎨 Customization

### Update Company Information

1. **Contact Details:** Edit contact information in `app/contact/page.tsx`
2. **Footer Links:** Modify `components/Footer.tsx`
3. **About Content:** Update `app/about/page.tsx`

### Configure Analytics

1. **Open** `lib/analytics.ts`
2. **Uncomment** the Google Analytics code
3. **Replace** `GA_MEASUREMENT_ID` with your tracking ID
4. **Add** other tracking scripts as needed (Facebook Pixel, etc.)

### Update SEO Settings

1. **Meta Tags:** Edit `app/layout.tsx` for global metadata
2. **Sitemap:** Update URLs in `app/sitemap.ts`
3. **Domain:** Domain is already set to `aidacorp.in`

## 🚀 Deployment

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
