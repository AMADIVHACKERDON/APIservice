"use client";

import React from "react";
import { InsightsSection } from "@/components/home-page/insights/InsightsSection";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InsightsPage() {
  return (
    <div className="py-12 md:py-16 space-y-8">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Research & Engineering Publications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineering Insights &{" "}
            <span className="text-blue-600">Technical Briefs</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Read architectural breakdowns, benchmark studies, and security whitepapers written by the engineers and architects of The NextTechGen Foundation.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/evolution"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
            >
              <span>Featured: Bridging Web to IoT</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/fields"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <span>Explore 7 Core Disciplines</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <InsightsSection />
    </div>
  );
}
