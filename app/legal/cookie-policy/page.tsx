'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8
    } 
  }
};

export default function CookiePolicyPage() {
  const lastUpdated = 'November 16, 2025';
  const [activePoint, setActivePoint] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      number: "01",
      title: "What Are Cookies & Tracking Technologies",
      bullets: [
        "Cookies are small text files placed on your device when you visit aidacorp.in (Website) and dashboard.aidacorp.in (Dashboard)",
        "Cookies store information about your browsing session, preferences, and activities",
        "Session Cookies expire when you close your browser and are used for temporary data storage like shopping carts and login sessions",
        "Persistent Cookies remain on your device for a set period (days, months, or years) and remember your preferences across multiple visits",
        "First-Party Cookies are set by AIDA Corporation directly from our Sites for functionality, analytics, and personalization",
        "Third-Party Cookies are set by external services like analytics providers, advertising networks, and social media platforms",
        "Similar Tracking Technologies include:",
        "  • Web Beacons (pixel tags) that track email opens and page views",
        "  • Local Storage for larger data storage in your browser",
        "  • Session Storage for temporary data during a single session",
        "  • Fingerprinting that creates unique device identifiers",
        "  • ETags for cache validation and tracking",
        "These technologies enable essential website functionality, enhance user experience, provide analytics insights, deliver personalized content, measure advertising effectiveness, and protect against fraud"
      ]
    },
    {
      number: "02",
      title: "Comprehensive Cookie Usage on Both Sites",
      bullets: [
        "AIDA Corporation uses cookies extensively on both aidacorp.in and dashboard.aidacorp.in",
        "Essential Functionality Cookies ensure:",
        "  • Security authentication and session management",
        "  • User login and account access",
        "  • CSRF protection against attacks",
        "  • Load balancing across servers",
        "  • Error detection and logging",
        "  • API authentication tokens",
        "  • Form submission security",
        "Dashboard-Specific Cookies manage:",
        "  • Dashboard feature access and permissions",
        "  • Workspace and project settings",
        "  • Data visualization preferences",
        "  • Report generation parameters",
        "  • Collaborative editing sessions",
        "  • Real-time notification delivery",
        "  • Auto-save and draft recovery",
        "  • Multi-factor authentication tokens",
        "Analytics & Performance Cookies track:",
        "  • Page views, unique visitors, and session duration",
        "  • User navigation paths and clickstreams",
        "  • Feature usage and adoption metrics",
        "  • Search queries and filter applications",
        "  • Conversion funnels and goal completions",
        "  • A/B test variations and experiments",
        "  • Performance bottlenecks and load times",
        "  • Error rates and crash analytics",
        "Personalization Cookies remember:",
        "  • Language and locale preferences",
        "  • Theme and display settings",
        "  • Dashboard layout customizations",
        "  • Saved filters and search queries",
        "  • Recently viewed items and pages",
        "  • Bookmarked content and favorites",
        "  • Notification preferences and quiet hours",
        "  • Timezone and date format settings"
      ]
    },
    {
      number: "03",
      title: "Third-Party Services & Cookie Ecosystem",
      bullets: [
        "We partner with trusted third-party services that may set cookies",
        "Google Services including:",
        "  • Google Analytics (_ga, _gid, _gat_gtag) for comprehensive website analytics tracking visitors, sessions, bounce rates, and conversions",
        "  • Google Ads (IDE, DSID, _gcl_au) for conversion tracking, remarketing campaigns, and ROI measurement",
        "  • Google Tag Manager for centralized tag management and event tracking",
        "  • Google Fonts for web typography with minimal data collection",
        "Social Media Platforms including:",
        "  • Facebook Pixel (fr, _fbp) for ad targeting, conversion tracking, and custom audiences",
        "  • LinkedIn Insight Tag (bcookie, lidc) for B2B advertising and professional targeting",
        "  • Twitter/X Analytics for social media engagement tracking",
        "  • Social sharing buttons that may set cookies when rendered",
        "Marketing & Advertising including:",
        "  • Retargeting pixels from various ad networks",
        "  • Programmatic advertising exchanges and DSPs",
        "  • Affiliate marketing tracking cookies",
        "  • Email marketing platform cookies (open rates, click tracking)",
        "  • Conversion attribution cookies linking ads to conversions",
        "Communication & Support including:",
        "  • Live chat widgets (Intercom, Drift, etc.) for customer support and lead generation",
        "  • Email service providers (SendGrid, EmailJS) for transactional and marketing emails",
        "  • Video conferencing tools (Zoom, Google Meet) for embedded meetings",
        "  • CRM integrations (HubSpot, Salesforce) for contact management",
        "Cloud Infrastructure & CDN including:",
        "  • Cloudflare cookies (__cfduid, cf_clearance) for DDoS protection, bot management, and CDN optimization",
        "  • AWS CloudFront for content delivery acceleration",
        "  • Fastly or other CDNs for global content distribution"
      ]
    },
    {
      number: "04",
      title: "Detailed Cookie Catalog & Inventory",
      bullets: [],
      hasTable: true
    },
    {
      number: "05",
      title: "User Journey & Behavior Tracking",
      bullets: [
        "Advanced tracking for understanding user behavior and improving services",
        "Session Tracking:",
        "  • Unique session IDs (UUID v4) generated for each visit",
        "  • Stored in session_id cookie and database",
        "  • Tracking session start/end times, total duration, and page views per session",
        "Clickstream Analysis:",
        "  • Recording every click, scroll, and interaction",
        "  • Capturing mouse movement heatmaps and attention patterns",
        "  • Identifying popular content and navigation paths",
        "  • Detecting usability issues and drop-off points",
        "  • Analyzing form abandonment and completion rates",
        "Event Tracking for custom events and user actions:",
        "  • Button clicks and CTA interactions",
        "  • Video plays, pauses, and completion rates",
        "  • File downloads and document views",
        "  • External link clicks",
        "  • Search queries and result interactions",
        "  • Filter applications and data exports",
        "  • Error messages and support requests",
        "Funnel & Conversion Tracking:",
        "  • Monitoring multi-step processes from landing to conversion",
        "  • Identifying bottlenecks and abandonment stages",
        "  • A/B testing different funnel variations",
        "  • Optimizing for higher conversion rates",
        "  • Tracking micro-conversions and engagement milestones",
        "Cross-Device Tracking:",
        "  • Attempting to recognize users across devices (with consent)",
        "  • Using probabilistic and deterministic matching",
        "  • Enabling seamless cross-device experiences",
        "  • Attributing conversions to multiple touch points",
        "  • Understanding multi-device customer journeys",
        "Data Privacy & Anonymization:",
        "  • IP addresses anonymized before storage",
        "  • Personally identifiable information (PII) excluded from analytics",
        "  • Aggregated data for reporting and insights",
        "  • Option to delete your journey data upon request",
        "  • Compliance with GDPR, CCPA, and DPDP Act requirements"
      ]
    },
    {
      number: "06",
      title: "Cookie Duration & Expiration Policies",
      bullets: [
        "Different cookie types have varying lifespans based on their purpose",
        "Session Cookies:",
        "  • Expiring immediately when browser closes",
        "  • Used for login sessions, shopping carts, form data, CSRF tokens, and temporary preferences",
        "Short-Term Persistent Cookies (24 hours to 30 days):",
        "  • Analytics tracking (Google Analytics _gid lasts 24 hours)",
        "  • Functional preferences (language, theme)",
        "  • Authentication tokens (remember me)",
        "Medium-Term Persistent Cookies (1 month to 1 year):",
        "  • User preferences and settings",
        "  • Marketing consent records",
        "  • Analytics aggregation (Google Analytics _ga lasts 2 years)",
        "  • Personalization data",
        "Long-Term Persistent Cookies (1 to 2 years):",
        "  • Advertising and remarketing (_fbp, IDE last up to 2 years)",
        "  • Long-term analytics trends",
        "  • Cross-visit user recognition",
        "Manual Deletion:",
        "  • You can delete cookies at any time through browser settings",
        "  • Clearing specific cookies or all cookies",
        "  • Resetting preferences and sessions",
        "Automatic Renewal:",
        "  • Some cookies refresh their expiration on each visit",
        "  • Extending their duration with continued use",
        "  • Expiring after period of inactivity",
        "Cookie Rotation:",
        "  • Some services periodically rotate cookie identifiers",
        "  • Creating new cookies and deprecating old ones",
        "  • Maintaining tracking while respecting privacy"
      ]
    },
    {
      number: "07",
      title: "Managing Cookie Preferences & Consent",
      bullets: [
        "You have complete control over cookie usage on our Sites",
        "Cookie Consent Banner:",
        "  • Displayed on first visit to both aidacorp.in and dashboard.aidacorp.in",
        "  • Providing clear options to Accept All Cookies, Reject Non-Essential Cookies, or Customize Preferences by category",
        "Preference Management:",
        "  • Selection by category (Essential, Analytics, Functional, Marketing)",
        "  • Granular control over specific third-party cookies",
        "  • Ability to change preferences at any time",
        "  • Cookie preferences synchronized across our Sites",
        "Browser-Level Controls through browser settings:",
        "  • Block all cookies (may break website functionality)",
        "  • Block third-party cookies only (recommended for privacy)",
        "  • View and delete specific cookies",
        "  • Set exceptions for trusted sites",
        "  • Receive cookie notifications before setting",
        "Browser-Specific Instructions:",
        "  • Google Chrome: Settings > Privacy and security > Cookies",
        "  • Firefox: Settings > Privacy & Security > Cookies",
        "  • Safari: Preferences > Privacy > Cookies",
        "  • Edge: Settings > Cookies and site permissions",
        "  • Opera: Settings > Privacy & security > Cookies",
        "Mobile Device Settings:",
        "  • iOS Safari: Settings > Safari > Block All Cookies",
        "  • Android Chrome: Settings > Site Settings > Cookies",
        "  • Other mobile browsers with varying options",
        "Global Privacy Control (GPC):",
        "  • Respecting GPC signals from browsers and extensions",
        "  • Automatically applying privacy preferences",
        "  • Opting out of data sales and sharing",
        "Cookie Preference Center:",
        "  • Accessible from footer link on both Sites",
        "  • Managing all cookie categories and vendors",
        "  • Viewing detailed cookie information",
        "  • Exporting consent records for compliance"
      ]
    },
    {
      number: "08",
      title: "Impact of Blocking or Disabling Cookies",
      bullets: [
        "Understanding the consequences of cookie management decisions",
        "Essential Cookies Cannot Be Disabled:",
        "  • Website will not function properly without them",
        "  • Login and authentication will fail",
        "  • Security features will be compromised",
        "  • Forms and submissions will not work",
        "  • Dashboard features will be inaccessible",
        "Blocking Analytics Cookies results in:",
        "  • We cannot understand user behavior",
        "  • Service improvements will be limited",
        "  • User experience optimization is hindered",
        "  • Bug detection may be delayed",
        "  • Performance issues may persist longer",
        "Blocking Functional Cookies causes:",
        "  • Loss of personalized experience",
        "  • Preferences not remembered across sessions",
        "  • Need to reconfigure settings each visit",
        "  • Reduced convenience and usability",
        "  • Some features may not work as expected",
        "Blocking Marketing Cookies leads to:",
        "  • You'll still see ads, just less relevant",
        "  • Remarketing campaigns won't function",
        "  • Ad frequency capping won't work",
        "  • Marketing attribution is lost",
        "  • You may see duplicate ads",
        "Complete Cookie Blocking results in:",
        "  • Severe website functionality issues",
        "  • Inability to use our Services fully",
        "  • Need to re-enter information constantly",
        "  • Degraded user experience",
        "  • Potential account lockouts",
        "Recommended Settings:",
        "  • Allow essential and functional cookies for best experience",
        "  • Consider allowing analytics to help us improve",
        "  • Opt out of marketing cookies if privacy is priority",
        "  • Use browser's third-party cookie blocking",
        "  • Regularly review and update preferences"
      ]
    },
    {
      number: "09",
      title: "Do Not Track (DNT) & Global Privacy Signals",
      bullets: [
        "Our approach to browser privacy signals and opt-out mechanisms",
        "Do Not Track (DNT) Signals:",
        "  • Current industry status: no universal DNT standard",
        "  • Browsers send DNT: 1 header when enabled",
        "  • Many websites do not honor DNT signals",
        "  • Our Sites currently do not respond to DNT",
        "Global Privacy Control (GPC):",
        "  • Emerging standard we respect",
        "  • GPC signals from supported browsers",
        "  • Automatically opt-out of data sales/sharing",
        "  • Apply privacy-protective defaults",
        "  • Comply with CCPA, GDPR requirements",
        "Our Commitment to Privacy:",
        "  • Actively monitoring privacy signal developments",
        "  • Planning to implement DNT when standardized",
        "  • Honoring GPC and similar signals",
        "  • Providing transparency in our practices",
        "  • Giving you control through cookie banner",
        "Alternative Opt-Out Methods:",
        "  • Browser cookie settings to block third-party cookies",
        "  • Using privacy-focused browsers (Brave, Firefox with strict tracking protection)",
        "  • Installing privacy extensions (uBlock Origin, Privacy Badger)",
        "  • Opting out via industry tools (NAI, DAA opt-out pages)",
        "  • Managing preferences through our Cookie Center",
        "Regulatory Compliance:",
        "  • GDPR Article 7 (valid consent) and ePrivacy Directive (cookie law)",
        "  • CCPA Section 1798.135 (opt-out) and CPRA (opt-out preference signals)",
        "  • India DPDP Act Section 6 (consent) compliance"
      ]
    },
    {
      number: "10",
      title: "Opt-Out of Interest-Based Advertising",
      bullets: [
        "Tools and resources to control targeted advertising",
        "Industry Opt-Out Pages:",
        "  • Network Advertising Initiative (NAI) at optout.networkadvertising.org - covering 100+ ad networks and allowing bulk opt-out",
        "  • Digital Advertising Alliance (DAA) at optout.aboutads.info - comprehensive opt-out tool for US-based advertisers",
        "  • European Interactive Digital Advertising Alliance (EDAA) at youronlinechoices.eu - for EU/EEA residents",
        "  • Canada's Ad Choices at youradchoices.ca - for Canadian privacy",
        "Platform-Specific Opt-Outs:",
        "  • Google Ads Settings at adssettings.google.com - disable personalized ads and view ad personalization factors",
        "  • Facebook Ad Preferences at facebook.com/ads/preferences - control ad topics and advertisers",
        "  • LinkedIn Ad Settings - professional ad targeting preferences",
        "  • Twitter Privacy Settings - tailored ads and data sharing",
        "  • YouTube Ad Settings - video ad personalization",
        "Mobile Advertising IDs:",
        "  • Apple IDFA (iOS): Settings > Privacy > Advertising > Limit Ad Tracking (iOS 14-) or App Tracking Transparency (iOS 14+)",
        "  • Google Advertising ID (Android): Settings > Google > Ads > Opt out of Ads Personalization",
        "  • Resetting advertising IDs to clear tracking history",
        "Important Considerations:",
        "  • Opting out doesn't reduce ad quantity, just relevance",
        "  • Opt-outs are cookie-based and may reset if you clear cookies",
        "  • Need to opt-out on each browser and device",
        "  • Some ads will still be contextual (based on page content)",
        "  • Opt-outs don't apply to first-party advertising",
        "Your Ad Choices:",
        "  • Control over ad personalization",
        "  • Frequency capping to prevent ad fatigue",
        "  • Excluding sensitive ad categories",
        "  • Viewing ad transparency information (why you saw an ad)"
      ]
    },
    {
      number: "11",
      title: "Dashboard-Specific Cookie Usage",
      bullets: [
        "Specialized cookies for dashboard.aidacorp.in functionality",
        "Authentication & Security:",
        "  • auth_token - user session authentication (7 days, secure, httpOnly)",
        "  • refresh_token - session renewal without re-login (30 days)",
        "  • mfa_verified - multi-factor authentication status (session)",
        "  • csrf_token - cross-site request forgery protection (session)",
        "  • api_key_hash - API access verification (persistent)",
        "Workspace & Project Management:",
        "  • workspace_id - current workspace context (persistent)",
        "  • project_context - active project and settings (persistent)",
        "  • recent_projects - quick access list (30 days)",
        "  • team_preferences - collaboration settings (persistent)",
        "  • permission_cache - role-based access control (session)",
        "Data & Visualization:",
        "  • dashboard_layout - customized widget arrangement (persistent)",
        "  • chart_preferences - graph types and settings (persistent)",
        "  • filter_state - applied filters and queries (session)",
        "  • data_cache_version - cache invalidation (session)",
        "  • export_format - preferred download formats (30 days)",
        "Feature Flags & A/B Testing:",
        "  • feature_flags - enabled/disabled features (session)",
        "  • ab_test_variant - experiment group assignment (persistent)",
        "  • beta_features - early access programs (persistent)",
        "  • rollout_cohort - staged feature releases (persistent)",
        "Performance & Caching:",
        "  • asset_version - cache busting (persistent)",
        "  • prefetch_queue - optimistic loading (session)",
        "  • offline_mode - PWA functionality (persistent)",
        "  • sync_status - data synchronization state (session)",
        "Important Notes:",
        "  • These cookies are essential for dashboard functionality and cannot be disabled while using the dashboard",
        "  • Data is encrypted in transit and at rest",
        "  • Accessed only by authenticated users",
        "  • Subject to role-based permissions",
        "  • Retained according to data retention policies",
        "  • Contact dpo@aidacorp.in for dashboard cookie questions"
      ]
    },
    {
      number: "12",
      title: "Website-Specific Cookie Usage (aidacorp.in)",
      bullets: [
        "Cookies unique to our main website",
        "Marketing & Lead Generation:",
        "  • lead_source - tracking how visitors found us (30 days)",
        "  • campaign_id - specific marketing campaign attribution (30 days)",
        "  • utm_parameters - detailed campaign tracking (session)",
        "  • referral_partner - affiliate and partner tracking (30 days)",
        "  • landing_page - first page visited (session)",
        "Content & Engagement:",
        "  • blog_reading_progress - article scroll depth and time (session)",
        "  • video_watch_time - embedded video analytics (session)",
        "  • resource_downloads - whitepaper and guide tracking (30 days)",
        "  • event_registrations - webinar and event signups (30 days)",
        "  • newsletter_popup - managing popup frequency (30 days)",
        "E-commerce & Conversion:",
        "  • quote_request_data - service inquiry forms (session)",
        "  • pricing_calculator - customized quotes (session)",
        "  • comparison_tool - service comparisons (session)",
        "  • cart_items - if we add e-commerce features (session)",
        "  • checkout_progress - multi-step forms (session)",
        "Social Proof & Testimonials:",
        "  • testimonial_rotation - social proof display (session)",
        "  • case_study_views - content engagement (30 days)",
        "  • client_logo_carousel - showcase rotation (session)",
        "Localization & Accessibility:",
        "  • geo_location - country/region detection (30 days)",
        "  • language_override - manual language selection (365 days)",
        "  • accessibility_mode - enhanced accessibility (365 days)",
        "  • font_size_preference - readability (365 days)",
        "  • contrast_preference - visual adjustments (365 days)",
        "Important Notes:",
        "  • These cookies enhance website experience",
        "  • Are not strictly necessary",
        "  • Can be disabled through cookie preferences",
        "  • Contact info@aidacorp.in for website cookie questions"
      ]
    },
    {
      number: "13",
      title: "International Data Transfers & Cookie Data",
      bullets: [
        "Cookie data may be transferred and processed internationally",
        "Data Processing Locations:",
        "  • India (primary data center)",
        "  • United States (Google Analytics, Facebook, cloud services)",
        "  • European Union (CDN, enterprise services)",
        "  • Singapore (Asia-Pacific operations)",
        "Legal Mechanisms for Transfers:",
        "  • Standard Contractual Clauses (SCCs) approved by EU Commission",
        "  • Binding Corporate Rules for intra-group transfers",
        "  • Adequacy Decisions for countries with equivalent protection",
        "  • Specific derogations for consent and contract performance",
        "Third-Party Vendor Locations:",
        "  • Google (United States, global) - Analytics, Ads, Tag Manager, Fonts, and other services",
        "  • Facebook (United States, Ireland for EU users) - Pixel, social features, and advertising",
        "  • LinkedIn (United States, Ireland) - Insight Tag and B2B advertising",
        "  • Cloudflare (United States, global POPs) - CDN and security",
        "  • AWS (United States, multiple regions) - cloud infrastructure",
        "  • Other vendors in various jurisdictions",
        "Safeguards & Protections:",
        "  • Data encrypted in transit (TLS 1.3) and at rest (AES-256)",
        "  • Access controls and authentication for all systems",
        "  • Data processing agreements with all vendors",
        "  • Regular vendor security assessments",
        "  • Compliance with GDPR Article 44-50, CCPA cross-border provisions, and India DPDP Act Section 16",
        "Your Rights regarding international transfers:",
        "  • Request information about where data is processed",
        "  • Object to transfers to specific countries",
        "  • Withdraw consent for cross-border processing",
        "  • Request data localization where feasible",
        "Transfer Impact Assessments (TIAs):",
        "  • Evaluate risks of international data transfers",
        "  • Assess laws and practices in destination countries",
        "  • Implement supplementary measures where necessary",
        "  • Document transfer safeguards and justifications",
        "Contact privacy@aidacorp.in for transfer-related questions with subject line 'International Data Transfers - Cookies'"
      ]
    },
    {
      number: "14",
      title: "Cookie Security & Data Protection",
      bullets: [
        "Comprehensive security measures for cookie data",
        "Secure Cookie Attributes:",
        "  • Secure flag - ensuring cookies transmitted only over HTTPS",
        "  • HttpOnly flag - preventing JavaScript access to sensitive cookies",
        "  • SameSite attribute - CSRF protection (Strict, Lax, or None)",
        "  • Domain and Path restrictions - cookie scope limitation",
        "  • Expires/Max-Age - proper lifetime management",
        "Encryption & Hashing:",
        "  • Sensitive cookie values encrypted using AES-256",
        "  • Session IDs generated with cryptographically secure random numbers",
        "  • One-way hashing for non-reversible identifiers",
        "  • Salting and peppering for additional security",
        "  • Regular key rotation for encryption keys",
        "Access Controls & Monitoring:",
        "  • Role-based access to cookie data in databases",
        "  • Audit logging for all cookie access and modifications",
        "  • Real-time monitoring for suspicious cookie usage",
        "  • Automated alerts for security anomalies",
        "  • Regular access reviews and revocations",
        "Cookie Integrity & Tampering Prevention:",
        "  • Cryptographic signing to detect modifications",
        "  • Integrity checks on critical cookies",
        "  • Validation of cookie values before use",
        "  • Rejection of tampered or invalid cookies",
        "  • Logging of tampering attempts for investigation",
        "Compliance & Best Practices:",
        "  • Following OWASP secure cookie guidelines",
        "  • NIST cryptographic standards",
        "  • PCI DSS for payment cookies",
        "  • GDPR technical measures for personal data",
        "  • Regular security audits and penetration testing",
        "Incident Response:",
        "  • Procedures for cookie-related breaches",
        "  • Immediate invalidation of compromised cookies",
        "  • User notification as required by law",
        "  • Forensic analysis and remediation",
        "  • Post-incident security enhancements",
        "User Education & Awareness:",
        "  • Clear information about cookie security",
        "  • Warnings about cookie-related phishing",
        "  • Guidance on clearing cookies after using public computers",
        "  • Recommendations for secure browsing practices"
      ]
    },
    {
      number: "15",
      title: "Updates to This Cookie Policy",
      bullets: [
        "We may update this Cookie Policy to reflect changes",
        "Reasons for Updates:",
        "  • New cookies or tracking technologies",
        "  • Changes in third-party services or vendors",
        "  • Regulatory changes (GDPR, CCPA, DPDP Act)",
        "  • User feedback and privacy enhancements",
        "  • Business changes (new features, acquisitions)",
        "Notification Process:",
        "  • Posting updated policy with 'Last Updated' date",
        "  • Prominent notice on both Sites for material changes",
        "  • Email notification to registered users (opt-in)",
        "  • 30-day notice period before effective date",
        "Material vs. Non-Material Changes:",
        "  • Material changes include: new tracking categories, new third-party cookies, reduced user control or consent, changes to data retention, international data transfers",
        "  • Non-material changes include: clarifications and formatting, updated contact information, minor technical corrections, additional examples",
        "Acceptance & Continued Use:",
        "  • Continued use after notice period constitutes acceptance",
        "  • Option to withdraw consent and adjust preferences",
        "  • Ability to close account if you disagree",
        "  • Data deletion request available",
        "Version History:",
        "  • Previous versions available upon request",
        "  • Change log documenting all updates",
        "  • Effective dates for each version",
        "  • Comparison tools for version differences",
        "Review Frequency:",
        "  • Annual comprehensive policy review",
        "  • Quarterly updates for vendor changes",
        "  • Immediate updates for major privacy changes",
        "  • Ongoing monitoring of regulatory developments",
        "Regulatory Compliance:",
        "  • GDPR Article 13 transparency requirements",
        "  • ePrivacy Directive cookie law updates",
        "  • CCPA Section 1798.100 notice requirements",
        "  • India DPDP Act Section 5 consent provisions",
        "Contact privacy@aidacorp.in for policy version history or questions with subject line 'Cookie Policy - Version Request'"
      ]
    },
    {
      number: "16",
      title: "Children's Privacy & Cookie Protections",
      bullets: [
        "Enhanced protections for children under applicable laws",
        "Age Restrictions:",
        "  • Our Sites are not intended for children under 18 (or 13 in certain jurisdictions)",
        "  • We do not knowingly collect data from children",
        "  • Parental consent required for users under age threshold",
        "  • Age verification mechanisms on registration",
        "No Targeted Tracking of Children:",
        "  • Prohibition of behavioral advertising to children",
        "  • No profiling or automated decision-making for children",
        "  • Limited cookie usage for child accounts",
        "  • Enhanced privacy defaults for young users",
        "  • Special security measures for children's data",
        "COPPA Compliance (USA) for children under 13:",
        "  • Verifiable parental consent for data collection",
        "  • Clear notice of data collection practices",
        "  • Parental access to child's information",
        "  • Ability for parents to delete child's data",
        "  • Prohibition of conditioning participation on data disclosure",
        "GDPR Enhanced Protections for children under 16:",
        "  • Parental consent for information society services",
        "  • Age-appropriate language and notices",
        "  • Prohibition of using children's data for marketing",
        "  • Enhanced security for children's personal data",
        "India DPDP Act Safeguards for users under 18:",
        "  • Verifiable parental or guardian consent",
        "  • Prohibition of behavioral tracking or targeting",
        "  • No processing that could harm child's well-being",
        "  • Special provisions for children's data protection",
        "Discovery & Deletion Procedures:",
        "  • If we discover we've collected data from a child, we immediately cease processing",
        "  • Delete the data within 72 hours",
        "  • Notify parents if contact information available",
        "  • Implement measures to prevent future collection",
        "Parental Rights & Controls:",
        "  • Parents can review cookies set on child's device",
        "  • Delete cookies and request data erasure",
        "  • Withdraw consent for cookie usage",
        "  • Receive notifications of policy changes",
        "Reporting Mechanisms:",
        "  • Report suspected children's data collection to privacy@aidacorp.in with subject 'Children's Privacy - Cookies'",
        "  • Investigation within 24 hours",
        "  • Immediate corrective action",
        "Our Commitment:",
        "  • Never knowingly target children with cookies",
        "  • Maintain strict age verification",
        "  • Provide enhanced protections for young users",
        "  • Comply with all children's privacy laws"
      ]
    },
    {
      number: "17",
      title: "Contact Information & Cookie Support",
      bullets: [
        "Get help with cookie-related questions and concerns",
        "Primary Contact Channels:",
        "  • Cookie Questions at cookies@aidacorp.in - general cookie inquiries and preference management",
        "  • Privacy Officer at privacy@aidacorp.in - privacy-related cookie concerns and data rights",
        "  • Data Protection Officer at dpo@aidacorp.in - GDPR, CCPA, DPDP Act compliance",
        "  • Technical Support at support@aidacorp.in - cookie technical issues and troubleshooting",
        "  • Security Issues at security@aidacorp.in - cookie security incidents and vulnerabilities",
        "Mailing Address for written correspondence:",
        "  • AIDA Corporation Private Limited",
        "  • Cookie Policy Team",
        "  • Park Avenue Building, RTO Road",
        "  • Andheri West, Mumbai 400 053",
        "  • Maharashtra, INDIA",
        "Response Timeline:",
        "  • Acknowledgment within 48 hours for all inquiries",
        "  • Resolution within 7 days for preference changes",
        "  • 30 days for complex technical issues",
        "  • Immediate response for security incidents",
        "Cookie Preference Center:",
        "  • Accessible from footer link on both Sites (aidacorp.in and dashboard.aidacorp.in)",
        "  • Managing all cookie categories and vendors",
        "  • Viewing detailed cookie information",
        "  • Exporting consent records",
        "Live Support Options:",
        "  • Live chat on both Sites during business hours (9 AM - 6 PM IST, Mon-Fri)",
        "  • Phone support for urgent cookie issues",
        "  • Video calls for complex troubleshooting",
        "  • 24/7 support for security incidents",
        "Documentation & Resources:",
        "  • Detailed cookie catalog and descriptions",
        "  • Browser-specific cookie management guides",
        "  • Video tutorials for preference management",
        "  • FAQ section for common questions",
        "  • Cookie policy in multiple languages",
        "Complaint & Escalation Process:",
        "  • Initial inquiry to cookies@aidacorp.in",
        "  • Escalation to Data Protection Officer if unresolved",
        "  • External dispute resolution if needed",
        "  • Right to lodge complaint with Data Protection Board of India, EU supervisory authority (GDPR), or California Attorney General (CCPA)",
        "We commit to:",
        "  • Responding promptly and professionally",
        "  • Respecting your privacy preferences",
        "  • Providing clear explanations",
        "  • Honoring your data rights",
        "  • Continuously improving our cookie practices",
        "For urgent matters, include 'URGENT' in subject line. Include relevant details (browser, device, specific cookies) for faster resolution"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Same Grid Pattern */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#5919C1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF5722] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[20%_60%_20%] md:grid-rows-2 gap-0 border-b-2 border-[#5919C1]/20">
          {/* Top Row */}
          {/* Top Left Box - Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-center bg-white border-r border-b border-[#DCDCDC] p-8"
          >
            <svg className="w-16 h-16 md:w-20 md:h-20 text-[#5919C1]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </motion.div>

          {/* Top Middle Box - TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-16 py-12 md:py-16 flex flex-col justify-between border-b border-[#DCDCDC]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[#5919C1]">
              Cookie Policy
            </h1>
            <p className="text-base md:text-lg text-black/90 font-light">
              Transparent information about cookies and tracking technologies we use on both aidacorp.in and dashboard.aidacorp.in
            </p>
          </motion.div>

          {/* Top Right Box - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white flex flex-col items-center justify-center border-l border-b border-[#DCDCDC] p-8"
          >
            <div className="text-4xl md:text-5xl font-light text-[#5919C1] mb-2">17</div>
            <div className="text-xs md:text-sm text-gray-600 font-light text-center">Detailed Sections</div>
          </motion.div>

          {/* Bottom Row */}
          {/* Bottom Left Box - Last Updated */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Bottom Middle Box - Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex items-center justify-center"
          >
            <p className="text-xl md:text-2xl font-light text-center">
              Full control over your cookie preferences
            </p>
          </motion.div>

          {/* Bottom Right Box - Contact Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white border-l border-[#DCDCDC] p-0"
          >
            <Link
              href="/contact"
              className="w-full h-full flex flex-col items-center justify-center p-8 text-lg font-medium bg-[#5919C1] text-white hover:bg-[#FF5722] transition-all group"
            >
              <svg className="w-6 h-6 mb-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Manage</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cookie Content Section */}
      <section className="py-16 md:py-24 bg-white border-b border-[#DCDCDC]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Grid Layout - Each Row with 12% / 88% split */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-0 border-2 border-[#5919C1]/20 bg-white"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.02,
                  duration: 0.5
                }}
                onMouseEnter={() => setActivePoint(index)}
                className={`
                  grid grid-cols-1 md:grid-cols-[12%_88%] border-b-2 border-[#5919C1]/10 last:border-b-0 transition-all duration-300 ease-in-out
                  ${activePoint === index ? 'bg-[#5919C1]/5' : 'bg-white hover:bg-gray-50'}
                `}
              >
                {/* Left Section - Number (12%) */}
                <div className={`
                  flex flex-col items-center justify-start p-6 md:p-8 border-r-2 border-[#5919C1]/20 transition-all duration-300 ease-in-out
                  ${activePoint === index ? 'bg-[#5919C1]/10 border-r-4 border-[#5919C1]' : ''}
                `}>
                  <span className={`
                    text-5xl md:text-6xl font-extralight transition-colors duration-300 ease-in-out
                    ${activePoint === index ? 'text-[#5919C1]' : 'text-gray-200'}
                  `}>
                    {section.number}
                  </span>
                </div>

                {/* Right Section - Title & Content (88%) */}
                <div className="p-6 md:p-8">
                  <h2 className={`
                    text-xl md:text-2xl font-normal mb-4 transition-colors duration-300 ease-in-out
                    ${activePoint === index ? 'text-[#5919C1]' : 'text-black'}
                  `}>
                    {section.title}
                  </h2>
                  
                  {/* Special handling for Section 04 - Cookie Table */}
                  {section.hasTable ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-[#5919C1]/20 text-sm md:text-base">
                        <thead>
                          <tr className="bg-[#5919C1] text-white">
                            <th className="border border-[#5919C1]/30 px-4 py-3 text-left font-semibold">Cookie Name</th>
                            <th className="border border-[#5919C1]/30 px-4 py-3 text-left font-semibold">Type</th>
                            <th className="border border-[#5919C1]/30 px-4 py-3 text-left font-semibold">Purpose</th>
                            <th className="border border-[#5919C1]/30 px-4 py-3 text-left font-semibold">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="font-light">
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">session_id</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Essential</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">User session authentication and management</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Session</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">auth_token</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Essential</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Secure login authentication</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">7 days</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">csrf_token</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Essential</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Cross-site request forgery protection</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Session</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">cookie_consent</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Essential</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Stores your cookie preferences</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">workspace_id</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Functional</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Current workspace context for dashboard</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Persistent</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">theme_preference</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Functional</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Dark/light mode setting</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">language</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Functional</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Selected language preference</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">_ga</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Analytics</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Google Analytics - visitor tracking</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">2 years</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">_gid</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Analytics</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Google Analytics - session tracking</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">24 hours</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">_gat</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Analytics</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Google Analytics - request throttling</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 minute</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">_fbp</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Marketing</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Facebook Pixel - ad tracking</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">90 days</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">fr</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Marketing</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Facebook - ad delivery and targeting</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">90 days</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">IDE</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Marketing</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Google Ads - ad personalization</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">bcookie</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Marketing</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">LinkedIn - browser identification</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">__cfduid</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Performance</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Cloudflare - security and performance</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">30 days</td>
                          </tr>
                          <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                            <td className="border border-[#5919C1]/20 px-4 py-3 font-medium">cf_clearance</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Performance</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">Cloudflare - bot protection</td>
                            <td className="border border-[#5919C1]/20 px-4 py-3">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* Bullet Point Content */
                    <>
                      <AnimatePresence mode="sync">
                        {section.bullets.length > 6 ? (
                          expandedSections.has(index) ? (
                            section.bullets.map((bullet, bulletIndex) => (
                              <motion.div
                                key={bulletIndex}
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className={`
                                  flex items-start gap-3 text-gray-700 leading-relaxed font-light transition-all duration-300 ease-in-out
                                  ${bullet.startsWith('  •') ? 'ml-8' : bullet.startsWith('  ') ? 'ml-6' : ''}
                                `}
                              >
                                <span className={`
                                  inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ease-in-out
                                  ${activePoint === index ? 'bg-[#5919C1]' : 'bg-[#5919C1]/50 hover:bg-[#5919C1]'}
                                `}></span>
                                <span className="flex-1">{bullet.replace(/^  •\s*/, '').replace(/^  /, '')}</span>
                              </motion.div>
                            ))
                          ) : (
                            section.bullets.slice(0, 3).map((bullet, bulletIndex) => (
                              <motion.div
                                key={bulletIndex}
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className={`
                                  flex items-start gap-3 text-gray-700 leading-relaxed font-light transition-all duration-300 ease-in-out
                                  ${bullet.startsWith('  •') ? 'ml-8' : bullet.startsWith('  ') ? 'ml-6' : ''}
                                `}
                              >
                                <span className={`
                                  inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ease-in-out
                                  ${activePoint === index ? 'bg-[#5919C1]' : 'bg-[#5919C1]/50 hover:bg-[#5919C1]'}
                                `}></span>
                                <span className="flex-1">{bullet.replace(/^  •\s*/, '').replace(/^  /, '')}</span>
                              </motion.div>
                            ))
                          )
                        ) : (
                          section.bullets.map((bullet, bulletIndex) => (
                            <motion.div
                              key={bulletIndex}
                              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className={`
                                flex items-start gap-3 text-gray-700 leading-relaxed font-light transition-all duration-300 ease-in-out
                                ${bullet.startsWith('  •') ? 'ml-8' : bullet.startsWith('  ') ? 'ml-6' : ''}
                              `}
                            >
                              <span className={`
                                inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ease-in-out
                                ${activePoint === index ? 'bg-[#5919C1]' : 'bg-[#5919C1]/50 hover:bg-[#5919C1]'}
                              `}></span>
                              <span className="flex-1">{bullet.replace(/^  •\s*/, '').replace(/^  /, '')}</span>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                      {section.bullets.length > 6 && (
                        <button
                          onClick={() => toggleSection(index)}
                          className="flex items-center justify-between w-full mt-4 px-4 py-2 text-sm font-medium text-[#5919C1] hover:text-[#5919C1]/80 transition-colors duration-200 border border-[#5919C1]/20 hover:border-[#5919C1]/30 rounded"
                        >
                          <span>{expandedSections.has(index) ? 'Collapse' : 'Expand'}</span>
                          <svg 
                            className={`w-5 h-5 transition-transform duration-200 ${expandedSections.has(index) ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            {expandedSections.has(index) ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            )}
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white border-2 border-[#5919C1]/30 p-8 md:p-12 relative overflow-hidden"
          >
            
            <h3 className="text-3xl md:text-4xl font-normal text-center mb-8 text-[#5919C1]">Cookie Support & Contact</h3>
            
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#DCDCDC] hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Cookie Questions</td>
                  <td className="py-6 px-8 font-light text-lg"><a href="mailto:cookies@aidacorp.in" className="text-[#FF5722] hover:underline">info@aidacorp.in</a></td>
                </tr>
                
                <tr className="border-b border-[#DCDCDC] bg-gray-50/50 hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Sites Covered</td>
                  <td className="py-6 px-8 font-light text-lg">aidacorp.in | dashboard.aidacorp.in</td>
                </tr>
                <tr className="hover:bg-[#5919C1]/5 transition-all duration-300 ease-in-out">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Response Time</td>
                  <td className="py-6 px-8 font-light text-lg">Within 48 hours (7 days for complex issues)</td>
                </tr>
              </tbody>
            </table>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-700 mt-8 p-6 bg-[#5919C1]/5 border-l-4 border-[#FF5722] font-light text-lg"
            >
              <span className="font-normal text-[#5919C1]">Cookie Control:</span> Manage your preferences anytime through our Cookie Center or browser settings. We respect your privacy choices.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
