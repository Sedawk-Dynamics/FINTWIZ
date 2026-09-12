import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.brand}, ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered by Satori, which supports flexbox but not CSS grid, has no access to
 * the next/font files, and cannot read the site stylesheet. Layout is therefore
 * flex-only with literal colours, and the logo mark is inlined as a data URI
 * because Satori cannot fetch from the public directory at build time.
 */
const markDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "brand", "logo-mark.png"),
).toString("base64")}`;

const NAVY = "#06111f";
const PAPER = "#f3f1ec";
const GOLD = "#fec21a";
const AZURE = "#28a6e4";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NAVY,
          padding: "68px 76px",
          position: "relative",
        }}
      >
        {/* Brand rule: azure into gold, the two halves of the mark */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "7px",
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${AZURE}, ${GOLD})`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element --
              ImageResponse is rendered by Satori, which has no DOM and cannot
              use next/image. A plain img with a data URI is the only option. */}
          <img src={markDataUri} width={68} height={68} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: PAPER, fontSize: "32px", fontWeight: 700 }}>
              Fintwiz
            </div>
            <div
              style={{
                color: GOLD,
                fontSize: "13px",
                letterSpacing: "7px",
                marginTop: "3px",
              }}
            >
              WEALTH
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: PAPER,
              fontSize: "54px",
              lineHeight: 1.12,
              maxWidth: "980px",
              display: "flex",
            }}
          >
            Compare SEBI-registered portfolio managers.
          </div>
          <div
            style={{
              color: GOLD,
              fontSize: "54px",
              lineHeight: 1.12,
              maxWidth: "980px",
              marginTop: "8px",
              display: "flex",
            }}
          >
            Invest directly with the one you choose.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(243,241,236,0.16)",
            paddingTop: "24px",
          }}
        >
          <div style={{ color: "rgba(243,241,236,0.66)", fontSize: "21px", display: "flex" }}>
            {site.registration.authority} registered PMS distributor
          </div>
          <div style={{ color: PAPER, fontSize: "21px", display: "flex" }}>
            {site.registration.number}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
