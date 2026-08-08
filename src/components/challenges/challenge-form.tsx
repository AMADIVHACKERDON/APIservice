"use client";

import { useMemo, useState } from "react";

import {
  CATEGORIES,
  DIFFICULTIES,
  ESTIMATED_IMPACTS,
  STATUSES,
} from "@/lib/constants";

import type { ChallengeFormProps } from "./types";

const inputClass =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

const selectClass =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ChallengeForm({
  mode,
  challenge,
  subcategories,
  action,
}: ChallengeFormProps) {
  const [category, setCategory] = useState(
    challenge?.category ?? "software"
  );

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (subcategory) => subcategory.category === category
    );
  }, [category, subcategories]);

  return (
    <form action={action} className="max-w-4xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={challenge?.title}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="summary" className="text-sm font-medium">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          defaultValue={challenge?.summary}
          rows={3}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Markdown Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={challenge?.content}
          rows={18}
          required
          className={`${inputClass} font-mono`}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof CATEGORIES)[number])
          }
          className={selectClass}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="subcategoryId" className="text-sm font-medium">
          Subcategory
        </label>
        <select
          id="subcategoryId"
          name="subcategoryId"
          defaultValue={challenge?.subcategoryId ?? ""}
          className={selectClass}
        >
          <option value="">None</option>
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="difficulty" className="text-sm font-medium">
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          defaultValue={challenge?.difficulty ?? "medium"}
          className={selectClass}
        >
          {DIFFICULTIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="estimatedImpact" className="text-sm font-medium">
          Estimated Impact
        </label>
        <select
          id="estimatedImpact"
          name="estimatedImpact"
          defaultValue={challenge?.estimatedImpact ?? "local"}
          className={selectClass}
        >
          {ESTIMATED_IMPACTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={challenge?.status ?? "open"}
          className={selectClass}
        >
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={challenge?.tags.join(", ")}
          placeholder="ai, networking, telecom"
          className={inputClass}
        />
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={challenge?.featured}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={challenge?.published}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        {mode === "create" ? "Create Challenge" : "Update Challenge"}
      </button>
    </form>
  );
}
