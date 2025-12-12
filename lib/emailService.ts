import emailjs from '@emailjs/browser';
import { subscribeToNewsletter, saveLeadSubmission } from './supabase';
import { getJourney, saveJourneyToSupabase } from './journeyTracking';

// EmailJS configuration - Replace these with your actual values from EmailJS dashboard
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || 'YOUR_CONTACT_TEMPLATE_ID';
const EMAILJS_NEWSLETTER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'YOUR_NEWSLETTER_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  service?: string;
  newsletter?: boolean;
  // New fields for lead form
  firstName?: string;
  lastName?: string;
  services?: string[];
  isLeadForm?: boolean;
  sourcePage?: string;
  referrerUrl?: string;
}

export interface NewsletterData {
  email: string;
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Send contact form
export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  let emailSent = false;
  
  try {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      company: data.company || '',
      service: data.service || '',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams
    );
    emailSent = true;
  } catch (error) {
    console.error('Failed to send email:', error instanceof Error ? error.message : 'Unknown error');
    // Continue to save data even if email fails
  }

  try {
    // Get current journey
    const journey = getJourney();

    // IMPORTANT: Save journey FIRST so session_id exists in user_journeys table
    if (journey) {
      await saveJourneyToSupabase({
        sessionId: journey.sessionId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        submissionType: data.isLeadForm ? 'lead_form' : 'contact',
        journey
      });
    }

    // THEN save lead submission (references session_id from user_journeys)
    if (data.isLeadForm && journey && data.firstName && data.lastName && data.services) {
      console.log('💾 Saving to lead_submissions:', {
        sessionId: journey.sessionId,
        firstName: data.firstName,
        lastName: data.lastName,
        services: data.services
      });
      
      const leadSaved = await saveLeadSubmission({
        sessionId: journey.sessionId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        services: data.services,
        message: data.message,
        sourcePage: data.sourcePage,
        referrerUrl: data.referrerUrl,
        emailSent: emailSent
      });
      
      console.log('💾 Lead submission result:', leadSaved);
    } else {
      console.log('❌ Skipping lead submission:', {
        isLeadForm: data.isLeadForm,
        hasJourney: !!journey,
        hasFirstName: !!data.firstName,
        hasLastName: !!data.lastName,
        hasServices: !!data.services
      });
    }

    // Always save to newsletter table if newsletter is checked
    if (data.newsletter) {
      await subscribeToNewsletter({
        email: data.email,
        name: data.name,
        phone: data.phone,
        source: 'contact'
      });
    }

    // Return true if email sent OR data saved successfully
    return true;
  } catch (error) {
    console.error('Failed to save contact data:', error);
    // Return true only if email was sent
    return emailSent;
  }
};

// Send newsletter subscription
export const sendNewsletterSubscription = async (data: NewsletterData): Promise<boolean> => {
  try {
    // Save to newsletter table
    await subscribeToNewsletter({
      email: data.email,
      source: 'footer'
    });

    // Get current journey and save to user_journeys table
    const journey = getJourney();
    if (journey) {
      await saveJourneyToSupabase({
        sessionId: journey.sessionId,
        email: data.email,
        submissionType: 'newsletter',
        journey
      });
    }

    return true;
  } catch (error) {
    console.error('Failed to save newsletter subscription:', error);
    return false;
  }
};
