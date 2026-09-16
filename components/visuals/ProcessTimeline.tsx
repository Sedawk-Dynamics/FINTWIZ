"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { processSteps } from "@/lib/site";

/**
 * The engagement, start to finish.
 *
 * The rail fills in step with the reader's progress through the section. That
 * is the only scroll-linked effect on the site, and it is here because it
 * carries meaning (how far through the process you are) rather than decoration.
 * Nothing is pinned and nothing is hijacked: the page scrolls normally.
 *
 * The fill and the marker highlights are always rendered, so the markup matches
 * the server, and are hidden by CSS for reduced-motion visitors.
 */
export function ProcessTimeline() {
  const ref = React.useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <ol ref={ref} className="relative mt-14">
      {/* Rail track */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-border md:left-[1.6875rem]"
      />
      {/* Rail fill */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-azure-bright motion-reduce:hidden md:left-[1.6875rem]"
      />

      {processSteps.map((step, index) => (
        <Step key={step.step} step={step} index={index} />
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "start 52%"],
  });
  // The marker fills as its own step reaches the reading position.
  const markerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <li ref={ref} className="relative flex gap-6 pb-12 last:pb-0 md:gap-9">
      <div className="relative z-10 shrink-0">
        <span className="relative flex size-10 items-center justify-center rounded-md border border-border bg-background font-mono text-[0.78rem] text-slate tnum md:size-14 md:text-[0.9rem]">
          <motion.span
            aria-hidden="true"
            style={{ opacity: markerOpacity }}
            className="absolute inset-0 rounded-md border border-azure-bright bg-azure-soft motion-reduce:hidden"
          />
          <span className="relative text-ink">{step.step}</span>
        </span>
      </div>

      <div className="pt-1.5 md:pt-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-[1.15rem] text-ink md:text-[1.3rem]">
            {step.title}
          </h3>
          <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.66rem] tracking-[0.06em] text-slate tnum">
            {step.duration}
          </span>
        </div>
        <p className="mt-3 text-[0.95rem] leading-[1.74] text-slate">
          {step.body}
        </p>
        {index === 1 ? (
          <p className="mt-4 border-l-2 border-gold/50 pl-4 text-[0.85rem] leading-[1.7] text-slate-light">
            The written reasoning for every exclusion is part of the shortlist,
            not something you have to ask for.
          </p>
        ) : null}
      </div>
    </li>
  );
}
