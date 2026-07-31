'use client';

import { useState } from 'react';

type ButlerMessage = { role: 'user' | 'assistant'; content: string };

const INITIAL_MESSAGES: ButlerMessage[] = [
  {
    role: 'assistant',
    content: "Hi, I'm Anas's Butler. Ask me anything about his work, skills, or how to book time with him.",
  },
];

export function Butler() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ButlerMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3.5">
      {open && (
        <div
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
              className="border-none bg-transparent text-lg text-[#f3f2ee]/50"
              aria-label="Close Butler"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <span className="prismatic-wrapper">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full bg-[#f3f2ee] px-[22px] py-3.5 text-sm font-bold text-[#060606] transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.94]"
        >
          Ask my Butler
        </button>
      </span>
    </div>
  );
}
