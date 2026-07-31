'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ButlerMessage = { role: 'user' | 'assistant'; content: string };

const INITIAL_MESSAGES: ButlerMessage[] = [
  {
    role: 'assistant',
    content: "Hi, I'm Anas's Butler. Ask me anything about his work, skills, or how to book time with him.",
  },
];

export function Butler() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ButlerMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendButler = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const history = [...messages, { role: 'user' as const, content: text }];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/butler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || "Sorry, I couldn't reach my brain just now. Try again in a moment." }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: "Sorry, I couldn't reach my brain just now. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3.5">
      {open && (
        <div
          role="dialog"
          aria-label="Ask my Butler chat"
          className="flex h-[min(460px,70vh)] w-[min(340px,88vw)] flex-col overflow-hidden rounded-[20px] border border-[#f3f2ee]/[0.14] bg-[#0c0c0c]"
          style={{ animation: 'drawerIn 0.3s ease both' }}
        >
          <div className="flex items-center justify-between border-b border-[#f3f2ee]/10 px-[18px] py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#34c97e] text-[13px] font-extrabold text-[#060606]">
                B
              </div>
              <div>
                <p className="m-0 text-sm font-bold text-[#f3f2ee]">Butler</p>
                <p className="m-0 text-[11px] text-[#f3f2ee]/40">Ask about Anas</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded border-none bg-transparent text-lg text-[#f3f2ee]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
              aria-label="Close Butler"
            >
              ×
            </button>
          </div>
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-[18px] py-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={[
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.5]',
                  msg.role === 'user'
                    ? 'self-end rounded-br-[2px] bg-[#f3f2ee] text-[#060606]'
                    : 'self-start rounded-bl-[2px] bg-[#f3f2ee]/[0.06] text-[#f3f2ee]',
                ].join(' ')}
                style={{ animation: 'msgIn 0.3s ease both' }}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div
                className="self-start text-[13px] text-[#f3f2ee]/40"
                style={{ animation: 'pulseDot 1.2s ease infinite' }}
              >
                Butler is typing…
              </div>
            )}
          </div>
          <div className="flex gap-2 border-t border-[#f3f2ee]/10 p-3.5">
            <input
              placeholder="Ask a question…"
              aria-label="Ask Butler a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendButler();
              }}
              className="flex-1 rounded-full border border-[#f3f2ee]/15 bg-[#f3f2ee]/5 px-3.5 py-[11px] text-[13px] text-[#f3f2ee] outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e]"
            />
            <button
              type="button"
              onClick={sendButler}
              aria-label="Send"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#f3f2ee] font-extrabold text-[#060606] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]"
            >
              →
            </button>
          </div>
        </div>
      )}
      <span className="prismatic-wrapper">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full bg-[#f3f2ee] px-[22px] py-3.5 text-sm font-bold text-[#060606] transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
        >
          Ask my Butler
        </button>
      </span>
    </div>,
    document.body
  );
}
