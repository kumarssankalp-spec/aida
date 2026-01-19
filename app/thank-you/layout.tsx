import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You - AIDA Corporation',
  description: 'Thank you for contacting AIDA Corporation. We\'ve received your request and will respond within one business day. Subscribe to our newsletter for the latest tech insights.',

};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
