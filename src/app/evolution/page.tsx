"use client";

import React from "react";
import Link from "next/link";
import { EvolutionBridgeSection } from "@/components/home-page/evolution-bridge/EvolutionBridgeSection";
import { useModals } from "@/context/ModalContext";
import { Zap, ArrowRight, Layers, CheckCircle2, Cpu, Globe, ShieldCheck } from "lucide-react";

export default function EvolutionPage() {
  const { openProjectModal } = useModals();

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Intro Header */}
      <div className="container-custom">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-semibold">
            <Zap className="h-3.5 w-3.5 text-cyan-600" />
            <span>Strategic Engineering Road</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Strategic Journey:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Web Development into Connected IoT
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            At The NextTechGen Foundation, we are pioneering the shift from pure web software into smart physical devices. Discover how our web applications act as mission control centers that directly command real-time sensors, robotic rovers, and custom hardware silicon.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openProjectModal(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Commission an IoT & Web Solution</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <span>Test Live Hosted Systems</span>
            </Link>
          </div>
        </div>
      </div>

      {/* The Interactive 4-Stage Evolution Bridge */}
      <EvolutionBridgeSection />

      {/* Deep-Dive Architectural Explanations */}
      <div className="container-custom space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Why We Bridge Software & Hardware
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Unified Engineering Paradigm
          </h2>
          <p className="text-sm text-slate-600">
            Most technology companies keep web development and hardware engineering in isolated silos. We merge them into one continuous pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Web Control Plane</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your operators don&apos;t look at serial monitors or raw terminal streams. They interact with intuitive Next.js 16 portals featuring role-based controls, heatmaps, and one-click remote commands.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Ingestion & Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-frequency MQTT 5.0 message brokers buffer telematics, while mutual TLS (mTLS) cryptographic certificates ensure physical devices can never be spoofed or compromised.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Embedded Silicon & Actuation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom ESP32-S3 and ARM Cortex PCBs sample environmental and vibration sensors at the edge, executing microsecond actuation routines and reporting metrics back to the web portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
