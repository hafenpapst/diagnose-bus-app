"use client";

import { useState } from "react";

export function AudioTranscript({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-2xl bg-zinc-800 px-5 py-3 font-semibold transition hover:bg-zinc-700"
      >
        {open ? "Transkript ausblenden" : "Transkript anzeigen"}
      </button>

      {open && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-5 leading-7 text-zinc-300">
          {text}
        </div>
      )}
    </div>
  );
}