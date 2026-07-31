'use client';

import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

const expertise = [
  'System architecture',
  'Web apps',
  'AI integration',
  'Cloud infra',
  'Full-stack engineering',
  'Technical leadership',
];

export function About() {
  return (
    <Reveal as="section">
      <section
        id="about"
        className="relative z-[1] mx-auto max-w-[1280px] px-5 py-[100px] sm:px-8 lg:px-14"
      >
        <div className="grid items-start gap-16 md:grid-cols-2">
          <div>
            <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
              About
            </p>
            <h2 className="m-0 mb-6 font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]">
              A bit about me
            </h2>
            <div className="flex flex-col gap-[18px] text-lg leading-[1.7] text-[#f3f2ee]/80">
              <p className="m-0">
                I&apos;ve been writing code for 6 years. I like building things that solve
                real problems — for students, for founders, for people who just need
                software that works.
              </p>
              <p className="m-0">
                Outside of client work, I run TeenovateX Labs — a community that helps
                young people in Lagos and across Africa learn to build. That&apos;s where
                most of my free time goes.
              </p>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-3 p-0 pt-7">
              {expertise.map((item) => (
                <li
                  key={item}
                  className="inline-block rounded-full border border-[#f3f2ee]/[0.14] px-4 py-[9px] text-[13px] font-semibold text-[#f3f2ee]/85 transition-[transform,border-color,background] duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:scale-[1.06] hover:border-[#34c97e] hover:bg-[#34c97e]/[0.08]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[20px] border border-[#f3f2ee]/10">
            <Image
              src="/images/Lodge.jpg"
              alt="Anas Masama"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out hover:scale-105"
              unoptimized
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
