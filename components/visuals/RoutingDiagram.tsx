"use client";

import type * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { StackedFlow } from "./StackedFlow";

/**
 * The core positioning of the business, drawn rather than asserted.
 *
 * Two routes leave the investor. The upper route (shortlist, disclosures,
 * onboarding) passes through Fintwiz Wealth. The lower route (capital and
 * securities) goes straight to the portfolio manager and never touches us.
 *
 * GEOMETRY
 * --------
 * Node widths are set from the rendered width of their longest line plus at
 * least 16 units of padding each side. "Portfolio Manager" at 16 units of
 * Fraunces measures about 140, so its node is 180 wide. The SVG is only shown
 * from the lg breakpoint, where it renders at or above its native 800 wide; below
 * that it is replaced by `StackedFlow`, because a scaled SVG takes its labels
 * under 8px.
 */

const NODE = {
  you: { x: 16, y: 132, w: 180, h: 92 },
  fintwiz: { x: 300, y: 40, w: 200, h: 84 },
  manager: { x: 604, y: 132, w: 180, h: 92 },
} as const;

const YOU_RIGHT = NODE.you.x + NODE.you.w; // 196
const FW_LEFT = NODE.fintwiz.x; // 300
const FW_RIGHT = NODE.fintwiz.x + NODE.fintwiz.w; // 500
const MGR_LEFT = NODE.manager.x; // 604
const FW_MID_Y = NODE.fintwiz.y + NODE.fintwiz.h / 2; // 82

const ADVICE_IN = `M ${YOU_RIGHT + 2},150 C ${YOU_RIGHT + 54},112 ${FW_LEFT - 34},${FW_MID_Y} ${FW_LEFT - 2},${FW_MID_Y}`;
const ADVICE_OUT = `M ${FW_RIGHT + 2},${FW_MID_Y} C ${FW_RIGHT + 34},${FW_MID_Y} ${MGR_LEFT - 54},112 ${MGR_LEFT - 2},150`;
const CAPITAL = `M ${YOU_RIGHT + 2},206 C 330,282 470,282 ${MGR_LEFT - 2},206`;

const CENTRE_X = FW_LEFT + NODE.fintwiz.w / 2; // 400

export function RoutingDiagram({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // Solid routes draw on. Dashed routes only fade in, because Motion's
  // pathLength animation rewrites stroke-dasharray and would turn a dashed
  // line solid, erasing the one visual difference between the two routes.
  // The animation targets are the same for every visitor, so the markup always
  // matches the server. Only the timing depends on reduced motion, and timing
  // is never rendered into the page.
  const draw = (delay: number, dashed = false) => ({
    initial: dashed ? { opacity: 0 } : { pathLength: 0, opacity: 0 },
    whileInView: dashed ? { opacity: 1 } : { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: {
      duration: reduced ? 0 : 0.9,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <figure className={cn("w-full", className)}>
      <StackedFlow
        className="lg:hidden"
        nodes={[
          {
            kicker: "Step one",
            title: "You",
            sub: "Mandate and risk profile",
            tone: "neutral",
          },
          {
            kicker: site.registration.number,
            title: site.brand,
            sub: "Distributor",
            tone: "gold",
          },
          {
            kicker: "SEBI registered",
            title: "Portfolio Manager",
            sub: "Holds and manages",
            tone: "azure",
          },
        ]}
        connectors={[
          { label: "Shortlist and disclosures", tone: "gold", dashed: true },
          { label: "Onboarding support", tone: "gold", dashed: true },
        ]}
        rail={{
          label: "Your capital and securities go direct, never through us",
          tone: "azure",
          kind: "arrow",
        }}
      />

      <svg
        viewBox="0 0 800 330"
        className="hidden w-full lg:block"
        role="img"
        aria-labelledby="routing-title routing-desc"
      >
        <title id="routing-title">
          How a Fintwiz Wealth relationship is structured
        </title>
        <desc id="routing-desc">
          Two routes lead from the investor to the portfolio manager. The
          shortlist, disclosures and onboarding support pass through Fintwiz
          Wealth. The investor&apos;s capital and securities pass directly to
          the portfolio manager and never through Fintwiz Wealth.
        </desc>

        <defs>
          <marker
            id="arrow-gold"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--gold)" />
          </marker>
          <marker
            id="arrow-azure"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--azure-bright)" />
          </marker>
        </defs>

        {/* Upper route: information, through us */}
        <motion.path
          data-reveal=""
          data-dash=""
          style={{ "--dash": "5 5" } as React.CSSProperties}
          d={ADVICE_IN}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-gold)"
          {...draw(0.1, true)}
        />
        <motion.path
          data-reveal=""
          data-dash=""
          style={{ "--dash": "5 5" } as React.CSSProperties}
          d={ADVICE_OUT}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-gold)"
          {...draw(0.35, true)}
        />

        {/* Lower route: capital, direct */}
        <motion.path
          data-reveal=""
          d={CAPITAL}
          fill="none"
          stroke="var(--azure-bright)"
          strokeWidth="2"
          markerEnd="url(#arrow-azure)"
          {...draw(0.55)}
        />

        {/* Decorative pulse along the capital route. Always rendered so the
            markup matches the server; hidden by CSS for reduced motion. */}
        <circle
          r="4"
          fill="var(--azure-bright)"
          className="motion-reduce:hidden"
        >
          <animateMotion dur="4.5s" repeatCount="indefinite" path={CAPITAL} />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </circle>

        <Node
          {...NODE.you}
          kicker="Step one"
          title="You"
          sub="Mandate and risk profile"
          tone="neutral"
        />
        <Node
          {...NODE.fintwiz}
          kicker={site.registration.number}
          title={site.brand}
          sub="Distributor"
          tone="gold"
        />
        <Node
          {...NODE.manager}
          kicker="SEBI registered"
          title="Portfolio Manager"
          sub="Holds and manages"
          tone="azure"
        />

        {/* Route labels */}
        <text
          x={CENTRE_X}
          y={154}
          textAnchor="middle"
          className="fill-gold-deep font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          Shortlist, disclosures, onboarding
        </text>
        <text
          x={CENTRE_X}
          y={306}
          textAnchor="middle"
          className="fill-azure-bright font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          Your capital and securities, direct
        </text>
      </svg>

      <figcaption className="mt-6 text-[0.8125rem] leading-relaxed text-slate lg:mt-5">
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
  w,
  h,
  kicker,
  title,
  sub,
  tone,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  kicker: string;
  title: string;
  sub: string;
  tone: "neutral" | "gold" | "azure";
}) {
  const stroke =
    tone === "gold"
      ? "var(--gold)"
      : tone === "azure"
        ? "var(--azure-bright)"
        : "var(--border-strong)";

  // Text is inset 18 units on the left; widths above leave at least 18 on the
  // right for the longest line in each node.
  const inset = 18;
  const top = (h - 64) / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill="var(--card)"
        stroke={stroke}
        strokeWidth="1.25"
      />
      <text
        x={x + inset}
        y={y + top + 12}
        className="fill-slate font-mono text-[10px] tracking-[0.12em] uppercase"
      >
        {kicker}
      </text>
      <text
        x={x + inset}
        y={y + top + 38}
        className="fill-ink font-display text-[16px] font-medium"
      >
        {title}
      </text>
      <text x={x + inset} y={y + top + 58} className="fill-slate text-[12px]">
        {sub}
      </text>
    </g>
  );
}
