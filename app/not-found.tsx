'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 with Image replacing 0 */}
          <motion.div
            className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8 select-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[80px] sm:text-[120px] md:text-[150px] lg:text-[200px] font-extralight leading-none bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] bg-clip-text text-transparent">
              4
            </span>
            <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] mx-1 sm:mx-2 flex items-center justify-center group/image">
              <img
                src="/400.png"
                alt="0"
                className="w-full h-full object-contain animate-spin group-hover/image:[animation-play-state:paused] pointer-events-none"
                style={{ animationDuration: '10s' }}
              />
            </div>
            <span className="text-[80px] sm:text-[120px] md:text-[150px] lg:text-[200px] font-extralight leading-none bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] bg-clip-text text-transparent">
              4
            </span>
          </motion.div>

          {/* Error Message */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-light text-black mb-3 md:mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Sorry, the page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Home Button */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative py-3 sm:py-4 px-8 sm:px-10 rounded-full font-medium text-base sm:text-lg border-2 border-black text-black hover:text-white hover:border-transparent transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#5919C1] to-[#7B3FF2] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go Home
                </span>
              </motion.button>
            </Link>

            {/* Contact Button */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 sm:py-4 px-8 sm:px-10 rounded-full font-medium text-base sm:text-lg border-2 border-gray-300 text-gray-700 hover:border-[#5919C1] hover:text-[#5919C1] transition-all duration-300 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
