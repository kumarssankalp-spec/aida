'use client';

import Link from 'next/link';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentMobileCard, setCurrentMobileCard] = useState(0);
  const [expandedMobileCard, setExpandedMobileCard] = useState<number | null>(null);
  
  // Team members data
  const teamMembers = [
    { 
      name: 'John Anderson', 
      title: 'CEO',
      image: '/abt.jpg',
      para1: 'Pioning technology innovation and transforming businesses globally with strategic vision that drives sustainable growth and creates lasting impact.',
      para2: 'Leadig teams to excellence through data-driven decision making and innovative solutions that reshape industries and empower organizations worldwide.',
      linkedin: '#', 
      twitter: '', 
      instagram: '#',
      knowMoreLink: ''
    },
    { 
      name: 'Sarah Mitchell', 
      title: 'CTO',
      image: '/abt.jpg',
      para1: 'Expert in AI and data architecture, building scalable technology solutions that empower teams and drive innovation across all organizational levels.',
      para2: 'Leveraging cutting-edge tools and methodologies to create robust systems that transform business operations and deliver exceptional results consistently.',
      linkedin: '#', 
      twitter: '#', 
      instagram: '#',
      knowMoreLink: ''
    },
    { 
      name: 'Michael Chen', 
      title: 'CMO',
      image: '',
      para1: 'Driving digital transformation and creating impactful marketing campaigns that build strong brand presence and accelerate sustainable market growth.',
      para2: 'Developing innovative strategies that connect brands with audiences, delivering measurable results and fostering long-term customer relationships effectively.',
      linkedin: 'http://localhost:3000/about', 
      twitter: '', 
      instagram: '',
      knowMoreLink: ''
    }
  ];
  
  return (
    <>
      <main className="bg-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-10 pb-20 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal mb-6 leading-tight">
              We are <span className="text-[#5919C1]">AIDA</span> Corporation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Where Data, Technology & Strategy Converge to Transform Businesses
            </p>
          </motion.div>

          {/* Video Hero with Profile Cards */}
           {/* <div className="relative">
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
                className="w-full h-[500px] object-cover"
              >
                <source src="https://video.wixstatic.com/video/11062b_164f323661ce4045a0cf93375453524f/1080p/mp4/file.mp4" type="video/mp4" />
              </video>
            </motion.div>

            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-6">
              
              <div className="hidden md:flex flex-row gap-6 items-center justify-center">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative bg-white rounded-4xl p-1.5 shadow-xl hover:shadow-2xl flex-shrink-0"
                    style={{ 
                      width: hoveredCard === index ? '550px' : '300px',
                      transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: hoveredCard === index ? 10 : 1
                    }}
                  >
                    <div className="flex items-center h-[400px] gap-0">
                      
                      <div className="relative h-full shrink-0" style={{ 
                        width: hoveredCard === index ? '275px' : '288px',
                        transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}>
                        <div className="rounded-3xl overflow-hidden h-full w-full">
                          <img 
                            src={member.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=400&background=5919C1&color=fff'} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                          
                         
                          <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                            <p className="text-sm font-medium text-white">
                              {member.name} <span className="text-white/80">• {member.title}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                     
                      <div 
                        className="flex-shrink-0 h-full overflow-hidden relative"
                        style={{
                          width: hoveredCard === index ? '266px' : '0px',
                          transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      >
                        <div className="w-64 h-full flex flex-col justify-between items-center px-6 py-5 text-center">
                         
                          <motion.div 
                            className="flex flex-col gap-4 mt-4 text-left"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: hoveredCard === index ? 1 : 0
                            }}
                            transition={{ duration: 0.2, delay: hoveredCard === index ? 0.4 : 0 }}
                          >
                            <p className="text-black text-[13px] leading-relaxed font-semibold">
                              <span className="text-[28px] font-bold text-[#5919C1] leading-tight">{member.para1.split(' ')[0]}</span>{' '}
                              {member.para1.split(' ').slice(1).join(' ')}
                            </p>
                            <p className="text-black text-[13px] leading-relaxed font-semibold">{member.para2}</p>
                          </motion.div>
                          
                         
                          <motion.div 
                            className="flex items-center gap-1 ml-4 mb-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: hoveredCard === index ? 1 : 0,
                              scale: hoveredCard === index ? 1 : 0.8
                            }}
                            transition={{ duration: 0.2, delay: hoveredCard === index ? 0.5 : 0 }}
                          >
                            {(() => {
                              const socialLinks = [
                                { href: member.linkedin, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>), name: 'LinkedIn', color: '#0077B5' },
                                { href: member.twitter, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>), name: 'Twitter', color: '#000000' },
                                { href: member.instagram, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>), name: 'Instagram', color: '#E1306C' },
                              ].filter(link => link.href && link.href.trim() !== '');

                            
                              const allLinks = [...socialLinks];
                              if (member.knowMoreLink && member.knowMoreLink.trim() !== '') {
                                allLinks.push({ href: member.knowMoreLink, icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>), name: 'Contact', color: '#5919C1' });
                              }

                              
                              const smallCircles = allLinks.slice(0, allLinks.length - 1);
                              const largeButton = allLinks[allLinks.length - 1];

                              return (
                                <>
                                  {smallCircles.map((link, idx) => (
                                    <a key={idx} href={link.href} title={link.name} style={{ borderColor: '', color: '' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = link.color; e.currentTarget.style.color = link.color; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#4b5563'; }} className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 transition-colors">
                                      {link.icon}
                                    </a>
                                  ))}
                                  <a href={largeButton.href} className="group relative flex items-center gap-2 px-4 py-2.5 bg-white text-gray-800 rounded-full text-sm font-medium shadow-lg overflow-visible whitespace-nowrap ml-0.5">
                                    <span className="absolute inset-[-1px] rounded-full overflow-hidden">
                                      <span className="absolute inset-0 animate-spin-slow transition-opacity duration-500 group-hover:opacity-0" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 55%, #5919C1 60%, #5919C1 75%, transparent 80%, transparent 100%)' }}></span>
                                      <span className="absolute inset-0 opacity-0 animate-spin-slow transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 55%, #FAE34D 60%, #FAE34D 75%, transparent 80%, transparent 100%)' }}></span>
                                    </span>
                                    <span className="absolute inset-0 bg-white rounded-full z-[5] overflow-hidden">
                                      <span className="absolute inset-0 bg-[#5919C1] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
                                    </span>
                                    <span className="relative z-20 transition-colors duration-500 group-hover:text-white">{largeButton.icon}</span>
                                    <span className="relative z-20 transition-colors duration-500 group-hover:text-white">{largeButton.name}</span>
                                  </a>
                                </>
                              );
                            })()}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              
              <div className="md:hidden flex flex-col items-center gap-4">
                {(() => {
                  const member = teamMembers[currentMobileCard];
                  const isExpanded = expandedMobileCard === currentMobileCard;
                  
                  return (
                    <>
                      <motion.div
                        key={currentMobileCard}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-1.5"
                      >
                        {!isExpanded ? (
                          <div className="relative h-[400px]">
                            <div className="rounded-3xl overflow-hidden h-full w-full">
                              <img 
                                src={member.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=400&background=5919C1&color=fff'} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                              
                              <motion.div 
                                className="absolute bottom-6 left-4 right-4 flex items-center justify-between"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                              >
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/30">
                                  <p className="text-sm font-medium text-white whitespace-nowrap text-left">
                                    {member.name} <span className="text-white/80">• {member.title}</span>
                                  </p>
                                </div>

                                <button
                                  onClick={() => setExpandedMobileCard(currentMobileCard)}
                                  className="w-10 h-10 bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/40 hover:bg-white/40 transition-colors shrink-0"
                                  aria-label="Expand profile"
                                >
                                  <svg 
                                    className="w-8 h-8" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 16 16"
                                    strokeWidth={1}
                                    style={{ transform: 'rotate(45deg)' }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6L2 8l2 2M12 6l2 2-2 2" />
                                  </svg>
                                </button>
                              </motion.div>
                            </div>
                          </div>
                        ) : (

                          <motion.div 
                            className="h-[400px] flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="p-6 pb-3 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden  shadow-lg shrink-0">
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                                <p className="text-[#5919C1] font-semibold text-xs">{member.title}</p>
                              </div>

                              <button
                                onClick={() => setExpandedMobileCard(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
                                aria-label="Collapse profile"
                              >
                                <svg 
                                  className="w-5 h-5 text-gray-600" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 20 20"
                                  strokeWidth={1.5}
                                  style={{ transform: 'rotate(45deg)' }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 6l3 4-3 4M15 6l-3 4 3 4" />
                                </svg>
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                              <style jsx>{`
                                div::-webkit-scrollbar {
                                  display: none;
                                }
                              `}</style>
                              <div className="flex flex-col gap-2.5 text-left">
                                <p className="text-gray-700 text-xs leading-relaxed">
                                  <span className="text-2xl font-bold text-[#5919C1] leading-tight">{member.para1.split(' ')[0]}</span>{' '}
                                  {member.para1.split(' ').slice(1).join(' ')}
                                </p>
                                <p className="text-gray-700 text-xs leading-relaxed">{member.para2}</p>
                              </div>
                            </div>

                            <div className="p-6 pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-2 justify-center">
                                {(() => {
                                  const socialLinks = [
                                    { href: member.linkedin, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>), name: 'LinkedIn', color: '#0077B5' },
                                    { href: member.twitter, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>), name: 'Twitter', color: '#000000' },
                                    { href: member.instagram, icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>), name: 'Instagram', color: '#E1306C' },
                                  ].filter(link => link.href && link.href.trim() !== '');

                                  const allLinks = [...socialLinks];
                                  if (member.knowMoreLink && member.knowMoreLink.trim() !== '') {
                                    allLinks.push({ href: member.knowMoreLink, icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>), name: 'Contact', color: '#5919C1' });
                                  }

                                  const smallCircles = allLinks.slice(0, allLinks.length - 1);
                                  const largeButton = allLinks[allLinks.length - 1];

                                  return (
                                    <>
                                      {smallCircles.map((link, idx) => (
                                        <a key={idx} href={link.href} title={link.name} style={{ borderColor: '', color: '' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = link.color; e.currentTarget.style.color = link.color; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#4b5563'; }} className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 transition-colors">
                                          {link.icon}
                                        </a>
                                      ))}
                                      <a href={largeButton.href} className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-800 rounded-full text-xs font-medium shadow-md overflow-visible whitespace-nowrap">
                                        <span className="absolute inset-[-1px] rounded-full overflow-hidden">
                                          <span className="absolute inset-0 animate-spin-slow transition-opacity duration-500 group-hover:opacity-0" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 55%, #5919C1 60%, #5919C1 75%, transparent 80%, transparent 100%)' }}></span>
                                          <span className="absolute inset-0 opacity-0 animate-spin-slow transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 55%, #FAE34D 60%, #FAE34D 75%, transparent 80%, transparent 100%)' }}></span>
                                        </span>
                                        <span className="absolute inset-0 bg-white rounded-full z-5 overflow-hidden">
                                          <span className="absolute inset-0 bg-[#5919C1] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
                                        </span>
                                        <span className="relative z-20 transition-colors duration-500 group-hover:text-white">{largeButton.icon}</span>
                                        <span className="relative z-20 transition-colors duration-500 group-hover:text-white">{largeButton.name}</span>
                                      </a>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="flex gap-3 items-center">
                        <motion.button
                          onClick={() => setCurrentMobileCard(prev => (prev - 1 + teamMembers.length) % teamMembers.length)}
                          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          aria-label="Previous member"
                        >
                          <svg 
                            className="w-5 h-5 text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </motion.button>
                        
                        <div className="flex gap-1.5">
                          {teamMembers.map((_, index) => (
                            <div 
                              key={index}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === currentMobileCard 
                                  ? 'w-6 bg-[#5919C1]' 
                                  : 'w-1.5 bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>

                        <motion.button
                          onClick={() => setCurrentMobileCard(prev => (prev + 1) % teamMembers.length)}
                          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          aria-label="Next member"
                        >
                          <svg 
                            className="w-5 h-5 text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>  */}
        </div>
      </section>

     

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-[#F2F2F2] rounded-[40px] md:rounded-[60px]">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <h2 className="text-5xl md:text-6xl font-normal mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At AIDA, we merge science with creativity to help organizations grow smarter, faster, and further. From harnessing data to crafting digital experiences that convert, we turn complexity into clarity — empowering brands, causes, and campaigns to lead with confidence in a data-driven world.
                </p>
                <p>
                  Founded with a vision to democratize access to advanced technology, AIDA Corporation has grown from a small startup to a globally recognized leader in technology solutions. Our journey began with a simple belief: that every business deserves access to world-class technology.
                </p>
                <p>
                  Over the years, we've helped thousands of companies across various industries transform their operations through intelligent automation, data-driven decision making, and innovative digital marketing strategies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5919C1]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border-l-4 border-[#5919C1]">
                    <h3 className="text-5xl font-normal mb-2 text-[#5919C1]">10+</h3>
                    <p className="text-lg text-gray-600 font-medium">Years Experience</p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5919C1]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border-l-4 border-[#5919C1]">
                    <h3 className="text-5xl font-normal mb-2 text-[#5919C1]">9K+</h3>
                    <p className="text-lg text-gray-600 font-medium">Trusted Clients</p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5919C1]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border-l-4 border-[#5919C1]">
                    <h3 className="text-5xl font-normal mb-2 text-[#5919C1]">3M+</h3>
                    <p className="text-lg text-gray-600 font-medium">Reports Generated</p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5919C1]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg border-l-4 border-[#5919C1]">
                    <h3 className="text-5xl font-normal mb-2 text-[#5919C1]">100%</h3>
                    <p className="text-lg text-gray-600 font-medium">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-normal mb-16 text-center"
          >
            Mission & Vision
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="bg-[#F2F2F2] rounded-3xl p-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#5919C1] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-normal mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower businesses worldwide with cutting-edge technology solutions that drive innovation, efficiency, and growth. We believe in transforming complex challenges into simple, elegant solutions through the power of artificial intelligence and data-driven insights.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="bg-[#F2F2F2] rounded-3xl p-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#5919C1] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-normal mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the global leader in technology innovation, setting new standards in AI, Big Data, and Digital Marketing. We envision a future where every organization, regardless of size, has access to enterprise-level technology solutions that propel them forward.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 bg-[#F2F2F2] rounded-[40px] md:rounded-[60px]">
        <div className="container mx-auto max-w-[1400px]">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-normal mb-16 text-center"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Intelligent Efficiency', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { title: 'Uncompromised Data Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
              { title: 'Predictable Growth', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { title: 'Enduring Transformation', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#5919C1] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-normal mb-3">{value.title}</h3>
              </motion.div>
            ))}
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
    </>
  );
}
