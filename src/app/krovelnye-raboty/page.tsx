import { services } from '@/shared/data/site';
import { ServicesGrid } from '@/components/sections/ServicesGrid';

export default function RoofingIndexPage() {
  return <ServicesGrid title="Кровельные работы в Крыму" description="Флагман сайта и главный коммерческий блок." items={services.filter((item) => item.category === 'krovelnye-raboty')} />;
}
