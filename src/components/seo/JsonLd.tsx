import React from 'react';

export const JsonLd: React.FC = () => {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RouteGuardian',
    operatingSystem: 'Web, Android, iOS',
    applicationCategory: 'BusinessApplication, LogisticsApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Sistema SaaS de Auditoria Inteligente de Entregas por GPS, Roteirização com Inteligência Artificial, Geofence e Comprovante Digital.',
    url: 'https://deliveryguardian.genioplay.com.br',
    publisher: {
      '@type': 'Organization',
      name: 'RouteGuardian Technology',
      url: 'https://deliveryguardian.genioplay.com.br',
      logo: 'https://deliveryguardian.genioplay.com.br/logo.png',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RouteGuardian',
    url: 'https://deliveryguardian.genioplay.com.br',
    logo: 'https://deliveryguardian.genioplay.com.br/logo.png',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};
