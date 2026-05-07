export default function NewJobPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-gray-900">
          Neuen Job erstellen
        </h1>

        <p className="mt-2 text-gray-600">
          Erstelle eine Tätigkeitsvorschau für Bewerber.
        </p>

        <form className="mt-8 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jobtitel
            </label>

            <input
              type="text"
              placeholder="z. B. Kommissionierer Frühschicht"
              className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Einsatzort
            </label>

            <input
              type="text"
              placeholder="z. B. Kleinostheim"
              className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Schichtmodell
            </label>

            <input
              type="text"
              placeholder="z. B. Früh-/Spätschicht"
              className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video-Link
            </label>

            <input
              type="url"
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tätigkeitsbeschreibung
            </label>

            <textarea
              placeholder="Beschreibe kurz die Tätigkeit"
              className="mt-2 min-h-32 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Job speichern
          </button>

        </form>
      </div>
    </main>
  );
}