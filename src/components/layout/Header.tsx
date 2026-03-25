'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, User, Briefcase, Layers, Mail } from 'lucide-react';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const dockTabs = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
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

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-sm sm:max-w-md lg:max-w-lg pointer-events-auto">
        <Link href="/" className="flex items-center gap-3 rounded-full border border-white/20 bg-black/70 backdrop-blur-2xl px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
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
        </Link>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-sm sm:max-w-md lg:max-w-lg pointer-events-auto">
        <div className="flex items-center gap-4">
          <div
            className="flex-1 flex items-center gap-1 rounded-full border border-white/30 bg-white/80 px-1.5 py-1.5 backdrop-blur-2xl"
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
                    padding: isActive ? '10px 18px' : '10px 12px',
                    minWidth: isActive ? 120 : 44,
                    gap: isActive ? 8 : 0,
                    color: isActive ? '#101114' : '#7b7b88',
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
            <button
              className="h-14 w-14 rounded-full border-0 outline-none flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #f4857a, #e85d50)',
                boxShadow:
                  '0 8px 28px rgba(232,93,80,0.48), 0 2px 8px rgba(232,93,80,0.28), inset 0 1px 0 rgba(255,200,190,0.4)',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              aria-label="Start a project"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </SafeHireMeDialog>
        </div>
      </div>
    </>,
    document.body
  );
}
