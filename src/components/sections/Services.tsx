'use client';

import { Reveal } from '@/components/Reveal';

const services = [
  {
    num: '01',
    title: 'Web systems',
    desc: 'Next.js and TypeScript apps built to last — not just to demo well.',
  },
  {
    num: '02',
    title: 'AI integration',
    desc: 'Real AI features using Gemini and Genkit, built into the product — not a chatbot bolted on the side.',
  },
  {
    num: '03',
    title: 'Product architecture',
    desc: 'Planning the technical foundation before a single line of code gets written.',
  },
  {
    num: '04',
    title: 'Idea to launch',
    desc: 'Taking a rough idea and shipping something people can actually use.',
  },
];

export function Services() {
  return (
    <Reveal as="section">
      <section
        id="services"
        aria-labelledby="services-heading"
        className="relative z-[1] mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          What I do
        </p>
        <h2
          id="services-heading"
          className="m-0 mb-12 max-w-[16ch] font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]"
        >
          Here&apos;s how I can help
        </h2>
        <ol className="m-0 flex list-none flex-col p-0">
          {services.map((s) => (
            <li
              key={s.num}
              className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-t border-[#f3f2ee]/10 py-8 transition-[padding-left] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3.5"
            >
              <span className="font-headline text-[22px] text-[#f3f2ee]/35">{s.num}</span>
              <div className="flex max-w-[70ch] flex-col gap-2">
                <h3 className="m-0 text-[22px] font-bold text-[#f3f2ee]">{s.title}</h3>
                <p className="m-0 text-base leading-[1.6] text-[#f3f2ee]/65">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  );
}
