import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const GROUPS = [
  {
    title: "Data & Analysis",
    color: "#22d3ee",
    items: ["Data Analysis", "Data Visualization", "Dashboards & KPIs", "Google Sheets", "LLM workflows", "Process optimization"],
  },
  {
    title: "Design",
    color: "#ff2e88",
    items: ["UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Branding & Identity", "Prototyping"],
  },
  {
    title: "Build",
    color: "#8b5cf6",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Three.js"],
  },
];

const MARQUEE = [
  "Data Analysis", "Figma", "Next.js", "UI/UX", "Dashboards", "React",
  "Branding", "LLMs", "Product Thinking", "Data Viz", "Prototyping", "Shipping",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="04 — Skills"
          title={<>What I <span className="grad-text">work with</span></>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                    {g.title}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-lg border border-[color:var(--border)] bg-[color:var(--paper-2)] px-3 py-1.5 text-sm text-[color:var(--ink-dim)]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* marquee */}
      <div className="relative mt-14 overflow-hidden border-y border-[color:var(--border)] py-5">
        <div className="marquee-track gap-8">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)] md:text-3xl"
            >
              {m}
              <span className="mx-6 text-[color:var(--accent)]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
