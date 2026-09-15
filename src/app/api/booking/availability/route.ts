import { NextResponse } from 'next/server';
import { getAvailableSlots, isSlottrConfigured } from '@/lib/slottr';

export const runtime = 'nodejs';

const MAX_RANGE_DAYS = 60;

export async function GET(req: Request) {
  if (!isSlottrConfigured()) {
    return NextResponse.json({ error: 'Booking is not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const timeZone = searchParams.get('timeZone') || 'UTC';

  if (!start || !end) {
    return NextResponse.json({ error: 'start and end are required' }, { status: 400 });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
    return NextResponse.json({ error: 'Invalid start/end range' }, { status: 400 });
  }
  const rangeDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  if (rangeDays > MAX_RANGE_DAYS) {
    return NextResponse.json({ error: `Range too large (max ${MAX_RANGE_DAYS} days)` }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(startDate.toISOString(), endDate.toISOString(), timeZone);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error('Slottr availability error:', err);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 502 });
  }
}
