import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Roboto, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CursorFollower } from '@/components/CursorFollower';

const fontHeadline = Roboto({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ['400', '700', '900'],
});

const fontBody = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ['400', '700'],
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Anas Masama | Web Developer',
  description: 'Personal portfolio of Anas Masama, a passionate web developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Primary favicon (ico fallback) */}
        <link rel="icon" href="/favicon.ico" />
        {/* PNG favicons for modern browsers */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Generic PNG fallback and Apple touch icon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
      </head>
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable, fontCode.variable)}>
        <CursorFollower />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
