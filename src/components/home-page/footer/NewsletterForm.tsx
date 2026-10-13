"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Engineering & Product Dispatch
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed">
        Curated monthly briefings on architectural decisions, AI benchmarks, and cloud cost management.
      </p>

      {!subscribed ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Enter work email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-slate-800 text-white placeholder:text-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Subscribe to newsletter"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      ) : (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Subscribed! Check your inbox for confirmation.</span>
        </div>
      )}
    </div>
  );
}

