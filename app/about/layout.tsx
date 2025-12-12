import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AIDA Corporation - where data, technology, and strategy converge. Discover our story, mission, vision, and core values driving innovation in AI, Big Data, and Digital Marketing.',
  keywords: [
    'About AIDA Corporation',
    'Company Story',
    'Mission and Vision',
    'Core Values',
    'Technology Innovation',
    'AI Solutions Provider',
    'Data-Driven Company',
    'Digital Transformation',
    'AIDA Corporation History',
    'Tech Company About Us'
  ],
  openGraph: {
    title: 'About AIDA Corporation - Transforming Businesses Through Technology',
    description: 'Discover how AIDA Corporation merges science with creativity to help organizations grow smarter, faster, and further through data-driven solutions.',
    url: 'https://aidacorporation.com/about',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'AIDA Corporation - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AIDA Corporation - Our Story & Values',
    description: 'Where data, technology, and strategy converge to transform businesses. Learn about our mission, vision, and commitment to innovation.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://aidacorporation.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
