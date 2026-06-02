"use client";

import { useEffect, useState } from "react";
import HypothesisCheck from "./HypothesisCheck";
import SignalValueCheck from "./SignalValueCheck";
import { WiringDiagram } from "./WiringDiagram";
import { RepairCalculation } from "./RepairCalculation";
import { CaseSaveControls } from "./CaseSaveControls";
import { WorkDocumentation } from "./WorkDocumentation";
import { SignalComparison } from "./SignalComparison";

type Props = {
  caseId: string;
  keywords: string[];
};

export function ProblemWorkflow({ caseId, keywords }: Props) {
  const [unlocked, setUnlocked] = useState(false);

  const unlockKey = `case-${caseId}-hypothesis-unlocked`;

  useEffect(() => {
    setUnlocked(localStorage.getItem(unlockKey) === "true");
  }, [unlockKey]);

  return (
    <>
      <HypothesisCheck
        caseId={caseId}
        keywords={keywords}
        onUnlocked={() => setUnlocked(true)}
      />

      {unlocked ? (
        <>
<SignalComparison caseId={caseId} />
<SignalValueCheck />
<WiringDiagram caseId={caseId} />
<WorkDocumentation caseId={caseId} />
<RepairCalculation caseId={caseId} />
<CaseSaveControls caseId={caseId} />
        </>
      ) : (
        <section className="mt-6 rounded-3xl border border-orange-400/30 bg-orange-500/10 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold text-orange-300">
            Diagnoseunterlagen gesperrt
          </h2>

          <p className="mt-3 text-zinc-300">
            Die Signalbilder, der Stromlaufplan, die Messpunkte und die
            Kalkulation werden freigeschaltet, sobald eine fachlich begründete
            erste Vermutung geprüft wurde.
          </p>
        </section>
      )}
    </>
  );
}