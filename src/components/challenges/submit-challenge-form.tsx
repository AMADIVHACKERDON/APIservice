import { submitChallenge } from "@/actions/challenge-submissions";

export default function SubmitChallengeForm() {
  return (
    <form
      action={submitChallenge}
      className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <input
        name="title"
        required
        placeholder="Problem title"
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <textarea
        name="description"
        required
        placeholder="Describe the problem..."
        rows={6}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <input
        name="email"
        required
        type="email"
        placeholder="Your email"
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Submit Challenge
      </button>
    </form>
  );
}
