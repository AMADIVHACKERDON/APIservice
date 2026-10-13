"use client";

import React from "react";
import { CaseStudyItem } from "../data/mock-data";
import { ArrowRight, Building, TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
  onReadCaseStudy: (item: CaseStudyItem) => void;
}

export function CaseStudyCard({
  caseStudy,
  onReadCaseStudy,
}: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between card-hover">
      <div>
        {/* Industry Pill & Client */}
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
            {caseStudy.industry}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            {caseStudy.client}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight leading-snug">
          {caseStudy.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Outcome Metric Callout */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 font-mono">
              {caseStudy.outcome_metric}
            </div>
            <div className="text-[11px] font-medium text-slate-500 line-clamp-1">
              {caseStudy.outcome_label}
            </div>
          </div>
        </div>

        {/* Disciplines Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {caseStudy.services.map((svc, i) => (
            <span
              key={i}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => onReadCaseStudy(caseStudy)}
          className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
        >
          <span>Read Case Study</span>
          <ArrowRight className="h-3.5 w-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

