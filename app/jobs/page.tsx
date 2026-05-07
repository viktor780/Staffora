import { supabase } from "@/lib/supabase";

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow md:p-8">
          <h1 className="text-2xl font-bold text-red-600">
            Fehler beim Laden
          </h1>
          <p className="mt-2 text-gray-800">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">
              Jobübersicht
            </h1>

            <p className="mt-2 text-base leading-relaxed text-gray-700">
              Hier siehst du alle gespeicherten Tätigkeitsvorschauen.
            </p>
          </div>

          <a
            href="/jobs/new"
            className="w-full rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800 md:w-auto"
          >
            Neuer Job
          </a>
        </div>

        <div className="space-y-5">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md md:p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Job-ID #{job.id}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-950 md:text-2xl">
                      {job.job_title}
                    </h2>

                    <p className="mt-2 text-base text-gray-800">
                      {job.location || "Kein Einsatzort hinterlegt"}
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap">
                    <a
                      href={`/apply/${job.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800 md:w-auto md:py-2"
                    >
                      Bewerberlink öffnen
                    </a>

                    <a
                      href={`/jobs/${job.id}/candidates`}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium text-gray-900 transition hover:bg-gray-100 md:w-auto md:py-2"
                    >
                      Bewerber anzeigen
                    </a>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-800">
                  {job.description || "Keine Beschreibung hinterlegt."}
                </p>

                {job.video_url && (
                  <div className="mt-5">
                    <a
                      href={job.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-semibold text-blue-700 underline"
                    >
                      Video öffnen
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white p-6 text-gray-800 shadow md:p-8">
              Noch keine Jobs gespeichert.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}