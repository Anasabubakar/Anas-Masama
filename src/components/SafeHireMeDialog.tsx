'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HireMeDialogContent = dynamic(
  () => import('./HireMeDialog').then((mod) => mod.HireMeDialog),
  { ssr: false }
);

export function SafeHireMeDialog({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <HireMeDialogContent>{children}</HireMeDialogContent>;
}
