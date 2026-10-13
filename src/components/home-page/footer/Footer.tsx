"use client";

import React from "react";
import { Layers, Mail, Phone, MapPin } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  onOpenProjectModal: () => void;
  onOpenConsultationModal: () => void;
}

export function Footer({ onOpenProjectModal, onOpenConsultationModal }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  SolutionDesk
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                  Digital Solutions Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover, scope, and request high-impact digital services delivered by verified senior software engineers, cloud architects, and product designers.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>solutions@solutiondesk.io</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>+1 (800) 555-0199 (Mon - Fri, 9am - 6pm UTC)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span>San Francisco, CA & Global Engineering Hubs</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Service Catalog
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cloud Computing & DevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cybersecurity & Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  UI/UX Design Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Workflow Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Platform (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("case-studies")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("why-us")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("testimonials")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("insights")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Engineering Insights
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultationModal}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Book a Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProjectModal}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Start Project Request
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Dispatch (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <NewsletterForm />

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Connect With Our Team
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} SolutionDesk Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Security & Compliance
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
