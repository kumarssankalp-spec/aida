import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AIDA Corporation',
  description: 'Read AIDA Corporation\'s Privacy Policy to understand how we collect, use, and protect your personal information when using our services.',
  keywords: 'privacy policy, data protection, personal information, AIDA privacy, data security',
  openGraph: {
    title: 'Privacy Policy - AIDA Corporation',
    description: 'Learn about how AIDA Corporation protects your privacy and handles your data.',
    url: 'https://aidacorp.in/legal/privacy-policy',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
