import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DiamondGraph from "@/components/graph/diamond-graph";
import { getCategoryBySlug } from "@/lib/data";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getCategoryBySlug(slug);
  if (!detail) return { title: "Category not found — Kindling" };
  const { name, description, kind } = detail.category;
  const desc =
    description ?? `Solutions and neighbouring topics linked to the ${name} ${kind}.`;
  return {
    title: `${name} — Kindling`,
    description: desc.slice(0, 155),
    openGraph: { title: name, description: desc.slice(0, 155), type: "website" },
    twitter: { card: "summary_large_image", title: name, description: desc.slice(0, 155) },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = await getCategoryBySlug(slug);
  if (!detail) notFound();

  const { category, solutions, relatedCategories, graph } = detail;

  return (
    <main className="container mx-auto space-y-10 px-4 py-12 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/categories" className="hover:text-foreground">
          Categories
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="space-y-3">
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
          {category.kind}
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="max-w-2xl text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </header>

      <DiamondGraph data={graph} focusId={`c:${category.id}`} height={460} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <h2 className="font-display text-xl font-semibold">
            Solutions in this {category.kind}
          </h2>
          <ul className="space-y-3">
            {solutions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="block rounded-xl border border-border p-4 transition hover:border-primary/60 hover:bg-secondary/40"
                >
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
                </Link>
              </li>
            ))}
            {solutions.length === 0 && (
              <li className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                Nothing linked here yet.
              </li>
            )}
          </ul>
        </section>

        <aside className="space-y-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Similar / linked topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedCategories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm transition hover:border-primary/60 hover:bg-secondary"
              >
                {c.name}
              </Link>
            ))}
            {relatedCategories.length === 0 && (
              <p className="text-sm text-muted-foreground">No links yet.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
