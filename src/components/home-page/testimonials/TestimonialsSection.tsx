"use client";

import React from "react";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { MessageSquareQuote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-white border-t border-slate-200/80">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Trusted by Leaders & Engineering Teams
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            See how founders, product leaders, and enterprise engineering departments accelerate their roadmaps with The NextTechGen Foundation.
          </p>
        </div>

        {/* Carousel */}
        <TestimonialCarousel />
      </div>
    </section>
  );
}

