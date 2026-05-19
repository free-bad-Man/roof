import type { ServicePageData } from '@/shared/types/page';
import { getSiteUrl } from '@/shared/lib/metadata';

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function getSectionLabel(section: ServicePageData['section']) {
  switch (section) {
    case 'gidroizolyatsiya':
      return 'Гидроизоляция';
    case 'natyazhnye-potolki':
      return 'Натяжные потолки';
    case 'krovelnye-raboty':
    default:
      return 'Кровельные работы';
  }
}

function getServiceType(section: ServicePageData['section']) {
  if (section === 'natyazhnye-potolki') {
    return 'Натяжные потолки';
  }

  if (section === 'gidroizolyatsiya') {
    return 'Гидроизоляция';
  }

  return 'Кровельные работы';
}

export function ServiceJsonLd({ data }: { data: ServicePageData }) {
  const siteUrl = getSiteUrl();
  const sectionLabel = getSectionLabel(data.section);
  const sectionPath = `/${data.section}/`;
  const pagePath = `/${data.section}/${data.slug}/`;
  const pageUrl = `${siteUrl}${pagePath}`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: sectionLabel,
        item: `${siteUrl}${sectionPath}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.h1 || data.title,
        item: pageUrl,
      },
    ],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: data.h1 || data.title,
    description: data.seoDescription || data.heroSubtitle,
    serviceType: getServiceType(data.section),
    provider: {
      '@id': `${siteUrl}/#organization`,
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
    url: pageUrl,
  };

  const faq = data.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  const jsonLd = faq ? [breadcrumb, service, faq] : [breadcrumb, service];

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(jsonLd),
      }}
    />
  );
}
