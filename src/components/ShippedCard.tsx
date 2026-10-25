import type { Shipped } from "@/data/shipped";

type Props = {
  item: Shipped;
  /** image on the left instead of the right (desktop only) */
  flip?: boolean;
};

export default function ShippedCard({ item, flip = false }: Props) {
  return (
    <div className="grad-border overflow-hidden">
      <div
        className={`grid gap-8 p-7 md:grid-cols-[1.1fr_1fr] md:p-10 ${flip ? "md:[direction:rtl]" : ""}`}
      >
        <div className="[direction:ltr]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--paper-2)] px-3 py-1 text-xs font-semibold text-[color:var(--green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" /> {item.badge}
            </span>
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--paper-2)] px-3 py-1 text-xs font-medium text-[color:var(--ink-dim)]">
              {item.stack}
            </span>
          </div>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold md:text-4xl">
            {item.name}
          </h3>
          <p className="mt-3 max-w-md text-lg font-medium text-[color:var(--ink)]">{item.outcome}</p>
          <p className="mt-3 max-w-md leading-relaxed text-[color:var(--text-dim)]">{item.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs">
            {item.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text-dim)]"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={item.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-press)]"
            >
              {item.live.label}
              <span aria-hidden>↗</span>
            </a>
            {item.code?.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
              >
                {c.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--accent-tint)] shadow-[0_24px_60px_-30px_rgba(22,21,28,0.4)] [direction:ltr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image.src}
            alt={item.image.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {item.phone && (
            // Rises from the bottom edge; the frame's overflow crops it like a pocket.
            <div className="absolute -bottom-10 right-5 w-[32%] max-w-[170px] overflow-hidden rounded-[1.4rem] border-[5px] border-[color:var(--ink)] bg-[color:var(--ink)] shadow-[0_20px_40px_-12px_rgba(22,21,28,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.phone.src}
                alt={item.phone.alt}
                loading="lazy"
                className="block w-full rounded-[1rem]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
