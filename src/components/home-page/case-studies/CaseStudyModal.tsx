"use client";

import React from "react";
import { CaseStudyItem } from "../data/mock-data";
import { X, ArrowRight, Building, CheckCircle2, TrendingUp, Cpu } from "lucide-react";

interface CaseStudyModalProps {
  caseStudy: CaseStudyItem | null;
  onClose: () => void;
  onStartSimilarProject: () => void;
}

export function CaseStudyModal({
  caseStudy,
  onClose,
  onStartSimilarProject,
}: CaseStudyModalProps) {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Building className="h-3.5 w-3.5" />
              <span>{caseStudy.client} • {caseStudy.industry}</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {caseStudy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Measurable Outcome Highlight */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-600 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900 block font-mono">
                  {caseStudy.outcome_metric}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {caseStudy.outcome_label}
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200">
              Verified Result
            </span>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                The Engineering Challenge
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Delivered Solution
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Disciplines Involved */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Disciplines Involved
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.services.map((svc, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  {svc}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-slate-400" />
              Technology Stack Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject();
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start a Similar Project</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

