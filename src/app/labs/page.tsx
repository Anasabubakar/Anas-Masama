'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Ranked best-to-least by Anas. Entries without a screenshot render a
// typographic monogram card instead of an <img>.
const projects = [
  {
    title: 'Slottr',
    category: 'Scheduling / Open Source',
    description: 'Independent open-source scheduling platform, originally forked from Cal.com.',
    image: '/images/slottr.png',
    liveLink: 'https://slottr.anasmasama.dev',
    githubLink: 'https://github.com/Anasabubakar/slottr',
  },
  {
    title: 'Morrow',
    category: 'Fintech / Payments Infra',
    description: 'Device-to-device transaction infrastructure — optical protocol, BMONI settlement, offline-signed Morrow Reserve payments.',
    image: '/images/morrow.jpg',
    githubLink: 'https://github.com/Anasabubakar/morrow',
  },
  {
    title: 'Agent Swarm',
    category: 'Dev Tools / CLI',
    description: 'Engine-agnostic multi-agent orchestrator from the terminal. Works with any CLI agent.',
    image: '/images/swarm.png',
    liveLink: 'https://www.npmjs.com/package/@anas.abubakar/swarm',
    githubLink: 'https://github.com/Anasabubakar/agent-swarm',
  },
  {
    title: 'Glance',
    category: 'Desktop AI',
    description: 'Open-source AI desktop companion that sees your screen, points at things, and acts on them. Windows + Linux.',
    image: '/images/glance.png',
    liveLink: 'https://tryglance.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/glance',
  },
  {
    title: 'MoreMur',
    category: 'Community / Anonymous Feeds',
    description: 'Anonymous, organisation-scoped discussion and community intelligence platform.',
    image: '/images/moremur.png',
    liveLink: 'https://moremur.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/MoreMur',
  },
  {
    title: 'Anas Masama',
    category: 'Portfolio / Personal Site',
    description: 'This site — Next.js, live Slottr-backed scheduling, AI chat widget, deployed end to end.',
    image: '/images/anas-masama-og.png',
    liveLink: 'https://anasmasama.dev',
    githubLink: 'https://github.com/Anasabubakar/Anas-Masama',
  },
  {
    title: 'Timeless',
    category: 'AI Agents / Sponsorship',
    description: 'Multi-tenant sponsorship intelligence platform powered by specialized AI agents.',
    image: '/images/timeless.png',
    liveLink: 'https://timeless-udc.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Timeless',
  },
  {
    title: 'Swarm HQ',
    category: 'AI Agent Dashboard',
    description: 'Virtual company dashboard for 257 AI agents.',
    liveLink: 'https://swarm-hq.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/swarm-hq',
  },
  {
    title: 'Podreach',
    category: 'AI / Podcast Outreach',
    description: 'Finds podcast episodes featuring a person, downloads the audio, transcribes it, and drafts a personalized outreach email.',
    githubLink: 'https://github.com/Anasabubakar/podreach',
  },
  {
    title: 'CipherVault',
    category: 'Security / Encrypted Notes',
    description: 'Encrypted notepad — E2E AES-256, zero-knowledge, PWA, self-hostable.',
    liveLink: 'https://ciphervault-alpha.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/CipherVault',
  },
  {
    title: 'TeenovateX',
    category: 'NGO / Community',
    description: 'A community helping young Africans turn ideas into working products.',
    image: '/images/teenovatex.png',
    liveLink: 'https://teenovatex.org',
    githubLink: 'https://github.com/Anasabubakar/TeenovateX-Labs',
  },
  {
    title: 'JackPal',
    category: 'EdTech / AI',
    description: 'Student-first audio learning platform — converts academic documents to natural-sounding audio.',
    image: '/images/jackpal.png',
    liveLink: 'https://jackpal.vercel.app',
  },
  {
    title: 'MarcediVault',
    category: 'Web3 / Finance',
    description: 'Multi-chain custodial wallet frontend with a production-quality, luxury minimalist interface.',
    image: '/images/marcedivault.png',
    liveLink: 'https://web3-site-kappa.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Web3-Site',
  },
  {
    title: 'Kinzoku Blueprint Forge',
    category: 'AI / Manufacturing Tools',
    description: 'Industrial prototyping tool that generates detailed technical specs and photorealistic blueprints using Gemini and Imagen.',
    image: '/images/kinzoku.png',
    githubLink: 'https://github.com/Anasabubakar/Kinzoku-Blueprint-Forge',
  },
  {
    title: 'EduPeak',
    category: 'EdTech / Platform',
    description: 'Modern, offline-first Learning Management System with gamified quizzes and analytics.',
    image: '/images/edupeak.png',
    liveLink: 'https://edupeak-eta.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Edupeak',
  },
  {
    title: 'Pill-Pal',
    category: 'Healthcare / AI',
    description: 'AI-powered medication reminder and adherence tracker.',
    image: '/images/projects/pillpal.png',
    liveLink: 'https://pill-pal-eta.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Pill-Pal',
  },
  {
    title: 'Ilmeen',
    category: 'EdTech / AI',
    description: 'AI companion for mastering Quranic Arabic — transforms any Arabic text into an interactive lesson.',
    image: '/images/ilmeen.png',
    liveLink: 'https://ilmeen-rose.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/Ilmeen',
  },
  {
    title: 'EmpowerYou',
    category: 'Wellness / AI',
    description: 'A private, AI-enhanced sanctuary for your thoughts, goals, and personal well-being.',
    image: '/images/projects/empoweryou.png',
    liveLink: 'https://empower-you.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/EmpowerYou',
  },
  {
    title: 'AOS-Swarm-Landing',
    category: 'Landing Page',
    description: 'Landing page (v1) for AOS and Swarm.',
    liveLink: 'https://aos-swarm-landing.vercel.app',
    githubLink: 'https://github.com/Anasabubakar/AOS-Swarm-Landing',
  },
  {
    title: 'Anas Claude Train',
    category: 'Architecture Notes',
    description: 'Comprehensive Claude Code architecture analysis — every file studied, patterns documented.',
    githubLink: 'https://github.com/Anasabubakar/Anas-Claude-Train',
  },
  {
    title: 'GitSync',
    category: 'Dev Tools / Sync',
    description: 'Sync your repo with your portfolio.',
    githubLink: 'https://github.com/Anasabubakar/GitSync',
  },
  {
    title: 'OffScript News',
    category: 'AI / News Briefs',
    description: 'Get a detailed, latest news brief.',
    githubLink: 'https://github.com/Anasabubakar/OffScript-News',
  },
  {
    title: 'Five Minutes Left',
    category: 'Browser Game',
    description: 'A small browser game built for Hack Club’s Campfire Flagship, exploring slow progress and consistency.',
    githubLink: 'https://github.com/Anasabubakar/Five-Minutes-Left',
  },
];

function monogram(title: string): string {
  const words = title.split(/[\s-]+/).filter(Boolean);
  return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : title.slice(0, 2).toUpperCase();
}

export default function LabsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-6">

          <div className="mb-16 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Link>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Full Portfolio</p>
              <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
                MY <br /> LABS
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl text-xl font-light leading-relaxed">
              Every project I&apos;ve built, ranked best to least. From production tools people
              actually use to weekend experiments — each one taught me something.
            </p>
          </div>

          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <article
                  key={project.title}
                  className="group glass-card rounded-[2rem] overflow-hidden hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm">
                      #{i + 1}
                    </span>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.description}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            'radial-gradient(120% 140% at 30% 20%, rgba(52,201,126,.22), transparent 60%), #0a0a0a',
                          backgroundImage:
                            'linear-gradient(rgba(243,242,238,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(243,242,238,.05) 1px, transparent 1px)',
                          backgroundSize: '18px 18px',
                        }}
                      >
                        <span
                          className="select-none font-headline text-[56px] leading-none"
                          style={{ color: 'rgba(52,201,126,.35)' }}
                          aria-hidden="true"
                        >
                          {monogram(project.title)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3 block">
                      {project.category}
                    </span>

                    <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex gap-3">
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                        >
                          Live <ExternalLink className="ml-1 w-3 h-3" aria-hidden="true" />
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
                        >
                          <Github className="mr-1 w-3 h-3" aria-hidden="true" /> Code
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

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
