"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The core positioning of the business, drawn rather than asserted.
 *
 * Two routes leave the investor. The upper route (shortlist, disclosures,
 * onboarding) passes through Fintwiz Wealth. The lower route (capital and
 * securities) goes straight to the portfolio manager and never touches us.
 * That distinction is the whole regulatory point of a distributor, so it is
 * worth a diagram rather than a paragraph.
 */

const ADVICE_IN = "M 176,150 C 234,112 262,82 304,82";
const ADVICE_OUT = "M 476,82 C 518,82 548,112 584,150";
const CAPITAL = "M 176,206 C 302,278 458,278 584,206";

export function RoutingDiagram({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const draw = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox="0 0 760 330"
        className="w-full"
        role="img"
        aria-labelledby="routing-title routing-desc"
      >
        <title id="routing-title">
          How a Fintwiz Wealth relationship is structured
        </title>
        <desc id="routing-desc">
          Two routes lead from the investor to the portfolio manager. The
          shortlist, disclosures and onboarding support pass through Fintwiz
          Wealth. The investor&apos;s capital and securities pass directly to the
          portfolio manager and never through Fintwiz Wealth.
        </desc>

        <defs>
          <marker
            id="arrow-brass"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--brass)" />
          </marker>
          <marker
            id="arrow-teal"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--teal-bright)" />
          </marker>
        </defs>

        {/* Upper route: information, through us */}
        <motion.path
          data-reveal=""
          d={ADVICE_IN}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-brass)"
          {...draw(0.1)}
        />
        <motion.path
          data-reveal=""
          d={ADVICE_OUT}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-brass)"
          {...draw(0.35)}
        />

        {/* Lower route: capital, direct */}
        <motion.path
          data-reveal=""
          d={CAPITAL}
          fill="none"
          stroke="var(--teal-bright)"
          strokeWidth="2"
          markerEnd="url(#arrow-teal)"
          {...draw(0.55)}
        />

        {!reduced ? (
          <circle r="4" fill="var(--teal-bright)">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={CAPITAL} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
        ) : null}

        <Node
          x={24}
          y={132}
          width={152}
          height={92}
          kicker="Step one"
          title="You"
          sub="Mandate and risk profile"
          tone="neutral"
        />

        <Node
          x={304}
          y={40}
          width={172}
          height={84}
          kicker={site.registration.number}
          title={site.brand}
          sub="Distributor"
          tone="brass"
        />

        <Node
          x={584}
          y={132}
          width={152}
          height={92}
          kicker="SEBI registered"
          title="Portfolio Manager"
          sub="Holds and manages"
          tone="teal"
        />

        {/* Route labels */}
        <text
          x={390}
          y={148}
          textAnchor="middle"
          className="fill-brass-deep font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          Shortlist, disclosures, onboarding
        </text>
        <text
          x={380}
          y={296}
          textAnchor="middle"
          className="fill-teal-bright font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          Your capital and securities, direct
        </text>
      </svg>

      <figcaption className="mt-5 text-[0.8125rem] leading-relaxed text-slate">
        The shortlist and the paperwork run through us. Your money does not. The
        account is opened in your name and the securities are held in your own
        demat account by the portfolio manager you appoint.
      </figcaption>
    </figure>
  );
}

function Node({
  x,
  y,
  width,
  height,
  kicker,
  title,
  sub,
  tone,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  kicker: string;
  title: string;
  sub: string;
  tone: "neutral" | "brass" | "teal";
}) {
  const stroke =
    tone === "brass"
      ? "var(--brass)"
      : tone === "teal"
        ? "var(--teal-bright)"
        : "var(--border-strong)";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="3"
        fill="var(--card)"
        stroke={stroke}
        strokeWidth="1.25"
      />
      <text
        x={x + 16}
        y={y + 26}
        className="fill-slate font-mono text-[9px] tracking-[0.12em] uppercase"
      >
        {kicker}
      </text>
      <text
        x={x + 16}
        y={y + 52}
        className="fill-ink font-display text-[16px] font-medium"
      >
        {title}
      </text>
      <text x={x + 16} y={y + 72} className="fill-slate text-[11px]">
        {sub}
      </text>
    </g>
  );
}
