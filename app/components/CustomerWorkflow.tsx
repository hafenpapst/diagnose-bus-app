"use client";

import { useEffect, useState } from "react";
import { CustomerIntake } from "./CustomerIntake";
import { ProblemWorkflow } from "./ProblemWorkflow";

type IntakeKeywords = {
  complaint: string[];
  conditions: string[];
  repairs: string[];
  notes: string[];
};

type Props = {
  caseId: string;
  keywords: string[];
  faultCode: string;
  intakeKeywords: IntakeKeywords;
};

export function CustomerWorkflow({
  caseId,
  keywords,
  faultCode,
  intakeKeywords,
}: Props) {
  const [intakeUnlocked, setIntakeUnlocked] = useState(false);

  const unlockKey = `case-${caseId}-customer-intake-unlocked`;

  useEffect(() => {
    setIntakeUnlocked(localStorage.getItem(unlockKey) === "true");
  }, [unlockKey]);

  return (
    <>
      <CustomerIntake
        caseId={caseId}
        intakeKeywords={intakeKeywords}
        onUnlocked={() => setIntakeUnlocked(true)}
      />

      {intakeUnlocked ? (
        <>
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-bold">Fehlerspeichereintrag</h2>

              <p className="mt-4 rounded-2xl bg-black/40 p-5 font-mono text-blue-300">
                {faultCode}
              </p>
            </div>
          </section>

          <ProblemWorkflow caseId={caseId} keywords={keywords} />
        </>
      ) : (
        <section className="mt-6 rounded-3xl border border-orange-400/30 bg-orange-500/10 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold text-orange-300">
            Weitere Diagnose gesperrt
          </h2>

          <p className="mt-3 text-zinc-300">
            Der Fehlerspeicher und die weiteren Diagnoseunterlagen werden erst
            freigeschaltet, nachdem die Informationen aus der Dialogannahme
            schriftlich dokumentiert wurden.
          </p>
        </section>
      )}
    </>
  );
}