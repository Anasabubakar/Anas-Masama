import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Instrument_Serif, Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CursorFollower } from '@/components/CursorFollower';
import PageWrapper from '@/components/PageWrapper';
import Silk from '@/components/ui/Silk';

const SITE_URL = 'https://anasmasama.dev';
const SITE_NAME = 'Anas Masama';
const FULL_NAME = 'Anas Abubakar Masama';
const TITLE = 'Anas Masama | Software Engineer & AI Developer from Lagos, Nigeria';
const DESCRIPTION =
  'Anas Abubakar Masama is a Software Engineer, AI Developer, and Founder of TeenovateX Labs based in Lagos, Nigeria. Specializing in Next.js, TypeScript, React, and AI integration. Building high-performance web applications and empowering the next generation of African tech creators.';

const fontHeadline = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-headline',
  display: 'swap',
});

const fontBody = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0ea5a4',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  generator: 'Next.js',
  keywords: [
    'Anas Masama',
    'Anas Abubakar Masama',
    'Anas Abubakar',
    'Software Engineer',
    'AI Developer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript Developer',
    'Lagos Developer',
    'Nigerian Developer',
    'TeenovateX',
    'TeenovateX Labs',
    'Web Developer Nigeria',
    'AI Engineer Nigeria',
    'Firebase Developer',
    'Node.js Developer',
    'Frontend Developer Lagos',
    'Backend Developer Nigeria',
    'anasmasama.dev',
    'EdTech Developer',
    'Web3 Developer Nigeria',
    'JackPal',
    'EduPeak',
    'Ilmeen',
    'MarcediVault',
    'hire developer Lagos',
    'African tech founder',
    'software engineer Lagos Nigeria',
    'Gemini AI developer',
  ],
  referrer: 'origin-when-cross-origin',
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Anas_Abubakar70',
    creator: '@Anas_Abubakar70',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/favicon-v2.ico', sizes: 'any' },
      { url: '/favicon-16x16-v2.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32-v2.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192-v2.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32-v2.png',
    apple: '/apple-touch-icon-v2.png',
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  other: {
    'google-site-verification': 'JfiXV64iShXSMLA0qaO-_JXQ493da7nP5MD70uKIUh0',
    'msvalidate.01': '',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: FULL_NAME,
  alternateName: ['Anas Masama', 'Anas Abubakar'],
  givenName: 'Anas',
  familyName: 'Masama',
  additionalName: 'Abubakar',
  url: SITE_URL,
  image: `${SITE_URL}/images/Lodge.jpg`,
  email: 'mailto:anasabubakar7000@gmail.com',
  telephone: '+2347064294297',
  jobTitle: 'Software Engineer',
  description: DESCRIPTION,
  knowsAbout: [
    'Software Engineering',
    'Artificial Intelligence',
    'Web Development',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Firebase',
    'Cloud Computing',
    'Full Stack Development',
    'Machine Learning',
    'UI/UX Design',
    'Open Source',
    'EdTech',
    'Community Building',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Nigeria',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://github.com/Anasabubakar',
    'https://linkedin.com/in/anasmasama',
    'https://x.com/Anas_Abubakar70',
    'https://instagram.com/anasmasama.dev',
    SITE_URL,
  ],
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'TeenovateX Labs',
    url: 'https://teenovatex.org',
    founder: {
      '@id': `${SITE_URL}/#person`,
    },
    description:
      'Empowering the next generation of African tech creators through education, community, and innovation.',
  },
  founder: {
    '@type': 'Organization',
    name: 'TeenovateX Labs',
    url: 'https://teenovatex.org',
  },
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Be-Mint 2.0',
      description: 'Software Engineering Training Program',
    },
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'City',
      name: 'Lagos',
    },
    skills:
      'Next.js, React, TypeScript, Node.js, Firebase, AI/ML, Python, PostgreSQL, Tailwind CSS, Cloud Infrastructure',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${FULL_NAME} - Portfolio`,
  description: DESCRIPTION,
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
  inLanguage: 'en-US',
};

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: TITLE,
  description: DESCRIPTION,
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
    ],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Anas Abubakar Masama?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anas Abubakar Masama (also known as Anas Masama) is a Software Engineer and AI Developer based in Lagos, Nigeria. He is the Founder of TeenovateX Labs, a platform empowering the next generation of African tech creators.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Anas Masama work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anas specializes in Next.js, TypeScript, React, Node.js, Firebase, PostgreSQL, Tailwind CSS, and AI/ML integration using Google Gemini and Firebase Genkit. He builds full-stack web applications with a focus on performance and user experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is TeenovateX Labs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TeenovateX Labs (teenovatex.org) is an organization founded by Anas Abubakar Masama to empower the next generation of African tech creators through education, community, and innovation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What projects has Anas Masama built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anas has built projects including JackPal (AI audio learning platform), EduPeak (learning management system), Ilmeen (Quranic Arabic AI companion), MarcediVault (multi-chain wallet), MonieFlow (student finance platform), Pill-Pal (medication reminder), Empower-You (AI wellness companion), and Kinzoku Blueprint Forge (industrial prototyping tool).',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I hire Anas Masama?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can hire Anas Masama by visiting anasmasama.dev and using the contact form in the Hire Me section. You can also reach out via email at anasabubakar7000@gmail.com or connect on LinkedIn at linkedin.com/in/anasmasama.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Anas Masama located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anas Abubakar Masama is based in Lagos, Nigeria. He was born in Lagos State and is originally from Kebbi State, Nigeria.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-v2.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32-v2.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16-v2.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-v2.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} RSS Feed`} href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd, profilePageJsonLd, faqJsonLd]),
          }}
        />
      </head>
      <body
        className={cn(
          'font-body antialiased text-foreground selection:bg-primary/30 min-h-screen',
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <div className="fixed inset-0 -z-50 overflow-hidden" aria-hidden="true">
          <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Silk speed={5} scale={1} color="#1b7a58" noiseIntensity={1.5} rotation={0} />
          </div>
        </div>
        <CursorFollower />
        <PageWrapper>{children}</PageWrapper>
        <Toaster />
      </body>
    </html>
  );
}
