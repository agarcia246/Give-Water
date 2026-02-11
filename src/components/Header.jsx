// src/components/Header.jsx
import React from "react";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:rgba(247,244,239,0.75)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#hero"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          )}
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[color:var(--btn)] text-white">
            G
          </span>
          <span>Give Water</span>
        </a>

        <nav aria-label="Page sections" className="flex items-center gap-1">
          {[
            ["Hero", "#hero"],
            ["Video", "#video"],
            ["Donate", "#donate"],
            ["Clips", "#clips"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:bg-[color:rgba(0,0,0,0.02)] hover:text-[color:var(--accent)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
