import Link from "next/link";

import DeleteChallengeButton from "./delete-button";
import { getChallenges } from "@/lib/queries/challenges";

export default async function ChallengesAdminPage() {

  const result =
    await getChallenges();

  const challenges =
    result.data ?? [];


  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Challenges
        </h1>


        <Link
          href="/admin/challenges/new"
          className="border px-4 py-2 rounded"
        >
          New Challenge
        </Link>

      </div>


      <div className="space-y-4">

        {challenges.length === 0 && (
          <p>
            No challenges created yet.
          </p>
        )}


        {challenges.map((challenge: { id: string; title: string; category: string; status: string }) => (

          <div
            key={challenge.id}
            className="border p-4 rounded"
          >

            <h2 className="font-semibold">
              {challenge.title}
            </h2>


            <p className="text-sm">
              {challenge.category}
              {" • "}
              {challenge.status}
            </p>


            <div className="mt-3 flex gap-4">

              <Link
                href={`/admin/challenges/${challenge.id}/edit`}
              >
                Edit
              </Link>

              <DeleteChallengeButton
                id={challenge.id}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}