// src/pages/DonationSuccess.jsx
import React from "react";

export default function DonationSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--bg)] px-4 py-16 text-[color:var(--text)]">
      <div className="w-full max-w-xl rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-alt)] p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">Thank you!</h1>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          Your donation was received. You’ll get a receipt from Stripe by email.
        </p>
        <a
          href="/donate"
          className="mt-6 inline-flex rounded-2xl bg-[color:var(--btn)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--btn-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Back to donation page
        </a>
      </div>
    </div>
  );
}
