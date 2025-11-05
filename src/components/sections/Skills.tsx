import {
  Briefcase,
  Code,
  Database,
  Figma,
  PenTool,
  Server,
  Star,
  Zap,
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

const skills = [
  { icon: <NextjsIcon className="w-8 h-8" />, name: 'Next.js' },
  { icon: <ReactIcon className="w-8 h-8" />, name: 'React' },
  { icon: <TypescriptIcon className="w-8 h-8" />, name: 'TypeScript' },
  { icon: <JavascriptIcon className="w-8 h-8" />, name: 'JavaScript' },
  { icon: <NodeIcon className="w-8 h-8" />, name: 'Node.js' },
  { icon: <TailwindIcon className="w-8 h-8" />, name: 'Tailwind CSS' },
  { icon: <HtmlIcon className="w-8 h-8" />, name: 'HTML5' },
  { icon: <CssIcon className="w-8 h-8" />, name: 'CSS3' },
  { icon: <BootstrapIcon className="w-8 h-8" />, name: 'Bootstrap' },
  { icon: <SqlIcon className="w-8 h-8" />, name: 'SQL' },
  { icon: <Zap className="w-8 h-8 text-yellow-400" />, name: 'Firebase' },
  { icon: <Figma className="w-8 h-8" />, name: 'Figma' },
  { icon: <SolidEdgeIcon className="w-8 h-8" />, name: 'Solid Edge' },
  { icon: <Microsoft365Icon className="w-8 h-8" />, name: 'Microsoft 365' },
];

const innovations = [
  { icon: <Star />, title: 'Creativity' },
  { icon: <Briefcase />, title: 'Experience' },
  { icon: <Code />, title: 'Competence' },
  { icon: <Zap />, title: 'Passion' },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Skills & Innovations</h2>
          <p className="mt-4 text-lg text-muted-foreground">My technical expertise and creative drivers.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <h3 className="text-2xl font-semibold font-headline text-primary">My Toolbox</h3>
            <div className="flex flex-wrap gap-4">
              {skills.map(skill => (
                <div key={skill.name} className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  {skill.icon}
                  <span className="font-medium text-card-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
             <div>
                <h3 className="text-2xl font-semibold font-headline text-primary mb-4">Innovations</h3>
                <div className="grid grid-cols-2 gap-4">
                {innovations.map(item => (
                    <div key={item.title} className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border">
                        <div className="text-primary">{item.icon}</div>
                        <p className="font-semibold">{item.title}</p>
                    </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
