"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Terminal,
  Activity,
  Wifi,
  Globe,
  Radio,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface HeroVisualProps {
  onExploreService?: (slug: string) => void;
  onOpenProjectModal?: () => void;
}

export function HeroVisual({ onOpenProjectModal }: HeroVisualProps) {
  const [activeTab, setActiveTab] = useState<"web" | "iot">("web");
  const [packetCount, setPacketCount] = useState(14643);

  // Subtle live telemetry packet counter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 8) + 1);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* High-tech Ambient Gradient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-3xl blur-2xl -z-10 opacity-80" />

      {/* Main Terminal & Mission Control Console Frame */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Top Window Bar - macOS Inspired with Live Status */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-xs" />
            </div>

            {/* Terminal Host Tag */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-nowrap overflow-hidden">
              <Terminal className="h-3 w-3 text-blue-400 shrink-0" />
              <span className="font-semibold text-slate-200">nexttechgen.org</span>
              <span className="text-slate-500 hidden sm:inline">~</span>
              <span className="text-slate-400 hidden sm:inline">mission-control</span>
            </div>
          </div>

          {/* Real-time Status Badge */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold">7/7 Systems Online</span>
            </span>
          </div>
        </div>

        {/* Interactive Segmented Switcher */}
        <div className="p-2.5 bg-slate-950 border-b border-slate-800">
          <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("web")}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "web"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span>Web Control Plane</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-500/25 text-blue-200">
                Field 01
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("iot")}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "iot"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Wifi className="h-3.5 w-3.5 shrink-0" />
              <span>Connected IoT Twin</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-500/25 text-cyan-200">
                Field 03/07
              </span>
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-5 space-y-4">
          {activeTab === "web" ? (
            /* ========================================================= */
            /* TAB 1: WEB CONTROL PLANE                                  */
            /* ========================================================= */
            <div className="space-y-4">
              {/* Header Info - High Contrast & No Awkward Wrap */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-md whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Field 01: Web Software
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                      ID: NTG-PORTAL-01
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md whitespace-nowrap">
                    <Activity className="h-3 w-3 animate-pulse text-emerald-400" />
                    <span>18ms Latency · 99.98% SLA</span>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  NextTechGen Cloud Fleet Portal
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Enterprise control plane streaming real-time telemetry, remote IoT commands, and zero-trust authentication across connected fleets.
                </p>
              </div>

              {/* Live SVG Sparkline & Real-time Throughput Card */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-blue-400" />
                    <span>Live Ingestion Throughput</span>
                  </span>
                  <span className="font-mono text-blue-400 font-bold text-xs sm:text-sm">
                    {packetCount.toLocaleString()} msg/sec
                  </span>
                </div>

                {/* SVG Live Waveform */}
                <div className="relative h-12 w-full overflow-hidden rounded-lg bg-slate-950/70 border border-slate-800 flex items-end">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 380 50"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,35 Q30,10 60,25 T120,15 T180,30 T240,10 T300,20 T350,15 T380,22 L380,50 L0,50 Z"
                      fill="url(#streamGrad)"
                    />
                    <path
                      d="M0,35 Q30,10 60,25 T120,15 T180,30 T240,10 T300,20 T350,15 T380,22"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1.5 right-2 flex items-center gap-1 text-[10px] font-mono text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span>WebSocket · 60 FPS</span>
                  </div>
                </div>

                {/* Quick Telemetry Indicators */}
                <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Active Nodes</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">2,480 Fleet</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Zero-Loss SLA</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5">99.98%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Security</div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono mt-0.5">mTLS + IAM</div>
                  </div>
                </div>
              </div>

              {/* 4-Stage Web to IoT Delivery Pipeline */}
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-blue-400" />
                    Web → IoT Delivery Pipeline
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400">Stage 3 of 4 Active</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
                  <div className="bg-blue-600/25 text-blue-200 border border-blue-500/40 rounded-lg py-1.5 px-1 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="truncate">1. Web UI</span>
                  </div>
                  <div className="bg-blue-600/25 text-blue-200 border border-blue-500/40 rounded-lg py-1.5 px-1 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="truncate">2. Gateway</span>
                  </div>
                  <div className="bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 rounded-lg py-1.5 px-1 font-bold shadow-xs shadow-cyan-500/20 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                    <span className="truncate">3. IoT Broker</span>
                  </div>
                  <div className="bg-slate-800/60 text-slate-400 border border-slate-700/60 rounded-lg py-1.5 px-1 font-medium flex items-center justify-center">
                    <span className="truncate">4. Hardware</span>
                  </div>
                </div>
              </div>

              {/* Mini Terminal Output */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800/80">
                  <span className="tracking-wider uppercase">Live Telemetry Feed</span>
                  <span className="text-emerald-400 font-medium">TLS 1.3 · SECURE</span>
                </div>
                <div className="text-slate-300 text-[10px] sm:text-[11px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-blue-400 shrink-0">&gt; [14:40:12]</span>
                  <span className="text-slate-300">WSS /stream: Handshake verified (AES-256)</span>
                </div>
                <div className="text-slate-300 text-[10px] sm:text-[11px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-cyan-400 shrink-0">&gt; [14:40:13]</span>
                  <span className="text-slate-300">Ingesting 2,480 nodes across 7 disciplines</span>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* TAB 2: CONNECTED IOT TWIN (ESP32-S3)                      */
            /* ========================================================= */
            <div className="space-y-4">
              {/* Header Info */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Field 03 & 07: IoT Silicon
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                      Node: ESP32S3-7FA4
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md whitespace-nowrap">
                    <Radio className="h-3 w-3 animate-pulse text-cyan-400" />
                    <span>Dual-Core 240MHz</span>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  EdgePulse Hardware Twin &amp; Sensor Matrix
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Bare-metal FreeRTOS firmware streaming 3-axis vibration, calibrated thermal gradients, and mTLS security packets.
                </p>
              </div>

              {/* Hardware Telemetry Gauges */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Core Temp
                  </div>
                  <div className="text-lg font-bold font-mono text-amber-400">24.6°C</div>
                  <span className="inline-block text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    OPTIMAL
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Vibration (Z)
                  </div>
                  <div className="text-lg font-bold font-mono text-cyan-400">0.14 g</div>
                  <span className="inline-block text-[9px] font-bold font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                    CALIBRATED
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Wi-Fi 6 RSSI
                  </div>
                  <div className="text-lg font-bold font-mono text-emerald-400">-48 dBm</div>
                  <span className="inline-block text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    STRONG
                  </span>
                </div>
              </div>

              {/* Silicon Specifications Matrix */}
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                    Silicon Architecture Specs
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">FreeRTOS v10.5</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Microcontroller:</span>
                    <span className="font-mono font-bold text-slate-200 text-[11px]">ESP32-S3 (8MB)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Enclosure:</span>
                    <span className="font-mono font-bold text-slate-200 text-[11px]">IP67 Weatherproof</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Bus Interface:</span>
                    <span className="font-mono font-bold text-slate-200 text-[11px]">CAN-Bus &amp; I2C</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Security Chip:</span>
                    <span className="font-mono font-bold text-cyan-300 text-[11px]">ATECC608A mTLS</span>
                  </div>
                </div>
              </div>

              {/* Mini Terminal Output */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800/80">
                  <span className="tracking-wider uppercase">Firmware Telemetry Log</span>
                  <span className="text-cyan-400 font-medium">MQTT 8883 · SSL</span>
                </div>
                <div className="text-slate-300 text-[10px] sm:text-[11px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-cyan-400 shrink-0">&gt; [14:40:12]</span>
                  <span className="text-slate-300">ESP32-S3 PUB /sensors/imu (Payload 64B, CRC: OK)</span>
                </div>
                <div className="text-slate-300 text-[10px] sm:text-[11px] flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-emerald-400 shrink-0">&gt; [14:40:13]</span>
                  <span className="text-slate-300">mTLS verified via Hardware Root-of-Trust</span>
                </div>
              </div>
            </div>
          )}

          {/* Integrated Architect & Foundation Ribbon */}
          <div className="pt-1.5 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/25 shrink-0">
                  VA
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white tracking-tight">Victory Amadi</span>
                    <span className="text-[10px] font-semibold text-blue-300 bg-blue-500/20 border border-blue-500/30 px-1.5 py-0.2 rounded whitespace-nowrap">
                      Lead Architect
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    The NextTechGen Foundation · Systems &amp; IoT
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-cyan-300 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap">
                <Sparkles className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>7 Core Disciplines</span>
              </div>
            </div>
          </div>

          {/* Action Row - High-Tech Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
            <Link
              href="/projects"
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 group"
            >
              <span>Explore 7 Live Sandboxes</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={onOpenProjectModal}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
            >
              <span>Commission Custom System</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
