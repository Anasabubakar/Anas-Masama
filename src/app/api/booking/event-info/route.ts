import { NextResponse } from 'next/server';
import { getEventType, isSlottrConfigured } from '@/lib/slottr';

export const runtime = 'nodejs';

function locationLabel(locations: { type: string; integration?: string; address?: string }[]): string {
  if (locations.length === 0) return '';
  const loc = locations[0];
  if (loc.integration === 'google-meet') return 'Google Meet';
  if (loc.type === 'attendeeAddress') return 'In person';
  if (loc.address) return loc.address;
  return loc.type;
}

export async function GET() {
  if (!isSlottrConfigured()) {
    return NextResponse.json({ error: 'Booking is not configured' }, { status: 503 });
  }
  try {
    const eventType = await getEventType();
    return NextResponse.json({
      durationMinutes: eventType.lengthInMinutes,
      location: locationLabel(eventType.locations),
    });
  } catch (err) {
    console.error('Slottr event-info error:', err);
    return NextResponse.json({ error: 'Failed to fetch event info' }, { status: 502 });
  }
}
