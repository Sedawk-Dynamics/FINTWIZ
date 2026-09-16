import { BadgeCheck, FileText, Landmark, ShieldOff } from "lucide-react";
import { site } from "@/lib/site";

const points = [
  {
    icon: BadgeCheck,
    text: `${site.registration.authority} registered distributor`,
  },
  { icon: Landmark, text: site.registration.number, mono: true },
  // The last two restate what the page says; on a phone they would push the
  // strip to four lines above the header, so they appear from md upwards.
  { icon: FileText, text: "Manager-sourced figures only", wide: true },
  { icon: ShieldOff, text: "No research, no trade calls", wide: true },
] as const;

/**
 * Regulatory standing, stated once at the top of every page. Static by design:
 * a scrolling tape here would read as market data, which is exactly the
 * research-analyst association this domain has to avoid.
 */
export function TrustStrip() {
  return (
    <div className="border-b border-field-border bg-field text-field-muted">
      <div className="container-page">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-2.5 sm:gap-x-7 md:gap-x-10">
          {points.map(({ icon: Icon, text, ...rest }) => (
            <li
              key={text}
              className={
                "wide" in rest && rest.wide
                  ? "hidden items-center gap-2 md:flex"
                  : "flex items-center gap-2"
              }
            >
              <Icon
                aria-hidden="true"
                className="size-3.5 shrink-0 text-gold-bright"
              />
              <span
                className={
                  "mono" in rest && rest.mono
                    ? "font-mono text-[0.7rem] tracking-[0.08em] tnum"
                    : "text-[0.72rem] tracking-[0.03em]"
                }
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
