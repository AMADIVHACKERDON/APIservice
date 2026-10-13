"use client";

import React from "react";
import { IconHelper } from "../ui/IconHelper";

interface FeaturePillarProps {
  title: string;
  description: string;
  iconName: string;
}

export function FeaturePillar({
  title,
  description,
  iconName,
}: FeaturePillarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between card-hover">
      <div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 shadow-2xs">
          <IconHelper name={iconName} className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

