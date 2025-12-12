import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | AIDA Corporation',
  description: 'Read AIDA Corporation\'s Terms and Conditions governing the use of our services, including rights, responsibilities, and legal agreements.',
  keywords: 'terms and conditions, terms of service, user agreement, legal terms, AIDA terms',
  openGraph: {
    title: 'Terms & Conditions - AIDA Corporation',
    description: 'Review the terms and conditions for using AIDA Corporation\'s services.',
    url: 'https://aidacorp.in/legal/terms-conditions',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
