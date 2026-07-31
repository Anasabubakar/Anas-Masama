'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SubmitButton({ className, label = 'Send message' }: { className?: string; label?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={cn('w-full', className)}>
      {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Sending...' : label}
    </Button>
  );
}
