import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NewsletterSubscriber {
  id?: number;
  email: string;
  name?: string;
  phone?: string;
  subscribed_at?: string;
  source?: 'footer' | 'contact';
}

export interface LeadSubmission {
  sessionId: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  services: string[] | string;
  message?: string;
  sourcePage?: string;
  sourceUrl?: string;
  referrerUrl?: string;
  country?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  ipAddress?: string;
  deviceType?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  screenResolution?: string;
  isMobile?: boolean;
  isTablet?: boolean;
  language?: string;
  locale?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  emailSent?: boolean;
}

// Save lead submission
export const saveLeadSubmission = async (data: LeadSubmission): Promise<boolean> => {
  try {
    // Call server-side API route which uses service role key (bypasses RLS)
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Failed to save lead submission:', result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving lead submission:', error);
    return false;
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (data: NewsletterSubscriber): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: data.email,
        name: data.name || null,
        phone: data.phone || null,
        source: data.source || 'footer',
        subscribed_at: new Date().toISOString()
      }]);

    if (error) {
      // If duplicate email, update existing record
      if (error.code === '23505') {
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            name: data.name || null,
            phone: data.phone || null,
            source: data.source || 'footer',
            subscribed_at: new Date().toISOString()
          })
          .eq('email', data.email);

        if (updateError) {
          console.error('Error updating newsletter subscription:', updateError);
          return false;
        }
      } else {
        console.error('Error subscribing to newsletter:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Exception subscribing to newsletter:', error);
    return false;
  }
};
