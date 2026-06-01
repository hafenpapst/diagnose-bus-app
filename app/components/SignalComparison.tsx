"use client";

import { cases } from "../data/cases";

type Props = {
  caseId: string;
};

export function SignalComparison({ caseId }: Props) {
  const currentCase = cases.find((c) => c.id === caseId);

  if (!currentCase?.signalComparison) {
    return null;
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {currentCase.signalComparison.title}
          </h2>

          <p className="mt-2 text-zinc-400">
            Vergleichen Sie die bereitgestellten Signalbilder.
          </p>
        </div>

        <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm text-orange-300">
          Messauftrag
        </span>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-black/40 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-red-300">
          Fehlerbild
        </p>

        <div className="mt-5 h-96 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 p-2">
          <img
            src={currentCase.signalComparison.faultSignal}
            alt="Fehlersignal"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="font-semibold text-zinc-200">
          Arbeitsauftrag:
        </p>

        <p className="mt-2 text-zinc-400">
          Beschreiben Sie Signalform, Spannungsbereich und Signalaktivität.
          Leiten Sie daraus ab, welche Kommunikationsstörung vorliegt.
        </p>
      </div>
    </section>
  );
}