'use client';

import { Briefcase, GraduationCap, Search, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { SafeHireMeDialog } from '../SafeHireMeDialog';
import { cn } from '@/lib/utils';

const timelineData = [
  {
    icon: <Search />,
    date: 'Present',
    title: 'Future Architect',
    organization: 'Global Impact',
    description: 'Currently building Earth\'s next generation of innovators through cutting-edge software solutions and architectural excellence.',
    tags: ['Architecture', 'Leadership', 'Innovation']
  },
  {
    icon: <Briefcase />,
    date: 'Jan 2025 - May 2025',
    title: 'Software Engineer Trainee',
    organization: 'Be-Mint 2.0',
    description: 'Contributing to high-impact projects, refining engineering workflows, and collaborating with cross-functional teams.',
    tags: ['Software Engineering', 'Teamwork', 'Product']
  },
  {
    icon: <GraduationCap />,
    date: 'Dec 2023',
    title: 'Career Launch',
    organization: 'Vision Programming Tech',
    description: 'Transitioned into professional engineering, delivering robust solutions for complex business requirements.',
    tags: ['Web Dev', 'Freelance', 'Consulting']
  },
  {
    icon: <Calendar />,
    date: 'June 2020',
    title: 'The Foundation',
    organization: 'Academic Start',
    description: 'Deep diving into computer science fundamentals, algorithm design, and software engineering principles.',
    tags: ['CS Fundamentals', 'Algorithms', 'Logic']
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-32 bg-background relative">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
           <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">The Journey</h2>
           <h3 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">PROFESSIONAL <br /> EVOLUTION</h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Content */}
                <div className="w-full md:w-[45%]">
                   <div className="glass-card p-8 rounded-[2rem] hover:bg-white/[0.03] transition-all duration-500 group">
                      <div className="flex items-center gap-2 text-primary text-[10px] uppercase font-bold tracking-widest mb-4">
                         <Calendar className="w-3 h-3" />
                         {item.date}
                      </div>
                      <h4 className="text-2xl font-bold tracking-tight mb-1">{item.title}</h4>
                      <p className="text-primary/60 text-xs font-bold uppercase tracking-widest mb-4">{item.organization}</p>
                      <p className="text-muted-foreground font-light leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                         {item.tags.map(tag => (
                           <span key={tag} className="text-[9px] uppercase font-bold text-muted-foreground/60 px-2 py-1 rounded-full border border-white/5">
                             {tag}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full glass-card border-primary/30 flex items-center justify-center text-primary z-10 bg-background">
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                   </div>
                </div>

                {/* Spacer for Desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-32">
          <SafeHireMeDialog>
            <Button size="lg" className="rounded-full h-16 px-12 text-xl font-bold border-white/10 hover:bg-white/5 transition-all duration-300" variant="outline">
              Join the Journey
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </SafeHireMeDialog>
        </div>
      </div>
    </section>
  );
}
