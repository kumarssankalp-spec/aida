import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | AIDA Corporation',
  description: 'Learn about AIDA Corporation\'s Cookie Policy, including what cookies we use, why we use them, and how you can manage your cookie preferences.',
  keywords: 'cookie policy, cookies, tracking, web cookies, privacy, AIDA cookies',
  openGraph: {
    title: 'Cookie Policy - AIDA Corporation',
    description: 'Understand how AIDA Corporation uses cookies on our website.',
    url: 'https://aidacorp.in/legal/cookie-policy',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
