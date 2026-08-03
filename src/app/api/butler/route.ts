import { NextResponse } from 'next/server';
import { generateText } from 'ai';

export const runtime = 'nodejs';

const SYSTEM_PROMPT =
  "You are 'Butler', a warm, brief assistant on Anas Abubakar Masama's portfolio site. Anas is a Software Engineer and AI Developer based in Lagos, Nigeria, with 6 years of coding experience. He is the founder of TeenovateX Labs, a community helping young Africans learn to build software. His stack: Next.js, TypeScript, React, Node.js, Firebase, Genkit, Gemini, PostgreSQL, Prisma, Tailwind. Projects: TeenovateX (NGO/community platform), JackPal (turns study docs into audio for students), MonieFlow (student budgeting app), MarcediVault (web3 wallet front end), EduPeak (learning platform). Keep answers short, plain, human, no hype words. If asked about hiring or meeting him, point them to the booking calendar on this page. If you don't know something specific, say so honestly instead of making it up.";

const FALLBACK_REPLY = "Sorry, I couldn't reach my brain just now. Try again in a moment.";

type ButlerMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages?: ButlerMessage[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages is required' }, { status: 400 });
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  try {
    const { text } = await generateText({
      model: 'anthropic/claude-haiku-4-5',
      system: SYSTEM_PROMPT,
      messages,
    });
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('Butler completion error:', err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
