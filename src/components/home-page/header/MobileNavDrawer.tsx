"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Cpu,
  Calendar,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Globe,
  Wifi,
  Bot,
  BarChart3,
  Layers,
  BookOpen,
  Briefcase,
  Milestone,
  Info,
} from "lucide-react";
import { CORE_FIELDS } from "../data/mock-data";

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
  const [fieldsExpanded, setFieldsExpanded] = useState(false);
  const [companyExpanded, setCompanyExpanded] = useState(false);
  const pathname = usePathname();

  if (!isOpen) return null;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

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

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 tracking-tight block">
                  NextTechGen
                </span>
                <span className="block text-[10px] uppercase tracking-wider font-bold text-blue-600">
                  Foundation
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors block ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            {/* 7 Fields Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setFieldsExpanded((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive("/fields")
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <span>7 Core Fields</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    fieldsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {fieldsExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-0.5 border-l-2 border-slate-100 ml-3 my-1">
                  <Link
                    href="/fields"
                    onClick={onClose}
                    className="block px-3 py-1.5 text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All 7 Fields →
                  </Link>
                  {CORE_FIELDS.map((f) => {
                    const Icon = getFieldIcon(f.iconName);
                    return (
                      <Link
                        key={f.id}
                        href={`/fields?category=${encodeURIComponent(f.category)}`}
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      >
                        <Icon className="h-3.5 w-3.5 text-slate-400" />
                        <span>{f.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Web -> IoT Strategic Journey */}
            <Link
              href="/evolution"
              onClick={onClose}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                isActive("/evolution")
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Web → IoT Journey</span>
            </Link>

            {/* Hosted Projects */}
            <Link
              href="/projects"
              onClick={onClose}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors block ${
                isActive("/projects")
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Hosted Projects
            </Link>

            {/* Company Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setCompanyExpanded((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive("/about") ||
                  isActive("/case-studies") ||
                  isActive("/how-it-works") ||
                  isActive("/insights")
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <span>Company & Resources</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    companyExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {companyExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-0.5 border-l-2 border-slate-100 ml-3 my-1">
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                    <span>About the Foundation</span>
                  </Link>
                  <Link
                    href="/case-studies"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span>Case Studies</span>
                  </Link>
                  <Link
                    href="/how-it-works"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
                    <Milestone className="h-3.5 w-3.5 text-slate-400" />
                    <span>How It Works</span>
                  </Link>
                  <Link
                    href="/insights"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                    <span>Engineering Insights</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={onClose}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors block ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Contact & Inquiries
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSolutionFinder();
            }}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Find My Field</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultationModal();
            }}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-600" />
            <span>Book Consultation</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenProjectModal();
            }}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
