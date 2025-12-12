import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | AIDA Corporation',
  description: 'Read AIDA Corporation\'s disclaimer regarding the accuracy, completeness, and liability of information provided on our website and services.',
  keywords: 'disclaimer, legal disclaimer, liability, information accuracy, AIDA disclaimer',
  openGraph: {
    title: 'Disclaimer - AIDA Corporation',
    description: 'Important disclaimer information from AIDA Corporation.',
    url: 'https://aidacorp.in/legal/disclaimer',
    siteName: 'AIDA Corporation',
    locale: 'en_US',
    type: 'website',
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
