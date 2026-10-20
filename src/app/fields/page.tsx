"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceDiscoverySection } from "@/components/home-page/service-discovery/ServiceDiscoverySection";
import { useModals } from "@/context/ModalContext";
import { Layers, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

function FieldsContent() {
  const { openProjectModal } = useModals();

  return (
    <div className="py-12 md:py-16">
      <div className="container-custom space-y-8">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Layers className="h-3.5 w-3.5" />
            <span>Structured Technology Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The 7 Core Disciplines of{" "}
            <span className="text-blue-600">The NextTechGen Foundation</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Instead of fragmented vendor sprawl, all technical specializations at our foundation are classified into 7 core fields — providing a clear path from software engineering to connected IoT, robotics, and hardware.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/evolution"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
            >
              <span>See the Web → IoT Bridge</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <span>Explore Hosted Projects</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* The Interactive 7-Field Explorer */}
        <ServiceDiscoverySection
          onGetStarted={(service) => openProjectModal(service)}
          onOpenCustomRequest={() => openProjectModal(null)}
        />
      </div>
    </div>
  );
}

export default function FieldsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 font-mono text-xs">Loading 7 Fields Catalog...</div>}>
      <FieldsContent />
    </Suspense>
  );
}
