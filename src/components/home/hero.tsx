import Link from "next/link";

export default function Hero() {
  return (
    <section className="space-y-6 py-20 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-primary">
        Built for collaborative problem solving
      </p>

      <h1 className="text-5xl font-bold sm:text-6xl">
        Find problems.
        <br />
        Build solutions.
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        A platform where real-world problems are shared,
        discussed, and solved collaboratively.
      </p>

      <div className="flex justify-center flex-wrap gap-4">
        <Link
          href="/challenges"
          className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold transition hover:border-slate-300 hover:bg-slate-50"
        >
          Explore Challenges
        </Link>

        <Link
          href="/submit-challenge"
          className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Submit Problem
        </Link>
      </div>
    </section>
  );
}
