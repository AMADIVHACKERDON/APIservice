"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ServiceItem } from "@/components/home-page/data/mock-data";

interface ModalContextType {
  projectModalOpen: boolean;
  preselectedService: ServiceItem | null;
  consultationModalOpen: boolean;
  solutionFinderOpen: boolean;
  openProjectModal: (service?: ServiceItem | null) => void;
  closeProjectModal: () => void;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;
  openSolutionFinder: () => void;
  closeSolutionFinder: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [solutionFinderOpen, setSolutionFinderOpen] = useState(false);

  const openProjectModal = (service?: ServiceItem | null) => {
    setPreselectedService(service || null);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setPreselectedService(null);
  };

  const openConsultationModal = () => setConsultationModalOpen(true);
  const closeConsultationModal = () => setConsultationModalOpen(false);

  const openSolutionFinder = () => setSolutionFinderOpen(true);
  const closeSolutionFinder = () => setSolutionFinderOpen(false);

  return (
    <ModalContext.Provider
      value={{
        projectModalOpen,
        preselectedService,
        consultationModalOpen,
        solutionFinderOpen,
        openProjectModal,
        closeProjectModal,
        openConsultationModal,
        closeConsultationModal,
        openSolutionFinder,
        closeSolutionFinder,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
