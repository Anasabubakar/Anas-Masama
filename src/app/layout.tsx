import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { CursorFollower } from '@/components/CursorFollower';
import PageWrapper from '@/components/PageWrapper';

const fontHeadline = localFont({
  src: [
    { path: '../../public/fonts/Ferron/Ferron-ExtraExpanded.otf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Ferron/Ferron-SemiExpanded.otf', weight: '600', style: 'normal' },
  ],
  variable: '--font-headline',
});

const fontBody = localFont({
  src: [
    { path: '../../public/fonts/Ferron/Ferron-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Ferron/Ferron-Condensed.otf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Ferron/Ferron-SemiCondensed.otf', weight: '500', style: 'normal' },
  ],
  variable: '--font-body',
});

const fontCode = localFont({
  src: [
    { path: '../../public/fonts/Ferron/Ferron-Regular.otf', weight: '400', style: 'normal' },
  ],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'Anas Masama | Software Engineer',
  description: 'Anas Masama is a Software Engineer and Future Architect building Earth\'s next generation of innovators.',
  icons: {
    icon: '/favicon-v2.ico',
    shortcut: '/favicon-32x32-v2.png',
    apple: '/apple-touch-icon-v2.png',
  },
};

import Silk from '@/components/ui/Silk';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
  {/* Primary favicon (ico fallback) */}
  <link rel="icon" href="/favicon-v2.ico" />
  {/* Shortcut icon for some browsers */}
  <link rel="shortcut icon" href="/favicon-32x32-v2.png" />
  {/* PNG favicons for modern browsers */}
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32-v2.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16-v2.png" />
  {/* Generic PNG fallback and Apple touch icon */}
  <link rel="icon" type="image/png" href="/favicon-v2.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon-v2.png" />
  <link rel="manifest" href="/site.webmanifest" />
  {/* Cache-bust and theme */}
  <meta name="theme-color" content="#0ea5a4" />
      </head>
      <body className={cn("font-body antialiased text-foreground selection:bg-primary/30 min-h-screen", fontHeadline.variable, fontBody.variable, fontCode.variable)}>
        <div className="fixed inset-0 -z-50 overflow-hidden">
          <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Silk
              speed={5}
              scale={1}
              color="#2db985"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>
        </div>
        <CursorFollower />
        <PageWrapper>
          {children}
        </PageWrapper>
        <Toaster />
      </body>
    </html>
  );
}
