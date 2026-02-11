// src/pages/Donate.jsx
import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import VideoPlaceholder from "../components/VideoPlaceholder";
import DonateModal from "../components/DonateModal";

const PRESET_AMOUNTS = [1, 5, 10, 20];
const MIN_CUSTOM = 1;
const MAX_CUSTOM = 10000;

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

const clip_dict = [
  {title: "Clip 1", path: "/clip1.jpeg"},
  {title: "Clip 2", path: "/clip2.jpeg"},
  {title: "Clip 3", path: "/clip3.jpeg"},
  {title: "Clip 4", path: "/clip4.jpeg"},
]

function AmountButton({ amount, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(amount)}
      className={cn(
        "w-full rounded-2xl border px-4 py-4 text-base font-semibold transition shadow-sm",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
          : "border-[color:var(--border)] bg-white text-[color:var(--text)] hover:bg-[color:var(--bg-alt)]"
      )}
      aria-pressed={active}
    >
      €{amount}
    </button>
  );
}

export default function Donate() {
  // Example fundraising values (replace with real data if you have it)
  const raised = 2900;
  const goal = 3000;

  const [selectedPreset, setSelectedPreset] = useState(5);
  const [customAmountRaw, setCustomAmountRaw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(null);
  const [pendingType, setPendingType] = useState(null); // "preset" | "custom"
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState("");

  const customAmount = useMemo(() => {
    if (!customAmountRaw) return NaN;
    const normalized = String(customAmountRaw).replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : NaN;
  }, [customAmountRaw]);

  function openConfirmForPreset(amount) {
    setError("");
    setPendingAmount(amount);
    setPendingType("preset");
    setModalOpen(true);
  }

  function openConfirmForCustom(e) {
    e.preventDefault();
    setError("");

    if (!Number.isFinite(customAmount)) {
      setError("Enter a valid custom amount.");
      return;
    }
    if (customAmount < MIN_CUSTOM || customAmount > MAX_CUSTOM) {
      setError(`Custom amount must be between €${MIN_CUSTOM} and €${MAX_CUSTOM}.`);
      return;
    }

    setPendingAmount(customAmount);
    setPendingType("custom");
    setModalOpen(true);
  }

  async function continueToStripe() {
    if (pendingAmount == null) return;

    try {
      setDonating(true);
      setError("");

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: "eur",
          amount: pendingAmount, // in EUR; server validates and converts to cents
          amountType: pendingType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create Stripe session.");
      if (!data?.url) throw new Error("Stripe session URL missing.");

      window.location.assign(data.url);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
      setModalOpen(false);
    } finally {
      setDonating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen scroll-mt-20"
        aria-label="Hero"
      >
        {/* Background image: put hero.jpg in /public or change URL */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-zinc-900"
          style={{
            backgroundImage: "url(/hero.jpeg)",
          }}
          aria-hidden="true"
        />
        {/* Overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15))",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6">
          <div className="w-full max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Give Water
            </h1>
            <p className="mt-3 text-lg text-white/90 sm:text-xl">
              by Viajes en Marruecos
            </p>

            <div className="mt-8 rounded-3xl bg-[color:rgba(255,255,255,0.72)] p-5 backdrop-blur-sm ring-1 ring-white/40">
              <div className="flex items-baseline justify-between text-sm text-white/85">
                <span className="font-medium">Raised</span>
                <span className="tabular-nums">
                  €{raised} / €{goal}
                </span>
              </div>
              <ProgressBar value={raised} max={goal} theme="dark" />
              <p className="mt-3 text-sm text-white/85">
                Secure payment via Stripe Checkout.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#donate"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl bg-[color:var(--btn)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition",
                  "hover:bg-[color:var(--btn-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                Donate now
              </a>
              <a
                href="#video"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition",
                  "hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                Watch video
              </a>
            </div>

            {/* If your image is missing, the hero will be dark. Put a file at public/hero.jpg */}
          </div>
        </div>
      </section>

      {/* MAIN VIDEO */}
      <section
        id="video"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
        aria-label="Video"
      >
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight">Video</h2>
        </div>

        <div className="mt-5">
          {/* Replace with your <video> or embedded player later */}
          <VideoPlaceholder
            label="Main campaign video placeholder"
            posterUrl="/Video.jpeg"
          />
        </div>
      </section>

      {/* DONATE */}
      <section
        id="donate"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-14 sm:px-6"
        aria-label="Donate"
      >
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-alt)] p-5 shadow-sm sm:p-7">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">Donate</h2>
            <p className="text-sm text-[color:var(--muted)]">EUR</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {PRESET_AMOUNTS.map((amt) => (
              <AmountButton
                key={amt}
                amount={amt}
                active={selectedPreset === amt}
                onClick={(value) => {
                  setSelectedPreset(value);
                  openConfirmForPreset(value);
                }}
              />
            ))}
          </div>

          <form onSubmit={openConfirmForCustom} className="mt-6">
            <label htmlFor="customAmount" className="block text-sm font-medium">
              Custom amount
            </label>
            <div className="mt-2 flex gap-3">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-[color:var(--muted)]">
                  €
                </span>
                <input
                  id="customAmount"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={`Min ${MIN_CUSTOM} — Max ${MAX_CUSTOM}`}
                  className={cn(
                    "w-full rounded-2xl border border-[color:var(--border)] bg-white py-3 pl-8 pr-3 text-sm shadow-sm",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:border-black"
                  )}
                  value={customAmountRaw}
                  onChange={(e) => setCustomAmountRaw(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "shrink-0 rounded-2xl bg-[color:var(--btn)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition",
                  "hover:bg-[color:var(--btn-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                )}
              >
                Continue
              </button>
            </div>

            <p className="mt-2 text-xs text-[color:var(--muted)]">
              Presets: €1, €5, €10, €20 • Custom: €{MIN_CUSTOM}–€{MAX_CUSTOM}
            </p>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* CLIPS */}
      <section
        id="clips"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6"
        aria-label="Clips"
      >
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight">Clips</h2>
          <p className="text-sm text-[color:var(--muted)]">More videos</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {clip_dict.map((clip) => (
            <div
              key={clip.title}
              className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-alt)] p-4 shadow-sm"
            >
              <div className="text-sm font-semibold">{clip.title}</div>
              <div className="mt-3">
                <VideoPlaceholder
                  label={`${clip.title} placeholder`}
                  posterUrl={clip.path}
                  compact
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <DonateModal
        open={modalOpen}
        onClose={() => (donating ? null : setModalOpen(false))}
        amount={pendingAmount}
        currency="EUR"
        onContinue={continueToStripe}
        loading={donating}
      />
    </div>
  );
}
