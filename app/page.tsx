export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-950">
          Staffora
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Real Job Preview für moderne Personalvermittlung.
        </p>

        <div className="mt-8">
          <a
            href="/jobs"
            className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Zur Jobübersicht
          </a>
        </div>
      </div>
    </main>
  );
}