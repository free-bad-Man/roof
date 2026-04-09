import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}