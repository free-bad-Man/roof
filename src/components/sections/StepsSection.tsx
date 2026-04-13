import { Card } from '@/shared/ui/Card';
import { Section } from '@/shared/ui/Section';

const steps = [
  'Вы оставляете заявку, звонок или отправляете фото объекта.',
  'Мы уточняем задачу, тип объекта и характер проблемы.',
  'Если нужно, выезжаем на осмотр или замер.',
  'Предлагаем решение по фактическому состоянию объекта и даём расчёт.',
  'Выполняем работы и сдаём результат.',
];

export function StepsSection() {
  return (
    <Section title="Как мы работаем">
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step}>
            <div className="text-sm font-semibold text-[var(--brand-red)]">0{index + 1}</div>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-graphite)]">{step}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
