'use client';

import { Reveal } from '@/components/Reveal';

const skillGroups = [
  { title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'JavaScript', 'Framer Motion'] },
  { title: 'Backend & AI', items: ['Node.js', 'PostgreSQL', 'Prisma', 'Firebase', 'Genkit', 'Gemini'] },
  { title: 'Design & tools', items: ['Figma', 'Stripe', 'Web3', 'React Hook Form', 'Zod'] },
];

export function Skills() {
  return (
    <Reveal as="section">
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative z-[1] mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <div className="grid gap-14 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
              Toolbox
            </p>
            <h2
              id="skills-heading"
              className="m-0 font-headline text-[clamp(32px,4vw,44px)] font-normal leading-[1.05] text-[#f3f2ee]"
            >
              Tools I use
            </h2>
          </div>
          <div className="flex flex-col gap-7">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="m-0 mb-3 text-[13px] font-bold uppercase tracking-[0.1em] text-[#f3f2ee]/50">
                  {group.title}
                </p>
                <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                  {group.items.map((tool) => (
                    <li
                      key={tool}
                      className="inline-block rounded-xl border border-[#f3f2ee]/[0.08] bg-[#f3f2ee]/5 px-4 py-2.5 text-sm font-semibold text-[#f3f2ee] transition-[transform,border-color] duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] hover:border-[#34c97e]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
