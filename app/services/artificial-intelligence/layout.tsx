import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Solutions | AIDA Corporation',
  description: 'Advanced AI and Machine Learning solutions by AIDA. Custom AI development, ML models, NLP, computer vision, and intelligent automation services.',
  keywords: 'artificial intelligence, AI solutions, machine learning, ML services, NLP, computer vision, AI development',
  openGraph: {
    title: 'AI Solutions - AIDA Corporation',
    description: 'Transform your business with cutting-edge AI and Machine Learning solutions.',
    url: 'https://aidacorp.in/services/artificial-intelligence',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
