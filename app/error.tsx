"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[fintwizwealth] unhandled error", error);
  }, [error]);

  return (
    <section className="bg-field text-field-foreground">
      <div className="container-page flex min-h-[62vh] flex-col justify-center py-24">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-brass-bright uppercase">
          Something went wrong
        </p>
        <h1 className="mt-6 max-w-[22ch] text-[clamp(2rem,4.5vw,3rem)] text-field-foreground">
          This page failed to load.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[1.0125rem] leading-[1.72] text-field-muted">
          The problem is at our end, not yours. Try again, and if it keeps
          happening please tell us at{" "}
          <a
            href={`mailto:${site.contact.general}`}
            className="link-underline text-field-foreground"
          >
            {site.contact.general}
          </a>
          .
        </p>

        {error.digest ? (
          <p className="mt-6 font-mono text-[0.72rem] text-field-muted tnum">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-10">
          <Button variant="field" size="lg" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
}
