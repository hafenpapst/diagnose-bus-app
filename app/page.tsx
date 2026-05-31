import Link from "next/link";

const cases = [
  {
    id: 1,
    bus: "High-Speed-CAN",
    title: "ABS/ESP Warnmeldung",
    text: "Masseschluss auf der CAN-High-Leitung am ABS/ESP-Steuergerät.",
    color: "red",
  },
  {
    id: 2,
    bus: "Low-Speed-CAN",
    title: "Drehzahlmesser fällt aus",
    text: "Übergangswiderstand auf der CAN-Low-Leitung im Komfortsystem.",
    color: "amber",
  },
  {
    id: 3,
    bus: "LIN-BUS",
    title: "Fensterheber ohne Funktion",
    text: "Sporadischer Ausfall des Fensterhebers hinten links durch LIN-Kommunikationsfehler.",
    color: "blue",
  },
  {
    id: 4,
    bus: "High-Speed-CAN",
    title: "Fahrzeug startet nicht",
    text: "Inaktives Motorsteuergerät durch fehlende Spannungsversorgung.",
    color: "emerald",
  },
  {
    id: 5,
    bus: "CAN-C",
    title: "Notlauf und Warnlampen",
    text: "Gestörte Terminierung durch defekten Abschlusswiderstand.",
    color: "violet",
  },
];

export default function Home() {
  return (
    <main
  className="min-h-screen overflow-hidden text-white"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/images/hintergrund.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
      
      {/* Hintergrund Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-white/10 px-10 py-6 backdrop-blur">

          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-blue-300">
              PT23-2 · Diagnoseauftrag
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Diagnose vernetzter Fahrzeugsysteme
            </h1>

            <p className="mt-2 text-zinc-400">
              Interaktive Fehlersuche im BUS-System mit Dialogannahme,
              Messwerten und Dokumentation
            </p>
          </div>

          {/* LOGO */}
<div className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
  <img
    src="/images/logoweber.png"
    alt="Werkstatt Weber"
    className="h-60 w-auto object-contain"
  />
</div>

        </header>

        {/* CONTENT */}
        <section className="px-10 py-10">

          <div className="mb-8 flex items-end justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Dialogannahme
              </h2>

              <p className="mt-2 text-zinc-400">
                Wähle einen Problemfall aus und starte die kundengestützte Diagnose.
              </p>
            </div>

            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              System bereit
            </div>

          </div>

          {/* PROBLEMKARTEN */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {cases.map((item) => (

              <article
                key={item.id}
                className="group rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-zinc-900/90"
              >

                <div className="mb-5 flex items-center justify-between">

                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-300">
                    Problemfall {item.id}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                    {item.bus}
                  </span>

                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-20 text-zinc-400">
                  {item.text}
                </p>

                {/* Ladebalken */}
                <div className="mt-6 h-2 rounded-full bg-zinc-800">

                  <div className="h-2 w-2/3 rounded-full bg-blue-500 transition-all group-hover:w-full" />

                </div>

                {/* BUTTON */}
                <Link
                  href={`/problem/${item.id}`}
                  className="mt-6 block w-full rounded-2xl bg-blue-600 px-4 py-3 text-center font-semibold shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
                >
                  Diagnose öffnen
                </Link>

              </article>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}