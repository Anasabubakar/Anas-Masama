'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, ArrowRight, GithubIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
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

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L9.414 6.586 16 8l-6.586 1.414L8 16l-1.414-6.586L0 8l6.586-1.414L8 0z" />
  </svg>
);

const ScrollingSkills = () => {
  const skills = ["Fullstack Development", "Architecture Design", "Software Engineering", "AI Integration", "Cloud Infrastructure", "UI/UX Optimization"];
  const repeatedSkills = Array(10).fill(skills).flat();

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.03] py-6 mb-10">
      <div className="flex marquee">
        {repeatedSkills.map((skill, index) => (
          <div key={index} className="flex items-center mx-10 shrink-0">
            <span className="text-xl font-bold text-white/70 whitespace-nowrap font-headline uppercase tracking-[0.2em]">{skill}</span>
            <StarIcon className="w-4 h-4 text-primary/60 mx-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-portrait');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="hero" className="relative min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-transparent pt-32">
      {/* Background Elements removed to show Silk background */}
      
      <div className="container max-w-7xl mx-auto px-6 z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black font-headline leading-[0.9] tracking-tighter">
                CRAFTING THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/60">FUTURE</span> OF WEBS
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                I'm <span className="text-foreground font-semibold">Anas Abubakar Masama</span>. A Software Engineer and Future Architect building Earth's next generation of digital experiences.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold group bg-primary hover:bg-primary/90 transition-all duration-300" asChild>
                <a href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg font-bold border-white/10 hover:bg-white/5 transition-all duration-300" asChild>
                <a href="https://docs.google.com/document/d/14jyIrbxZq11wVatBQO_skgZATHC38aILMRKStdWHGkI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  View CV
                  <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8">
               <Link href="https://www.github.com/Anasabubakar" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6" />
               </Link>
               <Link href="https://www.linkedin.com/in/anasmasama" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
               </Link>
               <Link href="https://www.twitter.com/Anas_Abubakar70" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-all duration-300 hover:scale-110">
                  <XIcon className="w-5 h-5" />
               </Link>
               <Link href="https://wa.me/+2347064294297" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-all duration-300 hover:scale-110">
                  <WhatsappIcon className="w-6 h-6" />
               </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-[450px] aspect-square">
               {/* Background Decorative Circles */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow" />
              <div className="absolute -inset-10 border border-white/5 rounded-full animate-spin-slow [animation-direction:reverse]" />
              
              <div className="absolute inset-4 rounded-3xl overflow-hidden glass-card p-2 group">
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white/5">
                  {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt="Anas Masama"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl">
                <div className="text-4xl font-bold text-primary">5+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Years Experience</div>
              </div>
              
              <div className="absolute -top-6 -left-6 glass-card p-4 rounded-2xl">
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold mt-1">Global Standard</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="mt-20">
        <ScrollingSkills />
      </div>

    </section>
  );
}
