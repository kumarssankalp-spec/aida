import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Data Analysis Services | AIDA Corporation',
  description: 'Expert Big Data Analysis services by AIDA Corporation. Transform raw data into actionable insights with advanced analytics, data processing, and visualization solutions.',
  keywords: 'big data analysis, data analytics, big data services, data processing, data visualization, analytics solutions',
  openGraph: {
    title: 'Big Data Analysis Services - AIDA Corporation',
    description: 'Professional Big Data Analysis services to unlock insights from your data.',
    url: 'https://aidacorp.in/services/big-data-analysis',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function BigDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
