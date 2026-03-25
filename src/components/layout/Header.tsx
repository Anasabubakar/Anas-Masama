'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="hidden md:fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="bg-black/70 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3 font-bold text-xl tracking-tighter">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-white/10 bg-transparent flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:rotate-6">
                <Image
                  src="/images/logo-small.png"
                  alt="Anas Masama Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="hidden sm:inline bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Anas Masama</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/70 px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary rounded-full hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="h-5 w-px bg-white/10 mx-1" />
              <SafeHireMeDialog>
                <Button size="sm" className="rounded-full px-5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                  Hire Me
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </SafeHireMeDialog>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Logo + Dock */}
      <div className="md:hidden">
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/logo-small.png"
                alt="Anas Masama Logo"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <div className="leading-none">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Anas Masama</p>
              <p className="text-lg font-bold tracking-tight">Software Engineer</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
          <nav className="flex items-center justify-between gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-1 text-center text-xs font-semibold tracking-wide text-white/80 px-3 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <SafeHireMeDialog>
              <Button size="sm" className="rounded-full px-4 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(45,185,133,0.35)]">
                Hire
              </Button>
            </SafeHireMeDialog>
          </nav>
        </div>
      </div>
    </>
  );
}
