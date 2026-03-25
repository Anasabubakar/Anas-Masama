'use client';

import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { WhatsappIcon } from '../icons/WhatsappIcon';
import { Button } from '../ui/button';
import { SafeHireMeDialog } from '../SafeHireMeDialog';

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
        icon: <Mail className="w-6 h-6" />,
        handle: 'anasabubakar7000@gmail.com',
        label: 'Write me an email'
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/Anasmasama',
        icon: <Linkedin className="w-6 h-6" />,
        handle: 'Anas Abubakar Masama',
        label: 'Let\'s connect'
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/+2347064294297',
        icon: <WhatsappIcon className="w-6 h-6" />,
        handle: '+234 706 429 4297',
        label: 'Quick chat'
    },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
           
           <div className="space-y-12">
              <div className="space-y-6">
                 <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Get in Touch</h2>
                 <h3 className="text-4xl sm:text-5xl md:text-7xl font-black font-headline tracking-tighter leading-[0.95]">
                    READY TO <br /> <span className="text-primary">COLLABORATE?</span>
                 </h3>
                 <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                    I'm currently open for high-impact projects and strategic partnerships. Let's discuss how we can build something exceptional.
                 </p>
              </div>

              <div className="space-y-4">
                 <SafeHireMeDialog>
                    <Button size="lg" className="rounded-full h-16 px-8 text-lg sm:text-xl font-black w-full sm:w-auto bg-primary hover:bg-primary/90 group">
                       Start a Project
                       <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                    </Button>
                 </SafeHireMeDialog>
                 <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest sm:pl-6">Average response time: &lt; 2 hours</p>
              </div>
           </div>

           <div className="grid gap-4 md:gap-6">
              {contactLinks.map((link, idx) => (
                <Link key={idx} href={link.href} target="_blank" className="group">
                   <div className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-all duration-500">
                      <div className="flex items-center gap-4 md:gap-6 min-w-0">
                         <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                            {link.icon}
                         </div>
                         <div className="space-y-1 min-w-0">
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">{link.name}</p>
                            <h4 className="text-base md:text-lg font-bold tracking-tight break-all">{link.handle}</h4>
                         </div>
                      </div>
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                </Link>
              ))}
              
              <div className="pt-4 md:pt-6 flex items-center gap-6 opacity-40">
                 <Link href="https://www.twitter.com/Anas_Abubakar70" target="_blank" className="hover:text-primary transition-colors">
                    <XIcon className="w-6 h-6" />
                 </Link>
                 <Link href="https://www.github.com/Anasabubakar" target="_blank" className="hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />
                 </Link>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
