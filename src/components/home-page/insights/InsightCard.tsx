"use client";

import React from "react";
import { InsightItem } from "../data/mock-data";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

interface InsightCardProps {
  insight: InsightItem;
  onReadArticle: (item: InsightItem) => void;
}

export function InsightCard({ insight, onReadArticle }: InsightCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between card-hover">
      <div>
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs mb-3.5">
          <span className="font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
            {insight.category}
          </span>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Clock className="h-3 w-3" />
            {insight.read_time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
          {insight.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {insight.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {insight.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Author & Footer Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs">
          <p className="font-bold text-slate-900">{insight.author.name}</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="h-3 w-3" />
            <span>{insight.published_at}</span>
          </div>
        </div>

        <button
          onClick={() => onReadArticle(insight)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
        >
          <span>Read</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

