"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  Menu,
  ArrowRight,
  Calendar,
  ChevronDown,
  Globe,
  ShieldCheck,
  Wifi,
  Bot,
  BarChart3,
  Layers,
  Sparkles,
  BookOpen,
  Briefcase,
  Milestone,
  Info,
} from "lucide-react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { CORE_FIELDS } from "../data/mock-data";

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
  const [fieldsDropdownOpen, setFieldsDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const fieldsRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fieldsRef.current && !fieldsRef.current.contains(event.target as Node)) {
        setFieldsDropdownOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setFieldsDropdownOpen(false);
    setCompanyDropdownOpen(false);
  }, [pathname]);

  const getFieldIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return Globe;
      case "ShieldCheck":
        return ShieldCheck;
      case "Wifi":
        return Wifi;
      case "Bot":
        return Bot;
      case "BarChart3":
        return BarChart3;
      case "Sparkles":
        return Sparkles;
      case "Layers":
        return Layers;
      default:
        return Cpu;
    }
  };

  const isFieldsActive = pathname === "/fields" || pathname.startsWith("/fields");
  const isEvolutionActive = pathname === "/evolution";
  const isProjectsActive = pathname === "/projects";
  const isCompanyActive =
    pathname === "/about" ||
    pathname === "/case-studies" ||
    pathname === "/how-it-works" ||
    pathname === "/insights";
  const isContactActive = pathname === "/contact";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
        <div className="container-custom">
          <div className="flex items-center justify-between h-18">
            {/* 1. Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  NextTechGen
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 whitespace-nowrap">
                  Foundation
                </span>
              </div>
            </Link>

            {/* 2. Desktop Nav Links (Clean, uncrowded, curated) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  pathname === "/"
                    ? "text-blue-600 font-bold bg-blue-50/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                Home
              </Link>

              {/* 7 Core Fields Dropdown */}
              <div className="relative" ref={fieldsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setFieldsDropdownOpen((prev) => !prev);
                    setCompanyDropdownOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    isFieldsActive
                      ? "text-blue-600 font-bold bg-blue-50/70"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <span>7 Fields</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      fieldsDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {fieldsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        The 7 Core Disciplines
                      </span>
                      <Link
                        href="/fields"
                        className="text-[11px] font-bold text-blue-600 hover:underline"
                        onClick={() => setFieldsDropdownOpen(false)}
                      >
                        All Fields →
                      </Link>
                    </div>

                    <div className="space-y-0.5">
                      {CORE_FIELDS.map((f) => {
                        const Icon = getFieldIcon(f.iconName);
                        return (
                          <Link
                            key={f.id}
                            href={`/fields?category=${encodeURIComponent(f.category)}`}
                            onClick={() => setFieldsDropdownOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${f.accentColor.bg} ${f.accentColor.text}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors block truncate">
                                {f.name}
                              </span>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {f.tagline}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Web -> IoT Strategic Journey */}
              <Link
                href="/evolution"
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isEvolutionActive
                    ? "text-blue-600 font-bold bg-blue-50/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>Web → IoT</span>
              </Link>

              {/* Hosted Projects */}
              <Link
                href="/projects"
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isProjectsActive
                    ? "text-blue-600 font-bold bg-blue-50/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                Projects
              </Link>

              {/* Company / Resources Dropdown */}
              <div className="relative" ref={companyRef}>
                <button
                  type="button"
                  onClick={() => {
                    setCompanyDropdownOpen((prev) => !prev);
                    setFieldsDropdownOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    isCompanyActive
                      ? "text-blue-600 font-bold bg-blue-50/70"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      companyDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {companyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-0.5">
                    <Link
                      href="/about"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Info className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                          About the Foundation
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Mission, leadership & labs
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/case-studies"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Briefcase className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                          Case Studies
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Enterprise impact metrics
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/how-it-works"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Milestone className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                          How It Works
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          4-step delivery process
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/insights"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <BookOpen className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                          Engineering Insights
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Research articles & briefs
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isContactActive
                    ? "text-blue-600 font-bold bg-blue-50/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* 3. Right Action Buttons (Clean, balanced, non-wrapping) */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Find My Field Button */}
              <button
                type="button"
                onClick={onOpenSolutionFinder}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Find the right field for your project"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Find Field</span>
              </button>

              {/* Consultation Link */}
              <button
                type="button"
                onClick={onOpenConsultationModal}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>Consultation</span>
              </button>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Start Project</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>

            {/* 4. Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs whitespace-nowrap"
              >
                Start Project
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="h-5 w-5" />
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
