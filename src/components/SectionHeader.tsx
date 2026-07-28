import Reveal from "./Reveal";
import type { ReactNode } from "react";

type Props = {
  index: string;
  title: ReactNode;
  aside?: ReactNode;
};

export default function SectionHeader({ index, title, aside }: Props) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6 border-b border-[color:var(--border)] pb-6">
        <div>
          <span className="font-[family-name:var(--font-sans)] text-sm text-[color:var(--text-faint)]">
            {index}
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            {title}
          </h2>
        </div>
        {aside && (
          <p className="hidden max-w-xs pb-2 text-right text-sm text-[color:var(--text-dim)] md:block">
            {aside}
          </p>
        )}
      </div>
    </Reveal>
  );
}
