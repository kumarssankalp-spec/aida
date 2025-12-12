import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Services | AIDA Corporation',
  description: 'Comprehensive Technology Services by AIDA Corporation including cloud solutions, software development, IT consulting, infrastructure management, and digital transformation.',
  keywords: 'technology services, IT consulting, cloud solutions, software development, digital transformation, IT services',
  openGraph: {
    title: 'Technology Services - AIDA Corporation',
    description: 'End-to-end technology services to modernize and optimize your business operations.',
    url: 'https://aidacorp.in/services/technology-services',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
