'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Home, User, Briefcase, Layers, Mail, BriefcaseBusiness } from 'lucide-react';
import { SafeHireMeDialog } from '../SafeHireMeDialog';
import { Button } from '@/components/ui/button';

const dockTabs = [
  { id: 'home', label: 'Home', href: '#hero', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'services', label: 'Services', href: '#services', icon: Layers },
  { id: 'projects', label: 'Projects', href: '#projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export function Header() {
  const [activeDock, setActiveDock] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sectionIds = ['about', 'services', 'projects', 'contact'];
    const getActive = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      if (window.scrollY < 80) return 'home';
      for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) return id;
      }
      return 'home';
    };
    const onScroll = () => {
      const next = getActive();
      setActiveDock((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-md sm:max-w-lg lg:max-w-xl pointer-events-auto">
        <div className="prismatic-wrapper w-full">
          <div className="w-full rounded-full bg-black/70 backdrop-blur-2xl px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-11 h-11 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/images/logo-small.png"
                    alt="Anas Masama Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="leading-none">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Anas Masama</p>
                  <p className="text-lg font-bold tracking-tight">Software Engineer</p>
                </div>
              </Link>
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(45,185,133,0.8)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[78%] max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] pointer-events-auto">
        <div className="flex items-center gap-3">
          <div
            className="glass-card flex-1 flex items-center gap-1 rounded-full px-2 py-2.5"
            style={{
              boxShadow:
                '0 12px 40px rgba(20,20,40,0.25), 0 2px 8px rgba(20,20,40,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {dockTabs.map(({ id, label, href, icon: Icon }) => {
              const isActive = activeDock === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={() => setActiveDock(id)}
                  className="relative flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    padding: isActive ? '12px 18px' : '12px 12px',
                    minWidth: isActive ? 118 : 44,
                    gap: isActive ? 8 : 0,
                    color: isActive ? '#101114' : '#ffffff',
                    background: isActive ? 'rgba(240,240,244,0.92)' : 'transparent',
                    boxShadow: isActive ? '0 2px 12px rgba(140,140,160,0.18), inset 0 1px 0 rgba(255,255,255,0.9)' : 'none',
                  }}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <span
                      className="text-sm font-semibold tracking-tight whitespace-nowrap"
                      style={{ fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif" }}
                    >
                      {label}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <SafeHireMeDialog>
            <Button
              className="h-14 px-5 rounded-full border border-primary/40 font-semibold text-sm text-primary-foreground"
              style={{
                background: 'linear-gradient(145deg, rgba(45,185,133,0.95), rgba(24,120,86,0.95))',
                boxShadow:
                  '0 10px 28px rgba(45,185,133,0.35), 0 2px 8px rgba(45,185,133,0.25), inset 0 1px 0 rgba(255,255,255,0.35)',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            >
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Hire Me
            </Button>
          </SafeHireMeDialog>
        </div>
      </div>
    </>,
    document.body
  );
}
