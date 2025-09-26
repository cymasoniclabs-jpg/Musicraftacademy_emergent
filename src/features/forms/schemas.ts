import { z } from "zod";

// Phone validation patterns
export const phoneIN = z.string().refine(val => {
  const cleanVal = val.trim().replace(/\s+/g, ''); // Remove all whitespace
  return /^[6-9]\d{9}$/.test(cleanVal);
}, "Invalid Indian mobile number");

export const phoneE164 = z.string().refine(val => {
  const cleanVal = val.trim().replace(/\s+/g, ''); // Remove all whitespace
  return /^\+[1-9]\d{1,14}$/.test(cleanVal);
}, "Invalid international phone number");

export const phoneUnion = z.union([phoneIN, phoneE164], {
  errorMap: () => ({ message: "Please enter a valid phone number (10-digit India mobile or +country format)" })
});

export const ContactSchema = z.object({
  fullName: z.string().min(5, "Enter full name"),
  email: z.string().email("Invalid email"),
  phone: phoneUnion,
  service: z.enum(["enquiry","trial","counselling","enrol","other"]),
  message: z.string().min(20, "Please add a brief (20+ chars)"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent required" }) }),
  utm: z.record(z.string()).optional(),
  honeypot: z.string().max(0, "Honeypot field should be empty").optional()
});

export const EnrolSchema = z.object({
  fullName: z.string()
    .min(1, 'Student name is required')
    .refine(val => val.trim().split(' ').length >= 2, 'Please enter full name (minimum 2 words)'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: phoneUnion,
  age: z.number()
    .min(5, 'Age must be at least 5')
    .max(99, 'Age must be less than 100'),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true; // Optional field
      const cleanVal = val.trim().replace(/\s+/g, '');
      const indiaPattern = /^[6-9]\d{9}$/;
      const e164Pattern = /^\+[1-9]\d{1,14}$/;
      return indiaPattern.test(cleanVal) || e164Pattern.test(cleanVal);
    }, 'Please enter a valid phone number (10-digit India mobile or +country format)'),
  programLevel: z.enum(["Beginner","Early-Intermediate","Intermediate","Advanced","MAX"], {
    required_error: 'Please select a program'
  }),
  intent: z.enum(["Enrol","Trial","Counselling"], {
    required_error: 'Please select your intent'
  }),
  accessibility: z.string().optional(),
  goals: z.string().min(20, 'Please provide at least 20 characters describing your goals'),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to be contacted and consent to the Privacy Policy" }) }),
  utm: z.record(z.string()).optional(),
  honeypot: z.string().max(0, "Honeypot field should be empty").optional()
}).refine(data => {
  // Guardian info required if age < 18
  if (data.age < 18) {
    return data.guardianName && data.guardianName.trim().length > 0 && 
           data.guardianPhone && data.guardianPhone.trim().length > 0;
  }
  return true;
}, {
  message: 'Guardian name and phone are required for students under 18',
  path: ['guardianName']
});

export type ContactFormData = z.infer<typeof ContactSchema>;
export type EnrolFormData = z.infer<typeof EnrolSchema>;