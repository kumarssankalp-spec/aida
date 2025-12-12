'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageVisit, initializeJourney } from '@/lib/journeyTracking';

export default function JourneyTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize journey on mount
    initializeJourney();
  }, []);

  useEffect(() => {
    // Track page visit whenever pathname or search params change
    if (pathname) {
      const search = searchParams.toString();
      const fullUrl = search ? `${pathname}?${search}` : pathname;
      trackPageVisit(pathname, fullUrl);
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}
