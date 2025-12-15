'use client';


import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const circle1X = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const circle1Y = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const circle2X = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const circle2Y = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const circle3X = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const circle3Y = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const circle4X = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const circle4Y = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Design image animation - moves down vertically - starts earlier on mobile
  const designImageX = useTransform(scrollYProgress, [0, 1], [0, 0]); // No horizontal movement
  const designImageY = useTransform(scrollYProgress, [0, 1], [0, 800]); // 800px down - full scroll range

  const containerRef = useRef<HTMLDivElement | null>(null);

  // First animation: Scale text as section enters from bottom to center
  const { scrollYProgress: scaleProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Second animation: Section stays sticky in center while video covers it
  const { scrollYProgress: stickyProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  const sectionHeight = useTransform(scaleProgress, [0, 1], [150, 280]); // Section grows from 150px to 280px (further decreased)
  const textScale = useTransform(scaleProgress, [0, 0.33, 0.66, 1], [0.3, 0.55, 0.8, 1]); // Text scales in 3 stages

  // Video section boxes animation
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start start", "end start"]
  });

  // Box animations - Appear, then stack on Box 1 position, then slide down behind video (no opacity fade)
  // Box 1 - appears first, stays at 10% position
  const box1Rotate = useTransform(videoProgress, [0, 0.2], [0, 0]);
  const box1X = useTransform(videoProgress, [0, 0.2, 0.7, 0.95], [800, 0, 0, 0]); // Slide in from right, stay in place
  const box1Y = useTransform(videoProgress, [0, 0.2, 0.7, 0.95], [0, 0, 0, 700]); // Stay at top:10%, then move down behind video
  const box1Opacity = useTransform(videoProgress, [0, 0.15], [0, 1]); // Only fade in, no fade out

  // Box 2 - appears second at 20%, moves to stack on Box 1 position (10%)
  const box2Rotate = useTransform(videoProgress, [0.15, 0.35], [0, 0]);
  const box2X = useTransform(videoProgress, [0.15, 0.35, 0.65, 0.7, 0.95], [800, 0, 0, 0, 0]); // Move to box1 X position
  const box2Y = useTransform(videoProgress, [0.15, 0.35, 0.65, 0.7, 0.95], [0, 0, 0, 0, 700]); // Move from 20% to 10% (box1 position), then down
  const box2Opacity = useTransform(videoProgress, [0.15, 0.3], [0, 1]); // Only fade in

  // Box 3 - appears third at 30%, moves to stack on Box 1 position (10%)
  const box3Rotate = useTransform(videoProgress, [0.3, 0.5], [0, 0]);
  const box3X = useTransform(videoProgress, [0.3, 0.5, 0.65, 0.7, 0.95], [800, 0, 0, 0, 0]); // Move to box1 X position
  const box3Y = useTransform(videoProgress, [0.3, 0.5, 0.65, 0.7, 0.95], [0, 0, 0, 0, 700]); // Move from 30% to 10% (box1 position), then down
  const box3Opacity = useTransform(videoProgress, [0.3, 0.45], [0, 1]); // Only fade in

  // Box 4 - appears fourth at 40%, moves to stack on Box 1 position (10%)
  const box4Rotate = useTransform(videoProgress, [0.45, 0.65], [0, 0]);
  const box4X = useTransform(videoProgress, [0.45, 0.65, 0.7, 0.95], [800, 0, 0, 0]); // Move to box1 X position
  const box4Y = useTransform(videoProgress, [0.45, 0.65, 0.7, 0.95], [0, 0, 0, 700]); // Move from 40% to 10% (box1 position), then down
  const box4Opacity = useTransform(videoProgress, [0.45, 0.6], [0, 1]); // Only fade in

  // Mobile video cards scroll animations - smoother with extended ranges
  const mobileCard1X = useTransform(videoProgress, [0, 0.2], [100, 0]);
  const mobileCard1Rotate = useTransform(videoProgress, [0, 0.2], [15, 0]);
  const mobileCard1Opacity = useTransform(videoProgress, [0, 0.15], [0, 1]);

  const mobileCard2X = useTransform(videoProgress, [0.1, 0.35], [100, 0]);
  const mobileCard2Rotate = useTransform(videoProgress, [0.1, 0.35], [15, 0]);
  const mobileCard2Opacity = useTransform(videoProgress, [0.1, 0.3], [0, 1]);

  const mobileCard3X = useTransform(videoProgress, [0.25, 0.5], [100, 0]);
  const mobileCard3Rotate = useTransform(videoProgress, [0.25, 0.5], [15, 0]);
  const mobileCard3Opacity = useTransform(videoProgress, [0.25, 0.45], [0, 1]);

  const mobileCard4X = useTransform(videoProgress, [0.4, 0.65], [100, 0]);
  const mobileCard4Rotate = useTransform(videoProgress, [0.4, 0.65], [15, 0]);
  const mobileCard4Opacity = useTransform(videoProgress, [0.4, 0.6], [0, 1]);

  // Aida Corporation Means section animations
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

  // Circle animations - all circles move to same horizontal level and stack/overlap
  const meansCircle1Y = useTransform(meansProgress, [0, 0.15], [0, 0]); // Circle 1 stays at item 1 position
  const meansCircle1Opacity = useTransform(meansProgress, [0, 0.15], [0, 0.8]);
  const meansCircle1X = useTransform(meansProgress, [0, 0.15], [0, 0]);

  const meansCircle2Y = useTransform(meansProgress, [0.2, 0.35], [0, -89]); // Circle 2 moves up to circle 1 level (gap between items)
  const meansCircle2Opacity = useTransform(meansProgress, [0.2, 0.35], [0, 0.6]);
  const meansCircle2X = useTransform(meansProgress, [0.2, 0.35], [0, 40]); // Move 20px to the right (negative because it overlaps)

  const meansCircle3Y = useTransform(meansProgress, [0.4, 0.55], [0, -178]); // Circle 3 moves up to circle 1 level
  const meansCircle3Opacity = useTransform(meansProgress, [0.4, 0.55], [0, 0.4]);
  const meansCircle3X = useTransform(meansProgress, [0.4, 0.55], [0, 80]); // Move 40px to the right

  const meansCircle4Y = useTransform(meansProgress, [0.6, 0.61], [0, -267]); // Circle 4 moves up to circle 1 level - very fast timing
  const meansCircle4Opacity = useTransform(meansProgress, [0.6, 0.61], [0, 0.2]);
  const meansCircle4X = useTransform(meansProgress, [0.6, 0.61], [0, 120]); // Move 60px to the right

  // Values section animations
  const valuesContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesContainerRef,
    offset: ["start end", "end start"] // Track from when section enters viewport
  });

  // Text scaling animation - grows when section scrolls into view (0-20% of section scroll)
  const valuesTextScale = useTransform(valuesProgress, [0, 0.2], [0.5, 1]);
  const valuesTextY = useTransform(valuesProgress, [0, 0.2], [100, 0]); // Moves up from bottom

  // Circle animations - come one by one AFTER text is full size, forming target behind text
  // All circles converge from edges to center and stack (largest at back, smallest at front)

  // Circle 1 (largest - back layer) - from RIGHT EDGE - comes first after text scales
  const valuesCircle1Scale = useTransform(valuesProgress, [0.2, 0.35], [0, 1]);
  const valuesCircle1X = useTransform(valuesProgress, [0.2, 0.35], [800, 0]); // From far right edge

  // Circle 2 (medium - middle layer) - from LEFT EDGE - comes second
  const valuesCircle2Scale = useTransform(valuesProgress, [0.35, 0.5], [0, 1]);
  const valuesCircle2X = useTransform(valuesProgress, [0.35, 0.5], [-800, 0]); // From far left edge

  // Circle 3 (smallest - front layer) - from BOTTOM EDGE - comes last to complete target
  const valuesCircle3Scale = useTransform(valuesProgress, [0.5, 0.65], [0, 1]);
  const valuesCircle3Y = useTransform(valuesProgress, [0.5, 0.65], [600, 0]); // From bottom edge

  // Only circles scroll up after they compile - text stays sticky in place
  const valuesCirclesY = useTransform(valuesProgress, [0.65, 0.85], [0, -900]); // Circles scroll up and disappear

  // About Us section reveals as circles scroll up
  const valuesBox2Opacity = useTransform(valuesProgress, [0.75, 0.85], [0, 1]);

  // Our Journey in Numbers section animations
  const journeyContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyContainerRef,
    offset: ["start end", "end start"]
  });

  // Text scaling animation - grows from 50% to 100% as section enters (0-20% of scroll)
  const journeyTextScale = useTransform(journeyProgress, [0, 0.2], [0.5, 1]);
  // Text fades away when cards cross 50% of screen (smooth fade)
  const journeyTextOpacity = useTransform(journeyProgress, [0.4, 0.65], [1, 0]);

  // Stats cards animation - start AFTER text is fully visible (after 20% scroll)
  // Card 1 - starts first, smooth scroll from bottom to top
  const journeyBox1Opacity = useTransform(journeyProgress, [0.25, 0.35], [0, 1]);
  const journeyBox1Y = useTransform(journeyProgress, [0.25, 0.9], [1200, -1000]);

  // Card 2 - starts after card 1, follows in trail
  const journeyBox2Opacity = useTransform(journeyProgress, [0.3, 0.4], [0, 1]);
  const journeyBox2Y = useTransform(journeyProgress, [0.3, 0.92], [1200, -1000]);

  // Card 3 - starts last, follows card 2 in trail
  const journeyBox3Opacity = useTransform(journeyProgress, [0.35, 0.45], [0, 1]);
  const journeyBox3Y = useTransform(journeyProgress, [0.35, 0.95], [1200, -1000]);

  // Final Section - Video Box Expanding Width
  const finalBoxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: finalBoxProgress } = useScroll({
    target: finalBoxRef,
    offset: ["start end", "end end"]
  });

  // Width expands from 40% to 100% as box scrolls into view - more noticeable expansion
  const finalBoxWidth = useTransform(finalBoxProgress, [0, 0.8], ['40%', '100%']);

  return (
    <main className="bg-white">
      <section ref={heroRef} className="relative px-6 pt-20 pb-15 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            {/* Left Side - Large Text */}
            <motion.div initial="hidden" animate="visible" variants={fadeInLeft}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[130px] leading-[1.1] tracking-tight font-normal whitespace-normal sm:whitespace-nowrap">
                Where Data,<br />
                Technology & <br />
                <span className="text-[#5919C1]">Strategy</span><br />
                <span className="text-[#5919C1]">Converge.</span>
              </h1>
            </motion.div>

            {/* Right Side - Box with Circles */}
            <motion.div variants={fadeInRight} initial="hidden" animate="visible" className="flex items-end justify-end">
              <div className="bg-[#d9d9d9] rounded-2xl p-4 md:p-6 shadow-xl border border-[#DCDCDC] max-w-xl w-full">
                <div className="flex items-start gap-3 md:gap-6">
                  {/* Text on Left */}
                  <div className="flex-1">
                    <p className="text-sm md:text-lg text-[#000000] leading-relaxed font-medium">
                      Try our AI-generated omnichannel dashboard that brings your analytics,
                      deliverables, and communication into one intelligent space.
                    </p>
                  </div>

                  {/* Small Square Box with Circles on Right */}
                  <div className="relative w-20 h-20 md:w-32 md:h-32 bg-linear-to-tr from-[#D4BBEA] via-[#E8D5F5] to-[#FFD4E8] rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
                    {/* Circle 1 - Top Left */}
                    <motion.div
                      style={{ x: circle1X, y: circle1Y, opacity: circleOpacity }}
                      className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full"
                      initial={{ x: 0, y: 0 }}
                    >
                      <div className="w-full h-full bg-[#4a4a4a] opacity-70 rounded-full" />
                    </motion.div>

                    {/* Circle 2 - Top Right */}
                    <motion.div
                      style={{ x: circle2X, y: circle2Y, opacity: circleOpacity }}
                      className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full"
                      initial={{ x: 0, y: 0 }}
                    >
                      <div className="w-full h-full bg-[#4a4a4a] opacity-70 rounded-full" />
                    </motion.div>

                    {/* Circle 3 - Bottom Left */}
                    <motion.div
                      style={{ x: circle3X, y: circle3Y, opacity: circleOpacity }}
                      className="absolute top-[65%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full"
                      initial={{ x: 0, y: 0 }}
                    >
                      <div className="w-full h-full bg-[#4a4a4a] opacity-70 rounded-full" />
                    </motion.div>

                    {/* Circle 4 - Bottom Right */}
                    <motion.div
                      style={{ x: circle4X, y: circle4Y, opacity: circleOpacity }}
                      className="absolute top-[65%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full"
                      initial={{ x: 0, y: 0 }}
                    >
                      <div className="w-full h-full bg-[#4a4a4a] opacity-70 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-[3rem] overflow-hidden border border-white bg-white shadow-2xl"
          >
            {/* Layer 1: Video Background - scrolls normally */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[850px] object-cover relative z-1"
            >
              <source src="https://video.wixstatic.com/video/11062b_164f323661ce4045a0cf93375453524f/1080p/mp4/file.mp4" type="video/mp4" />
            </video>

            {/* Layer 2: Design Image - animated */}
            <motion.div
              style={{ x: designImageX, y: designImageY }}
              className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] max-w-[950px] px-4 sm:px-6 z-2"
            >
              <div className="bg-white/40 backdrop-blur-md rounded-3xl p-2 sm:p-3 shadow-xl border border-white/30">
                <Image
                  src="/My Account.svg"
                  alt="AIDA Design"
                  width={900}
                  height={633}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>

            {/* Layer 3: Invisible box (same size as video) with SVG and button - scrolls normally */}
            <div className="absolute top-0 left-0 w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[850px] z-30 pointer-events-none">
              <div className="relative w-full h-full">
                {/* SVG Background Shape - top left */}
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 160 63.119"
                  className="absolute top-0 left-0 w-[280px] h-28 fill-[#ffffff] pointer-events-auto"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M9.786 53.333C4.38 53.333 0 57.715 0 63.119V0h160a9.786 9.786 0 0 0-9.786 9.786V20.06c0 18.376-14.896 33.272-33.272 33.272z"></path>
                  </g>
                </svg>

                {/* Button - top left */}
                <div className="absolute top-0 left-0 pl-6 pr-8 py-3 pointer-events-auto">
                  <Link
                    href="/get-started"
                    className="group flex items-center gap-3 bg-[#5919C1] text-white text-lg font-light transition-all hover:bg-white hover:border-1 hover:border-black hover:text-black rounded-full pl-6 pr-10 py-3"
                  >
                    {/* Arrow with Circle */}
                    <div className="w-8 h-8 rounded-full bg-[#5919C1] group-hover:bg-white  border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                      <svg
                        className="w-4 h-4 text-white group-hover:text-black transition-all group-hover:-rotate-270"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <span>Get Started</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Section with Scaling Text */}
      <div
        ref={containerRef}
        className="relative bg-white md:h-screen h-[200vh]"
      >
        {/* Mobile: Scaling text animation */}
        <section className="md:hidden flex items-center justify-center px-6 py-12 sticky top-[20%]">
          <motion.div 
            style={{ scale: textScale }}
            className="text-center w-full font-normal leading-tight">
            <h2 className="text-4xl sm:text-5xl">
              Integrated Solutions<br />
              for an Intelligent<br />
              Enterprise
            </h2>
          </motion.div>
        </section>

        {/* Desktop: Sticky section with scaling animation */}
        <motion.section
          style={{
            position: 'sticky',
            top: '13%',
            height: sectionHeight,
            overflow: 'visible',
            zIndex: 1
          }}
          className="hidden md:flex items-center justify-center px-[13%]"
        >
          <motion.div
            style={{ scale: textScale }}
            className="text-center w-full font-normal leading-none"
          >
            <h2 style={{ fontSize: "85px" }}>
              Integrated Solutions<br />
              for an Intelligent<br />
              Enterprise
            </h2>
          </motion.div>
        </motion.section>
      </div>

      {/* New Video Section */}
      <div
        ref={videoContainerRef}
        className="relative bg-white md:h-[300vh] h-[400vh]"
      >
        {/* Mobile: Scroll-animated cards */}
        <section className="md:hidden relative px-6 py-10 h-[400vh]">
          <div className="container mx-auto max-w-[1400px] sticky top-20">
            <div className="relative rounded-[3rem] overflow-hidden border border-white bg-white shadow-2xl min-h-[600px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src="https://video.wixstatic.com/video/11062b_a2f321b297dc45d5ab4faa470fe1c9da/1080p/mp4/file.mp4" type="video/mp4" />
              </video>

              {/* Static Cards - Vertically Stacked on Mobile */}
              <div className="relative flex flex-col gap-6 p-6 py-8">
                {/* Card 1 - Big Data & Analytics */}
                <motion.div 
                  style={{ 
                    x: mobileCard1X, 
                    rotate: mobileCard1Rotate, 
                    opacity: mobileCard1Opacity 
                  }}
                  className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3  shadow-2xl border border-white/50">
                  <h3 className="text-xl font-normal mb-10 text-black">Big Data & Analytics</h3>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="https://video.wixstatic.com/video/11062b_dc8af5fbebe0462f8675ed655a0ed757/480p/mp4/file.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-1/2 right-[10px] -translate-y-1/2 w-11 h-11 rounded-full bg-[#4a4a4a] opacity-65 z-10" />
                      <div className="absolute top-1/2 right-[10px] -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-85 z-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black leading-relaxed">
                        Our analytics frameworks uncover patterns, predict outcomes, and give you a clear picture of what truly drives results. From research and data lakes to advanced analytics and enterprise data management, we help you make decisions based on insight, not instinct.

                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Artificial Intelligence */}
                <motion.div 
                  style={{ 
                    x: mobileCard2X, 
                    rotate: mobileCard2Rotate, 
                    opacity: mobileCard2Opacity 
                  }}
                  className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3  shadow-2xl border border-white/50">
                  <h3 className="text-xl font-normal mb-10 text-black">Artificial Intelligence</h3>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="https://video.wixstatic.com/video/11062b_155feccf8d494b18b70adcd7716b6646/480p/mp4/file.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute top-3 left-2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-65 z-10" />
                      <div className="absolute top-9 left-10 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-85 z-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black leading-relaxed">
                        We design AI systems that think ahead, learn faster, and adapt to your goals. From predictive models and intelligent automation to generative AI tools, we help you cut costs, optimize performance, and unlock new opportunities — all by turning artificial intelligence into real-world advantage.

                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 - Technology Solutions */}
                <motion.div 
                  style={{ 
                    x: mobileCard3X, 
                    rotate: mobileCard3Rotate, 
                    opacity: mobileCard3Opacity 
                  }}
                  className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3  shadow-2xl border border-white/50">
                  <h3 className="text-xl font-normal mb-10 text-black">Technology Solutions</h3>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="https://video.wixstatic.com/video/11062b_11d9088b057144fa88856e13fc0786d3/1080p/mp4/file.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black leading-relaxed">
                        The right technology doesn't just support your business — it accelerates it. We build scalable digital ecosystems using cloud platforms, automation, enterprise portals, and application management systems. With us, your tech evolves with you, empowering efficiency, security, and innovation at every level.

                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 - Digital Marketing */}
                <motion.div 
                  style={{ 
                    x: mobileCard4X, 
                    rotate: mobileCard4Rotate, 
                    opacity: mobileCard4Opacity 
                  }}
                  className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3  shadow-2xl border border-white/50">
                  <h3 className="text-xl font-normal mb-10 text-black">Digital Marketing</h3>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="https://video.wixstatic.com/video/11062b_0516aeea71654bbd850b2b4c31d8e7f9/1080p/mp4/file.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                      <div className="absolute top-[45%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#4a4a4a] opacity-60 z-10" />
                      <div className="absolute top-[35%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#4a4a4a] opacity-55 z-10" />
                      <div className="absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black leading-relaxed">
                        We don't just create campaigns — we craft experiences that resonate and convert. From SEO and content strategy to paid media and social engagement, our digital marketing solutions amplify your brand's voice, drive measurable growth, and connect you with the audiences that matter most in today's digital landscape.

                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop: Sticky section with scroll animations */}
        <section
          className="hidden md:block relative px-6 pb-10"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: '#ffffff'
          }}
        >
          <div className="container mx-auto max-w-[1400px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative rounded-[3rem] overflow-hidden border border-white bg-white shadow-2xl"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[700px] object-cover"
              >
                <source src="https://video.wixstatic.com/video/11062b_a2f321b297dc45d5ab4faa470fe1c9da/1080p/mp4/file.mp4" type="video/mp4" />
              </video>

              {/* Animated Boxes - Box 1 */}
              <motion.div
                style={{
                  x: box1X,
                  y: box1Y,
                  rotate: box1Rotate,
                  opacity: box1Opacity,
                  position: 'absolute',
                  top: '10%',
                  right: '40%',
                  zIndex: 20
                }}
                className="w-[600px] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50"
              >
                <h3 className="text-3xl font-normal mb-36 text-black whitespace-nowrap">Big Data & Analytics</h3>
                <div className="flex gap-6">
                  <div className="relative w-28 h-28 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="https://video.wixstatic.com/video/11062b_dc8af5fbebe0462f8675ed655a0ed757/480p/mp4/file.mp4" type="video/mp4" />
                    </video>
                    {/* Largest circle - bottom layer - centered */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    {/* Medium circle - aligned to right edge of largest */}
                    <div className="absolute top-1/2 right-[15px] -translate-y-1/2 w-16 h-16 rounded-full bg-[#4a4a4a] opacity-65 z-10" />
                    {/* Smallest circle - aligned to right edge of largest */}
                    <div className="absolute top-1/2 right-[15px] -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-85 z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-black leading-relaxed">
                      Our analytics frameworks uncover patterns, predict outcomes, and give you a clear picture of what truly drives results. From research and data lakes to advanced analytics and enterprise data management, we help you make decisions based on insight, not instinct.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Boxes - Box 2 */}
              <motion.div
                style={{
                  x: box2X,
                  y: box2Y,
                  rotate: box2Rotate,
                  opacity: box2Opacity,
                  position: 'absolute',
                  top: '20%',
                  right: '29%',
                  zIndex: 21
                }}
                className="w-[600px] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50"
              >
                <h3 className="text-3xl font-normal mb-36 text-black whitespace-nowrap">Artificial Intelligence</h3>
                <div className="flex gap-6">
                  <div className="relative w-28 h-28 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="https://video.wixstatic.com/video/11062b_155feccf8d494b18b70adcd7716b6646/480p/mp4/file.mp4" type="video/mp4" />
                    </video>
                    {/* Largest circle - top left corner */}
                    <div className="absolute top-4 left-2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    {/* Medium circle - overlapping, moving towards top right */}
                    <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-65 z-10" />
                    {/* Smallest circle - top right area */}
                    <div className="absolute top-12 left-14 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-85 z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-black leading-relaxed">
                      We design AI systems that think ahead, learn faster, and adapt to your goals. From predictive models and intelligent automation to generative AI tools, we help you cut costs, optimize performance, and unlock new opportunities — all by turning artificial intelligence into real-world advantage.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Boxes - Box 3 */}
              <motion.div
                style={{
                  x: box3X,
                  y: box3Y,
                  rotate: box3Rotate,
                  opacity: box3Opacity,
                  position: 'absolute',
                  top: '30%',
                  right: '18%',
                  zIndex: 22
                }}
                className="w-[600px] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50"
              >
                <h3 className="text-3xl font-normal mb-36 text-black whitespace-nowrap">Technology Solutions</h3>
                <div className="flex gap-6">
                  <div className="relative w-28 h-28 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="https://video.wixstatic.com/video/11062b_11d9088b057144fa88856e13fc0786d3/1080p/mp4/file.mp4" type="video/mp4" />
                    </video>
                    {/* Center circle - like flower center */}
                    <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    {/* Top petal */}
                    <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    {/* Right petal */}
                    <div className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    {/* Left petal */}
                    <div className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-black leading-relaxed">
                      The right technology doesn't just support your business — it accelerates it. We build scalable digital ecosystems using cloud platforms, automation, enterprise portals, and application management systems. With us, your tech evolves with you, empowering efficiency, security, and innovation at every level.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Boxes - Box 4 */}
              <motion.div
                style={{
                  x: box4X,
                  y: box4Y,
                  rotate: box4Rotate,
                  opacity: box4Opacity,
                  position: 'absolute',
                  top: '40%',
                  right: '7%',
                  zIndex: 23
                }}
                className="w-[600px] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50"
              >
                <h3 className="text-3xl font-normal mb-36 text-black whitespace-nowrap">Digital Marketing</h3>
                <div className="flex gap-6">
                  <div className="relative w-28 h-28 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="https://video.wixstatic.com/video/11062b_0516aeea71654bbd850b2b4c31d8e7f9/1080p/mp4/file.mp4" type="video/mp4" />
                    </video>
                    {/* Wave pattern - circles forming a wave from left to right */}
                    <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                    <div className="absolute top-[45%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4a4a4a] opacity-60 z-10" />
                    <div className="absolute top-[35%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#4a4a4a] opacity-55 z-10" />
                    <div className="absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#4a4a4a] opacity-50 z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-black leading-relaxed">
                      We don't just create campaigns — we craft experiences that resonate and convert. From SEO and content strategy to paid media and social engagement, our digital marketing solutions amplify your brand's voice, drive measurable growth, and connect you with the audiences that matter most in today's digital landscape.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Aida Corporation Means Section */}
      <div
        ref={meansContainerRef}
        className="relative bg-[#F2F2F2] md:h-[300vh]"
      >
        {/* Mobile: Animated layout */}
        <section className="md:hidden py-12 px-6">
          <div className="container mx-auto max-w-[1400px]">
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-normal text-black mb-8">
              Aida Corporation Means:
            </motion.h2>

            {/* Divider below title */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[1px] bg-black/20 mb-8 w-full origin-left" />

            {/* Animated Items Container - Text with overlapping circles */}
            <div className="space-y-6 relative">
              {/* Overlapping Circles - positioned at top left of first text */}
              <div className="absolute left-0 top-0 h-10 z-50">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
                  className="absolute left-0 w-10 h-10 rounded-full bg-[#5919C1] z-40" />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.4 }}
                  className="absolute left-6 w-10 h-10 rounded-full bg-[#5919C1] z-30" />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.5 }}
                  className="absolute left-12 w-10 h-10 rounded-full bg-[#5919C1] z-20" />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.6 }}
                  className="absolute left-18 w-10 h-10 rounded-full bg-[#5919C1] z-10" />
              </div>

              {/* Item 1 - Intelligent Efficiency */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">Intelligent Efficiency</h3>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="h-[1px] bg-black/20 mt-3 w-full origin-left" />
              </motion.div>

              {/* Item 2 - Uncompromised Data Security */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">Uncompromised Data Security</h3>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="h-[1px] bg-black/20 mt-3 w-full origin-left" />
              </motion.div>

              {/* Item 3 - Predictable Growth */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex flex-col items-start pl-32">
                <h3 className="text-xl font-normal text-black">Predictable Growth</h3>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="h-[1px] bg-black/20 mt-3 w-full origin-left" />
              </motion.div>

              {/* Item 4 - Enduring Transformation with Button */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="flex flex-col items-start gap-4 pl-32">
                <h3 className="text-xl font-normal text-black">Enduring Transformation</h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.5 }}>
                  <Link
                    href="/get-started"
                    className="group flex items-center gap-3 bg-[#5919C1] text-white text-sm font-light transition-all hover:bg-[#F2F2F2] hover:border-2 hover:border-black hover:text-black rounded-full pl-5 pr-8 py-2.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#5919C1] group-hover:bg-[#F2F2F2] border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                      <svg className="w-3 h-3 text-white group-hover:text-black transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <span>Get Started</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Desktop: Sticky section with animations */}
        <section
          className="hidden md:block py-12 sm:py-16 md:py-20 pb-24 sm:pb-32 md:pb-40 lg:pb-48 px-4 sm:px-6"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 5
          }}
        >
          <div className="container mx-auto max-w-[1400px]">
            {/* Sticky Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-8 sm:mb-12 md:mb-16 pl-0 sm:pl-4 md:pl-8">
              Aida Corporation Means:
            </h2>

            {/* Divider below title */}
            <div className="h-[1px] bg-black/20 mb-8 sm:mb-12 md:mb-16 pl-0 sm:pl-4 md:pl-8 w-full" />

            {/* Stacking Items Container */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 relative">
              {/* Box 1 - Intelligent Efficiency */}
              <motion.div
                style={{
                  opacity: means1Opacity,
                  y: means1Y
                }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{
                    x: meansCircle1X,
                    y: meansCircle1Y,
                    opacity: meansCircle1Opacity
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">Intelligent Efficiency</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>

              {/* Box 2 - Uncompromised Data Security */}
              <motion.div
                style={{
                  opacity: means2Opacity,
                  y: means2Y
                }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{
                    x: meansCircle2X,
                    y: meansCircle2Y,
                    opacity: meansCircle2Opacity
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">Uncompromised Data Security</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>

              {/* Box 3 - Predictable Growth */}
              <motion.div
                style={{
                  opacity: means3Opacity,
                  y: means3Y
                }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] justify-between pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{
                    x: meansCircle3X,
                    y: meansCircle3Y,
                    opacity: meansCircle3Opacity
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black">Predictable Growth</h3>
                  <div className="h-[1px] bg-black/20 mt-3 sm:mt-4 w-full" />
                </div>
              </motion.div>

              {/* Box 4 - Enduring Transformation */}
              <motion.div
                style={{
                  opacity: means4Opacity,
                  y: means4Y
                }}
                className="flex items-start gap-[250px] sm:gap-[400px] md:gap-[500px] lg:gap-[700px] pr-8 sm:pr-16 md:pr-24"
              >
                <motion.div
                  style={{
                    x: meansCircle4X,
                    y: meansCircle4Y,
                    opacity: meansCircle4Opacity
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5919C1] shrink-0"
                />
                <div className="flex items-start justify-between flex-1 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-black whitespace-nowrap">Enduring Transformation</h3>
                  </div>
                  <Link
                    href="/get-started"
                    className="group flex items-center gap-3 bg-[#5919C1] text-white text-sm sm:text-base md:text-lg font-light transition-all hover:bg-[#F2F2F2] hover:border-2 hover:border-black hover:text-black rounded-full pl-6 pr-10 py-3 shrink-0"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#5919C1] group-hover:bg-[#F2F2F2] border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-black transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <span>Get Started</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Values Section with Gradient Background */}
      <div
        ref={valuesContainerRef}
        style={{
          position: 'relative',
          height: '600vh',
          background: 'radial-gradient(circle at 94.35% 89.62%, #A53A9A 0%, 29.5%, rgba(165, 58, 154, 0) 59%), radial-gradient(circle at 0% 95%, #C0A6EA 0%, 16.2%, rgba(192, 166, 234, 0) 54%), radial-gradient(circle at 4.58% 15%, #5919C1 0%, 60%, rgba(89, 25, 193, 0) 100%), radial-gradient(circle at 73.33% 17.5%, #FAE34D 0%, 72.7%, rgba(250, 227, 77, 0) 100%), radial-gradient(circle at 48.90% 49.52%, #000000 0%, 100%, rgba(0, 0, 0, 0) 100%)'
        }}
      >
        <section
          className="px-4 sm:px-6"
          style={{
            position: 'sticky',
            top: '40vh',
            minHeight: '20vh',
            zIndex: 5
          }}
        >
          <div className="container mx-auto max-w-[1400px] relative">
            {/* Text - Sticky at 40% from top, stays in place */}
            <motion.div
              style={{ scale: valuesTextScale, y: valuesTextY }}
              className="text-center relative z-10"
            >
              <h2 className="text-white font-normal leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                We are Built on Values.<br />
                Powered by Data. Inspired by<br />
                Creativity.
              </h2>
            </motion.div>

            {/* Circles Container - Scrolls up independently, positioned at 40% from top */}
            <motion.div
              style={{ y: valuesCirclesY }}
              className="absolute top-[20%] -translate-y-1/2 left-0 right-0 min-h-[600px] flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Largest circle - from RIGHT EDGE - BACK layer (z-index 1) */}
                <motion.div
                  className="absolute rounded-full bg-black opacity-20"
                  style={{
                    width: '300px',
                    height: '300px',
                    scale: valuesCircle1Scale,
                    x: valuesCircle1X,
                    zIndex: 1
                  }}
                />

                {/* Medium circle - from LEFT EDGE - MIDDLE layer (z-index 2) - CENTERED */}
                <motion.div
                  className="absolute rounded-full bg-black opacity-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '200px',
                    height: '200px',
                    scale: valuesCircle2Scale,
                    x: valuesCircle2X,
                    zIndex: 2
                  }}
                />

                {/* Small circle - from BOTTOM EDGE - FRONT layer (z-index 3) - CENTERED */}
                <motion.div
                  className="absolute rounded-full bg-black opacity-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '100px',
                    height: '100px',
                    scale: valuesCircle3Scale,
                    y: valuesCircle3Y,
                    zIndex: 3
                  }}
                />
              </div>
            </motion.div>

            {/* BOX 2: About Us Section - Reveals as circles scroll up */}
            <motion.div
              style={{ opacity: valuesBox2Opacity }}
              className="flex justify-end relative z-10 pt-12 sm:pt-12 md:pt-12 pb-12 sm:pb-12 md:pb-12 pr-12 sm:pr-16 md:pr-20"
            >
              {/* About Us - Right aligned */}
              <div className="text-white max-w-lg">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4">About Us</h3>
                <p className="text-base sm:text-lg leading-relaxed mb-6">
                  At AIDA, we merge science with creativity to help organizations grow smarter, faster, and further. From harnessing data to crafting digital experiences that convert, we turn complexity into clarity empowering brands, causes, and campaigns to lead with confidence in a data-driven world.
                </p>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 bg-white text-black text-base sm:text-lg font-light transition-all hover:bg-transparent hover:text-white hover:border-2 hover:border-white border-2 border-transparent rounded-full pl-5 pr-8 py-3"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white group-hover:bg-transparent border-2 border-black group-hover:border-white flex items-center justify-center transition-all">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-white transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <span className="text-black group-hover:text-white">Learn More</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Our Journey in Numbers Section */}
      <div
        ref={journeyContainerRef}
        style={{
          position: 'relative',
          height: '200vh',
          backgroundColor: 'white'
        }}
      >
        <section
          className="px-4 sm:px-6"
          style={{
            position: 'sticky',
            top: 0,
            minHeight: '100vh',
            zIndex: 5
          }}
        >
          <div className="container mx-auto max-w-[1400px] h-screen flex items-center justify-center relative">
            {/* Cell 1: Growing Text - fades out when third card appears */}
            <motion.div
              style={{ scale: journeyTextScale, opacity: journeyTextOpacity }}
              className="text-center relative z-10"
            >
              <h2 className="text-black font-normal leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Our Journey in Numbers
              </h2>
            </motion.div>

            {/* Cell 2: Stats Cards - smaller vertically lengthy cards */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6">
              <div className="flex flex-col -space-y-28 w-full max-w-[280px] sm:max-w-[320px]">
                {/* Card 1 - Years of Experience */}
                <motion.div
                  style={{
                    opacity: journeyBox1Opacity,
                    y: journeyBox1Y
                  }}
                  className="rounded-xl shadow-lg relative overflow-hidden z-10 p-2 bg-[#F2F2F2]"
                >
                  {/* Image background with number in bottom-left corner */}
                  <div
                    className="relative w-full aspect-square rounded-lg overflow-hidden flex items-end justify-start p-4"
                    style={{
                      backgroundImage: 'url(https://static.wixstatic.com/media/c837a6_051bef84d6654301aaa41584c69d714d~mv2.jpeg/v1/fill/w_354,h_354,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-photo-7130555.jpeg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-6xl sm:text-7xl font-thin text-black drop-shadow-2xl">10</span>
                  </div>
                  {/* Text below in white box */}
                  <div className="bg-[#F2F2F2] p-3 sm:p-4 rounded-b-lg">
                    <p className="text-lg sm:text-xl font-normal text-black text-left">
                      Years of <br />
                      Experience
                    </p>
                  </div>
                </motion.div>

                {/* Card 2 - Trusted Clients */}
                <motion.div
                  style={{
                    opacity: journeyBox2Opacity,
                    y: journeyBox2Y
                  }}
                  className="rounded-xl shadow-lg relative overflow-hidden z-10 p-2 bg-[#F2F2F2]"
                >
                  {/* Image background with number in bottom-left corner */}
                  <div
                    className="relative w-full aspect-square rounded-lg overflow-hidden flex items-end justify-start p-4"
                    style={{
                      backgroundImage: 'url(https://static.wixstatic.com/media/11062b_8aafef5ebc5e4265931a40e49e6d25a3~mv2.jpg/v1/fill/w_354,h_354,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Blue%20Gradient.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-5xl sm:text-7xl font-thin text-black drop-shadow-2xl">9K</span>
                  </div>
                  {/* Text below in white box */}
                  <div className="bg-[#F2F2F2] p-3 sm:p-4 rounded-b-lg">
                    <p className="text-lg sm:text-xl font-normal text-black text-left">
                      Trusted <br />
                      Clients
                    </p>
                  </div>
                </motion.div>

                {/* Card 3 - Reports Generated */}
                <motion.div
                  style={{
                    opacity: journeyBox3Opacity,
                    y: journeyBox3Y
                  }}
                  className="rounded-xl shadow-lg relative overflow-hidden z-10 p-2 bg-[#F2F2F2]"
                >
                  {/* Image background with number in bottom-left corner */}
                  <div
                    className="relative w-full aspect-square rounded-lg overflow-hidden flex items-end justify-start p-4"
                    style={{
                      backgroundImage: 'url(https://static.wixstatic.com/media/11062b_07d33276e1f54522af4bd7320f017f8b~mv2.jpg/v1/fill/w_354,h_354,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pastel%20Gradient.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-5xl sm:text-7xl font-thin text-black drop-shadow-2xl">3M</span>
                  </div>
                  {/* Text below in white box */}
                  <div className="bg-[#F2F2F2] p-3 sm:p-4 rounded-b-lg">
                    <p className="text-lg sm:text-xl font-normal text-black text-left">
                      Reports <br />
                      Generated
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final Section - Video Box with Expanding Width on Scroll */}
      <section ref={finalBoxRef} className="relative px-6 py-14 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            style={{ width: finalBoxWidth }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] ml-0"
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
            >
              <source src="https://video.wixstatic.com/video/11062b_164f323661ce4045a0cf93375453524f/1080p/mp4/file.mp4" type="video/mp4" />
            </video>

            {/* Text at top-left */}
            <div className="absolute top-0 left-0 p-8 sm:p-12">
              <h2 className="text-white font-normal leading-tight text-xl sm:text-2xl md:text-3xl max-w-md">
                Get All The Work You Need<br />
                In a Single Platform
              </h2>
            </div>

            {/* Button at bottom-left */}
            <div className="absolute bottom-0 left-0 p-8 sm:p-12">
              <Link
                href="/get-started"
                className="group inline-flex items-center gap-3 bg-white text-black text-base sm:text-lg font-light transition-all hover:bg-transparent hover:text-white hover:border-2 hover:border-white border-2 border-transparent rounded-full pl-5 pr-8 py-3"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white group-hover:bg-transparent border-2 border-black group-hover:border-white flex items-center justify-center transition-all">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-white transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span className="text-black  group-hover:text-white" >Get Started</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}