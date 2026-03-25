'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Star, Code2, Layers, Zap, Globe, Shield, Brain, Wallet, GraduationCap, Heart, Pill, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 'teenovatex',
    title: 'TeenovateX Labs',
    tagline: 'Empowering the next generation of African creators',
    category: 'EdTech • Community',
    description: 'A comprehensive platform for learning and opportunity. Building the future of African innovation through education, mentorship, and community.',
    tech: ['Next.js', 'Firebase', 'Auth', 'React'],
    liveLink: 'https://teenovatex.org',
    githubLink: 'https://github.com/Anasabubakar/TeenovateX-Labs',
    icon: <GraduationCap className="w-6 h-6" />,
    featured: true,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'jackpal',
    title: 'JackPal',
    tagline: 'Your AI-powered assistant for everything',
    category: 'AI • Productivity',
    description: 'An intelligent personal assistant powered by advanced AI. Helps with tasks, answers questions, and streamlines daily workflows.',
    tech: ['Next.js', 'TypeScript', 'AI', 'OpenAI'],
    liveLink: 'https://jackpal.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/JackPal',
    icon: <Brain className="w-6 h-6" />,
    featured: true,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'marcedivault',
    title: 'MarcediVault',
    tagline: 'Next-generation Web3 dashboard',
    category: 'Web3 • Finance',
    description: 'A powerful Web3 portfolio tracker and analytics platform. Monitor your crypto assets, DeFi positions, and NFT collections in one place.',
    tech: ['Next.js', 'Web3', 'TypeScript', 'Tailwind'],
    liveLink: 'https://web3-site-kappa.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Web3-Site',
    icon: <Wallet className="w-6 h-6" />,
    featured: true,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'kinzoku',
    title: 'Kinzoku Blueprint Forge',
    tagline: 'Forge your digital destiny',
    category: 'Platform • Creative',
    description: 'A cutting-edge platform for digital creators. Design, deploy, and monetize your creative assets with powerful tooling.',
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB'],
    liveLink: 'https://ai.studio.apps/drive/17n6l3RtYoq5LYqpcpOA4OjjUc7F2tsQc?fullscreenApplet=true',
    githubLink: 'https://github.com/Anasabubakar/Kinzoku-Blueprint-Forge',
    icon: <Sparkles className="w-6 h-6" />,
    featured: false,
    color: 'from-slate-500 to-zinc-500',
  },
  {
    id: 'edupeak',
    title: 'EduPeak',
    tagline: 'Peak performance in learning',
    category: 'EdTech • Platform',
    description: 'An innovative learning management system. Track progress, achieve milestones, and unlock your full potential.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    liveLink: 'https://edupeak-eta.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Edupeak',
    icon: <Layers className="w-6 h-6" />,
    featured: true,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'ilmeen',
    title: 'Ilmeen',
    tagline: 'Where creativity meets code',
    category: 'Portfolio • Creative',
    description: 'A stunning portfolio template for creative professionals. Showcase your work with elegance and style.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'React'],
    liveLink: 'https://ilmeen-rose.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Ilmeen',
    icon: <Code2 className="w-6 h-6" />,
    featured: false,
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'empower-you',
    title: 'Empower-You',
    tagline: 'Transform your habits, transform your life',
    category: 'Wellness • Productivity',
    description: 'A premium digital sanctuary for self-optimization. Smart habit tracking meets AI-driven growth insights.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind', 'AI'],
    liveLink: 'https://empower-you.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/EmpowerYou',
    icon: <Heart className="w-6 h-6" />,
    featured: false,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'pill-pal',
    title: 'Pill-Pal',
    tagline: 'Your health, simplified',
    category: 'Healthcare • AI',
    description: 'A revolutionary AI-powered medication tracking system. Never miss a dose with intelligent reminders.',
    tech: ['Next.js', 'TypeScript', 'AI', 'Firebase'],
    liveLink: 'https://pill-pal-eta.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Pill-Pal',
    icon: <Pill className="w-6 h-6" />,
    featured: false,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'monieflow',
    title: 'MonieFlow',
    tagline: 'Student finance, reimagined',
    category: 'Fintech • Students',
    description: 'Next-gen financial management for students. Beautiful design meets powerful budgeting tools.',
    tech: ['Next.js', 'Stripe', 'Framer Motion', 'Tailwind'],
    liveLink: 'https://monieplow-spark.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/MonieFlow',
    icon: <Zap className="w-6 h-6" />,
    featured: true,
    color: 'from-violet-500 to-purple-500',
  },
];

const categories = ['All', 'EdTech', 'AI', 'Web3', 'Fintech', 'Healthcare', 'Productivity', 'Portfolio', 'Platform'];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="mb-16 space-y-6">
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
            <p className="text-white/70 max-w-2xl text-xl font-light leading-relaxed">
              A comprehensive archive of my technical journey. From enterprise solutions to experimental prototypes — each project represents a step forward in my evolution as a builder.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-primary" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.filter(p => p.featured).map((project, idx) => (
                <div 
                  key={project.id}
                  className={cn(
                    "group relative overflow-hidden rounded-[2.5rem] glass-card p-1",
                    idx % 2 === 1 ? "md:mt-12" : ""
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 opacity-20 bg-gradient-to-br",
                    project.color
                  )} />
                  
                  <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden bg-black/40 p-8">
                    {/* Project Icon */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br",
                      project.color
                    )}>
                      <div className="text-white">{project.icon}</div>
                    </div>
                    
                    {/* Category */}
                    <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">
                      {project.category}
                    </span>
                    
                    {/* Title */}
                    <h4 className="text-3xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    
                    {/* Tagline */}
                    <p className="text-white/60 text-sm mb-4 font-medium">
                      {project.tagline}
                    </p>
                    
                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(tech => (
                        <span key={tech} className="text-[10px] uppercase font-bold text-white/40 px-3 py-1 rounded-full border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-4">
                      <Button asChild size="sm" className="rounded-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground">
                        <Link href={project.liveLink} target="_blank">
                          View Live <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                        <Link href={project.githubLink} target="_blank">
                          <Github className="mr-2 w-4 h-4" /> Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-primary" />
              All Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group glass-card rounded-[2rem] p-6 hover:bg-white/[0.05] transition-all duration-500"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      `bg-gradient-to-br ${project.color}`
                    )}>
                      <div className="text-white">{project.icon}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                      {project.category.split('•')[0].trim()}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <h4 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map(tech => (
                      <span key={tech} className="text-[8px] uppercase font-bold text-white/30 px-2 py-0.5 rounded-md bg-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link 
                      href={project.liveLink} 
                      target="_blank"
                      className="flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                    >
                      Live <ExternalLink className="ml-1 w-3 h-3" />
                    </Link>
                    <Link 
                      href={project.githubLink} 
                      target="_blank"
                      className="flex items-center text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Github className="mr-1 w-3 h-3" /> Code
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More on GitHub */}
          <div className="glass-card rounded-[3rem] p-12 text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-black mb-4">View More on GitHub</h3>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Explore additional projects, experiments, and open-source contributions on my GitHub profile.
            </p>
            <Button asChild size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/90">
              <Link href="https://github.com/Anasabubakar" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}