"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md border bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-900"
    >
      {pending ? "Posting..." : "Post Comment"}
    </button>
  );
}

interface CommentFormProps {
  action: (formData: FormData) => Promise<void>;
}

export default function CommentForm({
  action,
}: CommentFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
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
          className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
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
          className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
