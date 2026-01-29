import { Metadata } from 'next';
import LeadForm from './LeadForm';

// Service metadata mapping
const serviceMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  'Artificial Intelligence': {
    title: 'AI Solutions & Consultation - Get Started',
    description: 'Transform your business with cutting-edge AI solutions. Expert consultation for machine learning, deep learning, NLP, computer vision, and intelligent automation. Start your AI journey today.',
    keywords: ['AI consultation', 'machine learning services', 'artificial intelligence solutions', 'NLP services', 'AI development']
  },
  'Big Data & Analysis': {
    title: 'Big Data Analytics Services - Get Started',
    description: 'Unlock powerful insights from your data with expert Big Data solutions. Professional consultation for data analytics, visualization, business intelligence, and data warehousing.',
    keywords: ['big data services', 'data analytics', 'business intelligence', 'data visualization', 'data warehousing']
  },
  'Technology Services': {
    title: 'Technology Consulting Services - Get Started',
    description: 'Modernize your IT infrastructure with comprehensive technology services. Expert consultation for cloud solutions, DevOps, cybersecurity, and custom web development.',
    keywords: ['technology consulting', 'IT services', 'cloud solutions', 'DevOps services', 'web development']
  },
  'Digital Marketing': {
    title: 'Digital Marketing Services - Get Started',
    description: 'Grow your online presence with result-driven digital marketing strategies. Professional consultation for SEO, social media marketing, content strategy, and PPC campaigns.',
    keywords: ['digital marketing services', 'SEO services', 'social media marketing', 'content marketing', 'PPC advertising']
  },
  'Web Development': {
    title: 'Custom Web Development Services - Get Started',
    description: 'Build powerful, scalable web applications tailored to your business needs. Expert consultation for custom web development, e-commerce solutions, and progressive web apps.',
    keywords: ['web development', 'custom websites', 'web applications', 'e-commerce development', 'PWA development']
  },
  'Cloud Consulting': {
    title: 'Cloud Consulting & Migration Services - Get Started',
    description: 'Accelerate your cloud transformation with expert guidance. Professional consultation for cloud migration, optimization, multi-cloud strategies, and cloud-native development.',
    keywords: ['cloud consulting', 'cloud migration', 'AWS services', 'Azure solutions', 'multi-cloud strategy']
  },
  'DevOps': {
    title: 'DevOps Consulting & Implementation - Get Started',
    description: 'Streamline your development lifecycle with modern DevOps practices. Expert consultation for CI/CD pipelines, automation, containerization, and infrastructure as code.',
    keywords: ['DevOps services', 'CI/CD implementation', 'container orchestration', 'automation services', 'infrastructure as code']
  },
  'Cyber Security': {
    title: 'Cybersecurity Solutions & Consulting - Get Started',
    description: 'Protect your business with comprehensive cybersecurity services. Professional consultation for threat detection, security audits, compliance, and security infrastructure.',
    keywords: ['cybersecurity services', 'security consulting', 'threat detection', 'compliance services', 'penetration testing']
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawService = params?.service as string | undefined;
  const service = rawService ? decodeURIComponent(rawService) : undefined;
  
  const meta = service && serviceMetadata[service] 
    ? serviceMetadata[service]
    : {
        title: 'Get Started - Request a Consultation',
        description: 'Start your digital transformation journey with AIDA Corporation. Submit your project details for expert consultation in AI, Big Data Analytics, Technology Services, or Digital Marketing.',
        keywords: ['AIDA consultation', 'technology services', 'digital transformation', 'IT consulting', 'project consultation']
      };
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: service ? `https://aidacorp.in/get-started?service=${encodeURIComponent(service)}` : 'https://aidacorp.in/get-started'
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: service ? `/get-started?service=${encodeURIComponent(service)}` : '/get-started'
    }
  };
}

export default function GetStartedPage() {
  return <LeadForm />;
}
