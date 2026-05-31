"use client";

import { useEffect, useState } from "react";

type Row = {
  activity: string;
  purpose: string;
  measurement: string;
  result: string;
};

const emptyRows: Row[] = Array.from({ length: 8 }, () => ({
  activity: "",
  purpose: "",
  measurement: "",
  result: "",
}));

export function WorkDocumentation({ caseId }: { caseId: string }) {
  const storageKey = `case-${caseId}-work-documentation`;
  const lockKey = `case-${caseId}-locked`;

  const [rows, setRows] = useState<Row[]>(emptyRows);
  const [conclusion, setConclusion] = useState("");
  const [repair, setRepair] = useState("");
  const [locked, setLocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const data = JSON.parse(saved);
      setRows(data.rows ?? emptyRows);
      setConclusion(data.conclusion ?? "");
      setRepair(data.repair ?? "");
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
        rows,
        conclusion,
        repair,
      })
    );
  }, [rows, conclusion, repair, loaded, storageKey]);

  function updateRow(index: number, field: keyof Row, value: string) {
    if (locked) return;

    setRows((current) =>
      current.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Arbeitsdokumentationsprotokoll</h2>

      <p className="mt-2 text-zinc-400">
        Dokumentieren Sie Ihr diagnostisches Vorgehen eigenständig. Halten Sie
        Tätigkeiten, Ziel der Prüfung, Messpunkte und Ergebnisse fest.
      </p>

      {locked && (
        <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
          Das Arbeitsdokumentationsprotokoll ist gespeichert und gesperrt.
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          <thead className="bg-black/50 text-zinc-300">
            <tr>
              <th className="w-16 border-b border-white/10 p-3">Nr.</th>
              <th className="border-b border-white/10 p-3">
                Durchgeführte Tätigkeit
              </th>
              <th className="border-b border-white/10 p-3">
                Zweck der Tätigkeit
              </th>
              <th className="border-b border-white/10 p-3">
                Messpunkt / Messgerät
              </th>
              <th className="border-b border-white/10 p-3">
                Ergebnis / Beobachtung
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-white/10">
                <td className="p-3 align-top font-bold text-zinc-400">
                  {index + 1}
                </td>

                <td className="p-2">
                  <textarea
  value={row.activity}
  placeholder={
  index === 0
    ? "z. B. Fehlerspeicher ausgelesen oder Türverkleidung demontiert"
    : ""
}
                    disabled={locked}
                    onChange={(e) =>
                      updateRow(index, "activity", e.target.value)
                    }
                    className="min-h-24 w-full rounded-xl border border-zinc-700 bg-black/40 p-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </td>

                <td className="p-2">
                  <textarea
  value={row.purpose}
  placeholder={
  index === 0
    ? "z. B. Fehlerbild eingrenzen oder Ursache prüfen"
    : ""
}
                    disabled={locked}
                    onChange={(e) =>
                      updateRow(index, "purpose", e.target.value)
                    }
                    className="min-h-24 w-full rounded-xl border border-zinc-700 bg-black/40 p-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </td>

                <td className="p-2">
                  <textarea
  value={row.measurement}
  placeholder={
  index === 0
    ? "z. B. T28/6, Oszilloskop oder Verbindungsstecker J926 T20l/9"
    : ""
}
                    disabled={locked}
                    onChange={(e) =>
                      updateRow(index, "measurement", e.target.value)
                    }
                    className="min-h-24 w-full rounded-xl border border-zinc-700 bg-black/40 p-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </td>

                <td className="p-2">
                  <textarea
  value={row.result}
  placeholder={
  index === 0
    ? "z. B. LIN-Signal vorhanden, 1 V dominant / 12 V rezessiv oder keine Kommunikation erkennbar"
    : ""
}
                    disabled={locked}
                    onChange={(e) =>
                      updateRow(index, "result", e.target.value)
                    }
                    className="min-h-24 w-full rounded-xl border border-zinc-700 bg-black/40 p-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Endgültige Schlussfolgerung
          </label>

          <textarea
            value={conclusion}
            disabled={locked}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder="Beschreiben Sie die ermittelte Fehlerursache und begründen Sie diese anhand Ihrer Messungen."
            className="min-h-40 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Vorgeschlagene Reparaturmaßnahme
          </label>

          <textarea
            value={repair}
            disabled={locked}
            onChange={(e) => setRepair(e.target.value)}
            placeholder="Beschreiben Sie, welche Reparatur durchgeführt werden soll."
            className="min-h-40 w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>
    </section>
  );
}