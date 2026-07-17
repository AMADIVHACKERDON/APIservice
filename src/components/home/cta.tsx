import Link from "next/link";

export default function CTA() {
  return (
    <section className="rounded-3xl border border-border bg-secondary p-10 text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Have a problem worth solving?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Share your challenge so the community can help turn it into a real
        solution.
      </p>
      <Link
        href="/submit-challenge"
        className="mt-6 inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        Submit Challenge
      </Link>
    </section>
  );
}
