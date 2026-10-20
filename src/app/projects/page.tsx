"use client";

import React, { Suspense } from "react";
import { ProjectsShowcaseSection } from "@/components/home-page/projects/ProjectsShowcaseSection";
import { useModals } from "@/context/ModalContext";
import { Sparkles, ArrowRight, Layers, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";

function ProjectsContent() {
  const { openProjectModal } = useModals();

  return (
    <div className="py-12 md:py-16 space-y-8">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Frontend Hosted Systems</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Active Projects &{" "}
            <span className="text-blue-600">Hosted Sandboxes</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Every technical discipline we practice is validated through live, running software and hardware prototypes hosted directly on the frontend. Click &quot;Launch Interactive Demo&quot; on any project to interact with live telemetry streams, robot controls, and security scanners.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openProjectModal(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Commission a Custom System</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/evolution"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <span>View the Web → IoT Bridge</span>
            </Link>
          </div>
        </div>
      </div>

      {/* The Projects Showcase Grid & Interactive Sandbox Modals */}
      <ProjectsShowcaseSection
        onStartSimilarProject={() => openProjectModal(null)}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 font-mono text-xs">Loading Hosted Projects...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
