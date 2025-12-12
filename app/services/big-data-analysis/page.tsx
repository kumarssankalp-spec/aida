'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Big Data Services JSON Data
const bigDataServices = [
  {
    id: 1,
    title: "Feasibility analysis",
    description: "Before you invest, we make sure it's worth it. Our experts validate your ideas through SWOT, cost-benefit, and tech-fit analysis—ensuring every project starts with confidence, not uncertainty. You get clarity, direction, and a roadmap built for ROI, not risk."
  },
  {
    id: 2,
    title: "Product conceptualization and development",
    description: "Have a disruptive idea? We help you bring it to life. From identifying your niche and defining winning features to building a fast, feedback-ready MVP — we help you launch smarter, test faster, and scale confidently."
  },
  {
    id: 3,
    title: "Tech and architecture consulting",
    description: "The right architecture can make or break your data success. We simplify the chaos — choosing what fits best for you. Whether it's microservices, serverless, AWS, or Azure, we design a future-proof, scalable foundation so you never outgrow your tech."
  },
  {
    id: 4,
    title: "Big data development",
    description: "We turn your strategy into working systems. Our team builds powerful ETL pipelines, real-time analytics engines, and scalable data lakes — helping you collect, process, and transform data into immediate business advantage."
  },
  {
    id: 5,
    title: "Data security and compliance",
    description: "Your data is power — we protect it like it's ours. With ISO 27001 standards, full encryption, and GDPR/HIPAA compliance, your data stays safe, legal, and fully under control. Trust without compromise."
  },
  {
    id: 6,
    title: "Data science consulting",
    description: "Move beyond dashboards — predict what's next. From AI and ML model selection to training and validation, we help you uncover insights that guide smarter actions. No hype, just results you can trust."
  },
  {
    id: 7,
    title: "Performance tuning and cost optimization",
    description: "We fix what slows you down — and what drains your budget. From reconfiguring clusters to optimizing your stack, we make your systems faster, leaner, and far more efficient — so every byte and buck works harder for you."
  },
  {
    id: 8,
    title: "Big data integration",
    description: "Make your data talk to everything else. Our integration experts connect your new big data systems with your existing ERP, EHR, or CRM platforms — unifying your business intelligence and unlocking a 360° view of operations."
  },
  {
    id: 9,
    title: "Data quality audit and assurance",
    description: "Data without quality is just noise. We clean, validate, and enrich your data — removing duplicates and inconsistencies — so every decision you make is backed by truth, not guesswork."
  }
];

export default function BigDataPage() {
  const [activePoint, setActivePoint] = useState<number>(1);
  const point1Ref = useRef<HTMLDivElement>(null);
  const point2Ref = useRef<HTMLDivElement>(null);
  const point3Ref = useRef<HTMLDivElement>(null);
  const point4Ref = useRef<HTMLDivElement>(null);
  const point5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    threeScript.async = true;
    document.head.appendChild(threeScript);

    // Load Vanta Waves after Three.js loads
    threeScript.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
      vantaScript.async = true;
      document.head.appendChild(vantaScript);

      // Initialize Vanta after script loads
      vantaScript.onload = () => {
        if ((window as any).VANTA) {
          (window as any).VANTA.WAVES({
            el: "#vanta-services-section",
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x240D39,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 0.50,
            zoom: 1
          });
        }
      };
    };

    return () => {
      // Cleanup on unmount
      if ((window as any).VANTA) {
        const vantaInstance = (window as any).VANTA;
        if (vantaInstance.current) {
          vantaInstance.current.destroy();
        }
      }
    };
  }, []);

  useEffect(() => {
    // Intersection observer for horizontal line trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pointNum = parseInt(entry.target.getAttribute('data-point') || '1');
            setActivePoint(pointNum);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px' // Trigger when element crosses center line
      }
    );

    // Observe all points
    const refs = [point1Ref, point2Ref, point3Ref, point4Ref, point5Ref];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - 6 Grid Boxes (3 columns x 2 rows) */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[30%_62%_8%] md:grid-rows-2 gap-0 border-b border-[#DCDCDC]">
          {/* Top Row */}
          {/* Top Left Box - 30% - EMPTY - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:block bg-white/5 backdrop-blur-sm border-r border-b border-[#DCDCDC] p-8"
          >
          </motion.div>

          {/* Top Middle Box - 65% - TEXT SPLIT */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex px-8 lg:px-12 py-12 lg:py-16 flex-col justify-between border-b border-[#DCDCDC]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight">
              Make Data the <span className='text-[#5919C1]'>Strongest Arm of Your Business</span>
            </h1>
            <p className="text-base md:text-lg text-black/90 font-light self-end max-w-md text-right">
              At AIDA Corporation, we turn data into your competitive edge. From strategy to full-scale analytics ecosystems, we help you make faster, smarter decisions with confidence. The result: sharper foresight, agile operations, and measurable business growth. Don’t just manage data—master it.
            </p>
          </motion.div>

          {/* Top Right Box - 5% - NO DIVIDER */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex bg-white items-center justify-center border-l border-[#DCDCDC]"
          >

          </motion.div>

          {/* Bottom Row */}
          {/* Bottom Left Box - 30% - BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden md:block bg-white/10 backdrop-blur-sm p-0"
          >
            <Link
              href="/get-started?service=Big Data %26 Analysis"
              className="w-full h-full flex items-start justify-between p-8 lg:p-12 text-3xl lg:text-4xl font-medium bg-[#240D39] hover:bg-[#321B79] text-white transition-all"
            >
              <span>Get in touch</span>
              <svg className="w-7 h-7 lg:w-8 lg:h-8 rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Bottom Middle Box - 62% - IMAGE BACKGROUND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:block relative bg-cover bg-center min-h-[300px]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-[#240D39]/20"></div>
          </motion.div>

          {/* Bottom Right Box - 8% - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden md:block relative bg-cover bg-center border-l border-[#DCDCDC] min-h-[300px]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-[#240D39]/20"></div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative z-10 border-b border-[#DCDCDC]">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="px-4 py-8 border-b border-[#DCDCDC]"
          >
            <h1 className="text-3xl sm:text-4xl font-normal mb-4 leading-tight">
              Make Data the Strongest Arm of Your Business
            </h1>
            <p className="text-sm sm:text-base text-black/90 font-light mt-4">
              At AIDA Corporation, we turn data into your competitive edge. From strategy to full-scale analytics ecosystems, we help you make faster, smarter decisions with confidence. The result: sharper foresight, agile operations, and measurable business growth. Don't just manage data—master it.
            </p>
          </motion.div>

          {/* Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-b border-[#DCDCDC]"
          >
            <Link
              href="/get-started?service=Big Data %26 Analysis"
              className="w-full flex items-center justify-between px-4 py-6 text-2xl sm:text-3xl font-medium bg-[#A53A9A] hover:bg-[#321B79] text-white transition-all"
            >
              <span>Get in touch</span>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-cover bg-center h-64 sm:h-80"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section - 8% Left Column + 92% Right Content */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-[8%_92%] gap-0">
          {/* Left Column - 8% */}
          <div className="hidden md:block bg-[#ffffff] border border-[#DCDCDC]">
            {/* Empty decorative column */}
          </div>

          {/* Right Content Area - 92% */}
          <div className="bg-white border-b border-[#DCDCDC]">
            {/* Content Grid Sections */}

            {/* Row 1 - Full Width Text */}
            <div className="py-16 md:py-20 border-b border-[#DCDCDC]">
              <div className="container mx-auto px-12">
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-2xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed font-light"
                >
                  Guaranteed performance, seamless scalability, and measurable efficiency so your focus stays on strategy, not systems.
                </motion.h3>
              </div>
            </div>

            {/* Row 2 - Heading */}
            <div className="py-10 md:py-14 border-b border-[#DCDCDC]">
              <div className="container mx-auto px-12">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-normal text-right ml-auto max-w-4xl"
                >
                  Inside the Data Revolution: What your <span className='text-[#5919C1]'>competitors are already doing</span>
                </motion.h2>
              </div>
            </div>

            {/* Row 3 - 2 Columns Grid (First Row) */}
            <div className="border-b border-[#DCDCDC]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Column 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6 bg-white border-b border-r sm:border-r border-[#DCDCDC] p-8"
                >
                  <div className="shrink-0">
                    <svg className="w-10 h-10 text-[#321B79]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl text-gray-700 mb-3 leading-relaxed">
                      87.9% of organizations have already made data & analytics a top investment priority — because growth today is driven by intelligence, not instinct.
                    </p>
                    <p className="text-sm text-gray-500 underline">
                      Source: Data and AI leadership Survey
                    </p>
                  </div>
                </motion.div>

                {/* Column 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6 bg-white border-b border-[#DCDCDC] p-8"
                >
                  <div className="shrink-0">
                    <svg className="w-10 h-10 text-[#321B79]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl text-gray-700 mb-3 leading-relaxed">
                      The global data analytics market stood at $61.44 billion in 2023 — and is on track to explode beyond $581.34 billion by 2033, growing at a staggering 25.20% CAGR.                    </p>
                    <p className="text-sm text-gray-500 underline">
                      Source: Global NewsWire
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Row 4 - 2 Columns Grid (Second Row) */}
            <div className="border-b border-[#DCDCDC]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Column 1 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6 bg-white border-b sm:border-b-0 border-r sm:border-r border-[#DCDCDC] p-8"
                >
                  <div className="shrink-0">
                    <svg className="w-10 h-10 text-[#321B79]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl text-gray-700 mb-3 leading-relaxed">
                      Companies that have already embedded big data into their core operations report:
                      8% higher revenue
                      10% lower operational costs
                    </p>
                    <p className="text-sm text-gray-500 underline">
                      Source: BARC
                    </p>
                  </div>
                </motion.div>

                {/* Column 2 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6 bg-white border-b sm:border-b-0 border-[#DCDCDC] p-8"
                >
                  <div className="shrink-0">
                    <svg className="w-10 h-10 text-[#321B79]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl text-gray-700 mb-3 leading-relaxed">
                      The top business outcomes of big data adoption reported by decision-makers:
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1.5 mb-3">
                      <li>69% — Better strategic decisions</li>
                      <li>54% — Stronger control over operations</li>
                      <li>52% — Deeper customer understanding</li>
                      <li>47% — Direct cost reductions</li>
                    </ul>
                    <p className="text-sm text-gray-500 underline">
                      Source: BARC
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Combined Section: Heading + Services with Single Vanta Background */}
            <div id="vanta-services-section" className="relative py-16 md:py-24 border-t border-b border-[#DCDCDC] overflow-hidden min-h-screen">
              {/* Vanta waves will be injected here as background */}
              <div className="relative z-10">
                {/* Heading */}
                <div className="container mx-auto px-8 md:px-12">
                  <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-12 md:mb-16 flex justify-end"
                >
                  <div className="max-w-4xl">
                    <motion.h2
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInUp}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-right"
                  >
                    From raw data to real impact — let’s build your competitive edge.
                  </motion.h2>
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-lg md:text-xl text-white/90 font-light text-right"
                  >
                    AIDA Corporation empowers businesses with enterprise-grade intelligence, without the enterprise-level chaos. As your long-term data and AI partner, we handle strategy, engineering, deployment, and optimization — so you move forward with clarity, confidence, and control.
                    </motion.p>
                  </div>
                  </motion.div>
                </div>

                {/* Dynamic Services Rows */}
                <div className="mt-10 md:mt-14">
                  {bigDataServices.map((service) => (
                    <div key={service.id} className="border-t border-white/20 last:border-b">
                      <div className="container mx-auto px-6 md:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-0">
                          <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex items-center justify-start py-6 md:py-8 md:border-r border-white/20"
                          >
                            <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-bold text-white">{service.title}</h3>
                          </motion.div>
                          <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex items-center py-6 md:py-8 pl-6 md:pl-10"
                          >
                            <p className="text-base md:text-lg text-white/90 leading-relaxed">
                              {service.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="">
              {/* Row 1 - Heading on Right (No Background) */}
              <div className="py-8 md:py-10 border-b border-[#DCDCDC] bg-white">
                <div className="container mx-auto px-12 flex justify-end pt-12">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-2xl md:text-3xl lg:text-4xl font-normal text-right max-w-4xl"
                  >
                    Why AIDA is your safe bet <span className='text-[#5919C1]'>for big data success</span>
                  </motion.h2>
                </div>
              </div>

              {/* Row 2 & 3 - Combined with Single Background */}
              <div className="relative border-b border-[#DCDCDC] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/data.svg')",
                    filter: 'blur(10px)',
                    transform: 'scale(1)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/50 "></div>

                {/* Stats Row */}
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0 border-b border-[#DCDCDC] text-white">
                  {/* Stat 1 */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:px-6 md:pl-8 md:pr-10 py-10 md:py-14 border-b border-r lg:border-b-0 lg:border-r border-[#DCDCDC]"
                  >
                    <div className="text-4xl md:text-7xl font-light text-[#935ABB]">10</div>
                    <p className="text-sm md:text-lg font-thin text-left">Years Of Experience</p>
                  </motion.div>

                  {/* Stat 2 */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:px-6 md:pl-8 md:pr-10 py-10 md:py-14 border-b lg:border-b-0 lg:border-r border-[#DCDCDC]"
                  >
                    <div className="text-4xl md:text-7xl font-light text-[#935ABB]">50+</div>
                    <p className="text-sm md:text-lg font-thin text-left">successful big data engineering projects</p>
                  </motion.div>

                  {/* Stat 3 */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:px-6 md:pl-8 md:pr-10 py-10 md:py-14 border-b border-r lg:border-b-0 lg:border-r border-[#DCDCDC]"
                  >
                    <div className="text-4xl md:text-7xl font-light text-[#935ABB]">10</div>
                    <p className="text-sm md:text-lg font-thin text-left">industries served</p>
                  </motion.div>

                  {/* Stat 4 */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:px-6 md:pl-8 md:pr-10 py-10 md:py-14 border-b lg:border-b-0"
                  >
                    <div className="text-4xl md:text-7xl font-light text-[#935ABB]">3K+</div>
                    <p className="text-sm md:text-lg font-thin text-left">experts on board</p>
                  </motion.div>
                </div>

                {/* Icons Row */}
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0 text-white">
                  {/* Item 1 - Clock Icon */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:pl-8 md:pr-10 py-12 md:py-14 border-b border-r lg:border-b-0 border-[#DCDCDC]"
                  >
                    <svg className="w-16 md:w-24 h-16 md:h-24 text-[#935ABB]" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm md:text-lg font-thin text-left">Delivery on time, budget, and scope</p>
                  </motion.div>

                  {/* Item 2 - Tick Icon */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:pl-8 md:pr-10 py-12 md:py-14 border-b lg:border-b-0 lg:border-r border-[#DCDCDC]"
                  >
                    <svg className="w-16 md:w-24 h-16 md:h-24 text-[#935ABB]" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm md:text-lg font-thin text-left">Guidance on selecting stacks that reduce both initial and ongoing maintenance costs</p>
                  </motion.div>

                  {/* Item 3 - Dollar Icon */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:pl-8 md:pr-10 py-12 md:py-14 border-b border-r lg:border-b-0 lg:border-r border-[#DCDCDC]"
                  >
                    <svg className="w-16 md:w-24 h-16 md:h-24 text-[#935ABB]" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm md:text-lg font-thin text-left">Compliance with international regulations</p>
                  </motion.div>

                  {/* Item 4 - ISO Shield Icon */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-start justify-start gap-2 md:gap-4 px-4 md:pl-8 md:pr-10 py-12 md:py-14 border-b lg:border-b-0"
                  >
                    <svg className="w-16 md:w-24 h-16 md:h-24 text-[#935ABB]" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <p className="text-sm md:text-lg font-thin text-left">ISO 27001 certified for strong security measures and high service quality</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Transformative Power Section */}
            <section className="py-20 md:py-28 border-t border-[#DCDCDC]">
              <div className="container mx-auto ">
                {/* Heading Row */}
                <div className="flex justify-end mb-12 md:mb-20 px-6 md:pr-10">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl lg:text-5xl font-normal max-w-3xl text-right"
                  >
                    The transformative power of <span className="text-[#5919C1]">big data consulting in your industry</span>
                  </motion.h2>
                </div>

                {/* Horizontal Line Indicator - Fixed at Center (Invisible) */}
                <div className="fixed left-0 right-0 top-1/2 z-50 pointer-events-none">
                  <div className="w-full h-px bg-transparent"></div>
                </div>

                {/* Industry Points - 5 Rows */}
                <div className="space-y-0">
                  {/* Point 1 - Ecommerce */}
                  <motion.div
                    ref={point1Ref}
                    data-point="1"
                    initial={{ opacity: 1 }}
                    onMouseEnter={() => setActivePoint(1)}
                    className="group relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 right-0 bg-[#240D39] transition-all duration-500 ease-out ${
                        activePoint === 1
                          ? 'top-0 bottom-0'
                          : activePoint > 1
                            ? 'top-0 bottom-full'
                            : 'top-full bottom-0'
                      }`}
                    ></div>
                    <div className="relative z-10 flex flex-col md:grid md:grid-cols-[35%_65%] gap-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 md:py-12 md:pl-12 md:pr-8 transition-colors duration-300">
                        <div className={`text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-300 ${activePoint === 1 ? 'text-white' : 'text-[#240D39]'}`}>01</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal underline decoration-1 underline-offset-8 transition-colors duration-300 ${activePoint === 1 ? 'text-white' : 'text-black'}`}>Ecommerce</h3>
                          <div className="md:hidden flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 1 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                              <svg className={`w-5 h-5 transition-colors duration-300 ${activePoint === 1 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 md:gap-8 p-6 md:py-12 md:pl-8 md:pr-12">
                        <div className="flex-1">
                          <p className={`text-base md:text-lg lg:text-xl mb-4 md:mb-6 transition-colors duration-300 ${activePoint === 1 ? 'text-white' : 'text-gray-700'}`}>Deliver stellar customer experience and support back-office operations.</p>
                          <ul className={`text-sm md:text-base lg:text-lg space-y-1.5 md:space-y-2 transition-colors duration-300 ${activePoint === 1 ? 'text-white/90' : 'text-gray-600'}`}>
                            <li>• Recommendation engines</li>
                            <li>• Loyalty management software</li>
                            <li>• Customer feedback analysis</li>
                            <li>• Dynamic pricing</li>
                            <li>• Demand forecasting</li>
                            <li>• Inventory management</li>
                            <li>• Supply chain optimization</li>
                          </ul>
                        </div>
                        <div className="hidden md:flex items-start">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 1 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                            <svg className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${activePoint === 1 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 2 - Healthcare */}
                  <motion.div
                    ref={point2Ref}
                    data-point="2"
                    initial={{ opacity: 1 }}
                    onMouseEnter={() => setActivePoint(2)}
                    className="group relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 right-0 bg-[#240D39] transition-all duration-500 ease-out ${
                        activePoint === 2
                          ? 'top-0 bottom-0'
                          : activePoint > 2
                            ? 'top-0 bottom-full'
                            : 'top-full bottom-0'
                      }`}
                    ></div>
                    <div className="relative z-10 flex flex-col md:grid md:grid-cols-[35%_65%] gap-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 md:py-12 md:pl-12 md:pr-8 transition-colors duration-300">
                        <div className={`text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-300 ${activePoint === 2 ? 'text-white' : 'text-[#240D39]'}`}>02</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal underline decoration-1 underline-offset-8 transition-colors duration-300 ${activePoint === 2 ? 'text-white' : 'text-black'}`}>Healthcare</h3>
                          <div className="md:hidden flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 2 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                              <svg className={`w-5 h-5 transition-colors duration-300 ${activePoint === 2 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 md:gap-8 p-6 md:py-12 md:pl-8 md:pr-12">
                        <div className="flex-1">
                          <p className={`text-base md:text-lg lg:text-xl mb-4 md:mb-6 transition-colors duration-300 ${activePoint === 2 ? 'text-white' : 'text-gray-700'}`}>Improve health outcomes and facilitate internal processes and care management.</p>
                          <ul className={`text-sm md:text-base lg:text-lg space-y-1.5 md:space-y-2 transition-colors duration-300 ${activePoint === 2 ? 'text-white/90' : 'text-gray-600'}`}>
                            <li>• Image analysis software for diagnostics</li>
                            <li>• ML-based models and algorithms for predicting health outcomes and complications</li>
                            <li>• Clinical decision support systems</li>
                            <li>• Remote patient management solutions</li>
                            <li>• Telehealth</li>
                            <li>• IoT-powered asset management</li>
                          </ul>
                        </div>
                        <div className="hidden md:flex items-start">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 2 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                            <svg className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${activePoint === 2 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 3 - Financial Services */}
                  <motion.div
                    ref={point3Ref}
                    data-point="3"
                    initial={{ opacity: 1 }}
                    onMouseEnter={() => setActivePoint(3)}
                    className="group relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 right-0 bg-[#240D39] transition-all duration-500 ease-out ${
                        activePoint === 3
                          ? 'top-0 bottom-0'
                          : activePoint > 3
                            ? 'top-0 bottom-full'
                            : 'top-full bottom-0'
                      }`}
                    ></div>
                    <div className="relative z-10 flex flex-col md:grid md:grid-cols-[35%_65%] gap-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 md:py-12 md:pl-12 md:pr-8 transition-colors duration-300">
                        <div className={`text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-300 ${activePoint === 3 ? 'text-white' : 'text-[#240D39]'}`}>03</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal underline decoration-1 underline-offset-8 transition-colors duration-300 ${activePoint === 3 ? 'text-white' : 'text-black'}`}>Financial services</h3>
                          <div className="md:hidden flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 3 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                              <svg className={`w-5 h-5 transition-colors duration-300 ${activePoint === 3 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 md:gap-8 p-6 md:py-12 md:pl-8 md:pr-12">
                        <div className="flex-1">
                          <p className={`text-base md:text-lg lg:text-xl mb-4 md:mb-6 transition-colors duration-300 ${activePoint === 3 ? 'text-white' : 'text-gray-700'}`}>Make informed decisions quickly, improve internal processes, and ensure unprecedented data security.</p>
                          <ul className={`text-sm md:text-base lg:text-lg space-y-1.5 md:space-y-2 transition-colors duration-300 ${activePoint === 3 ? 'text-white/90' : 'text-gray-600'}`}>
                            <li>• Real-time fraud detection system</li>
                            <li>• ML-based predictive models and algorithms</li>
                            <li>• Risk management software</li>
                            <li>• Credit scoring</li>
                            <li>• Automated investing</li>
                          </ul>
                        </div>
                        <div className="hidden md:flex items-start">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 3 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                            <svg className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${activePoint === 3 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 4 - Information Technology */}
                  <motion.div
                    ref={point4Ref}
                    data-point="4"
                    initial={{ opacity: 1 }}
                    onMouseEnter={() => setActivePoint(4)}
                    className="group relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 right-0 bg-[#240D39] transition-all duration-500 ease-out ${
                        activePoint === 4
                          ? 'top-0 bottom-0'
                          : activePoint > 4
                            ? 'top-0 bottom-full'
                            : 'top-full bottom-0'
                      }`}
                    ></div>
                    <div className="relative z-10 flex flex-col md:grid md:grid-cols-[35%_65%] gap-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 md:py-12 md:pl-12 md:pr-8 transition-colors duration-300">
                        <div className={`text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-300 ${activePoint === 4 ? 'text-white' : 'text-[#240D39]'}`}>04</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal underline decoration-1 underline-offset-8 transition-colors duration-300 ${activePoint === 4 ? 'text-white' : 'text-black'}`}>Information technology</h3>
                          <div className="md:hidden flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 4 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                              <svg className={`w-5 h-5 transition-colors duration-300 ${activePoint === 4 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 md:gap-8 p-6 md:py-12 md:pl-8 md:pr-12">
                        <div className="flex-1">
                          <p className={`text-base md:text-lg lg:text-xl mb-4 md:mb-6 transition-colors duration-300 ${activePoint === 4 ? 'text-white' : 'text-gray-700'}`}>Create captivating new products or enhance existing ones with big data and AI, while improving IT infrastructure management and streamlining the SDLC.</p>
                          <ul className={`text-sm md:text-base lg:text-lg space-y-1.5 md:space-y-2 transition-colors duration-300 ${activePoint === 4 ? 'text-white/90' : 'text-gray-600'}`}>
                            <li>• Sentiment analysis software</li>
                            <li>• ML-based models for test automation</li>
                            <li>• Real-time monitoring systems</li>
                            <li>• Security and threat detection</li>
                            <li>• Resource consumption planning and optimization</li>
                          </ul>
                        </div>
                        <div className="hidden md:flex items-start">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 4 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                            <svg className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${activePoint === 4 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 5 - Manufacturing */}
                  <motion.div
                    ref={point5Ref}
                    data-point="5"
                    initial={{ opacity: 1 }}
                    onMouseEnter={() => setActivePoint(5)}
                    className="group relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute left-0 right-0 bg-[#240D39] transition-all duration-500 ease-out ${
                        activePoint === 5
                          ? 'top-0 bottom-0'
                          : activePoint > 5
                            ? 'top-0 bottom-full'
                            : 'top-full bottom-0'
                      }`}
                    ></div>
                    <div className="relative z-10 flex flex-col md:grid md:grid-cols-[35%_65%] gap-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 md:py-12 md:pl-12 md:pr-8 transition-colors duration-300">
                        <div className={`text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-300 ${activePoint === 5 ? 'text-white' : 'text-[#240D39]'}`}>05</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-normal underline decoration-1 underline-offset-8 transition-colors duration-300 ${activePoint === 5 ? 'text-white' : 'text-black'}`}>Manufacturing</h3>
                          <div className="md:hidden flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 5 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                              <svg className={`w-5 h-5 transition-colors duration-300 ${activePoint === 5 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 md:gap-8 p-6 md:py-12 md:pl-8 md:pr-12">
                        <div className="flex-1">
                          <p className={`text-base md:text-lg lg:text-xl mb-4 md:mb-6 transition-colors duration-300 ${activePoint === 5 ? 'text-white' : 'text-gray-700'}`}>Improve quality control, implement preventive asset maintenance, and streamline production processes.</p>
                          <ul className={`text-sm md:text-base lg:text-lg space-y-1.5 md:space-y-2 transition-colors duration-300 ${activePoint === 5 ? 'text-white/90' : 'text-gray-600'}`}>
                            <li>• IoT-powered asset management</li>
                            <li>• Production planning</li>
                            <li>• Computer vision-based product quality control</li>
                            <li>• Product defect analysis</li>
                            <li>• Multi-echelon inventory management</li>
                            <li>• Supply chain management software</li>
                            <li>• Supplier evaluation</li>
                          </ul>
                        </div>
                        <div className="hidden md:flex items-start">
                          <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 -rotate-45 ${activePoint === 5 ? 'bg-white rotate-0' : 'bg-[#240D39]'}`}>
                            <svg className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${activePoint === 5 ? 'text-[#240D39]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Key Elements Section */}
            <section className="py-10 bg-white">
              <div className="container mx-auto ">
                <div className="flex justify-end mb-12 md:mb-20 px-6 md:px-32">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal max-w-3xl text-right"
                  >
                    Key elements of <span className="text-[#5919C1]">big data solutions we develop</span>
                  </motion.h2>
                </div>

                <div className="space-y-0">
                  {/* Point 1 - Data storage */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    onMouseEnter={() => setActivePoint(6)}
                    className={`relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer transition-colors duration-300 ${activePoint === 6 || (activePoint < 6 || activePoint > 8) ? 'bg-[#DCDCDC]' : 'bg-white'
                      }`}
                  >
                    <div className="py-6 md:py-8 px-6 flex flex-col gap-4">
                      <div className="flex items-start gap-6">
                        <div className="w-8 h-8 rounded-full bg-[#240D39] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-normal">Data storage</h3>
                      </div>
                      <div className="flex items-start ml-14">
                        <div
                          className={`grid transition-all duration-500 ease-out w-full ${activePoint === 6 || (activePoint < 6 || activePoint > 8) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="text-base md:text-lg font-semibold text-gray-800 space-y-4">
                              <p>
                                At AIDA, our data storage architecture is designed around two powerful components: Data Lakes and Data Warehouses—so your business gets both flexibility and precision.
                                A Data Lake captures raw data exactly as it arrives—structured, semi-structured, or unstructured—making it ideal for experimentation, AI training, and data science exploration. Even imperfect or noisy inputs are preserved for future discovery.
                                A Data Warehouse (DWH), on the other hand, is engineered for decision-making. It stores only clean, validated, and preprocessed data, optimized for fast analytical queries. This ensures that your reports, dashboards, and forecasts are built on trusted, high-quality information.
                              </p>
                              <p>Result: One system for innovation. One source of truth for decisions.</p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 2 - Distributed data processing */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    onMouseEnter={() => setActivePoint(7)}
                    className={`relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer transition-colors duration-300 ${activePoint === 7 ? 'bg-[#DCDCDC]' : 'bg-white'
                      }`}
                  >
                    <div className="py-6 md:py-8 px-6 flex flex-col gap-4">
                      <div className="flex items-start gap-6">
                        <div className="w-8 h-8 rounded-full bg-[#240D39] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-normal">Distributed data processing (batch and real-time processing)</h3>
                      </div>
                      <div className="flex items-start ml-14">
                        <div
                          className={`grid transition-all duration-500 ease-out w-full ${activePoint === 7 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="text-base md:text-lg font-semibold text-gray-800 space-y-4">
                              <p>
                                At AIDA, our ETL/ELT pipelines seamlessly capture, clean, and move massive volumes of data from multiple sources into your big data ecosystem—where it’s transformed into live insights or automated actions.
                                Whether it’s generating performance dashboards or triggering instant alerts (such as notifying a maintenance team when a sensor crosses a critical temperature), our pipelines ensure data never sleeps.
                                We support both:
                                Real-time processing for instant decisions
                                Batch processing for scheduled analytics and reporting
                              </p>
                              <p>Result: Zero data delays. Zero blind spots.</p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Point 3 - Advanced analytics and BI */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    onMouseEnter={() => setActivePoint(8)}
                    className={`relative border-b border-[#DCDCDC] overflow-hidden cursor-pointer transition-colors duration-300 ${activePoint === 8 ? 'bg-[#DCDCDC]' : 'bg-white'
                      }`}
                  >
                    <div className="py-6 md:py-8 px-6 flex flex-col gap-4">
                      <div className="flex items-start gap-6">
                        <div className="w-8 h-8 rounded-full bg-[#240D39] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-normal">Advanced analytics and BI</h3>
                      </div>
                      <div className="flex items-start ml-14">
                        <div
                          className={`grid transition-all duration-500 ease-out w-full ${activePoint === 8 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="text-base md:text-lg font-semibold text-gray-800 space-y-4">
                              <p>
                                AIDA applies AI-driven analytics, machine learning, and data mining to transform raw datasets into business-critical insights, visualized through intuitive BI dashboards built for leadership decision-making.
                              </p>
                              <p>Outcome: Your leadership stops reacting and starts predicting.</p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Technologies */}
            <section className="pt-20 md:pt-28 bg-white">
              <div className="container mx-auto ">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16 px-4"
                >
                  Our tech stack
                </motion.h2>

                <div className="space-y-0">
                  {/* Row 1 - Programming Languages */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b border-[#DCDCDC]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0">
                      <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC] flex items-center">
                        <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Programming languages:</h3>
                      </div>
                      <div className="py-4 px-4 md:py-8 md:px-8 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          {['Python', 'Java', 'Scala', 'R'].map((tech) => (
                            <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Row 2 - AWS */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b border-[#DCDCDC]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0">
                      <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC] flex items-center">
                        <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">AWS:</h3>
                      </div>
                      <div className="py-4 px-4 md:py-8 md:px-8 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          {['Amazon EMR', 'AWS Lambda', 'Amazon S3', 'AWS Glue', 'Amazon Kinesis', 'Amazon DynamoDB', 'Amazon Redshift', 'Amazon QuickSight'].map((tech) => (
                            <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Row 3 - Google */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b border-[#DCDCDC]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0">
                      <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC] flex items-center">
                        <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Google:</h3>
                      </div>
                      <div className="py-4 px-4 md:py-8 md:px-8 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          {['BigQuery', 'Dataproc', 'Dataflow', 'Cloud Storage'].map((tech) => (
                            <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Row 4 - Azure */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b border-[#DCDCDC]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0">
                      <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC] flex items-center">
                        <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Azure:</h3>
                      </div>
                      <div className="py-4 px-4 md:py-8 md:px-8 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          {['Azure HDInsight', 'Azure Data Lake Storage', 'Azure Data Factory', 'Azure Cosmos DB', 'Azure SQL Database'].map((tech) => (
                            <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expandable Content */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b border-[#DCDCDC]"
                  >
                    {/* Expanded Content */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${activePoint === 9 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-0">
                          {/* Distributions */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Distributions:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['Hortonworks', 'Databricks', 'Cloudera'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* ETL tools & frameworks */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">ETL tools & frameworks:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['Informatica', 'Pentaho', 'Talend', 'Apache Camel', 'Spring Batch Integration', 'dbt'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* NoSQL */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">NoSQL:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['MongoDB', 'HBase', 'Cassandra', 'ClickHouse', 'Druid'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* SQL */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">SQL:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['PostgreSQL', 'MariaDB', 'MySQL', 'Oracle', 'Microsoft SQL Server'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Apache projects */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Apache projects:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['HDFS', 'Hive', 'Spark', 'Kafka', 'Pulsar', 'Beam', 'Samza', 'Flink', 'Storm', 'NiFi', 'Airflow'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Analytics & BI tools */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Analytics & BI tools:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['Tableau', 'Microsoft Power BI', 'QlikView', 'ELK', 'Qlik Sense', 'Looker'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Machine learning */}
                          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] gap-0 border-t border-[#DCDCDC]">
                            <div className="py-4 px-4 md:py-8 md:px-8 border-r border-[#DCDCDC]">
                              <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold">Machine learning:</h3>
                            </div>
                            <div className="py-4 px-4 md:py-8 md:px-8 flex flex-wrap gap-2 md:gap-4">
                              {['NumPy', 'scikit-learn', 'TensorFlow', 'PyTorch', 'RStudio', 'pandas', 'Matplotlib', 'caret'].map((tech) => (
                                <span key={tech} className="px-3 py-2 md:px-5 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-base lg:text-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View All / Collapse Button - Always at Bottom */}
                    <div
                      onClick={() => setActivePoint(activePoint === 9 ? 6 : 9)}
                      className="py-4 px-4 md:py-6 md:px-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                    >
                      <button className="text-sm md:text-lg lg:text-xl font-normal text-[#5919C1] underline">
                        {activePoint === 9 ? 'View less' : 'View all'}
                      </button>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#5919C1] flex items-center justify-center">
                        {activePoint === 9 ? (
                          <svg
                            className="w-6 h-6 text-[#5919C1] transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-[#5919C1] transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="relative px-6 py-14 bg-white">
              <div className="container mx-auto max-w-[1400px]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]"
                >
                  {/* Video Background */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                    onEnded={(e) => {
                      const video = e.currentTarget;
                      video.currentTime = 0;
                      video.play();
                    }}
                  >
                    <source src="https://cdn.pixabay.com/video/2023/08/17/176434-855480487_large.mp4" type="video/mp4" />
                  </video>

                  {/* Text at top-left */}
                  <div className="absolute top-0 left-0 p-8 sm:p-12">
                    <h2 className="text-white font-normal leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] max-w-2xl">
                      Transform your data into actionable analytics
                    </h2>
                  </div>

                  {/* Button at bottom-left */}
                  <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                    <Link
                      href="/get-started?service=Big Data %26 Analysis"
                      className="group inline-flex items-center gap-3 bg-white text-black text-lg sm:text-xl md:text-2xl font-light transition-all hover:bg-transparent hover:text-white hover:border-2 hover:border-white border-2 border-transparent rounded-full pl-6 pr-10 py-4"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white group-hover:bg-transparent border-2 border-black group-hover:border-white flex items-center justify-center transition-all">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-white transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <span className="text-black group-hover:text-white">Get Started</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
