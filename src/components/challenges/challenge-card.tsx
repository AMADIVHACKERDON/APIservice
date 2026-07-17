import Link from "next/link";

import type { Challenge } from "./types";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({
  challenge,
}: ChallengeCardProps) {
  return (
    <article className="group border border-[#c9ced2] bg-white/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-[#101820] hover:shadow-[6px_6px_0_#101820]">

      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">

        <span>{challenge.category}</span>

        <span>•</span>

        <span>{challenge.difficulty}</span>

        <span>•</span>

        <span>{challenge.estimatedImpact}</span>

      </div>

      <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
        <Link className="transition group-hover:text-primary" href={`/challenges/${challenge.slug}`}>
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
            className="border border-[#c9ced2] bg-[#f5f5f1] px-2 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wide"
          >
            #{tag}
          </span>
        ))}

      </div>

    </article>
  );
}
