"use client";

import React, { useState } from "react";
import { FEATURED_CASE_STUDIES, CaseStudyItem } from "../data/mock-data";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { Briefcase, ArrowRight } from "lucide-react";

interface FeaturedCaseStudiesSectionProps {
  onStartSimilarProject: () => void;
}

export function FeaturedCaseStudiesSection({
  onStartSimilarProject,
}: FeaturedCaseStudiesSectionProps) {
  const [activeModalCase, setActiveModalCase] = useState<CaseStudyItem | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  const industries = ["All", "Financial Services", "Healthcare & MedTech", "Logistics & Transport", "B2B SaaS"];

  const filtered = selectedIndustry === "All"
    ? FEATURED_CASE_STUDIES
    : FEATURED_CASE_STUDIES.filter((c) => c.industry === selectedIndustry);

  return (
    <section id="case-studies" className="py-20 md:py-24 bg-white border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Briefcase className="h-3.5 w-3.5" />
              Proven Impact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Featured Case Studies
            </h2>
            <p className="text-base text-slate-600">
              Real-world engineering solutions delivering measurable uptime, speed, and business outcomes across diverse industries.
            </p>
          </div>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedIndustry === ind
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((cs) => (
            <CaseStudyCard
              key={cs.id}
              caseStudy={cs}
              onReadCaseStudy={(item) => setActiveModalCase(item)}
            />
          ))}
        </div>

        {/* Section Footer */}
        <div className="text-center pt-4">
          <button
            onClick={onStartSimilarProject}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer group"
          >
            <span>Have a similar challenge? Let&apos;s build your solution</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={activeModalCase}
        onClose={() => setActiveModalCase(null)}
        onStartSimilarProject={onStartSimilarProject}
      />
    </section>
  );
}

