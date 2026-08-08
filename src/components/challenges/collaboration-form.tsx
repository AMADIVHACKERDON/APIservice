"use client";

import { useFormStatus } from "react-dom";

interface CollaborationFormProps {
  action: (formData: FormData) => Promise<void>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
    >
      {pending ? "Submitting..." : "Request Collaboration"}
    </button>
  );
}

export default function CollaborationForm({
  action,
}: CollaborationFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <h2 className="font-display text-2xl font-bold">
          Collaborate on this challenge?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us how you&apos;d like to contribute.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <input
            id="role"
            name="role"
            placeholder="Backend Engineer"
            className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            placeholder="Optional"
            className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="intent" className="block text-sm font-medium">
          Why do you want to collaborate?
        </label>

        <select
          id="intent"
          name="intent"
          required
          className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select one</option>
          <option value="collaborate">I want to collaborate</option>
          <option value="idea">I have an idea</option>
          <option value="join">I want to join the team</option>
          <option value="sponsor">I want to sponsor</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
