import Link from "next/link";

interface Props {
  challenges: any[];
}

export default function FeaturedChallenges({
  challenges,
}: Props) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Challenges
          </h2>
          <p className="text-muted-foreground">
            Problems chosen for immediate impact and teamwork.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((challenge) => (
          <Link
            key={challenge.id}
            href={`/challenges/${challenge.slug}`}
            className="group rounded-3xl border bg-white p-6 text-left transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <h3 className="text-xl font-semibold transition group-hover:text-primary">
              {challenge.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-muted-foreground line-clamp-4">
              {challenge.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {challenge.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
