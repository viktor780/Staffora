"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ApplyPage({ params }: PageProps) {
  const [job, setJob] = useState<any>(null);
  const [jobId, setJobId] = useState<number | null>(null);

  useEffect(() => {
    async function loadJob() {
      const resolvedParams = await params;
      const id = Number(resolvedParams.id);

      setJobId(id);

      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      setJob(data);
    }

    loadJob();
  }, [params]);

  async function sendResponse(type: string) {
    if (!jobId) return;

    const { error } = await supabase
      .from("job_responses")
      .insert([
        {
          job_id: jobId,
          response_type: type,
        },
      ]);

    if (error) {
      alert("Fehler beim Senden");
      return;
    }

    if (type === "interested") {
      alert("Danke! Dein Interesse wurde übermittelt.");
    }

    if (type === "not_interested") {
      alert("Danke für deine Rückmeldung.");
    }

    if (type === "more_info") {
      alert("Der Recruiter wird sich mit weiteren Informationen melden.");
    }
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-100 p-6 md:p-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">
          <p className="text-lg text-gray-700">
            Tätigkeit wird geladen...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg md:p-12">

        <p className="text-sm font-medium text-gray-500">
          Tätigkeitsvorschau #{job.id}
        </p>

        <h1 className="mt-3 text-4xl font-bold text-gray-950">
          {job.job_title}
        </h1>

        <p className="mt-4 text-xl text-gray-800">
          Einsatzort: {job.location}
        </p>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-950">
            Was dich erwartet
          </h2>

          <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-800">
            {job.description || "Keine Beschreibung hinterlegt."}
          </p>

          {job.video_url && (
            <div className="mt-8">
              <a
                href={job.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-black px-6 py-4 text-lg font-medium text-white transition hover:bg-gray-800"
              >
                Video ansehen
              </a>
            </div>
          )}
        </div>

        <div className="mt-14 rounded-3xl bg-gray-50 p-8 md:p-10">

          <h2 className="text-3xl font-bold text-gray-950">
            Ist diese Tätigkeit interessant für dich?
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Schau dir die Tätigkeitsbeschreibung und das Video in Ruhe an
            und gib anschließend kurz deine Rückmeldung.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <button
              onClick={() => sendResponse("interested")}
              className="rounded-2xl bg-black px-6 py-5 text-lg font-semibold text-white transition hover:bg-gray-800"
            >
              Interessiert
            </button>

            <button
              onClick={() => sendResponse("more_info")}
              className="rounded-2xl border border-gray-300 bg-white px-6 py-5 text-lg font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Mehr Infos
            </button>

            <button
              onClick={() => sendResponse("not_interested")}
              className="rounded-2xl border border-gray-300 bg-white px-6 py-5 text-lg font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Nicht interessant
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}