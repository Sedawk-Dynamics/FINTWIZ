import type { PortfolioManager } from "@/lib/managers";
import { cn } from "@/lib/utils";

/**
 * A compact signature for each manager's mandate.
 *
 * Three ticks inside the brand diamond, encoding market-cap breadth, how
 * concentrated the book is, and the volatility band. Every manager on the
 * roster produces a different silhouette, so the cards stop being four
 * identical rectangles.
 *
 * It encodes real, stated strategy characteristics. It is NOT derived from a
 * hash and it carries no performance information of any kind, which would be
 * both dishonest and a compliance problem.
 */

function levels(manager: PortfolioManager) {
  const capBreadth =
    manager.category === "Large Cap" ? 1 : manager.category === "All Cap" ? 3 : 2;
  const concentration = manager.construction === "Concentrated" ? 3 : 1;
  const volatility =
    manager.risk === "Aggressive" ? 3 : manager.risk === "Balanced" ? 2 : 1;

  return { capBreadth, concentration, volatility };
}

const WIDTHS = [10, 17, 24] as const;

export function MandateGlyph({
  manager,
  className,
  size = 44,
}: {
  manager: PortfolioManager;
  className?: string;
  size?: number;
}) {
  const { capBreadth, concentration, volatility } = levels(manager);
  const rows = [
    { level: capBreadth, y: 17 },
    { level: concentration, y: 24 },
    { level: volatility, y: 31 },
  ];

  const titleId = `glyph-${manager.id}`;

  // Built as one string rather than interleaved JSX children. Mixed text and
  // expressions inside an SVG <title> produce a different number of text nodes
  // on the server than on the client, which fails hydration.
  const description =
    `Mandate profile for ${manager.house} ${manager.strategy}: ` +
    `market cap breadth ${capBreadth} of 3, ` +
    `concentration ${concentration} of 3, ` +
    `volatility band ${volatility} of 3.`;

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-labelledby={titleId}
      className={cn("shrink-0", className)}
    >
      <title id={titleId}>{description}</title>

      <rect
        x="10.5"
        y="10.5"
        width="27"
        height="27"
        rx="3.5"
        transform="rotate(45 24 24)"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.3"
      />

      {rows.map((row, index) => (
        <g key={index}>
          {/* track */}
          <path
            d={`M12 ${row.y}h24`}
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          {/* value */}
          <path
            d={`M12 ${row.y}h${WIDTHS[row.level - 1]}`}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            className={index === 1 ? "text-gold" : undefined}
            style={index === 1 ? { stroke: "var(--gold)" } : undefined}
          />
        </g>
      ))}
    </svg>
  );
}
