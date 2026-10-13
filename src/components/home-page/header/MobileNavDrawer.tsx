"use client";

import React from "react";
import { X, Layers, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: () => void;
  onOpenConsultationModal: () => void;
  onOpenSolutionFinder: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenProjectModal,
  onOpenConsultationModal,
  onOpenSolutionFinder,
}: MobileNavDrawerProps) {
  if (!isOpen) return null;

  const handleNavClick = (anchorId: string) => {
    onClose();
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">SolutionDesk</span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-blue-600">Digital Solutions</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick("services")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Explore Services
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick("featured")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Featured Solutions
            </button>
            <button
              onClick={() => handleNavClick("case-studies")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleNavClick("why-us")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavClick("insights")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Insights & Articles
            </button>
          </nav>

          {/* Solution Finder Card */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
              <ShieldCheck className="h-4 w-4" />
              Not Sure What You Need?
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Use our guided tool to find the exact service for your business challenge.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenSolutionFinder();
              }}
              className="w-full py-2 px-3 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-semibold rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              Find My Solution
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenConsultationModal();
            }}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="h-4 w-4 text-slate-600" />
            Book a Consultation
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenProjectModal();
            }}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

