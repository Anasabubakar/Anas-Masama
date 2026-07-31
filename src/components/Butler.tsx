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
