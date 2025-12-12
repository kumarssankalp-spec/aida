// User Journey Tracking Utility
// This file provides utilities for tracking user behavior and journey

export interface TrackingEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  page?: string;
}

export interface PageView {
  page: string;
  title: string;
}

class Analytics {
  private static instance: Analytics;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Initialize tracking (Google Analytics, Facebook Pixel, etc.)
  public initialize(): void {
    if (this.isInitialized) return;

    const consent = this.getConsentStatus();
    
    if (consent === 'accepted') {
      this.loadTrackingScripts();
      this.isInitialized = true;
    }
  }

  // Load tracking scripts (Google Analytics, Facebook Pixel, etc.)
  private loadTrackingScripts(): void {
    // Example: Google Analytics
    // Uncomment and add your GA_MEASUREMENT_ID
    /*
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    */

    console.log('Tracking scripts loaded');
  }

  // Get consent status from localStorage
  private getConsentStatus(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cookieConsent');
    }
    return null;
  }

  // Track page view
  public trackPageView(data: PageView): void {
    if (!this.isInitialized) return;

    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: data.page,
        page_title: data.title,
      });
    }

    // Store in sessionStorage for journey tracking
    this.recordJourneyStep(data.page);
    
    console.log('Page view tracked:', data);
  }

  // Track custom event
  public trackEvent(data: TrackingEvent): void {
    if (!this.isInitialized) return;

    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', data.event, {
        event_category: data.category,
        event_label: data.label,
        value: data.value,
      });
    }

    console.log('Event tracked:', data);
  }

  // Record journey step in sessionStorage
  private recordJourneyStep(page: string): void {
    if (typeof window === 'undefined') return;

    const journey = this.getUserJourney();
    journey.push({
      page,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 50 steps
    const trimmedJourney = journey.slice(-50);
    sessionStorage.setItem('userJourney', JSON.stringify(trimmedJourney));
  }

  // Get user journey from sessionStorage
  public getUserJourney(): Array<{ page: string; timestamp: string }> {
    if (typeof window === 'undefined') return [];

    const journeyData = sessionStorage.getItem('userJourney');
    return journeyData ? JSON.parse(journeyData) : [];
  }

  // Track button click
  public trackButtonClick(buttonName: string, location: string): void {
    this.trackEvent({
      event: 'button_click',
      category: 'engagement',
      label: buttonName,
      page: location,
    });
  }

  // Track form submission
  public trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent({
      event: 'form_submission',
      category: 'conversion',
      label: formName,
      value: success ? 1 : 0,
    });
  }

  // Track service page view
  public trackServiceView(serviceName: string): void {
    this.trackEvent({
      event: 'service_view',
      category: 'services',
      label: serviceName,
    });
  }

  // Track scroll depth
  public trackScrollDepth(depth: number): void {
    this.trackEvent({
      event: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth,
    });
  }
}

export const analytics = Analytics.getInstance();

// Auto-initialize on client-side
if (typeof window !== 'undefined') {
  analytics.initialize();
}
