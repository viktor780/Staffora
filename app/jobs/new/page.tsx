"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-300 bg-white p-3 text-base text-gray-900 placeholder-gray-500 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-300";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("jobs").insert([
      {
        job_title: jobTitle,
        location: location,
        video_url: videoUrl,
        description: description,
      },
    ]);

    if (error) {
      alert("Fehler beim Speichern: " + error.message);
      return;
    }

    alert("Job erfolgreich gespeichert!");

    setJobTitle("");
    setLocation("");
    setVideoUrl("");
    setDescription("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-lg md:p-8">
        <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">
          Neuen Job erstellen
        </h1>

        <p className="mt-3 text-base leading-relaxed text-gray-700">
          Erstelle eine Tätigkeitsvorschau für Bewerber.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5 md:mt-8 md:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Jobtitel
            </label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="z. B. Kommissionierer Frühschicht"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Einsatzort
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="z. B. Kleinostheim"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Video-Link
            </label>

            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Tätigkeitsbeschreibung
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibe kurz die Tätigkeit"
              className={`${inputClass} min-h-32`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 md:w-auto"
          >
            Job speichern
          </button>
        </form>
      </div>
    </main>
  );
}