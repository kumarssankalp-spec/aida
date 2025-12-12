import Cookies from 'js-cookie';
import { supabase } from './supabase';

export interface PageVisit {
  path: string;
  fullUrl?: string; // includes query parameters
  timestamp: string;
  timeSpent?: number; // seconds
}

export interface UserJourney {
  sessionId: string;
  pagesVisited: PageVisit[];
  deviceType: string;
  browser: string;
  os: string;
  country?: string;
  city?: string;
  ipAddress?: string;
  sessionStart: string;
  sessionEnd?: string;
  timeOnSite?: number;
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

// Generate unique session ID (UUID v4 format)
const generateSessionId = (): string => {
  // Generate a proper UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Get device information
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  
  let deviceType = 'desktop';
  if (/mobile/i.test(userAgent)) deviceType = 'mobile';
  else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet';
  
  let browser = 'unknown';
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) browser = 'chrome';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'safari';
  else if (/firefox/i.test(userAgent)) browser = 'firefox';
  else if (/edg/i.test(userAgent)) browser = 'edge';
  
  let os = 'unknown';
  if (/windows/i.test(userAgent)) os = 'windows';
  else if (/mac/i.test(userAgent)) os = 'macos';
  else if (/linux/i.test(userAgent)) os = 'linux';
  else if (/android/i.test(userAgent)) os = 'android';
  else if (/ios|iphone|ipad/i.test(userAgent)) os = 'ios';
  
  return { deviceType, browser, os };
};

// Get geolocation data
const getGeolocation = async (): Promise<{ country?: string; city?: string; ip?: string }> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name,
      city: data.city,
      ip: data.ip
    };
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return {};
  }
};

// Initialize or get existing journey
export const initializeJourney = async (): Promise<UserJourney> => {
  let sessionId = Cookies.get(SESSION_ID_COOKIE_NAME);
  let journey = Cookies.get(JOURNEY_COOKIE_NAME);
  
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
    // Update sessionId in journey if it was regenerated
    parsedJourney.sessionId = sessionId;
    return parsedJourney;
  }
  
  const { deviceType, browser, os } = getDeviceInfo();
  const geo = await getGeolocation();
  
  const newJourney: UserJourney = {
    sessionId,
    pagesVisited: [],
    deviceType,
    browser,
    os,
    country: geo.country,
    city: geo.city,
    ipAddress: geo.ip,
    sessionStart: new Date().toISOString()
  };
  
  Cookies.set(JOURNEY_COOKIE_NAME, JSON.stringify(newJourney), { expires: 1 });
  return newJourney;
};

// Track page visit
export const trackPageVisit = async (path: string, fullUrl?: string) => {
  const journey = await initializeJourney();
  
  const lastVisit = journey.pagesVisited[journey.pagesVisited.length - 1];
  if (lastVisit && !lastVisit.timeSpent) {
    // Calculate time spent on previous page
    const timeSpent = Math.floor((new Date().getTime() - new Date(lastVisit.timestamp).getTime()) / 1000);
    lastVisit.timeSpent = timeSpent;
  }
  
  journey.pagesVisited.push({
    path,
    fullUrl: fullUrl || path,
    timestamp: new Date().toISOString()
  });
  
  Cookies.set(JOURNEY_COOKIE_NAME, JSON.stringify(journey), { expires: 1 });
};

// Get current journey
export const getJourney = (): UserJourney | null => {
  const journey = Cookies.get(JOURNEY_COOKIE_NAME);
  return journey ? JSON.parse(journey) : null;
};

// Save journey to Supabase with submission data
export const saveJourneyToSupabase = async (data: UserJourneySubmission): Promise<boolean> => {
  try {
    const journey = data.journey;
    
    // Calculate total time on site
    const sessionStart = new Date(journey.sessionStart);
    const sessionEnd = new Date();
    const timeOnSite = Math.floor((sessionEnd.getTime() - sessionStart.getTime()) / 1000);
    
    const { error } = await supabase
      .from('user_journeys')
      .insert([{
        session_id: journey.sessionId,
        email: data.email,
        name: data.name || null,
        phone: data.phone || null,
        pages_visited: journey.pagesVisited,
        total_pages: journey.pagesVisited.length,
        first_page: journey.pagesVisited[0]?.fullUrl || journey.pagesVisited[0]?.path || null,
        last_page: journey.pagesVisited[journey.pagesVisited.length - 1]?.fullUrl || journey.pagesVisited[journey.pagesVisited.length - 1]?.path || null,
        device_type: journey.deviceType,
        browser: journey.browser,
        os: journey.os,
        country: journey.country || null,
        city: journey.city || null,
        ip_address: journey.ipAddress || null,
        submission_type: data.submissionType,
        newsletter_subscribed: data.submissionType === 'newsletter',
        contact_form_submitted: data.submissionType === 'contact' || data.submissionType === 'lead_form',
        session_start: journey.sessionStart,
        session_end: sessionEnd.toISOString(),
        time_on_site: timeOnSite
      }]);
    
    if (error) {
      console.error('Error saving journey:', error.message);
      return false;
    }
    
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
