import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-[color:var(--text-faint)] md:flex-row">
        <span className="flex items-center gap-2.5">
          <Logo className="h-5 w-5 text-[color:var(--text-dim)]" />
          © {new Date().getFullYear()} Youssf Hazem · Cairo, Egypt
        </span>
        <div className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--text)]"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--text)]"
          >
            LinkedIn
          </a>
          <a
            href="https://www.behance.net/youssfhazem1221"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--text)]"
          >
            Behance
          </a>
          <a
            href="https://wa.me/201069237525"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--text)]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
