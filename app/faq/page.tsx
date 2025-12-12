'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './faq.module.css';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // General Questions
  {
    category: 'General',
    question: 'What services does AIDA Corporation offer?',
    answer: 'AIDA Corporation specializes in four main areas: Big Data & Analysis, Artificial Intelligence, Technology Services, and Digital Marketing. We provide end-to-end solutions tailored to your business needs.'
  },
  {
    category: 'General',
    question: 'How long has AIDA Corporation been in business?',
    answer: 'AIDA Corporation has been providing cutting-edge technology solutions for over a decade, helping businesses transform and scale with innovative AI and data-driven strategies.'
  },
  {
    category: 'General',
    question: 'What industries do you serve?',
    answer: 'We serve a diverse range of industries including healthcare, finance, retail, manufacturing, education, and technology. Our solutions are customizable to meet the unique needs of any sector.'
  },
  {
    category: 'General',
    question: 'Do you work with startups or only established companies?',
    answer: 'We work with businesses of all sizes, from innovative startups to large enterprises. Our flexible solutions can be scaled to match your current needs and grow with your business.'
  },

  // Big Data & Analysis
  {
    category: 'Big Data',
    question: 'What types of data can you analyze?',
    answer: 'We can analyze structured and unstructured data from various sources including databases, cloud storage, social media, IoT devices, and enterprise systems. Our analytics platform supports real-time and batch processing.'
  },
  {
    category: 'Big Data',
    question: 'How do you ensure data security and privacy?',
    answer: 'We implement industry-leading security measures including encryption, access controls, and compliance with GDPR, CCPA, and other regulations. All data is processed in secure environments with regular security audits.'
  },
  {
    category: 'Big Data',
    question: 'What tools and technologies do you use for big data?',
    answer: 'We utilize cutting-edge technologies including Apache Hadoop, Spark, Kafka, cloud platforms (AWS, Azure, GCP), and advanced visualization tools like Tableau and Power BI.'
  },

  // Artificial Intelligence
  {
    category: 'AI',
    question: 'What AI solutions do you provide?',
    answer: 'We offer machine learning model development, natural language processing, computer vision, predictive analytics, chatbots, recommendation systems, and AI-powered automation solutions.'
  },
  {
    category: 'AI',
    question: 'How long does it take to develop an AI solution?',
    answer: 'Project timelines vary based on complexity and scope. Simple ML models can be developed in 4-8 weeks, while complex AI systems may take 3-6 months. We provide detailed timelines during the consultation phase.'
  },
  {
    category: 'AI',
    question: 'Do you provide AI model training and maintenance?',
    answer: 'Yes, we provide complete lifecycle support including initial training, continuous model monitoring, retraining with new data, and performance optimization to ensure your AI solutions remain effective.'
  },
  {
    category: 'AI',
    question: 'Can you integrate AI with our existing systems?',
    answer: 'Absolutely! We specialize in seamless integration with existing infrastructure. Our solutions are designed to work with your current systems through APIs, SDKs, and custom connectors.'
  },

  // Technology Services
  {
    category: 'Technology',
    question: 'What cloud platforms do you support?',
    answer: 'We support all major cloud platforms including AWS, Microsoft Azure, Google Cloud Platform, and hybrid cloud solutions. Our team is certified in multiple cloud technologies.'
  },
  {
    category: 'Technology',
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes, we provide 24/7 support, regular maintenance, security updates, performance monitoring, and dedicated account management to ensure your systems run smoothly.'
  },
  {
    category: 'Technology',
    question: 'Can you help with cloud migration?',
    answer: 'We offer comprehensive cloud migration services including assessment, strategy planning, execution, and post-migration optimization. We ensure minimal downtime and data integrity throughout the process.'
  },

  // Digital Marketing
  {
    category: 'Marketing',
    question: 'What digital marketing services do you offer?',
    answer: 'We provide SEO optimization, content marketing, social media management, PPC campaigns, email marketing, analytics and reporting, and comprehensive digital strategy development.'
  },
  {
    category: 'Marketing',
    question: 'How do you measure marketing campaign success?',
    answer: 'We use advanced analytics to track KPIs including ROI, conversion rates, engagement metrics, customer acquisition costs, and lifetime value. You receive detailed monthly reports with actionable insights.'
  },
  {
    category: 'Marketing',
    question: 'Do you create content for marketing campaigns?',
    answer: 'Yes, our creative team produces high-quality content including blog posts, social media content, videos, infographics, and email campaigns tailored to your brand voice and audience.'
  },

  // Pricing & Process
  {
    category: 'Pricing',
    question: 'How much do your services cost?',
    answer: 'Pricing varies based on project scope, complexity, and duration. We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. Contact us for a custom quote.'
  },
  {
    category: 'Pricing',
    question: 'Do you offer free consultations?',
    answer: 'Yes! We provide free initial consultations to understand your needs, discuss potential solutions, and provide recommendations. There\'s no obligation to proceed after the consultation.'
  },
  {
    category: 'Pricing',
    question: 'What is your typical project workflow?',
    answer: 'Our process includes: 1) Discovery & Consultation, 2) Strategy & Planning, 3) Development & Implementation, 4) Testing & Quality Assurance, 5) Deployment & Training, 6) Ongoing Support & Optimization.'
  },
  {
    category: 'Pricing',
    question: 'Do you require a long-term contract?',
    answer: 'Contract terms are flexible and depend on the project type. We offer both project-based engagements and ongoing service agreements. We work with you to find the best arrangement for your needs.'
  },
];

const categories = ['All', 'General', 'Big Data', 'AI', 'Technology', 'Marketing', 'Pricing'];

// Generate placeholder questions from all FAQs
const placeholderQuestions = faqs.map(faq => faq.question);

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [writingComplete, setWritingComplete] = useState(false);
  const [titleText, setTitleText] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Title typing animation
  useEffect(() => {
    const fullText = 'Frequently Asked Questions';
    let charIndex = 0;
    
    // Wait for video animation to complete (1.2s) + small delay
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setTitleText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setWritingComplete(true);
          }, 100);
        }
      }, 80); // 80ms per character

      return () => clearInterval(typingInterval);
    }, 1300); // Start after video animation (1.2s + 0.1s)

    return () => clearTimeout(startDelay);
  }, []);

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Typing effect for placeholder
  useEffect(() => {
    if (!isMounted || !writingComplete) return;
    
    // Wait for search bar and button animations to complete
    // Search bar: 0.4s delay + 1.2s duration = 1.6s
    // Button: 1.6s delay + 0.6s duration = 2.2s
    const placeholderDelay = setTimeout(() => {
      const currentText = placeholderQuestions[currentPlaceholder];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex <= currentText.length) {
          setDisplayedPlaceholder(currentText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentPlaceholder((prev) => (prev + 1) % placeholderQuestions.length);
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 2300); // Start after search button animation completes

    return () => clearTimeout(placeholderDelay);
  }, [currentPlaceholder, isMounted, writingComplete]);

  // Filter FAQs based on category and search
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Scroll animations observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateFadeInUp);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.scrollAnimate}`);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredFAQs]);

  const handleSearch = () => {
    // Search is already handled in real-time through filteredFAQs
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white">
      {/* Hero Video Section */}
      <section className="pt-10 md:pt-10 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Video Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
            >
              <source src="https://video.wixstatic.com/video/11062b_164f323661ce4045a0cf93375453524f/1080p/mp4/file.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
              {/* FAQ Title in Handwritten Font */}
              <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 pt-4 flex justify-center w-full">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal text-white"
                >
                  {titleText}
                  {!writingComplete && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="inline-block w-0.5 h-[0.8em] bg-white ml-1 align-middle"
                    />
                  )}
                </motion.h1>
              </div>

              {/* Search Box */}
              <div className="w-full max-w-3xl mx-auto">
                <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: writingComplete ? '100%' : 0,
                      opacity: writingComplete ? 1 : 0
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4, 
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="flex flex-col md:flex-row gap-4 overflow-hidden"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder={isMounted ? (displayedPlaceholder + (isTyping ? '|' : '')) : 'Search frequently asked questions...'}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg border-2 border-white/40 bg-white/10 rounded-xl focus:outline-none focus:border-white focus:bg-white/20 transition-all text-white placeholder:text-white/70 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
                      />
                      <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ffffff] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: writingComplete ? 1 : 0, scale: writingComplete ? 1 : 0.5 }}
                      transition={{ duration: 0.6, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
                      onClick={handleSearch}
                      className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white text-black hover:bg-[#5919C1] hover:text-white rounded-full font-semibold text-sm sm:text-sm md:text-base lg:text-lg hover:shadow-xl transform hover:scale-100 transition-all cursor-pointer"
                    >
                      Search
                    </motion.button>
                  </motion.div>
                  
                  {/* Category Tabs - Moved Below Search Bar */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6 pt-4 sm:pt-6">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ 
                          opacity: writingComplete ? 1 : 0, 
                          y: writingComplete ? 0 : 30, 
                          scale: writingComplete ? 1 : 0.8 
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 1.8 + index * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base transition-all transform hover:scale-105 whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-[#FAE34D] text-black shadow-lg border-2 border-transparent'
                            : 'bg-transparent text-white border-2 border-white hover:bg-white/10'
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ List Section - Grouped by Category */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-full">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto mb-6 text-[#DCDCDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#6E6E6E] text-2xl font-light">No FAQs found matching your search</p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-6 py-3 bg-[#5919C1] text-white rounded-full hover:bg-[#A53A9A] transition-all"
                >
                  Clear Filters
                </button>
                <Link
                  href="/contact"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-6 py-3 bg-[#FAE34D] text-black rounded-full hover:bg-[#A53A9A] transition-all"
                >
                  Contact us for help
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {/* Group FAQs by category */}
              {categories
                .filter(cat => cat !== 'All')
                .map((category) => {
                  const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
                  
                  if (categoryFAQs.length === 0) return null;
                  
                  return (
                    <div key={category} className={`border-b-2 border-[#DCDCDC] ${styles.scrollAnimate}`}>
                      {/* Category Section with 10% / 90% Split (hide left on mobile) */}
                      <div className="grid grid-cols-1 md:grid-cols-[10%_90%] gap-0">
                        {/* Left Section - Empty Decorative (hidden on mobile) */}
                        <div className="hidden md:block bg-white border-r border-[#DCDCDC]"></div>
                        
                        {/* Right Section - Content */}
                        <div className="bg-white">
                          {/* Category Title */}
                          <div className="px-4 md:px-8 pt-6 md:pt-8 pb-2 border-b-2 border-[#DCDCDC] flex items-end justify-end">
                            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#5919C1]">
                              {category}
                            </h2>
                          </div>
                          
                          {/* FAQ List */}
                          <div className="divide-y divide-[#DCDCDC]">
                            {categoryFAQs.map((faq, index) => (
                              <div key={index} className="p-4 md:p-6 lg:p-8 hover:bg-[#F2F2F2] transition-colors">
                                {/* Question */}
                                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-[#5919C1] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm md:text-base lg:text-lg">Q</span>
                                  </div>
                                  <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#000000] flex-1">
                                    {faq.question}
                                  </h3>
                                </div>
                                
                                {/* Answer */}
                                <div className="flex items-start gap-3 md:gap-4 ml-10 md:ml-12 lg:ml-16">
                                  <p className="text-[#6E6E6E] text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Results Count */}
          {filteredFAQs.length > 0 && (
            <div className={`mt-12 text-center ${styles.scrollAnimate}`}>
              <p className="text-[#6E6E6E] text-lg">
                Showing <span className="font-bold text-[#5919C1]">{filteredFAQs.length}</span> {filteredFAQs.length === 1 ? 'result' : 'results'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`pb-10 md:pb-10 bg-white border-b-2 border-[#dcdcdc] ${styles.scrollAnimate}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* CTA Video Box */}
          <div className="relative w-full mx-auto rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
            >
              <source src="https://video.wixstatic.com/video/11062b_dc8af5fbebe0462f8675ed655a0ed757/480p/mp4/file.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 text-white pb-3 md:pb-4 border-b-2 md:border-b-4 border-white">
                Still Have Questions?
              </h2>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto font-light text-white mt-4 md:mt-6">
                Our team is here to help. Get in touch with us for personalized answers and solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 md:gap-3 bg-[#FAE34D] text-[#000000] px-6 py-3 md:px-8 lg:px-10 md:py-4 lg:py-5 rounded-full font-bold text-sm md:text-base lg:text-lg hover:bg-white hover:shadow-2xl transform hover:scale-110 transition-all group"
              >
                <span>Contact Us</span>
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
