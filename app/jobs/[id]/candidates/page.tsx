import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CandidatesPage({ params }: PageProps) {
  const { id } = await params;

  const jobId = Number(id);

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();

  const { data: candidates, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-gray-200 p-4 md:p-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
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
    <main className="min-h-screen bg-gray-200 p-4 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700">
            Bewerberübersicht
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-950 md:text-4xl">
            {job?.job_title || "Job"}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-gray-700 md:text-lg">
            Bewerber für diesen Einsatz
          </p>
        </div>

        <div className="space-y-5 md:space-y-6">
          {candidates && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md md:p-7"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-950 md:text-2xl">
                      {candidate.name}
                    </h2>

                    <p className="mt-2 text-base text-gray-800">
                      {candidate.phone || "Keine Telefonnummer"}
                    </p>

                    <p className="text-base text-gray-800">
                      {candidate.email || "Keine E-Mail"}
                    </p>
                  </div>

                  <div className="w-fit rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
                    ID #{candidate.id}
                  </div>
                </div>

                <div className="mt-7 grid gap-5 md:mt-8 md:grid-cols-2 md:gap-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600">
                      Verfügbarkeit
                    </h3>

                    <p className="mt-2 text-base leading-relaxed text-gray-900 md:mt-3">
                      {candidate.availability || "-"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600">
                      Erfahrung
                    </h3>

                    <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-gray-900 md:mt-3">
                      {candidate.experience || "-"}
                    </p>
                  </div>
                </div>

                {candidate.message && (
                  <div className="mt-7 md:mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600">
                      Nachricht
                    </h3>

                    <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-gray-900 md:mt-3">
                      {candidate.message}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white p-6 text-base text-gray-800 shadow-md md:p-8 md:text-lg">
              Noch keine Bewerber vorhanden.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}