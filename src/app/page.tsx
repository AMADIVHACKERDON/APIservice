import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import DiamondGraph from "@/components/graph/diamond-graph";
import { getFullGraph, listCategories, listSolutions } from "@/lib/data";

export const revalidate = 0;

export const metadata = {
  title: "Kindling — A living map of solutions",
  description:
    "Browse an interconnected knowledge graph of solutions, categories and fields. Click any node to read the full write-up.",
  openGraph: {
    title: "Kindling — A living map of solutions",
    description:
      "Browse an interconnected knowledge graph of solutions, categories and fields.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kindling — A living map of solutions",
    description:
      "Browse an interconnected knowledge graph of solutions, categories and fields.",
  },
};

export default async function HomePage() {
  const [graph, solutions, categories] = await Promise.all([
    getFullGraph(),
    listSolutions(),
    listCategories(),
  ]);

  return (
    <main className="container mx-auto space-y-16 px-4 py-14 sm:px-6">
      <section className="max-w-3xl space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <Network className="size-3.5" /> Solution wiki
        </span>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Every solution, connected to the ones around it.
        </h1>
        <p className="text-lg text-muted-foreground">
          Kindling maps solutions, the categories they belong to and the fields
          they touch. Click any diamond to open its write-up and re-centre the
          graph on what it connects to.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Browse solutions <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            Categories &amp; fields
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              The graph
            </h2>
            <p className="text-sm text-muted-foreground">
              {graph.nodes.length} nodes · {graph.edges.length} connections —
              drag to pan, scroll the controls to zoom, click to open.
            </p>
          </div>
        </div>
        <DiamondGraph data={graph} height={620} />
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Latest solutions
          </h2>
          <ul className="space-y-3">
            {solutions.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="block rounded-xl border border-border p-4 transition hover:border-primary/60 hover:bg-secondary/40"
                >
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {s.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Categories &amp; fields
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm transition hover:border-primary/60 hover:bg-secondary"
              >
                {c.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  {c.kind}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
