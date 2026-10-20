"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, ChevronRight, Zap } from "lucide-react";
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
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Value Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>The NextTechGen Foundation — 7 Core Fields</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Bridging Web Software to{" "}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-8">
                Smart IoT & Hardware.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              The NextTechGen Foundation organizes digital and physical technology under 7 core disciplines: Web Development, Cybersecurity, IoT, Robotics, ML, AI, and Hardware. Explore our live hosted systems or build with us.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/fields"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore the 7 Fields</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/projects"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-semibold text-base rounded-xl border border-slate-300 hover:border-slate-400 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>View Hosted Projects</span>
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </Link>

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
              <Zap className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>Moving from software into physical devices?</span>
              <Link
                href="/evolution"
                className="text-blue-600 font-semibold hover:underline"
              >
                See the Web → IoT Journey →
              </Link>
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
