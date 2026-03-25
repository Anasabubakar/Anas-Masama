'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/SubmitButton';

export function HireMeDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: "Thank you for your inquiry! I'm excited about the possibility of working together and will be in touch shortly.",
      });
      formRef.current?.reset();
      setOpen(false);
    } else if (state.message && !state.success && Object.keys(state.errors ?? {}).length === 0) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-transparent border-0 p-0 max-h-[90vh] overflow-hidden">
        <div className="relative glass-card rounded-[2rem] px-6 py-8 md:px-8 md:py-10 overflow-hidden flex flex-col max-h-[90vh]">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <DialogHeader className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
              Start a Project
            </div>
            <DialogTitle className="text-3xl md:text-4xl font-black tracking-tight">
              Let&apos;s build something exceptional
            </DialogTitle>
            <DialogDescription className="text-white/70 text-base">
              Share the essentials and I&apos;ll respond quickly with a clear next step.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Avg response &lt; 2 hours</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Global clients</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">High-impact builds</span>
          </div>

          <form ref={formRef} action={dispatch} className="space-y-4 pt-8 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hire-name">Name</Label>
                <Input id="hire-name" name="name" placeholder="Your Name" />
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire-organization">Organization</Label>
                <Input id="hire-organization" name="organization" placeholder="Your Organization" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hire-email">Email</Label>
              <Input id="hire-email" name="email" type="email" placeholder="your@email.com" />
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hire-role">Role</Label>
                <Input id="hire-role" name="role" placeholder="e.g., Product Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hire-budget">Budget (USD)</Label>
                <Input id="hire-budget" name="budget" placeholder="e.g., $5,000 - $10,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hire-time-range">Time Range</Label>
              <Input id="hire-time-range" name="timeRange" placeholder="e.g., 3-6 months" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hire-message">Tell me about your project</Label>
              <Textarea id="hire-message" name="message" placeholder="Goals, scope, timeline, success criteria..." />
              {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
            </div>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <SubmitButton />
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
