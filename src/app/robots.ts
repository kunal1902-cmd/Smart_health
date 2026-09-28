import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://grid.mohfw.gov.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/internal/'],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
