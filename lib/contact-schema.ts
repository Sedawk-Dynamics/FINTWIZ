import { z } from "zod";

/**
 * Shared by the client form and the route handler, so the browser and the
 * server can never disagree about what a valid enquiry looks like.
 */

export const corpusBands = [
  "Below ₹50 lakh",
  "₹50 lakh to ₹1 crore",
  "₹1 crore to ₹5 crore",
  "Above ₹5 crore",
  "Prefer not to say",
] as const;

export const enquiryTypes = [
  "Understanding PMS",
  "Request a manager shortlist",
  "Existing PMS account",
  "Grievance or complaint",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is longer than we can store."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .email("That does not look like a valid email address.")
    .max(160),
  phone: z
    .string()
    .trim()
    .max(20, "That phone number is too long.")
    .regex(
      /^$|^[+\d][\d\s-]{6,19}$/,
      "Use digits, spaces or hyphens, with an optional leading plus.",
    )
    .optional()
    .or(z.literal("")),
  enquiryType: z.enum(enquiryTypes, {
    message: "Please choose what this is about.",
  }),
  corpus: z.enum(corpusBands, {
    message: "Please choose a range, or select prefer not to say.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two of context helps us reply usefully.")
    .max(2000, "Please keep this under 2000 characters."),
  consent: z.literal(true, {
    message: "We need your consent to store and reply to this enquiry.",
  }),
  /**
   * Honeypot. Hidden from people, so a human always submits it empty.
   *
   * Deliberately permissive: if the schema rejected a filled value, a bot would
   * get a validation error naming this field and would simply stop filling it.
   * Instead it validates, and the route handler accepts the submission with a
   * cheerful response while delivering nothing.
   */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse = {
  ok: boolean;
  /** False when the server accepted the enquiry but could not email it on. */
  delivered?: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};
