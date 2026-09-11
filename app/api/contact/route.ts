import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, type ContactResponse } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * Contact enquiries.
 *
 * Delivery is by SMTP when the environment is configured (see .env.example).
 * When it is not, the enquiry is logged rather than silently dropped and the
 * response says it was not emailed, so the UI can show the direct address
 * instead of pretending the message arrived.
 */

export const runtime = "nodejs";

/** Small in-memory rate limit. Enough to stop casual abuse of a contact form. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO,
  );
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many enquiries from this address. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not read that submission." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Accept silently so it does
  // not learn anything from the response, but deliver nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, delivered: true, message: "Thank you." });
  }

  const isGrievance = data.enquiryType === "Grievance or complaint";
  const to = isGrievance
    ? (process.env.CONTACT_GRIEVANCE_TO ?? process.env.CONTACT_TO)
    : process.env.CONTACT_TO;

  const subject = `${isGrievance ? "GRIEVANCE" : "Enquiry"}: ${data.enquiryType} from ${data.name}`;
  const lines = [
    `Name:          ${data.name}`,
    `Email:         ${data.email}`,
    `Phone:         ${data.phone || "not provided"}`,
    `Enquiry type:  ${data.enquiryType}`,
    `Corpus band:   ${data.corpus}`,
    `Consent given: yes`,
    `Received:      ${new Date().toISOString()}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  if (!smtpConfigured()) {
    console.warn(
      `[contact] SMTP is not configured, so this enquiry was not emailed.\n${lines}`,
    );
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Your enquiry was received but our mail system is not connected yet.",
    });
  }

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transport.sendMail({
      from: process.env.SMTP_FROM ?? `${site.brand} <${process.env.SMTP_USER}>`,
      to,
      replyTo: `${data.name} <${data.email}>`,
      subject,
      text: lines,
    });

    return NextResponse.json({
      ok: true,
      delivered: true,
      message: isGrievance
        ? "Your grievance has been logged and will be acknowledged within 24 hours."
        : "Thank you. We will reply within one working day.",
    });
  } catch (error) {
    console.error("[contact] SMTP delivery failed", error);
    console.warn(`[contact] Undelivered enquiry:\n${lines}`);
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        message: "Your enquiry was received but could not be emailed on.",
      },
      { status: 200 },
    );
  }
}
