"use client";

import React, { useState } from "react";
import { SolutionFinderModal } from "./SolutionFinderModal";
import { ServiceItem } from "../data/mock-data";
import { Sparkles, ArrowRight, HelpCircle, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface RecommendationSectionProps {
  onSelectRecommendedService: (service: ServiceItem) => void;
}

export function RecommendationSection({
  onSelectRecommendedService,
}: RecommendationSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
            {/* Background ambient accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading & Copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-semibold">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Interactive Guidance</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Tell Us Your Goal.{" "}
                  <span className="text-blue-400">
                    We&apos;ll Help You Find the Right Solution.
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                  You don&apos;t need technical expertise or the formal industry names for software frameworks. Simply describe what your business wants to accomplish, and we will structure the ideal service plan.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Find My Solution</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-slate-400 text-center sm:text-left">
                    Takes under 60 seconds • Instant recommendation
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Quick Scenarios */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Common Business Starting Points
                </p>

                <div
                  onClick={() => setModalOpen(true)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Zap className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        &ldquo;We need to turn our idea into an MVP&rdquo;
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 pl-11">
                    Matched to Web & Mobile App Development with rapid wireframing.
                  </p>
                </div>

                <div
                  onClick={() => setModalOpen(true)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        &ldquo;We want to automate manual spreadsheets&rdquo;
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 pl-11">
                    Matched to Workflow Integration, AI data extraction, and CRM APIs.
                  </p>
                </div>

                <div
                  onClick={() => setModalOpen(true)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        &ldquo;We need to pass an enterprise security review&rdquo;
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 pl-11">
                    Matched to Cybersecurity posture audit and SOC 2 readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Recommender */}
      <SolutionFinderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectRecommendedService={onSelectRecommendedService}
      />
    </>
  );
}

