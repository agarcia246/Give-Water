// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ value, max, theme = "light" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const track =
    theme === "dark" ? "bg-white/35" : "bg-[color:var(--border)]";
  const fill =
    theme === "dark" ? "bg-white" : "bg-[color:var(--accent)]";

  return (
    <div
      className={`mt-3 h-3 w-full rounded-full ${track}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Fundraising progress"
    >
      <div
        className={`h-3 rounded-full transition-[width] duration-300 ease-out ${fill}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
