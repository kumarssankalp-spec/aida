'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      initializeTracking();
    }
  }, []);

  const initializeTracking = () => {
    // Initialize tracking scripts here
    // Example: Google Analytics, Facebook Pixel, etc.
    console.log('Tracking initialized');
    
    // You can add your tracking code here
    // For example: gtag('config', 'GA_MEASUREMENT_ID');
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    initializeTracking();
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 shadow-lg z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept", you consent to our use of cookies.{' '}
              <Link href="/legal/cookie-policy" className="underline hover:text-blue-400">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-sm md:text-base"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition text-sm md:text-base"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
