'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after 50% scroll
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrolled / (fullHeight - windowHeight)) * 100;

      if (scrollPercentage > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: '#5919C1',
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          onClick={scrollToTop}
          className="fixed right-2 bottom-8 bg-[#000000] transition-colors z-50 flex flex-col items-center gap-1.5 py-4 px-2.5 rounded-lg shadow-lg cursor-pointer group"
          aria-label="Scroll to top"
        >
          {/* Icon with Animation */}
          <motion.svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            animate={isScrolling ? {
              y: [0, -50],
              opacity: [1, 0]
            } : {}}
            transition={isScrolling ? {
              duration: 0.6,
              ease: "easeIn",
              repeat: 0
            } : {}}
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 15l7-7 7 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Multiple arrows showing upward motion when scrolling */}
          <AnimatePresence>
            {isScrolling && (
              <>
                {[0, 1, 2].map((index) => (
                  <motion.svg
                    key={index}
                    className="w-5 h-5 text-white absolute"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: -50, 
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 15l7-7 7 7"
                    />
                  </motion.svg>
                ))}
              </>
            )}
          </AnimatePresence>
          
          {/* Vertical Text */}
          <motion.span 
            className="text-white text-xs font-medium tracking-wide whitespace-nowrap vertical-text"
            whileHover={{ letterSpacing: '0.15em' }}
            animate={isScrolling ? {
              opacity: [1, 0.5, 1]
            } : {}}
            transition={isScrolling ? {
              duration: 0.6,
              repeat: 1
            } : {}}
          >
            {isScrolling ? 'SCROLLING...' : 'BACK TO TOP'}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
