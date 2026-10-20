"use client";

import React from "react";
import { SERVICES_CATALOG, ServiceItem } from "../data/mock-data";
import { FeaturedServiceCard } from "./FeaturedServiceCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface FeaturedServicesSectionProps {
  onGetStarted: (service: ServiceItem) => void;
  onLearnMore: (service: ServiceItem) => void;
  onViewAllServices: () => void;
}

export function FeaturedServicesSection({
  onGetStarted,
  onLearnMore,
  onViewAllServices,
}: FeaturedServicesSectionProps) {
  // Highlight the 4 featured flagships
  const featuredServices = SERVICES_CATALOG.filter((s) => s.featured).slice(0, 4);

  return (
    <section id="featured" className="py-20 md:py-24 bg-slate-50/50 border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Flagship Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Featured Service Disciplines
            </h2>
            <p className="text-base text-slate-600">
              In-depth software engineering, artificial intelligence, cloud infrastructure, and product design with proven enterprise playbooks.
            </p>
          </div>

          <button
            onClick={onViewAllServices}
            className="self-start md:self-auto text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Explore All 7 Core Disciplines</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2x2 Grid of Featured Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredServices.map((service) => (
            <FeaturedServiceCard
              key={service.id}
              service={service}
              onGetStarted={onGetStarted}
              onLearnMore={onLearnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

