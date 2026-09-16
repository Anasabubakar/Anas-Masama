import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Labs by Anas Masama | Software Engineer Portfolio',
  description:
    'Every project Anas Abubakar Masama has built, ranked — AI-powered EdTech platforms, Web3 applications, healthcare tools, and fintech solutions built with Next.js, TypeScript, React, and Firebase.',
  alternates: {
    canonical: 'https://anasmasama.dev/labs',
  },
  openGraph: {
    title: 'Labs by Anas Masama | Software Engineer Portfolio',
    description:
      'Every project Anas Abubakar Masama has built, ranked — AI-powered EdTech platforms, Web3 applications, healthcare tools, and fintech solutions.',
    url: 'https://anasmasama.dev/labs',
    type: 'website',
    images: [
      {
        url: 'https://anasmasama.dev/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anas Masama - Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labs by Anas Masama',
    description:
      'Every AI, EdTech, Web3, healthcare, and fintech project by Anas Abubakar Masama, ranked.',
  },
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
