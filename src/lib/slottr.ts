// Server-only client for the real Slottr (self-hosted Cal.com fork) REST API
// at https://slottr-api.anasmasama.dev. Never import this from a client
// component — SLOTTR_API_KEY must stay server-side.

const BASE_URL = process.env.SLOTTR_API_BASE_URL || '';
const API_KEY = process.env.SLOTTR_API_KEY || '';
const USERNAME = process.env.SLOTTR_USERNAME || 'anasmasama';
const EVENT_SLUG = process.env.SLOTTR_EVENT_SLUG || 'main';

export function isSlottrConfigured(): boolean {
  return Boolean(BASE_URL) && Boolean(API_KEY);
}

async function slottrFetch(path: string, init: RequestInit & { apiVersion: string }) {
  const { apiVersion, headers, ...rest } = init;
  const res = await fetch(`${BASE_URL.replace(/\/$/, '')}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'cal-api-version': apiVersion,
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Slottr API ${path} failed: ${res.status} ${body.slice(0, 300)}`);
  }
  return res.json();
}

export type SlottrSlots = Record<string, { start: string }[]>;

export async function getAvailableSlots(startISO: string, endISO: string, timeZone: string): Promise<SlottrSlots> {
  const params = new URLSearchParams({
    eventTypeSlug: EVENT_SLUG,
    username: USERNAME,
    start: startISO,
    end: endISO,
    timeZone,
  });
  const json = await slottrFetch(`/v2/slots?${params.toString()}`, {
    method: 'GET',
    apiVersion: '2024-09-04',
  });
  return json.data as SlottrSlots;
}

let cachedEventTypeId: number | null = null;

export async function getEventTypeId(): Promise<number> {
  if (cachedEventTypeId !== null) return cachedEventTypeId;
  const json = await slottrFetch(`/v2/event-types?username=${USERNAME}`, {
    method: 'GET',
    apiVersion: '2024-06-14',
  });
  const groups = json.data?.eventTypeGroups ?? [];
  for (const group of groups) {
    for (const et of group.eventTypes ?? []) {
      if (et.slug === EVENT_SLUG) {
        cachedEventTypeId = et.id as number;
        return cachedEventTypeId;
      }
    }
  }
  throw new Error(`Slottr event type with slug "${EVENT_SLUG}" not found for user "${USERNAME}"`);
}

export async function createBooking(input: {
  startISO: string;
  name: string;
  email: string;
  notes?: string;
  timeZone: string;
}) {
  const eventTypeId = await getEventTypeId();
  const json = await slottrFetch('/v2/bookings', {
    method: 'POST',
    apiVersion: '2024-08-13',
    body: JSON.stringify({
      start: input.startISO,
      eventTypeId,
      attendee: {
        name: input.name,
        email: input.email,
        timeZone: input.timeZone,
        language: 'en',
      },
      // The "main" event type has required custom fields Topic and title
      // (used by its "Event name in calendar" template: {Topic} with
      // {Organiser} and {Scheduler}). The booking form's "what do you want
      // to talk about" textarea supplies this — reuse it for both, falling
      // back to a generic label if left blank.
      bookingFieldsResponses: {
        Topic: input.notes || 'Quick chat',
        title: input.notes || 'Quick chat',
        ...(input.notes ? { notes: input.notes } : {}),
      },
    }),
  });
  return json.data;
}
