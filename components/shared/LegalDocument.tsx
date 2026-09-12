import { Reveal } from "@/components/shared/Reveal";
import type { LegalSection } from "@/lib/content/legal";
import { LEGAL_UPDATED } from "@/lib/content/legal";

/**
 * Shared rendering for the privacy policy and terms.
 *
 * Legal pages are usually where design gives up. This one keeps the measure
 * readable, numbers the sections, and provides a sticky contents list so a
 * reader can actually navigate a long document.
 */
export function LegalDocument({
  sections,
  children,
}: {
  sections: readonly LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-background">
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-gold-deep">On this page</p>
            <ol className="mt-5 space-y-2.5 border-l border-border pl-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="link-underline text-[0.82rem] leading-snug text-slate hover:text-ink"
                  >
                    <span className="mr-2 font-mono text-[0.7rem] text-gold-deep tnum">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-7 font-mono text-[0.7rem] leading-relaxed text-slate-light">
              Last updated
              <br />
              {LEGAL_UPDATED}
            </p>
          </nav>

          <div className="max-w-[68ch]">
            {sections.map((section, index) => (
              <Reveal
                key={section.id}
                as="section"
                className="border-b border-border pb-10 last:border-b-0 [&:not(:first-child)]:pt-10"
              >
                <div id={section.id}>
                  <p className="font-mono text-[0.7rem] tracking-[0.14em] text-gold-deep uppercase tnum">
                    Section {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-[1.4rem] text-ink md:text-[1.55rem]">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="text-[0.95rem] leading-[1.78] text-slate"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.list ? (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.62rem] size-1 shrink-0 bg-gold"
                          />
                          <span className="text-[0.95rem] leading-[1.75] text-slate">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
