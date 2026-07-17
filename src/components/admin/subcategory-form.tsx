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
      className="rounded-md border px-4 py-2"
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
      className="space-y-4 rounded-lg border p-6"
    >
      <h2 className="text-2xl font-bold">
        {subcategory
          ? "Edit Subcategory"
          : "New Subcategory"}
      </h2>

      <input
        name="name"
        required
        placeholder="Name"
        defaultValue={subcategory?.name}
        className="w-full rounded-md border p-2"
      />

      <select
        name="category"
        defaultValue={
          subcategory?.category ?? "software"
        }
        className="w-full rounded-md border p-2"
      >
        <option value="software">
          Software
        </option>

        <option value="hardware">
          Hardware
        </option>

        <option value="hybrid">
          Hybrid
        </option>
      </select>

      <textarea
        name="description"
        rows={4}
        placeholder="Description"
        defaultValue={
          subcategory?.description ?? ""
        }
        className="w-full rounded-md border p-2"
      />

      <SubmitButton
        editing={!!subcategory}
      />
    </form>
  );
}