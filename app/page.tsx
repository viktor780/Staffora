export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-white p-8 shadow-lg md:p-14">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Staffora
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
            Zeige Bewerbern die echte Tätigkeit.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
            Statt generischer Stellenanzeigen erhalten Bewerber einen realistischen
            Einblick in den späteren Einsatz. Recruiter teilen Tätigkeiten per Link,
            Bewerber verstehen schneller, was sie erwartet.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row">

            <a
              href="/jobs"
              className="rounded-2xl bg-black px-6 py-4 text-center font-medium text-white transition hover:bg-gray-800"
            >
              Jobübersicht öffnen
            </a>

            <a
              href="/jobs/new"
              className="rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Neuen Job erstellen
            </a>

          </div>

        </div>

      </div>
    </main>
  );
}