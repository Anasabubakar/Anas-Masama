import { NextResponse } from 'next/server';
import { generateText } from 'ai';

export const runtime = 'nodejs';

const NOTIFY_TO = 'anasabubakar7000@gmail.com';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ButlerMessage = { role: 'user' | 'assistant'; content: string };

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const requestHost = req.headers.get('host');
    return !requestHost || originHost === requestHost;
  } catch {
    return false;
  }
}

// Fires once per conversation (on widget close or page hide), not per
// message — a much lower ceiling than the chat route's limiter is enough
// to stop abuse without ever throttling real use.
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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const conversationId = body?.conversationId as string | undefined;
  const rawMessages = body?.messages as ButlerMessage[] | undefined;

  if (
    typeof conversationId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      conversationId
    ) ||
    !Array.isArray(rawMessages) ||
    rawMessages.length === 0
  ) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const messages = rawMessages.slice(-MAX_MESSAGES);
  if (
    messages.some(
      (m) =>
        !m ||
        typeof m?.content !== 'string' ||
        m.content.length > MAX_MESSAGE_LENGTH ||
        (m.role !== 'user' && m.role !== 'assistant')
    )
  ) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  // No real exchange happened (e.g. widget opened and closed with only the
  // canned greeting) — nothing worth emailing about.
  if (!messages.some((m) => m.role === 'user')) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Butler'}: ${m.content}`)
    .join('\n');

  let summary = '';
  if (process.env.AI_GATEWAY_API_KEY) {
    try {
      const { text } = await generateText({
        model: 'anthropic/claude-haiku-4-5',
        system:
          'Summarize this chat between a portfolio visitor and Butler (an AI assistant answering on Anas\'s behalf) in 2-3 short sentences for Anas himself. Note what the visitor seemed to want and whether it needs Anas\'s follow-up. Plain text, no preamble.',
        prompt: transcript,
      });
      summary = text;
    } catch (err) {
      console.error('Butler notify: summary generation failed:', err);
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable. Butler notify email not sent.');
    return NextResponse.json({ ok: false, error: 'Email service not configured' }, { status: 503 });
  }

  try {
    const html = `
      ${summary ? `<p>${escapeHtml(summary)}</p><hr>` : ''}
      <p><strong>Full conversation:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(transcript)}</pre>
    `;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `butler-chat/${conversationId}`,
      },
      body: JSON.stringify({
        from: process.env.BUTLER_NOTIFY_FROM || 'Butler <onboarding@resend.dev>',
        to: [NOTIFY_TO],
        subject: summary ? `Butler chat: ${summary.slice(0, 80)}` : 'Someone chatted with Butler',
        html,
      }),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Butler notify: email send failed:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send notification' }, { status: 502 });
  }
}
