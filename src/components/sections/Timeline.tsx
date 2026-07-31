'use client';

import { Reveal } from '@/components/Reveal';

const timeline = [
  {
    date: 'Present',
    title: 'Founder',
    org: 'TeenovateX Labs',
    desc: 'Building a community and tools that help young Africans learn to code and build real projects.',
  },
  {
    date: 'Jan – May 2025',
    title: 'Software Engineer Trainee',
    org: 'Be-Mint 2.0',
    desc: 'Worked on real projects and learned how teams ship software together.',
  },
  {
    date: 'Dec 2023',
    title: 'Went freelance',
    org: 'Vision Programming Tech',
    desc: 'Moved from learning to doing — building sites and tools for real clients.',
  },
  {
    date: 'June 2020',
    title: 'Started learning to code',
    org: 'Self-taught',
    desc: 'Where it all began — the basics, algorithms, and a lot of practice.',
  },
];

export function Timeline() {
  return (
    <Reveal as="section">
      <section
        id="timeline"
        className="relative z-[1] mx-auto max-w-[1000px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Journey
        </p>
        <h2 className="m-0 mb-12 font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]">
          How I got here
        </h2>
        <div className="flex flex-col">
          {timeline.map((t) => (
            <div
              key={t.title}
              className="grid grid-cols-[140px_1fr] gap-6 border-t border-[#f3f2ee]/10 py-7 transition-[padding-left,background] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f3f2ee]/[0.02] hover:pl-3"
            >
              <p className="m-0 text-[13px] font-bold uppercase tracking-[0.05em] text-[#f3f2ee]/45">
                {t.date}
              </p>
              <div>
                <h3 className="m-0 mb-1 text-[19px] font-bold text-[#f3f2ee]">{t.title}</h3>
                <p className="m-0 mb-2.5 text-xs font-bold text-[#34c97e]">{t.org}</p>
                <p className="m-0 text-[15px] leading-[1.6] text-[#f3f2ee]/65">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
