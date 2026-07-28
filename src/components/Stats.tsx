import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import AnimatedCounter from "./AnimatedCounter";

const STATS = [
  { value: "$2.7k", unit: "/mo saved", label: "Built an agent workflow that cut ticket time 5→2 min for 20 agents" },
  { value: "30k+", unit: "conversations", label: "Analyzed customer conversations to surface trends & pain points" },
  { value: "100k+", unit: "emails", label: "Operational analysis across inbound & outbound support email" },
  { value: "93%", unit: "CSAT", label: "Top-ranked support engineer at Apple with the lowest handle time" },
];

export default function Stats() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="01 — Impact"
          title={<>By the <span className="grad-text">numbers</span></>}
          aside="Real outcomes from real work — not job titles."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div className="card h-full p-5">
                <div className="font-[family-name:var(--font-display)] text-4xl font-bold md:text-5xl">
                  <span className="grad-text">
                    <AnimatedCounter value={s.value} />
                  </span>
                </div>
                <div className="mt-1 text-xs font-medium text-[color:var(--text-faint)]">
                  {s.unit}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-dim)]">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
