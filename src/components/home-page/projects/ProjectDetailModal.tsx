"use client";

import React, { useState, useEffect } from "react";
import { ProjectItem } from "../data/mock-data";
import {
  X,
  Play,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  RotateCcw,
  Sliders,
  Send,
  ShieldCheck,
  Bot,
  Zap,
} from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectConnectedTwin?: (twinProjectId: string) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onSelectConnectedTwin,
}: ProjectDetailModalProps) {
  // Simulator states
  const [telemetryValues, setTelemetryValues] = useState({
    temp: 24.6,
    vibe: 0.14,
    pressure: 1013.4,
    battery: 98,
    packets: 1420,
  });

  const [robotPos, setRobotPos] = useState({ x: 3, y: 3 });
  const [robotAngle, setRobotAngle] = useState(0);
  const [robotSpeed, setRobotSpeed] = useState(1.2);

  const [auditScores, setAuditScores] = useState({
    tls: true,
    rbac: true,
    firewall: true,
    mfa: true,
  });

  const [mlThreshold, setMlThreshold] = useState(85);
  const [aiStep, setAiStep] = useState(1);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [commandLog, setCommandLog] = useState<string[]>([
    "System initialized. Handshake verified via mTLS.",
  ]);

  // Live telemetry pulse simulator
  useEffect(() => {
    if (!project || project.previewType !== "sensor-stream") return;
    const interval = setInterval(() => {
      setTelemetryValues((prev) => ({
        temp: +(24 + Math.random() * 2).toFixed(1),
        vibe: +(0.1 + Math.random() * 0.08).toFixed(2),
        pressure: +(1012 + Math.random() * 2).toFixed(1),
        battery: Math.max(80, +(prev.battery - 0.01).toFixed(1)),
        packets: prev.packets + Math.floor(Math.random() * 5 + 1),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, [project]);

  if (!project) return null;

  // Robot move handler
  const moveRobot = (dx: number, dy: number, angle: number) => {
    setRobotPos((prev) => ({
      x: Math.min(5, Math.max(0, prev.x + dx)),
      y: Math.min(5, Math.max(0, prev.y + dy)),
    }));
    setRobotAngle(angle);
  };

  const handleSendCommand = (cmd: string) => {
    setCommandLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Sent command: ${cmd}`,
      ...prev.slice(0, 4),
    ]);
  };

  const runAiWorkflow = () => {
    setIsAiRunning(true);
    setAiStep(1);
    setTimeout(() => setAiStep(2), 700);
    setTimeout(() => setAiStep(3), 1500);
    setTimeout(() => {
      setAiStep(4);
      setIsAiRunning(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded border border-blue-500/30">
                {project.fieldCategory} • {project.subDisciplineTitle}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* INTERACTIVE LIVE FRONTEND SIMULATOR */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 text-white space-y-5 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Live Interactive Frontend Demo Sandbox
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Hosted via NextTechGen Edge
              </span>
            </div>

            {/* 1. Fleet Telematics Portal Simulator */}
            {project.previewType === "fleet-telematics" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Active Endpoints
                    </span>
                    <div className="text-lg font-bold text-blue-400 font-mono">2,480 Nodes</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      System Health
                    </span>
                    <div className="text-lg font-bold text-emerald-400 font-mono">99.98%</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Stream Rate
                    </span>
                    <div className="text-lg font-bold text-cyan-400 font-mono">14.2k msg/s</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Avg Response
                    </span>
                    <div className="text-lg font-bold text-amber-400 font-mono">18ms</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Interactive Device Command Dispatch:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSendCommand("CALIBRATE_SENSORS")}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      Trigger Auto-Calibration
                    </button>
                    <button
                      onClick={() => handleSendCommand("FLUSH_EDGE_BUFFERS")}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      Flush MQTT Buffer
                    </button>
                    <button
                      onClick={() => handleSendCommand("PING_FLEET_GATEWAYS")}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      Ping All Gateways
                    </button>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-lg font-mono text-[11px] text-slate-300 space-y-1">
                    {commandLog.map((log, i) => (
                      <div key={i} className="text-emerald-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. IoT Sensor Stream Simulator */}
            {project.previewType === "sensor-stream" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Temperature
                    </span>
                    <div className="text-lg font-bold text-amber-400 font-mono">
                      {telemetryValues.temp} °C
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Vibration RMS
                    </span>
                    <div className="text-lg font-bold text-cyan-400 font-mono">
                      {telemetryValues.vibe} g
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Barometric Press.
                    </span>
                    <div className="text-lg font-bold text-blue-400 font-mono">
                      {telemetryValues.pressure} hPa
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Packets Ingested
                    </span>
                    <div className="text-lg font-bold text-emerald-400 font-mono">
                      {telemetryValues.packets}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                    Sub-second MQTT 5.0 websocket stream active (TLS 1.3 encrypted)
                  </span>
                  <span className="text-blue-400">Node: ESP32S3-7FA4</span>
                </div>
              </div>
            )}

            {/* 3. Security Audit Simulator */}
            {project.previewType === "security-audit" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    Overall Zero-Trust Compliance Score
                  </span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {auditScores.tls && auditScores.rbac && auditScores.firewall && auditScores.mfa
                      ? "100% Passed"
                      : "85% Warning"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 font-medium">mTLS Hardware Handshake</span>
                    <input
                      type="checkbox"
                      checked={auditScores.tls}
                      onChange={(e) => setAuditScores({ ...auditScores, tls: e.target.checked })}
                      className="rounded accent-emerald-500 h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 font-medium">Role-Based Access (RBAC)</span>
                    <input
                      type="checkbox"
                      checked={auditScores.rbac}
                      onChange={(e) => setAuditScores({ ...auditScores, rbac: e.target.checked })}
                      className="rounded accent-emerald-500 h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 font-medium">Cloudflare WAF Perimeter</span>
                    <input
                      type="checkbox"
                      checked={auditScores.firewall}
                      onChange={(e) => setAuditScores({ ...auditScores, firewall: e.target.checked })}
                      className="rounded accent-emerald-500 h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 font-medium">Hardware Biometric MFA</span>
                    <input
                      type="checkbox"
                      checked={auditScores.mfa}
                      onChange={(e) => setAuditScores({ ...auditScores, mfa: e.target.checked })}
                      className="rounded accent-emerald-500 h-4 w-4"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 4. Robot Tele-Operation Simulator */}
            {project.previewType === "robot-sim" && (
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-1 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-sm mx-auto">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const row = Math.floor(i / 6);
                    const col = i % 6;
                    const isRobot = row === robotPos.y && col === robotPos.x;
                    const isObstacle = (row === 1 && col === 2) || (row === 4 && col === 4);

                    return (
                      <div
                        key={i}
                        className={`h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold ${
                          isRobot
                            ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/50"
                            : isObstacle
                            ? "bg-red-950/80 text-red-400 border border-red-800/60"
                            : "bg-slate-950 text-slate-700 border border-slate-800/40"
                        }`}
                      >
                        {isRobot ? "🤖" : isObstacle ? "⚠️" : ""}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => moveRobot(0, -1, 0)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold cursor-pointer"
                  >
                    ▲ North
                  </button>
                  <button
                    onClick={() => moveRobot(-1, 0, 270)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold cursor-pointer"
                  >
                    ◀ West
                  </button>
                  <button
                    onClick={() => moveRobot(1, 0, 90)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold cursor-pointer"
                  >
                    ▶ East
                  </button>
                  <button
                    onClick={() => moveRobot(0, 1, 180)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold cursor-pointer"
                  >
                    ▼ South
                  </button>
                </div>
              </div>
            )}

            {/* 5. ML Forecast Anomaly Simulator */}
            {project.previewType === "ml-forecast" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Vibration Anomaly Trigger Sensitivity:</span>
                    <span className="font-bold text-violet-400">{mlThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={99}
                    value={mlThreshold}
                    onChange={(e) => setMlThreshold(+e.target.value)}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Forecast Horizon
                    </span>
                    <div className="text-base font-bold text-violet-400 font-mono">14 Days</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Estimated RUL
                    </span>
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {mlThreshold > 80 ? "420 Hours" : "210 Hours"}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      Confidence
                    </span>
                    <div className="text-base font-bold text-blue-400 font-mono">94.8%</div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. AI Multi-Agent Simulator */}
            {project.previewType === "ai-copilot" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-300">
                    Query: &quot;Analyze gateway telemetry spikes & recommend firmware fix&quot;
                  </span>
                  <button
                    onClick={runAiWorkflow}
                    disabled={isAiRunning}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {isAiRunning ? "Agent Thinking..." : "Trigger Multi-Agent"}
                  </button>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      aiStep >= 1
                        ? "bg-purple-950/40 border-purple-800/80 text-purple-200"
                        : "bg-slate-900 border-slate-800 text-slate-600"
                    }`}
                  >
                    <strong>Agent 1 (Planner):</strong> Decomposed query into time-series query + firmware patch synthesis.
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      aiStep >= 2
                        ? "bg-blue-950/40 border-blue-800/80 text-blue-200"
                        : "bg-slate-900 border-slate-800 text-slate-600"
                    }`}
                  >
                    <strong>Agent 2 (Tool Executor):</strong> Invoked `query_timescale_metrics(metric=&apos;vibration&apos;)`. Spike detected at 14:02 UTC.
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      aiStep >= 3
                        ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-200"
                        : "bg-slate-900 border-slate-800 text-slate-600"
                    }`}
                  >
                    <strong>Agent 3 (Verifier):</strong> Validated proposed FreeRTOS sleep debounce logic against hardware constraints.
                  </div>
                </div>
              </div>
            )}

            {/* 7. Hardware PCB Blueprint Simulator */}
            {project.previewType === "pcb-blueprint" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-orange-400 font-bold">
                    <span>ESP32-S3-WROOM-1 Pinout Matrix</span>
                    <span>Revision: v2.4</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    4-Layer FR4 • 1.6mm thickness • ENIG surface finish • Impedance matched 50Ω trace
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                    <span className="p-1.5 bg-slate-950 rounded text-slate-300 border border-slate-800">
                      GPIO 8: I2C SDA
                    </span>
                    <span className="p-1.5 bg-slate-950 rounded text-slate-300 border border-slate-800">
                      GPIO 9: I2C SCL
                    </span>
                    <span className="p-1.5 bg-slate-950 rounded text-slate-300 border border-slate-800">
                      GPIO 10: ADC Battery
                    </span>
                    <span className="p-1.5 bg-slate-950 rounded text-slate-300 border border-slate-800">
                      GPIO 11: SPI CS (Flash)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Features & Architecture Deliverables */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Key Features & Architectural Deliverables
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-slate-900">Technologies & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Connected Twin Navigation Link */}
          {project.connectedTwin && (
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Connected Cross-Field Project Twin
                </span>
                <h5 className="text-sm font-bold text-slate-900">
                  {project.connectedTwin.projectTitle} ({project.connectedTwin.fieldName})
                </h5>
                <p className="text-xs text-slate-600">
                  {project.connectedTwin.relationship}
                </p>
              </div>

              {onSelectConnectedTwin && (
                <button
                  onClick={() => onSelectConnectedTwin(project.connectedTwin!.projectId)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                  <span>Switch to Connected Twin</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
                <span>View Source Repo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Demo
          </button>
        </div>
      </div>
    </div>
  );
}
