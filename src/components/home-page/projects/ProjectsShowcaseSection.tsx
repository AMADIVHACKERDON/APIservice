"use client";

import React, { useState, useMemo } from "react";
import { ACTIVE_PROJECTS, ProjectItem, CoreFieldCategory } from "../data/mock-data";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailModal } from "./ProjectDetailModal";
import {
  Sparkles,
  LayoutGrid,
  Globe,
  ShieldCheck,
  Wifi,
  Bot,
  BarChart3,
  Layers,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

interface ProjectsShowcaseSectionProps {
  onStartSimilarProject: () => void;
  selectedProjectId?: string | null;
}

type ProjectFilter = "All" | CoreFieldCategory;

const FILTERS: { type: ProjectFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: "All", label: "All Projects", icon: LayoutGrid },
  { type: "Web Development", label: "Web Dev", icon: Globe },
  { type: "Cybersecurity", label: "Security", icon: ShieldCheck },
  { type: "IoT", label: "IoT", icon: Wifi },
  { type: "Robotics", label: "Robotics", icon: Bot },
  { type: "ML", label: "ML", icon: BarChart3 },
  { type: "AI", label: "AI", icon: Sparkles },
  { type: "Hardware", label: "Hardware", icon: Layers },
];

export function ProjectsShowcaseSection({
  onStartSimilarProject,
}: ProjectsShowcaseSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Compute filter counts
  const counts = useMemo(() => {
    const map: Record<ProjectFilter, number> = {
      All: ACTIVE_PROJECTS.length,
      "Web Development": 0,
      Cybersecurity: 0,
      IoT: 0,
      Robotics: 0,
      ML: 0,
      AI: 0,
      Hardware: 0,
    };

    ACTIVE_PROJECTS.forEach((p) => {
      if (map[p.fieldCategory] !== undefined) {
        map[p.fieldCategory]++;
      }
    });

    return map;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return ACTIVE_PROJECTS;
    return ACTIVE_PROJECTS.filter((p) => p.fieldCategory === selectedFilter);
  }, [selectedFilter]);

  const handleNavigateToTwin = (twinProjectId: string) => {
    const twin = ACTIVE_PROJECTS.find((p) => p.id === twinProjectId);
    if (twin) {
      setSelectedFilter(twin.fieldCategory);
      setActiveModalProject(twin);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-24 bg-white border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              NextTechGen Foundation Lab
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Active Projects & Hosted Systems
            </h2>
            <p className="text-base text-slate-600">
              Explore the real applications, telemetry brokers, robotic simulators, and hardware testbeds built and hosted directly on the frontend by our engineering foundation.
            </p>
          </div>

          <button
            onClick={onStartSimilarProject}
            className="self-start md:self-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Commission a Solution</span>
          </button>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTERS.map(({ type, label, icon: Icon }) => {
            const isActive = selectedFilter === type;
            const count = counts[type] || 0;

            return (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-1 ring-slate-900"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-blue-400" : "text-slate-400"
                  }`}
                />
                <span>{label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-slate-700 text-slate-200"
                      : "bg-slate-200/80 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
              onNavigateToTwin={handleNavigateToTwin}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              Need custom development bridging software and IoT devices?
            </h4>
            <p className="text-xs text-slate-600">
              The NextTechGen Foundation provides end-to-end engineering from web frontend and cloud telemetry down to embedded silicon.
            </p>
          </div>
          <button
            onClick={onStartSimilarProject}
            className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Start a Project Brief</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectConnectedTwin={handleNavigateToTwin}
      />
    </section>
  );
}
