'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tech1Data = [
  {
    id: 1,
    title: "AI & ML Techniques",
    techs: ["NLP, LLMs, RAG systems", "Computer Vision", "Predictive Modelling", "Deep Learning Architecture"]
  },
  {
    id: 2,
    title: "Engineering + Infrastructure",
    techs: ["Data Engineering Pipelines", "Model Deployment (cloud + edge)", "Vector Databases", "Data Engineering Pipeline"]
  },
  {
    id: 3,
    title: "Tools & Frameworks",
    techs: ["LangChain, LlamaIndex", "Kubernetes, Airflow, MLflow", "AWS / GCP / Azure AI services", "PyTorch, TensorFlow, JAX"]
  }
];

const techData = [
  {
    id: 1,
    title: "AI Techniques & Model Architectures",
    description: "The intelligence we engineer — from prediction to perception.",
    techs: [
      "LLMs, NLP, RAG systems",
      "Deep Learning, CNNs, Transformers",
      "Predictive Modelling",
      "Time-series forecasting",
      "Reinforcement Learning",
      "Multi-modal intelligence (text, vision, audio, structured data)"
    ]
  },
  {
    id: 2,
    title: "Data & Infrastructure Engineering",
    description: "The backbone that powers secure, scalable, always-on AI.",
    techs: [
      "MLOps (CI/CD for ML, drift monitoring, retraining automation)",
      "Data engineering pipelines & ETL",
      "Cloud and edge deployment",
      "Vector database architecture",
      "Distributed compute orchestration",
      "GPU-accelerated environments"
    ]
  },
  {
    id: 3,
    title: "Tools & Frameworks",
    description: "The world-class stack we build on to deliver production-ready AI.",
    techs: [
      "PyTorch, TensorFlow, JAX",
      "MLflow, Airflow",
      "LangChain, LlamaIndex",
      "OpenAI, Claude, Gemini APIs",
      "KServe, ONNX Runtime",
      "AWS / GCP / Azure AI services"
    ]
  },
  {
    id: 4,
    title: "Platforms & Runtime Systems",
    description: "How our AI stays flawless in mission-critical environments.",
    techs: [
      "Kubernetes for scalable model serving",
      "Serverless runtimes for low-latency inference",
      "Containerised deployments (Docker + K8s)",
      "High-availability API gateways",
      "Monitoring, logging & observability stacks",
      "Secure IAM, governance & role-based access"
    ]
  }
];

export default function AIPage() {
  const [currentTech, setCurrentTech] = useState(0);
  const [progress] = useState(90);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [hasPreExpanded, setHasPreExpanded] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const scrollToService = (index: number) => {
    setExpandedService(index);
    setTimeout(() => {
      const element = document.getElementById(`service-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Pre-expand first item on mount to initialize Vanta height
  useEffect(() => {
    if (!hasPreExpanded) {
      setExpandedService(0);
      setTimeout(() => {
        setExpandedService(null);
        setHasPreExpanded(true);
      }, 500);
    }
  }, [hasPreExpanded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      // Load Three.js first, then Vanta
      import('three').then((THREE) => {
        // Make THREE available globally for Vanta
        (window as any).THREE = THREE;

        return import('vanta/dist/vanta.cells.min');
      }).then((VANTA) => {
        vantaEffect.current = VANTA.default({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          color1: 0x3d3a3d,
          color2: 0x691cd4,
          size: 2.00,
          speed: 0.50
        });
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // Resize Vanta when content changes - use ResizeObserver for real-time updates
  useEffect(() => {
    const section = document.querySelector('#services-section');
    if (!section || !vantaRef.current) return;

    const updateVantaHeight = () => {
      if (vantaRef.current && section) {
        const contentHeight = section.scrollHeight;
        vantaRef.current.style.height = `${contentHeight}px`;

        if (vantaEffect.current && vantaEffect.current.resize) {
          vantaEffect.current.resize();
        }
      }
    };

    // Create ResizeObserver to watch for section height changes
    const resizeObserver = new ResizeObserver(() => {
      updateVantaHeight();
    });

    resizeObserver.observe(section);

    // Also update immediately
    updateVantaHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [expandedService]);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen w-full bg-white overflow-visible flex items-center justify-center py-10 px-4 pb-10 md:pb-24 md:h-screen">
        {/* Video Box - Behind middle card on mobile, same position on desktop */}
        <div className="absolute md:relative w-full max-w-4xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto block transform rotate-220"
            style={{ maxHeight: '800px' }}
          >
            <source src="/aibg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Container - Grid with text and boxes */}
        <div className="relative md:absolute md:inset-0 overflow-hidden flex items-start md:items-end left-0 right-0 z-20 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 md:py-0 md:bottom-16 lg:bottom-20 xl:bottom-28">
          <div className="container mx-auto w-full md:my-0">
            {/* Mobile: Single column, Desktop: 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">

              {/* First Row - Hero Text (Full Width) */}
              <div className="md:col-span-2 lg:col-span-3">
                {/* Animate H1 first, then rest */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-black mb-1 sm:mb-4"
                >
                  Solutions for Businesses
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col items-start gap-1 sm:gap-3 mb-1 sm:mb-4 md:mb-10 lg:mb-12"
                >
                  {/* Bottom Row - Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-black pt-0 sm:pt-3 md:pt-4 lg:pt-6"
                  >
                    Based on cutting AI technologies
                  </motion.p>
                </motion.div>
              </div>
              {/* Box 1 - Innovation (Left) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-lg bg-gradient-to-br from-white/20 to-gray-100/30 border border-black/20 rounded-2xl p-3 sm:p-6 md:p-8 lg:p-10 shadow-sm md:shadow-2xl relative flex flex-col md:min-h-[320px]"
              >
                {/* Top Section - Grouped Text */}
                <div className="mb-0.5 md:mb-auto">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal text-black mb-0.5">AI Solutions</h2>

                  {/* Small Badge Below Title */}
                  <div className="inline-block px-1.5 py-0 bg-purple-100 border border-purple-300 rounded-full text-purple-900 text-[9px] sm:text-xs mb-0.5 sm:mb-2">
                    <span className="font-semibold">250+</span> Projects Delivered
                  </div>

                  {/* Divider and Subtle Text - Grouped */}
                  <div className="h-px bg-gradient-to-r from-purple-300 via-pink-300 to-transparent mb-0.5" />
                  <p className="text-gray-600 text-[9px] sm:text-xs md:text-sm leading-tight">
                    Pioneering AI-driven technologies that transform businesses and redefine possibilities.
                  </p>
                </div>

                {/* 7 Page Hooks - Compact on mobile, wider on desktop */}
                <div className="space-y-0.5 sm:space-y-1.5 md:space-y-3 mt-1 md:mt-auto pt-1 sm:pt-4 md:pt-12">
                  <div onClick={() => scrollToService(0)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">Custom AI Development</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div onClick={() => scrollToService(1)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">Machine Learning Models </span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div onClick={() => scrollToService(2)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">GenAI & NLP </span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div onClick={() => scrollToService(3)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">Computer Vision</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <div onClick={() => scrollToService(4)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">AI Strategy & Consulting</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <div onClick={() => scrollToService(5)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">MLOps & Deployment</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <div onClick={() => scrollToService(6)} className="group flex items-center justify-between border-b border-gray-400 hover:border-black pb-0.5 sm:pb-1 md:pb-2 cursor-pointer transition-all duration-300 w-full">
                    <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-medium text-gray-500 group-hover:text-black transition-colors duration-300 leading-tight">AI Consulting Services</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-black transition-all duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Box 2 - AI Synergy (Middle) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="backdrop-blur-sm bg-gradient-to-br from-purple-50/20 to-pink-50/30 border border-white/40 rounded-2xl p-6 sm:p-7 md:p-8 lg:p-10 shadow-sm md:shadow-2xl relative flex flex-col min-h-[280px] sm:min-h-[300px] md:min-h-[320px]"
              >
                {/* Top Section */}
                <div className="mb-auto">
                  {/* AI Synergy */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal text-black">Industries</h2>
                    {/* 3 Circles - Right Edge, Horizontally Aligned, Half Overlapping */}
                    <div className="flex -space-x-2 sm:-space-x-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-transparent" />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-transparent" />
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-transparent" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal text-black mb-6 sm:mb-7 md:mb-8"></h3>

                  {/* Middle Paragraph - All Caps, Left Aligned */}
                  <p className="text-black text-xs sm:text-sm md:text-base uppercase">
                    We build AI that understands your world from fintech and healthcare to energy, retail, logistics, media, real estate, and ed-tech. Our domain-trained models power fraud detection, diagnostics, smart grids, personalization, routing, content intelligence, and more tailored to the realities of your industry.                  </p>
                </div>

                {/* Bottom Section - Progress Bar (Moved Down More) */}
                <div className="mt-auto pt-12 sm:pt-16 md:pt-20">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-normal text-black">{progress}%</span>
                  </div>

                  {/* Wider Progress Bar */}
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-full max-w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>

                  {/* Thin Black Line */}
                  <div className="h-0.5 bg-black mt-2 mb-6" />

                  {/* Bottom - Hexagon Left, Badge Right with Gap */}
                  <div className="flex items-center justify-between">
                    <svg width="24" height="28" viewBox="0 0 30 35" fill="none" className="text-purple-500">
                      <path d="M15 0L29.2 8.75V26.25L15 35L0.8 26.25V8.75L15 0Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-transparent border border-purple-300 rounded-full text-black text-sm font-semibold">
                      Faster Data Processing
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Technologies and Aida Advantage Stacked */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 md:col-span-2 lg:col-span-1">
                {/* Box 3 - Technologies (AidaBot) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="backdrop-blur-lg bg-gradient-to-br from-[#2a1740]/90 via-[#3d2557]/80 to-[#1a0e2e]/90 rounded-2xl p-8 md:p-10 shadow-sm md:shadow-2xl relative flex flex-col h-[280px]"
                >
                  {/* Number Badge - Top Right */}
                  <div className="absolute top-7 right-8 w-10 h-10 rounded-full border border-white flex items-center justify-center text-white font-thin text-md">
                    1
                  </div>


                  {/* Top Left - Aidabot Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-2xl  font-normal text-white mb-2">Technologies</h3>
                  <motion.h4
                    key={currentTech}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-lg sm:text-xl md:text-2xl text-white underline font-bold decoration-white mb-3 sm:mb-4 whitespace-nowrap"
                  >
                    {tech1Data[currentTech].title}
                  </motion.h4>

                  {/* Tech Stack Display - 2x2 Grid */}
                  <div className="flex-1 overflow-hidden mb-2">
                    <div className="grid grid-cols-2 gap-2">
                      {tech1Data[currentTech].techs.map((tech, idx) => (
                        <motion.div
                          key={`${currentTech}-${idx}`}
                          initial={{ opacity: 0, y: 30, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: idx * 0.1,
                            ease: "easeOut"
                          }}
                          className="bg-white/10 rounded-lg px-2 py-1.5 border border-white/20 text-white text-[10px] sm:text-xs font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Indicators - Bottom Right, Square */}
                  <div className="flex gap-1 sm:gap-1.5 justify-end">
                    {[0, 1, 2].map((num) => (
                      <div
                        key={num}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 transition-all duration-300 ${currentTech === num ? 'bg-purple-500 scale-110' : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Box 4 - Aida Advantage (Hidden on mobile, visible on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hidden md:flex backdrop-blur-lg bg-white border border-black/10 rounded-2xl p-6 sm:p-7 md:p-8 lg:p-10 shadow-2xl relative flex-col h-[250px] sm:h-[260px] md:h-[280px] overflow-hidden"
                >
                  {/* Fingerprint Background Image - Using img tag */}
                  <img
                    src="https://w7.pngwing.com/pngs/46/21/png-transparent-fingerprint-automated-fingerprint-identification-spiral-adermatoglyphia-fingerprints-miscellaneous-ink-monochrome.png"
                    alt=""
                    className="absolute -bottom-24 sm:-bottom-28 md:-bottom-28 -left-24 sm:-left-28 md:-left-32 w-[350px] sm:w-[400px] md:w-[450px] h-[350px] sm:h-[400px] md:h-[450px] opacity-6 grayscale pointer-events-none -rotate-317 object-cover scale-125 sm:scale-150"
                  />

                  {/* Number Badge - Top Right */}
                  <div className="absolute top-7 right-8 w-10 h-10 rounded-full border border-black flex items-center justify-center text-black font-thin text-md">
                    2
                  </div>

                  {/* Top Left - Secure Sense Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-2xl font-semibold text-black mb-3 sm:mb-4 md:mb-5 relative z-10">Aida Advantage</h3>

                  {/* Cybersecurity with Fingerprint Icon */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-7 md:mb-8 relative z-10">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    <h4 className="text-xl sm:text-2xl md:text-3xl text-black underline decoration-black font-semibold">Why Choose Aida</h4>
                  </div>

                  {/* Paragraph - Left Aligned */}
                  <p className="text-black text-sm relative z-10">
                    A hybrid AI partner that unites strategy, engineering, and deployment. We build secure, domain-specific, ROI-driven AI systems that deliver fast, scale with your business, and evolve intelligently.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable AI Services Section */}
      <section id="services-section" className="relative rounded-[40px] md:rounded-[60px] overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0"></div>
        {/* Transparency overlay that changes with content */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-black z-[1] pointer-events-none"
          animate={{
            opacity: expandedService !== null ? 0.3 : 0.1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
        {/* Custom Cursor - Hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:block">
          <CustomCursor />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-12 lg:gap-24 mb-12 items-start">
            {/* Left - Title with 01 */}
            <div className="flex items-start gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight"
              >
                Build, deploy, and scale intelligence across your entire business.
              </motion.h2>
              
            </div>

            {/* Right - Description Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-sm md:text-base leading-tight lg:mt-5"
            >
              <p>At AIDA, we don't just "implement AI."
              We architect intelligence — custom systems engineered for accuracy, security, and measurable ROI.
              Every solution is built end-to-end: data pipelines, models, infrastructure, deployment, and continuous improvement.</p>
            </motion.div>
          </div>           

          <div className="">
            {[
              {
                title: "Custom AI Development",
                description: "AI systems engineered from scratch for your business model, processes, and users.",
                deliverablesTitle: "What We Build",
                deliverables: [
                  "Predictive analytics and decision systems",
                  "Full-stack AI products and platforms",
                  "RAG-based internal copilots",
                  "Domain-specific models (finance, energy, healthcare, retail, etc.)",
                  "Custom LLM fine-tuning and training"
                ],
                outcome: "AI that fits your business perfectly — not generic tools duct-taped together."
              },
              {
                title: "Machine Learning Models",
                description: "Predict, classify, cluster, detect anomalies, and forecast with precision.",
                deliverablesTitle: "Capabilities",
                deliverables: [
                  "Forecasting & time-series models",
                  "Risk and scoring engines",
                  "Churn, lifetime value & customer analytics",
                  "Behavioural and operational prediction models",
                  "Fraud & anomaly detection"
                ],
                outcome: "Data that thinks for you — improving accuracy, revenue, and operations."
              },
              {
                title: "GenAI & NLP Systems",
                description: "Automate insight, content, communication, and knowledge retrieval.",
                deliverablesTitle: "Solutions Include",
                deliverables: [
                  "LLM-driven chatbots & copilots",
                  "Enterprise search with RAG",
                  "Document extraction & summarisation",
                  "Automated report/marketing/content generation",
                  "Voice + text processing"
                ],
                outcome: "Lower cost, faster execution, and turbocharged productivity."
              },
              {
                title: "Computer Vision",
                description: "Visual intelligence that detects, tracks, reads, and evaluates.",
                deliverablesTitle: "Applications",
                deliverables: [
                  "Quality inspection",
                  "Facial & object recognition",
                  "OCR for documents & workplaces",
                  "Retail analytics & footfall intelligence",
                  "Video analytics for safety/compliance"
                ],
                outcome: "Automation that never blinks — precision at industrial scale."
              },
              {
                title: "AI Automation",
                description: "Replace repetitive workflows with autonomous systems.",
                deliverablesTitle: "Examples",
                deliverables: [
                  "Automated customer support",
                  "Lead qualification engines",
                  "Invoice → workflow → payment automation",
                  "HR, CRM, and back-office automation",
                  "Marketing workflows powered by LLMs"
                ],
                outcome: "Lean teams, faster output, fewer errors."
              },
              {
                title: "MLOps & Deployment",
                description: "Enterprise-grade infrastructure for reliable AI at scale.",
                deliverablesTitle: "Our Stack",
                deliverables: [
                  "CI/CD for ML models",
                  "Monitoring, retraining & drift control",
                  "Cloud + edge deployment",
                  "Vector database architecture",
                  "Performance, latency & security tuning"
                ],
                outcome: "AI that is stable, secure, trackable, and production-ready."
              },
              {
                title: "AI Strategy & Advisory",
                description: "Blueprints that show where AI fits, what it returns, and how to deploy it.",
                deliverablesTitle: "Deliverables",
                deliverables: [
                  "AI audits",
                  "ROI models & business cases",
                  "Roadmaps & architecture",
                  "Data strategy & governance",
                  "Cost + value optimisation plans"
                ],
                outcome: "No guesswork — only clarity, direction, and quantifiable value."
              }
            ].map((service, index) => (
              <ServiceItem key={index} service={service} index={index} expandedService={expandedService} setExpandedService={setExpandedService} />
            ))}
          </div>
        </div>
      </section>

      {/* New Grid Section with Left Empty Space */}
      <section className="bg-white">
        <div className="w-full">
          {/* Layout: 8% left empty, 92% content */}
          <div className="flex">
            {/* Empty space - 8% on desktop, hidden on mobile */}
            <div className="hidden lg:block lg:w-[8%] border-b border-r border-[#DCDCDC]"></div>

            {/* Content area - 92% on desktop, full width on mobile */}
            <div className="w-full lg:w-[92%] border-b border-[#DCDCDC]">
              {/* Heading and Description - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-b border-[#DCDCDC] py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 text-left md:text-right"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-black mb-4 sm:mb-5 md:mb-6 leading-tight">
                  AI engineered around your world — with domain expertise built in.
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  AIDA builds intelligence that understands industry rules, edge cases, and workflows.
                  Instead of generic models, we train systems using domain-specific data patterns.
                  This makes our AI faster, more accurate, and more practical from day one.
                </p>
              </motion.div>

              {/* Grid of Points - 30% heading, 70% description */}
              <div>
                {[
                  {
                    heading: "Fintech",
                    description: "AIDA builds AI systems that power fraud prevention, credit intelligence, trading automation, and risk control across high-volume financial ecosystems — with speed, precision, and compliance.",
                    useCases: [
                      "Fraud & AML Detection – Real-time monitoring of transactions, identity verification, and financial crime prevention.",
                      "AI Credit Scoring & Lending – Multi-source risk assessment for faster, safer loan approvals.",
                      "Risk & Compliance Intelligence – Predictive credit risk, KYB/KYC automation, regulatory reporting.",
                      "Algorithmic Trading & Market Prediction – Pattern detection, volatility forecasting, automated execution.",
                      "Portfolio & Wealth Intelligence – Asset allocation optimization, return and risk forecasting.",
                      "AI-Powered Banking Support – Intelligent chatbots, sentiment analysis, dispute automation."
                    ]
                  },
                  {
                    heading: "Healthcare",
                    description: "Leverage AI to enhance diagnostics, automate clinical workflows, and unlock predictive intelligence across healthcare operations. AIDA builds compliant, data-secure healthcare AI systems that improve patient outcomes while reducing operational load.",
                    useCases: [
                      "Medical Imaging & Diagnostics – AI-powered detection across X-rays, MRIs, CT scans, and pathology images.",
                      "Clinical Decision Support – Predict disease progression and treatment outcomes using patient history and real-time data.",
                      "Patient Triage & Virtual Assistants – Automate symptom assessment, appointment scheduling, and care routing.",
                      "Hospital Operations Optimization – Forecast bed occupancy, staff allocation, and supply usage.",
                      "Remote Patient Monitoring – Real-time vitals tracking and early risk alerts."
                    ]
                  },
                  {
                    heading: "Energy & Utilities",
                    description: "We deploy AI systems that modernize grids, detect losses in real time, optimize power distribution, and forecast demand with unmatched accuracy.",
                    useCases: [
                      "Smart Grid Intelligence – Demand forecasting, load balancing, and outage prevention.",
                      "Power Theft & Anomaly Detection – Real-time consumption pattern analysis to eliminate revenue leakage.",
                      "Predictive Maintenance – Anticipate transformer and asset failures before breakdown.",
                      "Renewable Energy Forecasting – Solar and wind generation prediction for stable grid planning.",
                      "Energy Trading & Pricing Intelligence – AI-driven price forecasting and market optimization."
                    ]
                  },
                  {
                    heading: "Retail & eCommerce",
                    description: "We build AI that understands shopper intent, predicts demand, automates operations, and maximizes revenue across digital and physical retail.",
                    useCases: [
                      "AI Personalization Engines – Hyper-personalized product recommendations and content experiences.",
                      "Dynamic Pricing Models – Real-time demand-based and competitor-aware pricing.",
                      "Demand & Inventory Forecasting – Prevent stockouts and overstock with predictive supply planning.",
                      "Customer Behavior Analytics – Deep insight into churn risk, lifetime value, and purchase triggers.",
                      "Visual Search & Checkout Automation – AI-powered search, fraud detection, and frictionless checkout."
                    ]
                  },
                  {
                    heading: "Logistics & Supply Chain",
                    description: "From warehouse automation to real-time route intelligence, AIDA's AI brings predictive power across the entire supply chain.",
                    useCases: [
                      "Route Optimization & Fleet Intelligence – Real-time traffic-aware routing and fuel optimization.",
                      "Inventory & Demand Planning – AI-driven multi-location forecasting.",
                      "Warehouse Automation – Vision-based sorting, picking, and quality control.",
                      "Supply Chain Risk Prediction – Early detection of supplier delays and disruptions.",
                      "Delivery Time ETA Forecasting – Machine learning models for hyper-accurate delivery promises."
                    ]
                  },
                  {
                    heading: "Media & Entertainment",
                    description: "We help media companies automate content production, personalize user experiences, and uncover real-time audience intelligence.",
                    useCases: [
                      "Content Recommendation Engines – Netflix-grade personalization systems.",
                      "Automated Video & Text Generation – AI-powered scripts, captions, thumbnails, and editing workflows.",
                      "Audience Sentiment & Trend Analysis – Real-time social and engagement intelligence.",
                      "Ad Targeting & Monetization AI – Behavioral targeting and revenue optimization.",
                      "Copyright & Content Moderation – Vision + NLP models for rights protection and safety."
                    ]
                  },
                  {
                    heading: "Real Estate & PropTech",
                    description: "AIDA enables AI-powered valuation, lead scoring, and market forecasting systems for real estate enterprises and investment platforms.",
                    useCases: [
                      "AI Property Valuation Models – Automated, location-aware price prediction.",
                      "Buyer & Lead Scoring – Predict high-intent buyers using behavioral AI.",
                      "Market Demand Forecasting – Micro-market trend predictions.",
                      "Smart Listing Search & Matching – AI-powered property discovery.",
                      "Portfolio Risk & Yield Analysis – Data-driven asset performance intelligence."
                    ]
                  },
                  {
                    heading: "EdTech",
                    description: "We build AI systems that personalize education, automate assessment, and provide data-backed intelligence to institutions, platforms, and enterprises.",
                    useCases: [
                      "Adaptive Learning Engines – Personalized learning paths for each student.",
                      "AI Tutors & Chatbots – 24/7 intelligent student support.",
                      "Automated Assessment & Grading – NLP-based evaluations and feedback systems.",
                      "Student Performance Prediction – Early dropout and performance risk detection.",
                      "Content Recommendation & Curriculum Optimization – Data-driven course refinement."
                    ]
                  }
                ].map((item, index) => {
                  const [mouseY, setMouseY] = React.useState(50);
                  const [targetY, setTargetY] = React.useState(50);
                  const [isHovered, setIsHovered] = React.useState(false);
                  const [scrollProgress, setScrollProgress] = React.useState(0);
                  const itemRef = React.useRef<HTMLDivElement>(null);

                  React.useEffect(() => {
                    let animationFrame: number;

                    const animate = () => {
                      setMouseY((prev) => {
                        const diff = targetY - prev;
                        return prev + diff * 0.08; // Slower, smoother interpolation
                      });
                      animationFrame = requestAnimationFrame(animate);
                    };

                    animationFrame = requestAnimationFrame(animate);
                    return () => cancelAnimationFrame(animationFrame);
                  }, [targetY]);

                  // Mobile scroll-based overlay effect
                  React.useEffect(() => {
                    const handleScroll = () => {
                      if (!itemRef.current || window.innerWidth >= 768) return; // Only on mobile

                      const rect = itemRef.current.getBoundingClientRect();
                      const windowHeight = window.innerHeight;
                      const itemCenter = rect.top + rect.height / 2;
                      const windowCenter = windowHeight / 2;
                      
                      // Calculate distance from center (-1 to 1)
                      const distance = (itemCenter - windowCenter) / (windowHeight / 2);
                      
                      // Convert to progress (0 to 1, where 1 is centered)
                      const progress = Math.max(0, 1 - Math.abs(distance));
                      
                      setScrollProgress(progress);
                    };

                    if (window.innerWidth < 768) {
                      window.addEventListener('scroll', handleScroll, { passive: true });
                      handleScroll(); // Initial check
                    }

                    return () => {
                      window.removeEventListener('scroll', handleScroll);
                    };
                  }, []);

                  const isMobileActive = scrollProgress > 0.5;

                  return (
                    <motion.div
                      ref={itemRef}
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="grid grid-cols-1 md:grid-cols-12 border-b border-[#DCDCDC] last:border-b-0 group relative overflow-hidden"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setTargetY(50);
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        setTargetY(y);
                      }}
                    >
                      {/* Hover overlay with smooth slide effect - Desktop hover, Mobile scroll */}
                      <div
                        className="absolute left-0 right-0 bg-gradient-to-br from-[#2a1740]/90 via-[#3d2557]/80 to-[#1a0e2e]/90 pointer-events-none z-0 transition-all duration-500 ease-out"
                        style={{
                          top: (isHovered || isMobileActive) ? '0' : '100%',
                          bottom: (isHovered || isMobileActive) ? '0' : '-100%',
                          transform: typeof window !== 'undefined' && window.innerWidth >= 768 
                            ? `translateY(${(mouseY - 50) * 0.2}px)` 
                            : `translateY(${(1 - scrollProgress) * 20}px)`,
                          opacity: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1 : scrollProgress
                        }}
                      />

                      {/* Heading - 30% */}
                      <div className="md:col-span-4 md:border-r border-[#DCDCDC] py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-5 md:px-10 lg:px-16 text-left relative z-10">
                        <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold transition-colors duration-300 ${(isHovered || isMobileActive) ? 'text-white' : 'text-black'}`}>
                          {item.heading}
                        </h3>
                      </div>

                      {/* Description - 70% */}
                      <div className="md:col-span-8 py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-5 md:px-10 lg:px-16 text-left relative z-10">
                        <p className={`text-sm sm:text-base md:text-lg leading-relaxed transition-colors duration-300 mb-4 md:mb-6 ${(isHovered || isMobileActive) ? 'text-white' : 'text-gray-600'}`}>
                          {item.description}
                        </p>

                        {item.useCases && (
                          <div className="mt-3 md:mt-4">
                            <h4 className={`text-base sm:text-lg md:text-xl font-semibold transition-colors duration-300 mb-2 md:mb-3 ${(isHovered || isMobileActive) ? 'text-white' : 'text-black'}`}>
                              Key Use Cases
                            </h4>
                            <ul className="space-y-1.5 sm:space-y-2 list-disc list-inside">
                              {item.useCases.map((useCase: string, idx: number) => {
                                const [heading, ...descParts] = useCase.split(' – ');
                                const description = descParts.join(' – ');
                                return (
                                  <li key={idx} className={`text-xs sm:text-sm md:text-base leading-relaxed transition-colors duration-300 ${(isHovered || isMobileActive) ? 'text-white marker:text-white' : 'text-gray-600 marker:text-gray-600'}`}>
                                    <span className="font-semibold">{heading}</span>
                                    {description && <> – {description}</>}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arc Cards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black text-center mb-16"
          >
            Technologies & Engineering we use
          </motion.h2>

          {/* Cards Container */}
          <div className="relative">
            {/* Mobile: Single card view with overflow hidden */}
            <div className="md:hidden overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
              >
                {techData.map((card, index) => {
                  const isFlipped = flippedCard === index;
                  return (
                    <div key={card.id} className="w-full flex-shrink-0 px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                        style={{ perspective: '1000px', height: '480px' }}
                      >
                        <div
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            transition: 'transform 0.7s'
                          }}
                          className="w-full h-full relative"
                        >
                          {/* Front Face */}
                          <div
                            className="absolute inset-0 bg-white overflow-hidden shadow-lg border border-[#DCDCDC]"
                            style={{
                              backfaceVisibility: 'hidden',
                              clipPath: 'path("M 0,40 C 0,17.9 17.9,0 40,0 L calc(100% - 40),0 C calc(100% - 17.9),0 100%,17.9 100%,40 L 100%,calc(100% - 40) C 100%,calc(100% - 17.9) calc(100% - 17.9),100% calc(100% - 40),100% L 40,100% C 17.9,100% 0,calc(100% - 17.9) 0,calc(100% - 40) Z")',
                              borderRadius: '40px'
                            }}
                          >
                            <div className="relative overflow-hidden" style={{ height: '280px' }}>
                              <img
                                src={`/ai_page/${15 + index}.svg`}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="p-5 md:p-6 text-left flex flex-col h-[200px]">
                              <h3 className="text-lg md:text-xl font-semibold text-black leading-tight min-h-[3.5rem] flex items-start">
                                {card.title}
                              </h3>

                              <p className="text-gray-600 text-sm leading-relaxed mb-3 mt-2">
                                {card.description}
                              </p>

                              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3"></div>

                              <button
                                onClick={() => setFlippedCard(isFlipped ? null : index)}
                                className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all duration-300 mt-auto"
                              >
                                <span className="text-sm">Click to explore</span>
                                <div className="w-5 h-5 rounded-full border-2 border-purple-600 flex items-center justify-center hover:bg-purple-600 transition-all duration-300">
                                  <svg
                                    className="w-2.5 h-2.5 text-purple-600 hover:text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Back Face */}
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-[#2a1740]/90 via-[#3d2557]/80 to-[#1a0e2e]/90 overflow-hidden shadow-lg "
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                              clipPath: 'path("M 0,40 C 0,17.9 17.9,0 40,0 L calc(100% - 40),0 C calc(100% - 17.9),0 100%,17.9 100%,40 L 100%,calc(100% - 40) C 100%,calc(100% - 17.9) calc(100% - 17.9),100% calc(100% - 40),100% L 40,100% C 17.9,100% 0,calc(100% - 17.9) 0,calc(100% - 40) Z")',
                              borderRadius: '40px'
                            }}
                          >
                            <div className="p-6 md:p-7 h-full flex flex-col">
                              <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                  {card.title}
                                </h3>
                                <button
                                  onClick={() => setFlippedCard(null)}
                                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                >
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>

                              <ul className="space-y-3 flex-1 list-disc pl-5 text-white/90">
                                {card.techs.map((tech, techIndex) => (
                                  <li key={techIndex} className="text-sm md:text-base marker:text-purple-300">
                                    {tech}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Carousel Controls - Below the cards */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentCardIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                  className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center hover:bg-purple-600 transition-all group"
                  aria-label="Previous card"
                >
                  <svg className="w-5 h-5 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${currentCardIndex === index ? 'bg-purple-600 w-6' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentCardIndex((prev) => (prev === 3 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center hover:bg-purple-600 transition-all group"
                  aria-label="Next card"
                >
                  <svg className="w-5 h-5 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop/Tablet: Grid view with 3D rotation and flip cards */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 px-4 md:px-8 lg:px-12">
              {techData.map((card, index) => {
                const isFlipped = flippedCard === index;
                const isEdge = index === 0 || index === 3;
                const rotateY = index === 0 ? 15 : index === 3 ? -15 : 0;
                const scale = isEdge ? 1.08 : 1;
                const zIndex = isEdge ? 10 : 1;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                    style={{ perspective: '1000px', height: '480px', zIndex: zIndex }}
                    onMouseEnter={() => setFlippedCard(index)}
                    onMouseLeave={() => setFlippedCard(null)}
                  >
                    <div
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : `rotateY(${rotateY}deg) scale(${scale})`,
                        transition: 'transform 0.7s'
                      }}
                      className="w-full h-full relative"
                    >
                      {/* Front Face */}
                      <div
                        className="absolute inset-0 bg-white overflow-hidden shadow-lg border border-[#DCDCDC]"
                        style={{
                          backfaceVisibility: 'hidden',
                          clipPath: 'path("M 0,40 C 0,17.9 17.9,0 40,0 L calc(100% - 40),0 C calc(100% - 17.9),0 100%,17.9 100%,40 L 100%,calc(100% - 40) C 100%,calc(100% - 17.9) calc(100% - 17.9),100% calc(100% - 40),100% L 40,100% C 17.9,100% 0,calc(100% - 17.9) 0,calc(100% - 40) Z")',
                          borderRadius: '40px'
                        }}
                      >
                        <div className="relative overflow-hidden" style={{ height: '280px' }}>
                          <img
                            src={`/ai_page/${15 + index}.svg`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-5 md:p-6 text-left flex flex-col h-[200px]">
                          <h3 className="text-lg md:text-xl font-semibold text-black leading-tight min-h-[3.5rem] flex items-start">
                            {card.title}
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed mb-3 mt-2">
                            {card.description}
                          </p>

                          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3"></div>

                          <div className="flex items-center gap-2 text-purple-600 font-semibold mt-auto">
                            <span className="text-sm">Hover to explore</span>
                            <div className="w-5 h-5 rounded-full border-2 border-purple-600 flex items-center justify-center">
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back Face */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#2a1740]/90 via-[#3d2557]/80 to-[#1a0e2e]/90 overflow-hidden shadow-lg border border-purple-400"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          clipPath: 'path("M 0,40 C 0,17.9 17.9,0 40,0 L calc(100% - 40),0 C calc(100% - 17.9),0 100%,17.9 100%,40 L 100%,calc(100% - 40) C 100%,calc(100% - 17.9) calc(100% - 17.9),100% calc(100% - 40),100% L 40,100% C 17.9,100% 0,calc(100% - 17.9) 0,calc(100% - 40) Z")',
                          borderRadius: '40px'
                        }}
                      >
                        <div className="p-6 md:p-7 h-full flex flex-col">
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                            {card.title}
                          </h3>

                          <ul className="space-y-2 flex-1 list-disc pl-5 text-white/90">
                            {card.techs.map((tech, techIndex) => (
                              <li key={techIndex} className="text-xs md:text-base marker:text-purple-300">
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Video Box */}
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
              <source src="/large2.mp4" type="video/mp4" />
            </video>

            {/* Text at top-left */}
            <div className="absolute top-0 left-0 p-8 sm:p-12">
              <h2 className="text-white font-normal leading-tight text-xl sm:text-2xl md:text-[2.75rem] max-w-2xl">
                Ready to build AI that produces ROI, not experiments?
              </h2>
            </div>

            {/* Button at bottom-left */}
            <div className="absolute bottom-0 left-0 p-8 sm:p-12">
              <Link
                href="/get-started?service=Artificial Intelligence"
                className="group inline-flex items-center gap-3 bg-white text-black text-base sm:text-lg font-light transition-all hover:bg-transparent hover:text-white hover:border-2 hover:border-white border-2 border-transparent rounded-full pl-5 pr-8 py-3"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white group-hover:bg-transparent border-2 border-black group-hover:border-white flex items-center justify-center transition-all">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-white transition-all group-hover:-rotate-270" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
  );
}

function ServiceItem({ service, index, expandedService, setExpandedService }: { service: { title: string; description: string; deliverablesTitle?: string; deliverables?: string[]; outcome?: string }; index: number; expandedService: number | null; setExpandedService: (index: number | null) => void }) {
  const isExpanded = expandedService === index;

  useEffect(() => {
    if (expandedService === index && !isExpanded) {
      setExpandedService(index);
    }
  }, [expandedService, index, isExpanded, setExpandedService]);

  return (
    <motion.div
      id={`service-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/20 overflow-hidden hover:bg-white/5 transition-all duration-300"
    >
      <div
        className="flex items-center justify-between py-5 md:py-6 px-4 md:px-10 cursor-pointer group"
        onClick={() => setExpandedService(isExpanded ? null : index)}
      >
        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light transition-colors duration-300 text-white pr-4
          }`}>
          {service.title}
        </h3>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded
            ? 'border border-white hover:bg-gray-700'
            : 'border border-purple-500 hover:bg-black'
            }`}
        >
          <motion.svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            viewBox="0 0 24 24"
            fill="none"
            animate={{
              rotate: isExpanded ? 0 : -45
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Arrow shaft - diagonal line pointing to top-right */}
            <motion.line
              x1="3"
              y1="12"
              x2="18"
              y2="12"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{
                pathLength: isExpanded ? 0 : 1,
                opacity: isExpanded ? 0 : 1
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Top line - arrow head → X */}
            <motion.line
              x1="12"
              y1="12"
              x2="18"
              y2="12"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ originX: "12px", originY: "12px" }}
              animate={{
                x1: isExpanded ? 7 : 12,
                y1: isExpanded ? 7 : 6,
                x2: isExpanded ? 17 : 18,
                y2: isExpanded ? 17 : 12
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Bottom line - arrow head → X */}
            <motion.line
              x1="12"
              y1="12"
              x2="18"
              y2="12"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ originX: "12px", originY: "12px" }}
              animate={{
                x1: isExpanded ? 7 : 12,
                y1: isExpanded ? 17 : 18,
                x2: isExpanded ? 17 : 18,
                y2: isExpanded ? 7 : 12
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-4 md:px-10 pb-6 md:pb-8 pt-2">
          <div className="h-px bg-white/50 mb-4 md:mb-6" />
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mb-6 md:mb-8">
            {service.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {service.outcome && (
              <div>
                <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4">Outcome</h4>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed italic">
                  {service.outcome}
                </p>
              </div>
            )}

            {service.deliverables && (
              <div>
                <h4 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 text-left">{service.deliverablesTitle || 'Deliverables'}</h4>
                <ul className="space-y-2 md:space-y-3 list-disc list-inside">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInSection, setIsInSection] = useState(false);
  const [isOverText, setIsOverText] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = document.querySelector('#services-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsInSection(isInside);

        if (isInside) {
          setMousePosition({
            x: e.clientX,
            y: e.clientY
          });

          // Check if hovering over text or interactive elements
          const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

          if (elementUnderCursor) {
            // Check if it's a text or interactive element
            const isTextOrInteractive = elementUnderCursor.matches('h2, h3, h4, p, span, button, svg, path, line, circle, rect') ||
              !!elementUnderCursor.closest('h2, h3, h4, p, span, button, svg');

            // Check if element is inside a button or has purple parent
            const buttonParent = elementUnderCursor.closest('button');
            const purpleParent = !!elementUnderCursor.closest('[class*="border-purple"], [class*="bg-purple"], [class*="hover:bg-purple"]');

            // Check computed styles
            let bgColor = '';
            let borderColor = '';

            // If inside button, check button's computed styles (more reliable than child element)
            if (buttonParent) {
              const buttonStyle = window.getComputedStyle(buttonParent);
              borderColor = buttonStyle.borderColor;
              bgColor = buttonStyle.backgroundColor;
            } else {
              const computedStyle = window.getComputedStyle(elementUnderCursor);
              bgColor = computedStyle.backgroundColor;
              borderColor = computedStyle.borderColor;
            }

            // Get className safely for both HTML and SVG elements
            let classNameStr = '';
            if (buttonParent) {
              classNameStr = buttonParent.className || '';
            } else {
              try {
                classNameStr = typeof elementUnderCursor.className === 'string'
                  ? elementUnderCursor.className
                  : (elementUnderCursor.className as any)?.baseVal || '';
              } catch (e) {
                classNameStr = '';
              }
            }

            const hasPurpleColor = !!buttonParent ||
              purpleParent ||
              borderColor.includes('rgb(168, 85, 247)') || // purple-500
              borderColor.includes('rgb(147, 51, 234)') || // purple-600
              borderColor.includes('168, 85, 247') ||
              bgColor.includes('rgb(168, 85, 247)') ||
              bgColor.includes('rgb(147, 51, 234)') ||
              classNameStr.includes('purple') ||
              classNameStr.includes('border-purple');

            setIsOverText(!!(isTextOrInteractive || hasPurpleColor));
          } else {
            setIsOverText(false);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isInSection) return null;

  return (
    <>
      {/* Base cursor - always visible with normal blend */}
      <div
        className="fixed w-20 h-20 rounded-full pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          background: 'rgba(255, 255, 255, 0.8)',
          mixBlendMode: 'normal',
          opacity: isOverText ? 0 : 1,
          transition: 'opacity 0.2s ease'
        }}
      />
      {/* Invert cursor - only visible over text/buttons */}
      <div
        className="fixed w-20 h-20 rounded-full pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          background: 'white',
          mixBlendMode: 'exclusion',
          opacity: isOverText ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      />
    </>
  );
}
