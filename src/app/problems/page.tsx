import Link from "next/link";
import { getProblems } from "./actions";

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            ProblemHub
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/problems" className="text-blue-600">
              Problems
            </Link>

            <Link href="/contacts" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold">Problems</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Browse real-world problems and practical solutions shared by the
          community.
        </p>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {problems.length === 0 ? (
          <div className="rounded-xl border bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No problems have been published yet.
            </h2>

            <p className="mt-2 text-gray-500">
              Check back later for new submissions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {problems.map((problem) => (
              <article
                key={problem.id}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <Link href={`/problems/${problem.id}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600">
                    {problem.title}
                  </h2>
                </Link>

                <p className="mt-3 line-clamp-3 text-gray-600">
                  {problem.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <span>👍 {problem.reactions.length}</span>
                  <span>💬 {problem.comments.length}</span>
                  <span>
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="font-medium text-blue-600 hover:underline"
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