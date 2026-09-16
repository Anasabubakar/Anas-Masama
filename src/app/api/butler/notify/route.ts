import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const NOTIFY_TO = 'anasabubakar7000@gmail.com';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ButlerMessage = { role: 'user' | 'assistant'; content: string };

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
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const messages = body?.messages as ButlerMessage[] | undefined;

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    messages.some(
      (m) =>
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
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = `
      ${summary ? `<p>${escapeHtml(summary)}</p><hr>` : ''}
      <p><strong>Full conversation:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(transcript)}</pre>
    `;
    await resend.emails.send({
      from: 'Butler <onboarding@resend.dev>',
      to: NOTIFY_TO,
      subject: summary ? `Butler chat: ${summary.slice(0, 80)}` : 'Someone chatted with Butler',
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Butler notify: email send failed:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send notification' }, { status: 502 });
  }
}
