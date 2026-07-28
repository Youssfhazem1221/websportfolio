"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section in view.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(244,242,236,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <a href="#top" className="group flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
          <Logo className="h-8 w-8 text-[color:var(--ink)] transition-transform group-hover:scale-105" />
          <span>
            Youssf<span className="grad-text">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-[color:var(--accent)]"
                    : "text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <MagneticButton>
            <a
              href="https://wa.me/201069237525"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--grad-hot)" }}
            >
              Let&apos;s talk
            </a>
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--border)] md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-[color:var(--ink)]" />
            <span className="block h-0.5 w-5 bg-[color:var(--ink)]" />
            <span className="block h-0.5 w-5 bg-[color:var(--ink)]" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--bg)]/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-[color:var(--text-dim)] hover:bg-[color:var(--paper-2)] hover:text-[color:var(--ink)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/201069237525"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg px-3 py-2 text-center font-semibold text-white"
              style={{ background: "var(--grad-hot)" }}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
