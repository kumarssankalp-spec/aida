import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team - AIDA Corporation | Meet the Experts',
  description: 'Meet the talented team behind AIDA Corporation. Our experts in AI, Big Data, and Digital Marketing are dedicated to delivering innovative technology solutions.',
  keywords: 'AIDA team, technology experts, AI specialists, big data analysts, digital marketing professionals',
  openGraph: {
    title: 'Our Team - AIDA Corporation',
    description: 'Meet the innovative team driving technological excellence at AIDA Corporation.',
    url: 'https://aidacorp.in/team',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
