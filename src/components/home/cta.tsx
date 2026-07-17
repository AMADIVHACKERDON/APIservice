import Link from "next/link";

export default function CTA() {
  return (
    <section className="rounded-3xl border bg-slate-50 p-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        Have a problem worth solving?
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Share your challenge so the community can help turn it into a real solution.
      </p>
      <Link
        href="/submit-challenge"
        className="mt-6 inline-flex justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
      >
        Submit Challenge
      </Link>
    </section>
  );
}
