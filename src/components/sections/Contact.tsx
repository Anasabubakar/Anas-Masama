'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.05l8.6-9.83-8.209-9.064h7.585l5.243 7.185L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
  </svg>
);

const contactLinks = [
    {
        name: 'Email',
        href: 'mailto:anasabubakar7000@gmail.com',
        icon: <Mail className="w-8 h-8" />,
        handle: 'anasabubakar7000@gmail.com'
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/Anasmasama',
        icon: <Linkedin className="w-8 h-8" />,
        handle: 'Anas Abubakar Masama'
    },
    {
        name: 'GitHub',
        href: 'https://www.github.com/Anasabubakar',
        icon: <Github className="w-8 h-8" />,
        handle: 'Anasabubakar'
    },
    {
        name: 'Twitter',
        href: 'https://www.twitter.com/Anas_Abubakar70',
        icon: <XIcon className="w-8 h-8" />,
        handle: '@Anas_Abubakar70'
    },
     {
        name: 'WhatsApp',
        href: 'https://wa.me/+2347064294297',
        icon: <WhatsappIcon className="w-8 h-8" />,
        handle: '+234 706 429 4297'
    },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/20">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto">
            <p className="font-semibold text-primary uppercase tracking-widest font-body">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight mt-2">Let's Build Something Great Together</h2>
            <p className="text-lg text-muted-foreground mt-4">
                I'm currently available for freelance work and open to discussing new projects. If you have a vision, a question, or just want to connect, feel free to reach out. I'm always excited to collaborate on innovative ideas.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            {contactLinks.map(link => (
                 <Card key={link.name} className="group text-left bg-card border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-15px_hsl(var(--primary))] hover:-translate-y-2">
                    <Link href={link.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                           <div>
                             <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full border-2 border-secondary text-primary mb-4 transition-colors duration-300 group-hover:text-primary group-hover:border-primary/20">
                                {link.icon}
                            </div>
                            <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">{link.name}</h3>
                            <p className="text-muted-foreground break-all">{link.handle}</p>
                           </div>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
