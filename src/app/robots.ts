import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://deliveryguardian.genioplay.com.br';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/login', '/cadastro', '/pricing', '/privacy', '/terms', '/tracking/*'],
        disallow: ['/api/*', '/dashboard/*', '/routes/*', '/deliveries/*', '/users/*', '/settings/*', '/admin/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
