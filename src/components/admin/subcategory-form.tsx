"use client";

import { useFormStatus } from "react-dom";

interface Props {
  subcategory?: {
    id: string;
    name: string;
    category: "software" | "hardware" | "hybrid";
    description: string | null;
  } | null;

  action: (formData: FormData) => Promise<void>;
}

function SubmitButton({
  editing,
}: {
  editing: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
    >
      {pending
        ? "Saving..."
        : editing
          ? "Update Subcategory"
          : "Create Subcategory"}
    </button>
  );
}

export default function SubcategoryForm({
  subcategory,
  action,
}: Props) {
  return (
    <form
      action={action}
      className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <h2 className="font-display text-2xl font-bold">
        {subcategory ? "Edit Subcategory" : "New Subcategory"}
      </h2>

      <input
        name="name"
        required
        placeholder="Name"
        defaultValue={subcategory?.name}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <select
        name="category"
        defaultValue={subcategory?.category ?? "software"}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="software">Software</option>
        <option value="hardware">Hardware</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <textarea
        name="description"
        rows={4}
        placeholder="Description"
        defaultValue={subcategory?.description ?? ""}
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <SubmitButton editing={!!subcategory} />
    </form>
  );
}
