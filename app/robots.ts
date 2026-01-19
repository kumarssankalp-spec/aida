import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/services/*',
        '/artificial-intelligence',
        '/big-data-analysis',
        '/digital-marketing',
        '/technology-services',
        '/contact',
        '/contact-us',
        '/get-started',
        '/faq',
        '/team',
        '/legal/*',
        '/cookie-policy',
        '/privacy-policy',
        '/terms-conditions',
        '/disclaimer',
      ],
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://aidacorp.in/sitemap.xml',
  }
}
