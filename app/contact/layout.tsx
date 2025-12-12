import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - AIDA Corporation | Get in Touch',
  description: 'Contact AIDA Corporation for Big Data Analysis, Artificial Intelligence, Technology Services, and Digital Marketing solutions. Reach out to our expert team today.',
  keywords: 'contact AIDA, get in touch, AIDA Corporation contact, tech consulting contact, AI solutions inquiry',
  openGraph: {
    title: 'Contact Us - AIDA Corporation',
    description: 'Get in touch with AIDA Corporation for cutting-edge technology solutions and expert consultation.',
    url: 'https://aidacorp.in/contact',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
