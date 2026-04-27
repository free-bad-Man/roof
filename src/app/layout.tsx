import type { Metadata } from 'next';
import { Manrope, Montserrat } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Крымская Кровельная',
  description: 'Ремонт, восстановление и гидроизоляция кровли в Крыму',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${montserrat.variable}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[url('/brand/logo/background-logo_2.png')] bg-cover bg-center bg-no-repeat"
        />

        <div className="relative z-10 min-h-screen bg-transparent">
          <SiteHeader />
          <main className="bg-transparent">{children}</main>
          <SiteFooter />
          <MobileStickyBar />
        </div>
      </body>
    </html>
  );
}