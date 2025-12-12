import type { Metadata } from "next";
import { Wix_Madefor_Display, Borel } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import JourneyTracker from "@/components/JourneyTracker";

const wixMadefor = Wix_Madefor_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wix-madefor"
});

const borel = Borel({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-borel"
});

export const metadata: Metadata = {
  title: {
    default: "AIDA Corporation | AI, Big Data & Technology Solutions",
    template: "%s | AIDA Corporation"
  },
  description: "Leading technology solutions provider specializing in Artificial Intelligence, Big Data Analysis, Technology Services, and Digital Marketing. Transform your business with AIDA Corporation.",
  keywords: ["AI", "Artificial Intelligence", "Big Data", "Data Analysis", "Technology Services", "Digital Marketing", "AIDA Corporation"],
  authors: [{ name: "AIDA Corporation" }],
  creator: "AIDA Corporation",
  publisher: "AIDA Corporation",
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aidacorp.in",
    title: "AIDA Corporation | AI, Big Data & Technology Solutions",
    description: "Leading technology solutions provider specializing in AI, Big Data, and Digital Marketing.",
    siteName: "AIDA Corporation",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIDA Corporation | AI, Big Data & Technology Solutions",
    description: "Leading technology solutions provider specializing in AI, Big Data, and Digital Marketing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${wixMadefor.className} ${borel.variable}`} style={{ position: 'relative', minHeight: '100vh' }}>
        <ScrollToTopOnMount />
        <Suspense fallback={null}>
          <JourneyTracker />
        </Suspense>
        <Header />
        <main className="min-h-screen" style={{ position: 'relative', isolation: 'isolate' }}>
          {children}
        </main>
        <Footer id="footer" />
        <CookieConsent />
        <ScrollToTop />
      </body>
    </html>
  );
}
