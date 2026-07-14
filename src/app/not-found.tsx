import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Return to Anas Masama\'s portfolio.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
          Page Not Found
        </h1>
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
