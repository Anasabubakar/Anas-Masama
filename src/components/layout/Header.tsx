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
      <div
        className={[
          "fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-md sm:max-w-lg lg:max-w-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showChrome ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-6 pointer-events-none",
        ].join(" ")}
      >
        <div className="prismatic-wrapper w-full">
          <div className="glass-card w-full rounded-full px-5 py-3">
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
              <SafeHireMeDialog>
                <Button
                  className="hidden sm:inline-flex h-10 px-4 rounded-full border border-primary/40 font-semibold text-xs text-primary-foreground"
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
                  Hire Me
                </Button>
              </SafeHireMeDialog>
            </div>
          </div>
        </div>
      </div>

      <div
        className={[
          "fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[82%] max-w-[360px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showChrome ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <div
            className="glass-card flex-1 flex items-center gap-0.5 rounded-full px-1.5 py-2.5 overflow-hidden"
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
                    padding: isActive ? '12px 12px' : '12px 10px',
                    minWidth: isActive ? 90 : 40,
                    gap: isActive ? 6 : 0,
                    color: isActive ? '#ffffff' : '#ffffff',
                    background: isActive ? 'linear-gradient(145deg, rgba(45,185,133,0.95), rgba(24,120,86,0.95))' : 'transparent',
                    boxShadow: isActive ? '0 10px 20px rgba(45,185,133,0.25), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
                  }}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <span
                      className="text-[13px] font-semibold tracking-tight whitespace-nowrap"
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
              className="h-14 w-14 rounded-full border border-primary/40 font-semibold text-sm text-primary-foreground px-0"
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
              <BriefcaseBusiness className="h-4 w-4" />
            </Button>
          </SafeHireMeDialog>
        </div>
      </div>
    </>,
    document.body
  );
}
