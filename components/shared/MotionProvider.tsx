"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes Motion honour the visitor's operating-system
 * setting by itself: transform and layout animations resolve instantly, while
 * fades still run. That is why no component may branch its *rendered output*
 * on `useReducedMotion()`.
 *
 * The hook reads the OS setting on the browser's first render, but the server
 * cannot know it. A component that renders different markup when it returns
 * true therefore fails hydration for every reduced-motion visitor, and React
 * leaves the server's `opacity:0` inline styles in place, so the page renders
 * blank. Use this provider for behaviour, and CSS `motion-reduce:` utilities
 * for anything that should disappear.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
