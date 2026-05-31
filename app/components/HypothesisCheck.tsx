"use client";

import { useEffect, useState } from "react";

type Props = {
  caseId: string;
  keywords: string[];
  onUnlocked: () => void;
};

export default function HypothesisCheck({ caseId, keywords, onUnlocked }: Props) {
  const [hypothesis, setHypothesis] = useState("");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState("");

  const unlockKey = `case-${caseId}-hypothesis-unlocked`;

  useEffect(() => {
    if (localStorage.getItem(unlockKey) === "true") {
      onUnlocked();
    }
  }, [unlockKey, onUnlocked]);

  function normalize(text: string) {
    return text
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, " ");
  }

  function checkHypothesis() {
    const combinedText = normalize(`${hypothesis} ${reason}`);

    const matches = keywords.filter((word) =>
      combinedText.includes(normalize(word))
    );

    if (matches.length >= 3) {
      localStorage.setItem(unlockKey, "true");
      setResult(
        `✅ Die Vermutung ist fachlich plausibel begründet. Diagnoseunterlagen werden freigeschaltet.`
      );
      onUnlocked();
    } else if (matches.length >= 1) {
      setResult(
        `⚠️ Die Vermutung geht teilweise in die richtige Richtung. Begründen Sie genauer mit Fehlerspeicher, betroffenem System und Kommunikationsweg.`
      );
    } else {
      setResult(
        "❌ Die Vermutung ist noch zu allgemein. Nutzen Sie den Fehlerspeichereintrag und das betroffene Bussystem für Ihre Begründung."
      );
    }
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Erste Diagnosevermutung</h2>

      <p className="mt-2 text-zinc-400">
        Formulieren Sie zunächst eine Vermutung zur Fehlerursache und begründen
        Sie diese anhand der Dialogannahme und des Fehlerspeichereintrags.
      </p>

      <textarea
        value={hypothesis}
        onChange={(e) => setHypothesis(e.target.value)}
        placeholder="Vermutete Fehlerursache ..."
        className="mt-6 min-h-28 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
      />

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Begründung anhand Fehlerspeicher, System und Symptom ..."
        className="mt-4 min-h-32 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
      />

      <button
        onClick={checkHypothesis}
        className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Vermutung prüfen und Diagnoseunterlagen freischalten
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 text-zinc-200">
          {result}
        </div>
      )}
    </section>
  );
}