"use client";

import { motion } from "motion/react";
import { ArrowDown, Check, MessageSquareQuote, X } from "lucide-react";
import { processSteps, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Right-hand panels for the closing call-to-action band.
 *
 * Each one says something the copy beside it only asserts, so the band is not
 * a headline floating in empty space. All three sit on the dark field, use the
 * `data-reveal` convention so they survive without JavaScript, and carry no
 * manager names: the shortlist panel is explicitly a sample.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function Panel({
  title,
  tag,
  footer,
  children,
  className,
}: {
  title: string;
  tag?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-field-border bg-field/75 shadow-lift backdrop-blur-[2px]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-4 border-b border-field-border px-5 py-4">
        <p className="text-[0.875rem] font-medium text-field-foreground">
          {title}
        </p>
        {tag ? (
          <span className="rounded-sm border border-field-border px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.14em] text-field-muted uppercase">
            {tag}
          </span>
        ) : null}
      </header>
      <div className="px-5 py-5">{children}</div>
      {footer ? (
        <footer className="border-t border-field-border px-5 py-3.5 text-[0.78rem] leading-relaxed text-field-muted">
          {footer}
        </footer>
      ) : null}
    </div>
  );
}

/** The five stages of an engagement, as a compact connected list. */
export function ProcessGlance({ className }: { className?: string }) {
  return (
    <Panel
      className={className}
      title="The engagement at a glance"
      tag={`${processSteps.length} stages`}
      footer="Stage one costs nothing and commits you to nothing."
    >
      <ol>
        {processSteps.map((step, index) => {
          const first = index === 0;
          const last = index === processSteps.length - 1;
          return (
            <motion.li
              key={step.step}
              data-reveal=""
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: 0.1 * index, ease: EASE }}
              className="relative flex gap-4 pb-4 last:pb-0"
            >
              {/* Connector to the next stage: from this marker's centre to the next one's. */}
              {!last ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-3 -bottom-3 left-3 w-px -translate-x-1/2",
                    first ? "bg-azure-logo/70" : "bg-field-border",
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.62rem] tnum",
                  first
                    ? "border-azure-logo bg-azure-logo text-ink-deep"
                    : "border-field-border bg-field text-field-muted",
                )}
              >
                {step.step}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[0.875rem] leading-snug text-field-foreground">
                  {step.title}
                </p>
                <p className="mt-1 font-mono text-[0.66rem] tracking-[0.08em] text-field-muted uppercase">
                  {step.duration}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Panel>
  );
}

const SAMPLE_ROSTER = [
  { serial: "PM 001", kept: true, reason: null },
  { serial: "PM 002", kept: false, reason: "Too concentrated" },
  { serial: "PM 003", kept: true, reason: null },
  { serial: "PM 004", kept: false, reason: "Wrong cap range" },
  { serial: "PM 005", kept: true, reason: null },
] as const;

const CRITERIA = ["Cap exposure", "Construction", "Volatility"] as const;

/**
 * Both rows of the funnel share one column count so PM 001 always sits above
 * PM 001. The count is driven by how wide the panel actually is, not by the
 * viewport alone: this panel is full width on a phone but a narrow aside from
 * lg, and it widens again at xl. Five columns in the lg aside leaves the word
 * "concentrated" wider than the cell it sits in.
 */
const FUNNEL_GRID =
  "mt-3 grid gap-2 grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5";

/** A roster narrowed to a shortlist, with the exclusions shown. */
export function ShortlistFunnel({ className }: { className?: string }) {
  return (
    <Panel
      className={className}
      title="How a shortlist is built"
      tag="Sample"
      footer="Every manager left out comes with a written reason. Serial numbers only: this is an illustration, not a recommendation."
    >
      <p className="font-mono text-[0.66rem] tracking-[0.12em] text-field-muted uppercase">
        The roster
      </p>
      <ul className={FUNNEL_GRID}>
        {SAMPLE_ROSTER.map((pm) => (
          <li
            key={pm.serial}
            className="rounded-sm border border-field-border px-2 py-2 text-center font-mono text-[0.72rem] text-field-foreground tnum"
          >
            {pm.serial}
          </li>
        ))}
      </ul>

      <div className="my-4 flex items-center gap-3">
        <ArrowDown
          aria-hidden="true"
          className="size-4 shrink-0 text-gold-bright"
        />
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 rounded-sm border border-gold-bright/35 bg-gold-bright/[0.06] px-3 py-2">
          <span className="mr-1 font-mono text-[0.64rem] tracking-[0.12em] text-gold-bright uppercase">
            Your mandate
          </span>
          {CRITERIA.map((c) => (
            <span
              key={c}
              className="rounded-sm bg-white/[0.06] px-1.5 py-0.5 text-[0.7rem] text-field-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <p className="font-mono text-[0.66rem] tracking-[0.12em] text-field-muted uppercase">
        Your shortlist
      </p>
      <ul className={FUNNEL_GRID}>
        {SAMPLE_ROSTER.map((pm, index) => (
          <motion.li
            key={pm.serial}
            data-reveal=""
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.45,
              delay: 0.25 + 0.12 * index,
              ease: EASE,
            }}
            className={cn(
              "flex flex-col items-center gap-1 rounded-sm border px-2 py-2 text-center",
              pm.kept
                ? "border-azure-logo/70 bg-azure-logo/10"
                : "border-dashed border-field-border",
            )}
          >
            <span
              className={cn(
                "flex items-center gap-1 font-mono text-[0.72rem] tnum",
                pm.kept
                  ? "text-field-foreground"
                  : "text-field-muted line-through decoration-field-border",
              )}
            >
              {pm.kept ? (
                <Check aria-hidden="true" className="size-3 text-azure-logo" />
              ) : (
                <X aria-hidden="true" className="size-3 text-field-muted" />
              )}
              {pm.serial}
            </span>
            <span
              className={cn(
                "text-[0.66rem] leading-tight",
                pm.kept ? "text-azure-logo" : "text-field-muted",
              )}
            >
              {pm.kept ? "Shortlisted" : pm.reason}
            </span>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}

const QUESTIONS = [
  "Which manager on my shortlist pays you the most?",
  "Why was each manager you left out excluded?",
  "Will you put the commission band in writing before I sign?",
] as const;

/** Questions any investor should put to any distributor. */
export function QuestionsCard({ className }: { className?: string }) {
  return (
    <Panel
      className={className}
      title="Three questions to ask any distributor"
      footer={`${site.brand} answers all three in writing, before you sign anything.`}
    >
      <ol className="space-y-3">
        {QUESTIONS.map((q, index) => (
          <motion.li
            key={q}
            data-reveal=""
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.45, delay: 0.12 * index, ease: EASE }}
            className="flex gap-3 rounded-sm border border-field-border bg-white/[0.03] px-4 py-3"
          >
            <MessageSquareQuote
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-gold-bright"
            />
            <p className="text-[0.875rem] leading-snug text-field-foreground">
              {q}
            </p>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}
