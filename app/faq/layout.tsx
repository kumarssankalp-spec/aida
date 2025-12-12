import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | AIDA Corporation',
  description: 'Find answers to frequently asked questions about AIDA Corporation\'s services including Big Data Analysis, Artificial Intelligence, Technology Services, and Digital Marketing solutions.',
  keywords: 'AIDA FAQ, questions, big data questions, AI questions, technology services FAQ, digital marketing questions',
  openGraph: {
    title: 'FAQ - AIDA Corporation',
    description: 'Get answers to common questions about our AI, Big Data, Technology, and Marketing services.',
    url: 'https://aidacorp.in/faq',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
