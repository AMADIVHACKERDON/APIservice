"use client";

import React from "react";
import { FeaturedCaseStudiesSection } from "@/components/home-page/case-studies/FeaturedCaseStudiesSection";
import { useModals } from "@/context/ModalContext";
import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const { openProjectModal } = useModals();

  return (
    <div className="py-12 md:py-16 space-y-8">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Proven Engineering Impact</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Case Studies &{" "}
            <span className="text-blue-600">Enterprise Deployments</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Discover how The NextTechGen Foundation architects production web platforms, low-latency telemetry gateways, autonomous robotics fleets, and zero-trust security postures for our partners.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openProjectModal(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Commission a Similar Solution</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore Live Hosted Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <FeaturedCaseStudiesSection
        onStartSimilarProject={() => openProjectModal(null)}
      />
    </div>
  );
}
