import ChallengeCard from "./challenge-card";
import type { Challenge } from "./types";

interface ChallengeListProps {
  challenges: Challenge[];
}

export default function ChallengeList({
  challenges,
}: ChallengeListProps) {
  return (
    <div className="grid gap-6">

      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
        />
      ))}

    </div>
  );
}