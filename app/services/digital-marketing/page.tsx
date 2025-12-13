'use client';
import Link from 'next/link';
import React from 'react';
import { motion, MotionConfig, useInView, useScroll, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import NumberFlow, { useCanAnimate } from '@number-flow/react';

const MotionNumberFlow = motion.create(NumberFlow);

function TypewriterText({ text, delay = 0, bold = false, boldText }: { text: string; delay?: number; bold?: boolean; boldText?: string }) {
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  // If boldText is provided, find its position in the text
  const boldStartIndex = boldText ? text.indexOf(boldText) : -1;
  const boldEndIndex = boldStartIndex >= 0 && boldText ? boldStartIndex + boldText.length : -1;

  return (
    <motion.span
      style={{ display: 'inline-block', fontWeight: bold ? 'bold' : 'normal' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => {
        const isBold = boldStartIndex >= 0 && index >= boldStartIndex && index < boldEndIndex;
        return (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block', fontWeight: isBold ? 'bold' : 'inherit' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const canAnimate = useCanAnimate();

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth acceleration and deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const newCount = Math.floor(easeOutQuart * end);

        setCount(newCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end); // Ensure we hit the exact end value
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <MotionConfig
      transition={{
        layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
      }}
    >
      <motion.span
        ref={ref}
        className="inline-flex items-center"
        layout
      >
        <MotionNumberFlow
          value={count}
          suffix={suffix}
          className="font-light"
          layout
          layoutRoot
        />
      </motion.span>
    </MotionConfig>
  );
}

// Badge animation component
function ScrollingBadges({ badges }: { badges: string[] }) {
  return (
    <div className="relative w-full overflow-hidden h-8 ">
      {/* Fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1A1A1A] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1A1A1A] to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex gap-2 absolute"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {[...badges, ...badges, ...badges, ...badges].map((badge, index) => (
          <div
            key={index}
            className="px-4 py-1 rounded-full border border-white text-sm text-white whitespace-nowrap"
          >
            {badge}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// CTA Form Component
function CTAForm() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    services: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { sendContactForm } = await import('@/lib/emailService');
      const { getJourney, trackPageVisit } = await import('@/lib/journeyTracking');

      // Track current page
      const currentFullUrl = window.location.pathname + window.location.search;
      await trackPageVisit(window.location.pathname, currentFullUrl);
      
      // Get journey data
      const journey = getJourney();
      const previousPage = journey?.pagesVisited[journey.pagesVisited.length - 2];
      const sourcePage = previousPage?.fullUrl || previousPage?.path || document.referrer || '/services/digital-marketing';
      const referrerUrl = currentFullUrl;

      // Split firstName into first and last name
      const nameParts = formData.firstName.trim().split(' ');
      const firstName = nameParts[0] || formData.firstName;
      const lastName = nameParts.slice(1).join(' ') || 'N/A';

      // Send email and save to database (with isLeadForm flag)
      const success = await sendContactForm({
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        company: `Company Name: ${formData.company || 'Not provided'}`,
        service: `Services: ${formData.services.join(', ')}`,
        message: formData.message,
        newsletter: false,
        // Lead form specific data
        isLeadForm: true,
        firstName: firstName,
        lastName: lastName,
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
          services: [],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-8">
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-3">
        Want to scale faster?
      </h3>
      <p className="text-xl md:text-2xl text-gray-800 mb-12">
        Get Your Free Growth Plan
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row - Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First & Last Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full py-4 pb-4 border-b border-gray-800 bg-transparent text-black placeholder:text-gray-600 focus:outline-none focus:border-[#7B3FF2] transition-colors"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full py-4 pb-4 border-b border-gray-800 bg-transparent text-black placeholder:text-gray-600 focus:outline-none focus:border-[#7B3FF2] transition-colors"
          />
        </div>

        {/* Second Row - Email and Company Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full py-4 pb-4 border-b border-gray-800 bg-transparent text-black placeholder:text-gray-600 focus:outline-none focus:border-[#7B3FF2] transition-colors"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full py-4 pb-4 border-b border-gray-800 bg-transparent text-black placeholder:text-gray-600 focus:outline-none focus:border-[#7B3FF2] transition-colors"
          />
        </div>

        {/* Service Selection - Multi-Select Badge Buttons */}
        <div className="space-y-4">
          <label className="text-sm text-gray-700">Select Services * (multiple allowed)</label>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Performance Marketing', 'Websites & Funnels', 'Tracking + Analytics', 'Content, SEO & Brand', 'Full Digital Strategy'].map((service) => (
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
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                  formData.services.includes(service)
                    ? 'border-[#7B3FF2] bg-[#7B3FF2] text-white'
                    : 'border-gray-800 text-gray-800 hover:border-[#7B3FF2]'
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
          placeholder="Tell us about your goals"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full py-4 pb-4 border-b border-gray-800 bg-transparent text-black placeholder:text-gray-600 focus:outline-none focus:border-[#7B3FF2] transition-colors resize-none"
        ></textarea>

        {/* Submit Button - Right Aligned */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.firstName || !formData.phone || !formData.email || formData.services.length === 0}
            whileHover={(!isSubmitting && !submitStatus && formData.firstName && formData.phone && formData.email && formData.services.length > 0) ? { scale: 1.05 } : {}}
            whileTap={(!isSubmitting && !submitStatus && formData.firstName && formData.phone && formData.email && formData.services.length > 0) ? { scale: 0.95 } : {}}
            className={`group relative py-3 px-8 rounded-full font-light text-base flex items-center gap-3 transition-all duration-300 overflow-hidden ${
              submitStatus === 'success'
                ? 'bg-green-500 text-white border-2 border-green-500'
                : submitStatus === 'error'
                ? 'bg-red-500 text-white border-2 border-red-500'
                : isSubmitting
                ? 'border-2 border-black text-black cursor-wait'
                : !formData.firstName || !formData.phone || !formData.email || formData.services.length === 0
                ? 'border-2 border-gray-400 text-gray-400 cursor-not-allowed'
                : 'border-2 border-black text-black hover:text-white hover:border-transparent'
            }`}
          >
            <span className={`absolute inset-0 bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] translate-x-[-100%] transition-transform duration-300 ${
              (!isSubmitting && !submitStatus && formData.firstName && formData.phone && formData.email && formData.services.length > 0) ? 'group-hover:translate-x-0' : ''
            }`}></span>
            <span className="relative z-10 flex items-end gap-2">
              {isSubmitting 
                ? (
                  <>
                    <span>Submitting</span>
                    <span className="inline-flex gap-0.5 pb-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[wave_1.2s_infinite_ease-in-out]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[wave_1.2s_infinite_ease-in-out] [animation-delay:0.4s]"></span>
                    </span>
                  </>
                )
                : submitStatus === 'success' 
                ? "Thank you! We'll be in touch soon."
                : submitStatus === 'error'
                ? "Error! Please try again."
                : 'Get Your Free Plan'}
            </span>
            {!isSubmitting && submitStatus !== 'success' && (
              <svg
                className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                  !submitStatus && formData.firstName && formData.phone && formData.email && formData.services.length > 0 
                    ? 'rotate-90 group-hover:rotate-0' 
                    : 'rotate-90'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

const workItems = [
  {
    number: "01",
    title: "Performance Marketing ",
    description: "Ads That Actually Make Money",
    badges: ["SEO", "PPC", "ROI Scaling ", "Analytics",  "A/B Testing", "Google Ads", "Meta Ads", "Paid Ads","Funnel Optimization" ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    approach: "The Money-Machine Framework",
    approachDescription: "We don’t “run ads.”We build money machines — systems that turn cold traffic into buyers and buyers into repeat customers. Every campaign is engineered to squeeze maximum revenue from every rupee spent.",
    points: [
      { title: "Funnels That Work", description: "Audience targeting. Offer alignment. Funnel sequencing.", number: 1 },
      { title: "Platforms We Dominate", description: "Facebook & Instagram Ads. Google PPC + YouTube Ads. Multi-channel remarketing.", number: 2 },
      { title: "Revenue Optimization", description: "Conversion rate boosts. Creative testing. Scaling frameworks.", number: 3 }
    ]
  },
  {
    number: "02",
    title: "Websites & Funnels",
    description: "That Print Money",
    badges: ["Web Design", "WordPress", "Shopify", "Landing Pages","UI/UX", "Sales Funnels","Checkout Optimization","Heatmaps","Retargeting Flows","CRO (Conversion Rate Optimization)"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    approach: "How We Turn Clicks Into Cash ",
    approachDescription: "Your website isn’t supposed to “look pretty.” It should convert strangers into customers — automatically.We engineer funnels designed to increase clicks, time-on-site, leads, and purchases.",
    points: [
      { title: "High-Converting Structure", description: "Landing pages. Sales pages. Offer stacks.", number: 1 },
      { title: "Funnel Buildout", description: "Lead funnels. Product funnels. Retargeting flows.", number: 2 },
      { title: "User Experience that Sells", description: "UI/UX optimization. Speed & trust optimization. A/B testing.", number: 3 }
    ]
  },
  {
    number: "03",
    title: "Tracking + Analytics",
    description: "How We Give You X-Ray Vision",
    badges: ["UTM Frameworks", "LTV Analysis", "Cohort Tracking", "Behavior Analytics", "Google Tag Manager","Pixel Integration","Attribution"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    approach: "Intelligence-Driven Growth",
    approachDescription: "Most businesses fly blind. We don’t let you make decisions based on guesses. We set up deep tracking that shows exactly where money is leaking—and how to fix it.",
    points: [
      { title: "Full Funnel Visibility", description: " Behaviour tracking. Drop-off mapping. Cohort analysis. E-commerce Enhanced", number: 1 },
      { title: "Ad Spend Intelligence", description: "Cost-per-result deep dives. Creative performance. Attribution clarity.", number: 2 },
      { title: "Revenue Insights", description: "LTV calculations. CRO roadmap. Real-time dashboards.", number: 3 },
    ]
  },
  {
    number: "04",
    title: "Content, SEO & Brand Positioning",
    description: "That Creates Demand",
    badges: ["Content Strategy", "On-Page SEO", "Off-Page SEO", "Keyword Strategy", "Organic Reach", "Authority Building","SERP Dominance","Content Frameworks"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    approach: "How We Make Your Brand Impossible to Ignore",
    approachDescription: "People don’t buy from “random brands.” They buy from brands they trust, recognize, and believe in. We turn your brand into the authority people choose without hesitation.",
    points: [
      { title: "Authority-Building Content", description: "Long-form content. Short-form social frameworks. Thought leadership.", number: 1 },
      { title: "Search-Dominating SEO", description: " Keyword strategy. SEO blogs. Technical optimization. ", number: 2 },
      { title: "Brand Positioning", description: "Messaging upgrades.  Brand voice development. Differentiation strategy. ", number: 3 }
    ]
  }
];

export default function DigitalMarketingPage() {
  // Work items expanded state
  const [expandedIndex, setExpandedIndex] = React.useState(0);
  const [allExpanded, setAllExpanded] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Badge auto-reset with motion values
  const badgeX = useMotionValue(0);
  const badgeY = useMotionValue(0);
  const [badgeAnimState, setBadgeAnimState] = React.useState({ opacity: 1, scale: 1, rotate: 0 });
  const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Tooltip state
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [shakeEffect, setShakeEffect] = React.useState(false);
  
  // Show tooltip after 5 seconds of page load
  React.useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      
      // Start shake effect after tooltip is shown (500ms delay)
      setTimeout(() => {
        setShakeEffect(true);
        
        // Stop shake effect after animation completes
        setTimeout(() => {
          setShakeEffect(false);
        }, 600);
      }, 500);
      
      // Hide tooltip after 3 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }, 5000);
    
    return () => clearTimeout(tooltipTimer);
  }, []);

  // Handle "View All" button click
  const handleViewAll = () => {
    setAllExpanded(true);
    // Auto-close after 2 minutes
    setTimeout(() => {
      setAllExpanded(false);
      setExpandedIndex(0);
    }, 120000); // 120000ms = 2 minutes
  };

  // Handle scroll to CTA with pointer-events disabled
  const handleScrollToCTA = () => {
    setIsScrolling(true);
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      // Disable all scroll-based animations temporarily
      document.body.style.pointerEvents = 'none';
      
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Re-enable pointer events after scroll completes
      setTimeout(() => {
        setIsScrolling(false);
        document.body.style.pointerEvents = '';
      }, 1500);
    }
  };

  // Sticky scaling text section hooks
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textScale = useTransform(containerProgress, [0, 0.5, 1], [0.1, 1, 1]);
  const sectionHeight = useTransform(containerProgress, [0, 1], ["60vh", "60vh"]);

  // Means section hooks
  const meansContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: meansProgress } = useScroll({
    target: meansContainerRef,
    offset: ["start start", "end start"]
  });

  // Text animations - appear one by one
  const means1Opacity = useTransform(meansProgress, [0, 0.15], [0, 1]);
  const means1Y = useTransform(meansProgress, [0, 0.15], [50, 0]);
  const means2Opacity = useTransform(meansProgress, [0.2, 0.35], [0, 1]);
  const means2Y = useTransform(meansProgress, [0.2, 0.35], [50, 0]);
  const means3Opacity = useTransform(meansProgress, [0.4, 0.55], [0, 1]);
  const means3Y = useTransform(meansProgress, [0.4, 0.55], [50, 0]);
  const means4Opacity = useTransform(meansProgress, [0.6, 0.75], [0, 1]);
  const means4Y = useTransform(meansProgress, [0.6, 0.75], [50, 0]);

  // Circle animations
  const meansCircle1Y = useTransform(meansProgress, [0, 0.15], [0, 0]);
  const meansCircle1Opacity = useTransform(meansProgress, [0, 0.15], [0, 0.8]);
  const meansCircle1X = useTransform(meansProgress, [0, 0.15], [0, 0]);
  const meansCircle2Y = useTransform(meansProgress, [0.2, 0.35], [0, -89]);
  const meansCircle2Opacity = useTransform(meansProgress, [0.2, 0.35], [0, 0.6]);
  const meansCircle2X = useTransform(meansProgress, [0.2, 0.35], [0, 40]);
  const meansCircle3Y = useTransform(meansProgress, [0.4, 0.55], [0, -178]);
  const meansCircle3Opacity = useTransform(meansProgress, [0.4, 0.55], [0, 0.4]);
  const meansCircle3X = useTransform(meansProgress, [0.4, 0.55], [0, 80]);
  const meansCircle4Y = useTransform(meansProgress, [0.6, 0.61], [0, -267]);
  const meansCircle4Opacity = useTransform(meansProgress, [0.6, 0.61], [0, 0.2]);
  const meansCircle4X = useTransform(meansProgress, [0.6, 0.61], [0, 120]);

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative bg-[#DCDCDC] text-black pt-12 md:pt-16 lg:pt-20 pb-0 overflow-hidden rounded-b-[40px] md:rounded-b-[60px] ${isScrolling ? 'pointer-events-none' : ''}`}>
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4 md:mb-6">
            {/* desktop heaidng */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl"
            >
              Your Business Should Be <br />Growing Faster.  <span className='text-[#5919C1] font-normal'>Let’s Fix That.</span>
            </motion.h1>
            {/* mobile heaidng */}
              <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:hidden text-[35px] font-light leading-tight max-w-4xl"
            >
              Your Business Should  <br />Be Growing Faster. <br /> <span className='text-[#5919C1] font-normal'>Let’s Fix That.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-2 max-w-xs md:max-w-md lg:max-w-lg font-light text-left mt-4 md:mt-6 md:ml-16 lg:ml-16"
            >
              <p className="text-xs md:text-sm lg:text-base text-gray-800">
                <TypewriterText text="Most brands don’t need" delay={0.5} />
              </p>
              <p className="text-xs md:text-sm lg:text-base text-gray-800 ">
                <TypewriterText text="more marketing noise" boldText="marketing noise"  delay={1.3} />
              </p>
              <p className="text-xs md:text-sm lg:text-base text-gray-800">
                <TypewriterText text="they need a system that" delay={2.0} />
              </p>
              <p className="text-xs md:text-sm lg:text-base text-gray-800">
                <TypewriterText text="generates revenue on autopilot." delay={2.8} />
              </p>
            </motion.div>
          </div>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            className="mb-16 md:mb-20 lg:mb-24"
          >
            <a
              href="#cta-section"
              className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full font-light transition-all duration-300 overflow-hidden border-2 border-black text-black hover:border-transparent hover:scale-105 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToCTA();
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 transition-colors duration-300">Get Started</span>
              <svg
                className="relative z-10 w-5 h-5 transition-all duration-300 rotate-90 group-hover:rotate-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-3 md:mb-4 max-w-2xl"
          >
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-1">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-light">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-1">
                <AnimatedCounter end={300} suffix="+" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-light">Brands We've Helped</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-1">
                <AnimatedCounter end={50} suffix="K+" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-light">Qualified Leads Generated</div>
            </div>
          </motion.div>

          {/* Image - Inside Container with Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            className="relative w-full px-0 md:px-0 lg:px-0 pb-2 md:pb-6"
          >
            <div className="relative rounded-[60px] md:rounded-[80px] overflow-visible">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Digital Marketing Team"
                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-[60px] md:rounded-[80px]"
              />
              
              {/* Badge Overlay - Desktop: Top Right with hover effect, Mobile: Draggable */}
              <div
                className={`absolute right-6 sm:right-8 md:right-10 lg:right-20 top-4 sm:top-6 md:top-8 lg:top-8 -translate-y-1/2 translate-x-1/2 z-10 ${isScrolling ? 'pointer-events-none' : ''}`}
              >
                {/* Desktop Badge - Hover Effect */}
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 150, damping: 12 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const x = (e.clientX - centerX) * 0.1;
                    const y = (e.clientY - centerY) * 0.1;
                    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0px, 0px)';
                  }}
                  style={{
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] rounded-full animate-spin-slow shadow-2xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl lg:text-7xl font-bold animate-spin-reverse text-white">✱</div>
                    </div>
                    {/* Circular Text Around Border */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <defs>
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text className="text-[5px] lg:text-[5.5px] font-black fill-white tracking-[0.3em]" style={{ fontWeight: '900', strokeWidth: '0.5px', stroke: 'white' }}>
                        <textPath href="#circlePath" startOffset="0%">
                          + Performance + Predictability  +  Profit + Built for ROI 
                        </textPath>
                      </text>
                    </motion.svg>
                  </div>
                </motion.div>

                {/* Mobile Badge - Draggable */}
                <motion.div
                  className="md:hidden cursor-grab active:cursor-grabbing relative"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{
                    ...badgeAnimState,
                    x: shakeEffect ? [0, -3, 3, -3, 3, 0] : 0,
                    y: shakeEffect ? [0, -2, 2, -2, 2, 0] : 0
                  }}
                  transition={{ 
                    opacity: { 
                      duration: badgeAnimState.opacity === 0 ? 0.6 : 0.8, 
                      delay: badgeAnimState.opacity === 1 && badgeAnimState.scale === 1 ? 0.8 : 0,
                      type: "spring", 
                      stiffness: 150, 
                      damping: 12 
                    },
                    scale: { 
                      duration: badgeAnimState.scale === 0 ? 0.6 : 0.8, 
                      delay: badgeAnimState.opacity === 1 && badgeAnimState.scale === 1 ? 0.8 : 0,
                      type: "spring", 
                      stiffness: 150, 
                      damping: 12 
                    },
                    rotate: { 
                      duration: badgeAnimState.rotate === -180 ? 0.6 : 0.8, 
                      delay: badgeAnimState.opacity === 1 && badgeAnimState.scale === 1 ? 0.8 : 0,
                      type: "spring", 
                      stiffness: 150, 
                      damping: 12 
                    }
                  }}
                  drag
                  dragConstraints={{
                    top: -400,
                    left: -280,
                    right: -20,
                    bottom: 280,
                  }}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                  whileDrag={{ scale: 1.15, rotate: 20, boxShadow: "0 30px 60px -15px rgba(89, 25, 193, 0.6)" }}
                  whileTap={{ scale: 0.9 }}
                  style={{ x: badgeX, y: badgeY }}
                  onDragEnd={(event, info) => {
                    // Hide tooltip when dragged
                    setShowTooltip(false);
                    setShakeEffect(false);
                    
                    // Clear any existing timer
                    if (resetTimerRef.current) {
                      clearTimeout(resetTimerRef.current);
                    }
                    
                    // Badge stays at dragged position for 4 seconds
                    resetTimerRef.current = setTimeout(() => {
                      // Then play exit animation
                      setBadgeAnimState({ opacity: 0, scale: 0, rotate: -180 });
                      
                      // Wait for exit animation to complete (400ms - slightly less than animation duration)
                      setTimeout(() => {
                        // Reset position to original (instantly while invisible)
                        badgeX.set(0);
                        badgeY.set(0);
                        
                        // Immediately re-enter from original position
                        setBadgeAnimState({ opacity: 1, scale: 1, rotate: 0 });
                      }, 400);
                    }, 4000);
                  }}
                >
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] rounded-full animate-spin-slow shadow-xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold animate-spin-reverse text-white">✱</div>
                    </div>
                    {/* Circular Text Around Border */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <defs>
                        <path
                          id="circlePath2"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text className="text-[6.3px] font-black fill-white tracking-[0.2em]" style={{ fontWeight: '900', strokeWidth: '0.6px', stroke: 'white' }}>
                        <textPath href="#circlePath2" startOffset="0%">
                          + Performance + Predictability + Profit + Built for ROI 
                        </textPath>
                      </text>
                    </motion.svg>
                  </div>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: showTooltip ? 1 : 0, 
                      y: showTooltip ? 0 : 10 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm whitespace-nowrap pointer-events-none"
                    style={{ display: showTooltip ? 'block' : 'none' }}
                  >
                    Drag me!
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Section with Scaling Text */}
      <div
        ref={containerRef}
        className={isScrolling ? 'pointer-events-none' : ''}
        style={{
          position: 'relative',
          height: '100vh',
          backgroundColor: 'white',
          paddingTop: '10%',
          marginBottom: '-10vh'
        }}
      >
        <motion.section
          style={{
            position: 'sticky',
            top: '13%',
            height: sectionHeight,
            overflow: 'visible',
            zIndex: 1
          }}
          className="flex items-center justify-center px-6 sm:px-8 md:px-[10%] lg:px-[13%]"
        >
          <motion.div
            style={{ scale: textScale }}
            className="text-center w-full font-normal leading-none"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px]">
              Precision data.<br />
              Powerful creative.<br />
              Real growth.
            </h2>
          </motion.div>
        </motion.section>
      </div>

      {/* Our Work Section */}
      <section className={`relative bg-[#ffffff] text-white py-20 md:py-28 lg:py-32 rounded-none md:rounded-[60px] overflow-hidden ${isScrolling ? 'pointer-events-none' : ''}`}>
        {/* Background SVG */}
        <div className="absolute inset-0 w-full px-1 md:px-10 lg:px-10 ">
          <img 
            src="/Background_Website.svg" 
            alt="" 
            className="w-full h-full object-cover opacity-100 rounded-2xl md:rounded-3xl"
          />
        </div>
        <div className="w-full px-4 md:px-12 lg:px-16 xl:container xl:mx-auto relative z-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 mb-16 md:mb-20">
            {/* Left Side - Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#5919C1]"></div>
                <span className="text-sm text-white uppercase tracking-wider">Our services</span>
              </div>
              <h2 className="text-[31.5px] sm:text-4xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                We Don’t Sell Services,
                <br />
                We Build <span className="text-[#5919C1]">Growth Engines</span>
              </h2>
            </motion.div>

            {/* Right Side - Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-md"
            >
              <p className="text-white text-base md:text-lg leading-relaxed">
                If you want more customers, more sales, and revenue you can actually predict, you need one thing: data, funnels, and ads that work together — seamlessly.
                <span className='font-bold'> That’s what we build.</span>

              </p>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleViewAll}
                  disabled={allExpanded}
                  className={`text-md transition-colors duration-300 underline ${
                    allExpanded 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-[#7B3FF2] hover:text-[#5919C1]'
                  }`}
                >
                  {allExpanded ? 'All Expanded' : 'View All'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Work Items List */}
          <div className="space-y-0">
            {workItems.map((item, index) => {
              const isExpanded = allExpanded || expandedIndex === index;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group py-6 md:py-12 cursor-pointer ${index < workItems.length - 1 ? 'border-b border-white/30' : ''}`}
                  onMouseEnter={() => !allExpanded && !isScrolling && setExpandedIndex(index)}
                  onClick={() => {
                    // Mobile click to expand - only one item at a time
                    if (window.innerWidth < 768) {
                      setExpandedIndex(isExpanded && index === expandedIndex ? -1 : index);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                    {/* Left Side - Image, Number, Title & Description */}
                    <div className="md:col-span-7 flex items-start gap-3 md:gap-0 md:group-hover:gap-6 transition-all duration-500">
                      <div className="hidden md:block overflow-hidden w-0 group-hover:w-32 lg:group-hover:w-40 transition-all duration-500 flex-shrink-0">
                        <div className="w-32 h-24 lg:w-40 lg:h-28 rounded-lg bg-gradient-to-br from-[#5919C1] to-[#7B3FF2] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-32 h-24 lg:w-40 lg:h-28 object-cover opacity-80"
                          />
                        </div>
                      </div>

                      {/* Content Container - Number, Title & Description */}
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-start gap-2 md:gap-4 transition-all duration-500">
                        {/* Mobile Layout - Image left, Number + Title + Description right */}
                        <div className="md:hidden flex items-start gap-3 flex-1 min-w-0">
                          {/* Image - small square */}
                          <div className={`overflow-hidden flex-shrink-0 transition-all duration-500 ${
                            isExpanded ? 'w-14 opacity-100' : 'w-0 opacity-0'
                          }`}>
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#5919C1] to-[#7B3FF2] overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-14 h-14 object-cover opacity-80"
                              />
                            </div>
                          </div>
                          
                          {/* Right side - Number, Title, Description */}
                          <div className="flex-1 min-w-0">
                            {/* Number & Title */}
                            <div className="flex items-start gap-3 mb-2">
                              <span className={`text-sm font-light flex-shrink-0 pt-1 transition-colors duration-300 ${
                                isExpanded ? 'text-[#7B3FF2]' : 'text-white'
                              }`}>
                                {item.number}
                              </span>
                              
                              <h3 className="text-white text-2xl font-normal leading-tight flex-1">
                                {item.title}
                              </h3>
                            </div>
                            
                            {/* Description - slides down when expanded, aligned with title */}
                            <div className={`text-white text-sm overflow-hidden transition-all duration-500 pl-7 ${
                              isExpanded ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout - Original */}
                        <span className="hidden md:block text-xs md:text-base font-light text-white group-hover:text-[#7B3FF2] transition-colors duration-300 flex-shrink-0 pt-1">
                          {item.number}
                        </span>

                        {/* Title & Description Container - Desktop */}
                        <div className="hidden md:block flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extralight md:group-hover:text-xl md:group-hover:md:text-2xl md:group-hover:lg:text-3xl transition-all duration-500 leading-tight md:leading-[1.1] lg:leading-[1.1] md:group-hover:leading-normal">
                            {item.title}
                          </h3>

                          {/* Description - Below Title on Hover (desktop) */}
                          <div
                            className="text-white text-base sm:text-lg md:text-xl overflow-hidden transition-all duration-500 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-3"
                          >
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Arrow and Badges in same line */}
                    <div className="md:col-span-5 flex flex-row items-center gap-3 md:gap-6 pl-3 md:pl-0">
                      {/* Scrolling Badges - narrower width */}
                      <div className="flex-1 max-w-[calc(100%-60px)] md:max-w-none md:pl-20 lg:pl-24">
                        <ScrollingBadges badges={item.badges} />
                      </div>

                      {/* Arrow Button */}
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-[#7B3FF2] transition-colors duration-300 flex-shrink-0">
                        <svg
                          className={`w-3 h-3 md:w-6 md:h-6 text-white group-hover:text-[#7B3FF2] transition-all duration-300 ${
                            isExpanded ? 'rotate-0 md:rotate-90 md:group-hover:rotate-0' : 'rotate-90 md:group-hover:rotate-0'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Section */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6 md:pt-8 mt-6 md:mt-8">
                      {/* Left Side - Approach */}
                      <div className="md:col-span-7 space-y-3 pt-6 md:pt-8 border-t border-white w-full md:w-auto" style={{ borderTopWidth: '1px', width: '100%', maxWidth: window.innerWidth < 768 ? '100%' : 'calc(100% + 6rem)' }}>
                        <div>
                          <h4 className="text-lg md:text-2xl font-semibold text-[#7B3FF2] mb-2">{item.approach}</h4>
                          <p className="text-white text-sm md:text-lg leading-relaxed max-w-full md:max-w-md">
                            {item.approachDescription}
                          </p>
                        </div>
                      </div>

                      {/* Right Side - Points */}
                      <div className="md:col-span-5 md:col-start-8 pl-0 md:pl-16 lg:pl-24 space-y-6 md:space-y-8">
                        <div className="pt-6 md:pt-8 border-t border-white inline-block w-full">
                          {item.points.map((point, idx) => (
                            <div key={point.number} className="space-y-3 md:space-y-4 pb-6 md:pb-10 border-b border-white last:border-b-0 last:pb-0" style={{ marginTop: idx > 0 ? '1rem' : '0' }}>
                              <h5 className="text-base md:text-2xl font-light text-white flex items-start justify-between gap-2">
                                <span className="flex items-start gap-2 flex-1">
                                  <span className="text-[#7B3FF2] font-light"></span>
                                  {point.title}
                                </span>
                                <span className="text-xs md:text-sm text-gray-800 flex-shrink-0">[{point.number}]</span>
                              </h5>
                              <div className="flex flex-wrap gap-2 pl-0">
                                {point.description.split('.').filter(d => d.trim()).map((desc, idx) => (
                                  <span key={idx} className="text-white text-xs md:text-md">
                                    <span className="text-[#7B3FF2] mr-1">|</span>
                                    {desc.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>




      {/* Aida Corporation Means Section */}
      <div
        ref={meansContainerRef}
        className={`relative bg-white ${isScrolling ? 'pointer-events-none' : ''} md:h-[300vh]`}
      >
        {/* Mobile: Static layout */}
        <section className="md:hidden py-12 px-6">
          <div className="container mx-auto max-w-[1400px]">
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-normal text-black mb-8">
              How We Work:
            </h2>

            {/* Divider below title */}
            <div className="h-[1px] bg-black/20 mb-8 w-full" />

            {/* Static Items Container - Text with overlapping circles */}
            <div className="space-y-6 relative">
              {/* Overlapping Circles - positioned at top left of first text */}
              <div className="absolute left-0 top-0 h-10">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-[#5919C1] opacity-100 z-40" />
                <div className="absolute left-6 w-10 h-10 rounded-full bg-[#5919C1] opacity-75 z-30" />
                <div className="absolute left-12 w-10 h-10 rounded-full bg-[#5919C1] opacity-50 z-20" />
                <div className="absolute left-18 w-10 h-10 rounded-full bg-[#5919C1] opacity-30 z-10" />
              </div>

              {/* Item 1 - You book a free call */}
              <div className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">You book a free call</h3>
                <div className="h-[1px] bg-black/20 mt-3 w-full" />
              </div>

              {/* Item 2 - We audit everything */}
              <div className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">We audit everything</h3>
                <div className="h-[1px] bg-black/20 mt-3 w-full" />
              </div>

              {/* Item 3 - Get custom growth acceleration plan */}
              <div className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">Get custom growth acceleration plan</h3>
                <div className="h-[1px] bg-black/20 mt-3 w-full" />
              </div>

              {/* Item 4 - You scale, fast. with Button */}
              <div className="flex flex-col items-start gap-4 pl-32">
                <h3 className="text-xl font-normal text-black">You scale, fast.</h3>
                <a
                  href="#cta-section"
                  className="group flex items-center gap-3 bg-[#5919C1] text-white text-sm font-light transition-all hover:bg-white hover:border-2 hover:border-black hover:text-black rounded-full pl-5 pr-8 py-2.5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToCTA();
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#5919C1] group-hover:bg-white border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                    <svg className="w-3 h-3 text-white group-hover:text-black transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <span>Book Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop: Sticky section with animations */}
        <section
          className={`hidden md:block py-12 sm:py-16 md:py-20 pb-24 sm:pb-32 md:pb-40 lg:pb-48 px-4 sm:px-6 bg-white ${isScrolling ? 'pointer-events-none' : ''}`}
          style={{ position: 'sticky', top: 0, zIndex: 5 }}
        >
          <div className="container mx-auto max-w-[1400px]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-8 sm:mb-12 md:mb-16 pl-0 sm:pl-4 md:pl-8">
              How We Work:
            </h2>
            <div className="h-[1px] bg-black/20 mb-8 sm:mb-12 md:mb-16 pl-0 sm:pl-4 md:pl-8 w-full" />
            <div className="space-y-4 sm:space-y-5 md:space-y-6 relative">
              {/* Box 1 - Intelligent Efficiency */}
              <motion.div
                style={{ opacity: means1Opacity, y: means1Y }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{ x: meansCircle1X, y: meansCircle1Y, opacity: meansCircle1Opacity }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">You book a free call</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>
              {/* Box 2 - Uncompromised Data Security */}
              <motion.div
                style={{ opacity: means2Opacity, y: means2Y }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{ x: meansCircle2X, y: meansCircle2Y, opacity: meansCircle2Opacity }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">We audit everything</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>
              {/* Box 3 - Predictable Growth */}
              <motion.div
                style={{ opacity: means3Opacity, y: means3Y }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{ x: meansCircle3X, y: meansCircle3Y, opacity: meansCircle3Opacity }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">Get custom growth acceleration plan</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>
              {/* Box 4 - Enduring Transformation */}
              <motion.div
                style={{ opacity: means4Opacity, y: means4Y }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{ x: meansCircle4X, y: meansCircle4Y, opacity: meansCircle4Opacity }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex items-start justify-between flex-1 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black whitespace-nowrap"> You scale, fast.</h3>
                  </div>
                  <a
                    href="#cta-section"
                    className="group flex items-center gap-3 bg-[#5919C1] text-white text-sm sm:text-base md:text-lg font-light transition-all hover:bg-white hover:border-2 hover:border-black hover:text-black rounded-full pl-6 pr-10 py-3 shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToCTA();
                    }}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#5919C1] group-hover:bg-white border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-black transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <span>Book Now</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section id="cta-section" className="bg-white py-16 md:py-24 border-b border-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Right Section - Video Box (First on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
                {/* Video Background with Blur */}
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover blur-md"
                    style={{ 
                      filter: 'blur(7px)',
                      transform: 'scale(1.1)'
                    }}
                    ref={(video) => {
                      if (video) video.playbackRate = 0.5;
                    }}
                  >
                    <source src="/large.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Dark Overlay for Text Readability */}
                

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 lg:p-12 h-full flex flex-col justify-start">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4">
                    Why Us?
                  </h3>
                  <p className="text-white text-lg md:text-xl leading-relaxed">
                    We don't care about vanity metrics.
                    <br />
                    <span className="font-bold">We care about one thing: your revenue.</span>
                    <br />
                    <br />
                    <br />
                    And everything we build leads to that.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Left Section - CTA Form (Second on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 order-2 lg:order-1 "
            >
              <CTAForm />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
