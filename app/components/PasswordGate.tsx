"use client";

import { useState } from "react";

const PASSWORD = "Eustermann2026";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  function checkPassword() {
    if (input === PASSWORD) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Ist der Motor kalt, gibt ihm 6 1/2.");
    }
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/90 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold">Werkstatt Weber</h1>

        <p className="mt-2 text-zinc-400">
          Diagnose Trainer · Zugang geschützt
        </p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkPassword();
          }}
          placeholder="Passwort eingeben"
          className="mt-6 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none focus:border-blue-500"
        />

        {error && <p className="mt-3 text-red-400">{error}</p>}

        <button
          onClick={checkPassword}
          className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
        >
          Zugang öffnen
        </button>
      </div>
    </main>
  );
}