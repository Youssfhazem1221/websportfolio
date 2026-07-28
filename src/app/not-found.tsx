import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <Logo className="mx-auto h-12 w-12 text-[color:var(--ink)]" />
        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
          404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-tight text-[color:var(--ink)] md:text-6xl">
          Page not <span className="text-[color:var(--accent)]">found</span>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[color:var(--ink-dim)]">
          That route doesn&apos;t exist — a bit like a bus line that isn&apos;t mapped yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-press)]"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
