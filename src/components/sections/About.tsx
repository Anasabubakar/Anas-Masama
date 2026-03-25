'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, PieChart, ArrowRight, Github, Linkedin, CheckCircle2, Award } from 'lucide-react';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

const expertise = [
  "Advanced System Architecture",
  "High-Performance Web Apps",
  "AI & Machine Learning Integration",
  "Cloud Infrastructure (AWS/GCP)",
  "Full-Stack Engineering Excellence",
  "Strategic Technical Leadership"
];

export function About() {
  return (
    <section id="about" className="py-32 bg-secondary/10 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative order-2 lg:order-1">
             <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="relative h-full w-full rounded-[3rem] overflow-hidden glass-card p-4">
                   <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
                      <Image
                        src="/images/Lodge.jpg"
                        alt="Engineering Vision"
                        fill
                        className="object-cover"
                      />
                   </div>
                </div>

                {/* Floating Experience Card */}
                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl max-w-[200px]">
                    <Award className="w-10 h-10 text-primary mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Commitment</p>
                    <p className="text-lg font-black leading-tight">WORLD CLASS QUALITY</p>
                </div>
             </div>
          </div>

          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">The Visionary</h2>
              <h3 className="text-5xl md:text-6xl font-black font-headline tracking-tighter leading-none">
                BUILDING THE <br /> NEXT ERA
              </h3>
              <div className="space-y-6 text-muted-foreground text-xl font-light leading-relaxed">
                <p>
                 I’m <span className="text-foreground font-semibold">Anas Abubakar Masama</span>. I don't just write code; I architect solutions that empower the next generation of innovators.
                </p>
                <p>
                My approach combines deep technical expertise with a forward-thinking vision, ensuring every project I touch is built for scale, performance, and long-term impact.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               {expertise.map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground/80">{item}</span>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6">
               <Button asChild size="lg" className="rounded-full h-14 px-8 font-bold bg-foreground text-background hover:bg-foreground/90">
                <a href="https://drive.google.com/file/d/1XWs9OdhAqW8pgEQF_-Bpn9zHOBnoOZQOdlib6ggfCbE/view" target="_blank" rel="noopener noreferrer">
                  Download CV <Download className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <SafeHireMeDialog>
                <Button variant="outline" size="lg" className="rounded-full h-14 px-8 font-bold border-white/10 hover:bg-white/5">
                  Let's Talk <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SafeHireMeDialog>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
