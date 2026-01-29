'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { sendNewsletterSubscription } from '@/lib/emailService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);
  const [countdown, setCountdown] = React.useState(60);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  // Redirect if accessed directly without form submission
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSubmitted = sessionStorage.getItem('formSubmitted');
      if (!hasSubmitted) {
        router.push('/get-started');
        return;
      } else {
        // Mark as authorized but don't remove the flag yet
        setIsAuthorized(true);
        // Clear the flag after a short delay
        setTimeout(() => {
          sessionStorage.removeItem('formSubmitted');
        }, 1000);
        // Track the thank-you page visit
        const trackVisit = async () => {
          const { trackPageVisit } = await import('@/lib/journeyTracking');
          await trackPageVisit('/thank-you', '/thank-you');
        };
        trackVisit();
      }
    }
  }, [router]);

  // Auto-redirect to home after 60 seconds
  React.useEffect(() => {
    if (!isAuthorized) return; // Don't start countdown until authorized

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [router, isAuthorized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSubscribed || !email) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use the sendNewsletterSubscription function which handles everything
      const { sendNewsletterSubscription } = await import('@/lib/emailService');
      
      const success = await sendNewsletterSubscription({
        email: email,
        source: 'thank-you'
      });
      
      if (success) {
        setSubmitStatus('success');
        setEmail('');
        setIsSubscribed(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* Left Side - Thank You Message */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8 lg:space-y-12 lg:sticky lg:top-24 lg:col-span-2"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-4 sm:mb-6">
                  Thank You!
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-6">
                  Thanks for reaching out! Your request is priority one — expect a response within one business day.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                  While we prep, subscribe to our newsletter for the latest tech insights and see why we're the top choice for your project.
                </p>
                
                {/* Countdown Timer */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-gray-500 mt-4"
                >
                  Redirecting to home in {countdown} seconds...
                </motion.p>
              </div>

              {/* Back to Home Button */}
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 border-2 border-black rounded-full text-black font-medium text-base sm:text-lg transition-all duration-300 hover:text-white hover:border-[#5919C1] overflow-hidden w-full sm:w-auto justify-center cursor-pointer"
                >
                <span className="absolute inset-0 bg-[#5919C1] translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative z-10">Back to Home Now</span>
                <svg
                  className="relative z-10 w-6 h-6 transition-all duration-300 rotate-45 group-hover:rotate-[330deg] group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
              </Link>
            </motion.div>

            {/* Right Side - Newsletter Form with Video Background */}
            <div className="relative rounded-3xl overflow-hidden lg:col-span-3">
              {/* Video Background */}
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/large3.mp4" type="video/mp4" />
                </video>
              </div>
              
              {/* Frosted Glass Container */}
              <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12 min-h-[600px] flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3">
                      Stay Updated
                    </h2>
                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                      Subscribe to our newsletter for the latest insights in AI, Big Data, and Digital Transformation
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white to-purple-300 border-2 border-white/30"></div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/30"></div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-200 to-white border-2 border-white/30"></div>
                      </div>
                      <p className="text-sm text-white/80">
                        Join <span className="font-semibold">5,000+</span> subscribers
                      </p>
                    </div>
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Successfully subscribed! Check your inbox.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Something went wrong. Please try again.
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Email Input with bottom border only */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-1 py-4 bg-transparent border-0 border-b-2 border-white/40 text-white placeholder-white/50 text-base sm:text-lg focus:outline-none focus:border-white transition-all duration-300"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-focus-within:w-full"></div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-white/90">Weekly insights</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-white/90">Exclusive content</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-white/90">Industry updates</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-white/90">Unsubscribe anytime</span>
                      </div>
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="newsletter-agree"
                        checked={isSubscribed}
                        onChange={(e) => setIsSubscribed(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[#5919C1] cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor="newsletter-agree" className="text-sm sm:text-base text-white/90 cursor-pointer leading-relaxed">
                        I agree to receive marketing communications and accept the{' '}
                        <Link href="/legal/privacy-policy" className="underline hover:text-white transition font-medium">
                          Privacy Policy
                        </Link>
                        {' '}and{' '}
                        <Link href="/legal/terms-conditions" className="underline hover:text-white transition font-medium">
                          Terms & Conditions
                        </Link>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !isSubscribed || !email}
                      whileHover={{ scale: isSubmitting || !isSubscribed || !email ? 1 : 1 }}
                      whileTap={{ scale: isSubmitting || !isSubscribed || !email ? 1 : 0.98 }}
                      className={`group relative w-full px-6 sm:px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium flex items-center justify-between transition-all duration-300 overflow-hidden ${
                        submitStatus === 'error'
                          ? 'bg-red-500 text-white border-2 border-red-500'
                          : isSubmitting
                          ? 'border-2 border-white text-white cursor-wait'
                          : !isSubscribed || !email
                          ? 'bg-white/20 text-white/60 cursor-not-allowed border-2 border-white/20'
                          : 'bg-white text-[#5919C1] hover:bg-[#5919C1] hover:text-white border-2 border-white shadow-lg'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2 font-semibold">
                        {isSubmitting ? (
                          <>
                            <span>Subscribing</span>
                            <span className="inline-flex gap-0.5">
                              <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full animate-[wave_1.2s_infinite_ease-in-out]"></span>
                              <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.2s]"></span>
                              <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.4s]"></span>
                            </span>
                          </>
                        ) : submitStatus === 'error' ? (
                          'Try Again'
                        ) : submitStatus === 'success' ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Subscribed
                          </>
                        ) : (
                          'Subscribe Now'
                        )}
                      </span>
                      <svg
                        className={`relative z-10 w-6 h-6 transition-all duration-300 ${
                          !isSubmitting && isSubscribed && email ? ' group-hover:rotate-345' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
