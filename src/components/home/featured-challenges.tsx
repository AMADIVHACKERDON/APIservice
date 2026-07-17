import Link from "next/link";

interface Props {
  challenges: any[];
}

export default function FeaturedChallenges({ challenges }: Props) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">
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
            className="group flex flex-col rounded-3xl border border-border bg-card p-6 text-left shadow-sm transition hover:border-primary/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <h3 className="font-display text-xl font-semibold transition group-hover:text-primary">
              {challenge.title}
            </h3>

            <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
              {challenge.summary}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {challenge.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
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
