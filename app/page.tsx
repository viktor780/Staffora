import "./globals.css";

export const metadata = {
  title: "Staffora",
  description: "Tätigkeitsvorschauen für bessere Bewerberauswahl.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-10">
            <a href="/jobs" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                S
              </div>

              <div>
                <p className="text-lg font-bold text-gray-950">
                  Staffora
                </p>
                <p className="text-xs font-medium text-gray-500">
                  Real Job Preview
                </p>
              </div>
            </a>

            <nav className="flex items-center gap-3">
              <a
                href="/jobs"
                className="text-sm font-medium text-gray-700 hover:text-gray-950"
              >
                Jobs
              </a>

              <a
                href="/jobs/new"
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Neuer Job
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}