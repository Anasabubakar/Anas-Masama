'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const allProjects = [
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
  {
    id: 'project-5',
    title: 'Last Shield',
    category: 'Gaming • Survival',
    description: 'A fast-paced survival shooter where you defend the last base on Earth. Pure chaos and fun built for the web.',
    tags: ['HTML', 'CSS', 'JS', 'Itch.io'],
    liveLink: 'https://31133498.itch.io/last-shield',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-20 space-y-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Link>
            
            <div className="space-y-4">
              <h1 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Full Portfolio</h1>
              <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
                ALL <br /> PROJECTS
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl text-xl font-light leading-relaxed">
              A comprehensive archive of my technical journey, from enterprise solutions to experimental prototypes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {allProjects.map((project) => {
              const image = PlaceHolderImages.find((img) => img.id === project.id);
              return (
                <div key={project.id} className="group flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden rounded-3xl glass-card p-2 mb-6">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                         <Button asChild variant="secondary" size="sm" className="rounded-full px-6 font-bold">
                            <Link href={project.liveLink} target="_blank">
                              View Live <ExternalLink className="ml-2 w-4 h-4" />
                            </Link>
                         </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                       {project.tags.map(tag => (
                         <span key={tag} className="text-[9px] uppercase font-bold text-muted-foreground/60 px-2 py-1 rounded-md border border-white/5">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
