"use client";

import React from "react";
import { ServiceItem } from "../data/mock-data";
import { IconHelper } from "../ui/IconHelper";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

interface FeaturedServiceCardProps {
  service: ServiceItem;
  onGetStarted: (service: ServiceItem) => void;
  onLearnMore: (service: ServiceItem) => void;
}

export function FeaturedServiceCard({
  service,
  onGetStarted,
  onLearnMore,
}: FeaturedServiceCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Visual Top Header */}
      <div className="p-7 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <IconHelper name={service.iconName} className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            {service.category} Flagship
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
          {service.short_description}
        </p>

        {/* Tech Stack badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-semibold bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Deliverables & Benefits Body */}
      <div className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Engineering Deliverables
          </h4>
          <div className="space-y-2.5">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Meta & Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Est. turnaround: {service.turnaround_estimate}
            </span>
            <span className="font-semibold text-slate-800 bg-slate-50 px-2.5 py-1 rounded border border-slate-200/60">
              {service.starting_price_hint}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onLearnMore(service)}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors text-center cursor-pointer"
            >
              Detailed Specs
            </button>
            <button
              onClick={() => onGetStarted(service)}
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

