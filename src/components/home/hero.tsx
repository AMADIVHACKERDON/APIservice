import Link from "next/link";

export default function Hero() {
  return (
    <section className="space-y-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
        Built for collaborative problem solving
      </p>

      <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl">
        Find problems.
        <br />
        Build solutions.
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        A platform where real-world problems are shared, discussed, and solved
        collaboratively.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/challenges"
          className="inline-flex rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground shadow-sm transition hover:bg-secondary"
        >
          Explore Challenges
        </Link>

        <Link
          href="/submit-challenge"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Submit Problem
        </Link>
      </div>
    </section>
  );
}
