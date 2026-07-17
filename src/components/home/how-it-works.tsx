export default function HowItWorks() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          How it works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Discover, discuss, and collaborate on meaningful challenges.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-display font-semibold">1. Discover</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore problems with clear impact and focus.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-display font-semibold">2. Discuss</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Share insight, ask questions, and spark ideas.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-display font-semibold">3. Collaborate</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Connect with contributors and move solutions forward.
          </p>
        </div>
      </div>
    </section>
  );
}
