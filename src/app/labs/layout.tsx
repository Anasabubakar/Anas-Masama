import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects by Anas Masama | Software Engineer Portfolio',
  description:
    'Explore the full project portfolio of Anas Abubakar Masama — AI-powered EdTech platforms, Web3 applications, healthcare tools, and fintech solutions built with Next.js, TypeScript, React, and Firebase.',
  alternates: {
    canonical: 'https://anasmasama.dev/projects',
  },
  openGraph: {
    title: 'Projects by Anas Masama | Software Engineer Portfolio',
    description:
      'Explore the full project portfolio of Anas Abubakar Masama — AI-powered EdTech platforms, Web3 applications, healthcare tools, and fintech solutions.',
    url: 'https://anasmasama.dev/projects',
    type: 'website',
    images: [
      {
        url: 'https://anasmasama.dev/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anas Masama - Project Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects by Anas Masama',
    description:
      'Full portfolio of AI, EdTech, Web3, healthcare, and fintech projects by Anas Abubakar Masama.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
