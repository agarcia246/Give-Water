// src/pages/DonationCancel.jsx
import React from "react";

export default function DonationCancel() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--bg)] px-4 py-16 text-[color:var(--text)]">
      <div className="w-full max-w-xl rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-alt)] p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">Donation canceled</h1>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          No payment was made. You can try again anytime.
        </p>
        <a
          href="/donate"
          className="mt-6 inline-flex rounded-2xl bg-[color:var(--btn)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--btn-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Return to donation page
        </a>
      </div>
    </div>
  );
}
