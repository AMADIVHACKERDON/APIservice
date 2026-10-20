"use client";

import React from "react";
import { ProjectItem } from "../data/mock-data";
import {
  ExternalLink,
  Play,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  Link2,
} from "lucide-react";
import { IconHelper } from "../ui/IconHelper";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
  onNavigateToTwin?: (twinProjectId: string) => void;
}

export function ProjectCard({
  project,
  onOpenDetails,
  onNavigateToTwin,
}: ProjectCardProps) {
  const getFieldBadgeStyle = (fieldId: string) => {
    switch (fieldId) {
      case "web-development":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cybersecurity":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "iot":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "robotics":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "ml":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "ai":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "hardware":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner & Metadata */}
      <div className="p-6 space-y-4">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getFieldBadgeStyle(
              project.fieldId
            )}`}
          >
            {project.fieldCategory}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              project.status === "Live Hosted Demo"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : project.status === "Hardware Testbed"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "Live Hosted Demo"
                  ? "bg-emerald-500 animate-pulse"
                  : project.status === "Hardware Testbed"
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
            />
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs text-blue-600 font-medium mt-0.5">
            {project.subDisciplineTitle}
          </p>
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 text-center">
          {project.metrics.map((m, i) => (
            <div key={i} className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block truncate">
                {m.label}
              </span>
              <span className="text-xs font-bold text-slate-900 block truncate">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Cross-Field Evolution Link & Actions Footer */}
      <div className="px-6 pb-6 pt-2 space-y-3">
        {/* Connected Twin / Evolution Bridge Link */}
        {project.connectedTwin && (
          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/90 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Link2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="text-[11px] text-slate-700 truncate">
                Connects to: <strong className="text-blue-700 font-semibold">{project.connectedTwin.projectTitle}</strong>
              </span>
            </div>
            {onNavigateToTwin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTwin(project.connectedTwin!.projectId);
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline shrink-0 cursor-pointer flex items-center gap-0.5"
              >
                <span>Jump</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={() => onOpenDetails(project)}
            className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Launch Interactive Demo</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="View Repository"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
