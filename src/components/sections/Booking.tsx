'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import {
  MONTHS,
  WEEKDAYS,
  WEEKDAYS_FULL,
  getMonthMeta,
  buildCalendarWeeks,
} from '@/lib/booking';

type BookStep = 'day' | 'time' | 'form' | 'done';
type Slots = Record<string, { start: string }[]>;
type EventInfo = { durationMinutes: number; location: string };

const COMMON_TIMEZONES = [
  'UTC', 'Africa/Lagos', 'Africa/Cairo', 'Africa/Johannesburg',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Sao_Paulo', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore',
  'Asia/Shanghai', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland',
];

function getTimezoneOptions(detected: string): string[] {
  const supported =
    typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl
      ? (Intl as unknown as { supportedValuesOf: (key: string) => string[] }).supportedValuesOf('timeZone')
      : COMMON_TIMEZONES;
  const list = Array.from(new Set([detected, ...supported]));
  return list.sort((a, b) => (a === detected ? -1 : b === detected ? 1 : a.localeCompare(b)));
}

export function Booking() {
  const detectedTimeZone = useMemo(
    () => (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC'),
    []
  );

  const [timeZone, setTimeZone] = useState(detectedTimeZone);
  const timezoneOptions = useMemo(() => getTimezoneOptions(detectedTimeZone), [detectedTimeZone]);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [bookStep, setBookStep] = useState<BookStep>('day');
  const [slots, setSlots] = useState<Slots>({});
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState('');
  const [selectedSlotISO, setSelectedSlotISO] = useState<string | null>(null);
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookNote, setBookNote] = useState('');
  const [guests, setGuests] = useState<string[]>([]);
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [guestDraft, setGuestDraft] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/booking/event-info')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setEventInfo(data))
      .catch(() => {});
  }, []);

  const { year, month } = getMonthMeta(monthOffset);
  const weeks = buildCalendarWeeks(monthOffset);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    setSlotsLoading(true);
    setSlotsError(false);

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);
    const params = new URLSearchParams({
      start: start.toISOString(),
      end: end.toISOString(),
      timeZone,
    });

    fetch(`/api/booking/availability?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (requestId.current !== id) return;
        setSlots(data.slots || {});
      })
      .catch(() => {
        if (requestId.current !== id) return;
        setSlotsError(true);
      })
      .finally(() => {
        if (requestId.current !== id) return;
        setSlotsLoading(false);
      });
  }, [year, month, timeZone]);

  const pickDate = (key: string, date: Date) => {
    if (!(slots[key]?.length > 0)) return;
    const label = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    setSelectedDateKey(key);
    setSelectedDateLabel(label);
    setBookStep('time');
  };

  const pickSlot = (iso: string) => {
    setSelectedSlotISO(iso);
    setBookStep('form');
    setSubmitError(null);
  };

  const resetBooking = () => {
    setBookStep('day');
    setSelectedDateKey(null);
    setSelectedSlotISO(null);
    setBookName('');
    setBookEmail('');
    setBookNote('');
    setGuests([]);
    setShowGuestInput(false);
    setGuestDraft('');
    setSubmitError(null);
  };

  const addGuest = () => {
    const email = guestDraft.trim();
    if (!email || guests.includes(email)) return;
    setGuests((g) => [...g, email]);
    setGuestDraft('');
  };

  const removeGuest = (email: string) => {
    setGuests((g) => g.filter((e) => e !== email));
  };

  const confirmBooking = async () => {
    if (!bookName || !bookEmail || !selectedSlotISO || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: selectedSlotISO,
          name: bookName,
          email: bookEmail,
          notes: bookNote || undefined,
          timeZone,
          guests,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `status ${res.status}`);
      }
      setBookStep('done');
    } catch {
      setSubmitError('Something went wrong booking that slot. It may have just been taken — try another time.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dayTimes = selectedDateKey ? slots[selectedDateKey] || [] : [];

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
          Pick a day that works
        </h2>
        <p className="m-0 mb-6 max-w-[60ch] text-base leading-[1.6] text-[#f3f2ee]/65">
          Synced straight to my real calendar — pick a free day, pick a time, and it&apos;s
          locked in immediately, no back-and-forth.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#f3f2ee]/60">
          {eventInfo && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>⏱</span> {eventInfo.durationMinutes} min
              </span>
              {eventInfo.location && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden>📍</span> {eventInfo.location}
                </span>
              )}
            </>
          )}
          <label className="inline-flex items-center gap-1.5">
            <span aria-hidden>🌐</span>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              aria-label="Timezone"
              className="cursor-pointer rounded-md border border-[#f3f2ee]/15 bg-[#040404] px-2 py-1 text-[13px] text-[#f3f2ee]/80 outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
            >
              {timezoneOptions.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </label>
        </div>

        {slotsError ? (
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
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[#f3f2ee]/[0.14] bg-[#f3f2ee]/10 md:grid-cols-[minmax(280px,380px)_1fr]">
            <div className="bg-[#040404]/[0.86] p-5 backdrop-blur-md sm:p-8">
              <div className="mb-[22px] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                  aria-label="Previous month"
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
                  aria-label="Next month"
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#f3f2ee]/15 text-[15px] text-[#f3f2ee] transition-[transform,border-color] duration-200 ease-out hover:translate-x-[3px] hover:border-[#34c97e] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
                >
                  →
                </button>
              </div>
              <div className="mb-1.5 grid grid-cols-7 gap-1.5">
                {WEEKDAYS.map((wd, i) => (
                  <div key={wd} className="text-center text-[10px] font-bold uppercase text-[#f3f2ee]/40">
                    <abbr title={WEEKDAYS_FULL[i]} className="no-underline">
                      {wd}
                    </abbr>
                  </div>
                ))}
              </div>
              <div className={slotsLoading ? 'opacity-40 transition-opacity' : 'transition-opacity'}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="mb-1.5 grid grid-cols-7 gap-1.5">
                    {week.map((day) => {
                      if (day.num === null) {
                        return <div key={day.key} className="invisible aspect-square" />;
                      }
                      const available = (slots[day.key]?.length ?? 0) > 0;
                      const isSelected = day.key === selectedDateKey;
                      return (
                        <button
                          key={day.key}
                          type="button"
                          disabled={!available || slotsLoading}
                          onClick={() => day.date && pickDate(day.key, day.date)}
                          aria-label={`${MONTHS[month]} ${day.num}${available ? '' : ' (unavailable)'}`}
                          aria-pressed={isSelected}
                          className={[
                            'aspect-square w-full rounded-xl border text-sm font-bold transition-[transform,background,border-color] duration-200 ease-out disabled:cursor-default',
                            available && !slotsLoading ? 'hover:z-[2] hover:scale-110' : '',
                            'focus-visible:z-[2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]',
                            isSelected
                              ? 'border-[#34c97e] bg-[#34c97e] text-[#060606]'
                              : available
                                ? 'border-[#34c97e]/40 bg-[#34c97e]/[0.08] text-[#f3f2ee]'
                                : 'border-[#f3f2ee]/10 bg-transparent text-[#f3f2ee]/30',
                          ].join(' ')}
                        >
                          {day.num}
                        </button>
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
                <div className="text-center text-[#f3f2ee]/40">
                  <div className="mb-3 text-[32px]">◐</div>
                  <p className="m-0 text-[15px]">
                    {slotsLoading ? 'Loading real availability…' : 'Pick a free day on the left to see open times.'}
                  </p>
                </div>
              )}

              {bookStep === 'time' && selectedDateKey && (
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setBookStep('day')}
                    className="m-0 mb-5 whitespace-nowrap rounded border-none bg-transparent p-0 text-[13px] font-semibold text-[#f3f2ee]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                  >
                    ← choose a different day
                  </button>
                  <h3 className="m-0 mb-5 text-[19px] font-bold text-[#f3f2ee]">
                    {selectedDateLabel} — pick a time
                  </h3>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5">
                    {dayTimes.map((slot) => {
                      const label = new Date(slot.start).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      });
                      const isSelected = slot.start === selectedSlotISO;
                      return (
                        <button
                          key={slot.start}
                          type="button"
                          onClick={() => pickSlot(slot.start)}
                          aria-pressed={isSelected}
                          className={[
                            'w-full rounded-xl border px-2 py-3 text-[13px] font-bold transition-[transform,background,border-color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]',
                            isSelected
                              ? 'border-[#34c97e] bg-[#34c97e] text-[#060606]'
                              : 'border-[#f3f2ee]/[0.18] bg-[#f3f2ee]/[0.04] text-[#f3f2ee]',
                          ].join(' ')}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {bookStep === 'form' && (
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setBookStep('time')}
                    className="m-0 mb-5 whitespace-nowrap rounded border-none bg-transparent p-0 text-[13px] font-semibold text-[#f3f2ee]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                  >
                    ← choose a different time
                  </button>
                  <h3 className="m-0 mb-5 text-[19px] font-bold text-[#f3f2ee]">
                    {selectedDateLabel} at{' '}
                    {selectedSlotISO &&
                      new Date(selectedSlotISO).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}{' '}
                    — your details
                  </h3>
                  <div className="flex max-w-[440px] flex-col gap-3.5">
                    <input
                      placeholder="Your name"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none transition-colors focus:border-[#f3f2ee]/30 focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                    />
                    <input
                      placeholder="Your email"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      className="rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none transition-colors focus:border-[#f3f2ee]/30 focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                    />
                    <textarea
                      placeholder="What do you want to talk about?"
                      value={bookNote}
                      onChange={(e) => setBookNote(e.target.value)}
                      rows={3}
                      className="resize-y rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3.5 text-[15px] text-[#f3f2ee] outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                    />

                    {guests.length > 0 && (
                      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                        {guests.map((email) => (
                          <li
                            key={email}
                            className="flex items-center justify-between rounded-lg border border-[#f3f2ee]/10 bg-[#f3f2ee]/[0.03] px-3 py-2 text-[13px] text-[#f3f2ee]/80"
                          >
                            {email}
                            <button
                              type="button"
                              onClick={() => removeGuest(email)}
                              aria-label={`Remove guest ${email}`}
                              className="ml-2 text-[#f3f2ee]/40 hover:text-[#f3f2ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {showGuestInput ? (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Guest email"
                          value={guestDraft}
                          onChange={(e) => setGuestDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addGuest();
                            }
                          }}
                          className="flex-1 rounded-xl border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-4 py-3 text-[15px] text-[#f3f2ee] outline-none transition-colors focus:border-[#f3f2ee]/30 focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                        />
                        <button
                          type="button"
                          onClick={addGuest}
                          className="whitespace-nowrap rounded-xl border border-[#f3f2ee]/15 px-4 py-3 text-[13px] font-semibold text-[#f3f2ee] transition-colors hover:border-[#34c97e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowGuestInput(true)}
                        className="w-fit text-[13px] font-semibold text-[#f3f2ee]/50 underline decoration-dotted underline-offset-4 transition-colors hover:text-[#34c97e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
                      >
                        + Add guests
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={confirmBooking}
                      disabled={isSubmitting || !bookName || !bookEmail}
                      className="w-fit rounded-full bg-[#f3f2ee] px-5 py-3.5 text-[15px] font-bold text-[#060606] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Booking…' : 'Confirm booking'}
                    </button>
                    {submitError && (
                      <p role="status" aria-live="polite" className="m-0 text-sm text-[#f3f2ee]/70">
                        {submitError}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {bookStep === 'done' && (
                <div className="text-center">
                  <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#34c97e] text-[22px] font-extrabold text-[#060606]">
                    ✓
                  </div>
                  <h3 className="m-0 mb-2 text-xl font-bold text-[#f3f2ee]">You&apos;re booked</h3>
                  <p className="m-0 mb-[22px] text-[15px] text-[#f3f2ee]/65">
                    {selectedDateLabel} at{' '}
                    {selectedSlotISO &&
                      new Date(selectedSlotISO).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    . A calendar invite is on its way to {bookEmail}.
                  </p>
                  <button
                    type="button"
                    onClick={resetBooking}
                    className="rounded-full border border-[#f3f2ee]/20 bg-transparent px-[22px] py-3 text-sm font-semibold text-[#f3f2ee] transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#34c97e] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
                  >
                    Book another time
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}
