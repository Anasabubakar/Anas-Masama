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

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  note: z.string().optional(),
  dateLabel: z.string().min(1),
  time: z.string().min(1),
});

export type BookingState = {
  message: string | null;
  success: boolean;
};

export async function submitBookingRequest(
  input: { name: string; email: string; note?: string; dateLabel: string; time: string }
): Promise<BookingState> {
  const validated = bookingSchema.safeParse(input);

  if (!validated.success) {
    return { message: 'Please fill in your name and a valid email.', success: false };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable. Booking email not sent.');
    return { message: 'Booking service is not configured. Please email me directly.', success: false };
  }

  const { name, email, note, dateLabel, time } = validated.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Portfolio Booking <onboarding@resend.dev>',
      to: 'anasabubakar7000@gmail.com',
      reply_to: email,
      subject: `Booking request: ${name} — ${dateLabel} at ${time}`,
      html: `<p><strong>${name}</strong> (${email}) requested a call.</p>
        <p><strong>When:</strong> ${dateLabel} at ${time}</p>
        ${note ? `<p><strong>Note:</strong><br/>${note}</p>` : ''}
        <p>This slot is not auto-confirmed — reply to ${email} to lock it in.</p>`,
    });

    return { message: 'Request sent. I\'ll confirm by email shortly.', success: true };
  } catch (error) {
    console.error('Booking email sending error:', error);
    return { message: 'Something went wrong sending your request. Please try again or email me directly.', success: false };
  }
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const organization = (formData.get('organization') as string | null) ?? undefined;
  const role = (formData.get('role') as string | null) ?? undefined;
  const budget = (formData.get('budget') as string | null) ?? undefined;
  const timeRange = (formData.get('timeRange') as string | null) ?? undefined;

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

  // Ensure we have an API key before attempting to construct the client.
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable. Email not sent.');
    return {
      message: 'Email service is not configured. Please contact the site owner directly.',
      success: false,
    };
  }

  let resend: Resend;
  try {
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch (err) {
    console.error('Failed to initialize Resend client:', err);
    return {
      message: 'Email service initialization failed. Please try again later.',
      success: false,
    };
  }

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
