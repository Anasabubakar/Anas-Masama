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
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-bold text-2xl tracking-tighter">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:rotate-6">
            <Image
              src="/images/logo-small.png"
              alt="Anas Masama Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Anas Masama</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/60 px-4 py-2 text-sm font-medium transition-colors hover:text-primary nav-link-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <SafeHireMeDialog>
            <Button size="sm" className="rounded-full px-6 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-500">
              Hire Me
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </SafeHireMeDialog>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl border border-white/10 bg-white/5"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 transition-all duration-500 flex flex-col",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex justify-end p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl border border-white/10"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-4xl font-bold tracking-tighter transition-all duration-500 hover:text-primary",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <SafeHireMeDialog>
            <Button 
              size="lg" 
              className={cn(
                "mt-10 rounded-full px-10 transition-all duration-500",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me
              <ArrowRight className="ml-2 h-5 w-5"/>
            </Button>
          </SafeHireMeDialog>
        </nav>
      </div>
    </header>
  );
}
