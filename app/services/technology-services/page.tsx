'use client';

import Link from 'next/link';
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scrollstack";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Dynamic stepper data
const stepperData = [
  {
    id: 1,
    title: "Discovery & Analysis",
    description: "We begin by understanding your business goals, challenges, and data landscape to identify opportunities for AI integration."
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description: "Our team develops a comprehensive AI roadmap aligned with your objectives, defining key metrics and success criteria."
  },
  {
    id: 3,
    title: "Development & Training",
    description: "We build and train custom AI models using your data, ensuring accuracy, reliability, and scalability."
  },
  {
    id: 4,
    title: "Integration & Testing",
    description: "Seamless integration with your existing systems followed by rigorous testing to ensure optimal performance."
  },
  {
    id: 5,
    title: "Deployment & Optimization",
    description: "Launch your AI solution with continuous monitoring and optimization to maximize ROI and business impact."
  }
];

const cardsData = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and applications built for performance",
    bgColor: "#7f66A8",
    textColor: "white",
    points: [
      { label: "Platforms", values: ["Shopify", "WordPress", "Wix", "Webflow", "Figma"] },
      { label: "Coding Languages", values: ["React", "Next.js", "Python", "Node.js", "TypeScript", "HTML/CSS"] },
      { label: "Databases", values: ["AWS DynamoDB", "Google Firestore", "Supabase", "MySQL"] },
      { label: "Features", values: ["Animations", "AI Chatbots", "CMS Systems", "Lead Capture Flows", "Localization", "API Integrations"] },
      { label: "Outcomes", values: ["Modern UI", "Self-hosted Components", "Fast Delivery Cycles", "High Page Speed", "Real-time Data Sync"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build personalized dashboards for enterprises for consumer analytics, operations, and CRM workflows."
    }
  },
  {
    id: 2,
    title: "Software Development",
    description: "Enterprise-grade software solutions tailored to your business needs",
    bgColor: "#F5F5F0",
    textColor: "gray-800",
    points: [
      { label: "Platforms", values: ["Enterprise Systems", "SaaS Platforms", "CRM/ERP Solutions", "API Ecosystems"] },
      { label: "Coding Languages", values: ["Python", "Java", "C#", "JavaScript/TypeScript", "Go", "PHP"] },
      { label: "Framework/Stacks", values: ["Django", "Spring Boot", "DOT.NET", "Node.js", "React", "Angular"] },
      { label: "Databases", values: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Oracle"] },
      { label: "Tools", values: ["Docker", "Kubernetes", "GitHub/GitLab", "Jenkins", "CI/CD Pipelines"] },
      { label: "Features", values: ["Custom Workflows", "Integrations", "AI Automation", "Microservices", "Secure APIs"] },
      { label: "Outcomes", values: ["Scalable Architecture", "High Performance Apps", "Faster Deployments", "Enterprise Reliability"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build internal dashboards, workflow automation systems, and AI-powered tools tailored to company operations."
    }
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android",
    bgColor: "#6B5494",
    textColor: "white",
    points: [
      { label: "Platforms", values: ["iOS", "Android", "Flutter", "React Native", "PWA"] },
      { label: "Coding Languages", values: ["Swift", "Kotlin", "Dart", "TypeScript", "JavaScript"] },
      { label: "Databases", values: ["Firebase", "SQLite", "Supabase", "Realm"] },
      { label: "Tools", values: ["Xcode", "Android Studio", "Fastlane", "AppCenter"] },
      { label: "Features", values: ["Push Notifications", "Geolocation", "Offline Mode", "In-app Payments", "AI Recommendations"] },
      { label: "Outcomes", values: ["Smooth UX", "Device-optimized Performance", "Cross-platform Efficiency", "Fast App Launch"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build analytics dashboards for app usage, retention, and customer behaviour insights."
    }
  },
  {
    id: 4,
    title: "Quality Assurance",
    description: "Comprehensive testing solutions ensuring flawless software delivery",
    bgColor: "#FAFAF8",
    textColor: "gray-800",
    points: [
      { label: "Platforms", values: ["Web Apps", "Mobile Apps", "Cloud Systems", "APIs"] },
      { label: "Testing Tools", values: ["Selenium", "Postman", "JMeter", "Cypress", "Appium"] },
      { label: "Testing Types", values: ["Automation Testing", "Manual Testing", "Performance Testing", "Security Testing", "Regression Testing"] },
      { label: "Databases", values: ["TestRail", "Jira", "Azure Test Plans"] },
      { label: "Features", values: ["Bug Tracking", "Continuous QA", "Automated Regression Suites", "Load & Stress Testing"] },
      { label: "Outcomes", values: ["High Reliability", "Zero-critical Bugs", "Smooth Deployments", "Improved User Experience"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build automated test dashboards for executives to track product stability and sprint quality."
    }
  },
  {
    id: 5,
    title: "DevOps",
    description: "Streamlined infrastructure automation and continuous delivery pipelines",
    bgColor: "#54397f",
    textColor: "white",
    points: [
      { label: "Platforms", values: ["AWS", "Azure", "GCP", "On-premise Systems"] },
      { label: "Languages/Tools", values: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "GitHub Actions", "GitLab CI"] },
      { label: "Databases", values: ["Cloud-native Databases", "Redis Cache", "Monitoring DBs (Prometheus, Loki)"] },
      { label: "Features", values: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Monitoring & Alerts"] },
      { label: "Outcomes", values: ["Faster Releases", "Zero Downtime Deployments", "Automated Scaling", "Secure Infrastructure"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We provide infrastructure automation dashboards that show system health, cost usage, scaling behavior, and deployment analytics."
    }
  },
  {
    id: 6,
    title: "Cloud Consulting",
    description: "Expert cloud strategy and migration services for optimal performance",
    bgColor: "#F8F8F5",
    textColor: "gray-800",
    points: [
      { label: "Platforms", values: ["AWS", "Azure", "Google Cloud"] },
      { label: "Services", values: ["Cloud Migration", "Cloud Architecture", "Cost Optimization", "Managed Cloud"] },
      { label: "Languages/Tools", values: ["Terraform", "CloudFormation", "Kubernetes", "Serverless Framework", "Lambda"] },
      { label: "Databases", values: ["RDS", "BigQuery", "DynamoDB", "Firestore", "Snowflake"] },
      { label: "Features", values: ["Auto-scaling", "Load Balancing", "Serverless Computing", "Multi-region Deployment"] },
      { label: "Outcomes", values: ["Lower Cloud Costs", "Higher Availability", "Faster Performance", "Better Security Compliance"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build cloud governance dashboards to visualize spending, usage, performance, and compliance."
    }
  },
  {
    id: 7,
    title: "Cybersecurity",
    description: "Advanced security solutions protecting your digital infrastructure",
    bgColor: "#3a245f",
    textColor: "white",
    points: [
      { label: "Platforms", values: ["Cloud Security", "Enterprise Security", "Web & App Security"] },
      { label: "Security Tools", values: ["Burp Suite", "Nessus", "Metasploit", "OWASP ZAP", "SIEM Tools"] },
      { label: "Practices", values: ["Penetration Testing", "Vulnerability Scanning", "Code Audits", "Identity Management", "Data Encryption"] },
      { label: "Databases", values: ["Encrypted DBs", "Access Logs", "SIEM Data Stores"] },
      { label: "Features", values: ["Real-time Threat Alerts", "Compliance Reporting", "Secure Authentication", "API Protection"] },
      { label: "Outcomes", values: ["Reduced Breach Risk", "Safe Architecture", "Continuous Monitoring", "Improved Trust & Compliance"] }
    ],
    additionalOffering: {
      title: "Additional Offering",
      text: "We build security dashboards for real-time threat monitoring, user activity tracking, and compliance visibility."
    }
  }
];

function StepperSection() {
  const stepperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepperRef,
    offset: ["start start", "end end"]
  });

  // Calculate which step is active based on scroll progress
  const activeStepIndex = useTransform(
    scrollYProgress,
    stepperData.map((_, i) => i / (stepperData.length - 1)),
    stepperData.map((_, i) => i)
  );

  return (
    <section ref={stepperRef} className="relative bg-white" style={{ height: `${stepperData.length * 100}vh` }}>
      <div id="stepper-sticky-div" className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 -mt-16 md:-mt-20">
        <div className="container mx-auto max-w-[1400px] w-full">
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-normal text-center mb-8 md:mb-8"
          >
            Our Process
          </motion.h2>

          {/* Horizontal Stepper */}
          <div className="flex items-center justify-center mb-12 md:mb-12 px-2 sm:px-4 md:px-0">
            <div className="flex items-center justify-center w-full max-w-full">
              {stepperData.map((step, index) => {
                // Create distinct stages with pause effect
                const segmentSize = 1 / stepperData.length;
                const pauseDuration = 0.3; // 30% of segment for pause
                const transitionDuration = 0.2; // 20% for transition
                
                const stepProgress = useTransform(
                  scrollYProgress,
                  [
                    index * segmentSize,
                    index * segmentSize + transitionDuration * segmentSize,
                    index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                    (index + 1) * segmentSize
                  ],
                  [0, 1, 1, 1]
                );

                const dotScale = useTransform(stepProgress, [0, 0.5, 1], [0.8, 1.3, 1]);
                const dotOpacity = useTransform(stepProgress, [0, 0.5], [0.4, 1]);
                
                const lineScaleX = useTransform(
                  scrollYProgress,
                  [
                    index * segmentSize + (transitionDuration + pauseDuration) * segmentSize,
                    (index + 1) * segmentSize
                  ],
                  [0, 1]
                );

                return (
                  <div key={step.id} className="flex items-center">
                    {/* Dot */}
                    <motion.div
                      style={{ scale: dotScale, opacity: dotOpacity }}
                      className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-[#7f66A8] border-2 md:border-4 border-white shadow-lg flex items-center justify-center shrink-0"
                    >
                      <span className="text-white font-bold text-xs sm:text-sm md:text-xl">{step.id}</span>
                    </motion.div>

                    {/* Line to next step */}
                    {index < stepperData.length - 1 && (
                      <div className="relative w-6 sm:w-12 md:w-32 h-0.5 md:h-1 bg-gray-300 mx-0.5 sm:mx-1 md:mx-2 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          style={{ scaleX: lineScaleX }}
                          className="absolute top-0 left-0 w-full h-full bg-[#7f66A8] origin-left"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Text Content - Shows based on active step */}
          <div className="flex items-center justify-center flex-1 max-w-4xl mx-auto relative px-4 min-h-[300px] md:min-h-[250px]">
            {stepperData.map((step, index) => {
              const segmentSize = 1 / stepperData.length;
              const fadeInEnd = 0.15;
              const holdStart = 0.15;
              const holdEnd = 0.7;
              const fadeOutStart = 0.7;
              
              const isLastStep = index === stepperData.length - 1;
              
              const textOpacity = useTransform(
                scrollYProgress,
                [
                  index * segmentSize,
                  index * segmentSize + fadeInEnd * segmentSize,
                  index * segmentSize + holdEnd * segmentSize,
                  (index + 1) * segmentSize
                ],
                isLastStep ? [0, 1, 1, 1] : [0, 1, 1, 0]
              );
              const textY = useTransform(
                scrollYProgress,
                [
                  index * segmentSize,
                  index * segmentSize + fadeInEnd * segmentSize,
                  index * segmentSize + holdEnd * segmentSize,
                  (index + 1) * segmentSize
                ],
                isLastStep ? [20, 0, 0, 0] : [20, 0, 0, -20]
              );

              return (
                <motion.div
                  key={step.id}
                  style={{ 
                    opacity: textOpacity, 
                    y: textY,
                    willChange: 'opacity',
                    WebkitFontSmoothing: 'antialiased',
                    backfaceVisibility: 'hidden'
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal text-black mb-6 md:mb-8 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4 mx-auto max-w-3xl">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DemoOne() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // First animation: Scale text as section enters from bottom to center
  const { scrollYProgress: scaleProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sectionHeight = useTransform(scaleProgress, [0, 1], isMobile ? [100, 180] : [150, 280]); // Smaller height on mobile
  const textScale = useTransform(scaleProgress, [0, 0.25, 0.5, 1], isMobile ? [0.5, 0.7, 0.9, 1] : [0.3, 0.55, 0.8, 1]); // Faster scaling on mobile

  return (
    <main className="App bg-white">
      <AetherFlowHero />
      
      {/* Sticky Section with Scaling Text */}
      <div
        ref={containerRef}
        className="relative bg-white pt-[5%] mb-0 md:mb-0"
        style={{
          height: isMobile ? '60vh' : '100vh'
        }}
      >
        <motion.section
          style={{
            position: 'sticky',
            top: '13%',
            height: sectionHeight,
            overflow: 'visible',
            zIndex: 1
          }}
          className="flex items-center justify-center px-4 sm:px-8 md:px-[13%]"
        >
          <motion.div
            style={{ scale: textScale }}
            className="text-center w-full font-normal leading-tight md:leading-none max-w-full md:max-w-none"
          >
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px]">
              Build Faster.<br />
             Operate Smarter.<br />
              Scale Confidently.
            </h2>  
          </motion.div>
        </motion.section>
      </div>
      
      <section className="bg-white -mt-35 md:mt-0">
        <ScrollStack 
          useWindowScroll={true}
          itemDistance={isMobile ? 150 : 400}
          itemStackDistance={isMobile ? 10 : 30}
          baseScale={isMobile ? 0.92 : 0.88}
          rotationAmount={0}
          blurAmount={isMobile ? 5 : 8}
          cardColors={cardsData.map(card => card.bgColor)}
        >
          {cardsData.map((card) => (
            <ScrollStackItem key={card.id} itemClassName="" style={{ backgroundColor: card.bgColor }}>
              <div className="space-y-2 md:space-y-6">
                <div>
                  <h2 className={`text-lg sm:text-xl md:text-3xl font-bold mb-1 md:mb-2 ${card.textColor === 'white' ? 'text-white' : 'text-gray-800'}`}>{card.title}</h2>
                  <p className={`text-xs sm:text-sm md:text-base leading-tight ${card.textColor === 'white' ? 'text-white/90' : 'text-gray-600'}`}>{card.description}</p>
                </div>
                <div className="">
                  {card.points.map((point, index) => (
                    <div key={index} className={`flex flex-col md:flex-row md:items-stretch ${card.textColor === 'white' ? 'border-b border-white/40' : 'border-b border-gray-800/20'}`}>
                      <div className={`px-2 py-1 md:px-4 md:py-3 ${card.textColor === 'white' ? 'md:border-r border-white/40' : 'md:border-r border-gray-800/20'} ${card.textColor === 'white' ? 'text-white' : 'text-gray-700'} font-semibold text-xs sm:text-sm md:text-sm md:min-w-[180px] text-left flex items-center`}>
                        {typeof point === 'string' ? `Point ${index + 1}` : point.label}
                      </div>
                      <div className="flex-1 flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 md:px-4 md:py-3 items-center">
                        {typeof point === 'string' ? (
                          <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 border rounded-full ${card.textColor === 'white' ? 'border-white/40 text-white/80' : 'border-gray-800/30 text-black'} text-[10px] sm:text-xs md:text-xs`}>
                            {point}
                          </div>
                        ) : (
                          point.values.map((value, valueIndex) => (
                            <div key={valueIndex} className={`px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 border rounded-full ${card.textColor === 'white' ? 'border-white/90 text-white' : 'border-gray-800/80 text-black'} text-[10px] sm:text-xs md:text-xs whitespace-nowrap`}>
                              {value}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {card.additionalOffering && (
                  <div className={`mt-2 pt-2 md:mt-4 md:pt-4`}>
                    <h3 className={`text-sm sm:text-base md:text-base font-semibold mb-1 ${card.textColor === 'white' ? 'text-white' : 'text-gray-800'}`}>
                      {card.additionalOffering.title}
                    </h3>
                    <p className={`text-xs sm:text-sm md:text-sm leading-tight ${card.textColor === 'white' ? 'text-white/80' : 'text-gray-600'}`}>
                      {card.additionalOffering.text}
                    </p>
                  </div>
                )}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* Dynamic Stepper Section */}
      <StepperSection />

      <section className="relative px-6 pb-20 bg-white">
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
              className="w-full h-[400px] object-cover"
              ref={(video) => {
                if (video) {
                  video.playbackRate = 0.6;
                }
              }}
            >
              <source src="/large4.mp4" type="video/mp4" />
            </video>

            {/* Dark Blur Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-5"></div>

            {/* Text at top-left */}
            <div className="absolute top-0 left-0 p-8 sm:p-12 z-10">
              <h2 className="text-white font-normal leading-tight text-2xl sm:text-3xl md:text-[3.25rem] max-w-2xl">
                Ready to build AI that produces ROI, not experiments?
              </h2>
            </div>

            {/* Button at bottom-left */}
            <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-10">
              <Link
                href="/get-started?service=Technology%20Services"
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

    </main>
  );
}
