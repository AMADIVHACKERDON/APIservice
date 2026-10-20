"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  onOpenProjectModal: () => void;
  onOpenConsultationModal: () => void;
}

export function Footer({ onOpenProjectModal, onOpenConsultationModal }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block group-hover:text-blue-400 transition-colors">
                  The NextTechGen Foundation
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                  7 Core Technology Disciplines
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Advancing technological frontiers from high-performance web applications and cybersecurity to connected IoT, robotics, ML, AI, and custom hardware engineering.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>foundation@nexttechgen.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>+1 (800) 555-0199 (Mon - Fri, 9am - 6pm UTC)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Global Engineering Hubs & Hardware Prototyping Labs</span>
              </div>
            </div>
          </div>

          {/* Col 2: The 7 Core Fields (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              7 Core Fields
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link
                  href="/fields?category=Web%20Development"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=Cybersecurity"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=IoT"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  IoT (Internet of Things)
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=Robotics"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Robotics
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=ML"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  ML (Machine Learning)
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=AI"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  AI (Artificial Intelligence)
                </Link>
              </li>
              <li>
                <Link
                  href="/fields?category=Hardware"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Foundation Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation & Programs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link
                  href="/evolution"
                  className="hover:text-blue-400 transition-colors text-left flex items-center gap-1"
                >
                  <span>Web → IoT Strategic Journey</span>
                  <ArrowRight className="h-3 w-3 text-blue-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Active Hosted Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  How It Works & Process
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  About the Foundation
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Engineering Research & Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors text-left block"
                >
                  Contact & Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Community (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              NextTechGen Dispatch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive quarterly technical briefs on web software, edge IoT gateways, robotics telematics, and hardware schematics.
            </p>

            <NewsletterForm />

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/AMADIVHACKERDON"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} The NextTechGen Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About Foundation
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact & Inquiries
            </Link>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Zero-Trust Security
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Open Science Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
