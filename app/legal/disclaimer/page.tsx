'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8
    } 
  }
};

export default function DisclaimerPage() {
  const lastUpdated = 'November 16, 2025';
  const [activePoint, setActivePoint] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      number: "01",
      title: "General Information & Website Content Accuracy",
      points: [
        "All information on aidacorp.in and dashboard.aidacorp.in is for general informational purposes only and provided in good faith",
        "Content may contain technical inaccuracies, typographical errors, or outdated information that is subject to change without notice",
        "We make no representation or warranty (express or implied) regarding accuracy, adequacy, validity, reliability, availability, or completeness",
        "Information should not be relied upon as the sole basis for making business, legal, financial, or technical decisions",
        "Different sections of our Sites may be updated at different times, resulting in potential inconsistencies",
        "We reserve the right to modify, update, or remove content at any time without prior notice or liability",
        "Content is provided 'as is' without warranties of merchantability, fitness for purpose, or non-infringement"
      ]
    },
    {
      number: "02",
      title: "No Professional Advice or Attorney-Client Relationship",
      points: [
        "Content does not constitute professional, legal, financial, technical, tax, accounting, or business advice and should not be construed as such",
        "We are not your attorneys, accountants, financial advisors, or consultants - no professional relationship is created through use of our Sites",
        "Before making decisions, consult qualified professionals in relevant fields (legal, financial, technical, regulatory)",
        "Any reliance on information from our Sites is strictly at your own risk and we disclaim all liability for decisions made based on our content",
        "Professional services require detailed understanding of your specific situation which cannot be provided through general website content",
        "Regulations and laws vary by jurisdiction - consult local professionals for compliance guidance specific to your location"
      ]
    },
    {
      number: "03",
      title: "Service Results, Performance & Outcome Disclaimers",
      points: [
        "We make NO GUARANTEES regarding specific results, outcomes, ROI, revenue increases, cost savings, or business success from our services",
        "Results vary significantly based on client cooperation, market conditions, competition, execution quality, timing, and factors beyond our control",
        "Past performance, case studies, and testimonials do not guarantee future results and may not be representative of typical client experiences",
        "Service deliverables, timelines, and project scopes are estimates subject to change based on complexity, requirements, and unforeseen circumstances",
        "Success depends on your active participation, timely feedback, resource allocation, and implementation of recommendations",
        "We do not guarantee compatibility, integration success, or seamless functionality with your existing systems or third-party platforms",
        "Project outcomes may differ from initial proposals due to changing requirements, technical limitations, or discoveries during implementation"
      ]
    },
    {
      number: "04",
      title: "External Links & Third-Party Content Disclaimer",
      points: [
        "Our Sites contain links to external websites, resources, and third-party services NOT provided, maintained, or controlled by AIDA Corporation",
        "We have NO CONTROL over content, privacy policies, security practices, or availability of third-party sites and expressly disclaim all responsibility",
        "Inclusion of links does NOT imply recommendation, endorsement, approval, or affiliation with linked sites or their content",
        "We are not liable for any loss, damage, data breaches, or issues arising from use of third-party sites, products, or services",
        "Third-party sites have their own terms of service, privacy policies, and disclaimers which you should review before use",
        "We do not guarantee accuracy, relevance, timeliness, completeness, or legality of information on external sites",
        "You access external links at your own risk - verify legitimacy and security before providing personal or financial information",
        "Report broken, malicious, or inappropriate links to legal@aidacorp.in for investigation and removal"
      ]
    },
    {
      number: "05",
      title: "Technical Solutions, Software & Technology Services Disclaimer",
      points: [
        "All software, code, applications, and technical solutions are provided 'AS IS' without warranties of any kind (express or implied)",
        "We do NOT guarantee error-free, uninterrupted, secure, or bug-free operation of software, applications, dashboards, or technical systems",
        "Software may contain defects, errors, vulnerabilities, security flaws, or compatibility issues despite our quality assurance efforts",
        "We are NOT responsible for data loss, corruption, security breaches, downtime, or business interruption resulting from software use",
        "YOU are responsible for regular backups, data recovery planning, security measures, and disaster recovery procedures",
        "Third-party integrations, APIs, libraries, and dependencies have their own limitations, disclaimers, and may change without notice",
        "Technical specifications, system requirements, and performance metrics are estimates and may vary based on hardware, network, configuration",
        "Compatibility with all operating systems, browsers, devices, and platforms is NOT guaranteed - test thoroughly in your environment",
        "Software updates, patches, and new versions may introduce breaking changes, require migration, or alter functionality"
      ]
    },
    {
      number: "06",
      title: "Dashboard.aidacorp.in Platform & Service Availability Disclaimer",
      points: [
        "Dashboard availability, uptime, and performance are NOT guaranteed - downtime may occur for maintenance, upgrades, security patches, or technical issues",
        "Data displayed on dashboard is for informational purposes only - we do NOT guarantee accuracy, completeness, real-time synchronization, or reliability",
        "Real-time data may experience delays, latency, synchronization issues, or temporary inaccuracies due to network, database, or processing constraints",
        "YOU are responsible for verifying critical information, making independent decisions, and not relying solely on dashboard data for business operations",
        "Dashboard features, functionality, UI/UX, data fields, and integrations may change, be deprecated, or removed without prior notice",
        "We are NOT liable for decisions, losses, or damages resulting from reliance on dashboard information, analytics, reports, or recommendations",
        "Security measures (encryption, authentication, access controls) are in place but cannot guarantee absolute protection against all threats",
        "YOU are responsible for maintaining confidentiality of login credentials, enabling MFA, monitoring account activity, and reporting suspicious access",
        "Session timeouts, concurrent user limits, API rate limiting, and data export restrictions may apply based on your subscription plan"
      ]
    },
    {
      number: "07",
      title: "Limitation of Liability & Damages Exclusion",
      points: [
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, AIDA Corporation, its officers, directors, employees, contractors, agents, and affiliates SHALL NOT BE LIABLE for:",
        "ANY indirect, incidental, special, consequential, punitive, or exemplary damages regardless of theory of liability (contract, tort, negligence, strict liability)",
        "Loss of profits, revenue, sales, data, business opportunities, goodwill, reputation, or use - whether direct or indirect",
        "Business interruption, work stoppage, system failures, data corruption, or operational delays",
        "Damages from unauthorized access, data breaches, cyber attacks, hacking, malware, viruses, or security incidents",
        "Errors, bugs, inaccuracies, omissions, or delays in content, services, deliverables, or communications",
        "Personal injury, property damage, emotional distress, or consequential harm from use of our Sites or services",
        "Third-party conduct, content, products, services, or actions on or through our Sites",
        "OUR TOTAL AGGREGATE LIABILITY shall not exceed amount paid by you in preceding 12 months or $10,000 USD, whichever is LESS"
      ]
    },
    {
      number: "08",
      title: "No Warranties - Express or Implied Disclaimers",
      points: [
        "SERVICES AND SITES ARE PROVIDED 'AS IS' and 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND",
        "We DISCLAIM all warranties, express or implied, including: merchantability, fitness for particular purpose, non-infringement, title, quiet enjoyment",
        "We do NOT warrant that Sites will be secure, uninterrupted, error-free, virus-free, or meet your specific requirements",
        "We do NOT warrant accuracy, reliability, timeliness, completeness, or quality of content, services, or results",
        "We do NOT warrant that defects will be corrected, that services will continue to be offered, or that functionality will remain unchanged",
        "Third-party content, products, services, and integrations are provided without warranties from us",
        "Some jurisdictions do not allow exclusion of implied warranties, so some exclusions may not apply to you",
        "YOU assume all risk for use of our Sites and services - evaluate suitability for your specific needs before use"
      ]
    },
    {
      number: "09",
      title: "Big Data, Analytics & Data Science Services Disclaimer",
      points: [
        "Data analysis, insights, reports, visualizations, and predictive models are for INFORMATIONAL PURPOSES ONLY - not guaranteed to be accurate or complete",
        "Data sources (public datasets, client data, third-party data) may contain errors, omissions, biases, inconsistencies, or outdated information",
        "Historical data, trends, and patterns do NOT predict future outcomes - market conditions, behaviors, and variables change",
        "Statistical models, machine learning algorithms, and predictive analytics have inherent limitations, assumptions, and margins of error",
        "YOU are responsible for validating data quality, verifying analysis results, and making independent decisions based on business judgment",
        "We are NOT liable for decisions, strategies, investments, or actions taken based on our data analysis, reports, or recommendations",
        "Data privacy, security, compliance (GDPR, CCPA, DPDP Act) is a SHARED responsibility - ensure your data handling practices comply with regulations",
        "Data processing may involve international transfers, cloud storage, and third-party tools with their own security and privacy considerations"
      ]
    },
    {
      number: "10",
      title: "Artificial Intelligence & Machine Learning Disclaimer",
      points: [
        "AI/ML models, algorithms, and systems may produce unexpected, incorrect, biased, discriminatory, or nonsensical results",
        "Model accuracy, precision, recall, F1 scores, and performance metrics are NOT guaranteed and vary with data quality, quantity, and distribution",
        "AI-generated content (text, images, code, recommendations) MUST be reviewed, validated, and approved by qualified humans before use",
        "Models are trained on historical data which may NOT reflect current conditions, edge cases, or future scenarios",
        "We are NOT responsible for decisions, actions, or outcomes resulting from AI/ML outputs, predictions, or recommendations",
        "AI/ML systems require ongoing monitoring, retraining, fine-tuning, and updates to maintain performance and accuracy",
        "Bias in training data, algorithms, or feature selection may result in unfair, discriminatory, or unethical outcomes",
        "Explainability, interpretability, and transparency of AI models may be limited (black box problem)",
        "Ethical considerations (fairness, accountability, transparency) must be evaluated for your specific use case and jurisdiction"
      ]
    },
    {
      number: "11",
      title: "Digital Marketing & Advertising Campaign Disclaimer",
      points: [
        "Marketing results (ROI, ROAS, conversions, leads, traffic, engagement, brand awareness) are NOT guaranteed",
        "Performance depends on: market conditions, competition, audience behavior, platform algorithms, ad quality, targeting, budget, timing",
        "Campaign metrics (impressions, clicks, CTR, conversions) are estimates and may vary from actual results due to tracking limitations",
        "We do NOT guarantee specific rankings (SEO), traffic volumes, sales increases, or lead generation targets",
        "Third-party platforms (Google Ads, Facebook, LinkedIn, Instagram, TikTok) have their own policies, limitations, and algorithm changes",
        "Algorithm updates, policy changes, or platform outages by third parties may affect campaign performance unexpectedly",
        "Advertising budgets do NOT guarantee proportional results - higher spending does not automatically equal better outcomes",
        "Compliance with advertising regulations (FTC, ASA, local laws) is a SHARED responsibility - ensure your ads comply"
      ]
    },
    {
      number: "12",
      title: "Pricing, Quotes, Payment & Currency Disclaimer",
      points: [
        "All prices, rates, and fees are subject to change without notice based on market conditions, costs, or business decisions",
        "Quotes, proposals, and estimates are valid ONLY for the period specified (typically 30 days) and may expire or require revision",
        "Final pricing may vary from initial quotes based on actual project scope, requirements, complexity, timeline changes, or discoveries",
        "Additional fees, charges, or costs may apply for: out-of-scope work, rush delivery, premium support, third-party services, licenses",
        "All prices are EXCLUSIVE of applicable taxes (GST, VAT, sales tax) unless explicitly stated otherwise",
        "Currency exchange rates, conversion fees, and international transaction charges may affect pricing for international clients",
        "Payment terms, methods, schedules, and conditions are specified in individual service agreements and contracts",
        "Refund policies, cancellation fees, and termination terms are outlined in our Terms & Conditions"
      ]
    },
    {
      number: "13",
      title: "Testimonials, Case Studies & Client Success Stories Disclaimer",
      points: [
        "Testimonials, reviews, ratings, and client feedback represent INDIVIDUAL experiences and may NOT be typical or representative of all clients",
        "Results showcased in case studies are NOT guaranteed and will vary significantly for each client based on numerous factors",
        "Testimonials may be voluntary, solicited, incentivized (discounts, gifts), or compensated - this does not affect authenticity but may indicate bias",
        "Some testimonials, reviews, or case studies may be edited for length, clarity, grammar, or to remove identifying information",
        "Case studies are simplified, generalized, or anonymized for illustration purposes and may omit challenges, limitations, or caveats",
        "Client names, logos, or identifying information may be anonymized, pseudonymized, or omitted to protect confidentiality",
        "Past success, achievements, or results do NOT guarantee future outcomes - your results may differ significantly",
        "Before making decisions, evaluate your unique situation, goals, resources, and constraints"
      ]
    },
    {
      number: "14",
      title: "Intellectual Property Rights & Ownership Disclaimer",
      points: [
        "ALL content on our Sites (text, graphics, logos, images, videos, code, designs) is protected by copyright, trademark, and other IP laws",
        "Unauthorized use, reproduction, distribution, modification, public display, or derivative works are PROHIBITED and subject to legal action",
        "Trademarks, service marks, trade names, and logos are property of AIDA Corporation or respective owners - do not use without permission",
        "We do NOT claim ownership of client data, proprietary information, or work product unless explicitly specified in service agreements",
        "Third-party content, images, libraries, frameworks, and tools are used under license, with permission, or pursuant to fair use",
        "Copyright infringement, DMCA violations, or IP theft should be reported to legal@aidacorp.in with evidence for investigation",
        "We will respond to valid DMCA takedown notices and comply with intellectual property laws",
        "User-generated content may be subject to license grants specified in our Terms & Conditions"
      ]
    },
    {
      number: "15",
      title: "Force Majeure & Events Beyond Our Control",
      points: [
        "We shall NOT be liable for failure or delay in performance due to circumstances beyond our reasonable control, including:",
        "Acts of God: earthquakes, floods, fires, storms, hurricanes, tornadoes, tsunamis, volcanic eruptions, lightning strikes",
        "War, terrorism, armed conflict, civil unrest, riots, insurrection, military actions, embargoes, sanctions",
        "Government actions, laws, regulations, orders, restrictions, lockdowns, import/export controls",
        "Pandemics, epidemics, public health emergencies, quarantines, or disease outbreaks (e.g., COVID-19)",
        "Labor disputes, strikes, lockouts, slowdowns, or workforce shortages",
        "Network infrastructure failures, internet outages, ISP disruptions, DNS attacks, DDoS attacks, cyber attacks",
        "Power outages, utility failures, telecommunications disruptions, or energy shortages",
        "Supplier failures, vendor bankruptcies, material shortages, or supply chain disruptions",
        "Natural disasters, extreme weather, or catastrophic events beyond our control"
      ]
    },
    {
      number: "16",
      title: "Errors, Omissions & Content Accuracy Disclaimer",
      points: [
        "Despite our efforts, Sites may contain technical inaccuracies, typos, grammatical errors, or factual mistakes",
        "Prices, specifications, descriptions, availability, features, or dates may be incorrect, outdated, or inconsistent",
        "We reserve the right to correct errors, omissions, or inaccuracies at any time without prior notice or liability",
        "We are NOT responsible for errors in third-party content, user-generated content, or external sources",
        "If you identify errors, inaccuracies, broken links, or outdated information, please report to info@aidacorp.in",
        "We will make commercially reasonable efforts to correct identified errors promptly",
        "Errors do not create obligations or entitlements - we may void transactions, quotes, or agreements containing errors"
      ]
    },
    {
      number: "17",
      title: "No Endorsement of Third Parties or Products",
      points: [
        "Unless explicitly stated in writing, we do NOT endorse any third-party products, services, companies, brands, or organizations",
        "Mention, discussion, or display of products/services does NOT imply recommendation, approval, endorsement, or quality guarantee",
        "We are NOT responsible for third-party claims, representations, warranties, or marketing materials",
        "Third-party partnerships, integrations, or affiliations do NOT constitute endorsements of their products or practices",
        "Testimonials, case studies, or client quotes do NOT represent our opinions, guarantees, or endorsements",
        "Evaluate third-party offerings independently based on your needs, budget, and due diligence"
      ]
    },
    {
      number: "18",
      title: "Geographic Limitations & Jurisdictional Restrictions",
      points: [
        "Our services and Sites may NOT be available, appropriate, or legal in all geographic locations or jurisdictions",
        "Content may NOT comply with laws, regulations, or cultural norms in all countries or regions",
        "We make NO representation that content is appropriate for use outside India or complies with international laws",
        "Access from locations where content, services, or activities are illegal, restricted, or prohibited is FORBIDDEN",
        "YOU are responsible for compliance with local laws, export controls, sanctions, and regulations in your jurisdiction",
        "Some features, services, payment methods, or content may be restricted, unavailable, or modified based on your location",
        "International users may experience higher latency, slower speeds, or limited support due to geographic distance"
      ]
    },
    {
      number: "19",
      title: "Indemnification by Users & Clients",
      points: [
        "YOU agree to indemnify, defend, and hold harmless AIDA Corporation, its officers, directors, employees, contractors, agents, licensors, and suppliers from:",
        "Any claims, demands, lawsuits, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from:",
        "Your use or misuse of our Sites, services, software, or content",
        "Violation of these disclaimers, Terms & Conditions, Privacy Policy, or applicable laws",
        "Violation of third-party rights (intellectual property, privacy, confidentiality, contractual rights)",
        "Any content you submit, upload, post, transmit, or share through our Sites",
        "Breach of confidentiality, non-disclosure, or security obligations",
        "Willful misconduct, negligence, fraud, or unlawful activities",
        "This indemnification obligation survives termination of services or agreements"
      ]
    },
    {
      number: "20",
      title: "Modifications, Updates & Changes to Disclaimer",
      points: [
        "We reserve the right to modify, update, revise, or replace this Disclaimer at any time for any reason",
        "Changes will be posted on this page with updated 'Last Updated' date at the top",
        "Material changes may be communicated via email to registered users or prominent notice on Sites",
        "Continued use of Sites after changes constitutes acceptance of modified Disclaimer",
        "Previous versions are available upon request to legal@aidacorp.in for historical reference",
        "We recommend reviewing this Disclaimer periodically to stay informed of updates",
        "If you disagree with changes, you must discontinue use of our Sites and services"
      ]
    },
    {
      number: "21",
      title: "Severability, Waiver & Entire Agreement",
      points: [
        "If any provision is found invalid, illegal, or unenforceable by a court, it will be modified to minimum extent necessary to make it valid",
        "If modification is not possible, the invalid provision will be severed without affecting remaining provisions",
        "Remaining provisions will continue in full force and effect",
        "No waiver of any term shall constitute waiver of other terms or future violations",
        "Our failure to enforce any right does not waive that right or future enforcement",
        "This Disclaimer, together with Terms & Conditions, Privacy Policy, and Cookie Policy, constitutes entire agreement",
        "Headings are for convenience only and do not affect interpretation"
      ]
    },
    {
      number: "22",
      title: "Contact Information for Questions & Legal Notices",
      points: [
        "For questions about this Disclaimer, legal notices, or to request clarification, contact:",
        "Email: legal@aidacorp.in (legal and compliance inquiries)",
        "Email: info@aidacorp.in (general questions)",
        "Phone: +91-6307358822 (business hours: 9 AM - 6 PM IST, Mon-Fri)",
        "Mailing Address: AIDA Corporation Private Limited, Park Avenue Building, RTO Road, Andheri West, Mumbai 400 053, Maharashtra, INDIA",
        "We aim to respond to inquiries within 5 business days (urgent matters within 48 hours)",
        "For urgent legal matters, mark correspondence as 'URGENT - LEGAL' in subject line"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Unique Grid Pattern */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#7f66A8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#5919C1] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[35%_40%_25%] md:grid-rows-2 gap-0 border-b-2 border-[#7f66A8]/30">
          {/* Top Row */}
          {/* Top Left Box - Warning Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-center bg-white border-r border-b border-[#DCDCDC] p-8"
          >
            <svg className="w-20 h-20 md:w-24 md:h-24 text-[#7f66A8]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>

          {/* Top Middle Box - TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-12 py-12 md:py-16 flex flex-col justify-between border-b border-[#DCDCDC]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[#7f66A8]">
              Disclaimer
            </h1>
            <p className="text-base md:text-lg text-black/90 font-light">
              Important limitations, exclusions, and legal notices for use of our Sites and services.
            </p>
          </motion.div>

          {/* Top Right Box - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white flex flex-col items-center justify-center border-l border-b border-[#DCDCDC] p-8"
          >
            <div className="text-4xl md:text-5xl font-light text-[#7f66A8] mb-2">22</div>
            <div className="text-xs md:text-sm text-gray-600 font-light text-center">Critical Sections</div>
          </motion.div>

          {/* Bottom Row */}
          {/* Bottom Left Box - Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex items-center justify-center"
          >
            <p className="text-xl md:text-2xl font-light text-center">
              Read carefully - limits our liability
            </p>
          </motion.div>

          {/* Bottom Middle Box - Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex flex-col items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Bottom Right Box - Legal Contact Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white border-l border-[#DCDCDC] p-0"
          >
            <Link
              href="/contact"
              className="w-full h-full flex flex-col items-center justify-center p-8 text-lg font-medium bg-[#7f66A8] text-white hover:bg-[#5919C1] transition-all group"
            >
              <svg className="w-6 h-6 mb-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Contact Legal</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Content Section */}
      <section className="py-16 md:py-24 bg-white border-b border-[#dcdcdc]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Grid Layout - Each Row with 8% / 92% split */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-0 border-2 border-[#7f66A8]/30 bg-white"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.01,
                  duration: 0.4
                }}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(-1)}
                className={`
                  grid grid-cols-[8%_92%] border-b-2 border-[#7f66A8]/10 last:border-b-0 transition-colors duration-200
                  ${activePoint === index ? 'bg-[#7f66A8]/5' : 'bg-white'}
                `}
              >
                {/* Left Section - Number (8%) */}
                <div className={`
                  flex flex-col items-center justify-start p-6 md:p-8 border-r-2 transition-all duration-200
                  ${activePoint === index ? 'bg-[#7f66A8]/10 border-r-4 border-[#7f66A8]' : 'border-[#7f66A8]/20'}
                `}>
                  <span className={`
                    text-5xl md:text-6xl font-extralight transition-colors duration-200
                    ${activePoint === index ? 'text-[#7f66A8]' : 'text-gray-200'}
                  `}>
                    {section.number}
                  </span>
                </div>

                {/* Right Section - Title & Points (92%) */}
                <div className="p-6 md:p-8">
                  <h2 className={`
                    text-xl md:text-2xl font-normal mb-6 transition-colors duration-200
                    ${activePoint === index ? 'text-[#7f66A8]' : 'text-black'}
                  `}>
                    {section.title}
                  </h2>
                  
                  {/* Bullet Points */}
                  <>
                    <AnimatePresence mode="sync">
                      {section.points.length > 6 ? (
                        expandedSections.has(index) ? (
                          section.points.map((point, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-start gap-3 text-gray-700 leading-relaxed font-light mb-3"
                              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <span className={`
                                mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200
                                ${activePoint === index ? 'bg-[#7f66A8]' : 'bg-gray-400'}
                              `}></span>
                              <span>{point}</span>
                            </motion.div>
                          ))
                        ) : (
                          section.points.slice(0, 3).map((point, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-start gap-3 text-gray-700 leading-relaxed font-light mb-3"
                              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <span className={`
                                mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200
                                ${activePoint === index ? 'bg-[#7f66A8]' : 'bg-gray-400'}
                              `}></span>
                              <span>{point}</span>
                            </motion.div>
                          ))
                        )
                      ) : (
                        section.points.map((point, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start gap-3 text-gray-700 leading-relaxed font-light mb-3"
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <span className={`
                              mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200
                              ${activePoint === index ? 'bg-[#7f66A8]' : 'bg-gray-400'}
                            `}></span>
                            <span>{point}</span>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                    {section.points.length > 6 && (
                      <button
                        onClick={() => toggleSection(index)}
                        className="flex items-center justify-between w-full mt-4 px-4 py-2 text-sm font-medium text-[#7f66A8] hover:text-[#7f66A8]/80 transition-colors duration-200 border border-[#7f66A8]/20 hover:border-[#7f66A8]/30 rounded"
                      >
                        <span>{expandedSections.has(index) ? 'Collapse' : 'Expand'}</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-200 ${expandedSections.has(index) ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          {expandedSections.has(index) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          )}
                        </svg>
                      </button>
                    )}
                  </>
                
                </div>
              </motion.div>
            ))}          </motion.div>

          {/* Legal Contact Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white border-2 border-[#7f66A8]/30 p-8 md:p-12 relative overflow-hidden"
          >

            
            <h3 className="text-3xl md:text-4xl font-normal text-center mb-8 text-[#7f66A8]">Legal Contact Information</h3>
            
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#DCDCDC]">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Company Name</td>
                  <td className="py-6 px-8 font-light text-lg">AIDA Corporation Private Limited</td>
                </tr>
               
                <tr className="border-b border-[#DCDCDC]">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">General Email</td>
                  <td className="py-6 px-8 font-light text-lg"><a href="mailto:info@aidacorp.in" className="text-[#5919C1] hover:underline">info@aidacorp.in</a></td>
                </tr>
                <tr className="border-b border-[#DCDCDC] bg-gray-50/50">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Phone</td>
                  <td className="py-6 px-8 font-light text-lg">+91-6307358822</td>
                </tr>
                <tr className="border-b border-[#DCDCDC]">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Address</td>
                  <td className="py-6 px-8 font-light text-lg">Park Avenue Building, RTO Road, Andheri West, Mumbai 400 053, India</td>
                </tr>
                <tr>
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Response Time</td>
                  <td className="py-6 px-8 font-light text-lg">Within 5 business days (48 hours for urgent matters)</td>
                </tr>
              </tbody>
            </table>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-700 mt-8 p-6 bg-[#7f66A8]/5 border-l-4 border-[#5919C1] font-light text-lg"
            >
              <span className="font-normal text-[#7f66A8]">Important Notice:</span> This disclaimer limits our liability and sets expectations. By using our Sites, you acknowledge and agree to these limitations.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

