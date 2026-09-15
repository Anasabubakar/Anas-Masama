import { NextResponse } from 'next/server';
import { createBooking, isSlottrConfigured } from '@/lib/slottr';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  if (requestLog.size > 5000) requestLog.clear();
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!isSlottrConfigured()) {
    return NextResponse.json({ error: 'Booking is not configured' }, { status: 503 });
  }

  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json({ error: 'Too many requests, try again shortly' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const { start, name, email, notes, timeZone, guests } = body ?? {};

  if (
    typeof start !== 'string' ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof timeZone !== 'string' ||
    name.trim().length < 2 ||
    !EMAIL_RE.test(email) ||
    (notes !== undefined && typeof notes !== 'string') ||
    (guests !== undefined && !Array.isArray(guests))
  ) {
    return NextResponse.json({ error: 'Invalid booking details' }, { status: 400 });
  }

  const cleanGuests: string[] = Array.isArray(guests)
    ? guests
        .filter((g): g is string => typeof g === 'string')
        .map((g) => g.trim())
        .filter((g) => g.length > 0)
    : [];

  if (cleanGuests.length > 10 || cleanGuests.some((g) => !EMAIL_RE.test(g) || g.length > 320)) {
    return NextResponse.json({ error: 'Invalid guest email' }, { status: 400 });
  }

  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime()) || startDate.getTime() < Date.now()) {
    return NextResponse.json({ error: 'Invalid or past start time' }, { status: 400 });
  }

  if (name.length > 200 || email.length > 320 || (notes && notes.length > 2000)) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  try {
    const booking = await createBooking({
      startISO: startDate.toISOString(),
      name: name.trim(),
      email: email.trim(),
      notes: notes?.trim(),
      timeZone,
      guests: cleanGuests,
    });
    return NextResponse.json({ booking });
  } catch (err) {
    console.error('Slottr booking creation error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 502 });
  }
}
