"use client";

import React from "react";
import {
  Globe,
  ShieldCheck,
  Wifi,
  Bot,
  BarChart3,
  Sparkles,
  Layers,
  LayoutGrid,
} from "lucide-react";

export type CategoryFilterType =
  | "All"
  | "Web Development"
  | "Cybersecurity"
  | "IoT"
  | "Robotics"
  | "ML"
  | "AI"
  | "Hardware";

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
  counts: Record<CategoryFilterType, number>;
}

interface CategoryMeta {
  type: CategoryFilterType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryMeta[] = [
  { type: "All", label: "All 7 Fields", icon: LayoutGrid },
  { type: "Web Development", label: "Web Development", icon: Globe },
  { type: "Cybersecurity", label: "Cybersecurity", icon: ShieldCheck },
  { type: "IoT", label: "IoT", icon: Wifi },
  { type: "Robotics", label: "Robotics", icon: Bot },
  { type: "ML", label: "ML", icon: BarChart3 },
  { type: "AI", label: "AI", icon: Sparkles },
  { type: "Hardware", label: "Hardware", icon: Layers },
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map(({ type, label, icon: Icon }) => {
        const isActive = selectedCategory === type;
        const count = counts[type] || 0;

        return (
          <button
            key={type}
            onClick={() => onSelectCategory(type)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-1 ring-slate-900"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600"
              }`}
            />
            <span>{label}</span>
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
