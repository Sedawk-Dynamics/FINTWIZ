"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Where the money goes, and the one direction it never travels.
 *
 * You pay the portfolio manager. The portfolio manager pays us. The arc across
 * the top, struck through, is the payment that does not exist: you are never
 * billed by Fintwiz Wealth for distribution.
 */

const NO_FEE_ARC = "M 96,104 C 210,26 556,26 664,104";

export function FeeFlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const draw = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox="0 0 760 300"
        className="w-full"
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
          d={NO_FEE_ARC}
          fill="none"
          stroke="var(--slate-light)"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          opacity={0.55}
          {...draw(0.5)}
        />
        <g transform="translate(380 46)">
          <circle r="13" fill="var(--card)" stroke="var(--slate-light)" strokeWidth="1.25" />
          <path
            d="M -5 -5 L 5 5 M 5 -5 L -5 5"
            stroke="var(--slate-light)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <text
          x={380}
          y={16}
          textAnchor="middle"
          className="fill-slate font-mono text-[10px] tracking-[0.1em] uppercase"
        >
          No fee charged to you
        </text>

        {/* Fees you pay the manager */}
        <motion.path
          data-reveal=""
          d="M 174,155 L 296,155"
          fill="none"
          stroke="var(--azure-bright)"
          strokeWidth="2"
          markerEnd="url(#fee-arrow-azure)"
          {...draw(0.1)}
        />
        <text
          x={235}
          y={180}
          textAnchor="middle"
          className="fill-azure-bright font-mono text-[9.5px] tracking-[0.08em] uppercase"
        >
          Fees
        </text>

        {/* Commission the manager pays us */}
        <motion.path
          data-reveal=""
          d="M 474,155 L 586,155"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          markerEnd="url(#fee-arrow-gold)"
          {...draw(0.3)}
        />
        <text
          x={530}
          y={180}
          textAnchor="middle"
          className="fill-gold-deep font-mono text-[9.5px] tracking-[0.08em] uppercase"
        >
          Commission
        </text>

        <FlowNode x={20} y={110} width={154} title="You" sub="The investor" tone="neutral" />
        <FlowNode
          x={296}
          y={110}
          width={178}
          title="Portfolio Manager"
          sub="Manages your account"
          tone="azure"
        />
        <FlowNode
          x={586}
          y={110}
          width={154}
          title={site.brand}
          sub="Distributor"
          tone="gold"
        />
      </svg>

      <figcaption className="mt-5 text-[0.8125rem] leading-relaxed text-slate">
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
  width,
  title,
  sub,
  tone,
}: {
  x: number;
  y: number;
  width: number;
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
        width={width}
        height={90}
        rx="3"
        fill="var(--card)"
        stroke={stroke}
        strokeWidth="1.25"
      />
      <text
        x={x + 16}
        y={y + 40}
        className="fill-ink font-display text-[16px] font-medium"
      >
        {title}
      </text>
      <text x={x + 16} y={y + 62} className="fill-slate text-[11px]">
        {sub}
      </text>
    </g>
  );
}
