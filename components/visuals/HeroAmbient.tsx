"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { heroVideo } from "@/lib/media";

/**
 * Ambient footage behind the hero.
 *
 * The clip is generated locally by `npm run build:media` (see
 * public/media/CREDITS.md), is silent, and carries no information, so losing it
 * costs the visitor nothing. If reduced motion is requested, or the file fails
 * to load, the poster frame is shown instead and no video is ever fetched.
 */
export function HeroAmbient() {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    // Some browsers reject autoplay even when muted. A still poster is an
    // acceptable outcome, so the rejection is swallowed deliberately.
    void el.play().catch(() => {});
  }, [reduced]);

  const showStill = reduced || failed;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {showStill ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroVideo.poster})` }}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroVideo.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          tabIndex={-1}
          onError={() => setFailed(true)}
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
      )}

      {/* Scrims. Heaviest on the left where the type sits, lightest on the
          right so the architecture is actually legible as architecture. */}
      <div className="absolute inset-0 bg-field/[0.58]" />
      <div className="absolute inset-0 bg-gradient-to-r from-field via-field/82 to-field/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-field via-transparent to-field/55" />
      <div className="field-grid absolute inset-0 opacity-45" />
    </div>
  );
}
