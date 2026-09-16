"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

/**
 * The site's only scroll-triggered effect.
 *
 * Deliberately restrained: a short fade and a 14px lift, once, never repeated.
 * No parallax, no scroll-linked scaling, no pinned sections.
 *
 * REDUCED MOTION
 * --------------
 * These components always render the same markup. Reduced motion is handled
 * by `MotionProvider` (`reducedMotion="user"`), which drops the lift and keeps
 * only the fade. Branching the output on `useReducedMotion()` here used to make
 * the browser's first render differ from the server's for reduced-motion
 * visitors; React kept the server's `opacity:0`, and the whole page was blank.
 *
 * Every animated element carries `data-reveal`, which the `<noscript>` rule in
 * app/layout.tsx targets, so content also survives JavaScript being unavailable.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger position when several siblings reveal together. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveals direct children in sequence. Use for card grids and lists so items
 * arrive in reading order rather than all at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag data-reveal="" className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
