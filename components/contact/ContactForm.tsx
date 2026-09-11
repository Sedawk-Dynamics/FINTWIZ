"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  corpusBands,
  enquiryTypes,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ContactInput, string>>;
type Status = "idle" | "submitting" | "sent" | "logged" | "error";

const FIELD_CLASS = cn(
  "w-full rounded-md border border-input bg-card px-3.5 py-2.5",
  "text-[0.9375rem] text-ink placeholder:text-slate-light",
  "transition-colors duration-200",
  "focus:border-ring focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
  "aria-[invalid=true]:border-destructive",
);

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const [serverMessage, setServerMessage] = React.useState("");
  const summaryRef = React.useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));

    const candidate = {
      ...raw,
      consent: raw.consent === "on",
    };

    const parsed = contactSchema.safeParse(candidate);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setServerMessage("");
      summaryRef.current?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as ContactResponse;

      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setServerMessage(result.message);
        setStatus("error");
        summaryRef.current?.focus();
        return;
      }

      setServerMessage(result.message);
      setStatus(result.delivered === false ? "logged" : "sent");
      form.reset();
    } catch {
      setServerMessage(
        "We could not reach the server. Please email us directly instead.",
      );
      setStatus("error");
      summaryRef.current?.focus();
    }
  }

  if (status === "sent" || status === "logged") {
    return (
      <div className="rounded-md border border-teal-bright/40 bg-card p-8 md:p-10">
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-md border border-teal-bright/50 text-teal-bright"
        >
          <CheckCircle2 className="size-5" />
        </span>
        <h3 className="mt-6 text-[1.3rem] text-ink">Enquiry received</h3>
        <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-[1.72] text-slate">
          {serverMessage}
        </p>

        {status === "logged" ? (
          <p className="mt-5 max-w-[52ch] rounded-md border border-border bg-muted/70 p-4 text-[0.85rem] leading-[1.68] text-slate">
            Our mail system is not connected yet, so please also write to{" "}
            <a
              href={`mailto:${site.contact.general}`}
              className="link-underline font-medium text-teal-bright"
            >
              {site.contact.general}
            </a>{" "}
            so nothing is missed.
          </p>
        ) : null}

        <Button
          variant="outline"
          className="mt-7"
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || status === "error";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-md border border-border bg-card p-6 md:p-8"
    >
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={cn("scroll-mt-28", hasErrors ? "mb-6" : "sr-only")}
      >
        {hasErrors ? (
          <div className="flex gap-3 rounded-md border border-destructive/45 bg-destructive/[0.06] p-4">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-destructive"
            />
            <p className="text-[0.85rem] leading-[1.65] text-ink">
              {serverMessage || "Please check the highlighted fields below."}
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={FIELD_CLASS}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={FIELD_CLASS}
          />
        </Field>

        <Field
          id="phone"
          label="Phone"
          optional
          error={errors.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={FIELD_CLASS}
          />
        </Field>

        <Field id="enquiryType" label="What is this about" error={errors.enquiryType}>
          <select
            id="enquiryType"
            name="enquiryType"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.enquiryType)}
            aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
            className={FIELD_CLASS}
          >
            <option value="" disabled>
              Please choose
            </option>
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="corpus"
            label="Approximate amount you are considering"
            error={errors.corpus}
            hint={`PMS has a statutory minimum of ${site.pmsMinimum.display}. This helps us tell you straight away whether it is the right instrument.`}
          >
            <select
              id="corpus"
              name="corpus"
              defaultValue=""
              required
              aria-invalid={Boolean(errors.corpus)}
              aria-describedby={cn(
                "corpus-hint",
                errors.corpus ? "corpus-error" : "",
              )}
              className={FIELD_CLASS}
            >
              <option value="" disabled>
                Please choose
              </option>
              {corpusBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="message" label="How can we help" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(FIELD_CLASS, "resize-y")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            className="mt-1 size-4 shrink-0 rounded-[2px] border-input accent-teal-bright"
          />
          <span className="text-[0.85rem] leading-[1.65] text-slate">
            I consent to {site.brand} storing these details in order to respond
            to my enquiry, as described in the{" "}
            <a href="/privacy-policy" className="link-underline font-medium text-teal-bright">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2 text-[0.8rem] text-destructive">{errors.consent}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-8 w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Send enquiry
          </>
        )}
      </Button>

      <p className="mt-5 text-[0.78rem] leading-[1.65] text-slate-light">
        {site.contact.responseWindow} This form is for enquiries about PMS
        distribution. We do not provide advice on individual securities.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.82rem] font-medium text-ink"
      >
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-slate-light">optional</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.78rem] leading-[1.6] text-slate-light">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.8rem] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
