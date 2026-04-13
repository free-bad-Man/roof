import { services } from '@/shared/data/site';
import { ServicesGrid } from '@/components/sections/ServicesGrid';

export default function WaterproofingIndexPage() {
  return <ServicesGrid title="Гидроизоляция" description="Входной блок для задач с протечками, узлами и проблемными зонами." items={services.filter((item) => item.category === 'gidroizolyatsiya')} />;
}
