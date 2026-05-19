import type { MetadataRoute } from 'next';
import {
  getArticleRegistry,
  getCaseRegistry,
  getServiceRegistry,
} from '@/shared/content';
import { getSiteUrl } from '@/shared/lib/metadata';

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>;

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const STATIC_ROUTES: readonly SitemapRoute[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/krovelnye-raboty/', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/gidroizolyatsiya/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/natyazhnye-potolki/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/nashi-raboty/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/stati/', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/simferopol/', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/o-kompanii/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/kontakty/', priority: 0.7, changeFrequency: 'monthly' },
];

function normalizePath(path: string) {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;

  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

function makeEntry({
  siteUrl,
  path,
  lastModified,
  priority,
  changeFrequency,
}: SitemapRoute & {
  siteUrl: string;
  lastModified: Date;
}): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${normalizePath(path)}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map((item) =>
    makeEntry({ ...item, siteUrl, lastModified }),
  );

  const serviceEntries = getServiceRegistry().map((item) =>
    makeEntry({
      siteUrl,
      lastModified,
      path: `/${item.section}/${item.slug}/`,
      changeFrequency: 'weekly',
      priority: item.section === 'krovelnye-raboty' ? 0.9 : 0.85,
    }),
  );

  const caseEntries = getCaseRegistry().map((item) =>
    makeEntry({
      siteUrl,
      lastModified,
      path: `/nashi-raboty/${item.slug}/`,
      changeFrequency: 'monthly',
      priority: 0.65,
    }),
  );

  const articleEntries = getArticleRegistry().map((item) =>
    makeEntry({
      siteUrl,
      lastModified,
      path: `/stati/${item.slug}/`,
      changeFrequency: 'monthly',
      priority: 0.65,
    }),
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...caseEntries,
    ...articleEntries,
  ];
}
