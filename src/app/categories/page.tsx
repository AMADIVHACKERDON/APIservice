import Link from "next/link";
import { listCategories } from "@/lib/data";

export const revalidate = 0;

export const metadata = {
  title: "Categories & fields — Solution Desk",
  description:
    "Every category and field in the wiki. Each one collects the solutions that touch it and links to neighbouring topics.",
  openGraph: {
    title: "Categories & fields — Solution Desk",
    description: "Every category and field in the Solution Desk knowledge graph.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories & fields — Solution Desk",
    description: "Every category and field in the Solution Desk knowledge graph.",
  },
};

export default async function CategoriesPage() {
  const categories = await listCategories();
  const groups = [
    { kind: "category" as const, title: "Categories" },
    { kind: "field" as const, title: "Fields" },
  ];

  return (
    <main className="container mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Categories &amp; fields
        </h1>
        <p className="text-muted-foreground">
          The scaffolding that holds the graph together.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.kind} className="space-y-4">
          <h2 className="font-display text-xl font-semibold">{group.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories
              .filter((c) => c.kind === group.kind)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="rounded-xl border border-border p-4 transition hover:border-primary/60 hover:bg-secondary/40"
                >
                  <p className="font-medium">{c.name}</p>
                  {c.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  )}
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
