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

export default function TermsOfServicePage() {
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
      title: "1. Acceptance of Terms",
      content: "By accessing and using aidacorp.in (\"Website\") and dashboard.aidacorp.in (\"Dashboard\"), collectively \"Sites\", you accept and agree to be bound by these Terms and Conditions. If you disagree, please discontinue use immediately."
    },
    {
      title: "2. Scope of Services",
      content: "These terms apply to all services offered through our Sites including Big Data & Analysis, Artificial Intelligence solutions, Technology Services, Digital Marketing, Dashboard features, consultation services, project proposals, deliverables, and all digital assets created by AIDA Corporation."
    },
    {
      title: "3. Definitions",
      content: "\"Services\" includes all offerings provided through our Sites. \"User\" refers to any individual or entity accessing our Sites. \"Content\" includes all text, graphics, data, proposals, assets, chat messages, and materials. \"AIDA Assets\" refers to all proposals, designs, strategies, reports, analyses, presentations, dashboards, algorithms, code, chat conversations, and any materials created by AIDA Corporation."
    },
    {
      title: "4. Intellectual Property & AIDA Assets Protection",
      content: "All AIDA Assets including proposals, strategic documents, designs, data analyses, AI models, machine learning algorithms, reports, presentations, marketing materials, website designs, dashboard configurations, chat messages, requests, and shared data remain the exclusive intellectual property and copyright of AIDA Corporation until full payment is received and explicit written transfer of rights is provided. Unauthorized use, reproduction, distribution, modification, or disclosure of AIDA Assets is strictly prohibited and subject to legal action including injunctive relief and monetary damages."
    },
    {
      title: "5. Customer Data & Shared Information",
      content: "Any data, information, business intelligence, project requirements, requests, or chat messages shared by customers with AIDA Corporation are protected under strict confidentiality agreements and applicable data protection laws including GDPR, CCPA, and India's Digital Personal Data Protection Act 2023. We implement enterprise-grade security measures to protect your proprietary information. We will not disclose, sell, or share customer information to third parties without explicit written consent, except as required by law or legal process."
    },
    {
      title: "6. Payment Terms & Asset Release",
      content: "Payment terms are specified in individual service agreements and project proposals. AIDA Assets, deliverables, source code, design files, data models, AI algorithms, marketing campaigns, and final materials will be released to customers only upon: receipt of full payment as agreed, clearance of all outstanding invoices, completion of any agreed milestones, and execution of asset transfer agreement. Partial payments do not entitle customers to partial ownership, usage rights, or access to AIDA Assets. All intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets remain with AIDA Corporation until full payment settlement and formal transfer."
    },
    {
      title: "7. Proposal & Quote Validity",
      content: "All proposals, quotes, estimates, and project plans provided by AIDA Corporation are: valid for 30 days from the date of issue unless otherwise stated, subject to change based on project scope modifications or market conditions, confidential and proprietary to AIDA Corporation, not to be shared with third parties or competitors without written permission, and prepared based on information provided by the client. Proposals remain AIDA Corporation's intellectual property regardless of project acceptance or rejection. Any technical specifications, methodologies, or strategies outlined in proposals are confidential and protected."
    },
    {
      title: "8. Chat Messages, Communications & Support",
      content: "All chat conversations, email communications, support tickets, video calls, and request submissions through our Sites or communication channels are: recorded and stored securely with industry-standard encryption, protected under confidentiality and attorney-client privilege where applicable, used for service delivery, quality assurance, training, and legal compliance, retained according to data retention policies outlined in our Privacy Policy, and may be monitored for security and fraud prevention. Customer support is provided during business hours with response times defined in service level agreements."
    },
    {
      title: "9. Website & Dashboard Usage",
      content: "Access to aidacorp.in and dashboard.aidacorp.in is subject to these terms. Users must: create accounts with accurate and complete information, maintain security of account credentials and not share access, comply with acceptable use policies and not engage in malicious activities, respect intellectual property rights of all content, not attempt to reverse engineer, hack, or compromise our systems, and use services only for lawful business purposes. We reserve the right to suspend or terminate accounts for violations, security threats, or non-payment."
    },
    {
      title: "10. Cookies & Tracking Technologies",
      content: "Our Sites use cookies, pixels, local storage, and similar tracking technologies for: essential site functionality and security, analytics to understand user behavior and improve services, user preference storage and personalization, session management and authentication, marketing and advertising optimization, and fraud prevention. Users can control cookie preferences through browser settings. Detailed cookie information is available in our Cookie Policy. By using our Sites, you consent to our use of cookies as described."
    },
    {
      title: "11. Service Modifications & Delivery",
      content: "Services are delivered as outlined in signed agreements and project specifications. Any modifications to project scope, timeline, deliverables, or technical requirements require written approval through formal change request process and may result in additional fees, timeline adjustments, or resource allocation changes. We reserve the right to: refuse service for any reason, terminate agreements for non-payment or breach of terms, modify service offerings and pricing with notice, and subcontract work to qualified partners under confidentiality agreements."
    },
    {
      title: "12. Confidentiality & Non-Disclosure",
      content: "Both parties agree to maintain strict confidentiality of all proprietary information, business strategies, technical specifications, data models, algorithms, source code, proposals, financial information, customer lists, and communications shared during the course of business. This obligation: continues indefinitely after termination of services, applies to all employees, contractors, and agents, requires written consent before disclosure to third parties, includes implementation of reasonable security measures, and survives termination of agreements. Exceptions include information already public or independently developed."
    },
    {
      title: "13. Data Protection & Privacy Compliance",
      content: "We comply with GDPR (General Data Protection Regulation), CCPA (California Consumer Privacy Act), and India's Digital Personal Data Protection Act 2023. Customer data is processed according to our Privacy Policy with: lawful basis for processing, appropriate technical and organizational security measures, data minimization and purpose limitation, user rights to access, rectify, delete, and port data, data breach notification within 72 hours as required, cross-border transfer safeguards, and appointment of Data Protection Officer. We conduct regular privacy impact assessments and security audits."
    },
    {
      title: "14. Third-Party Services & Integrations",
      content: "Our services may integrate with or rely on third-party platforms including cloud services (AWS, Google Cloud, Azure), analytics tools (Google Analytics), payment processors (Stripe, PayPal), communication services (Twilio, SendGrid), AI/ML platforms, and marketing automation tools. We are not responsible for third-party service availability, performance, data handling practices, pricing changes, or service discontinuation. Users should review third-party terms and privacy policies separately. We use commercially reasonable efforts to select reputable providers."
    },
    {
      title: "15. Service Level Agreements & Uptime",
      content: "While we strive to provide reliable services with maximum uptime, we do not guarantee uninterrupted or error-free service. Service level agreements (SLAs) are defined in individual contracts and may include: uptime commitments (typically 99.5% or higher), response time guarantees for support tickets, maintenance windows with advance notice, disaster recovery and business continuity procedures, and performance monitoring and reporting. We are not liable for downtime caused by factors beyond our reasonable control including force majeure events, third-party failures, or customer-caused issues."
    },
    {
      title: "16. Limitation of Liability",
      content: "To the maximum extent permitted by applicable law, AIDA Corporation shall not be liable for: any indirect, incidental, special, consequential, punitive, or exemplary damages; loss of profits, revenue, data, business opportunities, or goodwill; damages resulting from unauthorized access, data breaches, or cyber attacks; errors, bugs, or inaccuracies in deliverables or services; personal injury or property damage from use of our services; any viruses, malware, or malicious code; reliance on any information provided; and failure to achieve expected results. Our total aggregate liability shall not exceed the amount paid by you for services in the preceding 12 months or $10,000, whichever is less."
    },
    {
      title: "17. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless AIDA Corporation, its officers, directors, employees, contractors, agents, licensors, and suppliers from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from: your use or misuse of our services, violation of these Terms and Conditions, violation of any rights of third parties including intellectual property rights, violation of applicable laws or regulations, any content you submit, upload, or transmit through our services, breach of confidentiality obligations, and any willful misconduct or negligence."
    },
    {
      title: "18. Warranties & Disclaimers",
      content: "We warrant that services will be performed in a professional and workmanlike manner consistent with industry standards. HOWEVER, OUR SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO: IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE. We do not warrant that services will meet your specific requirements, be uninterrupted, timely, secure, or error-free, or that results will be accurate or reliable. You assume all risk for use of our services."
    },
    {
      title: "19. Force Majeure",
      content: "We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to: acts of God, natural disasters, epidemics or pandemics, war, terrorism, riots, civil unrest, embargoes, government actions, fire, floods, earthquakes, accidents, strikes or labor disputes, network infrastructure failures, power outages, internet service disruptions, cyber attacks, and shortages of transportation, fuel, energy, labor, or materials. During force majeure events, our obligations will be suspended and deadlines extended accordingly."
    },
    {
      title: "20. Termination",
      content: "We reserve the right to terminate or suspend access to our Sites and services immediately, without prior notice or liability, for any reason including: breach of these Terms and Conditions, non-payment of fees, fraudulent or illegal activities, security threats or malicious behavior, violation of intellectual property rights, and conduct harmful to us or third parties. Upon termination: your right to use services ceases immediately, we may delete your account and data after providing export opportunity, you remain liable for all fees incurred, confidentiality obligations survive, and we may retain data as required by law. You may terminate by providing written notice."
    },
    {
      title: "21. Dispute Resolution & Arbitration",
      content: "In the event of any dispute, claim, or controversy arising out of or relating to these Terms or services: Parties will first attempt to resolve through good-faith negotiations for 30 days. If negotiations fail, disputes may be referred to mediation with mutually agreed mediator. If mediation fails, disputes shall be resolved through binding arbitration in Mumbai, India under the Indian Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English language by a sole arbitrator or panel of three arbitrators as appropriate. Each party bears its own costs unless otherwise decided by arbitrator. Arbitration award shall be final and binding. This clause does not prevent either party from seeking injunctive relief in court for intellectual property violations."
    },
    {
      title: "22. Governing Law & Jurisdiction",
      content: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes not subject to arbitration will be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India. You consent to personal jurisdiction in Mumbai courts and waive any objections based on inconvenient forum. If you are accessing our services from outside India, you are responsible for compliance with local laws."
    },
    {
      title: "23. International Users & Export Compliance",
      content: "Our services are controlled and operated from India. We make no representation that services are appropriate or available for use in other locations. If you access services from other jurisdictions, you do so at your own risk and are responsible for compliance with local laws. You agree to comply with all applicable export control laws and regulations and represent that you are not on any government restricted parties list. You will not export, re-export, or transfer our technology to prohibited countries or persons."
    },
    {
      title: "24. Assignment & Transfer",
      content: "You may not assign, transfer, delegate, or sublicense these Terms or any rights or obligations hereunder without our prior written consent. Any attempted assignment in violation of this section is void. We may freely assign or transfer these Terms and any rights or obligations, including in connection with a merger, acquisition, corporate reorganization, or sale of assets. These Terms bind and benefit each party's permitted successors and assigns."
    },
    {
      title: "25. Severability",
      content: "If any provision of these Terms is found to be unenforceable, invalid, or illegal by a court of competent jurisdiction, that provision will be limited, modified, or eliminated to the minimum extent necessary so that these Terms otherwise remain in full force and effect and enforceable. The invalid or unenforceable provision will be replaced with a valid, enforceable provision that most closely matches the intent of the original provision."
    },
    {
      title: "26. Waiver",
      content: "No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by authorized representative. Waiver of one breach does not waive subsequent breaches."
    },
    {
      title: "27. Entire Agreement",
      content: "These Terms, together with our Privacy Policy, Cookie Policy, and any executed service agreements, constitute the entire agreement between you and AIDA Corporation regarding use of our Sites and services. These Terms supersede all prior agreements, understandings, representations, and warranties, whether written or oral. In case of conflict between these Terms and a signed service agreement, the service agreement shall control. These Terms may only be modified by written amendment signed by authorized representative."
    },
    {
      title: "28. Changes to Terms",
      content: "We reserve the right to modify, update, or revise these Terms at any time for any reason including: changes in law or regulatory requirements, new features or services, security or privacy updates, clarification of existing terms, and business or operational changes. Changes will be effective immediately upon posting on this page with updated \"Last Updated\" date. We will notify users of material changes via email or prominent notice on our Sites. Your continued use of services after changes constitutes acceptance of modified terms. If you do not agree to changes, you must discontinue use of services."
    },
    {
      title: "29. Notices",
      content: "All notices, requests, demands, and communications required or permitted under these Terms shall be in writing and delivered via: email to legal@aidacorp.in (for notices to us) or registered email address (for notices to you), certified mail or courier service, or through our dashboard notification system. Notices are deemed received when: email is delivered (excluding bounces), mail signature is obtained, or dashboard notification is viewed. You must keep your contact information current."
    },
    {
      title: "30. Contact Information",
      content: "For questions, concerns, or notices regarding these Terms and Conditions, please contact our legal department. We aim to respond to all inquiries within 5 business days. For urgent legal matters, mark correspondence as \"URGENT - LEGAL\" in the subject line."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Grid Layout */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#5919C1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF5722] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[30%_62%_8%] md:grid-rows-2 gap-0 border-b border-[#DCDCDC]">
          {/* Top Row */}
          {/* Top Left Box - EMPTY */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block bg-white/5 backdrop-blur-sm border-r border-b border-[#DCDCDC] p-8"
          >
          </motion.div>

          {/* Top Middle Box - TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-12 py-12 md:py-16 flex flex-col justify-between border-b border-[#DCDCDC]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[#5919C1]">
              Terms & Conditions
            </h1>
            <p className="text-base md:text-lg text-black/90 font-light self-end max-w-md text-right">
              Legal terms governing your use of AIDA Corporation services, protecting our intellectual property and your rights.
            </p>
          </motion.div>

          {/* Top Right Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white flex items-center justify-center border-l border-[#DCDCDC]"
          >
          </motion.div>

          {/* Bottom Row */}
          {/* Bottom Left Box - BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm border-r border-[#DCDCDC] p-0"
          >
            <Link
              href="/contact"
              className="w-full h-full flex items-start justify-between p-12 text-4xl font-medium bg-[#5919C1] text-white hover:bg-[#FF5722] transition-all"
            >
              <span>Contact Legal</span>
              <svg className="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Bottom Middle Box - TAGLINE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white border-r border-[#DCDCDC] p-12 flex flex-col items-center justify-center gap-4"
          >
            <p className="text-2xl md:text-3xl font-light text-center">
              Comprehensive legal protection for all AIDA services & assets
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Bottom Right Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white border-l border-[#DCDCDC] flex items-center justify-center"
          >
          </motion.div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-16 md:py-24 bg-white border-b border-[#DCDCDC]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Grid Layout - Each Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-0 border border-[#DCDCDC]"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.02,
                  duration: 0.5
                }}
                onMouseEnter={() => setActivePoint(index)}
                className={`
                  grid grid-cols-[10%_90%] border-b border-[#DCDCDC] last:border-b-0 transition-all duration-300
                  ${activePoint === index ? 'bg-gray-50' : 'bg-white hover:bg-gray-50/50'}
                `}
              >
                {/* Left Section - Number (10%) */}
                <div className={`
                  flex items-start justify-center p-6 md:p-8 border-r border-[#DCDCDC] transition-colors duration-300
                  ${activePoint === index ? 'bg-[#5919C1]/5' : ''}
                `}>
                  <span className={`
                    text-3xl md:text-4xl font-light transition-colors duration-300
                    ${activePoint === index ? 'text-[#5919C1]' : 'text-gray-400'}
                  `}>
                    {index + 1}
                  </span>
                </div>

                {/* Right Section - Title & Description (90%) */}
                <div className="p-6 md:p-8">
                  <h2 className={`
                    text-xl md:text-2xl font-normal mb-4 transition-colors duration-300
                    ${activePoint === index ? 'text-[#5919C1]' : 'text-black'}
                  `}>
                    {section.title.replace(/^\d+\.\s*/, '')}
                  </h2>
                  <div className="text-gray-700 leading-relaxed font-light space-y-3">
                    {section.content.includes(':') && section.content.split(':').length > 2 ? (
                      // If content has bullet points (contains colons)
                      <>
                        <p>{section.content.split(':')[0]}:</p>
                        {(() => {
                          const points = section.content.split(':').slice(1).filter(point => point.trim());
                          const isLong = points.length > 6;
                          const isExpanded = expandedSections.has(index);
                          const displayPoints = isLong && !isExpanded ? points.slice(0, 3) : points;
                          
                          return (
                            <>
                              <AnimatePresence mode="sync">
                                {displayPoints.map((point, i) => (
                                  point.trim() && (
                                    <motion.div 
                                      key={i} 
                                      className="relative pl-6 ml-6 mb-2"
                                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                      animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[#5919C1] rounded-full"></span>
                                      {point.trim().replace(/,$/, '')}
                                    </motion.div>
                                  )
                                ))}
                              </AnimatePresence>
                              {isLong && (
                                <button
                                  onClick={() => toggleSection(index)}
                                  className="flex items-center justify-between w-full mt-4 px-4 py-2 text-sm font-medium text-[#5919C1] hover:text-[#FF5722] transition-colors duration-200 border border-[#5919C1]/20 hover:border-[#FF5722]/30 rounded"
                                >
                                  <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                                  <svg 
                                    className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    {isExpanded ? (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    ) : (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    )}
                                  </svg>
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white border-2 border-[#DCDCDC] p-8 md:p-12 relative overflow-hidden"
          >
            
            
            <h3 className="text-3xl md:text-4xl font-normal text-center mb-8 text-[#5919C1]">Contact & Legal Information</h3>
            
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#DCDCDC]">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Company Name</td>
                  <td className="py-6 px-8 font-light text-lg">AIDA Corporation</td>
                </tr>
                <tr className="border-b border-[#DCDCDC] bg-gray-50/50">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Legal Email</td>
                  <td className="py-6 px-8 font-light text-lg"><a href="mailto:legal@aidacorp.in" className="text-[#FF5722] hover:underline">info@aidacorp.in</a></td>
                </tr>
                <tr className="border-b border-[#DCDCDC] bg-gray-50/50">
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Jurisdiction</td>
                  <td className="py-6 px-8 font-light text-lg">Mumbai, India</td>
                </tr>
                <tr>
                  <td className="py-6 px-8 font-normal text-lg text-[#5919C1] border-r border-[#DCDCDC]">Website</td>
                  <td className="py-6 px-8 font-light text-lg">aidacorp.in | dashboard.aidacorp.in</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
