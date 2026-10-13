"use client";

import React from "react";
import { IconHelper } from "../ui/IconHelper";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
  isLast?: boolean;
}

export function StepCard({
  step,
  title,
  description,
  highlight,
  iconName,
}: StepCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between card-hover">
      <div>
        {/* Step Number & Icon */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-3xl font-extrabold text-slate-200 font-mono tracking-tighter">
            {step}
          </span>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
            <IconHelper name={iconName} className="h-5 w-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Highlight Pill */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
          {highlight}
        </span>
      </div>
    </div>
  );
}

