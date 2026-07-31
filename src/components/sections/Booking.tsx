'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { MONTHS, WEEKDAYS, getMonthMeta, buildCalendarWeeks } from '@/lib/booking';

type BookStep = 'day' | 'time' | 'form' | 'done';

export function Booking() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [bookStep, setBookStep] = useState<BookStep>('day');
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { year, month } = getMonthMeta(monthOffset);
  const weeks = buildCalendarWeeks(monthOffset);

  return (
    <Reveal as="section">
      <section
        id="booking"
        className="relative z-[1] mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-14"
      >
        <p className="m-0 mb-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#34c97e]">
          Book a call
        </p>
        <h2 className="m-0 mb-4 font-headline text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] text-[#f3f2ee]">
          Pick a day that works
        </h2>
        <p className="m-0 mb-10 max-w-[60ch] text-base leading-[1.6] text-[#f3f2ee]/65">
          See my real schedule below. Pick a free day, pick a time, and it&apos;s booked — no
          emails back and forth.
        </p>
      </section>
    </Reveal>
  );
}
