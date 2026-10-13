"use client";

import React from "react";

export type CategoryFilterType =
  | "All"
  | "Development"
  | "Design"
  | "AI & Data"
  | "Infrastructure"
  | "Security"
  | "Strategy & Growth";

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
  counts: Record<CategoryFilterType, number>;
}

const CATEGORIES: CategoryFilterType[] = [
  "All",
  "Development",
  "Design",
  "AI & Data",
  "Infrastructure",
  "Security",
  "Strategy & Growth",
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        const count = counts[cat] || 0;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            <span>{cat}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive
                  ? "bg-slate-700 text-slate-200"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

