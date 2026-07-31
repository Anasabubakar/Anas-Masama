'use client';

import { useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { MONTHS, WEEKDAYS, WITTY_DECLINES, getMonthMeta, buildCalendarWeeks, hashKey } from '@/lib/booking';

type BookStep = 'day' | 'time' | 'form' | 'done';

export function Booking() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [bookStep, setBookStep] = useState<BookStep>('day');
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dayMessage, setDayMessage] = useState('');
  const [msgTargetKey, setMsgTargetKey] = useState('');
  const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { year, month } = getMonthMeta(monthOffset);
  const weeks = buildCalendarWeeks(monthOffset);

  const showDayMessage = (key: string) => {
    const msg = WITTY_DECLINES[hashKey(key) % WITTY_DECLINES.length];
    setDayMessage(msg);
    setMsgTargetKey(key);
    if (msgTimer.current) clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => {
      setDayMessage('');
      setMsgTargetKey('');
    }, 2800);
  };

  const pickDate = (key: string, date: Date, available: boolean) => {
    if (!available) {
      showDayMessage(key);
      return;
    }
    const label = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    setSelectedDateKey(key);
    setSelectedDateLabel(label);
    setBookStep('time');
    setDayMessage('');
    setMsgTargetKey('');
  };

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

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[#f3f2ee]/[0.14] bg-[#f3f2ee]/10 md:grid-cols-[minmax(280px,380px)_1fr]">
          <div className="bg-[#040404]/[0.86] p-5 backdrop-blur-md sm:p-8">
            <div className="mb-[22px] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f3f2ee]/15 text-[15px] text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:-translate-x-[3px] hover:border-[#34c97e] active:scale-90"
              >
                ←
              </button>
              <h3 className="m-0 whitespace-nowrap text-base font-bold text-[#f3f2ee]">
                {MONTHS[month]} {year}
              </h3>
              <button
                type="button"
                onClick={() => setMonthOffset((m) => Math.min(2, m + 1))}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f3f2ee]/15 text-[15px] text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:translate-x-[3px] hover:border-[#34c97e] active:scale-90"
              >
                →
              </button>
            </div>
            <div className="mb-1.5 grid grid-cols-7 gap-1.5">
              {WEEKDAYS.map((wd) => (
                <div
                  key={wd}
                  className="text-center text-[10px] font-bold uppercase text-[#f3f2ee]/40"
                >
                  {wd}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[340px] flex-col justify-center bg-[#040404]/[0.72] p-5 backdrop-blur-md sm:p-9" />
        </div>
      </section>
    </Reveal>
  );
}
