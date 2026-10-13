"use client";

import React, { useState } from "react";
import { RECOMMENDATION_QUESTIONS, SERVICES_CATALOG, ServiceItem } from "../data/mock-data";
import { IconHelper } from "../ui/IconHelper";
import { X, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

interface SolutionFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedService: (service: ServiceItem) => void;
}

export function SolutionFinderModal({
  isOpen,
  onClose,
  onSelectRecommendedService,
}: SolutionFinderModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessType, setBusinessType] = useState<string>("startup");
  const [selectedGoal, setSelectedGoal] = useState<string>("web-app");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  if (!isOpen) return null;

  // Deterministic mock recommendation mapping
  const goalObj = RECOMMENDATION_QUESTIONS.goals.find((g) => g.id === selectedGoal);
  const matchedServiceId = goalObj?.serviceMatch || "web-dev";
  const recommendedService = SERVICES_CATALOG.find((s) => s.id === matchedServiceId) || SERVICES_CATALOG[0];

  const handleReset = () => {
    setStep(1);
    setBusinessType("startup");
    setSelectedGoal("web-app");
    setAdditionalNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Guided Solution Finder
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Find the Right Technical Service
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              {step}
            </span>
            {step === 1 && "Select Organization Type"}
            {step === 2 && "Define Primary Objective"}
            {step === 3 && "Personalized Recommendation"}
          </span>
          <span className="text-slate-400">Step {step} of 3</span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Business Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  What type of organization are you representing?
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  This helps calibrate technical scope and deployment governance.
                </p>
              </div>

              <div className="grid gap-2.5">
                {RECOMMENDATION_QUESTIONS.businessTypes.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBusinessType(b.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                      businessType === b.id
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        {b.label}
                      </span>
                      <span className="text-xs text-slate-500">{b.desc}</span>
                    </div>
                    {businessType === b.id && (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Main Goal */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  What is your primary goal or challenge?
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the business outcome you want to achieve.
                </p>
              </div>

              <div className="grid gap-2">
                {RECOMMENDATION_QUESTIONS.goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedGoal === g.id
                        ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {g.label}
                    </span>
                    {selectedGoal === g.id && (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Any specific details or deadlines? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g., We have Figma designs ready and want to launch in Q4..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Results */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Recommended Primary Service
                  </h5>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Based on your goal to <strong>{goalObj?.label}</strong> for a{" "}
                    <strong>{businessType}</strong>, we recommend:
                  </p>
                </div>
              </div>

              {/* Service Card Highlight */}
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <IconHelper name={recommendedService.iconName} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {recommendedService.category}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900">
                      {recommendedService.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {recommendedService.short_description}
                </p>

                <div>
                  <p className="text-xs font-bold text-slate-700 mb-2">
                    Key Included Deliverables:
                  </p>
                  <div className="space-y-1.5">
                    {recommendedService.deliverables.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
                  <span>
                    Est. Turnaround: <strong>{recommendedService.turnaround_estimate}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Quote Model: <strong>{recommendedService.starting_price_hint}</strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => (step === 3 ? handleReset() : setStep(1))}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {step === 3 ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Refine Answers
                </>
              ) : (
                "Back"
              )}
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onSelectRecommendedService(recommendedService);
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start Project with {recommendedService.title}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

