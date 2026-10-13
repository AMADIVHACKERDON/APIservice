"use client";

import React from "react";
import { Check, ShieldCheck, Cpu, ArrowUpRight, Sparkles, UserCheck, Terminal } from "lucide-react";

interface HeroVisualProps {
  onExploreService?: (slug: string) => void;
  onOpenProjectModal?: () => void;
}

export function HeroVisual({ onOpenProjectModal }: HeroVisualProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background ambient glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/10 via-indigo-500/10 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Main SaaS Dashboard Frame */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-xs text-slate-400 font-mono ml-2 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-blue-400" />
              solutiondesk.io / active-workspace
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Project Brief
          </span>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-5">
          {/* Active Service Badge & Title */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Selected Domain: Web & Cloud Architecture
              </span>
              <span className="text-xs font-medium text-slate-400">Ref: #SD-9482</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">
              High-Throughput SaaS Application & API Gateway
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Custom multi-tenant platform with automated CI/CD, responsive design system, and PostgreSQL database.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Delivery Workflow</span>
              <span className="text-blue-600 font-medium">Stage 2 of 4 (Architecture)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="bg-blue-600 text-white rounded-lg py-1.5 px-1 text-[11px] font-medium flex items-center justify-center gap-1">
                <Check className="h-3 w-3" />
                Discovery
              </div>
              <div className="bg-blue-100 text-blue-700 font-bold border border-blue-300 rounded-lg py-1.5 px-1 text-[11px]">
                Architecture
              </div>
              <div className="bg-white text-slate-500 border border-slate-200 rounded-lg py-1.5 px-1 text-[11px]">
                Milestones
              </div>
              <div className="bg-white text-slate-500 border border-slate-200 rounded-lg py-1.5 px-1 text-[11px]">
                Launch
              </div>
            </div>
          </div>

          {/* Expert Assignment Mini Card */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                SC
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">Sarah Connor</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    <UserCheck className="h-2.5 w-2.5" />
                    Verified Lead
                  </span>
                </div>
                <p className="text-xs text-slate-500">Principal Systems Architect • AWS Certified</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              Lead Assigned
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                Security Standards
              </div>
              <div className="text-sm font-bold text-slate-900">SOC 2 & OWASP Top 10</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium mb-1">
                <Cpu className="h-3.5 w-3.5 text-indigo-600" />
                Deployment Target
              </div>
              <div className="text-sm font-bold text-slate-900">AWS EKS / Next.js 16</div>
            </div>
          </div>

          {/* Card Action */}
          <button
            onClick={onOpenProjectModal}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm group cursor-pointer"
          >
            <span>Create Similar Project Request</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating Badge 1 - Top Left */}
      <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/80">
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-900">15 Service Disciplines</p>
          <p className="text-[10px] text-slate-500">From MVP to Enterprise Scale</p>
        </div>
      </div>

      {/* Floating Badge 2 - Bottom Right */}
      <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/80">
        <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-900">Zero Technical Jargon Required</p>
          <p className="text-[10px] text-slate-500">Guided scoping & direct delivery</p>
        </div>
      </div>
    </div>
  );
}

