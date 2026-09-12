import { BadgeCheck, FileText, Landmark, ShieldOff } from "lucide-react";
import { site } from "@/lib/site";

const points = [
  {
    icon: BadgeCheck,
    text: `${site.registration.authority} registered distributor`,
  },
  { icon: Landmark, text: site.registration.number, mono: true },
  { icon: FileText, text: "Manager-sourced figures only" },
  { icon: ShieldOff, text: "No research, no trade calls" },
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
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 py-2.5 md:gap-x-10">
          {points.map(({ icon: Icon, text, ...rest }) => (
            <li key={text} className="flex items-center gap-2">
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
