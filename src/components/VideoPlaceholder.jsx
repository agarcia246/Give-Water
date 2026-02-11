// src/components/VideoPlaceholder.jsx
import React from "react";

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M8.5 5.75a1 1 0 0 0-1.5.86v10.78a1 1 0 0 0 1.5.86l9-5.39a1 1 0 0 0 0-1.72l-9-5.39Z" />
    </svg>
  );
}

export default function VideoPlaceholder({ label, compact = false, posterUrl }) {
  return (
    <div className="w-full">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-alt)] ${
          compact ? "aspect-[3/4]" : "aspect-video"
        }`}
        role="img"
        aria-label={label}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        )}

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[color:var(--text)] shadow-sm ring-1 ring-[color:var(--border)]">
            <PlayIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

