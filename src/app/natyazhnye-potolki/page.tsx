import { services } from '@/shared/data/site';
import { ServicesGrid } from '@/components/sections/ServicesGrid';

export default function CeilingsIndexPage() {
  return <ServicesGrid title="Натяжные потолки" description="Поточный раздел, который не спорит с кровельным ядром бренда." items={services.filter((item) => item.category === 'natyazhnye-potolki')} />;
}
