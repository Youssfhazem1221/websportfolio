import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TIMELINE = [
  { when: "Now", what: "Data Analyst Specialist @ Revibe", note: "Dashboards, KPIs & data-driven decisions" },
  { when: "2026", what: "Operations Analyst @ Shiny Smile Veneers", note: "Analyzed 30k+ conversations; built cost-saving tooling" },
  { when: "2025", what: "Support Engineer @ Apple", note: "93% CSAT, lowest handle time on the team" },
  { when: "2020–22", what: "Technical Advisor / SME @ VOIS", note: "Promoted for product depth & case quality" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="03 — About"
          title={<>Who I <span className="grad-text-warm">am</span></>}
        />
      </div>
      <div className="container-x mt-12 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        <div>
          <Reveal delay={0.05}>
            <div className="space-y-4 text-lg leading-relaxed text-[color:var(--text-dim)]">
              <p>
                I&apos;m an MIS graduate who found the sweet spot between three things I love:
                making sense of <span className="text-[color:var(--text)]">data</span>, designing
                clean <span className="text-[color:var(--text)]">interfaces</span>, and{" "}
                <span className="text-[color:var(--text)]">building</span> products that ship.
              </p>
              <p>
                That combination is my edge. Most analysts can&apos;t design; most designers
                can&apos;t read the data. I work across all three — so I can spot the insight,
                design the answer, and build it. The result is work that&apos;s as useful as it
                is good-looking.
              </p>
              <p>
                Based in Cairo, self-taught in design, always shipping something new.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:pt-4">
          <Reveal delay={0.1}>
            <ol className="relative space-y-6 border-l border-[color:var(--border-strong)] pl-6">
              {TIMELINE.map((t) => (
                <li key={t.what} className="relative">
                  <span
                    className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[color:var(--bg)]"
                    style={{ background: "var(--grad-hot)" }}
                  />
                  <div className="font-[family-name:var(--font-sans)] text-xs text-[color:var(--cyan)]">
                    {t.when}
                  </div>
                  <div className="mt-0.5 font-semibold text-[color:var(--text)]">{t.what}</div>
                  <div className="text-sm text-[color:var(--text-dim)]">{t.note}</div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
