'use client';

import {
  Briefcase,
  Code,
  Figma,
  Star,
  Zap,
  Globe,
  Database,
  Cloud,
  Layout,
  Smartphone
} from 'lucide-react';
import { BootstrapIcon } from '../icons/BootstrapIcon';
import { CssIcon } from '../icons/CssIcon';
import { HtmlIcon } from '../icons/HtmlIcon';
import { JavascriptIcon } from '../icons/JavascriptIcon';
import { Microsoft365Icon } from '../icons/Microsoft365Icon';
import { NextjsIcon } from '../icons/NextjsIcon';
import { NodeIcon } from '../icons/NodeIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { SolidEdgeIcon } from '../icons/SolidEdgeIcon';
import { SqlIcon } from '../icons/SqlIcon';
import { TailwindIcon } from '../icons/TailwindIcon';
import { TypescriptIcon } from '../icons/TypescriptIcon';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Layout className="w-5 h-5" />,
    skills: [
      { icon: <NextjsIcon className="w-6 h-6" />, name: 'Next.js' },
      { icon: <ReactIcon className="w-6 h-6" />, name: 'React' },
      { icon: <TailwindIcon className="w-6 h-6" />, name: 'Tailwind' },
      { icon: <TypescriptIcon className="w-6 h-6" />, name: 'TS' },
      { icon: <JavascriptIcon className="w-6 h-6" />, name: 'JS' },
    ]
  },
  {
    title: "Backend & Data",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { icon: <NodeIcon className="w-6 h-6" />, name: 'Node.js' },
      { icon: <SqlIcon className="w-6 h-6" />, name: 'SQL' },
      { icon: <Zap className="w-6 h-6 text-yellow-400" />, name: 'Firebase' },
    ]
  },
  {
    title: "Design & Tools",
    icon: <Figma className="w-5 h-5" />,
    skills: [
      { icon: <Figma className="w-6 h-6" />, name: 'Figma' },
      { icon: <SolidEdgeIcon className="w-6 h-6" />, name: 'Solid Edge' },
      { icon: <Microsoft365Icon className="w-6 h-6" />, name: 'M365' },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 bg-secondary/5 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Toolbox</h2>
            <h3 className="text-5xl md:text-6xl font-black font-headline tracking-tighter leading-none">
              TECHNICAL <br /> STACK
            </h3>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              A comprehensive suite of technologies and frameworks used to build high-performance, enterprise-grade solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-8">
               <div className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black text-primary">99%</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-2">Code Quality</div>
               </div>
               <div className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-3xl font-black text-primary">24/7</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-2">Availability</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
             {skillCategories.map((category, idx) => (
               <div 
                key={idx} 
                className={cn(
                  "glass-card p-8 rounded-[2.5rem] space-y-8",
                  idx === 0 ? "sm:col-span-2" : ""
                )}
               >
                 <div className="flex items-center gap-3 text-primary">
                    {category.icon}
                    <h4 className="text-xl font-bold tracking-tight text-foreground">{category.title}</h4>
                 </div>
                 
                 <div className="flex flex-wrap gap-4">
                    {category.skills.map(skill => (
                      <div key={skill.name} className="flex flex-col items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 transition-all duration-300 hover:border-primary/30 hover:bg-white/10 group">
                         <div className="transition-transform duration-300 group-hover:scale-110">
                            {skill.icon}
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                            {skill.name}
                         </span>
                      </div>
                    ))}
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
