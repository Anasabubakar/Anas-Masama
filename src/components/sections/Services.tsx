'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Lightbulb, SquareCode, Layers, Cpu, Globe, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'World-Class Web Systems',
    description: 'Architecting high-performance, scalable web ecosystems using Next.js, TypeScript, and modern cloud infrastructures.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'AI-Native Integration',
    description: 'Infusing intelligent capabilities into your products using Gemini, Genkit, and advanced LLM orchestrations.',
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Enterprise Architecture',
    description: 'Designing robust, future-proof technical foundations that grow with your business and handle global scale.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Product Innovation',
    description: 'Transforming complex visions into intuitive, high-impact digital experiences through strategic design.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-transparent relative overflow-hidden">
      
      <div className="container max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Expertise</h2>
          <h3 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
            ENGINEERING <br /> SOLUTIONS
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group glass-card p-8 rounded-[2rem] flex flex-col items-start gap-8 hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className={cn(
                "p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                service.bg,
                service.color
              )}>
                {service.icon}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-2xl font-bold tracking-tight">{service.title}</h4>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
