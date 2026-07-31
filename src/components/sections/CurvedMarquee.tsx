'use client';

import { useRef } from 'react';

const PHRASE = 'SOFTWARE ENGINEER • AI DEVELOPER • FOUNDER, TEENOVATEX LABS • ';

export function CurvedMarquee() {
  const measureRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGTextPathElement>(null);

  return (
    <div className="relative z-[1] overflow-hidden pb-[30px]">
      <svg
        viewBox="0 0 1440 240"
        className="block w-full cursor-grab overflow-visible"
      >
        <defs>
          <path id="loopPath" d="M-100,120 Q720,300 1540,120" fill="none" stroke="transparent" />
        </defs>
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className="pointer-events-none invisible opacity-0"
          style={{ fontFamily: 'var(--font-headline), serif', fontSize: 60 }}
        >
          {PHRASE}
        </text>
        <text xmlSpace="preserve" fill="#f3f2ee" style={{ fontFamily: 'var(--font-headline), serif', fontSize: 60 }}>
          <textPath ref={pathRef} href="#loopPath" startOffset="0" xmlSpace="preserve" />
        </text>
      </svg>
    </div>
  );
}
