"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useModals } from "@/context/ModalContext";
import { HeroSection } from "@/components/home-page/hero/HeroSection";
import { CORE_FIELDS, ACTIVE_PROJECTS, ServiceItem, ProjectItem } from "@/components/home-page/data/mock-data";
import { ProjectCard } from "@/components/home-page/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/home-page/projects/ProjectDetailModal";
import { FeaturedCaseStudiesSection } from "@/components/home-page/case-studies/FeaturedCaseStudiesSection";
import { WhyChooseUsSection } from "@/components/home-page/why-choose-us/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home-page/testimonials/TestimonialsSection";
import { ConsultationCtaSection } from "@/components/home-page/consultation-cta/ConsultationCtaSection";
import { IconHelper } from "@/components/home-page/ui/IconHelper";
import {
  Layers,
  ArrowRight,
  Zap,
  Sparkles,
  ChevronRight,
  Activity,
  Cpu,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const { openProjectModal, openConsultationModal, openSolutionFinder } = useModals();
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Take top 3 projects for the home page showcase
  const previewProjects = ACTIVE_PROJECTS.slice(0, 3);

  return (
    <div className="space-y-20 md:space-y-24">
      {/* 1. Hero Section */}
      <HeroSection
        onOpenProjectModal={() => openProjectModal(null)}
        onOpenConsultationModal={openConsultationModal}
        onOpenSolutionFinder={openSolutionFinder}
      />

      {/* 2. The 7 Core Fields Spotlight Grid */}
      <section className="container-custom space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
              <Layers className="h-3.5 w-3.5" />
              <span>Foundation Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The 7 Core Disciplines
            </h2>
            <p className="text-base text-slate-600">
              We group all engineering specializations into 7 focused domains. Click any field to view its capabilities, deliverables, and tech stack.
            </p>
          </div>

          <Link
            href="/fields"
            className="self-start md:self-auto text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 group"
          >
            <span>View Full Catalog Across All 7 Fields</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 7 Fields Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CORE_FIELDS.map((field) => (
            <Link
              key={field.id}
              href={`/fields?category=${encodeURIComponent(field.category)}`}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl ${field.accentColor.bg} ${field.accentColor.text} group-hover:scale-105 transition-transform`}
                  >
                    <IconHelper name={field.iconName} className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {field.stats.value}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {field.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {field.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Explore Capabilities</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}

          {/* Quick Custom Scope Card */}
          <div className="bg-gradient-to-tr from-slate-900 to-blue-950 text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">Multi-Disciplinary Need?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need Web + IoT + Hardware + AI in one combined engagement? We will architect a cross-field roadmap for you.
              </p>
            </div>

            <button
              onClick={() => openProjectModal(null)}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <span>Start Multi-Discipline Brief</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Web Development -> IoT Strategic Bridge Spotlight */}
      <section className="container-custom">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold">
                <Zap className="h-3.5 w-3.5" />
                <span>Strategic Engineering Transition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                From Web Platforms to Connected IoT & Hardware
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Discover our interactive 4-stage pipeline demonstrating how modern Next.js web applications evolve into sub-second MQTT telemetry brokers, zero-trust hardware security, and physical sensor silicon.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/evolution"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-blue-600/20"
                >
                  <span>Experience the Web → IoT Bridge</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/projects"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Launch Live System Demos</span>
                </Link>
              </div>
            </div>

            {/* Visual Steps Mini-Widget */}
            <div className="lg:col-span-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-[10px] uppercase font-bold text-cyan-400">Pipeline Flow</span>
                <span>4 Stages</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Next.js Web SaaS Control Plane</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-400 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>MQTT 5.0 Telemetry Broker</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>mTLS Cryptographic Handshake</span>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <span className="w-5 h-5 rounded-full bg-orange-600/30 text-orange-400 flex items-center justify-center text-[10px] font-bold">4</span>
                  <span>ESP32-S3 PCB Silicon & Sensors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Hosted Projects Preview (Top 3) */}
      <section className="container-custom space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tested & Hosted on Frontend</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Active Projects & Hosted Systems
            </h2>
            <p className="text-base text-slate-600">
              Launch interactive demos of real web portals, sensor brokers, and hardware testbeds engineered by our foundation.
            </p>
          </div>

          <Link
            href="/projects"
            className="self-start md:self-auto text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 group"
          >
            <span>Explore All {ACTIVE_PROJECTS.length} Hosted Projects</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Projects Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. Featured Case Studies */}
      <FeaturedCaseStudiesSection
        onStartSimilarProject={() => openProjectModal(null)}
      />

      {/* 6. Why Choose Us Trust Pillars */}
      <WhyChooseUsSection />

      {/* 7. Client & Partner Testimonials */}
      <TestimonialsSection />

      {/* 8. Closing Consultation CTA */}
      <ConsultationCtaSection
        onOpenProjectModal={() => openProjectModal(null)}
      />

      {/* Interactive Project Detail Modal for the Home Page */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
