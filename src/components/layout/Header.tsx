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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <nav className="fixed top-0 left-0 right-0 z-[9999] flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-14">
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

      <div className="flex flex-wrap items-center gap-6 sm:gap-7">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-semibold text-[#f3f2ee]/70 transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-[#34c97e]"
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
