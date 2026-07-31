'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-portrait');
  const [mounted, setMounted] = useState(false);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-[80vh] flex-col justify-center px-5 pb-3 pt-[140px] sm:px-8 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex min-w-[280px] flex-col gap-7" />
        <div ref={imgWrapRef} className="relative justify-self-center" />
      </div>
    </section>
  );
}
