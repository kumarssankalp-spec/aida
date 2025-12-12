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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  message?: string;
  sourcePage?: string;
  referrerUrl?: string;
  emailSent?: boolean;
}

// Save lead submission
export const saveLeadSubmission = async (data: LeadSubmission): Promise<boolean> => {
  try {
    const { data: result, error } = await supabase
      .from('lead_submissions')
      .insert([{
        session_id: data.sessionId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        services: data.services,
        message: data.message || null,
        source_page: data.sourcePage || null,
        referrer_url: data.referrerUrl || null,
        email_sent: data.emailSent || false,
        submitted_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Failed to save lead submission:', error.message);
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
