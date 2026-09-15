'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';

// Slottr (cal.diy — a self-hosted Cal.com fork) inline scheduling embed,
// live at slottr.anasmasama.dev under the "anasmasama" account. Loads the
// *self-hosted instance's own* embed.js (not cal.com's), matching
// NEXT_PUBLIC_EMBED_LIB_URL in Slottr's own env config.

const WEBAPP_URL = process.env.NEXT_PUBLIC_SLOTTR_WEBAPP_URL || '';
const EVENT_SLUG = process.env.NEXT_PUBLIC_SLOTTR_EVENT_SLUG || 'anasmasama/30min';
const NAMESPACE = 'ask-my-butler';

function isConfigured() {
  return Boolean(WEBAPP_URL) && !WEBAPP_URL.includes('localhost');
}

declare global {
  interface Window {
    Cal?: {
      (...args: unknown[]): void;
      ns?: Record<string, (...args: unknown[]) => void>;
      loaded?: boolean;
      q?: unknown[];
    };
  }
}

function loadCalEmbed(webappUrl: string) {
  if (typeof window === 'undefined') return;
  if (window.Cal) return;

  // Mirrors Cal.com's standard embed snippet, pointed at the self-hosted
  // instance's own embed.js instead of app.cal.com's.
  const w = window as Window & { Cal?: any };
  const global: any = function (...args: unknown[]) {
    (global.q = global.q || []).push(args);
  };
  global.loaded = false;
  global.ns = {};
  w.Cal = global;

  const script = document.createElement('script');
  script.src = `${webappUrl.replace(/\/$/, '')}/embed/embed.js`;
  script.async = true;
  document.head.appendChild(script);
}

export function SlottrBookingWidget() {
  const containerId = useId().replace(/:/g, '');
  const initialized = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isConfigured() || initialized.current) return;
    initialized.current = true;

    try {
      loadCalEmbed(WEBAPP_URL);
      const Cal = window.Cal!;
      Cal('init', NAMESPACE, { origin: WEBAPP_URL });
      Cal.ns![NAMESPACE]('inline', {
        elementOrSelector: `#${containerId}`,
        calLink: EVENT_SLUG,
        config: {
          layout: 'month_view',
          theme: 'dark',
        },
      });
      Cal.ns![NAMESPACE]('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    } catch (err) {
      console.error('Slottr embed failed to initialize:', err);
      setFailed(true);
    }
  }, [containerId]);

  // Not configured yet (or failed to load) — render nothing rather than a
  // broken/empty booking block on the live site.
  if (!isConfigured() || failed) {
    return null;
  }

  return (
    <Reveal as="section">
      <section
        id="booking"
        aria-labelledby="booking-heading"
        className="relative z-[1] mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Book a call
        </p>
        <h2
          id="booking-heading"
          className="m-0 mb-4 font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]"
        >
          Grab a slot in real time
        </h2>
        <p className="m-0 mb-10 max-w-[60ch] text-base leading-[1.6] text-[#f3f2ee]/65">
          Synced straight to my calendar — pick a time and it&apos;s locked in immediately,
          no back-and-forth.
        </p>
        <div
          id={containerId}
          role="application"
          aria-label="Book a call via Slottr"
          className="min-h-[650px] w-full overflow-hidden rounded-3xl border border-[#f3f2ee]/[0.14] bg-[#040404]/[0.86]"
        />
      </section>
    </Reveal>
  );
}
