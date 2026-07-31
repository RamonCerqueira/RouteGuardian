import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';
import { Providers } from './providers';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { PwaInstallPrompt } from '@/components/pwa/PwaInstallPrompt';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

const SITE_URL = 'https://deliveryguardian.genioplay.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RouteGuardian - Auditoria de Entregas, GPS & Telemetria',
    template: '%s | RouteGuardian',
  },
  description:
    'Sistema SaaS de Auditoria Inteligente e Rastreamento de Entregas por GPS. Validação de chegadas por Geofencing, prova de entrega digital e otimização de frotas.',
  keywords: [
    'auditoria de entregas',
    'rastreamento gps entregas',
    'geofence logistica',
    'roteirizador com ia',
    'comprovante digital de entrega',
    'gestao de frotas saas',
    'monitoramento de motoristas',
    'routeguardian',
    'delivery guardian',
  ],
  authors: [{ name: 'RouteGuardian Technology' }],
  creator: 'RouteGuardian',
  publisher: 'RouteGuardian Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    title: 'RouteGuardian - Auditoria de Entregas, GPS & Telemetria',
    description:
      'Sistema SaaS de Auditoria Inteligente e Rastreamento de Entregas por GPS. Validação de chegadas por Geofencing e comprovante digital.',
    siteName: 'RouteGuardian',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'RouteGuardian Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RouteGuardian - Auditoria de Entregas & GPS',
    description: 'Auditoria Inteligente e Monitoramento de Entregas SaaS em Tempo Real',
    images: ['/logo.png'],
  },
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
      <body className="font-sans antialiased bg-[var(--bg-main)] text-[var(--text-body)] min-h-screen selection:bg-indigo-600 selection:text-white">
        <JsonLd />
        <Providers>{children}</Providers>
        <CookieBanner />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
