'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitContactForm } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { useToast } from '@/hooks/use-toast';
import { Reveal } from '@/components/Reveal';

const socials = [
  { label: 'Email', href: 'mailto:anasabubakar7000@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Anasabubakar' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anasmasama' },
  { label: 'X (Twitter)', href: 'https://x.com/Anas_Abubakar70' },
  { label: 'WhatsApp', href: 'https://wa.me/+2347064294297' },
];

export function Contact() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({ title: 'Message sent!', description: "Thanks — I'll get back to you shortly." });
      formRef.current?.reset();
    } else if (state.message && !state.success && Object.keys(state.errors ?? {}).length === 0) {
      toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, toast]);

  return (
    <Reveal as="section">
      <section
        id="contact"
        className="relative z-[1] mx-auto max-w-[1000px] px-5 py-20 pb-[140px] sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Contact
        </p>
        <h2 className="m-0 mb-4 font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]">
          Or just send me a message
        </h2>
        <p className="m-0 mb-10 max-w-[56ch] text-base text-[#f3f2ee]/65">
          Tell me what you need and I&apos;ll get back to you.
        </p>
        <div className="grid gap-14 md:grid-cols-2">
          <form ref={formRef} action={dispatch} className="flex flex-col gap-3.5">
            <input
              name="name"
              placeholder="Your name"
              aria-label="Your name"
              className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
            />
            {state.errors?.name && <p className="m-0 text-sm text-destructive">{state.errors.name[0]}</p>}
            <input
              name="email"
              type="email"
              placeholder="Your email"
              aria-label="Your email"
              className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
            />
            {state.errors?.email && <p className="m-0 text-sm text-destructive">{state.errors.email[0]}</p>}
            <textarea
              name="message"
              placeholder="What's the project?"
              aria-label="What's the project?"
              rows={4}
              className="resize-y rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
            />
            {state.errors?.message && <p className="m-0 text-sm text-destructive">{state.errors.message[0]}</p>}
            <SubmitButton
              label="Send message"
              className="w-fit self-start rounded-full bg-[#f3f2ee] px-5 py-3.5 text-[15px] font-bold text-[#060606] hover:bg-[#f3f2ee]/90"
            />
          </form>
          <div className="flex flex-col gap-3.5">
            {socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between border-b border-[#f3f2ee]/10 py-4 text-[15px] font-semibold text-[#f3f2ee] transition-[padding-left,color] duration-200 ease-out hover:pl-2 hover:text-[#34c97e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
              >
                {soc.label} <span className="text-[#f3f2ee]/40">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
