"use client";

import React, { useState } from "react";
import { BookConsultationModal } from "./BookConsultationModal";
import { ArrowRight, Calendar, Sparkles, CheckCircle2 } from "lucide-react";

interface ConsultationCtaSectionProps {
  onOpenProjectModal: () => void;
}

export function ConsultationCtaSection({
  onOpenProjectModal,
}: ConsultationCtaSectionProps) {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-24 bg-white border-t border-slate-200/80">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-slate-800">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ready to Execute</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Let&apos;s Build the Right Solution for Your Business.
              </h2>

              {/* Supporting copy */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Whether you need a dedicated development team, an architecture audit, or an automated workflow pipeline, we are ready to turn your project brief into production code.
              </p>

              {/* Benefits list */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  No commitment required to scope
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Direct senior engineer consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Transparent milestone pricing
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={onOpenProjectModal}
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Book a Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookConsultationModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
      />
    </>
  );
}

