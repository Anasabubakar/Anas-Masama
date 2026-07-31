'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Labs', href: '#labs' },
  { label: 'Book a call', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showChrome, setShowChrome] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isLoading = document.body.dataset.loading === 'true';
    if (!isLoading) setShowChrome(true);
    const onComplete = () => setShowChrome(true);
    window.addEventListener('loading:complete', onComplete);
    return () => window.removeEventListener('loading:complete', onComplete);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[9999] flex flex-wrap items-center justify-between gap-4 px-5 py-5 backdrop-blur-md transition-[opacity,transform,background,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 lg:px-14',
        showChrome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
      ].join(' ')}
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(6,6,6,.6), rgba(6,6,6,.35))'
          : 'linear-gradient(180deg, rgba(6,6,6,.85), rgba(6,6,6,0))',
        boxShadow: scrolled ? '0 1px 0 rgba(243,242,238,.08)' : 'none',
      }}
    >
      <Link href="/" className="prismatic-wrapper">
        <span className="flex items-center gap-2.5 rounded-full bg-[#060606] py-2 pl-2 pr-4 text-[15px] font-extrabold tracking-[0.02em] text-[#f3f2ee] whitespace-nowrap">
          <Image
            src="/images/logo-small.png"
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-[7px] object-cover"
          />
          Anas Masama
        </span>
      </Link>

      <div className="hidden flex-wrap items-center gap-6 md:flex lg:gap-7">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded text-sm font-semibold text-[#f3f2ee]/70 transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-[#34c97e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#booking"
        className="inline-block whitespace-nowrap rounded-full bg-[#f3f2ee] px-5 py-2.5 text-[13px] font-bold text-[#060606] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
      >
        Book a call
      </a>
    </nav>,
    document.body
  );
}
