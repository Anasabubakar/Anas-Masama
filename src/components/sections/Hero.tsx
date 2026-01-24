'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';

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


const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-28 hidden md:flex items-center justify-center z-20">
    <div className="absolute inset-0 animate-spin-slow">
      <svg viewBox="0 0 100 100">
        <path
          id="circlePath"
          fill="none"
          stroke="none"
          d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
        />
        <text fill="hsl(var(--muted-foreground))" className="text-[10px] font-medium tracking-widest uppercase">
          <textPath href="#circlePath">
            Scroll for more * Scroll for more * Scroll for more *
          </textPath>
        </text>
      </svg>
    </div>
    <div className="text-primary text-glow">
      <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0L9.414 6.586 16 8l-6.586 1.414L8 16l-1.414-6.586L0 8l6.586-1.414L8 0z" />
      </svg>
    </div>
  </div>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L9.414 6.586 16 8l-6.586 1.414L8 16l-1.414-6.586L0 8l6.586-1.414L8 0z" />
  </svg>
);

const ScrollingSkills = () => {
  const skills = ["Software Engineer", "Future Architect"];
  const repeatedSkills = Array(10).fill(skills).flat();

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-secondary/20 py-4">
      <div className="flex marquee">
        {repeatedSkills.map((skill, index) => (
          <div key={index} className="flex items-center mx-6 shrink-0">
            <span className="text-2xl font-bold text-foreground whitespace-nowrap font-headline uppercase tracking-widest">{skill}</span>
            <StarIcon className="w-6 h-6 text-primary mx-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

const CYCLING_TEXT = ["Software Engineer", "Future Architect"];

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-portrait');
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = CYCLING_TEXT[wordIndex];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % CYCLING_TEXT.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, wordIndex]);

  const handleMouseEnter = (cursorType: 'text' | 'image') => {
    document.body.dataset.cursor = cursorType;
  };

  const handleMouseLeave = () => {
    document.body.dataset.cursor = 'default';
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background pt-20">
       <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at top left, hsl(var(--primary) / 0.2), transparent 40%), radial-gradient(circle at bottom right, hsl(var(--primary) / 0.2), transparent 40%)'
        }}
      />
      <div className="container z-10 flex-1 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline uppercase leading-none tracking-tighter">
                Hi, I'm Anas!
              </h1>
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline uppercase leading-none tracking-tighter text-primary text-glow"
                onMouseEnter={() => handleMouseEnter('text')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={cn('transition-opacity duration-500')}>
                  {text}
                </span>
                <span className="animate-blink">|</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              I’m a Software Engineer and Future Architect dedicated to building Earth's next generation of innovators.
            </p>
            <Button size="lg" asChild>
              <a href="https://drive.google.com/file/d/1XWs9OdhAqW8pgEQF_-Bpn9zHOBnoOZQOdlib6ggfCbE/view" target="_blank" rel="noopener noreferrer">
                Download CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div 
            className="relative flex justify-center items-center h-[400px] md:h-[500px] group z-20"
            onMouseEnter={() => handleMouseEnter('image')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute w-4/5 h-4/5 bg-primary/20 rounded-full animate-float transition-all duration-300 group-hover:shadow-[0_0_40px_hsl(var(--primary))]"></div>
            {heroImage &&
              <div className="relative w-full h-full max-w-[350px] max-h-[450px] z-10">
                <Image
                  src={heroImage.imageUrl}
                  alt="Anas Masama"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="Software Engineer portrait no background"
                  priority
                />
              </div>
            }
             <Link href="https://www.github.com/Anasabubakar" target="_blank" rel="noopener noreferrer" className="absolute top-10 -left-2 md:-left-5 z-20 group">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110 group-hover:shadow-lg">
                    <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"/>
                </div>
            </Link>
             <Link href="https://www.linkedin.com/in/Anasmasama" target="_blank" rel="noopener noreferrer" className="absolute top-1/3 -right-2 md:-right-5 z-20 group">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110 group-hover:shadow-lg">
                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"/>
                </div>
            </Link>
             <Link href="https://www.twitter.com/Anas_Abubakar70" target="_blank" rel="noopener noreferrer" className="absolute bottom-1/4 -left-4 md:-left-8 z-20 group">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110 group-hover:shadow-lg">
                    <XIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"/>
                </div>
            </Link>
             <Link href="https://wa.me/+2347064294297" target="_blank" rel="noopener noreferrer" className="absolute bottom-0 -right-2 md:-right-4 z-20 group">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110 group-hover:shadow-lg">
                    <WhatsappIcon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors"/>
                </div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 z-10">
        <ScrollingSkills />
      </div>

      <ScrollIndicator />
    </section>
  );
}
