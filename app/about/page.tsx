'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-white text-black selection:bg-[#5919C1] selection:text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[#5919C1]/5 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#A53A9A]/5 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-[#FAE34D]/5 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto max-w-[1400px] relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#5919C1] animate-pulse" />
              <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">We are AIDA Corporation</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8">
              Where Data, Technology <br className="hidden md:block" />
              & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5919C1] to-[#A53A9A]">Strategy Converge</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
              We merge science with creativity to help organizations grow smarter, faster, and further. Transforming complexity into clarity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '9K+', label: 'Trusted Clients' },
              { number: '3M+', label: 'Reports Generated' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-4 md:py-0"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#5919C1] mb-2">{stat.number}</div>
                <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">
                Democratizing Access to <br />
                <span className="text-[#A53A9A]">World-Class Technology</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to democratize access to advanced technology, AIDA Corporation has grown from a small startup to a globally recognized leader in technology solutions.
                </p>
                <p>
                  Our journey began with a simple belief: that every business deserves access to world-class technology. Over the years, we've helped thousands of companies across various industries transform their operations through intelligent automation, data-driven decision making, and innovative digital marketing strategies.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-gradient-to-br from-[#5919C1] to-[#A53A9A] p-1">
                <div className="w-full h-full bg-white rounded-[38px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"></div>
                  <div className="relative z-10 text-center p-8">
                    <svg className="w-20 h-20 mx-auto text-[#5919C1] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h3 className="text-2xl font-semibold text-[#5919C1]">Science + Creativity</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Clients Switch (Dark Section) */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white rounded-[40px] mx-4 md:mx-8">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <span className="text-[#FAE34D] font-medium tracking-wider uppercase text-sm mb-4 block">The AIDA Difference</span>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              Why Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5919C1] to-[#A53A9A]">Switch to Us</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Unlike large agencies that sell strategy and deliver junior execution, we operate with senior ownership, transparent reporting, and lean delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: 'Strategy is not delegated', desc: 'Senior-led from day one', icon: <svg className="w-8 h-8 text-[#FAE34D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: 'Execution is not opaque', desc: 'Full visibility into work', icon: <svg className="w-8 h-8 text-[#FAE34D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { title: 'Results are not hidden', desc: 'No vanity metrics', icon: <svg className="w-8 h-8 text-[#FAE34D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#5919C1] to-[#A53A9A] rounded-3xl p-10 md:p-16 text-center">
            <h3 className="text-3xl md:text-4xl font-medium mb-10">Built for companies that want</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Clarity', icon: <svg className="w-10 h-10 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
                { label: 'Velocity', icon: <svg className="w-10 h-10 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                { label: 'Control', icon: <svg className="w-10 h-10 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  {item.icon}
                  <span className="text-xl font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-6">
              Senior Strategy. <span className="text-[#5919C1]">Modern Delivery.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We operate with a clear, accountable org structure, not a talent pool.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                role: 'Strategy Lead',
                exp: '10+ years experience',
                desc: 'Owns vision, roadmap, performance direction, and strategic decisions.',
                color: '#5919C1'
              },
              {
                role: 'Account Manager',
                exp: 'Client-facing expert',
                desc: 'Owns communication, timelines, coordination, and delivery consistency.',
                color: '#A53A9A'
              },
              {
                role: 'Specialists',
                exp: 'Subject Matter Experts',
                desc: 'Execute within defined scope, SOPs, and QA frameworks (SEO, AI, Paid, Content).',
                color: '#C0A6EA'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-[32px] bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: `${member.color}15` }}>
                  <svg className="w-8 h-8" style={{ color: member.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.role}</h3>
                <p className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: member.color }}>{member.exp}</p>
                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Horizontal Scroll feel) */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-[1400px]">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-6">Our Operating Process</h2>
            <p className="text-xl text-gray-600">A clear, repeatable delivery flow designed for speed and quality.</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden lg:block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: '01', name: 'Strategy', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
                { step: '02', name: 'Roadmap', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
                { step: '03', name: 'Execution', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                { step: '04', name: 'QA', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                { step: '05', name: 'Reporting', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="text-4xl font-bold text-gray-100 mb-4 group-hover:text-[#5919C1]/10 transition-colors">{item.step}</div>
                  <div className="w-12 h-12 rounded-full bg-[#5919C1] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#5919C1]/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Delivery & Follow the Sun */}
      <section className="py-24 px-6 bg-[#5919C1] text-white rounded-[40px] mx-4 md:mx-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A53A9A] rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                Hybrid Global Delivery
              </div>
              <h2 className="text-4xl md:text-6xl font-medium mb-8">
                Follow-the-Sun <br />
                <span className="text-[#FAE34D]">Execution</span>
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Work progresses across time zones—so campaigns, content, and optimizations move forward continuously. Speed is a strategic advantage, and we design for it.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Eliminating idle time',
                  'Faster iteration cycles',
                  'Shorter feedback loops',
                  'Continuous progress'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FAE34D] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#5919C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" />
                <div className="absolute inset-12 rounded-full border border-white/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Orbiting dots */}
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#FAE34D] rounded-full -translate-x-1/2 -translate-y-2 shadow-[0_0_20px_#FAE34D]" />
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#A53A9A] rounded-full -translate-x-1/2 translate-y-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Trust */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-6">How Clients Stay in Control</h2>
            <p className="text-xl text-gray-600">Trust is built through structure, cadence, and visibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 rounded-[32px] p-10">
              <h3 className="text-2xl font-semibold mb-8 text-[#5919C1]">Governance Artifacts</h3>
              <div className="space-y-6">
                {[
                  { title: 'Weekly', desc: 'Execution updates' },
                  { title: 'Monthly', desc: 'Strategy & performance reviews' },
                  { title: 'Quarterly', desc: 'Planning & roadmap resets' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#5919C1]/10 flex items-center justify-center flex-shrink-0 text-[#5919C1]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-[32px] p-10">
              <h3 className="text-2xl font-semibold mb-8 text-[#5919C1]">Live Dashboards</h3>
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-gray-900">Campaign Performance</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Live</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">ROI</span>
                      <span className="font-medium text-green-600">+127%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-[#5919C1] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Conversion Rate</span>
                      <span className="font-medium text-green-600">+4.2%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-[#A53A9A] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Real-time visibility. No black-box reporting. Decisions backed by data, not opinions.
              </p>
            </div>
          </div>

          {/* Trust Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Senior-led strategy',
              'US-aligned reporting',
              'Weekly performance calls',
              'Clear KPIs and ROI tracking',
              'Live dashboards for visibility',
              'No long-term lock-ins'
            ].map((pillar, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#5919C1]/30 hover:bg-[#5919C1]/5 transition-colors">
                <svg className="w-5 h-5 text-[#5919C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-700">{pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-medium mb-8">
            Built for <span className="text-[#FAE34D]">Accountability</span>,<br /> Not Agency Optics.
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            If you value senior thinking, faster execution, and clear ROI, we're built for you.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-[#FAE34D] transition-colors duration-300"
          >
            Start Your Transformation
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
  );
}
