'use client';

import { useEffect, useRef } from 'react';

const PHRASE = 'SOFTWARE ENGINEER • AI DEVELOPER • FOUNDER, TEENOVATEX LABS • ';

export function CurvedMarquee() {
  const measureRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGTextPathElement>(null);
  const spacingRef = useRef(0);
  const offsetRef = useRef(0);
  const dirRef = useRef(-1);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const measureEl = measureRef.current;
    const pathEl = pathRef.current;
    if (!measureEl || !pathEl || !measureEl.getComputedTextLength) return;

    const spacing = measureEl.getComputedTextLength();
    if (!spacing) return;
    spacingRef.current = spacing;

    const count = Math.ceil(1800 / spacing) + 2;
    pathEl.textContent = PHRASE.repeat(count);
    offsetRef.current = -spacing;
    pathEl.setAttribute('startOffset', `${offsetRef.current}px`);

    const step = () => {
      if (!draggingRef.current) {
        offsetRef.current += dirRef.current * 0.6;
        if (offsetRef.current <= -spacing) offsetRef.current += spacing;
        if (offsetRef.current > 0) offsetRef.current -= spacing;
        pathEl.setAttribute('startOffset', `${offsetRef.current}px`);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const pathEl = pathRef.current;
    const spacing = spacingRef.current;
    if (!draggingRef.current || !pathEl || !spacing) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dirRef.current = dx > 0 ? 1 : -1;
    offsetRef.current += dx;
    if (offsetRef.current <= -spacing) offsetRef.current += spacing;
    if (offsetRef.current > 0) offsetRef.current -= spacing;
    pathEl.setAttribute('startOffset', `${offsetRef.current}px`);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div className="relative z-[1] overflow-hidden pb-[30px]">
      <svg
        viewBox="0 0 1440 240"
        className="block w-full cursor-grab overflow-visible"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
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
