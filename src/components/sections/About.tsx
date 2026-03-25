'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, PieChart, ArrowRight, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

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


export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-semibold text-primary uppercase tracking-widest font-body">About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">Building Earth's next generation of innovators</h2>
            </div>
            <div className="space-y-6 text-muted-foreground text-lg">
                <p>
                 I’m Anas Abubakar Masama - a Software Engineer and Future Architect. I build, design, and learn every single day with a mission to empower the next generation.
                </p>
                <p>
                What drives me isn’t just progress, but the creation of tools and experiences that inspire innovation and growth in others.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <Button asChild size="lg">
                <a href="https://drive.google.com/file/d/1XWs9OdhAqW8pgEQF_-Bpn9zHOBnoOZQOdlib6ggfCbE/view" target="_blank" rel="noopener noreferrer">
                  Download CV <Download className="ml-2" />
                </a>
              </Button>
               <SafeHireMeDialog>
                <Button variant="outline" size="lg">
                  Hire Me <ArrowRight className="ml-2" />
                </Button>
              </SafeHireMeDialog>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[450px] mt-12 md:mt-0">
            <div className="absolute inset-0 -m-4">
              <div className="h-full w-full border-2 border-primary rounded-tr-[4rem] rounded-bl-[4rem]"></div>
            </div>
            <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-2xl z-10 rounded-tr-[4rem] rounded-bl-[4rem]">
              <Image
                src="/images/Lodge.jpg"
                alt="Modern building"
                fill
                className="object-cover"
                data-ai-hint="architecture building"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 text-primary p-2 rounded-full">
                        <PieChart className="w-6 h-6"/>
                    </div>
                    <div>
                        <p className="font-bold text-card-foreground">Daily Activity</p>
                        <p className="text-sm text-muted-foreground">Software Engineer & Future Architect</p>
                    </div>
                  </div>
              </div>
            </div>
            
            {/* Social Links */}
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
    </section>
  );
}
