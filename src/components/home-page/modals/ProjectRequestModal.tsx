"use client";

import React, { useState, useEffect } from "react";
import { SERVICES_CATALOG, ServiceItem } from "../data/mock-data";
import { IconHelper } from "../ui/IconHelper";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Mail,
  Building,
  Phone,
  FileCheck,
  Send,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  onOpenConsultation?: () => void;
}

export function ProjectRequestModal({
  isOpen,
  onClose,
  preselectedService,
  onOpenConsultation,
}: ProjectRequestModalProps) {
  // Step state: 1 to 7 (where 7 is confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields State
  const [serviceId, setServiceId] = useState<string>("web-dev");
  const [isCustomService, setIsCustomService] = useState<boolean>(false);
  const [customServiceName, setCustomServiceName] = useState<string>("");

  // Step 2: Project Description
  const [projectTitle, setProjectTitle] = useState("");
  const [projectGoals, setProjectGoals] = useState("");
  const [projectType, setProjectType] = useState<"new" | "redesign" | "scaling">("new");
  const [targetAudience, setTargetAudience] = useState("");

  // Step 3: Requirements
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [technicalNotes, setTechnicalNotes] = useState("");

  // Step 4: Budget & Timeline
  const [budgetRange, setBudgetRange] = useState("$10,000 - $25,000");
  const [timelineTarget, setTimelineTarget] = useState("1 - 2 months");
  const [urgency, setUrgency] = useState<"normal" | "urgent" | "flexible">("normal");

  // Step 5: Customer Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<"email" | "video_call" | "phone">("email");

  // Step 6: Review confirmation checkbox
  const [accuracyConfirmed, setAccuracyConfirmed] = useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mockReference, setMockReference] = useState("");

  // Update preselected service when prop changes
  useEffect(() => {
    if (preselectedService) {
      setServiceId(preselectedService.id);
      setIsCustomService(false);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const currentService = SERVICES_CATALOG.find((s) => s.id === serviceId) || SERVICES_CATALOG[0];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === 6) {
      // Simulate submission
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const ref = "PR-" + Math.floor(100000 + Math.random() * 900000);
        setMockReference(ref);
        setCurrentStep(7);
      }, 700);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleResetAndClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Guided Project Brief
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {currentStep === 7 ? "Request Submitted" : "Define Your Service Requirements"}
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close brief"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 6) */}
        {currentStep <= 6 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                {currentStep}
              </span>
              <span>
                {currentStep === 1 && "Select Service Discipline"}
                {currentStep === 2 && "Project Goals & Scope"}
                {currentStep === 3 && "Technical Requirements"}
                {currentStep === 4 && "Budget & Estimated Timeline"}
                {currentStep === 5 && "Your Contact Information"}
                {currentStep === 6 && "Review & Submit Request"}
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">
              Step {currentStep} of 6
            </span>
          </div>
        )}

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: Select or Confirm Service */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Confirm the Service Category
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the primary domain for your engagement or select custom if your request spans multiple disciplines.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {SERVICES_CATALOG.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setServiceId(svc.id);
                      setIsCustomService(false);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      serviceId === svc.id && !isCustomService
                        ? "border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <IconHelper name={svc.iconName} className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {svc.title}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {svc.category}
                        </span>
                      </div>
                    </div>
                    {serviceId === svc.id && !isCustomService && (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom option */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomService(true)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isCustomService
                      ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Custom Multi-Disciplinary Service
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Need web + AI + cloud design in one combined project
                      </span>
                    </div>
                  </div>
                  {isCustomService && (
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  )}
                </button>

                {isCustomService && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="e.g., Full stack AI platform with mobile companion app..."
                      value={customServiceName}
                      onChange={(e) => setCustomServiceName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Project Description */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Describe Your Project
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Explain what you want to achieve in plain words without technical jargon.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title or Working Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Customer Portal Redesign or Real-Time Dispatch System"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What problem are you trying to solve? *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current bottleneck, business objective, or the user experience you want to create..."
                  value={projectGoals}
                  onChange={(e) => setProjectGoals(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Stage
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: "new", label: "Greenfield (Brand New Build)" },
                      { id: "redesign", label: "Redesign / Refactor Existing" },
                      { id: "scaling", label: "Performance & Scaling Upgrade" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setProjectType(st.id as any)}
                        className={`w-full text-left p-2 rounded-lg text-xs font-medium border cursor-pointer ${
                          projectType === st.id
                            ? "border-blue-600 bg-blue-50/50 text-blue-800"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Who will use the solution?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., B2B clients, internal staff, mobile consumers"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Define Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Required Features & Specifications
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Select the key modules you anticipate needing for{" "}
                  <strong>{isCustomService ? "Custom Request" : currentService.title}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Applicable Capabilities:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "User Authentication & Roles (SSO / OAuth)",
                    "Payment Processing (Stripe / Multi-currency)",
                    "Data Analytics / BI Reporting Dashboard",
                    "Custom API Gateway / Webhooks",
                    "Automated CI/CD & Cloud Infrastructure",
                    "Real-Time WebSockets / Notifications",
                    "Interactive Figma Design System Handoff",
                    "SOC 2 / HIPAA Compliance Hardening",
                  ].map((feat) => {
                    const isChecked = selectedFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? "border-blue-600 bg-blue-50/60 text-blue-900"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{feat}</span>
                        {isChecked && (
                          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Technical Requirements or Existing Stack:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Must integrate with existing PostgreSQL DB, host on AWS, or comply with specific API specs..."
                  value={technicalNotes}
                  onChange={(e) => setTechnicalNotes(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Budget & Timeline */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Budget & Timeline Parameters
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  We use this to align engineering seniority, sprint capacity, and delivery milestones.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Estimated Investment Range (USD)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "$5,000 - $10,000",
                    "$10,000 - $25,000",
                    "$25,000 - $50,000",
                    "$50,000 - $100,000",
                    "$100,000+",
                    "To Be Advised",
                  ].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudgetRange(range)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-colors cursor-pointer ${
                        budgetRange === range
                          ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Timeframe
                  </label>
                  <select
                    value={timelineTarget}
                    onChange={(e) => setTimelineTarget(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Under 4 weeks">Under 4 weeks (Fast-track MVP)</option>
                    <option value="1 - 2 months">1 - 2 months (Standard sprint)</option>
                    <option value="3 - 6 months">3 - 6 months (Enterprise milestone)</option>
                    <option value="Ongoing / Retainer">Ongoing SLA / Monthly Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["flexible", "normal", "urgent"] as const).map((urg) => (
                      <button
                        key={urg}
                        type="button"
                        onClick={() => setUrgency(urg)}
                        className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                          urgency === urg
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {urg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Customer Information */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Your Contact Information
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  We will deliver your formal architecture brief and milestone estimate to this address.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Taylor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="TechCorp Global"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="+1 (555) 000-1234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Communication Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "email", label: "Email Spec" },
                    { id: "video_call", label: "Video Call" },
                    { id: "phone", label: "Phone Call" },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPreferredContact(ch.id as any)}
                      className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                        preferredContact === ch.id
                          ? "border-blue-600 bg-blue-50 text-blue-800"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Submit */}
          {currentStep === 6 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Review Your Project Request
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Please review the summary below before submitting to our engineering leads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-3.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Service Category:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {isCustomService
                        ? customServiceName || "Custom Multi-Service Request"
                        : currentService.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-600 underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Project Goals:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 line-clamp-1 max-w-[200px]">
                      {projectTitle || "Not specified"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-blue-600 underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Budget & Timeline:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {budgetRange} ({timelineTarget})
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="text-blue-600 underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Contact:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {fullName || "Client"} ({email || "Email provided"})
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="text-blue-600 underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="confirm-acc"
                  checked={accuracyConfirmed}
                  onChange={(e) => setAccuracyConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="confirm-acc"
                  className="text-xs text-slate-600 cursor-pointer"
                >
                  I confirm the provided project scope is accurate for preliminary architecture assessment.
                </label>
              </div>
            </div>
          )}

          {/* STEP 7: Confirmation Screen */}
          {currentStep === 7 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Request Successfully Recorded
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Your Project Brief is in Triage
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName || "there"}</strong>! Our principal engineers are reviewing your requirements and preparing your tailored delivery roadmap.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left text-xs max-w-md mx-auto space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Project Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{mockReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Discipline:</span>
                  <span className="font-semibold text-slate-900">
                    {isCustomService
                      ? customServiceName || "Custom Service"
                      : currentService.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Response:</span>
                  <span className="font-semibold text-emerald-700">Within 24 business hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors cursor-pointer"
                >
                  Back to Services
                </button>
                {onOpenConsultation && (
                  <button
                    onClick={() => {
                      handleResetAndClose();
                      onOpenConsultation();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book Immediate Consultation</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons (Steps 1 to 6) */}
        {currentStep <= 6 && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={isSubmitting || (currentStep === 6 && !accuracyConfirmed)}
              onClick={handleNext}
              className={`px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span>Generating Roadmap...</span>
              ) : currentStep === 6 ? (
                <>
                  <span>Submit Project Request</span>
                  <Send className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

