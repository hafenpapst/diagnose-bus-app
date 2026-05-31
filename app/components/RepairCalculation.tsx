"use client";

import { useEffect, useState } from "react";

const PARTS = [
  { id: "leitung", name: "Leitungsreparatur", price: 15 },
  { id: "stecker", name: "Steckerleiste / Kontaktreparatur", price: 56 },
  { id: "steuergeraet", name: "Türsteuergerät ersetzen", price: 340 },
];

export function RepairCalculation({ caseId }: { caseId: string }) {
  const storageKey = `case-${caseId}-calculation`;
  const lockKey = `case-${caseId}-locked`;

  const [loaded, setLoaded] = useState(false);
  const [locked, setLocked] = useState(false);

  const [hours, setHours] = useState("1.5");
  const [rate, setRate] = useState("90");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const data = JSON.parse(saved);
      setHours(data.hours ?? "1.5");
      setRate(data.rate ?? "90");
      setSelectedParts(data.selectedParts ?? []);
      setCustomItem(data.customItem ?? "");
      setCustomPrice(data.customPrice ?? "");
    }

    setLocked(localStorage.getItem(lockKey) === "true");
    setLoaded(true);
  }, [storageKey, lockKey]);

  useEffect(() => {
    function updateLockedState() {
      setLocked(localStorage.getItem(lockKey) === "true");
    }

    window.addEventListener("case-lock-changed", updateLockedState);

    return () => {
      window.removeEventListener("case-lock-changed", updateLockedState);
    };
  }, [lockKey]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        hours,
        rate,
        selectedParts,
        customItem,
        customPrice,
      })
    );
  }, [hours, rate, selectedParts, customItem, customPrice, loaded, storageKey]);

  function togglePart(id: string) {
    if (locked) return;

    setSelectedParts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const laborNet =
    Number(hours.replace(",", ".")) * Number(rate.replace(",", "."));

  const customNet = Number(customPrice.replace(",", ".")) || 0;

  const partsNet =
    PARTS.filter((part) => selectedParts.includes(part.id)).reduce(
      (sum, part) => sum + part.price,
      0
    ) + customNet;

  const net = laborNet + partsNet;
  const tax = net * 0.19;
  const gross = net + tax;

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Reparaturkalkulation</h2>

      <p className="mt-2 text-zinc-400">
        Wählen Sie Arbeitszeit, Ersatzteile und sonstiges Material aus. Der
        Endbetrag wird automatisch berechnet.
      </p>

      {locked && (
        <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
          Die Kalkulation ist gespeichert und gesperrt.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Arbeitszeit in Stunden
          </label>

          <input
            value={hours}
            disabled={locked}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Stundenverrechnungssatz in €
          </label>

          <input
            value={rate}
            disabled={locked}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
        <h3 className="text-lg font-bold">
          Ersatzteile / Reparaturpositionen
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {PARTS.map((part) => (
            <label
              key={part.id}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-700 bg-zinc-950 p-4 transition hover:border-blue-500"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedParts.includes(part.id)}
                  disabled={locked}
                  onChange={() => togglePart(part.id)}
                />

                <span>{part.name}</span>
              </div>

              <span className="font-semibold">
                {part.price.toFixed(2)} €
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
        <h3 className="text-lg font-bold">Sonstiges / Kleinmaterial</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            value={customItem}
            disabled={locked}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="z. B. Kabelbinder, Isolierband"
            className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            value={customPrice}
            disabled={locked}
            onChange={(e) => setCustomPrice(e.target.value)}
            placeholder="Betrag netto in €, z. B. 6,50"
            className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
        <div className="grid grid-cols-1 gap-3 text-zinc-200 md:grid-cols-2">
          <p>
            Arbeitskosten netto: <strong>{laborNet.toFixed(2)} €</strong>
          </p>

          <p>
            Material netto: <strong>{partsNet.toFixed(2)} €</strong>
          </p>

          <p>
            Gesamt netto: <strong>{net.toFixed(2)} €</strong>
          </p>

          <p>
            MwSt. 19 %: <strong>{tax.toFixed(2)} €</strong>
          </p>
        </div>

        <p className="mt-5 text-3xl font-bold text-emerald-400">
          Gesamtbetrag brutto: {gross.toFixed(2)} €
        </p>
      </div>
    </section>
  );
}