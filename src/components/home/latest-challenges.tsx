import FeaturedChallenges from "./featured-challenges";

export default function LatestChallenges({
  challenges,
}: {
  challenges: any[];
}) {
  return (
    <FeaturedChallenges
      challenges={challenges}
    />
  );
}