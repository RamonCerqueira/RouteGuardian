import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';
import { Providers } from './providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Delivery Guardian AI',
  description: 'Auditoria Inteligente e Monitoramento de Entregas SaaS',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-[var(--bg-main)] text-[var(--text-body)] min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
