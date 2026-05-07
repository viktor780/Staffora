import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-red-600">
            Fehler beim Laden
          </h1>

          <p className="mt-3 text-gray-800">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-950">
              Jobübersicht
            </h1>

            <p className="mt-3 text-gray-700">
              Hier siehst du alle gespeicherten Tätigkeitsvorschauen.
            </p>
          </div>

          <a
            href="/jobs/new"
            className="rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800"
          >
            Neuer Job
          </a>
        </div>

        <div className="space-y-6">

          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Job-ID #{job.id}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-950">
                      {job.job_title}
                    </h2>

                    <p className="mt-3 text-lg text-gray-800">
                      {job.location || "Kein Einsatzort hinterlegt"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    <a
                      href={`/apply/${job.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      Bewerberlink öffnen
                    </a>

                    <a
                      href={`/jobs/${job.id}/candidates`}
                      className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
                    >
                      Bewerber anzeigen
                    </a>

                  </div>
                </div>

                <p className="mt-6 whitespace-pre-line text-gray-800">
                  {job.description || "Keine Beschreibung hinterlegt."}
                </p>

              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white p-8 text-lg text-gray-800 shadow-md">
              Noch keine Jobs gespeichert.
            </div>
          )}

        </div>
      </div>
    </main>
  );
}