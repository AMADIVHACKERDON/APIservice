"use client";

import React from "react";
import { ServiceItem } from "../data/mock-data";
import { IconHelper } from "../ui/IconHelper";
import { X, CheckCircle2, Clock, ArrowRight, AlertCircle, Wrench, Layers } from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onGetStarted: (service: ServiceItem) => void;
}

export function ServiceDetailModal({
  service,
  onClose,
  onGetStarted,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <IconHelper name={service.iconName} className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                {service.category} Discipline
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview & Capabilities
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.full_description}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Typical Challenge We Address
              </h5>
              <p className="text-xs text-amber-800 leading-relaxed">
                {service.problem_statement}
              </p>
            </div>
          </div>

          {/* Deliverables Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-600" />
              What This Service Includes
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Common Use Cases
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.use_cases.map((useCase, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/60 font-medium"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-slate-500" />
              Supported Frameworks & Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200/60 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500 w-full sm:w-auto">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="h-4 w-4 text-slate-400" />
              Est. {service.turnaround_estimate}
            </span>
            <span className="font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {service.starting_price_hint}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onGetStarted(service);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start Project with {service.title}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

