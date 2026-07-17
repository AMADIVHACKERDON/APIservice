import {
  submitChallenge,
} from "@/actions/challenge-submissions";
  
  export default function SubmitChallengeForm() {
    return (
      <form
        action={submitChallenge}
        className="space-y-5 border border-[#101820] bg-white/70 p-6 shadow-[6px_6px_0_#101820] sm:p-8"
      >
  
        <input
          name="title"
          required
          placeholder="Problem title"
          className="w-full rounded-none border p-3"
        />
  
  
        <textarea
          name="description"
          required
          placeholder="Describe the problem..."
          rows={6}
          className="w-full rounded-none border p-3"
        />
  
  
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-none border p-3"
        />
  
  
        <input
          name="email"
          required
          type="email"
          placeholder="Your email"
          className="w-full rounded-none border p-3"
        />
  
  
        <button
          type="submit"
          className="bg-[#101820] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primary"
        >
          Submit Challenge
        </button>
  
      </form>
    );
  }
