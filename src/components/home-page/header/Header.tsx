"use client";

import React, { useState } from "react";
import { Layers, Menu, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { MobileNavDrawer } from "./MobileNavDrawer";

interface HeaderProps {
  onOpenProjectModal: () => void;
  onOpenConsultationModal: () => void;
  onOpenSolutionFinder: () => void;
}

export function Header({
  onOpenProjectModal,
  onOpenConsultationModal,
  onOpenSolutionFinder,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-header transition-all">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    SolutionDesk
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    Digital Solutions Platform
                  </span>
                </div>
              </a>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                <button
                  onClick={() => scrollTo("services")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  Explore Services
                </button>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollTo("featured")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  Featured
                </button>
                <button
                  onClick={() => scrollTo("case-studies")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  Case Studies
                </button>
                <button
                  onClick={() => scrollTo("why-us")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  Why Us
                </button>
                <button
                  onClick={() => scrollTo("insights")}
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer"
                >
                  Insights
                </button>
              </nav>
            </div>

            {/* Right Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onOpenSolutionFinder}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-lg border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Find My Solution
              </button>

              <button
                onClick={onOpenConsultationModal}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-slate-500" />
                Book Consultation
              </button>

              <button
                onClick={onOpenProjectModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenProjectModal}
                className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Start Project
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenProjectModal={onOpenProjectModal}
        onOpenConsultationModal={onOpenConsultationModal}
        onOpenSolutionFinder={onOpenSolutionFinder}
      />
    </>
  );
}

