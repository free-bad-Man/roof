import { getServiceBySectionAndSlug } from '@/shared/content';
import type { ServicePageData } from '@/shared/types/content';

export type { ServicePageData };

export function getServicePage(
  section: ServicePageData['section'],
  slug: string,
) {
  return getServiceBySectionAndSlug(section, slug);
}