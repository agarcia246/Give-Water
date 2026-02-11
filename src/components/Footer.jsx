// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--footer)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">
              <div>viajesenmarruecos@gmail.com</div>
              <div>+34 600 000 000</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--muted)]">
            <a
              href="https://www.instagram.com/viajeenmarruecos"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 hover:text-[color:var(--accent)]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 hover:text-[color:var(--accent)]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 hover:text-[color:var(--accent)]"
            >
              Terms
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-[color:var(--muted)]">
          Payments are processed securely by Stripe Checkout.
        </p>
      </div>
    </footer>
  );
}
