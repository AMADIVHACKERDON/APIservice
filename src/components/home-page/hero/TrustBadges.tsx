import React from "react";
import { ShieldCheck, Users, Zap, CheckCircle2 } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="pt-8 border-t border-slate-200/80">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3.5">
        Trusted Engineering & Professional Delivery
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-xs font-medium">Vetted Senior Specialists</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-xs font-medium">SOC 2 & Security Standards</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Zap className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-xs font-medium">Milestone-Based Delivery</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Users className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="text-xs font-medium">Dedicated Project Team</span>
        </div>
      </div>
    </div>
  );
}

