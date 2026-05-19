import { company, services } from '@/shared/data/site';
import { getSiteUrl } from '@/shared/lib/metadata';

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function getServiceType(category: string) {
  if (category === 'natyazhnye-potolki') {
    return 'HomeAndConstructionBusiness';
  }

  return 'RoofingContractor';
}

export function GlobalJsonLd() {
  const siteUrl = getSiteUrl();

  const serviceCatalog = {
    '@type': 'OfferCatalog',
    name: 'Услуги Крымской Кровельной',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      url: `${siteUrl}${service.href}`,
      name: service.title,
      description: service.excerpt,
      category: service.category,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.excerpt,
        serviceType: getServiceType(service.category),
        areaServed: [
          'Симферополь',
          'Севастополь',
          'Ялта',
          'Алушта',
          'Феодосия',
          'Евпатория',
          'Саки',
          'Бахчисарай',
          'Судак',
          'Керчь',
          'Джанкой',
          'Крым',
        ],
      },
    })),
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': `${siteUrl}/#organization`,
    name: company.marketingName,
    legalName: company.legalName,
    description: company.descriptor,
    slogan: company.slogan,
    url: siteUrl,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Лавриненко, 9',
      addressLocality: 'Симферополь',
      addressRegion: 'Республика Крым',
      addressCountry: 'RU',
    },
    areaServed: [
      'Симферополь',
      'Севастополь',
      'Ялта',
      'Алушта',
      'Феодосия',
      'Евпатория',
      'Саки',
      'Бахчисарай',
      'Судак',
      'Керчь',
      'Джанкой',
      'Крым',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '18:00',
      },
    ],
    sameAs: [company.telegramHref],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: ['Russian'],
      },
    ],
    hasOfferCatalog: serviceCatalog,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: company.marketingName,
    description: company.descriptor,
    inLanguage: 'ru-RU',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: safeJsonLd([organization, website]),
      }}
    />
  );
}
