import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | AIDA Corporation',
  description: 'Professional Digital Marketing services by AIDA Corporation. SEO, content marketing, social media management, PPC campaigns, and comprehensive digital strategy to grow your business.',
  keywords: 'digital marketing, SEO, content marketing, social media marketing, PPC, digital strategy, online marketing',
  openGraph: {
    title: 'Digital Marketing Services - AIDA Corporation',
    description: 'Data-driven digital marketing strategies to boost your online presence and ROI.',
    url: 'https://aidacorp.in/services/digital-marketing',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
