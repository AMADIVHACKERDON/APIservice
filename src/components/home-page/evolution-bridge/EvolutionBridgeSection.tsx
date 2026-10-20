"use client";

import React, { useState } from "react";
import {
  Globe,
  Wifi,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface EvolutionBridgeSectionProps {
  onSelectProject?: (projectId: string) => void;
}

interface EvolutionStage {
  step: string;
  id: string;
  title: string;
  subtitle: string;
  field: "Web Development" | "IoT" | "Hardware" | "Cybersecurity";
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  description: string;
  keyTechnologies: string[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
  connectedProjectId: string;
  connectedProjectTitle: string;
}

const STAGES: EvolutionStage[] = [
  {
    step: "01",
    id: "web-portal",
    title: "Web SaaS & Control Portal",
    subtitle: "Software Control Plane",
    field: "Web Development",
    icon: Globe,
    accentColor: "from-blue-600 to-indigo-600",
    description:
      "Modern full-stack web applications and responsive customer portals built with Next.js 16 and React 19. This is where operators view telematics, calibrate parameters, and issue operational commands.",
    keyTechnologies: ["Next.js 16", "React 19", "WebSockets", "Tailwind CSS", "TypeScript"],
    codeSnippet: {
      language: "typescript",
      filename: "useDeviceTelemetry.ts",
      code: `// NextTechGen Web Frontend Telemetry Hook
export function useDeviceTelemetry(deviceId: string) {
  const [telemetry, setTelemetry] = useState<SensorData | null>(null);
  
  useEffect(() => {
    const ws = new WebSocket(\`wss://gateway.nexttechgen.org/stream/\${deviceId}\`);
    ws.onmessage = (event) => setTelemetry(JSON.parse(event.data));
    return () => ws.close();
  }, [deviceId]);

  return { telemetry, sendCommand: (cmd) => ws.send(JSON.stringify(cmd)) };
}`,
    },
    connectedProjectId: "proj-fleet-portal",
    connectedProjectTitle: "NextTechGen Cloud Fleet Portal",
  },
  {
    step: "02",
    id: "telemetry-gateway",
    title: "Cloud Telemetry & Ingestion",
    subtitle: "The Real-Time Bridge",
    field: "IoT",
    icon: Wifi,
    accentColor: "from-cyan-600 to-blue-600",
    description:
      "High-throughput MQTT 5.0 and WebSocket brokers that translate web frontend commands into lightweight device payloads and buffer millions of sensor readings with sub-second latency.",
    keyTechnologies: ["MQTT 5.0", "EMQX Broker", "Kafka", "TimescaleDB", "Docker"],
    codeSnippet: {
      language: "typescript",
      filename: "telemetryBroker.ts",
      code: `// NextTechGen Real-Time Telemetry Broker
mqttClient.on('message', async (topic, payload) => {
  const telemetry = parseSensorPayload(payload);
  // Verify cryptographic mTLS device certificate
  await verifyDeviceIdentity(telemetry.hwId);
  // Stream sub-second reading to connected Web Frontends
  broadcastToWebSockets(\`devices/\${telemetry.hwId}\`, telemetry);
  // Persist to high-write time-series store
  await timescaledb.insert('sensor_metrics', telemetry);
});`,
    },
    connectedProjectId: "proj-edgepulse-gateway",
    connectedProjectTitle: "EdgePulse IoT Sensor Gateway",
  },
  {
    step: "03",
    id: "edge-security",
    title: "Zero-Trust Device Security",
    subtitle: "Silicon-to-Cloud Integrity",
    field: "Cybersecurity",
    icon: ShieldCheck,
    accentColor: "from-emerald-600 to-teal-600",
    description:
      "Per-device mutual TLS (mTLS) cryptographic certificates, hardware secure elements, tamper-resistant bootloaders, and Over-The-Air (OTA) firmware integrity verification.",
    keyTechnologies: ["mTLS (X.509)", "Vault", "Cloudflare WAF", "Secure Boot", "AES-256"],
    codeSnippet: {
      language: "bash",
      filename: "device_handshake.sh",
      code: `# Verify Hardware Node Identity via Cryptographic Challenge
curl --cert /etc/ssl/device-crt.pem \\
     --key /etc/ssl/device-key.pem \\
     --cacert /etc/ssl/nexttechgen-ca.pem \\
     https://auth.nexttechgen.org/v1/hardware/handshake \\
     -X POST -d '{"chip_id": "ESP32S3-7FA4"}'`,
    },
    connectedProjectId: "proj-sentinel-security",
    connectedProjectTitle: "SentinelShield Compliance Monitor",
  },
  {
    step: "04",
    id: "hardware-node",
    title: "Physical IoT Node & Firmware",
    subtitle: "Silicon & Embedded Sensors",
    field: "Hardware",
    icon: Cpu,
    accentColor: "from-orange-600 to-amber-600",
    description:
      "Custom 4-layer PCB circuits powered by ESP32-S3 and ARM Cortex microcontrollers, sampling precision vibration, temperature, and motion sensors in IP67 rugged field enclosures.",
    keyTechnologies: ["ESP32-S3", "FreeRTOS", "Embedded C++", "KiCad 8", "I2C / SPI"],
    codeSnippet: {
      language: "cpp",
      filename: "sensornode_main.cpp",
      code: `// NextTechGen ESP32-S3 Firmware Loop
void app_main(void) {
  i2c_sensor_init();
  wifi_connect_secure_mtls();
  
  while(1) {
    SensorPayload data = read_i2c_telemetry();
    publish_mqtt_telemetry("telemetry/node-01", data);
    // Deep sleep for battery preservation
    esp_deep_sleep(10000000); // 10 seconds
  }
}`,
    },
    connectedProjectId: "proj-sensornode-pcb",
    connectedProjectTitle: "Modular SensorNode V2 PCB",
  },
];

export function EvolutionBridgeSection({ onSelectProject }: EvolutionBridgeSectionProps) {
  const [activeStageId, setActiveStageId] = useState<string>("web-portal");

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  const handleJumpToProject = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    } else {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="evolution-bridge"
      className="py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            Strategic Technology Transition
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How Web Development Evolves into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
              Connected IoT & Hardware
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            At The NextTechGen Foundation, we don&apos;t just build isolated websites. Our web applications act as mission control centers, bridging directly into real-time telemetry pipelines, edge gateways, and physical sensor silicon.
          </p>
        </div>

        {/* 4-Stage Interactive Pipeline Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 backdrop-blur-xs">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isSelected = activeStage.id === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all flex flex-col justify-between gap-3 cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-700/90 shadow-lg border border-blue-500/50"
                    : "hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400" />
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900/60 text-slate-400 border border-slate-700">
                    Stage {stage.step}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-slate-400">{stage.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Exploration Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Stage Deep-Dive & Project Connection (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <activeStage.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Stage {activeStage.step} • {activeStage.field}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      In Production
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>

              {/* Technologies */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Core Technologies & Standards
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.keyTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-200 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connected Foundation Hosted Project Action Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Corresponding Foundation Project:
                </span>
                <div className="text-sm font-bold text-white mt-0.5">
                  {activeStage.connectedProjectTitle}
                </div>
              </div>

              <button
                onClick={() => handleJumpToProject(activeStage.connectedProjectId)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20 shrink-0"
              >
                <span>Explore Project Demo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Real-time Code & Protocol Visualizer (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
            {/* Window header */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-slate-400 font-mono ml-2 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-blue-400" />
                  {activeStage.codeSnippet.filename}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {activeStage.codeSnippet.language}
              </span>
            </div>

            {/* Code Content */}
            <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed flex-1 flex flex-col justify-center bg-slate-950/90">
              <pre>
                <code>{activeStage.codeSnippet.code}</code>
              </pre>
            </div>

            {/* Bottom status line */}
            <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
                Stream Status: Active (0% Packet Loss)
              </span>
              <span>NextTechGen / v2.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
