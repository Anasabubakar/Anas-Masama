import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { ArrowRight, StarIcon } from 'lucide-react';
import { HireMeButton } from '../HireMeButton';

const projects = [
  {
    id: 'project-1',
    title: '🧠 PillPal',
    description: 'A simple, AI-powered reminder app that helps users track their meds without stress. Built with a clean flow, focused on ease and reliability.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveLink: 'https://pill-pal-eta.vercel.app',
  },
  {
    id: 'project-2',
    title: '💡 EmpowerYou',
    description: 'A private digital space for self-growth and reflection. It helps users organize goals, track habits, and grow with AI support.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://empoweryou.vercel.app',
  },
  {
    id: 'project-3',
    title: '💸 MonieFlow',
    description: 'A modern finance tracker for students with smooth visuals and smart insights to make them do Gigs and get paid instantly. It makes budgeting less boring and more visual.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://monieplow-spark.vercel.app',
  },
  {
    id: 'project-4',
    title: '🚀 TeenovateX Labs',
    description: 'A youth-driven platform built to teach, connect, and empower creators across Africa. Learning, opportunities, and community in one space.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveLink: 'https://teenovatex-labs.vercel.app',
  },
  {
    id: 'project-5',
    title: '🕹 Last Shield',
    description: 'A fast-paced survival shooter made for itch.io. You defend the last base on Earth against endless waves - pure chaos and fun.',
    tags: ['HTML', 'CSS', 'JS', 'Itch.io'],
    liveLink: 'https://31133498.itch.io/last-shield',
  },
];

const ScrollingBanner = () => {
  const texts = ["Let's build something amazing together"];
  const repeatedTexts = Array(10).fill(texts).flat();

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-secondary/20 py-4 mt-20">
      <div className="flex marquee-rtl">
        {repeatedTexts.map((text, index) => (
          <div key={index} className="flex items-center mx-6 shrink-0">
            <span className="text-2xl font-bold text-foreground whitespace-nowrap font-headline uppercase tracking-widest">{text}</span>
            <StarIcon className="w-6 h-6 text-primary mx-6" />
          </div>
        ))}
      </div>
    </div>
  );
};


export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <p className="font-semibold text-primary uppercase tracking-widest font-body">My Recent Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-2">Elevate your brand to new heights</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const image = PlaceHolderImages.find((img) => img.id === project.id);
            return (
              <Card key={project.id} className="group/card flex flex-col overflow-hidden bg-card border-border transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1">
                {image && (
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={image.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-2xl group-hover/card:text-primary transition-colors">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary" className="font-code">{tag}</Badge>)}
                  </div>
                </CardContent>
                 <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 text-primary">
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowRight className="ml-2 transition-transform duration-300 group-hover/card:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
         <div className="text-center mt-16">
          <HireMeButton />
        </div>
      </div>
       <ScrollingBanner />
    </section>
  );
}
