import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

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
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileStickyBar />
      </body>
    </html>
  );
}