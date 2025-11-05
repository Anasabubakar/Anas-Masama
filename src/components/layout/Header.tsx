'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HireMeDialog } from '../HireMeDialog';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className={cn(
        "container flex items-center justify-between h-16 transition-all duration-300",
        "bg-background/70 backdrop-blur-lg border rounded-full shadow-lg",
        "border-border"
      )}>
        <Link href="/" className="group flex items-center gap-2 font-bold font-headline tracking-wider text-xl">
          <Image
            src="/images/logo-small.png"
            alt="Anas Masama Logo"
            width={28}
            height={28}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="hidden sm:inline">Anas Masama</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 px-4 py-2 nav-link-underline hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
           <HireMeDialog>
            <Button size="sm">
              Hire Me
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </HireMeDialog>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className={cn("h-6 w-6 transition-transform", isMenuOpen && "scale-0")} />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-lg z-40 transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container h-full">
            <div className="flex justify-end pt-5">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <X className="h-8 w-8" />
                    <span className="sr-only">Close menu</span>
                </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold font-headline hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                >
                {link.label}
                </Link>
            ))}
            <HireMeDialog>
                <Button size="lg" className="mt-8" onClick={() => setIsMenuOpen(false)}>
                Hire Me
                <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </HireMeDialog>
            </nav>
        </div>
      </div>
    </header>
  );
}
