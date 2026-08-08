import Link from "next/link";

import DeleteChallengeButton from "./delete-button";
import { getChallenges } from "@/lib/queries/challenges";

export default async function ChallengesAdminPage() {
  const result = await getChallenges();
  const challenges = result.data ?? [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Challenges</h1>

        <Link
          href="/admin/challenges/new"
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition hover:bg-secondary"
        >
          New Challenge
        </Link>
      </div>

      <div className="space-y-4">
        {challenges.length === 0 && (
          <p className="text-muted-foreground">
            No challenges created yet.
          </p>
        )}

        {challenges.map((challenge: { id: string; title: string; category: string; status: string }) => (
          <div
            key={challenge.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <h2 className="font-display font-semibold">
              {challenge.title}
            </h2>

            <p className="text-sm text-muted-foreground">
              {challenge.category}
              {" • "}
              {challenge.status}
            </p>

            <div className="mt-3 flex gap-4 text-sm">
              <Link
                href={`/admin/challenges/${challenge.id}/edit`}
                className="text-primary hover:underline"
              >
                Edit
              </Link>

              <DeleteChallengeButton id={challenge.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
