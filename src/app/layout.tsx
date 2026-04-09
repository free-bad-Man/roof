import type { Metadata } from 'next';
import { Manrope, Montserrat } from 'next/font/google';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import './globals.css';

const manrope = Manrope({ subsets: ['cyrillic', 'latin'], variable: '--font-body' });
const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Крымская Кровельная',
  description: 'Ремонт, восстановление и гидроизоляция кровли в Крыму',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${montserrat.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileStickyBar />
      </body>
    </html>
  );
}
