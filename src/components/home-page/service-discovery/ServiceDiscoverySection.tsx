"use client";

import React, { useState, useMemo } from "react";
import { SERVICES_CATALOG, ServiceItem } from "../data/mock-data";
import { SearchBar } from "./SearchBar";
import { CategoryFilter, CategoryFilterType } from "./CategoryFilter";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { Sparkles, SlidersHorizontal, PlusCircle } from "lucide-react";

interface ServiceDiscoverySectionProps {
  onGetStarted: (service?: ServiceItem) => void;
  onOpenCustomRequest: () => void;
}

export function ServiceDiscoverySection({
  onGetStarted,
  onOpenCustomRequest,
}: ServiceDiscoverySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterType>("All");
  const [sortBy, setSortBy] = useState<"recommended" | "title">("recommended");
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  // Compute category counts
  const counts = useMemo(() => {
    const map: Record<CategoryFilterType, number> = {
      All: SERVICES_CATALOG.length,
      Development: 0,
      Design: 0,
      "AI & Data": 0,
      Infrastructure: 0,
      Security: 0,
      "Strategy & Growth": 0,
    };

    SERVICES_CATALOG.forEach((item) => {
      if (map[item.category] !== undefined) {
        map[item.category]++;
      }
    });

    return map;
  }, []);

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((service) => {
      // Category match
      const categoryMatch =
        selectedCategory === "All" || service.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch;

      const titleMatch = service.title.toLowerCase().includes(q);
      const descMatch = service.short_description.toLowerCase().includes(q);
      const tagMatch = service.tags.some((t) => t.toLowerCase().includes(q));
      const deliverableMatch = service.deliverables.some((d) =>
        d.toLowerCase().includes(q)
      );
      const techMatch = service.tech_stack.some((ts) =>
        ts.toLowerCase().includes(q)
      );

      return (
        categoryMatch &&
        (titleMatch || descMatch || tagMatch || deliverableMatch || techMatch)
      );
    }).sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      // recommended: popular / featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <section id="services" className="py-20 md:py-24 bg-slate-50/60 border-t border-slate-200/80">
      <div className="container-custom space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Service Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Interactive Service Discovery
            </h2>
            <p className="text-base text-slate-600">
              Explore 15 distinct service domains with clear deliverables, verified expertise, and guided project brief workflows.
            </p>
          </div>

          {/* Quick Custom Request Shortcut */}
          <button
            onClick={onOpenCustomRequest}
            className="self-start md:self-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200/90 shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4 text-blue-600" />
            <span>Request Custom Service</span>
          </button>
        </div>

        {/* Discovery Controls: Search & Category Filter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
          {/* Search bar */}
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSelectSuggestion={(sugg) => setSearchQuery(sugg)}
          />

          {/* Category Filter Pills & Sort options */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              counts={counts}
            />

            {/* Sort Control */}
            <div className="flex items-center gap-2 self-end lg:self-center shrink-0 text-xs text-slate-600">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recommended" | "title")}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="recommended">Featured First</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredServices.length}</strong> of{" "}
            <strong className="text-slate-900 font-semibold">{SERVICES_CATALOG.length}</strong> services
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={handleClearFilters}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={(svc) => setActiveModalService(svc)}
                onGetStarted={(svc) => onGetStarted(svc)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching services found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find a predefined service matching &ldquo;{searchQuery}&rdquo;. You can submit a custom service request or clear your search filters.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Clear Search
              </button>
              <button
                onClick={onOpenCustomRequest}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Submit Custom Request
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onGetStarted={(svc) => onGetStarted(svc)}
      />
    </section>
  );
}

