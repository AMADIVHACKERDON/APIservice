import Link from "next/link";
import { getProblems } from "./actions";

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Problems</h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Browse real-world problems and practical solutions shared by the
          community.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {problems.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <h2 className="font-display text-xl font-semibold">
              No problems have been published yet.
            </h2>

            <p className="mt-2 text-muted-foreground">
              Check back later for new submissions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {problems.map((problem) => (
              <article
                key={problem.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                <Link href={`/problems/${problem.id}`}>
                  <h2 className="font-display text-2xl font-semibold transition hover:text-primary">
                    {problem.title}
                  </h2>
                </Link>

                <p className="mt-3 line-clamp-3 text-muted-foreground">
                  {problem.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span>👍 {problem.reactions.length}</span>
                  <span>💬 {problem.comments.length}</span>
                  <span>
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
