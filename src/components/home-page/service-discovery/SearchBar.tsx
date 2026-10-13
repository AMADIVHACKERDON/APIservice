"use client";

import React from "react";
import { Search, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSelectSuggestion: (suggestion: string) => void;
}

const POPULAR_SUGGESTIONS = [
  "Next.js & Web",
  "AI & ML",
  "UI/UX Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "E-commerce",
  "Automation",
];

export function SearchBar({
  query,
  onQueryChange,
  onSelectSuggestion,
}: SearchBarProps) {
  return (
    <div className="w-full space-y-3">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="What do you need help with? (e.g., Web App, AI integration, Cloud DevOps, UI/UX...)"
          className="w-full pl-12 pr-12 py-4 bg-white text-slate-900 placeholder:text-slate-400 text-base rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Clear search query"
          >
            <div className="bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors">
              <X className="h-4 w-4" />
            </div>
          </button>
        )}
      </div>

      {/* Popular suggestions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          Popular searches:
        </span>
        {POPULAR_SUGGESTIONS.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectSuggestion(tag)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 rounded-lg transition-colors cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

