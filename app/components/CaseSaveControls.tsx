"use client";

import { useEffect, useState } from "react";

const TEACHER_PASSWORD = "Lehrer2026";

export function CaseSaveControls({ caseId }: { caseId: string }) {
  const [locked, setLocked] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [message, setMessage] = useState("");

  const lockKey = `case-${caseId}-locked`;

  useEffect(() => {
    function updateLockedState() {
      setLocked(localStorage.getItem(lockKey) === "true");
    }

    updateLockedState();

    window.addEventListener("case-lock-changed", updateLockedState);

    return () => {
      window.removeEventListener("case-lock-changed", updateLockedState);
    };
  }, [lockKey]);

function saveDraft() {
  setMessage("✅ Zwischenstand gespeichert.");
  window.dispatchEvent(new Event("case-data-save-request"));
}

function finalSaveCase() {
  localStorage.setItem(lockKey, "true");
  setLocked(true);
  setMessage("✅ Eingaben gespeichert und gesperrt.");
  window.dispatchEvent(new Event("case-lock-changed"));
}

  function resetCase() {
    if (teacherPassword !== TEACHER_PASSWORD) {
      setMessage("❌ Falsches Lehrerpasswort.");
      return;
    }

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`case-${caseId}-`)) {
        localStorage.removeItem(key);
      }
    });

    setLocked(false);
setTeacherPassword("");
setMessage("✅ Eingaben wurden zurückgesetzt.");
window.dispatchEvent(new Event("case-lock-changed"));

window.location.reload();
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Bearbeitung speichern</h2>

      <p className="mt-2 text-zinc-400">
        Speichern sperrt die Eingaben für die spätere Auswertung im Plenum.
      </p>

      {locked && (
        <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
          Diese Bearbeitung ist gespeichert und gesperrt.
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <button
  onClick={saveDraft}
  disabled={locked}
  className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
>
  Zwischenspeichern
</button>

<button
  onClick={finalSaveCase}
  disabled={locked}
  className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
>
  Bearbeitung abschließen
</button>

        <input
          type="password"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          placeholder="Lehrerpasswort"
          className="rounded-2xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <button
          onClick={resetCase}
          className="rounded-2xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
        >
          Eingaben zurücksetzen
        </button>
      </div>

      {message && <p className="mt-4 text-zinc-200">{message}</p>}
    </section>
  );
}