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

type BulletItem = string | {
  subtitle: string;
  items: string[];
};

interface Section {
  title: string;
  bullets: BulletItem[];
}

export default function PrivacyPolicyPage() {
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

  const sections: Section[] = [
    {
      title: "Introduction & Commitment",
      bullets: [
        "This Privacy Policy governs how AIDA Corporation collects, uses, maintains and discloses information from users of aidacorp.in (Website) and dashboard.aidacorp.in (Dashboard), collectively \"Sites\"",
        "We are committed to protecting your privacy in compliance with GDPR (General Data Protection Regulation)",
        "Full compliance with CCPA (California Consumer Privacy Act)",
        "Adherence to India's Digital Personal Data Protection Act 2023",
        "Compliance with all applicable data protection laws worldwide",
        "Your trust is paramount to us",
        "We implement enterprise-grade security measures to safeguard your personal and business information"
      ]
    },
    {
      title: "Information We Collect",
      bullets: [
        {
          subtitle: "Personal Information:",
          items: [
            "Name, email address, phone number",
            "Company name and job title",
            "Billing address and payment information"
          ]
        },
        {
          subtitle: "Technical Information:",
          items: [
            "IP address, browser type and version",
            "Device information and operating system",
            "Screen resolution and unique device identifiers"
          ]
        },
        {
          subtitle: "Usage Data:",
          items: [
            "Pages visited and time spent on each page",
            "Clickstream data and referring/exit pages",
            "Date and time stamps",
            "Feature usage patterns"
          ]
        },
        {
          subtitle: "Communication Data:",
          items: [
            "All chat messages and email correspondence",
            "Support tickets and video call recordings",
            "Project requests and proposals submitted",
            "Feedback, reviews, and newsletter subscriptions"
          ]
        },
        {
          subtitle: "Business Intelligence:",
          items: [
            "Industry sector and company size",
            "Project requirements and budget ranges",
            "Strategic objectives shared for proposal development"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      bullets: [
        {
          subtitle: "Service Delivery:",
          items: [
            "Provide requested services and process transactions",
            "Deliver project proposals and assets",
            "Manage your account and dashboard access",
            "Provide customer support through multiple channels"
          ]
        },
        {
          subtitle: "Service Improvement:",
          items: [
            "Analyze usage patterns and optimize website performance",
            "Conduct A/B testing for user experience enhancement",
            "Develop new features and services",
            "Fix bugs and technical issues",
            "Improve AI/ML algorithms and data models"
          ]
        },
        {
          subtitle: "Communication:",
          items: [
            "Send order confirmations and invoices",
            "Provide project updates and status reports",
            "Respond to inquiries and support requests",
            "Send marketing communications with your consent",
            "Share important service announcements"
          ]
        },
        {
          subtitle: "Security & Compliance:",
          items: [
            "Protect against fraud, unauthorized access, and cyber attacks",
            "Comply with legal obligations and regulatory requirements",
            "Enforce our Terms and Conditions",
            "Resolve disputes and troubleshoot problems",
            "Conduct internal audits and security assessments"
          ]
        }
      ]
    },
    {
      title: "Chat Messages, Communications & Support",
      bullets: [
        {
          subtitle: "Recording & Storage:",
          items: [
            "All chat conversations, email exchanges, and support tickets are recorded",
            "Video calls and messages stored securely",
            "Industry-standard AES-256 encryption at rest",
            "TLS 1.3 encryption in transit"
          ]
        },
        {
          subtitle: "Purpose of Processing:",
          items: [
            "Providing timely customer support and service delivery",
            "Quality assurance and service improvement",
            "Training our support team and AI assistants",
            "Legal compliance and dispute resolution",
            "Fraud detection and security monitoring",
            "Analyzing customer satisfaction and feedback"
          ]
        },
        {
          subtitle: "Confidentiality Protection:",
          items: [
            "All communications protected under confidentiality obligations",
            "Attorney-client privilege where applicable",
            "Accessible only to authorized personnel with need-to-know access",
            "Not shared with third parties without your explicit consent",
            "Subject to strict data retention and deletion policies"
          ]
        },
        {
          subtitle: "Data Retention:",
          items: [
            "Communication logs retained for 3 years for service quality and legal compliance",
            "Deleted upon request subject to legal retention requirements",
            "Archived securely with restricted access after initial retention period"
          ]
        }
      ]
    },
    {
      title: "Proposals, AIDA Assets & Shared Customer Data",
      bullets: [
        {
          subtitle: "AIDA Assets Protection:",
          items: [
            "All proposals, strategic documents, and designs remain AIDA's exclusive intellectual property",
            "Reports, data analyses, and AI/ML algorithms are copyrighted",
            "Marketing materials, website designs, and dashboard configurations are protected",
            "Presentations and technical specifications are proprietary",
            "Full ownership until payment received and explicit written transfer of rights provided"
          ]
        },
        {
          subtitle: "Customer Data Protection:",
          items: [
            "Any data, information, or business intelligence shared by customers is protected",
            "Project requirements, strategic plans, and financial data secured",
            "Proprietary methodologies and competitive intelligence safeguarded",
            "Strict confidentiality agreements and data protection law compliance",
            "Access controls, encryption, and security measures prevent unauthorized access"
          ]
        },
        {
          subtitle: "Non-Disclosure Obligations:",
          items: [
            "We will not disclose, sell, share, or distribute your proprietary information",
            "Customer lists, business strategies, and technical specifications kept confidential",
            "No sharing with third parties, competitors, or unauthorized personnel",
            "Explicit written consent required for any disclosure",
            "Exceptions only for legal requirements, court orders, or regulatory authority"
          ]
        },
        {
          subtitle: "Secure Storage & Access:",
          items: [
            "SOC 2 Type II certified cloud infrastructure",
            "Encryption at rest and in transit",
            "Multi-factor authentication for access",
            "Regular security audits and penetration testing",
            "Intrusion detection and prevention systems",
            "Comprehensive backup and disaster recovery procedures"
          ]
        }
      ]
    },
    {
      title: "Cookies & Tracking Technologies",
      bullets: [
        {
          subtitle: "Essential Cookies (Cannot be disabled):",
          items: [
            "Site functionality and security",
            "Authentication and session management",
            "Load balancing and CSRF protection",
            "Cookie consent preferences"
          ]
        },
        {
          subtitle: "Performance/Analytics Cookies:",
          items: [
            "Google Analytics (_ga, _gid, _gat) for user behavior analysis",
            "Page views, time spent, and navigation paths",
            "Device, browser, and geographic location data",
            "Bounce rates, conversion tracking, and custom event tracking"
          ]
        },
        {
          subtitle: "Functional Cookies:",
          items: [
            "Language preferences and UI customizations",
            "Form auto-fill data and chat widget history",
            "Video player settings",
            "Personalized content preferences"
          ]
        },
        {
          subtitle: "Marketing/Targeting Cookies:",
          items: [
            "Building interest profiles for targeted advertisements",
            "Retargeting campaigns and ad effectiveness measurement",
            "Social media pixels (Facebook, LinkedIn)",
            "Conversion tracking and attribution modeling"
          ]
        },
        {
          subtitle: "Cookie Management:",
          items: [
            "Control preferences through browser settings",
            "Use our cookie banner and opt-out mechanisms",
            "Third-party tools available",
            "Withdraw consent at any time",
            "Detailed information in our Cookie Policy"
          ]
        }
      ]
    },
    {
      title: "Website & Dashboard Usage Monitoring",
      bullets: [
        {
          subtitle: "User Activity Tracking:",
          items: [
            "Login/logout times and IP addresses",
            "Pages and features accessed",
            "Actions performed and transactions completed",
            "File uploads and downloads",
            "API calls and database queries",
            "Search queries and filters applied",
            "Form submissions and input validation",
            "Error messages and system exceptions"
          ]
        },
        {
          subtitle: "Security Monitoring:",
          items: [
            "Failed login attempts and brute force detection",
            "Suspicious activity patterns and anomaly detection",
            "Unauthorized access attempts",
            "SQL injection and XSS attack prevention",
            "DDoS protection and rate limiting",
            "Malware scanning and threat intelligence",
            "Compliance with acceptable use policies"
          ]
        },
        {
          subtitle: "Performance Metrics:",
          items: [
            "Page load times and Core Web Vitals",
            "Server response times and latency",
            "Database query performance",
            "API endpoint performance",
            "CDN cache hit rates",
            "Bandwidth usage and data transfer",
            "Concurrent user sessions",
            "Resource utilization (CPU, memory, storage)"
          ]
        },
        {
          subtitle: "Dashboard Analytics:",
          items: [
            "Feature usage and adoption rates",
            "User engagement and session duration",
            "Workflow completion rates",
            "Report generation and exports",
            "Collaboration and team activities",
            "Integration usage with third-party services",
            "Custom dashboard configurations"
          ]
        },
        {
          subtitle: "Account Actions:",
          items: [
            "We reserve the right to suspend or terminate accounts for:",
            "Policy violations and security threats",
            "Malicious activities and non-payment",
            "Breach of terms"
          ]
        }
      ]
    },
    {
      title: "Third-Party Services & Data Sharing",
      bullets: [
        {
          subtitle: "Payment Processors:",
          items: [
            "Stripe for credit card processing",
            "PayPal for alternative payments",
            "Razorpay for Indian payment methods",
            "Wire transfer banking partners",
            "All payment data processed per PCI DSS standards"
          ]
        },
        {
          subtitle: "Analytics & Marketing:",
          items: [
            "Google Analytics for website analytics",
            "Google Ads for advertising campaigns",
            "Facebook Pixel for social media advertising",
            "LinkedIn Insight Tag for B2B marketing",
            "Mixpanel for product analytics",
            "Hotjar for user behavior analysis"
          ]
        },
        {
          subtitle: "Cloud Infrastructure:",
          items: [
            "Amazon Web Services (AWS) for cloud hosting and storage",
            "Google Cloud Platform for AI/ML services",
            "Microsoft Azure for enterprise services",
            "Cloudflare for CDN and DDoS protection"
          ]
        },
        {
          subtitle: "Communication Services:",
          items: [
            "EmailJS and SendGrid for transactional emails",
            "Twilio for SMS notifications and 2FA",
            "Zoom for video conferencing",
            "Slack for team collaboration",
            "WhatsApp Business API for customer support"
          ]
        },
        {
          subtitle: "Database & Backend:",
          items: [
            "Supabase for database and authentication",
            "PostgreSQL for relational data storage",
            "Redis for caching and session management",
            "Elasticsearch for search functionality"
          ]
        },
        {
          subtitle: "CRM & Support:",
          items: [
            "Customer relationship management systems",
            "Help desk and ticketing platforms",
            "Live chat widgets",
            "Knowledge base solutions"
          ]
        },
        {
          subtitle: "International Data Safeguards:",
          items: [
            "Data processing agreements with all providers",
            "Standard contractual clauses",
            "Adequate protection mechanisms",
            "Regular vendor security assessments",
            "Compliance with GDPR Article 46, CCPA, DPDP Act 2023"
          ]
        }
      ]
    },
    {
      title: "Data Security Measures",
      bullets: [
        {
          subtitle: "Encryption Standards:",
          items: [
            "TLS 1.3 for data in transit",
            "AES-256 for data at rest",
            "End-to-end encryption for sensitive communications",
            "Encrypted database fields for passwords and payment data",
            "SSL certificates for all Sites and APIs"
          ]
        },
        {
          subtitle: "Access Controls:",
          items: [
            "Role-based access control (RBAC)",
            "Multi-factor authentication (MFA) for admin access",
            "Principle of least privilege",
            "Session timeout and automatic logout",
            "IP whitelisting for administrative functions",
            "Regular access reviews and revocations"
          ]
        },
        {
          subtitle: "Network Security:",
          items: [
            "Firewalls and intrusion detection/prevention systems",
            "DDoS protection and rate limiting",
            "Web application firewall (WAF)",
            "Regular vulnerability scanning and penetration testing",
            "Security information and event management (SIEM)",
            "Network segmentation and isolation"
          ]
        },
        {
          subtitle: "Application Security:",
          items: [
            "Secure coding practices and code reviews",
            "Input validation and output encoding",
            "SQL injection and XSS prevention",
            "CSRF token protection",
            "Dependency vulnerability scanning",
            "Regular security updates and patches",
            "Security testing in CI/CD pipeline"
          ]
        },
        {
          subtitle: "Physical Security:",
          items: [
            "SOC 2 Type II certified data centers",
            "24/7 surveillance and access controls",
            "Biometric authentication for data center access",
            "Redundant power and cooling systems",
            "Environmental monitoring and controls"
          ]
        },
        {
          subtitle: "Incident Response:",
          items: [
            "24/7 security monitoring and alerting",
            "Incident response team and procedures",
            "Forensic analysis and root cause investigation",
            "Data breach notification within 72 hours (GDPR requirement)",
            "Remediation and corrective actions",
            "Post-incident review and improvements"
          ]
        },
        {
          subtitle: "Employee Security Training:",
          items: [
            "Mandatory security awareness training",
            "Phishing simulation exercises",
            "Confidentiality and NDA agreements",
            "Background checks for sensitive roles",
            "Regular security policy updates"
          ]
        }
      ]
    },
    {
      title: "Data Retention Policies",
      bullets: [
        {
          subtitle: "Account Information:",
          items: [
            "Retained for duration of your account plus 1 year after closure",
            "Necessary for legal obligations, dispute handling, and fraud prevention"
          ]
        },
        {
          subtitle: "Transaction & Payment Records:",
          items: [
            "Kept for 7 years",
            "Comply with tax laws, accounting standards, and financial regulations",
            "Applicable in India and internationally"
          ]
        },
        {
          subtitle: "Communication Logs:",
          items: [
            "Chat messages, emails, and support tickets retained for 3 years",
            "For service quality, legal compliance, and dispute resolution",
            "Earlier deletion available upon request (subject to legal requirements)"
          ]
        },
        {
          subtitle: "Analytics & Usage Data:",
          items: [
            "Retained for 2 years for statistical analysis and service improvement",
            "Aggregated/anonymized data retained indefinitely"
          ]
        },
        {
          subtitle: "Proposals & Project Documents:",
          items: [
            "Retained for 5 years",
            "For IP protection, contract compliance, and reference",
            "Until all IP rights transferred and payment obligations settled"
          ]
        },
        {
          subtitle: "Cookie & Tracking Data:",
          items: [
            "Session cookies to 2 years (cookie-specific)",
            "Detailed in our Cookie Policy",
            "Manageable through browser settings and preferences"
          ]
        },
        {
          subtitle: "Legal Hold & Exceptions:",
          items: [
            "Extended retention for legal holds, investigations, litigation",
            "Regulatory inquiries and government requests",
            "When required by applicable laws and regulations"
          ]
        },
        {
          subtitle: "Data Deletion & Anonymization:",
          items: [
            "Secure deletion using industry-standard methods (overwriting, cryptographic erasure)",
            "Anonymization with permanent removal of personal identifiers",
            "Right to erasure honored within 30 days (subject to legal exceptions)",
            "Automatic purging per retention schedules"
          ]
        }
      ]
    },
    {
      title: "Your Data Protection Rights (GDPR - EU/EEA)",
      bullets: [
        {
          subtitle: "Right to Access (Article 15):",
          items: [
            "Request copies of your personal data",
            "Information about how we process your data",
            "Details of third parties who receive your data",
            "Data retention periods and criteria"
          ]
        },
        {
          subtitle: "Right to Rectification (Article 16):",
          items: [
            "Request correction of inaccurate personal data",
            "Complete incomplete personal data"
          ]
        },
        {
          subtitle: "Right to Erasure / Right to be Forgotten (Article 17):",
          items: [
            "Request deletion when data no longer necessary",
            "When you withdraw consent",
            "When you object to processing",
            "When data was unlawfully processed",
            "When deletion required by law",
            "Exceptions apply for legal compliance and legitimate interests"
          ]
        },
        {
          subtitle: "Right to Restrict Processing (Article 18):",
          items: [
            "Request limitation when accuracy is contested",
            "When processing is unlawful but you oppose deletion",
            "When we no longer need data but you need it for legal claims",
            "When you have objected pending verification"
          ]
        },
        {
          subtitle: "Right to Data Portability (Article 20):",
          items: [
            "Receive your personal data in structured, machine-readable format (JSON, CSV, XML)",
            "Transmit data to another controller where technically feasible"
          ]
        },
        {
          subtitle: "Right to Object (Article 21):",
          items: [
            "Object to processing based on legitimate interests",
            "Object to direct marketing including profiling",
            "Object to processing for scientific/historical research"
          ]
        },
        {
          subtitle: "Right to Withdraw Consent (Article 7):",
          items: [
            "Withdraw consent at any time for consent-based processing",
            "Does not affect lawfulness of processing before withdrawal"
          ]
        },
        {
          subtitle: "Right to Lodge a Complaint:",
          items: [
            "File complaint with supervisory authority if rights violated"
          ]
        },
        {
          subtitle: "Automated Decision-Making & Profiling Rights:",
          items: [
            "Right not to be subject to solely automated decision-making with legal/significant effects",
            "Obtain human intervention, express views, and contest decisions"
          ]
        },
        {
          subtitle: "How to Exercise Rights:",
          items: [
            "Contact privacy@aidacorp.in with proof of identity",
            "We respond within 30 days",
            "Extendable by 2 months for complex requests"
          ]
        }
      ]
    },
    {
      title: "CCPA Privacy Rights (California Residents)",
      bullets: [
        {
          subtitle: "Right to Know / Access:",
          items: [
            "Request disclosure of categories and specific pieces of personal information collected",
            "Categories of sources from which information collected",
            "Business/commercial purposes for collecting information",
            "Categories of third parties with whom we share information",
            "Specific pieces of personal information we hold about you"
          ]
        },
        {
          subtitle: "Right to Delete:",
          items: [
            "Request deletion of personal information collected from you",
            "Subject to exceptions for legal compliance, security, and legitimate business purposes"
          ]
        },
        {
          subtitle: "Right to Opt-Out of Sale:",
          items: [
            "Direct us not to sell your personal information to third parties",
            "Note: We do not sell personal information as defined by CCPA"
          ]
        },
        {
          subtitle: "Right to Non-Discrimination:",
          items: [
            "No discriminatory treatment for exercising CCPA rights",
            "No different prices or service levels",
            "No penalties or denial of goods/services"
          ]
        },
        {
          subtitle: "Right to Correct Inaccurate Information:",
          items: [
            "Request correction of inaccurate personal information"
          ]
        },
        {
          subtitle: "Right to Limit Use of Sensitive Personal Information:",
          items: [
            "Limit use of sensitive personal information to necessary service delivery purposes"
          ]
        },
        {
          subtitle: "Right to Know About Automated Decision-Making:",
          items: [
            "Disclosure of logic involved in automated decision-making"
          ]
        },
        {
          subtitle: "Authorized Agent Rights:",
          items: [
            "Designate authorized agent to exercise rights on your behalf",
            "Proper documentation required"
          ]
        },
        {
          subtitle: "Verification Process:",
          items: [
            "Verify identity using information previously provided",
            "Stricter verification for deletion requests"
          ]
        },
        {
          subtitle: "Response Timeline:",
          items: [
            "Acknowledge requests within 10 days",
            "Respond within 45 days",
            "Extendable by 45 days for complex requests"
          ]
        },
        {
          subtitle: "How to Exercise Rights:",
          items: [
            "Contact privacy@aidacorp.in or call toll-free number",
            "Provide proof of California residency and identity"
          ]
        }
      ]
    },
    {
      title: "India DPDP Act 2023 Compliance",
      bullets: [
        {
          subtitle: "Right to Access Personal Data:",
          items: [
            "Request information about personal data we hold",
            "Purposes of processing",
            "Identities of data processors and fiduciaries",
            "Retention periods"
          ]
        },
        {
          subtitle: "Right to Correction & Updation:",
          items: [
            "Request correction of inaccurate, misleading, or incomplete data",
            "Update personal information to ensure accuracy"
          ]
        },
        {
          subtitle: "Right to Erasure & Right to be Forgotten:",
          items: [
            "Request deletion when no longer necessary for purposes collected",
            "When you withdraw consent with no legal grounds for retention",
            "When retention violates DPDP Act provisions"
          ]
        },
        {
          subtitle: "Right to Data Portability:",
          items: [
            "Receive personal data in structured, machine-readable format",
            "Transmit to another data fiduciary"
          ]
        },
        {
          subtitle: "Right to Nominate:",
          items: [
            "Nominate individual to exercise rights on your behalf",
            "Applicable in case of death or incapacity"
          ]
        },
        {
          subtitle: "Right to Grievance Redressal:",
          items: [
            "Timely resolution through our Data Protection Officer",
            "Acknowledgment within 72 hours",
            "Resolution within 30 days"
          ]
        },
        {
          subtitle: "Right to Withdraw Consent:",
          items: [
            "Withdraw consent at any time without penalty",
            "Clear mechanisms provided for withdrawal"
          ]
        },
        {
          subtitle: "Duties of Data Principal:",
          items: [
            "Provide accurate and up-to-date information",
            "Not impersonate or provide false information",
            "Comply with applicable laws"
          ]
        },
        {
          subtitle: "Lawful Basis for Processing:",
          items: [
            "Consent (freely given, specific, informed, unambiguous)",
            "Performance of contract",
            "Compliance with legal obligations",
            "Protection of vital interests",
            "Legitimate interests"
          ]
        },
        {
          subtitle: "Children's Data Protection:",
          items: [
            "Enhanced protection for children under 18",
            "Parental consent requirements",
            "Age verification mechanisms",
            "Prohibition of behavioral advertising to children",
            "Special safeguards for processing children's data"
          ]
        },
        {
          subtitle: "Data Localization & Cross-Border Transfer:",
          items: [
            "Follow DPDP Act requirements for storing and transferring data",
            "Appropriate safeguards implemented"
          ]
        },
        {
          subtitle: "Data Breach Notification:",
          items: [
            "Notify affected individuals and Data Protection Board within 72 hours of discovery"
          ]
        },
        {
          subtitle: "Penalties & Enforcement:",
          items: [
            "Penalties up to ₹250 crores for violations",
            "Enforcement by Data Protection Board of India",
            "Regular compliance audits"
          ]
        },
        {
          subtitle: "How to Exercise Rights:",
          items: [
            "Contact dpo@aidacorp.in",
            "Provide proof of Indian citizenship/residency"
          ]
        }
      ]
    },
    {
      title: "International Data Transfers & Safeguards",
      bullets: [
        {
          subtitle: "Countries & Jurisdictions:",
          items: [
            "India (primary data storage and processing)",
            "United States (cloud services, analytics, payment processing)",
            "European Union (CDN, enterprise services)",
            "Singapore (Asia-Pacific data center)"
          ]
        },
        {
          subtitle: "Legal Mechanisms for Transfers:",
          items: [
            "Standard Contractual Clauses (SCCs) approved by European Commission for GDPR compliance",
            "Binding Corporate Rules (BCRs) for intra-group transfers",
            "Adequacy Decisions recognizing equivalent protection levels",
            "Specific derogations for explicit consent, contract performance, legal claims, public interest, vital interests"
          ]
        },
        {
          subtitle: "Safeguards & Protection Measures:",
          items: [
            "Technical measures: encryption in transit and at rest, secure protocols, access controls",
            "Organizational measures: data processing agreements, privacy impact assessments, vendor due diligence",
            "Compliance measures: GDPR Article 46, CCPA provisions, DPDP Act Section 16 requirements"
          ]
        },
        {
          subtitle: "Transfer Impact Assessments:",
          items: [
            "Assess risks of international transfers",
            "Evaluate laws and practices in destination countries",
            "Implement supplementary measures where necessary",
            "Document transfer risk assessments"
          ]
        },
        {
          subtitle: "Onward Transfer Restrictions:",
          items: [
            "Prohibit third-party recipients from further transferring data without equivalent protection",
            "Require written agreements",
            "Audits and compliance monitoring",
            "Breach notification obligations"
          ]
        },
        {
          subtitle: "Regional Compliance:",
          items: [
            "UK GDPR & Brexit: UK International Data Transfer Agreement (IDTA), UK addendum to EU SCCs",
            "Switzerland: Swiss-approved SCCs for personal data protection",
            "Australia: APP cross-border disclosure requirements"
          ]
        },
        {
          subtitle: "Request Information:",
          items: [
            "Contact privacy@aidacorp.in for more about international data transfers",
            "Request transfer impact assessment documentation"
          ]
        }
      ]
    },
    {
      title: "Children's Privacy Protection",
      bullets: [
        {
          subtitle: "Age Restrictions:",
          items: [
            "Our Sites not intended for children under 18 years (or 13 in certain jurisdictions)",
            "We do not knowingly collect, use, or disclose personal information from children"
          ]
        },
        {
          subtitle: "No Targeted Collection:",
          items: [
            "We do not knowingly solicit data from children",
            "No child-specific accounts or profiles created",
            "No marketing to children"
          ]
        },
        {
          subtitle: "Parental Rights & Controls:",
          items: [
            "Parental consent required for processing children's data where required by law",
            "Parents can review, access, and delete children's data",
            "Parents can withdraw consent and refuse further collection"
          ]
        },
        {
          subtitle: "Discovery & Deletion Procedures:",
          items: [
            "If we discover collection from child without parental consent:",
            "Immediately cease processing",
            "Delete data within 30 days",
            "Notify parents if contact information available",
            "Implement measures to prevent future collection"
          ]
        },
        {
          subtitle: "COPPA Compliance (USA) - Children Under 13:",
          items: [
            "Parental consent requirements",
            "Limited collection to necessary information only",
            "Parental access and deletion rights",
            "Prohibition of conditioning participation on data disclosure"
          ]
        },
        {
          subtitle: "GDPR Protections - Children Under 16:",
          items: [
            "Parental consent for information society services",
            "Age verification mechanisms",
            "Enhanced protection standards",
            "Prohibition of profiling children for marketing"
          ]
        },
        {
          subtitle: "India DPDP Act - Children Under 18:",
          items: [
            "Verifiable parental consent required",
            "Prohibition of behavioral advertising or tracking",
            "No processing that could harm child welfare",
            "Special security measures for children's data"
          ]
        },
        {
          subtitle: "Reporting & Compliance:",
          items: [
            "Report suspected collection of children's data to privacy@aidacorp.in",
            "Investigation within 48 hours",
            "Corrective action as necessary"
          ]
        }
      ]
    },
    {
      title: "Data Breach Notification & Incident Response",
      bullets: [
        {
          subtitle: "Breach Detection & Monitoring:",
          items: [
            "24/7 security monitoring and alerting systems",
            "Intrusion detection and prevention systems",
            "Log analysis and anomaly detection",
            "Threat intelligence feeds",
            "Employee reporting mechanisms",
            "Third-party security audits"
          ]
        },
        {
          subtitle: "Incident Classification:",
          items: [
            "Severity: critical, high, medium, low",
            "Scope: number of affected individuals, types of data compromised",
            "Impact: financial, reputational, operational"
          ]
        },
        {
          subtitle: "Containment & Investigation:",
          items: [
            "Immediate containment of breach",
            "Forensic analysis to determine scope and root cause",
            "Evidence preservation for legal/regulatory purposes",
            "Engagement of cybersecurity experts as needed"
          ]
        },
        {
          subtitle: "Assessment of Harm & Risk:",
          items: [
            "Evaluate likelihood and severity of harm to individuals",
            "Assess sensitivity of data compromised",
            "Determine if data was encrypted or anonymized",
            "Evaluate potential for identity theft or fraud",
            "Assess effectiveness of mitigation measures"
          ]
        },
        {
          subtitle: "Notification Requirements:",
          items: [
            "Affected individuals notified within 72 hours (GDPR Article 33-34)",
            "Supervisory authorities notified without undue delay",
            "Communication to CCPA authorities as required",
            "Reporting to Data Protection Board under DPDP Act"
          ]
        },
        {
          subtitle: "Breach Notification Content:",
          items: [
            "Description of breach and data affected",
            "Likely consequences and potential risks",
            "Measures taken or proposed to mitigate harm",
            "Contact information for inquiries",
            "Recommendations for affected individuals"
          ]
        },
        {
          subtitle: "Remediation & Corrective Actions:",
          items: [
            "Technical fixes to prevent recurrence",
            "Security enhancements and additional safeguards",
            "Policy and procedure updates",
            "Employee training and awareness programs",
            "Third-party vendor management improvements"
          ]
        },
        {
          subtitle: "Post-Incident Review:",
          items: [
            "Root cause analysis",
            "Lessons learned documentation",
            "Security posture assessment",
            "Update incident response plan",
            "Compliance with notification requirements audit"
          ]
        },
        {
          subtitle: "Credit Monitoring & Identity Protection:",
          items: [
            "Services may be offered to affected individuals",
            "Based on breach severity and data sensitivity"
          ]
        },
        {
          subtitle: "Contact for Breach Inquiries:",
          items: [
            "Email: security@aidacorp.in or privacy@aidacorp.in",
            "Include incident reference number"
          ]
        }
      ]
    },
    {
      title: "Marketing Communications & Consent Management",
      bullets: [
        {
          subtitle: "Types of Marketing Communications:",
          items: [
            "Service updates and new feature announcements",
            "Educational content and industry insights",
            "Promotional offers and discounts",
            "Event invitations and webinars",
            "Newsletter subscriptions",
            "Product recommendations based on usage"
          ]
        },
        {
          subtitle: "Consent Requirements:",
          items: [
            "Explicit opt-in for marketing emails and SMS",
            "Pre-checked boxes prohibited",
            "Clear description of what you're consenting to",
            "Separate consent for different communication types",
            "Easy withdrawal mechanisms"
          ]
        },
        {
          subtitle: "Opt-Out & Unsubscribe Rights:",
          items: [
            "One-click unsubscribe in every marketing email",
            "SMS opt-out via STOP command",
            "Account settings for preference management",
            "Honored within 48 hours maximum",
            "Confirmation of unsubscribe request"
          ]
        },
        {
          subtitle: "Legitimate Interest vs. Consent:",
          items: [
            "Transactional emails (order confirmations, account notifications, security alerts) do not require consent",
            "Service-related communications use legitimate interest",
            "Marketing communications require explicit consent",
            "Balancing test for legitimate interest processing"
          ]
        },
        {
          subtitle: "Frequency & Volume Controls:",
          items: [
            "Preference for email frequency (daily, weekly, monthly)",
            "Topic-based subscriptions (news, offers, updates)",
            "Quiet hours for SMS communications",
            "Do-not-contact lists"
          ]
        },
        {
          subtitle: "Third-Party Marketing:",
          items: [
            "We do not sell or rent email lists to third parties",
            "Sharing for co-marketing requires explicit consent",
            "Opt-out applies to third-party communications",
            "Partner communications clearly labeled"
          ]
        },
        {
          subtitle: "Email Authentication & Deliverability:",
          items: [
            "SPF, DKIM, DMARC for email authentication",
            "Monitored sender reputation and deliverability",
            "Double opt-in for new subscriptions",
            "Regular list hygiene and validation"
          ]
        },
        {
          subtitle: "Suppression & Bounce Management:",
          items: [
            "Automatic processing of hard bounces and invalid addresses",
            "Soft bounce retry logic",
            "Complaint/spam report handling",
            "Honor global unsubscribe lists"
          ]
        },
        {
          subtitle: "Marketing Analytics:",
          items: [
            "Track open rates, click-through rates, conversion metrics (anonymized data)",
            "A/B testing for optimization",
            "No individual tracking after unsubscribe"
          ]
        },
        {
          subtitle: "Manage Communication Preferences:",
          items: [
            "Visit your account settings",
            "Use unsubscribe links in emails",
            "Contact privacy@aidacorp.in with your email address and preferences"
          ]
        }
      ]
    },
    {
      title: "Privacy by Design & Default",
      bullets: [
        {
          subtitle: "Privacy by Design Integration:",
          items: [
            "Data protection embedded from onset of system design",
            "Privacy impact assessments for new features",
            "Security and privacy architecture reviews",
            "Secure development lifecycle (SDL)",
            "Threat modeling and risk assessments",
            "Privacy engineering best practices"
          ]
        },
        {
          subtitle: "Data Minimization Principle:",
          items: [
            "Collect only data necessary for specified purposes",
            "Avoid excessive data collection",
            "Regular reviews of data collection practices",
            "Automatic deletion of unnecessary data",
            "Anonymization where identifiers not needed"
          ]
        },
        {
          subtitle: "Privacy by Default Settings:",
          items: [
            "Strictest privacy settings by default",
            "Users must opt-in for additional data processing",
            "Minimal data sharing with third parties",
            "Short data retention periods unless extended by user",
            "Secure default configurations"
          ]
        },
        {
          subtitle: "Purpose Limitation:",
          items: [
            "Data used only for purposes disclosed at collection",
            "New consent required for incompatible purposes",
            "Function creep and scope expansion prohibited",
            "Clear documentation of processing purposes"
          ]
        },
        {
          subtitle: "Storage Limitation:",
          items: [
            "Retain data only as long as necessary",
            "Automatic purging after retention period",
            "Review and deletion of obsolete data",
            "Archival with restricted access"
          ]
        },
        {
          subtitle: "Confidentiality & Integrity:",
          items: [
            "Encryption in transit and at rest",
            "Access controls and authentication",
            "Integrity checks and tamper detection",
            "Secure backup and recovery"
          ]
        },
        {
          subtitle: "Privacy Impact Assessments (PIAs):",
          items: [
            "Conducted before implementing new technologies",
            "When processing creates high risks",
            "For large-scale processing of special categories",
            "For automated decision-making and profiling"
          ]
        },
        {
          subtitle: "Data Protection by Default in Products:",
          items: [
            "Privacy-friendly default settings",
            "Granular privacy controls for users",
            "Privacy dashboards and transparency",
            "Privacy notices at point of collection"
          ]
        },
        {
          subtitle: "Regular Privacy Reviews:",
          items: [
            "Annual privacy program assessments",
            "Compliance audits and gap analysis",
            "Vendor privacy assessments",
            "Continuous improvement processes"
          ]
        },
        {
          subtitle: "Learn More:",
          items: [
            "Contact dpo@aidacorp.in for Privacy by Design practices"
          ]
        }
      ]
    },
    {
      title: "Changes to Privacy Policy",
      bullets: [
        {
          subtitle: "We Update This Policy to Reflect:",
          items: [
            "Changes in laws & regulations (new privacy legislation, regulatory guidance, court decisions)",
            "Business changes (new services/features, mergers/acquisitions, changes in data processing)",
            "Security updates (enhanced measures, new encryption, incident response procedures)",
            "User feedback & requests (privacy concerns, data access requests, best practice adoption)"
          ]
        },
        {
          subtitle: "Notification Process:",
          items: [
            "Updated policy posted on this page with revised \"Last Updated\" date",
            "Reasonable notice period before changes take effect (typically 30 days)",
            "Email notification for material changes to registered users",
            "Prominent website banner or notice",
            "Summary of key changes provided"
          ]
        },
        {
          subtitle: "Material vs. Non-Material Changes:",
          items: [
            "Material: new data collection categories, new processing purposes, new third-party sharing, reduction of user rights, changes to retention periods",
            "Non-material: clarifications and formatting, contact information updates, minor technical corrections"
          ]
        },
        {
          subtitle: "Acceptance of Changes:",
          items: [
            "Continued use of Sites after notice period constitutes acceptance",
            "Users who disagree must discontinue use",
            "Option to close account and request data deletion"
          ]
        },
        {
          subtitle: "Version History:",
          items: [
            "Previous versions available upon request",
            "Change log documenting all updates",
            "Effective dates for each version",
            "Audit trail for compliance"
          ]
        },
        {
          subtitle: "Review Frequency:",
          items: [
            "Annual comprehensive privacy policy review",
            "Quarterly minor updates as needed",
            "Immediate updates for major changes",
            "Ongoing monitoring of regulatory changes"
          ]
        },
        {
          subtitle: "Request Previous Versions:",
          items: [
            "Contact privacy@aidacorp.in with version date and requested information"
          ]
        }
      ]
    },
    {
      title: "Contact Information & Data Protection Officer",
      bullets: [
        {
          subtitle: "Data Protection Officer Contact:",
          items: [
            "Primary email: dpo@aidacorp.in",
            "Secondary email: privacy@aidacorp.in",
            "Legal inquiries: legal@aidacorp.in",
            "Security incidents: security@aidacorp.in",
            "General information: info@aidacorp.in"
          ]
        },
        {
          subtitle: "Mailing Address:",
          items: [
            "AIDA Corporation Private Limited",
            "Data Protection Officer",
            "Park Avenue Building, RTO Road",
            "Andheri West, Mumbai 400 053",
            "Maharashtra, INDIA"
          ]
        },
        {
          subtitle: "Response Timeline:",
          items: [
            "Acknowledgment within 48 hours for urgent privacy matters",
            "Response within 30 days for data subject requests",
            "Extendable by 60 days for complex requests",
            "Immediate action for security incidents and breaches",
            "Priority handling for children's data inquiries"
          ]
        },
        {
          subtitle: "Verification Process:",
          items: [
            "Proof of identity required for data requests (government ID, account credentials, verification code)",
            "Additional verification for sensitive requests (deletion, access to sensitive data)",
            "Protection against fraudulent requests"
          ]
        },
        {
          subtitle: "Complaint & Escalation Process:",
          items: [
            "Data Protection Officer review",
            "Escalation to Chief Privacy Officer for unresolved issues",
            "External dispute resolution if needed",
            "Right to lodge complaint with supervisory authority"
          ]
        },
        {
          subtitle: "Supervisory Authorities:",
          items: [
            "Data Protection Board of India (for Indian residents)",
            "Relevant EU supervisory authority for GDPR subjects (ICO for UK, CNIL for France, etc.)",
            "California Attorney General (for CCPA complaints)"
          ]
        },
        {
          subtitle: "Language & Accessibility:",
          items: [
            "Privacy communications available in English, Hindi, and regional Indian languages upon request",
            "Accessible formats for individuals with disabilities",
            "Plain language explanations",
            "Translation services for non-English speakers"
          ]
        },
        {
          subtitle: "Office Hours:",
          items: [
            "Phone inquiries: Monday-Friday, 9:00 AM - 6:00 PM IST (excluding public holidays)",
            "24/7 availability for security incidents and data breaches"
          ]
        },
        {
          subtitle: "Our Commitment:",
          items: [
            "Handle all privacy inquiries with confidentiality, respect, and urgency"
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Grid Layout with Different Design */}
      <section className="relative bg-white text-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-96 h-96 bg-[#7f66A8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#5919C1] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[25%_50%_25%] md:grid-rows-2 gap-0 border-b-2 border-[#7f66A8]/20">
          {/* Top Row */}
          {/* Top Left Box - EMPTY with gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block bg-white border-r border-b border-[#DCDCDC] p-8"
          >
          </motion.div>

          {/* Top Middle Box - TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 md:px-12 py-12 md:py-16 flex flex-col justify-between border-b border-[#DCDCDC]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[#7f66A8]">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-black/90 font-light">
              Your privacy is paramount. We protect your data with enterprise-grade security and comply with GDPR, CCPA, and India DPDP Act 2023.
            </p>
          </motion.div>

          {/* Top Right Box - Icon */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white flex items-center justify-center border-l border-b border-[#DCDCDC] p-8"
          >
            <svg className="w-16 h-16 md:w-20 md:h-20 text-[#7f66A8]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>

          {/* Bottom Row */}
          {/* Bottom Left Box - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex flex-col justify-center"
          >
            <div className="text-4xl md:text-5xl font-light text-[#7f66A8] mb-2">20</div>
            <div className="text-sm md:text-base text-gray-600 font-light">Comprehensive Privacy Sections</div>
          </motion.div>

          {/* Bottom Middle Box - Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white border-r border-[#DCDCDC] p-8 md:p-12 flex flex-col items-center justify-center gap-4"
          >
            <p className="text-xl md:text-2xl font-light text-center">
              Multi-jurisdiction compliance & your data rights
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Bottom Right Box - Contact Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white border-l border-[#DCDCDC] p-0"
          >
            <Link
              href="/contact"
              className="w-full h-full flex flex-col items-center justify-center p-8 text-xl font-medium bg-[#7f66A8] text-white hover:bg-[#5919C1] transition-all group"
            >
              <svg className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Contact DPO</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content Section */}
      <section className="py-16 md:py-24 bg-white border-b border-[#DCDCDC]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Grid Layout - Each Row with 15% / 85% split */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-0 border-2 border-[#7f66A8]/20 bg-white"
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
                  grid grid-cols-1 md:grid-cols-[15%_85%] border-b-2 border-[#7f66A8]/10 last:border-b-0 transition-all duration-300 ease-in-out
                  ${activePoint === index ? 'bg-[#7f66A8]/5' : 'bg-white hover:bg-gray-50/50'}
                `}
              >
                {/* Left Section - Number (15%) */}
                <div className={`
                  flex flex-col items-center justify-start p-6 md:p-8 border-r-2 border-[#7f66A8]/20 transition-all duration-300 ease-in-out
                  ${activePoint === index ? 'bg-[#7f66A8]/10' : ''}
                `}>
                  <span className={`
                    text-4xl md:text-5xl font-light transition-colors duration-300 ease-in-out
                    ${activePoint === index ? 'text-[#7f66A8]' : 'text-gray-300'}
                  `}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                 
                </div>

                {/* Right Section - Title & Bullets (85%) */}
                <div className="p-6 md:p-8">
                  <h2 className={`
                    text-xl md:text-2xl font-normal mb-6 transition-colors duration-300 ease-in-out flex items-center gap-3
                    ${activePoint === index ? 'text-[#7f66A8]' : 'text-black'}
                  `}>
                    {activePoint === index && (
                      <motion.svg 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    )}
                    {section.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {(() => {
                      const totalBullets = section.bullets.length;
                      const isLong = totalBullets > 6;
                      const isExpanded = expandedSections.has(index);
                      const displayBullets = isLong && !isExpanded ? section.bullets.slice(0, 3) : section.bullets;
                      
                      return (
                        <>
                          <AnimatePresence mode="sync">
                            {displayBullets.map((bullet, bulletIndex) => {
                              if (typeof bullet === 'string') {
                                return (
                                  <motion.div 
                                    key={bulletIndex}
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="flex items-start gap-3 group transition-all duration-300 ease-in-out"
                                  >
                                    <span className={`
                                      mt-1.5 w-2 h-2 rounded-full shrink-0 transition-all duration-300 ease-in-out
                                      ${activePoint === index ? 'bg-[#7f66A8] group-hover:bg-[#6B5494]' : 'bg-[#7f66A8] group-hover:bg-[#6B5494]'}
                                    `}></span>
                                    <span className="text-gray-700 leading-relaxed font-light group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
                                      {bullet}
                                    </span>
                                  </motion.div>
                                );
                            } else {
                              return (
                                <motion.div 
                                  key={bulletIndex} 
                                  className="space-y-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                  <h3 className="font-medium text-gray-900 text-lg">{bullet.subtitle}</h3>
                                  <div className="ml-4 space-y-2">
                                    {bullet.items.map((item, itemIndex) => (
                                      <motion.div 
                                        key={itemIndex}
                                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut', delay: itemIndex * 0.03 }}
                                        className="flex items-start gap-3 group transition-all duration-300 ease-in-out"
                                      >
                                        <span className={`
                                          mt-1.5 w-2 h-2 rounded-full shrink-0 transition-all duration-300 ease-in-out
                                          ${activePoint === index ? 'bg-[#7f66A8] group-hover:bg-[#6B5494]' : 'bg-[#7f66A8] group-hover:bg-[#6B5494]'}
                                        `}></span>
                                        <span className="text-gray-700 leading-relaxed font-light group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
                                          {item}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              );
                            }
                          })}
                          </AnimatePresence>
                          
                          {isLong && (
                            <button
                              onClick={() => toggleSection(index)}
                              className="flex items-center justify-between w-full mt-4 px-4 py-2 text-sm font-medium text-[#7f66A8] hover:text-[#6B5494] transition-colors duration-200 border border-[#7f66A8]/20 hover:border-[#7f66A8]/30 rounded"
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
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* DPO Contact Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white border-2 border-[#7f66A8]/30 p-8 md:p-12 relative overflow-hidden"
          >
            <h3 className="text-3xl md:text-4xl font-normal text-center mb-8 text-[#7f66A8]">Data Protection Officer</h3>
            
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#DCDCDC] transition-all duration-300 ease-in-out hover:bg-[#7f66A8]/5">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Privacy Email</td>
                  <td className="py-6 px-8 font-light text-lg">
                    <a href="mailto:privacy@aidacorp.in" className="text-[#5919C1] hover:text-[#7f66A8] transition-colors duration-300 ease-in-out hover:underline">
                      info@aidacorp.in
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-[#DCDCDC] transition-all duration-300 ease-in-out hover:bg-[#7f66A8]/5">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Compliance</td>
                  <td className="py-6 px-8 font-light text-lg">GDPR | CCPA | India DPDP Act 2023</td>
                </tr>
                <tr className="transition-all duration-300 ease-in-out hover:bg-[#7f66A8]/5">
                  <td className="py-6 px-8 font-normal text-lg text-[#7f66A8] border-r border-[#DCDCDC]">Response Time</td>
                  <td className="py-6 px-8 font-light text-lg">Within 30 days (48 hours for urgent matters)</td>
                </tr>
              </tbody>
            </table>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-700 mt-8 p-6 bg-[#7f66A8]/5 border-l-4 border-[#7f66A8] font-light text-lg transition-all duration-300 ease-in-out hover:bg-[#7f66A8]/10"
            >
              <span className="font-normal text-[#7f66A8]">Your Privacy Matters:</span> We handle all privacy inquiries with confidentiality, respect, and urgency. Contact us anytime to exercise your data protection rights.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

