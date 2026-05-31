"use client";

import { useEffect, useState } from "react";

type IntakeKeywords = {
  complaint: string[];
  conditions: string[];
  repairs: string[];
  notes: string[];
};

type Props = {
  caseId: string;
  intakeKeywords: IntakeKeywords;
  onUnlocked: () => void;
};

export function CustomerIntake({
  caseId,
  intakeKeywords,
  onUnlocked,
}: Props) {
  const [complaint, setComplaint] = useState("");
  const [conditions, setConditions] = useState("");
  const [repairs, setRepairs] = useState("");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState("");

  const storageKey = `case-${caseId}-customer-intake`;
  const unlockKey = `case-${caseId}-customer-intake-unlocked`;

  const generalConditionWords = [
    "dauerhaft",
    "ständig",
    "staendig",
    "immer",
    "sporadisch",
    "gelegentlich",
    "ab und zu",
    "manchmal",
    "zeitweise",
    "plötzlich",
    "ploetzlich",
    "bei regen",
    "regen",
    "wetter",
    "nass",
    "feuchtigkeit",
    "warm",
    "kalt",
    "erwärmung",
    "erwaermung",
    "fahrt",
    "zündung",
    "zuendung",
  ];

  const generalRepairWords = [
    "keine",
    "nichts",
    "noch nicht",
    "nicht geprüft",
    "nicht geprueft",
    "nicht überprüft",
    "nicht ueberprueft",
    "nicht ersetzt",
    "nicht getauscht",
    "nicht ausgetauscht",
    "nicht repariert",
    "geprüft",
    "geprueft",
    "überprüft",
    "ueberprueft",
    "ersetzt",
    "getauscht",
    "ausgetauscht",
    "repariert",
    "bekannter",
    "werkstatt",
    "selbst",
  ];

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const data = JSON.parse(saved);

      setComplaint(data.complaint ?? "");
      setConditions(data.conditions ?? "");
      setRepairs(data.repairs ?? "");
      setNotes(data.notes ?? "");
    }

    if (localStorage.getItem(unlockKey) === "true") {
      onUnlocked();
    }
  }, [storageKey, unlockKey, onUnlocked]);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        complaint,
        conditions,
        repairs,
        notes,
      })
    );
  }, [complaint, conditions, repairs, notes, storageKey]);

  function normalize(text: string) {
    return text
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, " ");
  }

  function hasKeyword(text: string, words: string[]) {
    const normalizedText = normalize(text);

    return words.some((word) => normalizedText.includes(normalize(word)));
  }

  function checkIntake() {
    const complaintOk = hasKeyword(complaint, intakeKeywords.complaint);

    const conditionOk =
      hasKeyword(conditions, intakeKeywords.conditions) ||
      hasKeyword(conditions, generalConditionWords);

    const repairOk =
      hasKeyword(repairs, intakeKeywords.repairs) ||
      hasKeyword(repairs, generalRepairWords);

    const notesOk =
      hasKeyword(notes, intakeKeywords.notes) || notes.trim().length > 15;

    const missing: string[] = [];

    if (!complaintOk) {
      missing.push(
        "• Beanstandung: Beschreiben Sie genauer, welches System oder Bauteil betroffen ist."
      );
    }

    if (!conditionOk) {
      missing.push(
        "• Fehlerbedingungen: Ergänzen Sie, wann oder wie häufig der Fehler auftritt."
      );
    }

    if (!repairOk) {
      missing.push(
        "• Bereits durchgeführte Maßnahmen: Ergänzen Sie, ob bereits etwas geprüft oder ersetzt wurde."
      );
    }

    let score = 0;

    if (complaintOk) score++;
    if (conditionOk) score++;
    if (repairOk) score++;
    if (notesOk) score++;

    if (score >= 3 && complaintOk && conditionOk && repairOk) {
      localStorage.setItem(unlockKey, "true");

      setFeedback(
        "✅ Kundenbeanstandung vollständig dokumentiert. Der Fehlerspeicher wird freigeschaltet."
      );

      onUnlocked();
    } else {
      setFeedback(`⚠️ Bitte überarbeiten:\n\n${missing.join("\n")}`);
    }
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Schriftliche Kundenannahme</h2>

      <p className="mt-2 text-zinc-400">
        Dokumentieren Sie die wesentlichen Informationen aus der Dialogannahme.
      </p>

      <div className="mt-6 space-y-4">
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Beanstandung des Kunden"
          className="min-h-24 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
        />

        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder="Fehlerbedingungen: Wann, wie häufig oder unter welchen Umständen tritt der Fehler auf?"
          className="min-h-24 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
        />

        <textarea
          value={repairs}
          onChange={(e) => setRepairs(e.target.value)}
          placeholder="Bereits durchgeführte Maßnahmen oder Kundenvermutung"
          className="min-h-24 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Zusätzliche Hinweise, Einschränkungen oder wichtige Beobachtungen"
          className="min-h-24 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        onClick={checkIntake}
        className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Kundenannahme prüfen
      </button>

      {feedback && (
        <div className="mt-5 whitespace-pre-line rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-zinc-200">
          {feedback}
        </div>
      )}
    </section>
  );
}
