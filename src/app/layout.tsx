import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://roof-krym.ru'),
  title: {
    default: 'Крымская Кровельная',
    template: '%s | Крымская Кровельная',
  },
  description:
    'Ремонт, восстановление и гидроизоляция кровли в Крыму. Подбираем решение по состоянию объекта: ремонт, восстановление, гидроизоляция или замена.',
  applicationName: 'Крымская Кровельная',
  keywords: [
    'ремонт кровли',
    'гидроизоляция кровли',
    'восстановление кровли',
    'устранение протечек',
    'кровельные работы',
    'Крым',
    'Симферополь',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Крымская Кровельная',
    title: 'Крымская Кровельная',
    description:
      'Ремонт, восстановление и гидроизоляция кровли в Крыму. Подбираем решение по состоянию объекта.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Крымская Кровельная',
    description:
      'Ремонт, восстановление и гидроизоляция кровли в Крыму. Подбираем решение по состоянию объекта.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-transparent text-[var(--brand-graphite)] antialiased">
        <div className="relative min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}