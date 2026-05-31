import Link from "next/link";
import { cases } from "../../data/cases";
import { CustomerWorkflow } from "../../components/CustomerWorkflow";
import { AudioTranscript } from "../../components/AudioTranscript";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const currentCase = cases.find((item) => item.id === id);

  if (!currentCase) {
    return (
      <main className="min-h-screen bg-zinc-950 p-10 text-white">
        <h1 className="text-3xl font-bold">Problemfall nicht gefunden</h1>

        <Link href="/" className="mt-6 inline-block text-blue-400">
          Zurück zur Übersicht
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen p-10 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url(${currentCase.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">
              ← Zurück zur Dialogannahme
            </Link>

            <p className="mt-6 text-sm uppercase tracking-[0.4em] text-blue-300">
              Problemfall {currentCase.id} · {currentCase.bus}
            </p>

            <h1 className="mt-2 text-4xl font-bold">{currentCase.title}</h1>

            <p className="mt-2 text-zinc-400">
              Interaktive Fallbearbeitung mit Dialogannahme, Unterlagen und
              Diagnoseprotokoll
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm backdrop-blur">
            Gruppe PT23-2
          </div>
        </div>

        {/* INFOBOXEN */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex items-center gap-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur">
            <img
              src={currentCase.avatar}
              alt=""
              className="h-32 w-32 rounded-2xl border-2 border-blue-500/60 object-cover shadow-xl"
            />

            <div>
              <p className="text-sm text-zinc-500">Kunde</p>

              <h2 className="mt-1 text-3xl font-bold">
                {currentCase.customer}
              </h2>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm text-zinc-500">Fahrzeug</p>
            <h2 className="mt-2 text-2xl font-bold">{currentCase.vehicle}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm text-zinc-500">System</p>
            <h2 className="mt-2 text-2xl font-bold">{currentCase.system}</h2>
          </div>
        </section>

        {/* KUNDENBEANSTANDUNG */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-bold">Kundenbeanstandung</h2>

          <p className="mt-4 leading-7 text-zinc-300">
            {currentCase.complaint}
          </p>
        </section>

        {/* AUDIOPLAYER */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Dialogannahme</h2>

              <p className="mt-2 text-zinc-400">
                Hören Sie sich die Kundenbeanstandung an.
              </p>
            </div>

            <div className="rounded-full bg-blue-500/15 px-4 py-2 text-sm text-blue-300">
              Audio aktiv
            </div>
          </div>

          <audio controls className="w-full">
            <source src={currentCase.audio} type="audio/mpeg" />
          </audio>
        </section>

        <AudioTranscript
          text={currentCase.transcript ?? "Kein Transkript hinterlegt."}
        />

        {/* SCHÜLER-WORKFLOW */}
        <CustomerWorkflow
          caseId={currentCase.id}
          keywords={currentCase.keywords ?? []}
          faultCode={currentCase.faultCode}
          intakeKeywords={currentCase.intakeKeywords}
        />
      </div>
    </main>
  );
}