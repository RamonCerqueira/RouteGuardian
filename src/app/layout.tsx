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
  title: 'RouteGuardian - Auditoria de Entregas & GPS',
  description: 'Auditoria Inteligente e Monitoramento de Entregas SaaS em Tempo Real',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RouteGuardian',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className="font-sans antialiased bg-[var(--bg-main)] text-[var(--text-body)] min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
