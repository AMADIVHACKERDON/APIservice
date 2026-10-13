"use client";

import React, { useState } from "react";
import { TESTIMONIALS_DATA } from "../data/mock-data";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1
    );
  };

  const item = TESTIMONIALS_DATA[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Testimonial Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Quote mark watermark */}
        <Quote className="absolute top-6 right-8 h-20 w-20 text-slate-100 -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Star Rating & Service Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 text-amber-400">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {item.service}
            </span>
          </div>

          {/* Feedback Quote */}
          <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-800 leading-relaxed">
            &ldquo;{item.feedback}&rdquo;
          </blockquote>

          {/* Author Details */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs font-mono">
                {item.avatarText}
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {item.role} • <strong className="text-slate-700">{item.company}</strong>
                </p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {TESTIMONIALS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-blue-600"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

