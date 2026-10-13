"use client";

import React, { useState } from "react";
import { INSIGHTS_DATA, InsightItem } from "../data/mock-data";
import { InsightCard } from "./InsightCard";
import { BookOpen, X, Calendar, Clock, User, ArrowRight } from "lucide-react";

export function InsightsSection() {
  const [activeArticle, setActiveArticle] = useState<InsightItem | null>(null);

  return (
    <>
      <section id="insights" className="py-20 md:py-24 bg-slate-50/50 border-t border-slate-200/80">
        <div className="container-custom space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
                <BookOpen className="h-3.5 w-3.5" />
                Knowledge Base & Insights
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Engineering Insights & Architecture Guides
              </h2>
              <p className="text-base text-slate-600">
                Practical perspectives on artificial intelligence, cloud architectures, and modern product engineering.
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIGHTS_DATA.map((article) => (
              <InsightCard
                key={article.id}
                insight={article}
                onReadArticle={(item) => setActiveArticle(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Article Viewer Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveArticle(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[88vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  {activeArticle.category}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  {activeArticle.author.name} ({activeArticle.author.role})
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {activeArticle.published_at}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {activeArticle.read_time}
                </span>
              </div>

              <div className="prose text-sm text-slate-700 leading-relaxed space-y-4">
                <p className="font-medium text-slate-900">
                  {activeArticle.excerpt}
                </p>
                <p>
                  In modern software engineering, evaluating technical trade-offs early in the development lifecycle prevents costly rewrites and operational bottlenecks. Whether architecting distributed microservices, implementing RAG pipelines, or scaling design tokens, pragmatic decisions rooted in business outcomes outperform trend-chasing.
                </p>
                <p>
                  Key considerations explored by our team include deterministic evaluation frameworks, latency benchmarks, edge caching strategies, and total cost of ownership over 24-month horizon.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {activeArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

