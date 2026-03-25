'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SafeHireMeDialog } from './SafeHireMeDialog';

export function HireMeButton() {
  return (
    <SafeHireMeDialog>
      <Button size="lg">
        Like what you see? Hire Me
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </SafeHireMeDialog>
  );
}
