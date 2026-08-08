import SubmitChallengeForm from "@/components/challenges/submit-challenge-form";


export default function SubmitChallengePage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">

      <div className="border-l-4 border-primary pl-5">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">New field report</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Submit a Challenge
        </h1>

        <p className="text-muted-foreground">
          Share a problem that deserves attention.
        </p>
      </div>


      <SubmitChallengeForm />

    </main>
  );
}
