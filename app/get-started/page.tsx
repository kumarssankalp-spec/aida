'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

function LeadFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    services: serviceParam ? [serviceParam] : [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);

  // Redirect if no referrer (direct access attempt) and track page visit
  React.useEffect(() => {
    const referrer = document.referrer;
    const allowedPaths = [
      '/services/big-data-analysis',
      '/services/artificial-intelligence',
      '/services/technology-services',
      '/services/digital-marketing',
      '/big-data-analysis',
      '/artificial-intelligence',
      '/technology-services',
      '/digital-marketing',
      '/'
    ];
    
    // Check if referrer is from allowed pages or same origin
    const isAllowedReferrer = referrer && (
      allowedPaths.some(path => referrer.includes(path)) ||
      referrer.includes(window.location.origin) ||
      new URL(referrer, window.location.origin).pathname !== '/get-started'
    );

    // Also check if there's a service parameter (coming from a service page button)
    const hasServiceParam = searchParams.get('service') !== null;

    if (!isAllowedReferrer && !sessionStorage.getItem('leadFormAccess') && !hasServiceParam) {
      router.push('/');
    } else {
      sessionStorage.setItem('leadFormAccess', 'true');
      // Note: Page tracking is handled by JourneyTracker component automatically
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { sendContactForm } = await import('@/lib/emailService');
      const { getJourney, trackPageVisit } = await import('@/lib/journeyTracking');

      // Current page with full URL
      const currentFullUrl = window.location.pathname + window.location.search;
      
      // FORCE track the get-started page right now before submission
      await trackPageVisit(window.location.pathname, currentFullUrl);
      
      // Get the journey after tracking
      const journey = getJourney();
      
      // Get the page user came from (second to last page in journey)
      // This should be the service page they clicked from
      const previousPage = journey?.pagesVisited[journey.pagesVisited.length - 2];
      const sourcePage = previousPage?.fullUrl || previousPage?.path || document.referrer || 'direct';
      
      // referrerUrl = current page URL
      const referrerUrl = currentFullUrl;

      const success = await sendContactForm({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: `Company Name: ${formData.company || 'Not provided'}`,
        service: `Services: ${formData.services.join(', ')}`,
        message: formData.message,
        newsletter: false,
        // Lead form specific data
        isLeadForm: true,
        firstName: formData.firstName,
        lastName: formData.lastName,
        services: formData.services,
        sourcePage: sourcePage,
        referrerUrl: referrerUrl
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          company: '',
          services: serviceParam ? [serviceParam] : [],
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const serviceOptions = [
    'Big Data & Analysis',
    'Artificial Intelligence',
    'Technology Services',
    'Digital Marketing'
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* Left Side - Header and Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8 lg:space-y-12 lg:sticky lg:top-24 lg:col-span-2"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-4 sm:mb-6">
                  Get Started with AIDA
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Tell us about your project and let's build something amazing together
                </p>
              </div>

              {/* Know More Button */}
              <motion.a
                href="/about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 border-2 border-black rounded-full text-black font-medium text-base sm:text-lg transition-all duration-300 hover:text-white hover:border-[#5919C1] overflow-hidden w-full sm:w-auto justify-center"
              >
                <span className="absolute inset-0 bg-[#5919C1] translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative z-10">Know More About Us</span>
                <svg
                  className="relative z-10 w-6 h-6 transition-all duration-300 rotate-45 group-hover:rotate-[330deg] group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Right Side - Form with Video Background */}
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
              <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12">
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                {/* First Row - First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full py-4 pb-4 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full py-4 pb-4 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Second Row - Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full py-4 pb-4 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full py-4 pb-4 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Third Row - Company Name */}
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full py-4 pb-4 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors"
                />

                {/* Service Selection - Multi-Select Badge Buttons */}
                <div className="space-y-4">
                  <label className="text-base text-white font-medium">
                    Select Services * (multiple allowed)
                  </label>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {serviceOptions.map((service) => (
                      <motion.button
                        key={service}
                        type="button"
                        onClick={() => {
                          const isSelected = formData.services.includes(service);
                          setFormData({
                            ...formData,
                            services: isSelected
                              ? formData.services.filter(s => s !== service)
                              : [...formData.services, service]
                          });
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 font-medium text-sm ${
                          formData.services.includes(service)
                            ? 'border-white bg-white text-[#5919C1]'
                            : 'border-white/70 text-white hover:border-white hover:bg-white/10'
                        }`}
                      >
                        {service}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <textarea
                  name="message"
                  placeholder="Tell us about your project or requirements"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full py-2 pb-2 border-b-2 border-white/50 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>

                {/* Status Messages */}
                {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-700 text-lg mb-1">Your inquiry has been successfully submitted.</p>
                <p className="text-gray-600">Our team will review your request and get back to you within 24 hours.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Submission Failed</h3>
                <p className="text-gray-700">We encountered an issue processing your request.</p>
                <p className="text-gray-600 mt-1">Please try again or contact us directly at contact@aidacorp.in</p>
              </motion.div>
            )}

                {/* Submit Button - Right Aligned (Hidden on success) */}
                {submitStatus !== 'success' && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-3">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex items-start gap-3 order-2 sm:order-1"
                    >
                      <p className="text-xs sm:text-sm text-white leading-relaxed">
                        By submitting, I agree to{' '}
                        <a href="/legal/privacy-policy" className="text-white/90 hover:underline transition font-medium whitespace-nowrap">
                          Privacy Policy
                        </a>
                        {' '}and{' '}
                        <a href="/legal/terms-conditions" className="text-white/90 hover:underline transition font-medium whitespace-nowrap">
                          Terms & Conditions
                        </a>
                      </p>
                    </motion.div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.phone || !formData.email || formData.services.length === 0}
                      whileHover={(!isSubmitting && !submitStatus && formData.firstName && formData.lastName && formData.phone && formData.email && formData.services.length > 0) ? { scale: 1.05 } : {}}
                      whileTap={(!isSubmitting && !submitStatus && formData.firstName && formData.lastName && formData.phone && formData.email && formData.services.length > 0) ? { scale: 0.95 } : {}}
                      className={`group relative py-3 sm:py-4 px-8 sm:px-12 rounded-full font-medium text-base sm:text-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 overflow-hidden order-1 sm:order-2 w-full sm:w-auto justify-center ${
                        submitStatus === 'error'
                        ? 'bg-red-500 text-white border-2 border-red-500'
                        : isSubmitting
                        ? 'border-2 border-white text-white cursor-wait'
                        : !formData.firstName || !formData.lastName || !formData.phone || !formData.email || formData.services.length === 0
                        ? 'border-2 border-white/40 text-white/40 cursor-not-allowed'
                        : 'border-2 border-white text-white hover:bg-white hover:text-[#5919C1]'
                      }`}
                    >

                      <span className="relative z-10 flex items-end gap-2">
                        {isSubmitting 
                          ? (
                            <>
                              <span>Submitting</span>
                              <span className="inline-flex gap-0.5 pb-1">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-[wave_1.2s_infinite_ease-in-out]"></span>
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.4s]"></span>
                              </span>
                            </>
                          )
                          : submitStatus === 'error'
                          ? "Try Again"
                          : submitStatus === 'success' 
                          ? "Submitted Successfully"
                          : 'Submit'}
                      </span>
                      {!isSubmitting && (submitStatus === null || submitStatus === 'error') && (
                        <svg
                          className={`relative z-10 w-6 h-6 transition-all duration-500 ${
                            !submitStatus && formData.firstName && formData.lastName && formData.phone && formData.email && formData.services.length > 0 
                              ? 'rotate-330 group-hover:translate-x-1' 
                              : 'rotate-45'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                )}
                </motion.form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5919C1]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LeadFormContent />
    </Suspense>
  );
}
