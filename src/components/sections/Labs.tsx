'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/Reveal';

// Ranked best-to-least by Anas. Entries without a screenshot render a
// typographic monogram card instead of an <img> — see the `image` field
// being undefined below.
type LabItem = { title: string; category: string; image?: string };

const LABS_ITEMS: LabItem[] = [
  { title: 'Slottr', category: 'Scheduling / Open Source', image: '/images/slottr.png' },
  { title: 'Morrow', category: 'Fintech / Payments Infra', image: '/images/morrow.jpg' },
  { title: 'Agent Swarm', category: 'Dev Tools / CLI', image: '/images/swarm.png' },
  { title: 'Glance', category: 'Desktop AI', image: '/images/glance.png' },
  { title: 'MoreMur', category: 'Community / Anonymous Feeds', image: '/images/moremur.png' },
  { title: 'Anas Masama', category: 'Portfolio / Personal Site', image: '/images/anas-masama-og.png' },
  { title: 'Timeless', category: 'AI Agents / Sponsorship', image: '/images/timeless.png' },
  { title: 'Swarm HQ', category: 'AI Agent Dashboard' },
  { title: 'Podreach', category: 'AI / Podcast Outreach' },
  { title: 'CipherVault', category: 'Security / Encrypted Notes' },
  { title: 'TeenovateX', category: 'NGO / Community', image: '/images/teenovatex.png' },
  { title: 'JackPal', category: 'EdTech / AI', image: '/images/jackpal.png' },
  { title: 'MarcediVault', category: 'Web3 / Finance', image: '/images/marcedivault.png' },
  { title: 'Kinzoku Blueprint Forge', category: 'AI / Manufacturing Tools', image: '/images/kinzoku.png' },
  { title: 'EduPeak', category: 'EdTech / Platform', image: '/images/edupeak.png' },
  { title: 'Pill-Pal', category: 'Healthcare / AI', image: '/images/projects/pillpal.png' },
  { title: 'Ilmeen', category: 'EdTech / AI', image: '/images/ilmeen.png' },
  { title: 'EmpowerYou', category: 'Wellness / AI', image: '/images/projects/empoweryou.png' },
  { title: 'AOS-Swarm-Landing', category: 'Landing Page' },
  { title: 'Anas Claude Train', category: 'Architecture Notes' },
  { title: 'GitSync', category: 'Dev Tools / Sync' },
  { title: 'OffScript News', category: 'AI / News Briefs' },
  { title: 'Five Minutes Left', category: 'Browser Game' },
];

function monogram(title: string): string {
  const words = title.split(/[\s-]+/).filter(Boolean);
  return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : title.slice(0, 2).toUpperCase();
}

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
        aria-labelledby="labs-heading"
        className="relative z-[1] mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Selected labs
        </p>
        <h2
          id="labs-heading"
          className="m-0 mb-12 max-w-[16ch] font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]"
        >
          A few things I&apos;ve built
        </h2>

        <div className="relative w-full overflow-hidden" style={{ height: cardSize + 200 }}>
          {cards.map(({ item, position, isCenter }) => (
            <button
              key={item.title}
              type="button"
              onClick={() => move(position)}
              aria-label={item.title}
              className="absolute left-1/2 top-1/2 overflow-hidden text-left transition-[transform,background,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
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
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full items-center justify-center overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(120% 140% at 30% 20%, rgba(52,201,126,.22), transparent 60%), #0a0a0a',
                      backgroundImage:
                        'linear-gradient(rgba(243,242,238,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(243,242,238,.05) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  >
                    <span
                      className="select-none font-headline text-[64px] leading-none"
                      style={{ color: 'rgba(52,201,126,.35)' }}
                      aria-hidden="true"
                    >
                      {monogram(item.title)}
                    </span>
                  </div>
                )}
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
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous lab"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f3f2ee]/[0.18] bg-[#0c0c0c] text-lg text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:scale-[1.08] hover:border-[#34c97e] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next lab"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f3f2ee]/[0.18] bg-[#0c0c0c] text-lg text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:scale-[1.08] hover:border-[#34c97e] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/projects"
            className="inline-block whitespace-nowrap rounded-full border border-[#f3f2ee]/20 px-[26px] py-3.5 text-sm font-bold text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:translate-x-1 hover:border-[#34c97e] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
          >
            Visit my Labs →
          </a>
        </div>
      </section>
    </Reveal>
  );
}
