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

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = imgWrapRef.current;
        if (el) el.style.transform = `translateY(${Math.min(window.scrollY * 0.15, 60)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-[80vh] flex-col justify-center px-5 pb-3 pt-[140px] sm:px-8 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex min-w-[280px] flex-col gap-7">
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
            Software Engineer &middot; Lagos, Nigeria
          </p>
          <h1 className="m-0 font-headline text-[clamp(46px,7vw,96px)] font-normal leading-[0.98] tracking-[-0.01em] text-[#f3f2ee]">
            <span
              className="inline-block"
              style={{ animation: 'wordIn 0.8s 0.05s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              Hi, I&apos;m
            </span>
            <br />
            <span
              className="inline-block text-[#34c97e]"
              style={{ animation: 'wordIn 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              Anas
            </span>{' '}
            <span
              className="inline-block"
              style={{ animation: 'wordIn 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              Masama.
            </span>
          </h1>
          <p className="m-0 max-w-[52ch] text-[clamp(17px,2vw,20px)] font-normal leading-[1.6] text-[#f3f2ee]/75">
            I build software. Websites, apps and AI tools that actually work. I run
            TeenovateX Labs, a community helping young people in Africa learn to build
            things.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a
              href="#labs"
              className="inline-block rounded-full bg-[#f3f2ee] px-[26px] py-3.5 text-sm font-bold text-[#060606] transition-transform duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:scale-[1.02] active:scale-[0.96]"
            >
              See my labs
            </a>
            <a
              href="#booking"
              className="inline-block whitespace-nowrap rounded-full border border-[#f3f2ee]/20 px-[26px] py-3.5 text-sm font-bold text-[#f3f2ee] transition-[transform,border-color,background] duration-200 ease-out hover:-translate-y-[3px] hover:border-[#34c97e] hover:bg-[#34c97e]/[0.08] active:scale-[0.96]"
            >
              Book a call
            </a>
          </div>
        </div>
        <div ref={imgWrapRef} className="relative justify-self-center">
          <div className="group aspect-[3/4] w-[min(360px,80vw)] overflow-hidden rounded-[20px] border border-[#f3f2ee]/10 transition-colors duration-[350ms] ease-out hover:border-[#34c97e]">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Anas Abubakar Masama — Software Engineer and AI Developer based in Lagos, Nigeria"
                width={720}
                height={960}
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
