import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblemById } from "../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemPage({ params }: Props) {
  const { id } = await params;

  const problem = await getProblemById(id);

  if (!problem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            ProblemHub
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/problems" className="hover:text-blue-600">
              Problems
            </Link>

            <Link href="/contacts" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/problems"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Problems
        </Link>

        <article className="mt-6 rounded-xl border bg-white p-8">
          <h1 className="text-4xl font-bold">
            {problem.title}
          </h1>

          <div className="mt-4 flex gap-6 text-sm text-gray-500">
            <span>👍 {problem.reactions.length}</span>
            <span>💬 {problem.comments.length}</span>
            <span>
              {new Date(problem.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="prose mt-8 max-w-none whitespace-pre-wrap">
            {problem.summary}
          </div>
        </article>

        {/* Comments */}
        <section className="mt-10 rounded-xl border bg-white p-8">
          <h2 className="text-2xl font-semibold">
            Comments
          </h2>

          {problem.comments.length === 0 ? (
            <p className="mt-4 text-gray-500">
              No comments yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {problem.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border p-4"
                >
                  <p className="whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(
                      comment.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}