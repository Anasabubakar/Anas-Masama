'use client';

import { useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import {
  MONTHS,
  WEEKDAYS,
  SLOT_TIMES,
  WITTY_DECLINES,
  getMonthMeta,
  buildCalendarWeeks,
  hashKey,
  isSlotAvailable,
} from '@/lib/booking';

type BookStep = 'day' | 'time' | 'form' | 'done';

export function Booking() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [bookStep, setBookStep] = useState<BookStep>('day');
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dayMessage, setDayMessage] = useState('');
  const [msgTargetKey, setMsgTargetKey] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookNote, setBookNote] = useState('');
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

  const resetBooking = () => {
    setBookStep('day');
    setSelectedDateKey(null);
    setSelectedSlot(null);
    setBookName('');
    setBookEmail('');
    setBookNote('');
  };

  const confirmBooking = () => {
    if (!bookName || !bookEmail) return;
    setBookStep('done');
  };

  const pickSlot = (time: string) => {
    if (!selectedDateKey) return;
    const slotKey = `slot:${selectedDateKey}${time}`;
    if (isSlotAvailable(selectedDateKey, time)) {
      setSelectedSlot(time);
      setBookStep('form');
      setDayMessage('');
      setMsgTargetKey('');
    } else {
      showDayMessage(slotKey);
    }
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
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f3f2ee]/15 text-[15px] text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:-translate-x-[3px] hover:border-[#34c97e] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
              >
                ←
              </button>
              <h3 className="m-0 whitespace-nowrap text-base font-bold text-[#f3f2ee]">
                {MONTHS[month]} {year}
              </h3>
              <button
                type="button"
                onClick={() => setMonthOffset((m) => Math.min(2, m + 1))}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f3f2ee]/15 text-[15px] text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:translate-x-[3px] hover:border-[#34c97e] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
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
            <div className="transition-[transform,opacity] duration-[280ms] ease-out">
              {weeks.map((week, wi) => (
                <div key={wi} className="mb-1.5 grid grid-cols-7 gap-1.5">
                  {week.map((day) => {
                    if (day.num === null) {
                      return <div key={day.key} className="invisible aspect-square" />;
                    }
                    const isSelected = day.key === selectedDateKey;
                    return (
                      <div key={day.key} className="relative">
                        <button
                          type="button"
                          onClick={() => day.date && pickDate(day.key, day.date, day.available)}
                          className={[
                            'aspect-square w-full rounded-xl border text-sm font-bold transition-[transform,background,border-color] duration-200 ease-out hover:z-[2] hover:scale-110',
                            isSelected
                              ? 'border-[#34c97e] bg-[#34c97e] text-[#060606]'
                              : day.available
                                ? 'border-[#34c97e]/40 bg-[#34c97e]/[0.08] text-[#f3f2ee]'
                                : 'border-[#f3f2ee]/10 bg-transparent text-[#f3f2ee]/30',
                          ].join(' ')}
                        >
                          {day.num}
                        </button>
                        {msgTargetKey === day.key && dayMessage && (
                          <div className="absolute bottom-[calc(100%+8px)] left-1/2 z-[6] w-[150px] -translate-x-1/2 rounded-[10px] bg-[#f3f2ee] px-3 py-2 text-center text-[11px] font-bold leading-[1.4] text-[#060606] shadow-[0_8px_20px_rgba(0,0,0,.4)]">
                            {dayMessage}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-[18px] flex gap-4 text-[11px] text-[#f3f2ee]/50">
              <span>
                <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-[#34c97e]" />
                Free
              </span>
              <span>
                <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-[#f3f2ee]/15" />
                Unavailable
              </span>
            </div>
          </div>
          <div className="flex min-h-[340px] flex-col justify-center bg-[#040404]/[0.72] p-5 backdrop-blur-md sm:p-9">
            {!selectedDateKey && (
              <div
                className="text-center text-[#f3f2ee]/40"
                style={{ animation: 'panelIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
              >
                <div className="mb-3 text-[32px]">◐</div>
                <p className="m-0 text-[15px]">Pick a free day on the left to see open times.</p>
              </div>
            )}

            {bookStep === 'time' && selectedDateKey && (
              <div className="w-full" style={{ animation: 'panelIn 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
                <button
                  type="button"
                  onClick={() => setBookStep('day')}
                  className="m-0 mb-5 whitespace-nowrap border-none bg-transparent p-0 text-[13px] font-semibold text-[#f3f2ee]/50"
                >
                  ← choose a different day
                </button>
                <h3 className="m-0 mb-5 text-[19px] font-bold text-[#f3f2ee]">
                  {selectedDateLabel} — pick a time
                </h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5">
                  {SLOT_TIMES.map((time) => {
                    const slotKey = `slot:${selectedDateKey}${time}`;
                    const available = isSlotAvailable(selectedDateKey, time);
                    const isSelected = time === selectedSlot;
                    return (
                      <div key={time} className="relative">
                        <button
                          type="button"
                          onClick={() => pickSlot(time)}
                          className={[
                            'w-full rounded-xl border px-2 py-3 text-[13px] font-bold transition-[transform,background,border-color] duration-200 ease-out hover:-translate-y-0.5',
                            isSelected
                              ? 'border-[#34c97e] bg-[#34c97e] text-[#060606]'
                              : available
                                ? 'border-[#f3f2ee]/[0.18] bg-[#f3f2ee]/[0.04] text-[#f3f2ee]'
                                : 'border-[#f3f2ee]/10 bg-transparent text-[#f3f2ee]/30',
                          ].join(' ')}
                        >
                          {time}
                        </button>
                        {msgTargetKey === slotKey && dayMessage && (
                          <div className="absolute bottom-[calc(100%+8px)] left-1/2 z-[6] w-[150px] -translate-x-1/2 rounded-[10px] bg-[#f3f2ee] px-3 py-2 text-center text-[11px] font-bold leading-[1.4] text-[#060606] shadow-[0_8px_20px_rgba(0,0,0,.4)]">
                            {dayMessage}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {bookStep === 'form' && (
              <div className="w-full" style={{ animation: 'panelIn 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
                <button
                  type="button"
                  onClick={() => setBookStep('time')}
                  className="m-0 mb-5 whitespace-nowrap border-none bg-transparent p-0 text-[13px] font-semibold text-[#f3f2ee]/50"
                >
                  ← choose a different time
                </button>
                <h3 className="m-0 mb-5 text-[19px] font-bold text-[#f3f2ee]">
                  {selectedDateLabel} at {selectedSlot} — your details
                </h3>
                <div className="flex max-w-[440px] flex-col gap-3.5">
                  <input
                    placeholder="Your name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none transition-colors focus:border-[#f3f2ee]/30"
                  />
                  <input
                    placeholder="Your email"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none transition-colors focus:border-[#f3f2ee]/30"
                  />
                  <textarea
                    placeholder="What do you want to talk about?"
                    value={bookNote}
                    onChange={(e) => setBookNote(e.target.value)}
                    rows={3}
                    className="resize-y rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none"
                  />
                  <button
                    type="button"
                    onClick={confirmBooking}
                    className="w-fit rounded-full bg-[#f3f2ee] px-5 py-3.5 text-[15px] font-bold text-[#060606] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                  >
                    Confirm booking
                  </button>
                </div>
              </div>
            )}

            {bookStep === 'done' && (
              <div className="text-center" style={{ animation: 'panelIn 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
                <div
                  className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#34c97e] text-[22px] font-extrabold text-[#060606]"
                  style={{ animation: 'msgIn 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both' }}
                >
                  ✓
                </div>
                <h3 className="m-0 mb-2 text-xl font-bold text-[#f3f2ee]">You&apos;re booked</h3>
                <p className="m-0 mb-[22px] text-[15px] text-[#f3f2ee]/65">
                  {selectedDateLabel} at {selectedSlot}. A calendar invite is on its way to{' '}
                  {bookEmail}.
                </p>
                <button
                  type="button"
                  onClick={resetBooking}
                  className="rounded-full border border-[#f3f2ee]/20 bg-transparent px-[22px] py-3 text-sm font-semibold text-[#f3f2ee] transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#34c97e] active:scale-95"
                >
                  Book another time
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="m-0 mt-[18px] max-w-[60ch] text-xs leading-[1.6] text-[#f3f2ee]/40">
          This is one of my Lab Creations. Bring that idea, And Let me cook!
        </p>
      </section>
    </Reveal>
  );
}
