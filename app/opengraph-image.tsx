import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.brand}, ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered by Satori, which supports flexbox but not CSS grid, and which has
 * no access to the next/font files. Layout here is deliberately flex-only and
 * font-stack agnostic so it cannot fail at build time.
 */
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
          backgroundColor: "#081320",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            display: "flex",
            backgroundColor: "#8C7A54",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(243,241,236,0.35)",
              borderRadius: "4px",
              color: "#F3F1EC",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            FW
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#F3F1EC", fontSize: "34px", fontWeight: 700 }}>
              Fintwiz
            </div>
            <div
              style={{
                color: "#B39B68",
                fontSize: "14px",
                letterSpacing: "6px",
                marginTop: "2px",
              }}
            >
              WEALTH
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F3F1EC",
              fontSize: "54px",
              lineHeight: 1.12,
              maxWidth: "960px",
              display: "flex",
            }}
          >
            Compare SEBI-registered portfolio managers.
          </div>
          <div
            style={{
              color: "#B39B68",
              fontSize: "54px",
              lineHeight: 1.12,
              maxWidth: "960px",
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
            paddingTop: "26px",
          }}
        >
          <div style={{ color: "rgba(243,241,236,0.66)", fontSize: "22px", display: "flex" }}>
            {site.registration.authority} registered PMS distributor
          </div>
          <div style={{ color: "#F3F1EC", fontSize: "22px", display: "flex" }}>
            {site.registration.number}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
