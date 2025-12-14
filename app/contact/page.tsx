'use client';

import { useState } from 'react';
import { sendContactForm } from '@/lib/emailService';
import { motion } from 'framer-motion';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await sendContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        newsletter: newsletter
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        setNewsletter(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white">
      {/* Contact Section */}
      <section className="relative">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mx-auto">
            {/* Left Section - Text with Video Background */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-start relative overflow-hidden min-h-[500px] py-10 md:py-16"
            >
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="https://video.wixstatic.com/video/11062b_dc8af5fbebe0462f8675ed655a0ed757/480p/mp4/file.mp4" type="video/mp4" />
              </video>
              
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50 z-1"></div>
              
              {/* Text Content */}
              <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-5xl font-thin text-white relative z-10 px-4 md:px-6 lg:pr-1">
                With Aida, you get the dedication of an in-house team with the proven expertise of a tech industry leader.
              </h1>
            </motion.div>

            {/* Divider - only in section 1 */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#DCDCDC]"></div>

            {/* Right Section - Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col h-full pb-10 md:pb-16 pt-10 md:pt-16"
            >
              <h2 className="text-2xl md:text-2xl font-bold mb-8 text-[#000000] px-2 lg:px-6">Get in Touch</h2>
              
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 mx-8 lg:mx-16"
                >
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 mx-8 lg:mx-16"
                >
                  Sorry, there was an error sending your message. Please try again.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-t-2 border-[#DCDCDC] text-[#000000] transition-all duration-300 placeholder:text-[#6E6E6E] "
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-t-2 border-[#DCDCDC] text-[#000000] transition-all duration-300 placeholder:text-[#6E6E6E] "
                  />

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-t-2 border-[#DCDCDC] text-[#000000] transition-all duration-300 placeholder:text-[#6E6E6E] "
                  />

                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you? *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-48 px-4 py-4 border-2 border-[#DCDCDC] text-[#000000] transition-all duration-300 resize-none placeholder:text-[#6E6E6E] "
                  ></textarea>
                </motion.div>

                <div className="flex flex-col mt-5 px-2 lg:px-6 md:px-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <p className="text-sm text-[#000000]">
                      By submitting, I agree to{' '}
                      <a href="/legal/privacy-policy" className="text-[#5919C1] hover:underline transition">
                        Privacy Policy
                      </a>
                      {' '}and{' '}
                      <a href="/legal/terms-conditions" className="text-[#5919C1] hover:underline transition">
                        Terms & Conditions
                      </a>
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-start gap-3 mt-4"
                  >
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-[#5919C1] cursor-pointer shrink-0 transition-transform hover:scale-110"
                    />
                    <label htmlFor="newsletter" className="text-sm text-[#000000] cursor-pointer">
                      Subscribe to our newsletter for latest updates and offers
                    </label>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={(!isSubmitting && formData.name && formData.email && formData.message) ? { scale: 1.02 } : {}}
                    whileTap={(!isSubmitting && formData.name && formData.email && formData.message) ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className={`group relative w-full px-8 py-4 rounded-md text-lg font-semibold transition-all duration-300 shadow-lg mt-5 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? 'bg-[#5919C1] text-white cursor-wait'
                        : !formData.name || !formData.email || !formData.message
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#5919C1] text-white hover:bg-[#4a14a0]'
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
                        : 'Submit'}
                    </span>
                    {!isSubmitting && formData.name && formData.email && formData.message && (
                      <svg
                        className="relative z-10 w-6 h-6 transition-all duration-500 rotate-45 group-hover:rotate-[330deg] group-hover:translate-x-1"
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
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className="border border-[#DCDCDC] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-xl md:text-2xl font-normal text-gray-600 mb-6">
                Visit Us
              </h2>
              <address className="not-italic text-xl md:text-2xl font-semibold text-[#000000] leading-relaxed">
                DN Nagar, Andheri West,<br />
                Mumbai, Maharashtra 400053
              </address>
            </motion.div>

            {/* Right Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center items-center gap-12"
            >
              <h2 className="text-xl md:text-2xl font-normal text-gray-600 self-start">
                Connect With Us
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col w-full"
              >
                <p className="text-gray-600 mb-2 text-sm">Phone</p>
                <a 
                  href="tel:+916307358822" 
                  className="text-2xl md:text-3xl font-semibold text-[#000000] hover:text-[#5919C1] transition-colors duration-300"
                >
                  +91 6307358822
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col w-full"
              >
                <p className="text-gray-600 mb-2 text-sm">Email</p>
                <a 
                  href="mailto:info@aidacorp.in" 
                  className="text-2xl md:text-3xl font-semibold text-[#000000] hover:text-[#5919C1] transition-colors duration-300"
                >
                  info@aidacorp.in
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
