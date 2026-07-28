import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { SITE } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grad-border overflow-hidden">
          <div
            className="relative px-7 py-14 text-center md:px-16 md:py-20"
            style={{ background: "radial-gradient(120% 140% at 50% 0%, rgba(27,69,224,0.08), transparent 60%)" }}
          >
            <Reveal>
              <p className="font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.2em] text-[color:var(--text-faint)]">
                06 — Contact
              </p>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[color:var(--cyan)]">
                Open to freelance &amp; full-time
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Have data that should
                <br />
                become a <span className="grad-text">product?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[color:var(--text-dim)]">
                Let&apos;s turn it into something people actually use. I usually reply within a
                day.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[color:var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-press)]"
                  >
                    WhatsApp · 010 6923 7525
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[color:var(--ink)] px-7 py-3.5 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
                  >
                    Connect on LinkedIn
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <a
                    href={SITE.cv}
                    download
                    className="group inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-[color:var(--ink-dim)] underline decoration-[color:var(--line-strong)] underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]"
                  >
                    Download CV
                    <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
