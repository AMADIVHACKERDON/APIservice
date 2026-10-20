"use client";

import React from "react";
import { HowItWorksSection } from "@/components/home-page/how-it-works/HowItWorksSection";
import { useModals } from "@/context/ModalContext";
import { Milestone, ArrowRight, CheckCircle2, ShieldCheck, Terminal, Rocket } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const { openProjectModal } = useModals();

  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Milestone className="h-3.5 w-3.5" />
            <span>Delivery Methodology</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How The NextTechGen Foundation{" "}
            <span className="text-blue-600">Delivers Results</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether building a multi-tenant web application, architecting a cloud telemetry broker, or designing custom microcontrollers, our engineering process eliminates ambiguity and delivers working systems with verified milestones.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openProjectModal(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Your Project Brief</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/fields"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore the 7 Disciplines</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4-Step Process Section */}
      <HowItWorksSection onOpenProjectModal={() => openProjectModal(null)} />

      {/* In-Depth Process Guarantees */}
      <div className="container-custom space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Our Delivery Commitments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Predictable Execution, Zero Guesswork
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Upfront Technical Scoping</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We define protocols, schemas, and deliverables before a single line of production code is written, preventing scope creep and budget surprises.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Live Frontend Staging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You don&apos;t wait until the end of the project to see progress. We host interactive preview sandboxes so you can test features and telemetry streams in real time.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Rocket className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Verified Handoff & Docs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete OpenAPI specifications, GitHub repositories, CI/CD deployment pipelines, and hardware PCB Gerber files are provided for seamless ownership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
