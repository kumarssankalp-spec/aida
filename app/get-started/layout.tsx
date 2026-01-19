import { Metadata } from 'next';

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams?: { service?: string } 
}): Promise<Metadata> {
  const service = searchParams?.service;
  
  const serviceMetadata: Record<string, { title: string; description: string }> = {
    'Artificial Intelligence': {
      title: 'AI Solutions - Get Started | AIDA',
      description: 'Transform your business with AI solutions from AIDA Corporation. Get expert consultation for machine learning, deep learning, NLP, and intelligent automation.'
    },
    'Big Data & Analysis': {
      title: 'Big Data Services - Get Started | AIDA',
      description: 'Unlock insights from your data with AIDA\'s Big Data solutions. Expert consultation for data analytics, visualization, and business intelligence.'
    },
    'Technology Services': {
      title: 'Tech Services - Get Started | AIDA',
      description: 'Modernize your infrastructure with AIDA\'s technology services. Get consultation for cloud solutions, DevOps, cybersecurity, and web development.'
    },
    'Digital Marketing': {
      title: 'Digital Marketing - Get Started | AIDA',
      description: 'Grow your online presence with AIDA\'s digital marketing services. Get consultation for SEO, social media, content marketing, and PPC campaigns.'
    },
    'Cloud Consulting': {
      title: 'Cloud Solutions - Get Started | AIDA',
      description: 'Accelerate your cloud journey with AIDA Corporation. Expert consultation for cloud migration, optimization, and multi-cloud strategies.'
    },
    'DevOps': {
      title: 'DevOps Services - Get Started | AIDA',
      description: 'Streamline your development with AIDA\'s DevOps solutions. Get consultation for CI/CD, automation, containerization, and infrastructure as code.'
    },
    'Cyber Security': {
      title: 'Cybersecurity - Get Started | AIDA',
      description: 'Protect your business with AIDA\'s cybersecurity services. Expert consultation for threat detection, compliance, and security infrastructure.'
    },
    'Web Development': {
      title: 'Web Development - Get Started | AIDA',
      description: 'Build powerful web applications with AIDA Corporation. Get consultation for custom web development, e-commerce, and progressive web apps.'
    }
  };
  
  const meta = service && serviceMetadata[service] 
    ? serviceMetadata[service]
    : {
        title: 'Get Started - AIDA Corporation',
        description: 'Start your digital transformation with AIDA Corporation. Submit your project details for AI, Big Data, Technology Services, or Digital Marketing consultation.'
      };
  
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
