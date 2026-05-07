"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [shiftModel, setShiftModel] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert("Button wurde geklickt");

    const { error } = await supabase.from("jobs").insert([
      {
        job_title: jobTitle,
        location: location,
        shift_model: shiftModel,
        video_url: videoUrl,
        description: description,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Fehler beim Speichern");
      return;
    }

    alert("Job erfolgreich gespeichert!");

    setJobTitle("");
    setLocation("");
    setShiftModel("");
    setVideoUrl("");
    setDescription("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900">
          Neuen Job erstellen
        </h1>

        <p className="mt-2 text-gray-600">
          Erstelle eine Tätigkeitsvorschau für Bewerber.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jobtitel
            </label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={shiftModel}
              onChange={(e) => setShiftModel(e.target.value)}
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
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tätigkeitsbeschreibung
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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