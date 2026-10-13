"use client";

import React from "react";
import { ArrowRight, Sparkles, Calendar, ChevronDown } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { TrustBadges } from "./TrustBadges";

interface HeroSectionProps {
  onOpenProjectModal: () => void;
  onOpenConsultationModal: () => void;
  onOpenSolutionFinder: () => void;
}

export function HeroSection({
  onOpenProjectModal,
  onOpenConsultationModal,
  onOpenSolutionFinder,
}: HeroSectionProps) {
  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Value Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Multipurpose Digital Solutions & Engineering Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Your Next Big Idea Starts With the{" "}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-8">
                Right Service.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              From web development and AI to cybersecurity, cloud infrastructure, and digital transformation, find the expertise you need to move your business forward.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={scrollToServices}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenProjectModal}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-semibold text-base rounded-xl border border-slate-300 hover:border-slate-400 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tell Us What You Need</span>
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </button>

              <button
                onClick={onOpenConsultationModal}
                className="px-4 py-3.5 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-slate-500" />
                Book Consultation
              </button>
            </div>

            {/* Helper callout */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>Not sure which technical discipline you require?</span>
              <button
                onClick={onOpenSolutionFinder}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Try the Solution Recommender →
              </button>
            </div>

            {/* Trust Badges */}
            <TrustBadges />
          </div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-5 relative">
            <HeroVisual onOpenProjectModal={onOpenProjectModal} />
          </div>
        </div>
      </div>
    </section>
  );
}

