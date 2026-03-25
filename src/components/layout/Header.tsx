'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
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
                <ArrowRight className="ml-1.5 h-3.5 w-3.5"/>
              </Button>
            </SafeHireMeDialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "rounded-full border border-white/10 transition-all duration-500",
                isMenuOpen ? "bg-primary/20 border-primary/50" : "bg-white/5"
              )}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-700 flex flex-col",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{ background: 'radial-gradient(ellipse at top, rgba(45,185,133,0.08) 0%, rgba(0,0,0,0.98) 50%, #000 100%)' }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
        
        <div className="relative z-10 flex justify-end p-6 pt-24">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="relative z-10 flex flex-col items-center justify-center flex-1 gap-0">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-4xl font-black tracking-tight transition-all duration-500 hover:text-primary text-center py-4 relative group",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: `${i * 80 + 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-full scale-150 transition-all duration-500" />
            </Link>
          ))}
        </nav>
        
        <div className="relative z-10 pb-12 px-6">
          <SafeHireMeDialog>
            <Button 
              size="lg" 
              className={cn(
                "w-full py-6 text-lg font-bold transition-all duration-500 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(45,185,133,0.3)] rounded-full",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: `${navLinks.length * 80 + 200}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2">Start a Project</span>
              <ArrowRight className="h-5 w-5"/>
            </Button>
          </SafeHireMeDialog>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
        </div>
        
        <div className="relative z-10 absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </header>
  );
}
