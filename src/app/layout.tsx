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
        <link rel="icon" href="/images/logo-small.png" sizes="any" />
      </head>
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable, fontCode.variable)}>
        <CursorFollower />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
