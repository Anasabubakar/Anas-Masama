import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CursorFollower } from '@/components/CursorFollower';

const fontHeadline = Inter({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ['600', '700', '800'],
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ['400', '500'],
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
  weight: '400',
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
      <body className={cn("font-body antialiased bg-background text-foreground selection:bg-primary/30", fontHeadline.variable, fontBody.variable, fontCode.variable)}>
        <CursorFollower />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
