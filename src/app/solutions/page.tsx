import Link from "next/link";
import { listSolutions } from "@/lib/data";

export const revalidate = 0;

export const metadata = {
  title: "Solutions — Solution Desk",
  description:
    "Every solution in the wiki, with its summary, type and tags. Open one to see how it connects to categories, fields and related work.",
  openGraph: {
    title: "Solutions — Solution Desk",
    description: "Every solution in the Solution Desk knowledge graph.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — Solution Desk",
    description: "Every solution in the Solution Desk knowledge graph.",
  },
};

export default async function SolutionsPage() {
  const solutions = await listSolutions();

  return (
    <main className="container mx-auto max-w-4xl space-y-8 px-4 py-14 sm:px-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Solutions
        </h1>
        <p className="text-muted-foreground">
          {solutions.length} write-ups, each linked into the graph.
        </p>
      </header>

      <ul className="space-y-4">
        {solutions.map((s) => (
          <li key={s.id}>
            <Link
              href={`/solutions/${s.slug}`}
              className="block rounded-xl border border-border p-5 transition hover:border-primary/60 hover:bg-secondary/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  {s.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              {s.tags.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </p>
              )}
            </Link>
          </li>
        ))}
        {solutions.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No solutions yet. Add the first one in the admin portal.
          </li>
        )}
      </ul>
    </main>
  );
}
