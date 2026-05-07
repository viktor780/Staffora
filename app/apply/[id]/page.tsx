"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Job = {
  id: number;
  job_title: string;
  location: string | null;
  video_url: string | null;
  description: string | null;
};

export default function ApplyPage() {
  const params = useParams();
  const jobId = Number(params.id);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-300 bg-white p-3 text-base text-gray-900 placeholder-gray-500 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-300";

  useEffect(() => {
    async function loadJob() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      setJob(data);
      setLoading(false);
    }

    loadJob();
  }, [jobId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("candidates").insert([
      {
        job_id: jobId,
        name,
        phone,
        email,
        availability,
        experience,
        message,
      },
    ]);

    if (error) {
      alert("Fehler beim Absenden: " + error.message);
      return;
    }

    alert("Danke! Deine Angaben wurden übermittelt.");

    setName("");
    setPhone("");
    setEmail("");
    setAvailability("");
    setExperience("");
    setMessage("");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-gray-900 shadow md:p-8">
          Lade Job...
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-100 p-4 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow md:p-8">
          <h1 className="text-2xl font-bold text-red-600">
            Job nicht gefunden
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <p className="mb-4 text-sm font-medium text-gray-600">
          Tätigkeitsvorschau #{job.id}
        </p>

        <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">
          {job.job_title}
        </h1>

        <p className="mt-2 text-base text-gray-800">
          Einsatzort: {job.location}
        </p>

        <div className="mt-7 md:mt-8">
          <h2 className="text-lg font-semibold text-gray-950 md:text-xl">
            Was dich erwartet
          </h2>

          <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-gray-800">
            {job.description || "Keine Beschreibung hinterlegt."}
          </p>
        </div>

        {job.video_url && (
          <div className="mt-7 md:mt-8">
            <a
              href={job.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800 md:inline-block"
            >
              Video ansehen
            </a>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-gray-50 p-5 md:mt-10 md:p-6">
          <h2 className="text-lg font-semibold text-gray-950 md:text-xl">
            Interesse?
          </h2>

          <p className="mt-2 text-base leading-relaxed text-gray-800">
            Fülle kurz deine Daten aus. Die Zeitarbeitsfirma meldet sich danach bei dir.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Name *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Dein Name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Telefonnummer
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="z. B. 0176..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="deine@email.de"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Ab wann bist du verfügbar?
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className={inputClass}
                placeholder="z. B. sofort, ab nächster Woche"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Hast du Erfahrung in dieser Tätigkeit?
              </label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={`${inputClass} min-h-24`}
                placeholder="Kurz beschreiben..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Nachricht
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} min-h-24`}
                placeholder="Optional"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 md:w-auto"
            >
              Interesse senden
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}