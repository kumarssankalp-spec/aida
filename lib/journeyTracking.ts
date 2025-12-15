import Cookies from 'js-cookie';
import { supabase } from './supabase';

export interface PageVisit {
  path: string;
  fullUrl?: string; // includes query parameters
  pageName?: string; // Human readable page name
  timestamp: string;
  timeSpent?: number; // seconds
  scrollDepth?: number; // percentage
}

export interface RevisitRecord {
  visitDate: string;
  pages: Array<{
    path: string;
    fullUrl: string;
    pageName: string;
    timeSpent: number;
  }>;
  totalPages: number;
  totalTime: number;
}

export interface UserJourney {
  sessionId: string;
  userId: string; // Persistent user ID across sessions
  pagesVisited: PageVisit[];
  currentPage?: string; // Current page being viewed
  currentPageName?: string; // Current page name
  currentPageUrl?: string; // Full current page URL
  deviceType: string;
  browser: string;
  browserVersion?: string;
  os: string;
  osVersion?: string;
  screenResolution?: string;
  isMobile: boolean;
  isTablet: boolean;
  language?: string;
  locale?: string;
  country?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  ipAddress?: string;
  referrerDomain?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  sessionStart: string;
  sessionEnd?: string;
  timeOnSite?: number;
  isReturningVisitor: boolean;
  totalVisits: number;
  firstVisitDate?: string;
  lastVisitDate?: string;
  daysSinceFirstVisit?: number;
  revisitHistory?: RevisitRecord[]; // All previous visits
  bounceRate?: boolean;
  pagesPerSession?: number;
  avgTimePerPage?: number;
  hasSubmittedForm?: boolean; // Track if user ever submitted any form
}

export interface UserJourneySubmission {
  sessionId: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  services?: string[];
  message?: string | null;
  submissionType: 'newsletter' | 'contact' | 'lead_form';
  journey: UserJourney;
}

const JOURNEY_COOKIE_NAME = 'user_journey';
const SESSION_ID_COOKIE_NAME = 'session_id';
const USER_ID_COOKIE_NAME = 'user_id'; // Persistent across sessions, never expires
const VISIT_COUNT_KEY = 'total_visits';
const FIRST_VISIT_KEY = 'first_visit_date';
const LAST_VISIT_KEY = 'last_visit_date';
const REVISIT_HISTORY_KEY = 'revisit_history'; // Store all previous visits
const HAS_SUBMITTED_KEY = 'has_submitted_form'; // Track if user ever submitted
const USER_EMAIL_KEY = 'user_email'; // Store user's email after first form submission
const JOURNEY_SAVED_KEY = 'journey_saved_this_session'; // Prevent double-saving in same session

// Page name mapping for human-readable names
const getPageName = (path: string): string => {
  const pageNames: { [key: string]: string } = {
    '/': 'Home',
    '/about': 'About Us',
    '/services/big-data-analysis': 'Big Data & Analytics',
    '/services/artificial-intelligence': 'Artificial Intelligence',
    '/services/technology-services': 'Technology Services',
    '/services/digital-marketing': 'Digital Marketing',
    '/contact': 'Contact Us',
    '/get-started': 'Get Started (Lead Form)',
    '/team': 'Our Team',
    '/faq': 'FAQ',
    '/legal/privacy-policy': 'Privacy Policy',
    '/legal/terms-conditions': 'Terms & Conditions',
    '/legal/cookie-policy': 'Cookie Policy',
    '/legal/disclaimer': 'Disclaimer'
  };
  
  return pageNames[path] || path;
};

// Generate unique session ID (UUID v4 format)
const generateSessionId = (): string => {
  // Generate a proper UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Generate or get persistent user ID (never expires until manually cleared)
const getUserId = (): string => {
  let userId = localStorage.getItem(USER_ID_COOKIE_NAME);
  
  if (!userId) {
    userId = generateSessionId(); // Use same UUID format
    localStorage.setItem(USER_ID_COOKIE_NAME, userId);
  }
  
  return userId;
};

// Get current visit count without incrementing
const getVisitCount = async (email?: string): Promise<number> => {
  // If we have email, ALWAYS check database (most accurate source)
  if (email) {
    try {
      const { data, error } = await supabase
        .from('user_journeys')
        .select('total_visits')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!error && data && data.length > 0) {
        const count = data[0].total_visits || 0;
        return count;
      }
    } catch (error) {
      console.error('Error checking previous visits:', error);
    }
  }
  
  // Fallback to localStorage only if no email provided
  const count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
  return count;
};

// Increment visit count (only called when form is submitted)
const incrementVisitCount = async (email?: string): Promise<number> => {
  const currentCount = await getVisitCount(email);
  const newCount = currentCount + 1;
  
  // Store in localStorage for reference (but database is source of truth)
  localStorage.setItem(VISIT_COUNT_KEY, newCount.toString());
  return newCount;
};

// Get or set first visit date
const getFirstVisitDate = async (email?: string): Promise<string> => {
  let firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
  
  // If localStorage is empty but we have email, check database
  if (!firstVisit && email) {
    try {
      const { data, error } = await supabase
        .from('user_journeys')
        .select('first_visit_date')
        .eq('email', email)
        .order('created_at', { ascending: true })
        .limit(1);
      
      if (!error && data && data.length > 0 && data[0].first_visit_date) {
        firstVisit = data[0].first_visit_date;
        localStorage.setItem(FIRST_VISIT_KEY, firstVisit);
      }
    } catch (error) {
      console.error('Error checking first visit date:', error);
    }
  }
  
  if (!firstVisit) {
    firstVisit = new Date().toISOString();
    localStorage.setItem(FIRST_VISIT_KEY, firstVisit);
  }
  
  return firstVisit;
};

// Update last visit date
const updateLastVisitDate = (): string => {
  const now = new Date().toISOString();
  localStorage.setItem(LAST_VISIT_KEY, now);
  return now;
};

// Check if user has ever submitted a form
const hasSubmittedForm = async (email?: string): Promise<boolean> => {
  const localValue = localStorage.getItem(HAS_SUBMITTED_KEY);
  
  if (localValue === 'true') {
    return true;
  }
  
  // If localStorage is empty but we have email, check database
  if (email) {
    try {
      const { data, error } = await supabase
        .from('user_journeys')
        .select('has_submitted_form')
        .eq('email', email)
        .limit(1);
      
      if (!error && data && data.length > 0 && data[0].has_submitted_form) {
        // Update localStorage for future checks
        localStorage.setItem(HAS_SUBMITTED_KEY, 'true');
        return true;
      }
    } catch (error) {
      console.error('Error checking form submission status:', error);
    }
  }
  
  return false;
};

// Mark that user has submitted a form
export const markFormSubmitted = (): void => {
  localStorage.setItem(HAS_SUBMITTED_KEY, 'true');
};

// Get stored user email (if they've submitted before)
const getStoredEmail = (): string | null => {
  return localStorage.getItem(USER_EMAIL_KEY);
};

// Store user email permanently after form submission
const storeUserEmail = (email: string): void => {
  localStorage.setItem(USER_EMAIL_KEY, email);
};

// Get revisit history
const getRevisitHistory = async (email?: string): Promise<RevisitRecord[]> => {
  const localHistory = localStorage.getItem(REVISIT_HISTORY_KEY);
  
  if (localHistory) {
    return JSON.parse(localHistory);
  }
  
  // If localStorage is empty but we have email, check database
  if (email) {
    try {
      const { data, error } = await supabase
        .from('user_journeys')
        .select('revisit_history')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!error && data && data.length > 0 && data[0].revisit_history) {
        const history = data[0].revisit_history as RevisitRecord[];
        // Update localStorage for future use
        localStorage.setItem(REVISIT_HISTORY_KEY, JSON.stringify(history));
        return history;
      }
    } catch (error) {
      console.error('Error checking revisit history:', error);
    }
  }
  
  return [];
};

// Add current visit to revisit history
const addToRevisitHistory = async (pages: PageVisit[], email?: string): Promise<void> => {
  const history = await getRevisitHistory(email);
  
  const revisit: RevisitRecord = {
    visitDate: new Date().toISOString(),
    pages: pages.map(p => ({
      path: p.path,
      fullUrl: p.fullUrl || p.path,
      pageName: p.pageName || getPageName(p.path),
      timeSpent: p.timeSpent || 0
    })),
    totalPages: pages.length,
    totalTime: pages.reduce((sum, p) => sum + (p.timeSpent || 0), 0)
  };
  
  history.push(revisit);
  
  // Keep only last 50 visits
  const trimmedHistory = history.slice(-50);
  localStorage.setItem(REVISIT_HISTORY_KEY, JSON.stringify(trimmedHistory));
};

// Get UTM parameters and referrer from URL
const getTrafficSource = () => {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  let referrerDomain = '';
  if (referrer) {
    try {
      referrerDomain = new URL(referrer).hostname;
    } catch (e) {
      referrerDomain = referrer;
    }
  }
  
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    utmContent: params.get('utm_content') || undefined,
    referrerDomain: referrerDomain || undefined
  };
};

// Get device information with enhanced details
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  
  let deviceType = 'desktop';
  let isMobile = false;
  let isTablet = false;
  
  if (/mobile/i.test(userAgent) && !/tablet|ipad/i.test(userAgent)) {
    deviceType = 'mobile';
    isMobile = true;
  } else if (/tablet|ipad/i.test(userAgent)) {
    deviceType = 'tablet';
    isTablet = true;
  }
  
  let browser = 'unknown';
  let browserVersion = '';
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
    browser = 'chrome';
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    browser = 'safari';
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (/firefox/i.test(userAgent)) {
    browser = 'firefox';
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  } else if (/edg/i.test(userAgent)) {
    browser = 'edge';
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : '';
  }
  
  let os = 'unknown';
  let osVersion = '';
  if (/windows nt 10/i.test(userAgent)) {
    os = 'windows';
    osVersion = '10/11';
  } else if (/windows/i.test(userAgent)) {
    os = 'windows';
    const match = userAgent.match(/Windows NT (\d+\.\d+)/);
    osVersion = match ? match[1] : '';
  } else if (/mac os x (\d+[._]\d+)/i.test(userAgent)) {
    os = 'macos';
    const match = userAgent.match(/Mac OS X (\d+[._]\d+)/i);
    osVersion = match ? match[1].replace('_', '.') : '';
  } else if (/linux/i.test(userAgent)) {
    os = 'linux';
  } else if (/android (\d+)/i.test(userAgent)) {
    os = 'android';
    const match = userAgent.match(/Android (\d+)/i);
    osVersion = match ? match[1] : '';
  } else if (/os (\d+)_(\d+)/i.test(userAgent)) {
    os = 'ios';
    const match = userAgent.match(/OS (\d+)_(\d+)/i);
    osVersion = match ? `${match[1]}.${match[2]}` : '';
  }
  
  // Get screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  
  // Get language and locale
  const language = navigator.language.split('-')[0]; // e.g., 'en' from 'en-US'
  const locale = navigator.language; // e.g., 'en-US'
  
  return { 
    deviceType, 
    browser, 
    browserVersion,
    os,
    osVersion,
    isMobile,
    isTablet,
    screenResolution,
    language,
    locale
  };
};

// Get geolocation data with precise location tracking
const getGeolocation = async (): Promise<{ 
  country?: string; 
  city?: string; 
  region?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  ip?: string 
}> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name,
      city: data.city,
      region: data.region,
      postalCode: data.postal,
      timezone: data.timezone,
      latitude: data.latitude,
      longitude: data.longitude,
      ip: data.ip
    };
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return {};
  }
};

// Initialize or get existing journey (with optional email for database lookup)
export const initializeJourney = async (email?: string): Promise<UserJourney> => {
  let sessionId = Cookies.get(SESSION_ID_COOKIE_NAME);
  let journey = Cookies.get(JOURNEY_COOKIE_NAME);
  
  // Get persistent user ID
  const userId = getUserId();
  
  // Get visit tracking data (check database if localStorage empty)
  // DON'T increment here - only increment when form is submitted
  const totalVisits = await getVisitCount(email);
  const firstVisitDate = await getFirstVisitDate(email);
  const lastVisitDate = updateLastVisitDate();
  
  // Calculate days since first visit
  const daysSinceFirstVisit = Math.floor(
    (new Date().getTime() - new Date(firstVisitDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Check if returning visitor - ONLY true if visit count is actually > 1
  // This ensures after clearing localStorage, first visit shows false correctly
  const isReturningVisitor = totalVisits > 1;
  
  // Validate existing session ID is a proper UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!sessionId || !uuidRegex.test(sessionId)) {
    // Clear invalid session and create new UUID
    Cookies.remove(SESSION_ID_COOKIE_NAME);
    Cookies.remove(JOURNEY_COOKIE_NAME);
    sessionId = generateSessionId();
    journey = undefined;
    Cookies.set(SESSION_ID_COOKIE_NAME, sessionId, { expires: 1 }); // 1 day
  }
  
  if (journey) {
    const parsedJourney = JSON.parse(journey);
    // Update sessionId and user tracking data in journey if it was regenerated
    parsedJourney.sessionId = sessionId;
    parsedJourney.userId = userId;
    parsedJourney.totalVisits = totalVisits;
    parsedJourney.firstVisitDate = firstVisitDate;
    parsedJourney.lastVisitDate = lastVisitDate;
    parsedJourney.daysSinceFirstVisit = daysSinceFirstVisit;
    parsedJourney.isReturningVisitor = isReturningVisitor;
    return parsedJourney;
  }
  
  const { deviceType, browser, browserVersion, os, osVersion, isMobile, isTablet, screenResolution, language, locale } = getDeviceInfo();
  const geo = await getGeolocation();
  const trafficSource = getTrafficSource();
  
  // Get revisit history (check database if localStorage empty)
  const revisitHistory = await getRevisitHistory(email);
  const hasSubmitted = await hasSubmittedForm(email);
  
  const newJourney: UserJourney = {
    sessionId,
    userId,
    pagesVisited: [],
    currentPage: undefined,
    currentPageName: undefined,
    currentPageUrl: undefined,
    deviceType,
    browser,
    browserVersion,
    os,
    osVersion,
    isMobile,
    isTablet,
    screenResolution,
    language,
    locale,
    country: geo.country,
    city: geo.city,
    region: geo.region,
    postalCode: geo.postalCode,
    timezone: geo.timezone,
    latitude: geo.latitude,
    longitude: geo.longitude,
    ipAddress: geo.ip,
    ...trafficSource,
    sessionStart: new Date().toISOString(),
    isReturningVisitor,
    totalVisits,
    firstVisitDate,
    lastVisitDate,
    daysSinceFirstVisit,
    revisitHistory,
    hasSubmittedForm: hasSubmitted
  };
  
  Cookies.set(JOURNEY_COOKIE_NAME, JSON.stringify(newJourney), { expires: 1 });
  return newJourney;
};

// Track page visit with enhanced data
export const trackPageVisit = async (path: string, fullUrl?: string) => {
  const journey = await initializeJourney();
  
  const lastVisit = journey.pagesVisited[journey.pagesVisited.length - 1];
  if (lastVisit && !lastVisit.timeSpent) {
    // Calculate time spent on previous page
    const timeSpent = Math.floor((new Date().getTime() - new Date(lastVisit.timestamp).getTime()) / 1000);
    lastVisit.timeSpent = timeSpent;
  }
  
  const pageName = getPageName(path);
  const pageUrl = fullUrl || path;
  
  journey.pagesVisited.push({
    path,
    fullUrl: pageUrl,
    pageName,
    timestamp: new Date().toISOString(),
    scrollDepth: 0
  });
  
  // Update current page info
  journey.currentPage = path;
  journey.currentPageName = pageName;
  journey.currentPageUrl = pageUrl;
  
  Cookies.set(JOURNEY_COOKIE_NAME, JSON.stringify(journey), { expires: 1 });
};

// Track scroll depth on current page
export const trackScrollDepth = (depth: number) => {
  const journey = getJourney();
  if (!journey || journey.pagesVisited.length === 0) return;
  
  const currentPage = journey.pagesVisited[journey.pagesVisited.length - 1];
  if (currentPage) {
    currentPage.scrollDepth = Math.max(currentPage.scrollDepth || 0, depth);
    Cookies.set(JOURNEY_COOKIE_NAME, JSON.stringify(journey), { expires: 1 });
  }
};

// Initialize scroll tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;
  
  let scrollTimeout: NodeJS.Timeout;
  
  const calculateScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Calculate scroll percentage (0-100)
    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );
    
    // Cap at 100%
    const depth = Math.min(scrollPercentage, 100);
    
    trackScrollDepth(depth);
  };
  
  const handleScroll = () => {
    // Debounce scroll events (only track every 200ms)
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(calculateScrollDepth, 200);
  };
  
  // Track initial scroll position
  calculateScrollDepth();
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => {
    clearTimeout(scrollTimeout);
    window.removeEventListener('scroll', handleScroll);
  };
};

// Get current journey
export const getJourney = (): UserJourney | null => {
  const journey = Cookies.get(JOURNEY_COOKIE_NAME);
  return journey ? JSON.parse(journey) : null;
};

// Auto-save journey for returning users (called when page closes/navigates away)
export const autoSaveReturningUserJourney = async (): Promise<void> => {
  try {
    const storedEmail = getStoredEmail();
    const hasSubmitted = localStorage.getItem(HAS_SUBMITTED_KEY) === 'true';
    
    // Only auto-save if user has submitted a form before
    if (!storedEmail || !hasSubmitted) {
      return;
    }
    
    // Check if journey was already saved in this session (prevent double-save)
    const alreadySaved = sessionStorage.getItem(JOURNEY_SAVED_KEY) === 'true';
    if (alreadySaved) {
      console.log('⏭️ Journey already saved this session, skipping auto-save');
      return;
    }
    
    const journey = getJourney();
    if (!journey || journey.pagesVisited.length === 0) {
      return;
    }
    
    // Increment visit count for this email
    const newTotalVisits = await incrementVisitCount(storedEmail);
    
    // Re-initialize journey with email to get accurate data
    const updatedJourney = await initializeJourney(storedEmail);
    updatedJourney.totalVisits = newTotalVisits;
    updatedJourney.isReturningVisitor = newTotalVisits > 1;
    
    // Merge current journey pages with updated journey
    const finalJourney = { ...updatedJourney, pagesVisited: journey.pagesVisited };
    
    // Add to revisit history
    await addToRevisitHistory(journey.pagesVisited, storedEmail);
    
    // Calculate visit metrics
    const sessionStart = new Date(finalJourney.sessionStart);
    const sessionEnd = new Date();
    const timeOnSite = Math.floor((sessionEnd.getTime() - sessionStart.getTime()) / 1000);
    
    const totalTimeOnPages = finalJourney.pagesVisited.reduce((total, page) => {
      return total + (page.timeSpent || 0);
    }, 0);
    
    const pageDetails = finalJourney.pagesVisited.map(page => ({
      path: page.path,
      fullUrl: page.fullUrl || page.path,
      pageName: page.pageName || getPageName(page.path),
      timestamp: page.timestamp,
      timeSpent: page.timeSpent || 0,
      scrollDepth: page.scrollDepth || 0
    }));
    
    const bounceRate = finalJourney.pagesVisited.length <= 1;
    const pagesPerSession = finalJourney.pagesVisited.length;
    const avgTimePerPage = totalTimeOnPages > 0 ? Math.floor(totalTimeOnPages / pagesPerSession) : 0;
    
    const updatedRevisitHistory = await getRevisitHistory(storedEmail);
    
    // Save to database automatically
    await supabase.from('user_journeys').insert([{
      session_id: finalJourney.sessionId,
      user_id: finalJourney.userId,
      email: storedEmail,
      name: null, // We don't have name in auto-save
      phone: null, // We don't have phone in auto-save
      pages_visited: pageDetails,
      total_pages: finalJourney.pagesVisited.length,
      total_time_on_pages: totalTimeOnPages,
      first_page: finalJourney.pagesVisited[0]?.fullUrl || finalJourney.pagesVisited[0]?.path || null,
      last_page: finalJourney.pagesVisited[finalJourney.pagesVisited.length - 1]?.fullUrl || finalJourney.pagesVisited[finalJourney.pagesVisited.length - 1]?.path || null,
      current_page: finalJourney.currentPageUrl || finalJourney.currentPage || null,
      current_page_name: finalJourney.currentPageName || null,
      device_type: finalJourney.deviceType,
      browser: finalJourney.browser,
      browser_version: finalJourney.browserVersion || null,
      os: finalJourney.os,
      os_version: finalJourney.osVersion || null,
      screen_resolution: finalJourney.screenResolution || null,
      is_mobile: finalJourney.isMobile,
      is_tablet: finalJourney.isTablet,
      language: finalJourney.language || null,
      locale: finalJourney.locale || null,
      country: finalJourney.country || null,
      city: finalJourney.city || null,
      region: finalJourney.region || null,
      postal_code: finalJourney.postalCode || null,
      timezone: finalJourney.timezone || null,
      latitude: finalJourney.latitude || null,
      longitude: finalJourney.longitude || null,
      ip_address: finalJourney.ipAddress || null,
      referrer_domain: finalJourney.referrerDomain || null,
      utm_source: finalJourney.utmSource || null,
      utm_medium: finalJourney.utmMedium || null,
      utm_campaign: finalJourney.utmCampaign || null,
      utm_term: finalJourney.utmTerm || null,
      utm_content: finalJourney.utmContent || null,
      session_start: finalJourney.sessionStart,
      session_end: sessionEnd.toISOString(),
      time_on_site: timeOnSite,
      is_returning_visitor: finalJourney.isReturningVisitor,
      total_visits: newTotalVisits,
      first_visit_date: finalJourney.firstVisitDate || null,
      last_visit_date: finalJourney.lastVisitDate || null,
      days_since_first_visit: finalJourney.daysSinceFirstVisit || 0,
      revisit_history: updatedRevisitHistory,
      bounce_rate: bounceRate,
      pages_per_session: pagesPerSession,
      avg_time_per_page: avgTimePerPage,
      total_time_on_pages: totalTimeOnPages,
      submission_type: null, // Auto-save, not a form submission
      newsletter_subscribed: false,
      contact_form_submitted: false,
      has_submitted_form: true,
      created_at: new Date().toISOString()
    }]);
    
    console.log('✅ Auto-saved returning user journey:', storedEmail, 'Visit:', newTotalVisits);
  } catch (error) {
    console.error('❌ Error auto-saving journey:', error);
  }
};

// Save journey to Supabase with submission data
export const saveJourneyToSupabase = async (data: UserJourneySubmission): Promise<boolean> => {
  try {
    // Increment visit count NOW (when form is submitted, not during browsing)
    const newTotalVisits = await incrementVisitCount(data.email);
    
    // Re-initialize journey with email to check database for previous visits
    const updatedJourney = await initializeJourney(data.email);
    
    // Update the journey with correct visit count
    updatedJourney.totalVisits = newTotalVisits;
    updatedJourney.isReturningVisitor = newTotalVisits > 1;
    
    const journey = { ...updatedJourney, ...data.journey, pagesVisited: data.journey.pagesVisited };
    
    // Mark that user has submitted a form
    markFormSubmitted();
    
    // Store user email for future auto-tracking
    storeUserEmail(data.email);
    
    // Add current visit to revisit history (await since it's now async)
    await addToRevisitHistory(journey.pagesVisited, data.email);
    
    // Calculate actual visit duration (session_end - session_start)
    const sessionStart = new Date(journey.sessionStart);
    const sessionEnd = new Date();
    const timeOnSite = Math.floor((sessionEnd.getTime() - sessionStart.getTime()) / 1000); // Total visit duration in seconds
    
    // Calculate total time spent across all pages
    const totalTimeOnPages = journey.pagesVisited.reduce((total, page) => {
      return total + (page.timeSpent || 0);
    }, 0);
    
    // Prepare page details with all information
    const pageDetails = journey.pagesVisited.map(page => ({
      path: page.path,
      fullUrl: page.fullUrl || page.path,
      pageName: page.pageName || getPageName(page.path),
      timestamp: page.timestamp,
      timeSpent: page.timeSpent || 0,
      scrollDepth: page.scrollDepth || 0
    }));
    
    // Calculate engagement metrics
    const bounceRate = journey.pagesVisited.length <= 1;
    const pagesPerSession = journey.pagesVisited.length;
    const avgTimePerPage = totalTimeOnPages > 0 ? Math.floor(totalTimeOnPages / pagesPerSession) : 0;
    
    // Get updated revisit history after adding current visit (check database if needed)
    const updatedRevisitHistory = await getRevisitHistory(data.email);
    
    const { error } = await supabase
      .from('user_journeys')
      .insert([{
        session_id: journey.sessionId,
        user_id: journey.userId,
        email: data.email,
        name: data.name || null,
        phone: data.phone || null,
        pages_visited: pageDetails,
        total_pages: journey.pagesVisited.length,
        total_time_on_pages: totalTimeOnPages,
        first_page: journey.pagesVisited[0]?.fullUrl || journey.pagesVisited[0]?.path || null,
        last_page: journey.pagesVisited[journey.pagesVisited.length - 1]?.fullUrl || journey.pagesVisited[journey.pagesVisited.length - 1]?.path || null,
        current_page: journey.currentPageUrl || journey.currentPage || null,
        current_page_name: journey.currentPageName || null,
        device_type: journey.deviceType,
        browser: journey.browser,
        browser_version: journey.browserVersion || null,
        os: journey.os,
        os_version: journey.osVersion || null,
        screen_resolution: journey.screenResolution || null,
        is_mobile: journey.isMobile,
        is_tablet: journey.isTablet,
        language: journey.language || null,
        locale: journey.locale || null,
        country: journey.country || null,
        city: journey.city || null,
        region: journey.region || null,
        postal_code: journey.postalCode || null,
        timezone: journey.timezone || null,
        latitude: journey.latitude || null,
        longitude: journey.longitude || null,
        ip_address: journey.ipAddress || null,
        referrer_domain: journey.referrerDomain || null,
        utm_source: journey.utmSource || null,
        utm_medium: journey.utmMedium || null,
        utm_campaign: journey.utmCampaign || null,
        utm_term: journey.utmTerm || null,
        utm_content: journey.utmContent || null,
        submission_type: data.submissionType,
        newsletter_subscribed: data.submissionType === 'newsletter',
        contact_form_submitted: data.submissionType === 'contact' || data.submissionType === 'lead_form',
        session_start: journey.sessionStart,
        session_end: sessionEnd.toISOString(),
        time_on_site: timeOnSite,
        is_returning_visitor: journey.isReturningVisitor,
        total_visits: journey.totalVisits,
        first_visit_date: journey.firstVisitDate,
        last_visit_date: journey.lastVisitDate,
        days_since_first_visit: journey.daysSinceFirstVisit,
        revisit_history: updatedRevisitHistory,
        bounce_rate: bounceRate,
        pages_per_session: pagesPerSession,
        avg_time_per_page: avgTimePerPage,
        has_submitted_form: true
      }]);
    
    if (error) {
      console.error('Error saving journey:', error.message);
      return false;
    }
    
    // Mark that journey was saved this session (prevent double-save)
    sessionStorage.setItem(JOURNEY_SAVED_KEY, 'true');
    console.log('✅ Journey saved successfully - session flag set');
    
    return true;
  } catch (error) {
    console.error('Exception saving journey to Supabase:', error);
    return false;
  }
};

// Track form submission as part of user journey
export const trackFormSubmission = async (formType: string, formData: any) => {
  const journey = getJourney();
  if (!journey) return;

  const submissionData: UserJourneySubmission = {
    sessionId: journey.sessionId,
    journey: journey,
    email: formData.email,
    name: `${formData.firstName} ${formData.lastName}`,
    phone: formData.phone,
    company: formData.company,
    services: formData.services,
    message: formData.message || null,
    submissionType: formType as 'newsletter' | 'contact' | 'lead_form'
  };

  await saveJourneyToSupabase(submissionData);
};

// Clear journey (call on logout or after session ends)
export const clearJourney = () => {
  Cookies.remove(JOURNEY_COOKIE_NAME);
  Cookies.remove(SESSION_ID_COOKIE_NAME);
};
