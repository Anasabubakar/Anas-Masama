'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  organization: z.string().optional(),
  role: z.string().optional(),
  budget: z.string().optional(),
  timeRange: z.string().optional(),
});

export type FormState = {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const organization = formData.get('organization') as string | undefined;
  const role = formData.get('role') as string | undefined;
  const budget = formData.get('budget') as string | undefined;
  const timeRange = formData.get('timeRange') as string | undefined;

  const validatedFields = contactSchema.safeParse({
    name,
    email,
    message,
    organization,
    role,
    budget,
    timeRange,
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const isHireMeForm = !!organization;

    const subject = isHireMeForm 
      ? `Project Inquiry from ${name}` 
      : `New message from ${name} on your portfolio`;

    let emailBody = `<p>You've received a new message from <strong>${name}</strong> (${email}).</p>`;
    emailBody += `<p><strong>Message:</strong><br/>${message}</p>`;

    if (isHireMeForm) {
      emailBody += `<hr>`;
      emailBody += `<h3>Project Details:</h3>`;
      emailBody += `<ul>`;
      if (organization) emailBody += `<li><strong>Organization:</strong> ${organization}</li>`;
      if (role) emailBody += `<li><strong>Role:</strong> ${role}</li>`;
      if (budget) emailBody += `<li><strong>Budget:</strong> ${budget}</li>`;
      if (timeRange) emailBody += `<li><strong>Time Range:</strong> ${timeRange}</li>`;
      emailBody += `</ul>`;
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'anasabubakar7000@gmail.com',
      subject: subject,
      html: emailBody,
    });

    return {
      message: 'Your message has been sent successfully!',
      success: true,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      message: 'An unexpected error occurred. Please try again later. If the problem persists, please check server logs.',
      success: false,
    };
  }
}
