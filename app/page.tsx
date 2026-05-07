export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <h1 className="text-3xl font-bold text-gray-950">
          Staffora
        </h1>

        <p className="mt-3 text-gray-700">
          Tätigkeitsvorschauen für bessere Bewerberauswahl.
        </p>

        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <a
            href="/jobs"
            className="rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800"
          >
            Jobübersicht öffnen
          </a>

          <a
            href="/jobs/new"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-center font-medium text-gray-900 transition hover:bg-gray-100"
          >
            Neuen Job erstellen
          </a>
        </div>
      </div>
    </main>
  );
}