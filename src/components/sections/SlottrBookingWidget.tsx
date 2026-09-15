'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';

// Slottr (cal.diy — a self-hosted Cal.com fork) inline scheduling embed,
// live at slottr.anasmasama.dev under the "anasmasama" account. Loads the
// *self-hosted instance's own* embed.js (not cal.com's), matching
// NEXT_PUBLIC_EMBED_LIB_URL in Slottr's own env config.

const WEBAPP_URL = process.env.NEXT_PUBLIC_SLOTTR_WEBAPP_URL || '';
const SLOTTR_USERNAME = 'anasmasama';
const NAMESPACE = 'ask-my-butler';

// calLink must be "username/event-slug" (it's literally the URL path).
// Accept either just the slug (e.g. "main") or the full path (e.g.
// "anasmasama/main") from the env var so a misconfigured value doesn't
// silently 404 the embed.
const RAW_EVENT_SLUG = process.env.NEXT_PUBLIC_SLOTTR_EVENT_SLUG || 'main';
const EVENT_SLUG = RAW_EVENT_SLUG.includes('/')
  ? RAW_EVENT_SLUG
  : `${SLOTTR_USERNAME}/${RAW_EVENT_SLUG}`;

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

  // Faithful port of Cal.com's official embed snippet. The `cal` function
  // must synchronously create a queueing function at `cal.ns[namespace]` on
  // the "init" call — the real embed.js (loaded async below) later replaces
  // these queues with live implementations. A naive reimplementation that
  // leaves `ns` as a plain {} makes `Cal.ns[NAMESPACE](...)` throw
  // (calling undefined), which silently unmounts this whole section.
  const w = window as Window & { Cal?: any };
  const scriptSrc = `${webappUrl.replace(/\/$/, '')}/embed/embed.js`;

  const cal: any = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement('script')).src = scriptSrc;
      cal.loaded = true;
    }
    if (args[0] === 'init') {
      const namespace = args[1];
      if (typeof namespace === 'string') {
        const nsApi: any = function (...nsArgs: unknown[]) {
          nsApi.q.push(nsArgs);
        };
        nsApi.q = [];
        cal.ns[namespace] = cal.ns[namespace] || nsApi;
        cal.ns[namespace].q.push(args);
        cal.q.push(['initNamespace', namespace]);
      } else {
        cal.q.push(args);
      }
      return;
    }
    cal.q.push(args);
  };

  w.Cal = cal;
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
        // Deprecated in favor of cssVarsPerTheme, but it does one thing
        // cssVarsPerTheme can't reach reliably: it directly sets
        // document.body.style.background inside the iframe (see
        // methods.ui in embed-iframe.ts), sidestepping the app's own
        // dark-mode CSS-class cascade entirely. Whatever is left uncovered
        // by the CSS vars below (page-level background outside the card)
        // falls back to this.
        styles: {
          body: { background: '#040404' },
        },
        // "theme: dark" only covers the calendar grid — the booking form's
        // own input fields default to a white background regardless. Cal's
        // embed CSS-var API is the documented way to reach those.
        cssVarsPerTheme: {
          dark: {
            'cal-bg': '#040404',
            'cal-bg-emphasis': '#111111',
            'cal-bg-muted': '#0c0c0c',
            'cal-border': 'rgba(243,242,238,0.14)',
            'cal-border-emphasis': 'rgba(243,242,238,0.25)',
            'cal-border-subtle': 'rgba(243,242,238,0.08)',
            'cal-text': '#f3f2ee',
            'cal-text-emphasis': '#f3f2ee',
            'cal-text-muted': 'rgba(243,242,238,0.6)',
            'cal-brand': '#34c97e',
            'cal-brand-emphasis': '#2ba86a',
            'cal-brand-text': '#060606',
          },
        },
      });
    } catch (err) {
      console.error('Slottr embed failed to initialize:', err);
      setFailed(true);
    }
  }, [containerId]);

  // Not configured at all (no webapp URL) — nothing sensible to show.
  if (!isConfigured()) {
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
        {failed ? (
          <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-[#f3f2ee]/[0.14] bg-[#040404]/[0.86] p-8 text-center">
            <p className="m-0 text-[15px] text-[#f3f2ee]/70">
              The live calendar didn&apos;t load. Email me directly instead —
            </p>
            <a
              href="mailto:anasabubakar7000@gmail.com"
              className="rounded-full bg-[#f3f2ee] px-5 py-2.5 text-[13px] font-bold text-[#060606] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              anasabubakar7000@gmail.com
            </a>
          </div>
        ) : (
          <div
            id={containerId}
            role="application"
            aria-label="Book a call via Slottr"
            className="min-h-[650px] w-full"
          />
        )}
      </section>
    </Reveal>
  );
}
