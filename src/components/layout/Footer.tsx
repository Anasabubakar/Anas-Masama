'use client';

import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';
import Image from 'next/image';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.05l8.6-9.83-8.209-9.064h7.585l5.243 7.185L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-white/5 py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 space-y-8">
             <Link href="/" className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
                <div className="w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                  <Image
                    src="/images/logo-small.png"
                    alt="Anas Masama Logo"
                    width={24}
                    height={24}
                  />
                </div>
                <span>Anas Masama</span>
              </Link>
              <p className="text-muted-foreground text-lg font-light max-w-sm">
                Architecting Earth's next generation of digital experiences through high-performance software engineering.
              </p>
          </div>
          
          <div className="space-y-6">
             <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Navigation</h5>
             <nav className="flex flex-col gap-4">
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</a>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors font-medium">Projects</a>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Services</a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a>
             </nav>
          </div>

          <div className="space-y-6">
             <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Social</h5>
             <nav className="flex flex-col gap-4">
                <Link href="https://www.linkedin.com/in/Anasmasama" target="_blank" className="text-muted-foreground hover:text-primary transition-colors font-medium">LinkedIn</Link>
                <Link href="https://www.github.com/Anasabubakar" target="_blank" className="text-muted-foreground hover:text-primary transition-colors font-medium">GitHub</Link>
                <Link href="https://www.twitter.com/Anas_Abubakar70" target="_blank" className="text-muted-foreground hover:text-primary transition-colors font-medium">Twitter</Link>
                <Link href="https://wa.me/+2347064294297" target="_blank" className="text-muted-foreground hover:text-primary transition-colors font-medium">WhatsApp</Link>
             </nav>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              &copy; {year} ANAS ABUBAKAR MASAMA • BUILT FOR IMPACT
           </p>
           <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary"
           >
              Back to Top
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                 <ArrowUp className="w-4 h-4" />
              </div>
           </button>
        </div>
      </div>
    </footer>
  );
}
