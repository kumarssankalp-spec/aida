'use client';

import Link from 'next/link';
import { useState } from 'react';
import { sendNewsletterSubscription } from '@/lib/emailService';


interface FooterProps {
  className?: string;
  id?: string;
}
export default function Footer({ className = '', id }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSubscribed) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await sendNewsletterSubscription({ email });
      
      if (success) {
        setSubmitStatus('success');
        setEmail('');
        setIsSubscribed(true);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <footer id={id} className={`bg-white text-black ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Cell 1 - Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Left Side - Services Dropdown & FAQ */}
          <div className="space-y-6">
            {/* Services Dropdown */}
            <div
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-2 text-left text-xl sm:text-2xl font-normal hover:text-[#5919C1] transition mb-4"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-3 mb-6 ml-6  pl-1">
                  <li>
                    <Link href="/services/big-data-analysis" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Big Data & Analysis
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/artificial-intelligence" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Artificial Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/technology-services" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Technology Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/digital-marketing" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Digital Marketing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Button */}
            <Link
              href="/faq"
              scroll={true}
              className="block text-black text-xl sm:text-2xl font-normal hover:text-[#5919C1] transition"
            >
              FAQ
            </Link>

            {/* About Button */}
            <Link
              href="/about"
              scroll={true}
              className="block text-black text-xl sm:text-2xl font-normal hover:text-[#5919C1] transition"
            >
              About
            </Link>
          </div>

          {/* Right Side - Newsletter Signup */}
          <div>
            <h3 className="text-xl sm:text-2xl font-normal mb-4">Stay Up to Date</h3>
            
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                Thank you for subscribing to our newsletter!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                Sorry, there was an error. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input with Submit Button */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border-1 border-black rounded-md text-base focus:outline-none focus:border-[#5919C1] transition"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !isSubscribed}
                  className="bg-[#5919C1] text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium hover:bg-[#4a14a0] transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={isSubscribed}
                  onChange={(e) => setIsSubscribed(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#5919C1] cursor-pointer"
                />
                <label htmlFor="newsletter" className="text-sm sm:text-base cursor-pointer">
                  Yes, subscribe me to your newsletter
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/20 my-8 lg:my-12" />

        {/* Cell 2 - Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Social Icons on mobile, AIDA & Social on desktop */}
          <div className="flex flex-col items-start justify-between">
            {/* Social Media Icons - Top on mobile, bottom on desktop */}
            <div className="flex items-center gap-4 lg:mt-24 order-1 lg:order-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#5919C1] transition font-bold text-2xl sm:text-3xl leading-none"
                aria-label="Facebook"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5919C1] transition flex items-center"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black hover:text-[#5919C1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#5919C1] transition font-bold text-2xl sm:text-3xl leading-none"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5919C1] transition flex items-center"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black hover:text-[#5919C1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            
            {/* Big AIDA Text - Hidden on mobile, visible on desktop */}
            <h4 className="hidden lg:block text-7xl md:text-7xl font-thin leading-none text-black/80 order-1 lg:order-1">Aida Corporation</h4>
          </div>

          {/* Right Side - Legal Dropdown on mobile, Legal Links on desktop */}
          <div className="space-y-4">
            {/* Legal Links - Dropdown on mobile, list on desktop */}
            <div className="lg:hidden"
              onMouseEnter={() => setLegalOpen(true)}
              onMouseLeave={() => setLegalOpen(false)}
            >
              <button
                onClick={() => setLegalOpen(!legalOpen)}
                className="flex items-center gap-2 text-left text-xl sm:text-2xl font-normal hover:text-[#5919C1] transition mb-4"
              >
                <span>Legal</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${legalOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  legalOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-3 ml-6 pl-1">
                  <li>
                    <Link href="/legal/terms-conditions" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/privacy-policy" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/cookie-policy" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/disclaimer" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" scroll={true} className="text-base sm:text-lg hover:text-[#5919C1] transition inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Desktop Legal Links */}
            <ul className="hidden lg:block space-y-2">
              <li>
                <Link href="/legal/terms-conditions" scroll={true} className="text-sm sm:text-base inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" scroll={true} className="text-sm sm:text-base inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" scroll={true} className="text-sm sm:text-base inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" scroll={true} className="text-sm sm:text-base inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" scroll={true} className="text-sm sm:text-base inline-block relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-[110%]">
                  Contact us
                </Link>
              </li>
            </ul>

            {/* Copyright - Hidden on mobile, visible on desktop */}
            <p className="hidden lg:block text-base sm:text-lg pt-4">
              © {currentYear} by AAIDA Corp Private Limited
            </p>
          </div>
        </div>

        {/* Mobile Only - Big AIDA Text & Copyright at Bottom */}
        <div className="lg:hidden mt-12">
          <h4 className="text-5xl sm:text-6xl font-thin leading-none text-black/80 mb-4">Aida Corporation</h4>
          <p className="text-sm sm:text-base">
            © {currentYear} by AAIDA Corp Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
