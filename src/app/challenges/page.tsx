import { ChallengeList } from "@/components/challenges";
import { getPublishedChallenges } from "@/lib/queries/challenges";

export default async function ChallengesPage() {
  const challenges = await getPublishedChallenges();

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 max-w-3xl border-l-4 border-primary pl-5">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">Open index / 01</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Open Challenges
        </h1>

        <p className="mt-2 text-muted-foreground">
          Real problems looking for real builders.
        </p>
      </div>

      <ChallengeList
        challenges={challenges}
      />
    </main>
  );
}
