'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-[525px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Start a Project</DialogTitle>
          <DialogDescription>
            Tell me about your project, and I'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch} className="space-y-4 pt-4">
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
              <Input id="hire-role" name="role" placeholder="e.g., Project Manager" />
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
            <Textarea id="hire-message" name="message" placeholder="Your project details..." />
            {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
