import { LeadForm } from '@/components/forms/LeadForm';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FaqSection } from '@/components/sections/FaqSection';
import { GeoSection } from '@/components/sections/GeoSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PriceTableSection } from '@/components/sections/PriceTableSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StepsSection } from '@/components/sections/StepsSection';
import { articles, cases, homeFaq, services } from '@/shared/data/site';
import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

export function HomePageTemplate() {
  return (
    <>
      <HeroSection />

      <section className="pb-4">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <LeadForm
            title="Получите предварительное решение по вашему объекту"
            subtitle="Если есть протечка, износ покрытия или вы не понимаете, нужен ли ремонт, восстановление или уже замена — начните с короткой заявки."
          />
        </div>
      </section>

      <ServicesGrid
        title="Основные направления работы"
        description="Кровля — ядро сайта и коммуникации. Гидроизоляция — отдельный входной продукт. Потолки не спорят с основным позиционированием."
        items={services.slice(0, 6)}
      />

      <Section
        title="Почему выбирают Крымскую Кровельную"
        description="Мы выстраиваем работу не как бригада на все случаи, а как профильная компания, где решение подбирается по состоянию объекта."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Основной профиль компании — кровля, а не всё подряд',
            'Сильная специализация на восстановлении и гидроизоляции кровли',
            'Честная диагностика: ремонт, восстановление или замена по факту объекта',
            'Работаем с проблемными узлами, примыканиями и протечками',
            'Понятная смета, этапы работ и нормальный сервис',
            'Реальные объекты по Крыму, а не шаблонные обещания',
          ].map((item) => (
            <Card key={item}><p className="text-sm leading-7 text-[var(--brand-graphite)]">{item}</p></Card>
          ))}
        </div>
      </Section>

      <PriceTableSection />

      <Section title="Реальные объекты по Крыму" description="Сильнее любых общих обещаний работают реальные кейсы.">
        <div className="grid gap-5 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.href}>
              <div className="text-sm font-semibold text-[var(--brand-red)]">{item.location}</div>
              <h3 className="mt-3 text-xl font-bold text-[var(--brand-graphite)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.result}</p>
            </Card>
          ))}
        </div>
      </Section>

      <StepsSection />
      <FaqSection items={homeFaq} />
      <CtaBanner title="Есть протечка или нужно понять состояние кровли?" text="Пришлите 2–4 фото объекта, город и краткое описание проблемы. Мы подскажем, что целесообразно в вашем случае: ремонт, восстановление, гидроизоляция или замена." />
      <GeoSection />

      <Section title="Статьи по проблемам и решениям">
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((item) => (
            <Card key={item.href}>
              <h3 className="text-xl font-bold text-[var(--brand-graphite)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{item.excerpt}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
