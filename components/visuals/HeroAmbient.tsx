"use client";

import * as React from "react";
import { heroVideo } from "@/lib/media";
import { DiamondField } from "@/components/brand/Motif";

/**
 * Ambient footage behind the hero.
 *
 * The clip is generated locally by `npm run build:media` (see
 * public/media/CREDITS.md), is silent, and carries no information, so losing it
 * costs the visitor nothing.
 *
 * The poster frame is always rendered underneath, and the video always
 * rendered on top, so the markup is identical on the server and in every
 * browser. Reduced motion hides the video with CSS, and playback is started
 * from an effect only when motion is allowed. The video has `preload="none"`
 * and no `autoPlay` attribute, so a reduced-motion visitor never downloads it.
 */
export function HeroAmbient() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) {
        el.pause();
        return;
      }
      // Some browsers reject playback even when muted. The poster underneath
      // is an acceptable outcome, so the rejection is swallowed deliberately.
      void el.play().catch(() => {});
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroVideo.poster})` }}
      />
      {/* If neither source loads, the element falls back to its poster,
          which is the same frame as the layer underneath. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        poster={heroVideo.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      >
        <source src={heroVideo.webm} type="video/webm" />
        <source src={heroVideo.mp4} type="video/mp4" />
      </video>

      {/* Scrims. Heaviest on the left where the type sits, lightest on the
          right so the architecture is actually legible as architecture. */}
      <div className="absolute inset-0 bg-field/[0.58]" />
      <div className="absolute inset-0 bg-gradient-to-r from-field via-field/82 to-field/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-field via-transparent to-field/55" />
      <DiamondField className="text-field-border opacity-70" scale={62} />
    </div>
  );
}
