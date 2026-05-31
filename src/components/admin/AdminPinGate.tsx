"use client";

import { Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import { verifyAdminPin } from "@/lib/save-portfolio";

interface AdminPinGateProps {
  onVerified: () => void;
}

export default function AdminPinGate({ onVerified }: AdminPinGateProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!verifyAdminPin(pin)) {
      setError("Incorrect PIN. Please try again.");
      return;
    }

    onVerified();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-surface p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Lock size={24} />
          </div>
          <h1 className="font-serif text-2xl font-semibold">Portfolio Editor</h1>
          <p className="mt-2 text-sm text-text-muted">Enter your PIN to edit your portfolio</p>
        </div>

        <label htmlFor="pin" className="mb-1.5 block text-sm font-medium">
          PIN
        </label>
        <input
          id="pin"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mb-4 w-full rounded-lg border border-border px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="••••"
        />

        {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!pin}
          className="btn btn-primary w-full py-3"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
