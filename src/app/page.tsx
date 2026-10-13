"use client";

import React, { useState } from "react";
import { Header } from "@/components/home-page/header/Header";
import { HeroSection } from "@/components/home-page/hero/HeroSection";
import { ServiceDiscoverySection } from "@/components/home-page/service-discovery/ServiceDiscoverySection";
import { RecommendationSection } from "@/components/home-page/recommendation/RecommendationSection";
import { HowItWorksSection } from "@/components/home-page/how-it-works/HowItWorksSection";
import { FeaturedServicesSection } from "@/components/home-page/featured-services/FeaturedServicesSection";
import { FeaturedCaseStudiesSection } from "@/components/home-page/case-studies/FeaturedCaseStudiesSection";
import { WhyChooseUsSection } from "@/components/home-page/why-choose-us/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home-page/testimonials/TestimonialsSection";
import { InsightsSection } from "@/components/home-page/insights/InsightsSection";
import { ConsultationCtaSection } from "@/components/home-page/consultation-cta/ConsultationCtaSection";
import { Footer } from "@/components/home-page/footer/Footer";

// Modals
import { ProjectRequestModal } from "@/components/home-page/modals/ProjectRequestModal";
import { BookConsultationModal } from "@/components/home-page/consultation-cta/BookConsultationModal";
import { SolutionFinderModal } from "@/components/home-page/recommendation/SolutionFinderModal";
import { ServiceDetailModal } from "@/components/home-page/service-discovery/ServiceDetailModal";
import { ServiceItem } from "@/components/home-page/data/mock-data";

export default function HomePage() {
  // Modal states
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [solutionFinderOpen, setSolutionFinderOpen] = useState(false);
  const [detailModalService, setDetailModalService] = useState<ServiceItem | null>(null);

  // Handlers
  const handleOpenProjectModal = (service?: ServiceItem | null) => {
    setPreselectedService(service || null);
    setProjectModalOpen(true);
  };

  const handleOpenCustomRequest = () => {
    setPreselectedService(null);
    setProjectModalOpen(true);
  };

  const handleSelectRecommendedService = (service: ServiceItem) => {
    setPreselectedService(service);
    setProjectModalOpen(true);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Header
        onOpenProjectModal={() => handleOpenProjectModal(null)}
        onOpenConsultationModal={() => setConsultationModalOpen(true)}
        onOpenSolutionFinder={() => setSolutionFinderOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* A. Hero Section */}
        <HeroSection
          onOpenProjectModal={() => handleOpenProjectModal(null)}
          onOpenConsultationModal={() => setConsultationModalOpen(true)}
          onOpenSolutionFinder={() => setSolutionFinderOpen(true)}
        />

        {/* B. Interactive Service Discovery Section */}
        <ServiceDiscoverySection
          onGetStarted={(svc) => handleOpenProjectModal(svc)}
          onOpenCustomRequest={handleOpenCustomRequest}
        />

        {/* C. "Not sure what you need?" Interactive Recommender Entry Point */}
        <RecommendationSection
          onSelectRecommendedService={handleSelectRecommendedService}
        />

        {/* D. How It Works Section */}
        <HowItWorksSection
          onOpenProjectModal={() => handleOpenProjectModal(null)}
        />

        {/* E. Featured Flagship Services */}
        <FeaturedServicesSection
          onGetStarted={(svc) => handleOpenProjectModal(svc)}
          onLearnMore={(svc) => setDetailModalService(svc)}
          onViewAllServices={handleScrollToServices}
        />

        {/* F. Featured Case Studies */}
        <FeaturedCaseStudiesSection
          onStartSimilarProject={() => handleOpenProjectModal(null)}
        />

        {/* G. Why Choose Us Trust Pillars */}
        <WhyChooseUsSection />

        {/* H. Client Testimonials Carousel */}
        <TestimonialsSection />

        {/* I. Engineering Insights & Resources */}
        <InsightsSection />

        {/* J. Consultation & Closing CTA */}
        <ConsultationCtaSection
          onOpenProjectModal={() => handleOpenProjectModal(null)}
        />
      </main>

      {/* K. Comprehensive Footer */}
      <Footer
        onOpenProjectModal={() => handleOpenProjectModal(null)}
        onOpenConsultationModal={() => setConsultationModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <ProjectRequestModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        preselectedService={preselectedService}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      <BookConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      <SolutionFinderModal
        isOpen={solutionFinderOpen}
        onClose={() => setSolutionFinderOpen(false)}
        onSelectRecommendedService={handleSelectRecommendedService}
      />

      <ServiceDetailModal
        service={detailModalService}
        onClose={() => setDetailModalService(null)}
        onGetStarted={(svc) => handleOpenProjectModal(svc)}
      />
    </div>
  );
}
