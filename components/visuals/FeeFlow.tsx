"use client";

import type * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { StackedFlow } from "./StackedFlow";

/**
 * Where the money goes, and the one direction it never travels.
 *
 * You pay the portfolio manager. The portfolio manager pays us. The dashed arc
 * across the top, struck through, is the payment that does not exist: you are
 * never billed by Fintwiz Wealth for distribution.
 *
 * Same rules as RoutingDiagram: node widths leave at least 18 units either side
 * of the longest line, the SVG only renders from lg upwards, and below that the
 * content is shown as `StackedFlow` so no label is scaled below legibility.
 */

const NODE = {
  you: { x: 16, y: 110, w: 164 },
  manager: { x: 300, y: 110, w: 200 },
  fintwiz: { x: 620, y: 110, w: 164 },
} as const;
const NODE_H = 90;
const MID_Y = NODE.you.y + NODE_H / 2; // 155

const YOU_CX = NODE.you.x + NODE.you.w / 2; // 98
const FW_CX = NODE.fintwiz.x + NODE.fintwiz.w / 2; // 702
const ARC_TOP = 20;
const NO_FEE_ARC = `M ${YOU_CX},${NODE.you.y - 4} C 220,${ARC_TOP} 580,${ARC_TOP} ${FW_CX},${NODE.fintwiz.y - 4}`;
// Midpoint of that cubic, where the strike-through mark sits.
const ARC_MID = {
  x: (YOU_CX + 3 * 220 + 3 * 580 + FW_CX) / 8,
  y: (NODE.you.y - 4 + 6 * ARC_TOP + NODE.fintwiz.y - 4) / 8,
};

const FEES_FROM = NODE.you.x + NODE.you.w + 2;
const FEES_TO = NODE.manager.x - 2;
const COMMISSION_FROM = NODE.manager.x + NODE.manager.w + 2;
const COMMISSION_TO = NODE.fintwiz.x - 2;

export function FeeFlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // The animation targets are the same for every visitor, so the markup always
  // matches the server. Only the timing depends on reduced motion, and timing
  // is never rendered into the page.
  const draw = (delay: number, dashed = false) => ({
    initial: dashed ? { opacity: 0 } : { pathLength: 0, opacity: 0 },
    whileInView: dashed ? { opacity: 1 } : { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: {
      duration: reduced ? 0 : 0.8,
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
            kicker: "Investor",
            title: "You",
            sub: "Holds the account",
            tone: "neutral",
          },
          {
            kicker: "SEBI registered",
            title: "Portfolio Manager",
            sub: "Manages your account",
            tone: "azure",
          },
          {
            kicker: site.registration.number,
            title: site.brand,
            sub: "Distributor",
            tone: "gold",
          },
        ]}
        connectors={[
          { label: "You pay management and performance fees", tone: "azure" },
          {
            label: "The manager pays us a distribution commission",
            tone: "gold",
          },
        ]}
        rail={{
          label: "No fee is charged by us to you",
          tone: "muted",
          kind: "blocked",
        }}
      />

      <svg
        viewBox="0 0 800 300"
        className="hidden w-full lg:block"
        role="img"
        aria-labelledby="feeflow-title feeflow-desc"
      >
        <title id="feeflow-title">How Fintwiz Wealth is paid</title>
        <desc id="feeflow-desc">
          The investor pays management and performance fees to the portfolio
          manager. The portfolio manager pays a distribution commission to
          Fintwiz Wealth. Fintwiz Wealth charges the investor nothing for the
          distribution service.
        </desc>

        <defs>
          <marker
            id="fee-arrow-azure"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--azure-bright)" />
          </marker>
          <marker
            id="fee-arrow-gold"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--gold)" />
          </marker>
        </defs>

        {/* The payment that does not happen */}
        <motion.path
          data-reveal=""
          data-dash=""
          style={{ "--dash": "4 6" } as React.CSSProperties}
          d={NO_FEE_ARC}
          fill="none"
          stroke="var(--slate-light)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          {...draw(0.5, true)}
        />
        <g transform={`translate(${ARC_MID.x} ${ARC_MID.y})`}>
          <rect
            x="-13"
            y="-13"
            width="26"
            height="26"
            rx="3"
            fill="var(--card)"
            stroke="var(--slate-light)"
            strokeWidth="1.25"
          />
          <path
            d="M -5 -5 L 5 5 M 5 -5 L -5 5"
            stroke="var(--slate)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>
        <text
          x={ARC_MID.x}
          y={16}
          textAnchor="middle"
          className="fill-slate font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          No fee charged to you
        </text>

        {/* Fees you pay the manager */}
        <motion.path
          data-reveal=""
          d={`M ${FEES_FROM},${MID_Y} L ${FEES_TO},${MID_Y}`}
          fill="none"
          stroke="var(--azure-bright)"
          strokeWidth="2"
          markerEnd="url(#fee-arrow-azure)"
          {...draw(0.1)}
        />
        <text
          x={(FEES_FROM + FEES_TO) / 2}
          y={MID_Y + 24}
          textAnchor="middle"
          className="fill-azure-bright font-mono text-[10px] tracking-[0.08em] uppercase"
        >
          Fees
        </text>

        {/* Commission the manager pays us */}
        <motion.path
          data-reveal=""
          d={`M ${COMMISSION_FROM},${MID_Y} L ${COMMISSION_TO},${MID_Y}`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          markerEnd="url(#fee-arrow-gold)"
          {...draw(0.3)}
        />
        <text
          x={(COMMISSION_FROM + COMMISSION_TO) / 2}
          y={MID_Y + 24}
          textAnchor="middle"
          className="fill-gold-deep font-mono text-[10px] tracking-[0.08em] uppercase"
        >
          Commission
        </text>

        <FlowNode {...NODE.you} title="You" sub="The investor" tone="neutral" />
        <FlowNode
          {...NODE.manager}
          title="Portfolio Manager"
          sub="Manages your account"
          tone="azure"
        />
        <FlowNode
          {...NODE.fintwiz}
          title={site.brand}
          sub="Distributor"
          tone="gold"
        />
      </svg>

      <figcaption className="mt-6 text-[0.8125rem] leading-relaxed text-slate lg:mt-5">
        You pay the portfolio manager. The portfolio manager pays us. Because
        commission differs between managers, that arrangement creates a conflict
        of interest, which is why the band applying to each shortlisted manager
        is disclosed to you in writing before you sign anything.
      </figcaption>
    </figure>
  );
}

function FlowNode({
  x,
  y,
  w,
  title,
  sub,
  tone,
}: {
  x: number;
  y: number;
  w: number;
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

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={NODE_H}
        rx="3"
        fill="var(--card)"
        stroke={stroke}
        strokeWidth="1.25"
      />
      <text
        x={x + 18}
        y={y + 42}
        className="fill-ink font-display text-[16px] font-medium"
      >
        {title}
      </text>
      <text x={x + 18} y={y + 63} className="fill-slate text-[12px]">
        {sub}
      </text>
    </g>
  );
}
