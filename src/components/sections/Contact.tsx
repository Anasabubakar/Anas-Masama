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
      </section>
    </Reveal>
  );
}
