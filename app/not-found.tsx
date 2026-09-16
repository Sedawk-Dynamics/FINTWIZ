import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-field text-field-foreground">
      <div className="container-page flex min-h-[62vh] flex-col justify-center py-24">
        <p className="font-mono text-[0.72rem] tracking-[0.18em] text-gold-bright uppercase tnum">
          Error 404
        </p>
        <h1 className="mt-6 text-[clamp(2rem,4.5vw,3rem)] text-field-foreground">
          That page is not here.
        </h1>
        <p className="mt-5 text-[1.0125rem] leading-[1.72] text-field-muted">
          The link may be out of date, or the page may have moved. Everything on
          this site is reachable from the four pages below.
        </p>

        <nav aria-label="Suggested pages" className="mt-10">
          <ul className="grid gap-px overflow-hidden rounded-md border border-field-border bg-field-border sm:grid-cols-2">
            {site.nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 bg-field px-6 py-5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="text-[0.95rem] text-field-foreground">
                    {item.label}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-gold-bright"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <Button asChild variant="field" size="lg">
            <Link href="/">Back to the home page</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
