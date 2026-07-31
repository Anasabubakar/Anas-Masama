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

        <div className="relative w-full overflow-hidden" style={{ height: cardSize + 200 }}>
          {cards.map(({ item, position, isCenter }) => (
            <button
              key={item.title}
              type="button"
              onClick={() => move(position)}
              aria-label={item.title}
              className="absolute left-1/2 top-1/2 overflow-hidden text-left transition-[transform,background,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: cardSize,
                height: cardSize,
                clipPath:
                  'polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)',
                transform: `translate(-50%,-50%) translateX(${(cardSize / 1.55) * position}px) translateY(${
                  isCenter ? -36 : position % 2 ? 14 : -14
                }px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
                border: `2px solid ${isCenter ? '#34c97e' : 'rgba(243,242,238,.14)'}`,
                background: isCenter ? '#34c97e' : '#0c0c0c',
                zIndex: isCenter ? 10 : 5 - Math.abs(position),
                boxShadow: isCenter ? '0 20px 40px rgba(0,0,0,.5)' : 'none',
              }}
            >
              <span
                className="absolute right-[-2px] top-[38px] h-0.5 w-[70px] origin-top-right rotate-45"
                style={{ background: isCenter ? 'rgba(6,6,6,.3)' : 'rgba(243,242,238,.2)' }}
              />
              <div className="absolute inset-0 bottom-[34%] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex h-[34%] flex-col justify-center gap-1.5 px-5 py-3.5">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: isCenter ? 'rgba(6,6,6,.7)' : '#34c97e' }}
                >
                  {item.category}
                </span>
                <h3
                  className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-bold"
                  style={{ color: isCenter ? '#060606' : '#f3f2ee' }}
                >
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
