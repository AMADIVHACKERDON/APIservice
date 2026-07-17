import Link from "next/link";

import type { Challenge } from "./types";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <article className="group border border-border bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <span>{challenge.category}</span>

        <span>•</span>

        <span>{challenge.difficulty}</span>

        <span>•</span>

        <span>{challenge.estimatedImpact}</span>
      </div>

      <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
        <Link
          className="transition group-hover:text-primary"
          href={`/challenges/${challenge.slug}`}
        >
          {challenge.title}
        </Link>
      </h2>

      <p className="mt-4 max-w-3xl leading-7 text-muted-foreground line-clamp-3">
        {challenge.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {challenge.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border bg-secondary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
