"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(22,21,28,0.55)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          {/*
            Keyed on the project so the frame counter starts over with the
            content it counts, instead of being reset from an effect.
          */}
          <ModalBody key={project.slug} project={project} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeFrame, setActiveFrame] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToFrame = (index: number) => {
    const el = document.getElementById(`modal-frame-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setActiveFrame(index + 1);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative mx-auto my-6 w-full max-w-4xl px-4 md:my-12"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 -mx-4 mb-2 flex items-center justify-between gap-4 rounded-b-lg px-4 py-3 backdrop-blur"
        style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="min-w-0">
          <div className="font-[family-name:var(--font-sans)] text-xs text-[color:var(--cyan)]">
            {project.category} · {project.year}
          </div>
          <h3 className="truncate font-[family-name:var(--font-display)] text-lg font-bold md:text-xl">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-semibold text-[color:var(--text-faint)] sm:inline">
            Frame {activeFrame} of {project.images.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--card)] text-lg text-[color:var(--ink)] transition-colors hover:bg-[color:var(--paper-2)]"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {/* intro */}
        <div className="border-b border-[color:var(--border)] p-6 md:p-8">
          <p className="max-w-2xl text-[color:var(--text-dim)]">{project.overview}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.role.map((r) => (
              <span
                key={r}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text-dim)]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* images */}
        <div className="flex flex-col">
          {project.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              id={`modal-frame-${i}`}
              src={src}
              alt={`${project.title} — ${i + 1}`}
              loading={i < 2 ? "eager" : "lazy"}
              className="block w-full border-b border-[color:var(--line)] last:border-none"
            />
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[color:var(--border)] p-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[color:var(--text-dim)]">
              {project.images.length} frames
            </span>
            {project.images.length > 1 && (
              <div className="ml-2 flex items-center gap-1">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToFrame(idx)}
                    aria-label={`Go to frame ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeFrame === idx + 1
                        ? "w-5 bg-[color:var(--accent)]"
                        : "w-2 bg-[color:var(--line-strong)] hover:bg-[color:var(--ink-dim)]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <a
            href={project.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
          >
            View on Behance →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
