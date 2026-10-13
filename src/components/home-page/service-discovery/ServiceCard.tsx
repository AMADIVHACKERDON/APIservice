"use client";

import React from "react";
import { ServiceItem } from "../data/mock-data";
import { IconHelper } from "../ui/IconHelper";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  onLearnMore: (service: ServiceItem) => void;
  onGetStarted: (service: ServiceItem) => void;
}

export function ServiceCard({
  service,
  onLearnMore,
  onGetStarted,
}: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between card-hover relative overflow-hidden">
      {/* Top indicator: popular badge if applicable */}
      {service.popular && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
          <Sparkles className="h-2.5 w-2.5" />
          Popular
        </div>
      )}

      <div>
        {/* Header: Icon & Category */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
            <IconHelper name={service.iconName} className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {service.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
          {service.short_description}
        </p>

        {/* Deliverables snippet */}
        <div className="mb-5 space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Key Deliverables
          </p>
          {service.deliverables.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* Turnaround & Quote Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="h-3 w-3 text-slate-400" />
            {service.turnaround_estimate}
          </span>
          <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
            {service.starting_price_hint}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onLearnMore(service)}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200/80 transition-colors text-center cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={() => onGetStarted(service)}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

