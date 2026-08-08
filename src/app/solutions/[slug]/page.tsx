import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DiamondGraph from "@/components/graph/diamond-graph";
import { Markdown } from "@/components/markdown";
import { getSolutionBySlug } from "@/lib/data";
import type { Category, Solution } from "@/lib/graph-types";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getSolutionBySlug(slug);
  if (!detail) return { title: "Solution not found — Solution Desk" };
  const { title, summary } = detail.solution;
  return {
    title: `${title} — Solution Desk`,
    description: summary.slice(0, 155),
    openGraph: { title, description: summary.slice(0, 155), type: "article" },
    twitter: { card: "summary_large_image", title, description: summary.slice(0, 155) },
  };
}

function CategoryChips({ items }: { items: Category[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c) => (
        <Link
          key={c.id}
          href={`/categories/${c.slug}`}
          className="rounded-full border border-border px-3 py-1 text-sm transition hover:border-primary/60 hover:bg-secondary"
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}

function SolutionLinks({ items }: { items: Solution[] }) {
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s.id}>
          <Link
            href={`/solutions/${s.slug}`}
            className="block rounded-lg border border-border px-3 py-2 text-sm transition hover:border-primary/60 hover:bg-secondary/50"
          >
            <span className="font-medium">{s.title}</span>
            <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground">
              {s.summary}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = await getSolutionBySlug(slug);
  if (!detail) notFound();

  const {
    solution,
    categories,
    fields,
    relatedSolutions,
    relatedCategories,
    tagMatches,
    graph,
  } = detail;

  return (
    <main className="container mx-auto space-y-10 px-4 py-12 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/solutions" className="hover:text-foreground">
          Solutions
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{solution.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="space-y-8">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {solution.type}
              </span>
              {solution.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {solution.title}
            </h1>
            <p className="text-lg text-muted-foreground">{solution.summary}</p>
          </header>

          <Markdown content={solution.content} />

          <section className="space-y-4 rounded-2xl border border-border p-5">
            <h2 className="font-display text-lg font-semibold">
              Connections around this solution
            </h2>
            <DiamondGraph
              data={graph}
              focusId={`s:${solution.id}`}
              height={440}
            />
          </section>
        </article>

        <aside className="space-y-8">
          {categories.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </h2>
              <CategoryChips items={categories} />
            </section>
          )}

          {fields.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Linked fields
              </h2>
              <CategoryChips items={fields} />
            </section>
          )}

          {relatedCategories.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Similar categories
              </h2>
              <CategoryChips items={relatedCategories} />
            </section>
          )}

          {relatedSolutions.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Related solutions
              </h2>
              <SolutionLinks items={relatedSolutions} />
            </section>
          )}

          {tagMatches.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Shares tags with
              </h2>
              <SolutionLinks items={tagMatches} />
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
