"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
    >
      {pending ? "Posting..." : "Post Comment"}
    </button>
  );
}

interface CommentFormProps {
  action: (formData: FormData) => Promise<void>;
}

export default function CommentForm({ action }: CommentFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          Your name
        </label>

        <input
          id="author"
          name="author"
          placeholder="e.g. Maya"
          required
          className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium">
          Comment
        </label>

        <textarea
          id="content"
          name="content"
          placeholder="Share your perspective or a possible next step."
          rows={5}
          required
          className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
