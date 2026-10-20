"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Globe, ShieldCheck, Wifi, Bot, BarChart3, Layers, Sparkles, ArrowRight, UserCheck, Calendar } from "lucide-react";
import { WhyChooseUsSection } from "@/components/home-page/why-choose-us/WhyChooseUsSection";
import { useModals } from "@/context/ModalContext";

export default function AboutPage() {
  const { openProjectModal, openConsultationModal } = useModals();

  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Cpu className="h-3.5 w-3.5" />
            <span>Mission & Foundation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            About <span className="text-blue-600">The NextTechGen Foundation</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            The NextTechGen Foundation is an engineering organization dedicated to unifying technology across 7 core disciplines: Web Development, Cybersecurity, IoT, Robotics, ML, AI, and Hardware.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openProjectModal(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Collaborate With Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={openConsultationModal}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>Book Technical Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leadership & Vision */}
      <div className="container-custom">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Origin & Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Bridging the Divide Between Software and Silicon
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For decades, software engineers and hardware developers worked in completely different rooms, using incompatible tools and speaking different languages. The NextTechGen Foundation was created to bridge this divide.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Under the technical leadership of <strong>Victory Amadi</strong>, our foundation has established an integrated architecture where responsive web applications directly serve as the command-and-control planes for real-time IoT sensors, autonomous robotics, and custom circuit boards.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
              VA
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Victory Amadi</h3>
              <p className="text-xs text-blue-600 font-medium">Founder & Lead Systems Architect</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-2">
                <UserCheck className="h-3 w-3" />
                NextTechGen Foundation
              </span>
            </div>
            <p className="text-xs text-slate-500 italic">
              &quot;We are taking the best of modern web development and carrying it directly into the physical world of IoT and autonomous robotics.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* The 7 Core Fields Grid */}
      <div className="container-custom space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            The 7 Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Our 7 Core Technology Fields
          </h2>
          <p className="text-sm text-slate-600">
            Everything we build is structured under these seven cohesive disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">1. Web Development</h4>
            <p className="text-xs text-slate-500">SaaS platforms, mobile apps, UI/UX, and APIs.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">2. Cybersecurity</h4>
            <p className="text-xs text-slate-500">Compliance audits, zero-trust safety, and IAM.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <Wifi className="h-5 w-5 text-cyan-600" />
            <h4 className="text-sm font-bold text-slate-900">3. IoT</h4>
            <p className="text-xs text-slate-500">Cloud telemetry, automation, and edge gateways.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <Bot className="h-5 w-5 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">4. Robotics</h4>
            <p className="text-xs text-slate-500">Autonomous navigation, ROS 2, and tele-operation.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <BarChart3 className="h-5 w-5 text-violet-600" />
            <h4 className="text-sm font-bold text-slate-900">5. Machine Learning</h4>
            <p className="text-xs text-slate-500">Predictive maintenance and anomaly detection.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h4 className="text-sm font-bold text-slate-900">6. Artificial Intelligence</h4>
            <p className="text-xs text-slate-500">Generative AI, multi-agent systems, and vision.</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <Layers className="h-5 w-5 text-orange-600" />
            <h4 className="text-sm font-bold text-slate-900">7. Hardware</h4>
            <p className="text-xs text-slate-500">Custom PCB design, ESP32/STM32 firmware, enclosures.</p>
          </div>
          <div className="p-5 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl space-y-2 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold">Explore the Catalog</h4>
              <p className="text-xs text-blue-100 mt-1">See all deliverables & sub-disciplines.</p>
            </div>
            <Link href="/fields" className="text-xs font-bold underline flex items-center gap-1">
              Browse Fields →
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Pillars */}
      <WhyChooseUsSection />
    </div>
  );
}
