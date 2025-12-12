'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down (mobile and desktop)
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
    <header className={`bg-white hover:bg-[#F2F2F2] shadow-sm sticky top-0 z-999 border-b border-[#DCDCDC] transition-all duration-300 group ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between py-3">
          {/* Logo Section - Left */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/aidalogo.svg" 
              alt="AIDA Logo" 
              width={40} 
              height={40}
              className="w-10 h-10 transition-transform hover:scale-105"
              priority
              unoptimized
            />
            <div className="flex flex-col leading-none -space-y-1.5">
              <span className="text-base font-medium text-[#000000] tracking-tight">Aida</span>
              <span className="text-base font-medium text-[#000000] tracking-wider">Corporation</span>
            </div>
          </Link>

          {/* Center - Home + Services Dropdown + FAQ */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 border border-[#3d3a3a62] group-hover:border-[#3d3a3a49] bg-[#f2f2f2b9] rounded-full px-3 py-1 transition-all">
              {/* Home Link */}
              <Link 
                href="/" 
                className="px-3 py-1.5 text-[#000000] font-medium hover:bg-[#5919C1] transition-colors rounded-full hover:text-white"
              >
                Home
              </Link>
              
              <div className="relative">
                <button
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#000000] font-medium hover:bg-[#5919C1] transition-colors rounded-full hover:text-white"
                >
                  Services
                  <svg 
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

              {/* Dropdown Menu - Redesigned */}
              <div
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`absolute top-full left-0 mt-4 bg-white shadow-2xl md:rounded-md border border-[#DCDCDC] overflow-hidden transition-all duration-300 ${
                  isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                }`}
              >
                <div className="flex gap-0">
                  {/* Left Side - Services List */}
                  <div className="w-72 p-8 pr-4 flex flex-col justify-center">
                    <div className="space-y-2">
                      <Link 
                        href="/services/big-data-analysis" 
                        className="flex items-center gap-3 px-3 py-3 transition-all group"
                      >
                        <svg className="w-5 h-5 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        <div className="font-semibold text-lg text-[#000000] transition-colors inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#000000] after:transition-all after:duration-300 group-hover:after:w-[110%]">
                          Big Data & Analysis
                        </div>
                      </Link>

                      <Link 
                        href="/services/artificial-intelligence" 
                        className="flex items-center gap-3 px-3 py-3 transition-all group"
                      >
                        <svg className="w-5 h-5 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                        <div className="font-semibold text-lg text-[#000000] transition-colors inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#000000] after:transition-all after:duration-300 group-hover:after:w-[110%]">
                          Artificial Intelligence
                        </div>
                      </Link>

                      <Link 
                        href="/services/technology-services" 
                        className="flex items-center gap-3 px-3 py-3 transition-all group"
                      >
                        <svg className="w-5 h-5 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                        </svg>
                        <div className="font-semibold text-lg text-[#000000] transition-colors inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#000000] after:transition-all after:duration-300 group-hover:after:w-[110%]">
                          Technology Services
                        </div>
                      </Link>

                      <Link 
                        href="/services/digital-marketing" 
                        className="flex items-center gap-3 px-3 py-3 transition-all group"
                      >
                        <svg className="w-5 h-5 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                        </svg>
                        <div className="font-semibold text-lg text-[#000000] transition-colors inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#000000] after:transition-all after:duration-300 group-hover:after:w-[110%]">
                          Digital Marketing
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side - Project Price Calculator with Background Image */}
                  <div className="w-96 p-6">
                    {/* Inner Box with Background Image - Inset from parent */}
                    <div className="relative h-full rounded-xl overflow-hidden m-4">
                      {/* Background Image - Full visibility */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: 'url(https://ventionteams.com/_next/image?url=https%3A%2F%2Fventionteams.com%2Fmedia%2Foriginal_images%2Fbanner_calculator_new.jpg&w=3840&q=75)'
                        }}
                      />
                     
                      {/* Content - No Calculator Icon */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            Project Price Calculator
                          </h3>
                          <p className='text-white'>Get your estimate in 60 seconds.</p>
                        </div>
                        <Link 
                          href="/get-started"
                          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-[#5919C1] rounded-xl font-semibold hover:bg-white/95 hover:shadow-lg transition-all group"
                        >
                          <span>Get My Estimate</span>
                          <svg className="w-5 h-5 -rotate-45  transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <Link
              href="/faq"
              className="px-3 py-1.5 text-[#000000] font-medium hover:bg-[#5919C1] transition-colors rounded-full hover:text-white"
            >
              FAQ
            </Link>

            {/* Team Link
            <Link
              href="/team"
              className="px-3 py-1.5 text-[#000000] font-medium hover:bg-[#5919C1] transition-colors rounded-full hover:text-white"
            >
              Team
            </Link> */}
          </div>
        </div>

          {/* Right - Divider + Get Started */}
          <div className="hidden md:flex items-center gap-3">
            {/* Vertical Divider - Full Height */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-[#DCDCDC] left-[calc(100%-240px)]"></div>

            {/* Get Started Button */}
            <Link 
              href="/get-started" 
              className="flex items-center gap-2 px-3 py-1.5 text-[#000000] hover:text-[#5919C1] transition-all group/button"
            >
              <div className="w-7 h-7 rounded-full border-2 border-[#000000] group-hover/button:border-[#5919C1] flex items-center justify-center transition-all">
                <svg 
                  className="w-4 h-4 transition-transform group-hover/button:-rotate-270" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span className="font-normal text-base">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#000000] hover:text-[#5919C1] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Menu - Full Screen Slide from Right */}
    <div
      className={`fixed top-0 right-0 h-screen w-full bg-white z-[99999] transform transition-transform duration-300 ease-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#000000]">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#000000] hover:text-[#5919C1] transition-all hover:scale-110"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Content - No Scroll, Fit to Screen */}
          <div className="h-[calc(100%-68px)] flex flex-col justify-between overflow-y-auto">
            <div className="px-6 py-4 flex-1 flex flex-col justify-around">
              {/* Services */}
              <div className="mb-2">
                <h3 className="text-xs font-semibold text-[#6E6E6E] mb-3 uppercase tracking-wider">Services</h3>
                <div className="space-y-2">
                  <Link 
                    href="/services/big-data-analysis"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors group"
                  >
                    <svg className="w-4 h-4 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#000000] group-hover:text-[#5919C1]">Big Data & Analysis</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/artificial-intelligence"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors group"
                  >
                    <svg className="w-4 h-4 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#000000] group-hover:text-[#5919C1]">Artificial Intelligence</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/technology-services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors group"
                  >
                    <svg className="w-4 h-4 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#000000] group-hover:text-[#5919C1]">Technology Services</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/digital-marketing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors group"
                  >
                    <svg className="w-4 h-4 text-[#5919C1] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#000000] group-hover:text-[#5919C1]">Digital Marketing</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* FAQ */}
              <div className="border-t border-[#F2F2F2] pt-3 mt-2">
                <Link 
                  href="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors"
                >
                  <div className="text-base font-semibold">FAQ</div>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors"
                >
                  <div className="text-base font-semibold">About</div>
                </Link>
                {/* <Link
                  href="/team"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-[#5919C1]/5 hover:text-[#5919C1] transition-colors"
                >
                  <div className="text-sm font-semibold">Team</div>
                </Link> */}
              </div>

              {/* Price Calculator Box */}
              <div className="border-t border-[#F2F2F2] pt-4 mt-3">
                <div className="relative rounded-2xl overflow-hidden min-h-[160px]">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(https://ventionteams.com/_next/image?url=https%3A%2F%2Fventionteams.com%2Fmedia%2Foriginal_images%2Fbanner_calculator_new.jpg&w=3840&q=75)'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-5 flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1.5">
                        Project Price Calculator
                      </h3>
                      <p className="text-white/90 text-sm">Get your estimate in 60 seconds.</p>
                    </div>
                    <Link 
                      href="/get-started"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-[#5919C1] rounded-xl text-base font-semibold hover:bg-white/95 hover:shadow-lg transition-all"
                    >
                      <span>Get My Estimate</span>
                      <svg className="w-5 h-5 -rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <Link 
                href="/get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#5919C1] text-white rounded-full hover:bg-[#4a14a0] hover:shadow-lg transition-all mt-4"
              >
                <span className="text-base font-semibold">Get Started</span>
                <svg className="w-5 h-5 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
    </>
  );
}
