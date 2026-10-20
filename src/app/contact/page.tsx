"use client";

import React, { useState } from "react";
import { useModals } from "@/context/ModalContext";
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar, FileText, ArrowRight } from "lucide-react";
import { CORE_FIELDS } from "@/components/home-page/data/mock-data";

export default function ContactPage() {
  const { openProjectModal, openConsultationModal } = useModals();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedField, setSelectedField] = useState("Web Development");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="container-custom">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold">
            <Mail className="h-3.5 w-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Contact <span className="text-blue-600">The NextTechGen Foundation</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you need a full-stack SaaS platform, cloud telemetry infrastructure, a robotics simulation, or custom PCB engineering, our team is ready to collaborate.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to The NextTechGen Foundation. An engineering lead will review your message and reply within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below or use our guided brief wizard for full requirements.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Victory Amadi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Primary Core Field</label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  >
                    {CORE_FIELDS.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                    <option value="Multi-disciplinary">Multi-Disciplinary / Cross-Field</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Project Overview</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you want to build or the business problem you're addressing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Links & Labs Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Brief Wizard Card */}
            <div className="p-6 bg-gradient-to-tr from-slate-900 to-blue-950 text-white rounded-2xl border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Prefer a Guided Process?
                </span>
              </div>
              <h4 className="text-lg font-bold">Use Our 6-Step Project Brief Wizard</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specify features, timelines, and budget ranges with zero technical jargon. We will generate an architecture scope for you.
              </p>
              <button
                onClick={() => openProjectModal(null)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch Project Brief Wizard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Book Consultation Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Schedule a Technical Consultation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book a 30-minute direct session with a senior architect to discuss system architecture and feasibility.
              </p>
              <button
                onClick={openConsultationModal}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Book 30-Min Consultation
              </button>
            </div>

            {/* Direct Contact Info */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-3 shadow-xs text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                <span>foundation@nexttechgen.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                <span>+1 (800) 555-0199 (Mon - Fri, 9am - 6pm UTC)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Global Engineering Hubs & Prototyping Labs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
