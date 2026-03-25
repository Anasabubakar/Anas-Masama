'use client';

import { submitContactForm } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Target, ShieldCheck, Timer, Workflow, Mail, Linkedin, Github } from 'lucide-react';
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

const socialLinks = [
  { name: 'Email', href: 'mailto:anasabubakar7000@gmail.com', icon: <Mail className="h-5 w-5" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/Anasmasama', icon: <Linkedin className="h-5 w-5" /> },
  { name: 'GitHub', href: 'https://www.github.com/Anasabubakar', icon: <Github className="h-5 w-5" /> },
  { name: 'Twitter', href: 'https://www.twitter.com/Anas_Abubakar70', icon: <XIcon className="h-5 w-5" /> },
  { name: 'WhatsApp', href: 'https://wa.me/+2347064294297', icon: <WhatsappIcon className="h-5 w-5" /> },
];

const highlights = [
  { title: 'High-Impact Builds', description: 'Performance-first web apps with crisp UX and clean systems.', icon: Target },
  { title: 'Secure & Reliable', description: 'Production-grade foundations with tests, monitoring, and best practices.', icon: ShieldCheck },
  { title: 'Fast Execution', description: 'Clear timelines, weekly updates, and measurable milestones.', icon: Timer },
  { title: 'Process Clarity', description: 'Discovery → Design → Build → Launch with no guesswork.', icon: Workflow },
];

export function HireMe() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: "Thank you for your inquiry! I'll get back to you shortly.",
      });
      formRef.current?.reset();
    } else if (state.message && !state.success && Object.keys(state.errors ?? {}).length === 0) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
              Hire Me
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Ready to build something exceptional?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Tell me about your project goals, scope, and timeline. I’ll reply quickly with a clear next step,
              a proposed approach, and a realistic delivery plan.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map(({ title, description, icon: Icon }) => (
                <div key={title} className="glass-card rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="text-white/60 text-sm mt-2">{description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Avg response &lt; 2 hours</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Global clients</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">High‑impact builds</span>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Project Brief</p>
                <h3 className="text-2xl font-bold mt-2">Start your request</h3>
              </div>
              <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            <form ref={formRef} action={dispatch} className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hire-name">Name</Label>
                  <Input id="hire-name" name="name" placeholder="Your Name" />
                  {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hire-organization">Organization</Label>
                  <Input id="hire-organization" name="organization" placeholder="Your Organization" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire-email">Email</Label>
                <Input id="hire-email" name="email" type="email" placeholder="your@email.com" />
                {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hire-role">Role</Label>
                  <Input id="hire-role" name="role" placeholder="e.g., Product Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hire-budget">Budget (USD)</Label>
                  <Input id="hire-budget" name="budget" placeholder="e.g., $5,000 - $10,000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire-time-range">Time Range</Label>
                <Input id="hire-time-range" name="timeRange" placeholder="e.g., 3-6 months" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire-message">Tell me about your project</Label>
                <Textarea id="hire-message" name="message" placeholder="Goals, scope, timeline, success criteria..." />
                {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>

            <div className="mt-6 flex items-center justify-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/40 transition-all"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
