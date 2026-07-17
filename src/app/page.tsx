import {
  CTA,
  FeaturedChallenges,
  Hero,
  HowItWorks,
  LatestChallenges,
} from "@/components/home";
import {
  getFeaturedChallenges,
  getPublishedChallenges,
} from "@/lib/queries/challenges";

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    getFeaturedChallenges(),
    getPublishedChallenges(),
  ]);

  return (
    <main className="container mx-auto px-4 py-16 space-y-20">
      <Hero />

      <section className="space-y-16">
        <FeaturedChallenges challenges={featured} />

        <div>
          <div className="mb-6 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Challenges
            </h2>
            <p className="mt-3 text-muted-foreground">
              Discover the newest problems the community is discussing.
            </p>
          </div>

          <LatestChallenges challenges={latest.slice(0, 6)} />
        </div>
      </section>

      <HowItWorks />
      <CTA />
    </main>
  );
}
