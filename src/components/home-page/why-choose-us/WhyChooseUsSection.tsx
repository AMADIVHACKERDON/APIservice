"use client";

import React from "react";
import { WHY_CHOOSE_US_PILLARS } from "../data/mock-data";
import { FeaturePillar } from "./FeaturePillar";
import { ShieldCheck } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-24 bg-slate-50/60 border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Reliable Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Choose The NextTechGen Foundation
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            A unified engineering ecosystem designed to bridge modern web platforms with connected IoT telemetry, robotics, and embedded hardware.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_PILLARS.map((pillar, idx) => (
            <FeaturePillar
              key={idx}
              title={pillar.title}
              description={pillar.description}
              iconName={pillar.iconName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

