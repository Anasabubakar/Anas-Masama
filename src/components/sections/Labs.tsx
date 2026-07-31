'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';

const LABS_ITEMS = [
  { title: 'TeenovateX', category: 'NGO / Community', image: '/images/teenovatex.png' },
  { title: 'JackPal', category: 'EdTech / AI', image: '/images/jackpal.png' },
  { title: 'MarcediVault', category: 'Web3 / Finance', image: '/images/marcedivault.png' },
  { title: 'EduPeak', category: 'EdTech / Platform', image: '/images/edupeak.png' },
];

export function Labs() {
  const [focus, setFocus] = useState(0);
  const [cardSize, setCardSize] = useState(300);

  useEffect(() => {
    const update = () => setCardSize(window.innerWidth < 640 ? 230 : 300);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const move = (steps: number) => {
    const n = LABS_ITEMS.length;
    setFocus((f) => ((f + steps) % n + n) % n);
  };

  const n = LABS_ITEMS.length;
  const cards = LABS_ITEMS.map((item, i) => {
    let position = i - focus;
    while (position > n / 2) position -= n;
    while (position <= -n / 2) position += n;
    const isCenter = position === 0;
    return { item, position, isCenter };
  });

  return (
    <Reveal as="section">
      <section
        id="labs"
        className="relative z-[1] mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Selected labs
        </p>
        <h2 className="m-0 mb-12 max-w-[16ch] font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]">
          A few things I&apos;ve built
        </h2>
      </section>
    </Reveal>
  );
}
