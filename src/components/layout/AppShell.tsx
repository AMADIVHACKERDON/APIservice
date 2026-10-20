"use client";

import React from "react";
import { Header } from "@/components/home-page/header/Header";
import { Footer } from "@/components/home-page/footer/Footer";
import { ModalProvider, useModals } from "@/context/ModalContext";
import { ProjectRequestModal } from "@/components/home-page/modals/ProjectRequestModal";
import { BookConsultationModal } from "@/components/home-page/consultation-cta/BookConsultationModal";
import { SolutionFinderModal } from "@/components/home-page/recommendation/SolutionFinderModal";

function ShellInner({ children }: { children: React.ReactNode }) {
  const {
    projectModalOpen,
    closeProjectModal,
    preselectedService,
    openProjectModal,
    consultationModalOpen,
    openConsultationModal,
    closeConsultationModal,
    solutionFinderOpen,
    openSolutionFinder,
    closeSolutionFinder,
  } = useModals();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        onOpenProjectModal={() => openProjectModal(null)}
        onOpenConsultationModal={openConsultationModal}
        onOpenSolutionFinder={openSolutionFinder}
      />

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer
        onOpenProjectModal={() => openProjectModal(null)}
        onOpenConsultationModal={openConsultationModal}
      />

      {/* Global Interactive Modals */}
      <ProjectRequestModal
        isOpen={projectModalOpen}
        onClose={closeProjectModal}
        preselectedService={preselectedService}
        onOpenConsultation={openConsultationModal}
      />

      <BookConsultationModal
        isOpen={consultationModalOpen}
        onClose={closeConsultationModal}
      />

      <SolutionFinderModal
        isOpen={solutionFinderOpen}
        onClose={closeSolutionFinder}
        onSelectRecommendedService={(service) => openProjectModal(service)}
      />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ShellInner>{children}</ShellInner>
    </ModalProvider>
  );
}
