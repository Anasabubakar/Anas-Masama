'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Code2, Layers, Zap, Globe, Shield, Brain, Wallet, GraduationCap, Heart, Pill, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 'jackpal',
    title: 'JackPal',
    tagline: 'Student-first audio learning platform',
    category: 'EdTech • AI',
    description: 'JackPal is a student-first audio learning platform built for the Nigerian and African student market. Students can upload academic documents (PDFs, Word docs, text), convert them to natural-sounding audio using AI, and play them back offline — with content protection to prevent piracy.',
    fullDescription: 'Students struggle with large volumes of academic reading due to limited time, reading fatigue, visual strain, and the high cost of existing audio tools. JackPal solves this by letting students upload their academic documents, converting them to natural-sounding audio using AI, and playing them back offline — with content protection so files cannot be shared or pirated.',
    tech: ['Next.js', 'TypeScript', 'AI', 'Firebase', 'Genkit'],
    liveLink: 'https://jackpal.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/JackPal',
    image: '/images/jackpal.png',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'teenovatex',
    title: 'TeenovateX Labs',
    tagline: 'Empowering the next generation of African creators',
    category: 'NGO • Community',
    description: 'TeenovateX Labs is a cutting-edge platform designed to empower the next generation of innovators. Combining advanced AI assistance (Le AI), immersive "MAD" designs, and a vibrant community, we provide the ultimate ecosystem for teens to learn, build, and grow.',
    fullDescription: 'TeenovateX Labs is a cutting-edge platform designed to empower the next generation of innovators. Combining advanced AI assistance, immersive "MAD" designs, and a vibrant community, we provide the ultimate ecosystem for teens to learn, build, and grow. Features include Lexy AI (your personal coding companion), MAD Dashboard (visually stunning command center), Learn & Grow (curated learning paths), and Community & Trending (connect with like-minded teen innovators).',
    tech: ['Next.js', 'Firebase', 'Auth', 'React', 'AI'],
    liveLink: 'https://teenovatex.org',
    githubLink: 'https://github.com/Anasabubakar/TeenovateX-Labs',
    image: '/images/teenovatex.png',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'marcedivault',
    title: 'MarcediVault',
    tagline: 'Multi-chain custodial wallet frontend',
    category: 'Web3 • Finance',
    description: 'MarcediVault is a multi-chain custodial wallet frontend featuring a production-quality, responsive interface with a luxury minimalist aesthetic.',
    fullDescription: 'MarcediVault by Xentrius is a Next.js application for a multi-chain custodial wallet frontend. It features a production-quality, responsive interface with a luxury minimalist aesthetic.',
    tech: ['Next.js', 'Web3', 'TypeScript', 'Tailwind'],
    liveLink: 'https://web3-site-kappa.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Web3-Site',
    image: '/images/marcedivault.png',
    icon: <Wallet className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'kinzoku',
    title: 'Kinzoku Blueprint Forge',
    tagline: 'Professional industrial prototyping tool',
    category: 'Platform • AI',
    description: 'Kinzoku Blueprint Forge is a professional industrial prototyping tool that generates detailed technical specifications and photorealistic blueprints using AI.',
    fullDescription: 'Kinzoku Blueprint Forge is a professional industrial prototyping tool designed to generate detailed technical specifications and photorealistic blueprints. Key features include The Forge (uses Gemini to generate precise engineering specs and Imagen to render 8K-quality technical drawings), Reverse Engineering (analyzes existing designs), Interactive Editor (manually refine AI-generated specs), and AI Assistant (built-in chat for brainstorming).',
    tech: ['Next.js', 'React', 'Gemini', 'Imagen'],
    liveLink: 'https://ai.studio.apps/drive/17n6l3RtYoq5LYqpcpOA4OjjUc7F2tsQc?fullscreenApplet=true',
    githubLink: 'https://github.com/Anasabubakar/Kinzoku-Blueprint-Forge',
    image: '/images/kinzoku.png',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-slate-500 to-zinc-500',
  },
  {
    id: 'edupeak',
    title: 'EduPeak',
    tagline: 'Modern Learning Management System',
    category: 'EdTech • Platform',
    description: 'EduPeak is a modern, feature-rich Learning Management System designed to provide a resilient and engaging educational experience with offline-first architecture.',
    fullDescription: 'EDUPEAK is a modern, feature-rich Learning Management System (LMS) designed to provide a resilient and engaging educational experience for both students and teachers. Built with a robust, offline-first architecture, it ensures learning never stops. Features distinct portals for students and teachers with personalized learning paths, gamified quizzes, powerful analytics, and content curation tools.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind', 'ShadCN'],
    liveLink: 'https://edupeak-eta.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Edupeak',
    image: '/images/edupeak.png',
    icon: <Layers className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'ilmeen',
    title: 'Ilmeen',
    tagline: 'AI Companion for Mastering Quranic Arabic',
    category: 'EdTech • AI',
    description: 'Ilmeen is a revolutionary AI-powered web application that transforms any Arabic text into an interactive and engaging learning experience.',
    fullDescription: 'Ilmeen is a revolutionary, AI-powered web application designed to help learners, especially African Muslims, master the Arabic language. By combining cutting-edge AI with pedagogical techniques inspired by traditional Islamic education, Ilmeen transforms any Arabic text into an interactive learning experience. Features include Scan & Learn, 24/7 AI Mentor with voice dialogue, Deep Understanding Engine with grammar annotations, Smart Memorization Mode, and Gamified Learning Journey.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'React', 'Gemini', 'Genkit', 'Firebase'],
    liveLink: 'https://ilmeen-mvp.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Ilmeen',
    image: '/images/ilmeen.png',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'empower-you',
    title: 'Empower-You',
    tagline: 'Personal AI Companion for Growth & Well-being',
    category: 'Wellness • AI',
    description: 'EmpowerYou is a holistic, private, and AI-enhanced application designed to be a sanctuary for your thoughts, goals, and personal well-being.',
    fullDescription: 'EmpowerYou is a holistic, private, and AI-enhanced application designed to be a sanctuary for your thoughts, goals, and personal well-being. It\'s a comprehensive tool for promoting self-awareness, organization, and growth, with all data stored securely and privately on your device. Features include Dashboard Overview, Wants & Needs Tracker, Menstrual Cycle Tracker, Task Manager, Health Metrics Logger, Daily Diary with AI summaries, AI Companion, and Personalized Insights.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'ShadCN', 'Genkit', 'Recharts'],
    liveLink: 'https://empower-you.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/EmpowerYou',
    image: '/images/projects/empoweryou.png',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'pill-pal',
    title: 'Pill-Pal',
    tagline: 'AI-Powered Medication Reminder',
    category: 'Healthcare • AI',
    description: 'Pill-Pal is a modern, AI-powered web application designed to help users manage their medication schedules, track adherence, and gain insights.',
    fullDescription: 'Pill-Pal is a modern, AI-powered web application designed to help users manage their medication schedules, track their adherence, and gain insights into their habits. Features include onboarding experience, secure authentication, medication management, daily dashboard, adherence tracking, medication logs with CSV export, AI-powered insights, responsive design, and light/dark mode.',
    tech: ['Next.js', 'TypeScript', 'AI', 'Firebase', 'Genkit', 'Framer Motion', 'ShadCN', 'React Hook Form', 'Zod'],
    liveLink: 'https://pill-pal-eta.vercel.app/',
    githubLink: 'https://github.com/Anasabubakar/Pill-Pal',
    image: '/images/projects/pillpal.png',
    icon: <Pill className="w-6 h-6" />,
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
    image: '/images/projects/monieflow.png',
    icon: <Zap className="w-6 h-6" />,
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

          {/* All Projects Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-primary" />
              All Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group glass-card rounded-[2rem] overflow-hidden hover:bg-white/[0.05] transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        project.color
                      )} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3 block">
                      {project.category.split('•')[0].trim()}
                    </span>
                    
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