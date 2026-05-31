"use client";

import { useState } from "react";
import { OscilloscopePopup } from "./OscilloscopePopup";

export function WiringDiagram() {
  const [selected, setSelected] = useState<React.ReactNode>(null);

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-2xl font-bold">Stromlaufplan</h2>

      <p className="mt-2 text-zinc-400">
        Wählen Sie geeignete Messpunkte zur Diagnose aus.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-700 bg-white p-4">
        {/* SCHALTPLAN 1 */}
        <div className="relative">
          <img
            src="/images/problem3_schaltplan.jpg"
            alt="Schaltplan Problem 3"
            className="w-full"
          />

          {/* J387 Spannungsversorgung */}
          <button
            className="absolute left-[16.35%] top-[34%] z-10 h-3 w-3 rounded-full border border-blue-500 bg-blue-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-300">J387 / T20h/20 gemessen gegen Kl.31</p>

                    <button
                      onClick={() => setSelected(null)}
                      className="rounded-full px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                    >
                      ×
                    </button>
                  </div>

                  <img
                    src="/images/multi1.png"
                    alt="Multimeter"
                    className="max-h-52 w-full rounded-xl border border-zinc-700 object-contain shadow-xl"
                  />

                  <div className="space-y-1 text-sm text-zinc-200">
                    <p>
                      <strong>Messpunkt:</strong> J387 / T20h/20
                    </p>

                    <p>
                      <strong>Betriebszustand:</strong> Motor EIN
                    </p>

                    <p>
                      <strong>Messgerät:</strong> Multimeter DC Volt
                    </p>

                    <p>
                      <strong>Messwert:</strong> 12,3 V DC
                    </p>

                    <p className="text-emerald-400">
                      <strong>Bewertung:</strong> Versorgungsspannung vorhanden
                    </p>
                  </div>
                </div>
              )
            }
          />

          {/* T20h/15 */}
          <button
            className="absolute left-[27.2%] top-[34%] z-10 h-3 w-3 rounded-full border border-red-500 bg-red-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <OscilloscopePopup
                  storageKey="case3-j387-lin"
                  title="J387 / T20h/16 LIN-Ausgang"
                  image="/images/oszi1.png"
                  onClose={() => setSelected(null)}
                />
              )
            }
          />

          {/* T28/6 */}
          <button
            className="absolute left-[27.2%] top-[20.5%] z-10 h-3 w-3 rounded-full border border-orange-500 bg-orange-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <OscilloscopePopup
                  storageKey="case3-t28-6"
                  title="T28b/6 LIN-Steckverbindung an B-Säule gegen Kl.31"
                  image="/images/oszi1.png"
                  onClose={() => setSelected(null)}
                />
              )
            }
          />


        </div>

        {/* SCHALTPLAN 2 */}
        <div className="relative mt-6">
          <img
            src="/images/problem3_schaltplan2.jpg"
            alt="Schaltplan Problem 3 Seite 2"
            className="w-full"
          />

          {/* T28a/6 LIN nach B-Säule gegen Kl.31 */}
          <button
            className="absolute left-[19.6%] top-[20.8%] z-10 h-3 w-3 rounded-full border border-orange-500 bg-orange-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <OscilloscopePopup
                  storageKey="case3-t28a-6"
                  title="T28a/6 LIN nach B-Säule gegen Kl.31"
                  image="/images/oszi2.png"
                  onClose={() => setSelected(null)}
                />
              )
            }
          />

          {/* J926 / T20l/9 LIN Signalleitung gegen Kl.31 */}
          <button
            className="absolute left-[19.6%] top-[33.8%] z-10 h-3 w-3 rounded-full border border-red-500 bg-red-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <OscilloscopePopup
                  storageKey="case3-j926-t20l9"
                  title="J926 / T20l/9 LIN-Signalleitung gegen Kl.31"
                  image="/images/oszi2.png"
                  onClose={() => setSelected(null)}
                />
              )
            }
          />

          {/* J926 T20l/20 Spannungsversorgung gegen Kl.31 */}
          <button
            className="absolute left-[49.459%] top-[33.8%] z-10 h-3 w-3 rounded-full border border-blue-500 bg-blue-500/70 transition hover:scale-150"
            onClick={() =>
              setSelected(
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-300">
                      J926 T20l/20 Spannungsversorgung gegen Kl.31
                    </p>

                    <button
                      onClick={() => setSelected(null)}
                      className="rounded-full px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                    >
                      ×
                    </button>
                  </div>

                  <img
                    src="/images/multi1.png"
                    alt="Multimeter"
                    className="max-h-52 w-full rounded-xl border border-zinc-700 object-contain shadow-xl"
                  />

                  <div className="space-y-1 text-sm text-zinc-200">
                    <p>
                      <strong>Messpunkt:</strong> J926 Spannungsversorgung
                    </p>

                    <p>
                      <strong>Messgerät:</strong> Multimeter DC Volt
                    </p>

                    <p>
                      <strong>Messwert:</strong> 12,3 V DC
                    </p>
                  </div>
                </div>
              )
            }
          />


        </div>
      </div>
     {selected && (
  <div className="fixed left-1/2 top-1/2 z-50 w-[620px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-blue-500/40 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl">
    {selected}
  </div>
)} 
    </section>
  );
}