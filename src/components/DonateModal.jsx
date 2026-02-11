// src/components/DonateModal.jsx
import React, { useEffect, useMemo, useRef } from "react";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function formatEUR(amount) {
  if (amount == null) return "";
  // show integer without decimals; otherwise show 2 decimals
  const isInt = Number.isFinite(amount) && Math.abs(amount - Math.round(amount)) < 1e-9;
  return isInt ? `€${Math.round(amount)}` : `€${amount.toFixed(2)}`;
}

/**
 * Accessible modal:
 * - role="dialog" + aria-modal
 * - closes on ESC and backdrop click
 * - basic focus trap (no external libs)
 */
export default function DonateModal({
  open,
  onClose,
  amount,
  currency = "EUR",
  onContinue,
  loading = false,
}) {
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);

  const titleId = "donate-modal-title";
  const descId = "donate-modal-desc";

  const amountLabel = useMemo(() => formatEUR(Number(amount)), [amount]);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement;

    const dialog = dialogRef.current;
    if (dialog) {
      // focus the first focusable
      const focusable = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable[0] || dialog).focus();
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;

      // focus trap
      const container = dialogRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore focus
      const prev = lastActiveRef.current;
      if (prev && prev.focus) prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center px-4" role="presentation">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={() => (loading ? null : onClose?.())}
        aria-label="Close modal"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-3xl bg-[color:var(--bg-alt)] p-6 shadow-xl ring-1 ring-[color:var(--border-strong)] focus:outline-none"
      >
        <h3 id={titleId} className="text-lg font-bold">
          Confirm your donation
        </h3>
        <p id={descId} className="mt-2 text-sm text-[color:var(--muted)]">
          You’re about to donate <span className="font-semibold">{amountLabel}</span>{" "}
          ({currency}). You’ll be redirected to Stripe Checkout to complete payment.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => (loading ? null : onClose?.())}
            className={cn(
              "rounded-2xl border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--text)] shadow-sm transition",
              "hover:bg-[color:var(--bg-alt)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              loading && "opacity-60 cursor-not-allowed"
            )}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "rounded-2xl bg-[color:var(--btn)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition",
              "hover:bg-[color:var(--btn-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
              loading && "opacity-80 cursor-wait"
            )}
            disabled={loading}
          >
            {loading ? "Redirecting…" : "Continue to payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
