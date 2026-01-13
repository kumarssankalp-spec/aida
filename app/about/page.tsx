'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { Award, Users, FileBarChart, Eye, Zap, SlidersHorizontal } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      <NumberFlow 
        value={displayValue}
        format={{ useGrouping: false }}
        willChange
        style={{
          fontWeight: '100',
          fontSize: 'inherit',
          color: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    </span>
  );
}

// Process Cards Component with Scroll Tracking
// Process stepper data
const processStepperData = [
  {
    id: 1,
    title: "Strategy",
    description: "We begin by understanding your goals, defining clear objectives, and creating a strategic roadmap that aligns technology with business outcomes.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  },
  {
    id: 2,
    title: "Roadmap",
    description: "Our team develops a detailed execution plan with milestones, timelines, and resource allocation to ensure smooth delivery from start to finish.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
  },
  {
    id: 3,
    title: "Execution",
    description: "Cross-functional teams build fast and iteratively—ensuring every sprint delivers visible progress, measurable outcomes, and production-ready features.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
  {
    id: 4,
    title: "QA",
    description: "Every component undergoes rigorous testing, performance checks, security validation, and real-world simulation to ensure reliability at scale.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    id: 5,
    title: "Reporting",
    description: "We provide continuous insights, analytics, and transparent reporting so you always know where your project stands and what's coming next.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  }
];

function ProcessCards() {
  const stepperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepperRef,
    offset: ["start start", "end end"]
  });

  // Calculate active index based on scroll progress
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, processStepperData.length - 0.01]);

  return (
    <section ref={stepperRef} className="relative bg-white" style={{ height: `${processStepperData.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 md:px-6">
        <div className="container mx-auto max-w-[1400px] w-full">
          {/* Main rounded box container */}
          <div className="bg-gray-100 rounded-[24px] md:rounded-[40px] p-4 md:p-8 lg:p-12 shadow-xl">
            {/* Badge above heading */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-[#5919C1]/10 to-[#A53A9A]/10 backdrop-blur-md border border-[#5919C1]/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#5919C1] animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-gray-800 tracking-wider uppercase">How We Deliver</span>
              </div>
            </div>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-2 md:mb-4"
            >
              Our Operating Process <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5919C1] via-[#A53A9A] to-[#5919C1]">End-to-End</span>
            </motion.h2>

            {/* Subtitle */}
            <p className="text-center text-sm md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 lg:mb-12">
              A clear, repeatable delivery flow designed for speed and quality.
            </p>

            {/* Desktop: Horizontal Cards Grid with Arrows */}
            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 mb-10 lg:mb-12">
              {processStepperData.map((step, index) => {
              const segmentSize = 1 / processStepperData.length;
              const pauseDuration = 0.3;
              const transitionDuration = 0.2;
              
              const stepProgress = useTransform(
                scrollYProgress,
                [
                  index * segmentSize,
                  index * segmentSize + transitionDuration * segmentSize,
                  index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                  (index + 1) * segmentSize
                ],
                [0, 1, 1, 1]
              );

              const cardOpacity = useTransform(stepProgress, [0, 0.5, 1], [0, 1, 1]);
              const cardScale = useTransform(stepProgress, [0, 0.5, 1], [0.9, 1, 1]);
              
              const iconColorProgress = useTransform(
                stepProgress,
                [0, 1],
                [0, 100]
              );
              
              const arrowOpacity = useTransform(
                scrollYProgress,
                [
                  index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                  (index + 1) * segmentSize
                ],
                [0, 1]
              );
              
              const arrowScale = useTransform(
                scrollYProgress,
                [
                  index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                  (index + 1) * segmentSize
                ],
                [0.8, 1]
              );

              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    style={{ opacity: cardOpacity, scale: cardScale }}
                    className="relative"
                  >
                    <div className="bg-white px-4 py-4 rounded-2xl shadow-md border border-gray-200 hover:border-[#5919C1]/30 transition-all duration-300 hover:shadow-lg w-[160px] lg:w-[180px] h-[220px] flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div 
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gray-200 rounded-full" />
                          <motion.div 
                            style={{ height: iconColorProgress }}
                            className="absolute bottom-0 left-0 right-0 bg-[#5919C1] rounded-full"
                          />
                          <div className="relative z-10 text-white">
                            {step.icon}
                          </div>
                        </motion.div>
                        
                        <h3 className="text-base font-semibold text-gray-900 flex-1">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-gray-600 leading-relaxed mt-3">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {index < processStepperData.length - 1 && (
                    <motion.div
                      style={{ opacity: arrowOpacity, scale: arrowScale }}
                      className="mx-2 lg:mx-3 flex-shrink-0 relative"
                    >
                      <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <motion.div
                        style={{ 
                          clipPath: `inset(0 ${useTransform(
                            scrollYProgress,
                            [
                              index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                              (index + 1) * segmentSize
                            ],
                            [100, 0]
                          )}% 0 0)`
                        }}
                        className="absolute inset-0"
                      >
                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-[#5919C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

            {/* Mobile: Stacked tabs + main card layout */}
            <div className="md:hidden mb-8">
              <div className="flex gap-3">
                {/* Left side: Completed tabs */}
                <div className="flex flex-col gap-2 min-w-[80px]">
                  {processStepperData.map((step, index) => {
                    const segmentSize = 1 / processStepperData.length;
                    
                    // Smoother tab appearance with spring-like animation
                    const tabProgress = useTransform(
                      scrollYProgress,
                      [
                        index * segmentSize + segmentSize * 0.3,
                        index * segmentSize + segmentSize * 0.5
                      ],
                      [0, 1]
                    );
                    
                    const tabOpacity = useTransform(tabProgress, [0, 1], [0, 1]);
                    const tabScale = useTransform(tabProgress, [0, 1], [0.8, 1]);
                    const tabX = useTransform(tabProgress, [0, 1], [-20, 0]);
                    
                    // Last item doesn't become a tab
                    if (index === processStepperData.length - 1) return null;
                    
                    return (
                      <motion.div
                        key={`tab-${step.id}`}
                        style={{
                          opacity: tabOpacity,
                          scale: tabScale,
                          x: tabX,
                        }}
                        className="origin-left"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="bg-gradient-to-r from-[#5919C1] to-[#7530BE] rounded-xl p-2.5 flex items-center gap-2 shadow-md">
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-white truncate">{step.title}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right side: Active main card */}
                <div className="flex-1 relative min-h-[280px]">
                  {processStepperData.map((step, index) => {
                    const segmentSize = 1 / processStepperData.length;
                    const isLastItem = index === processStepperData.length - 1;
                    
                    // Smoother visibility transitions
                    const isVisible = useTransform(
                      scrollYProgress,
                      isLastItem 
                        ? [
                            Math.max(0, index * segmentSize - 0.02),
                            index * segmentSize + 0.02,
                            1,
                            1
                          ]
                        : [
                            Math.max(0, index * segmentSize - 0.02),
                            index * segmentSize + 0.02,
                            (index + 1) * segmentSize - 0.02,
                            (index + 1) * segmentSize
                          ],
                      isLastItem ? [0, 1, 1, 1] : [0, 1, 1, 0]
                    );

                    // Smoother Y animation
                    const cardY = useTransform(
                      scrollYProgress,
                      isLastItem
                        ? [
                            index * segmentSize,
                            index * segmentSize + 0.03,
                            1,
                            1
                          ]
                        : [
                            index * segmentSize,
                            index * segmentSize + 0.03,
                            (index + 1) * segmentSize - 0.03,
                            (index + 1) * segmentSize
                          ],
                      isLastItem ? [30, 0, 0, 0] : [30, 0, 0, -30]
                    );

                    // Smoother scale animation
                    const cardScale = useTransform(
                      scrollYProgress,
                      isLastItem
                        ? [
                            index * segmentSize,
                            index * segmentSize + 0.03,
                            1,
                            1
                          ]
                        : [
                            index * segmentSize,
                            index * segmentSize + 0.03,
                            (index + 1) * segmentSize - 0.03,
                            (index + 1) * segmentSize
                          ],
                      isLastItem ? [0.95, 1, 1, 1] : [0.95, 1, 1, 0.95]
                    );

                    const iconColorProgress = useTransform(
                      scrollYProgress,
                      [index * segmentSize, index * segmentSize + segmentSize * 0.4],
                      [0, 100]
                    );

                    return (
                      <motion.div
                        key={`card-${step.id}`}
                        style={{
                          opacity: isVisible,
                          y: cardY,
                          scale: cardScale,
                        }}
                        className="absolute inset-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 h-full flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div 
                              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gray-200 rounded-full" />
                              <motion.div 
                                style={{ height: iconColorProgress }}
                                className="absolute bottom-0 left-0 right-0 bg-[#5919C1] rounded-full"
                              />
                              <div className="relative z-10 text-white">
                                {step.icon}
                              </div>
                            </motion.div>
                            
                            <div>
                              <span className="text-xs text-[#5919C1] font-medium">Step {step.id}</span>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            {step.description}
                          </p>

                          {/* Progress indicator */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                              <span>Progress</span>
                              <span>{step.id} of {processStepperData.length}</span>
                            </div>
                           
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

          {/* What this ensures section */}
          <div className="mt-6 md:mt-10 lg:mt-12">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#5919C1] mb-4 md:mb-6 text-center md:text-left md:ml-32">
              What this ensures:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-[#5919C1] mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700 text-sm md:text-base lg:text-lg">No execution without strategy</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#5919C1] mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700 text-sm md:text-base lg:text-lg">No activity without alignment</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#5919C1] mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700 text-sm md:text-base lg:text-lg">No delivery without quality checks</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#5919C1] mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700 text-sm md:text-base lg:text-lg">No reporting without insights</span>
              </div>
            </div>
            <p className="text-gray-600 text-center mt-4 md:mt-6 italic text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              This process maturity is what allows us to scale output <span className="font-semibold text-[#5919C1]">without losing control.</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// Team Cards Component with horizontal scroll and active state on mobile
const teamMembersData = [
  {
    role: 'Strategy Lead',
    exp: 'Senior Leadership',
    desc: 'Owns vision, roadmap, performance direction, and strategic decisions. Ensures alignment between business goals and execution plans. Works directly with stakeholders to define success metrics and maintain competitive positioning.',
    color: '#5919C1',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    number: '01'
  },
  {
    role: 'Account Manager',
    exp: 'Client Partnership',
    desc: 'Owns communication, timelines, coordination, and delivery consistency. Acts as the single point of contact for all client interactions. Manages expectations and ensures seamless project execution from kickoff to delivery.',
    color: '#A53A9A',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    number: '02'
  },
  {
    role: 'Specialists',
    exp: 'Technical Experts',
    desc: 'Execute within defined scope, SOPs, and QA frameworks. Deep expertise in SEO, AI, Paid Media, and Content Strategy. Apply best practices, leverage cutting-edge tools, and deliver measurable results through proven methodologies.',
    color: '#8B5CF6',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    number: '03'
  }
];

function TeamCards() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer to detect which card is in view
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveCardIndex(index);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6,
        rootMargin: '0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1400px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          {/* Badge above heading */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5919C1]/10 to-[#A53A9A]/10 backdrop-blur-md border border-[#5919C1]/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#5919C1] animate-pulse" />
              <span className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Our Team Structure</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-medium mb-6">
            Senior Strategy. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5919C1] via-[#A53A9A] to-[#5919C1] bg-[length:200%_100%] animate-gradient">Modern Delivery.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            We operate with a clear, accountable org structure, not a talent pool.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Every role is defined, every responsibility is owned, and every outcome is measured.
          </p>
        </motion.div>

        {/* Horizontal scroll container for mobile, grid for desktop */}
        <div 
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
        >
          {teamMembersData.map((member, index) => {
            const isActive = isMobile && activeCardIndex === index;
            
            return (
              <motion.div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`group relative px-5 py-5 rounded-[20px] bg-white border border-gray-200 transition-all duration-500 overflow-hidden min-h-[450px] flex flex-col flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none ${
                  isActive ? 'shadow-[0_20px_60px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.12)]' : 'shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.12)]'
                }`}
                style={{
                  boxShadow: isActive 
                    ? `0 20px 60px ${member.color}30, 0 8px 20px ${member.color}15, 0 0 0 1px ${member.color}20`
                    : `0 10px 40px ${member.color}15, 0 4px 12px ${member.color}08, 0 0 0 1px ${member.color}10`
                }}
              >
                {/* Very big background number - metallic gradient from light to dark */}
                <div 
                  className={`absolute -bottom-28 right-3 text-[180px] font-thin pointer-events-none select-none bg-clip-text text-transparent transition-all duration-500 tracking-tighter ${isActive ? 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]' : 'group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'}`}
                  style={{ 
                    backgroundImage: isActive 
                      ? `linear-gradient(to bottom, ${member.color}FF, ${member.color}90, ${member.color}50)`
                      : `linear-gradient(to bottom, ${member.color}80, ${member.color}30)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.06em'
                  }}
                >
                  {!isActive && (
                    <>
                      <div
                        className="group-hover:hidden"
                        style={{ 
                          backgroundImage: `linear-gradient(to bottom, ${member.color}80, ${member.color}30)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {member.number}
                      </div>
                      <div
                        className="hidden group-hover:block"
                        style={{ 
                          backgroundImage: `linear-gradient(to bottom, ${member.color}FF, ${member.color}90, ${member.color}50)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {member.number}
                      </div>
                    </>
                  )}
                  {isActive && member.number}
                </div>
                
                {/* Top section: Icon, Heading/Subheading, and Arrow */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Icon in circle */}
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg flex-shrink-0 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-6'}`}
                      style={{ 
                        backgroundColor: `${member.color}15`,
                        boxShadow: `0 4px 14px ${member.color}20`
                      }}
                    >
                      <div style={{ color: member.color }}>
                        {member.icon}
                      </div>
                    </div>
                    
                    {/* Heading and Subheading to the right of icon */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-0.5">{member.role}</h3>
                      <p 
                        className="text-xs font-medium uppercase tracking-wider" 
                        style={{ color: member.color }}
                      >
                        {member.exp}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow that rotates on hover/active */}
                  <svg 
                    className={`w-8 h-8 text-gray-900 transition-all duration-500 flex-shrink-0 ${isActive ? 'rotate-0' : 'rotate-320 group-hover:rotate-0 group-hover:text-gray-900'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                
                {/* Description - single paragraph */}
                <p className="text-gray-700 leading-relaxed relative z-10 font-medium flex-grow">
                  {member.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// AIDA Difference Cards data
const aidaDifferenceData = [
  { 
    title: 'Strategy is not delegated', 
    desc: 'Senior-led from day one. Our strategy team consists of seasoned professionals who have been in the industry for decades, ensuring that every decision is backed by experience and expertise.',
    flipped: false
  },
  { 
    title: 'Execution is not opaque', 
    desc: 'Full visibility into work. We believe in complete transparency, providing you with real-time access to project progress, data insights, and performance metrics at every stage.',
    flipped: true
  },
  { 
    title: 'Results are not hidden', 
    desc: 'No vanity metrics. We focus on actual business outcomes and ROI, delivering measurable results that matter to your bottom line, not just impressive-looking numbers. Every insight is actionable.',
    flipped: false
  }
];

// AIDA Difference Cards Component with scroll-triggered active state
function AidaDifferenceCards() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer to detect which card is in view
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveCardIndex(index);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6,
        rootMargin: '0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <>
    <div 
      ref={scrollContainerRef}
      className="flex md:grid md:grid-cols-3 gap-8 mb-6 md:mb-20 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
    >
      {aidaDifferenceData.map((item, index) => {
        const isActive = isMobile && activeCardIndex === index;
        
        return (
          <motion.div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none ${isActive ? 'aida-card-active' : 'group'}`}
          >
            {/* Small card above - Triangle with rounded corners */}
            <div className="-mb-44 relative transition-all duration-500">
              {/* SVG Triangle with rounded corners and shiny border */}
              <svg 
                className="w-full h-48" 
                viewBox="-2 -2 404 196" 
                preserveAspectRatio="none"
                style={{ display: 'block', overflow: 'visible', transform: item.flipped ? 'scaleX(-1)' : 'none' }}
              >
                <defs>
                  {/* Gradient for the fill */}
                  <linearGradient id={`triangleFillActive-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(89, 25, 193, 0.1)" />
                    <stop offset="100%" stopColor="rgba(165, 58, 154, 0.1)" />
                  </linearGradient>
                  
                  {/* Shiny border gradient */}
                  <linearGradient id={`triangleBorderGradientActive-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                  </linearGradient>
                  
                  {/* Glass overlay gradients for hover effect */}
                  <linearGradient id={`triangleGlassOverlay1Active-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
                  </linearGradient>
                  <linearGradient id={`triangleGlassOverlay2Active-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <linearGradient id={`triangleShineActive-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="30%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="70%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id={`triangleGlowActive-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  {/* Dot pattern */}
                  <pattern id={`triangleDots1Active-${index}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="16" cy="16" r="2" fill="rgba(89, 25, 193, 0.4)" />
                  </pattern>
                  <pattern id={`triangleDots2Active-${index}`} x="16" y="16" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="16" cy="16" r="2" fill="rgba(165, 58, 154, 0.3)" />
                  </pattern>
                </defs>
                
                {/* Background fill */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill="#0A0A0A"
                />
                
                {/* Gradient overlay */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleFillActive-${index})`}
                />
                
                {/* Dot patterns */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleDots1Active-${index})`}
                />
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleDots2Active-${index})`}
                />
                
                {/* Glass overlay 1 - subtle base shine */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleGlassOverlay1Active-${index})`}
                  className={`transition-opacity duration-700 ${isActive ? 'opacity-70' : 'opacity-50 group-hover:opacity-70'}`}
                />
                
                {/* Glass overlay 2 - hover/active activated */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleGlassOverlay2Active-${index})`}
                  className={`transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                />
                
                {/* Shine effect - hover/active activated */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill={`url(#triangleShineActive-${index})`}
                  className={`transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                />
                
                {/* Shiny border stroke */}
                <path 
                  d="M25,0 L385,0 C394,0 400,6 400,15 L400,177 C400,186 394,192 385,192 C380,192 15,15 15,15 C6,6 16,0 25,0 Z"
                  fill="none"
                  stroke={`url(#triangleBorderGradientActive-${index})`}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={`transition-all duration-500 ${isActive ? 'stroke-[rgba(255,255,255,0.5)]' : 'group-hover:stroke-[rgba(255,255,255,0.5)]'}`}
                  filter={`url(#triangleGlowActive-${index})`}
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Number badge */}
                <text
                  x={item.flipped ? "370" : "340"}
                  y="35"
                  fill="rgba(255,255,255,0.4)"
                  fontSize="22"
                  fontWeight="300"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  className={`transition-colors duration-500 ${isActive ? 'fill-white/60' : 'group-hover:fill-white/60'}`}
                  style={{ transform: item.flipped ? 'scaleX(-1)' : 'none', transformOrigin: item.flipped ? '370px 35px' : '340px 35px' }}
                >
                  /00{index + 1}
                </text>
              </svg>
            </div>

            {/* Main card */}
            <div className="relative overflow-hidden transition-all duration-500 bg-[#0A0A0A]"
              style={{
                clipPath: `url(#mainCardClipActive-${index})`,
              }}
            >
              {/* SVG for rounded main card clip path */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <clipPath id={`mainCardClipActive-${index}`} clipPathUnits="objectBoundingBox">
                    <path d={item.flipped 
                      ? "M1,0.10 C1,0.06 0.99,0.04 0.96,0.04 L0.08,0.36 Q0,0.40 0,0.46 L0,0.94 Q0,1 0.06,1 L0.94,1 Q1,1 1,0.94 L1,0.10 Z"
                      : "M0,0.10 C0,0.06 0.01,0.04 0.04,0.04 L0.92,0.36 Q1,0.40 1,0.46 L1,0.94 Q1,1 0.94,1 L0.06,1 Q0,1 0,0.94 L0,0.10 Z"
                    } />
                  </clipPath>
                </defs>
              </svg>
              
              {/* Border effect that follows the shape */}
              <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`mainCardBorderGradientActive-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                    </linearGradient>
                    <filter id={`mainCardGlowActive-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="0.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path 
                    d={item.flipped
                      ? "M100,10 C100,6 99,4 96,4 L8,38 Q0,40 0,46 L0,94 Q0,100 6,100 L94,100 Q100,100 100,94 L100,10 Z"
                      : "M0,10 C0,6 1,4 4,4 L92,38 Q100,40 100,46 L100,94 Q100,100 94,100 L6,100 Q0,100 0,94 L0,10 Z"
                    }
                    fill="none"
                    stroke={`url(#mainCardBorderGradientActive-${index})`}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className={`transition-all duration-500 ${isActive ? 'stroke-[rgba(255,255,255,0.5)]' : 'group-hover:stroke-[rgba(255,255,255,0.5)]'}`}
                    filter={`url(#mainCardGlowActive-${index})`}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Unified glass overlay across entire card */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/1 transition-opacity duration-700 z-20 pointer-events-none ${isActive ? 'opacity-70' : 'opacity-50 group-hover:opacity-70'}`} />
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-opacity duration-700 z-20 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              <div className={`absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,white/3_50%,transparent_70%)] transition-opacity duration-700 z-20 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            
              {/* Top Box - Dot Pattern */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#5919C1]/10 to-[#A53A9A]/10">
                {/* Continuous Dot Pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle, rgba(89, 25, 193, 0.4) 2px, transparent 2px)`,
                  backgroundSize: '32px 32px',
                  backgroundPosition: '0 0'
                }} />
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle, rgba(165, 58, 154, 0.3) 2px, transparent 2px)`,
                  backgroundSize: '32px 32px',
                  backgroundPosition: '16px 16px'
                }} />
              </div>

              {/* Bottom Box - Text Content */}
              <div className="relative p-8 pt-6 pb-12 min-h-[200px]">
                {/* Seamless blend to bottom box */}
                <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#0A0A0A]/60 to-[#0A0A0A]" />
                
                {/* Continue dot pattern from top (fading) */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle, rgba(89, 25, 193, 0.4) 2px, transparent 2px)`,
                  backgroundSize: '32px 32px',
                  backgroundPosition: '0 0'
                }} />
                
                {/* Seamless top blend continuation */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
                
                {/* Base gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]" />
                
                {/* Subtle purple tint */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(89,25,193,0.02),transparent_60%)]" />
                
                <div className="relative z-10 pt-24">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <h3 className="text-2xl font-thin text-white text-center">{item.title}</h3>
                    <svg className={`w-6 h-6 text-[#FAE34D] flex-shrink-0 transition-transform duration-500 ${isActive ? 'rotate-0' : 'rotate-320 group-hover:rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed text-center">{item.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
    
    {/* Mobile pagination indicator */}
    {isMobile && (
      <div className="flex justify-center mt-4 md:hidden">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-white font-medium">{activeCardIndex + 1}</span>
          <span className="text-white/50">/</span>
          <span className="text-white/50">{aidaDifferenceData.length}</span>
        </div>
      </div>
    )}
    </>
  );
}

// Dynamic Badge Section with auto-centering SVG paths
function DynamicBadgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [badgePositions, setBadgePositions] = useState<number[]>([]);

  const badges = [
    { label: 'Clarity', icon: Eye, color: '#FAE34D' },
    { label: 'Velocity', icon: Zap, color: '#A53A9A' },
    { label: 'Control', icon: SlidersHorizontal, color: '#8B5CF6' }
  ];

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      const positions = badgeRefs.current.map(badge => {
        if (!badge) return 0;
        const badgeRect = badge.getBoundingClientRect();
        const badgeCenter = badgeRect.left + badgeRect.width / 2 - containerRect.left;
        // Convert to viewBox coordinates (1200 units wide for desktop, 300 for mobile)
        const desktopX = (badgeCenter / containerWidth) * 1200;
        return desktopX;
      });

      setBadgePositions(positions);
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    
    // Recalculate after a short delay to ensure layout is settled
    const timer = setTimeout(calculatePositions, 100);

    return () => {
      window.removeEventListener('resize', calculatePositions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-10 md:py-16">
      {/* SVG for dashed connecting lines - Desktop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid meet" style={{ zIndex: 1 }}>
        <defs>
          <style>
            {`
              @keyframes dashFlowDown {
                0% { stroke-dashoffset: 28; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes dashFlowPath {
                0% { stroke-dashoffset: 56; }
                100% { stroke-dashoffset: 0; }
              }
              .dash-flow-down {
                animation: dashFlowDown 2s linear infinite;
              }
              .dash-flow-path {
                animation: dashFlowPath 3s linear infinite;
              }
            `}
          </style>
        </defs>
        
        {badgePositions.length === 3 && (
          <>
            {/* Branch to Clarity (left) */}
            <path
              d={`M 600 75 L 600 127 Q 600 147 ${badgePositions[0] > 600 ? 620 : 580} 147 L ${badgePositions[0] + 20} 147 Q ${badgePositions[0]} 147 ${badgePositions[0]} 167 L ${badgePositions[0]} 220`}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dash-flow-path"
            />
            
            {/* Branch to Velocity (center) */}
            <path
              d={`M 600 75 L 600 127 Q 600 147 ${badgePositions[1]} 167 L ${badgePositions[1]} 220`}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dash-flow-down"
              style={{ animationDelay: '0.2s' }}
            />
            
            {/* Branch to Control (right) */}
            <path
              d={`M 600 75 L 600 127 Q 600 147 ${badgePositions[2] < 600 ? 580 : 620} 147 L ${badgePositions[2] - 20} 147 Q ${badgePositions[2]} 147 ${badgePositions[2]} 167 L ${badgePositions[2]} 220`}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dash-flow-path"
              style={{ animationDelay: '0.3s' }}
            />
          </>
        )}
      </svg>

      {/* SVG for dashed connecting lines - Mobile */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none md:hidden" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet" style={{ zIndex: 1 }}>
        <defs>
          <style>
            {`
              @keyframes dashFlowDownMobile {
                0% { stroke-dashoffset: 20; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes dashFlowPathMobile {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              .dash-flow-down-mobile {
                animation: dashFlowDownMobile 2s linear infinite;
              }
              .dash-flow-path-mobile {
                animation: dashFlowPathMobile 3s linear infinite;
              }
            `}
          </style>
        </defs>
        
        {/* Branch to Clarity (left) */}
        <path
          d="M 150 45 L 150 80 Q 150 95 140 95 L 85 95 Q 75 95 75 105 L 75 145"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dash-flow-path-mobile"
        />
        
        {/* Branch to Velocity (center) */}
        <path
          d="M 150 45 L 150 80 Q 150 95 150 105 L 150 145"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dash-flow-down-mobile"
          style={{ animationDelay: '0.2s' }}
        />
        
        {/* Branch to Control (right) */}
        <path
          d="M 150 45 L 150 80 Q 150 95 160 95 L 215 95 Q 225 95 225 105 L 225 145"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dash-flow-path-mobile"
          style={{ animationDelay: '0.3s' }}
        />
      </svg>

      {/* Heading Badge with Glass Effect and Moving Gradient */}
      <div className="flex justify-center mb-16 md:mb-20 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#5919C1] via-[#A53A9A] to-[#5919C1] rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient" />
          
          <div className="relative px-4 py-2.5 md:px-8 md:py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(89,25,193,0.3)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h3 className="relative text-base md:text-2xl lg:text-3xl font-medium text-white drop-shadow-lg whitespace-nowrap">
              Built for companies that want
            </h3>
          </div>
        </div>
      </div>

      {/* 3 Small Badges with Lucide Icons */}
      <div className="flex justify-center gap-3 md:gap-8 relative z-10">
        {badges.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex justify-center"
            ref={el => { badgeRefs.current[index] = el; }}
          >
            <div className="group relative">
              <div 
                className="absolute -inset-2 rounded-xl md:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              />
              
              <div className="relative flex flex-col md:flex-row items-center gap-1.5 md:gap-3 px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: item.color }} />
                </div>
                
                <span className="text-xs md:text-lg font-semibold text-white">{item.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-white text-black">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden py-10 ">


        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="lg:-mt-16"
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-9xl font-thin tracking-tight leading-[0.95] mb-8 text-left">
                <span className="block">Aida</span>
                <span className="block">Corporation</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-300/30 backdrop-blur-md border border-white/30 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#5919C1] animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-gray-800 tracking-wide">Where Data, Technology & Strategy Converge</span>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-base md:text-xl lg:text-3xl text-gray-500 max-w-xl leading-relaxed font-light">
                We merge science with creativity to help organizations grow smarter, faster, and further. Transforming complexity into clarity.
              </motion.p>
            </motion.div>

            {/* Right Side - Stats */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="flex flex-col gap-6 ml-auto lg:max-w-md relative w-full"
            >
              {/* "We Are Aida Corp" badge - centered above cards on mobile, left side on desktop */}
              <motion.div 
                variants={fadeInUp}
                className="flex items-center justify-center lg:justify-start gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm z-20 mx-auto lg:mx-0 lg:absolute lg:-left-64 lg:top-1/2 lg:-translate-y-1/2 mb-6 lg:mb-0 relative"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#5919C1]" />
                <span className="text-xs font-medium text-gray-900 tracking-wide whitespace-nowrap">We Are Aida Corp</span>
              </motion.div>

              {/* Mobile curved SVG paths */}
              <svg className="absolute top-12 left-0 w-full h-40 lg:hidden pointer-events-none z-0" viewBox="0 0 400 120" preserveAspectRatio="none">
                {/* Curved line to first card (top left) */}
                <path
                  d="M 200 5 Q 150 40, 120 80"
                  stroke="url(#lineGradientMobile)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  opacity="0.4"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                {/* Curved line to second card (top right) */}
                <path
                  d="M 200 5 Q 250 40, 280 80"
                  stroke="url(#lineGradientMobile)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  opacity="0.4"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                {/* Curved line to third card (bottom center) */}
                <path
                  d="M 200 5 L 200 115"
                  stroke="url(#lineGradientMobile)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  opacity="0.5"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                <defs>
                  <linearGradient id="lineGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5919C1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A53A9A" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Desktop straight lines from badge to cards */}
              <svg className="absolute -left-64 top-0 w-64 h-full hidden lg:block pointer-events-none" style={{ zIndex: 1 }}>
                {/* Line to first card (top) */}
                <line
                  x1="150"
                  y1="50%"
                  x2="256"
                  y2="15%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.4"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                {/* Line to second card (middle) */}
                <line
                  x1="150"
                  y1="50%"
                  x2="256"
                  y2="50%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.5"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                {/* Line to third card (bottom) */}
                <line
                  x1="150"
                  y1="50%"
                  x2="256"
                  y2="85%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.4"
                  style={{
                    animation: 'dashFlow 2s linear infinite'
                  }}
                />
                {/* Gradient definition for lines */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5919C1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A53A9A" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Stats Cards Container - triangle layout on mobile, vertical stack on desktop */}
              <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-6 relative z-10">
              {[
                { 
                  number: 10, 
                  suffix: '',
                  label: 'Years Experience',
                  icon: <Award className="w-20 h-20" />
                },
                { 
                  number: 9, 
                  suffix: 'K',
                  label: 'Trusted Clients',
                  icon: <Users className="w-20 h-20" />
                },
                { 
                  number: 3, 
                  suffix: 'M',
                  label: 'Reports Generated',
                  icon: <FileBarChart className="w-20 h-20" />
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className={`group relative bg-gradient-to-br from-[#5919C1] to-[#7B3FA8] rounded-[20px] lg:rounded-[28px] shadow-[0_20px_60px_rgba(89,25,193,0.25)] hover:shadow-[0_30px_80px_rgba(89,25,193,0.35)] transition-all duration-500 p-5 lg:p-8 overflow-hidden border border-white/10 ${index === 2 ? 'col-span-2 max-w-[calc(50%-6px)] lg:max-w-none mx-auto lg:mx-0' : ''}`}
                >
                  {/* Glossy overlay - top highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent opacity-80" />
                  
                  {/* Glossy shine effect */}
                  <div className="absolute -inset-px bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50 rounded-[20px] lg:rounded-[28px]" />
                  
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon - positioned at top right, fully visible */}
                  <div className="absolute top-3 right-3 lg:top-4 lg:right-4 text-white/30 group-hover:text-white/50 transition-all duration-500">
                    {React.cloneElement(stat.icon, { className: 'w-8 h-8 lg:w-12 lg:h-12' })}
                  </div>
                  
                  <div className="relative z-10 pr-12 lg:pr-16">
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-thin text-white mb-2 lg:mb-3 flex items-baseline gap-0.5 drop-shadow-lg">
                      <AnimatedNumber value={stat.number} />
                      <span className="font-thin">{stat.suffix}+</span>
                    </div>
                    {/* Label badge below number */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[9px] lg:text-[10px] font-semibold text-white tracking-wider uppercase">{stat.label}</span>
                    </div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-all duration-500" />
                </motion.div>
              ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Why Clients Switch (Dark Section) */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white rounded-[40px] mx-4 md:mx-8 mt-16 md:mt-24">

         {/* Grainy/noise overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />

        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            {/* Glossy Metallic Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#FAE34D] animate-pulse" />
                <span className="text-sm font-semibold text-white/90 tracking-wider uppercase">The AIDA Difference</span>
              </div>
            </div>
            
            {/* Color Revealing Heading */}
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              <span className="relative inline-flex items-center flex-wrap justify-center">
                Why Clients<span className="ml-3 relative inline-block overflow-hidden">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5919C1] via-[#A53A9A] to-[#5919C1] bg-[length:200%_100%] animate-gradient">
                    Switch to Us
                  </span>
                </span>
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Unlike large agencies that sell strategy and deliver junior execution, we operate with senior ownership, transparent reporting, and lean delivery.
            </p>
          </motion.div>

          <AidaDifferenceCards />

          <DynamicBadgeSection />
        </div>
      </section>

      {/* Team Structure */}
      <TeamCards />

      {/* Process Section - Progressive Light Up on Scroll */}
      <ProcessCards />

      {/* Global Delivery & Follow the Sun */}
      <section className="py-24 px-6 rounded-[40px] mx-4 md:mx-8 mt-16 md:mt-24 relative overflow-hidden bg-black">
        {/* Animated gradient balls - smaller and vertical movement */}
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] rounded-full bg-gradient-to-br from-[#5919C1] via-[#6B2FB8] to-[#8D45B5] blur-[80px] animate-float-vertical" />
        <div className="absolute bottom-0 right-1/3 w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-[#7530BE] via-[#5919C1] to-[#A53A9A] blur-[70px] animate-float-vertical-reverse" />
        
        {/* Grainy/noise overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        
        {/* Content layer */}
        <div className="container mx-auto max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-white border border-white/30">
                Global Delivery
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
                Follow-the-Sun <br />
                <span className="text-[#FAE34D]">Execution</span>
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Work progresses across time zones—so campaigns, content, and optimizations move forward continuously. Speed is a strategic advantage.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Eliminating idle time',
                  'Faster iteration cycles',
                  'Shorter feedback loops',
                  'Continuous progress'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FAE34D] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#5919C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Minimal Diagram */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                {/* Outer rotating ring with dot */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin-very-slow">
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#FAE34D] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#FAE34D] z-10" />
                </div>
                
                {/* Middle rotating ring with dot (opposite direction) */}
                <div className="absolute inset-6 rounded-full border border-white/20 animate-spin-reverse">
                  <div className="absolute bottom-0 left-1/2 w-2.5 h-2.5 bg-white/80 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.6)] z-10" />
                </div>
                
                {/* Inner circle with glow */}
                <div className="absolute inset-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_60px_rgba(250,227,77,0.3)]" />
                
                {/* Center sun icon with pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FAE34D] to-[#FFC837] flex items-center justify-center shadow-[0_0_40px_rgba(250,227,77,0.6)] animate-pulse-slow">
                    <svg className="w-10 h-10 text-[#5919C1]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  </div>
                </div>
                
                {/* Orbiting time zone indicators with animation - highest z-index */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 animate-bounce-slow z-20">
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg border border-white/40">
                    UTC+8
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 animate-bounce-slow z-20" style={{ animationDelay: '0.5s' }}>
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg border border-white/40">
                    UTC-5
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 animate-bounce-slow z-20" style={{ animationDelay: '1s' }}>
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg border border-white/40">
                    UTC+0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Trust */}
      {/* Governance Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-[#5919C1]/5 rounded-full text-sm font-medium mb-6 text-[#5919C1] border border-[#5919C1]/10">
              Governance
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900">
              How Clients Stay in <span className="text-[#5919C1]">Control</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trust is built through structure, cadence, and visibility.
            </p>
          </div>

          {/* Governance Artifacts */}
          <div className="mb-20">
            <h3 className="text-xl font-medium text-gray-900 mb-8 text-center">
              Governance Artifacts We Use With Every Client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { period: 'Weekly', desc: 'Execution updates' },
                { period: 'Monthly', desc: 'Strategy & performance reviews' },
                { period: 'Quarterly', desc: 'Planning & roadmap resets' }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#5919C1]/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#5919C1] text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">{item.period}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-8 italic">
              This ensures alignment at every level—tactical, strategic, and long-term.
            </p>
          </div>

          {/* Live Dashboards */}
          <div className="bg-gray-50 rounded-[32px] p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                  Live Dashboards = <span className="text-[#5919C1]">Built-In Trust</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Clients get access to live KPI dashboards tied to agreed success metrics.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Real-time visibility',
                    'No black-box reporting',
                    'Clear ROI tracking',
                    'Data-backed decisions'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#5919C1] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[#5919C1] font-medium">
                  Transparency is not a feature—it's a default.
                </p>
              </div>
              
              {/* Dashboard Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-gray-900">Performance Dashboard</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live
                  </span>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">ROI</span>
                      <span className="font-semibold text-green-600">+127%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-[#5919C1] to-[#A53A9A] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Conversion Rate</span>
                      <span className="font-semibold text-green-600">+4.2%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-gradient-to-r from-[#A53A9A] to-[#5919C1] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Lead Quality</span>
                      <span className="font-semibold text-green-600">+89%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-gradient-to-r from-[#5919C1] to-[#7530BE] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Pillars */}
          <div className="mb-20">
            <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">
              Our Trust Pillars
            </h3>
            <p className="text-center text-[#5919C1] font-medium mb-8">(Non-Negotiable)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Senior-led strategy (10+ years)',
                'US-aligned reporting',
                'Weekly performance calls',
                'Clear KPIs and ROI tracking',
                'Live dashboards for visibility',
                'No long-term lock-ins'
              ].map((pillar, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#5919C1]/30 hover:shadow-md transition-all duration-300">
                  <svg className="w-5 h-5 text-[#5919C1] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{pillar}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-8 italic">
              Clients stay because we perform—not because they're locked in.
            </p>
          </div>

          {/* Built for Accountability */}
          <div className="bg-black rounded-[32px] p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Built for <span className="text-[#FAE34D]">Accountability</span>, Not Agency Optics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Traditional agencies optimize for</p>
                <div className="space-y-3">
                  {['Long contracts', 'Large teams', 'Slow cycles'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#FAE34D] text-sm uppercase tracking-wider mb-4">We optimize for</p>
                <div className="space-y-3">
                  {['Outcomes', 'Speed', 'Transparency', 'Senior ownership'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#FAE34D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-8 italic">
              That's the difference.
            </p>
          </div>
        </div>
      </section> 
      
      
      {/* CTA Section */}
       <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-[4rem] overflow-hidden"
          >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://cdn.pixabay.com/video/2023/08/17/176434-855480487_large.mp4" type="video/mp4" />
              </video>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-16 px-8 md:px-16">
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-xl text-white/90">
                    Let's discuss how AIDA Corporation can help you unlock new opportunities with data-driven solutions.
                  </p>
                </div>
                <div>
                  <Link 
                    href="/get-started" 
                    className="group relative inline-flex items-center gap-4 px-8 py-5 border-2 border-white rounded-[2rem] text-white font-medium text-lg transition-all duration-300 hover:text-[#5919C1] hover:border-white overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"></span>
                    <span className="relative z-10">Get Started</span>
                    <svg
                      className="relative z-10 w-6 h-6 transition-all duration-300 group-hover:rotate-330 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}