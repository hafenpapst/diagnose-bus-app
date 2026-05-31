"use client";

import { useState } from "react";

export default function SignalValueCheck() {
  const [soll, setSoll] = useState("");
  const [ist, setIst] = useState("");
  const [result, setResult] = useState("");

  function checkValues() {
    const sollText = soll.toLowerCase();
    const istText = ist.toLowerCase();

const sollHasLow =
  sollText.includes("1v") ||
  sollText.includes("1 v") ||
  sollText.includes("1,0") ||
  sollText.includes("1.0") ||
  sollText.includes("dominant") ||
  sollText.includes("dominanten");

const sollHasHigh =
  sollText.includes("12v") ||
  sollText.includes("12 v") ||
  sollText.includes("12,0") ||
  sollText.includes("12.0") ||
  sollText.includes("batteriespannung") ||
  sollText.includes("rezessiv") ||
  sollText.includes("rezessiven");

const sollHasSignal =
  sollText.includes("rechteck") ||
  sollText.includes("binär") ||
  sollText.includes("binaer") ||
  sollText.includes("daten") ||
  sollText.includes("datenpaket") ||
  sollText.includes("signalblock") ||
  sollText.includes("aktiv") ||
  sollText.includes("kommunikation");

const sollOk = sollHasLow && sollHasHigh && sollHasSignal;

const istHasSixVolt =
  istText.includes("6v") ||
  istText.includes("6 v") ||
  istText.includes("6,0") ||
  istText.includes("6.0") ||
  istText.includes("ca 6") ||
  istText.includes("ca. 6");

const istHasNoSignal =
  istText.includes("kein signal") ||
  istText.includes("keine daten") ||
  istText.includes("kein daten") ||
  istText.includes("keine kommunikation") ||
  istText.includes("keine lin") ||
  istText.includes("kein signalblock") ||
  istText.includes("keine signalblöcke") ||
  istText.includes("keine signalbloecke") ||
  istText.includes("kein telegramm") ||
  istText.includes("keine telegramme");

const istHasConstant =
  istText.includes("konstant") ||
  istText.includes("linear") ||
  istText.includes("horizontal") ||
  istText.includes("gerade") ||
  istText.includes("gleichbleibend");

const istOk = istHasSixVolt && istHasNoSignal && istHasConstant;

    if (sollOk && istOk) {
      setResult("✅ Sehr gut. Soll- und Ist-Signal wurden fachlich passend beschrieben.");
    } else if (sollOk || istOk) {
      setResult("⚠️ Teilweise richtig. Ein Signal wurde passend beschrieben, das andere sollte genauer geprüft werden.");
    } else {
      setResult("❌ Noch nicht passend. Achten Sie auf Spannungsbereich, Signalform und Signalaktivität.");
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
      <h3 className="text-xl font-bold">Soll-/Ist-Vergleich des Spannungssignals</h3>
      <p className="mt-2 text-sm text-zinc-400">
  Beschreiben Sie Spannungspegel, Signalform und Datenübertragung.
</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <textarea
          value={soll}
          onChange={(e) => setSoll(e.target.value)}
          placeholder="z. B. dominanter  oder rezessiver Pegel ? binäres Signal?"
          className="min-h-32 rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-blue-500"
        />

        <textarea
          value={ist}
          onChange={(e) => setIst(e.target.value)}
          placeholder="Kommunikation erkennbar? Spannungshöhe?"
          className="min-h-32 rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={checkValues}
        className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Soll-/Ist-Werte prüfen
      </button>

      {result && (
        <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-zinc-200">
          {result}
        </div>
      )}
    </div>
  );
}