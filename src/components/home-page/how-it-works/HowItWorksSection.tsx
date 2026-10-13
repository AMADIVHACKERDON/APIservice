"use client";

import React from "react";
import { HOW_IT_WORKS_STEPS } from "../data/mock-data";
import { StepCard } from "./StepCard";
import { Workflow, ArrowRight } from "lucide-react";

interface HowItWorksSectionProps {
  onOpenProjectModal: () => void;
}

export function HowItWorksSection({ onOpenProjectModal }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-white border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Workflow className="h-3.5 w-3.5" />
            Clear Engagement Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Move from a high-level business goal to a clear project brief and production delivery in four structured steps.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              highlight={item.highlight}
              iconName={item.iconName}
              isLast={index === HOW_IT_WORKS_STEPS.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA trigger */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenProjectModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <span>Start Step 1: Submit Your Project Brief</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

