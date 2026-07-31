'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <nav className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-5 py-5 sm:px-8 lg:px-14">
      <Link href="/" className="prismatic-wrapper">
        <span className="flex items-center gap-2.5 rounded-full bg-[#060606] py-2 pl-2 pr-4 text-[15px] font-extrabold tracking-[0.02em] text-[#f3f2ee] whitespace-nowrap">
          <Image
            src="/images/logo-small.png"
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-[7px] object-cover"
          />
          Anas Masama
        </span>
      </Link>
    </nav>,
    document.body
  );
}
