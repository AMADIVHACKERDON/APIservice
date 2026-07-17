"use client";

import { useMemo, useState } from "react";

import {
  CATEGORIES,
  DIFFICULTIES,
  ESTIMATED_IMPACTS,
  STATUSES,
} from "@/lib/constants";

import type { ChallengeFormProps } from "./types";

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
    <form
      action={action}
      className="space-y-6 max-w-4xl"
    >
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          defaultValue={challenge?.title}
          required
          className="w-full rounded border p-2"
        />
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <label htmlFor="summary">
          Summary
        </label>

        <textarea
          id="summary"
          name="summary"
          defaultValue={challenge?.summary}
          rows={3}
          required
          className="w-full rounded border p-2"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label htmlFor="content">
          Markdown Content
        </label>

        <textarea
          id="content"
          name="content"
          defaultValue={challenge?.content}
          rows={18}
          required
          className="w-full rounded border p-2 font-mono"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof CATEGORIES)[number])
          }
          className="w-full rounded border p-2"
        >
          {CATEGORIES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div className="space-y-2">
        <label htmlFor="subcategoryId">
          Subcategory
        </label>

        <select
          id="subcategoryId"
          name="subcategoryId"
          defaultValue={
            challenge?.subcategoryId ?? ""
          }
          className="w-full rounded border p-2"
        >
          <option value="">
            None
          </option>

          {filteredSubcategories.map(
            (subcategory) => (
              <option
                key={subcategory.id}
                value={subcategory.id}
              >
                {subcategory.name}
              </option>
            )
          )}
        </select>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <label htmlFor="difficulty">
          Difficulty
        </label>

        <select
          id="difficulty"
          name="difficulty"
          defaultValue={
            challenge?.difficulty ?? "medium"
          }
          className="w-full rounded border p-2"
        >
          {DIFFICULTIES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Estimated Impact */}
      <div className="space-y-2">
        <label htmlFor="estimatedImpact">
          Estimated Impact
        </label>

        <select
          id="estimatedImpact"
          name="estimatedImpact"
          defaultValue={
            challenge?.estimatedImpact ??
            "local"
          }
          className="w-full rounded border p-2"
        >
          {ESTIMATED_IMPACTS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label htmlFor="status">
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={
            challenge?.status ?? "open"
          }
          className="w-full rounded border p-2"
        >
          {STATUSES.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label htmlFor="tags">
          Tags
        </label>

        <input
          id="tags"
          name="tags"
          defaultValue={
            challenge?.tags.join(", ")
          }
          placeholder="ai, networking, telecom"
          className="w-full rounded border p-2"
        />
      </div>

      {/* Settings */}
      <div className="flex gap-8">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={
              challenge?.featured
            }
          />

          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={
              challenge?.published
            }
          />

          Published
        </label>

      </div>

      <button
        type="submit"
        className="rounded border px-4 py-2"
      >
        {mode === "create"
          ? "Create Challenge"
          : "Update Challenge"}
      </button>
    </form>
  );
}