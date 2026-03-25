'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SafeHireMeDialog } from '../SafeHireMeDialog';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 'project-1',
    title: 'PillPal AI',
    category: 'Healthcare • AI',
    description: 'A revolutionary AI-powered medication tracking system. Focused on simplifying complex treatment schedules with intuitive design.',
    tags: ['Next.js', 'TypeScript', 'AI', 'Firebase'],
    liveLink: 'https://pill-pal-eta.vercel.app',
  },
  {
    id: 'project-2',
    title: 'EmpowerYou',
    category: 'Productivity • Wellness',
    description: 'A premium digital sanctuary for self-optimization. Features smart habit tracking and AI-driven growth insights.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    liveLink: 'https://empoweryou.vercel.app',
  },
  {
    id: 'project-3',
    title: 'MonieFlow',
    category: 'Fintech • Students',
    description: 'Next-gen financial management for the modern student. Merging smooth aesthetics with powerful budgeting tools.',
    tags: ['Next.js', 'Stripe', 'Framer Motion'],
    liveLink: 'https://monieplow-spark.vercel.app',
  },
  {
    id: 'project-4',
    title: 'TeenovateX',
    category: 'EdTech • Community',
    description: 'Empowering the next generation of African creators. A comprehensive platform for learning and opportunity.',
    tags: ['Next.js', 'Firebase', 'Auth'],
    liveLink: 'https://teenovatex-labs.vercel.app',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Selected Works</h2>
            <h3 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
              DIGITAL <br /> MASTERPIECES
            </h3>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-light">
            A curation of high-impact digital solutions built with precision and modern engineering standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const image = PlaceHolderImages.find((img) => img.id === project.id);
            return (
              <div 
                key={project.id} 
                className={cn(
                  "group relative",
                  index % 2 === 1 ? "md:mt-24" : ""
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-card p-3 mb-8">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                       <Button asChild variant="secondary" className="rounded-full px-8 h-14 font-bold">
                          <Link href={project.liveLink} target="_blank">
                            View Live <ExternalLink className="ml-2 w-4 h-4" />
                          </Link>
                       </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">{project.category}</span>
                    <div className="flex gap-2">
                       {project.tags.slice(0, 2).map(tag => (
                         <span key={tag} className="text-[10px] uppercase font-bold text-muted-foreground border border-white/10 px-2 py-1 rounded-md">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">{project.title}</h4>
                  <p className="text-muted-foreground font-light text-lg leading-relaxed">{project.description}</p>
                  
                  <Link 
                    href={project.liveLink} 
                    target="_blank"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link"
                  >
                    Details <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block glass-card p-12 rounded-[3rem] max-w-3xl w-full">
            <h5 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">HAVE A VISION?</h5>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto font-light">
              I specialize in turning complex ideas into high-performance digital realities.
            </p>
            <SafeHireMeDialog>
              <Button size="lg" className="rounded-full h-16 px-12 text-xl font-bold bg-primary hover:bg-primary/90">
                Start a Project
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </SafeHireMeDialog>
          </div>
        </div>
      </div>
    </section>
  );
}
