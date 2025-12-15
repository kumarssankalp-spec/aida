'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageVisit, initializeJourney, initScrollTracking, autoSaveReturningUserJourney } from '@/lib/journeyTracking';

export default function JourneyTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize journey on mount
    initializeJourney();
    
    // Initialize scroll tracking
    const cleanup = initScrollTracking();
    
    // Auto-save journey when user leaves (for returning users)
    const handleBeforeUnload = () => {
      autoSaveReturningUserJourney();
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        autoSaveReturningUserJourney();
      }
    };
    
    // Add listeners for page unload and visibility change
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      if (cleanup) {
        cleanup();
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Track page visit whenever pathname or search params change
    if (pathname) {
      const search = searchParams.toString();
      const fullUrl = search ? `${pathname}?${search}` : pathname;
      trackPageVisit(pathname, fullUrl);
      
      // Recalculate scroll depth for new page after a short delay
      setTimeout(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollPercentage = Math.round(
          ((scrollTop + windowHeight) / documentHeight) * 100
        );
        const depth = Math.min(scrollPercentage, 100);
        
        // Import and call trackScrollDepth
        import('@/lib/journeyTracking').then(({ trackScrollDepth }) => {
          trackScrollDepth(depth);
        });
      }, 100);
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}
