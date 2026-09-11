import {
  BadgeCheck,
  Compass,
  FileSignature,
  Filter,
  Link2,
  Receipt,
  RefreshCw,
  ShieldOff,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files store icon names as strings so that lib/ stays free of JSX.
 * House style: iconography is lucide only, never emoji.
 */
export const iconMap = {
  compass: Compass,
  filter: Filter,
  "file-signature": FileSignature,
  refresh: RefreshCw,
  "badge-check": BadgeCheck,
  receipt: Receipt,
  link: Link2,
  "shield-off": ShieldOff,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] ?? BadgeCheck;
}
