'use client';

import React, { useEffect, useState } from 'react';

export function SafeHireMeDialog({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const el = document.getElementById('hire');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return <>{children}</>;

  if (React.isValidElement(children)) {
    const existingOnClick = (children.props as { onClick?: (e: React.MouseEvent) => void }).onClick;
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        existingOnClick?.(e);
        handleScroll(e);
      },
    });
  }

  return (
    <span onClick={handleScroll} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleScroll()}>
      {children}
    </span>
  );
}
