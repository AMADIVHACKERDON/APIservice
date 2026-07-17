import {
  Hero,
  FeaturedChallenges,
  LatestChallenges,
  HowItWorks,
  CTA,
} from "@/components/home";

import {
  getFeaturedChallenges,
  getLatestChallenges,
} from "@/lib/queries/challenges";

export default async function HomePage() {
  const [
    featured,
    latest,
  ] = await Promise.all([
    getFeaturedChallenges(),
    getLatestChallenges(),
  ]);

  return (
    <main className="space-y-24">

      <Hero />

      <FeaturedChallenges
        challenges={featured}
      />

      <LatestChallenges
        challenges={latest}
      />

      <HowItWorks />

      <CTA />

    </main>
  );
}