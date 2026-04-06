"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

type SecureFooterProps = {
  onSubmit: () => void;
  isPending: boolean;
};

export default function SecureFooter({ onSubmit, isPending }: SecureFooterProps) {
  return (
    <div className="space-y-6">
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-dash-primary py-4 px-6 text-base font-bold text-white shadow-lg shadow-dash-primary/30 transition-colors hover:bg-dash-primary-hover focus:outline-none focus:ring-2 focus:ring-dash-primary focus:ring-offset-2"
        type="button"
        onClick={onSubmit}
        disabled={isPending}
      >
        <span className="relative z-10 flex items-center">
          {isPending ? "Submitting..." : "Confirm & Submit Proof"}
          <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </span>
        <div className="absolute inset-0 z-0 bg-linear-to-r from-dash-primary/0 via-white/20 to-dash-primary/0 opacity-0 transition-opacity duration-500 group-hover:animate-[shimmer_2s_infinite] group-hover:opacity-100" />
      </motion.button>

      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1.5 text-dash-primary mb-1">
          <ShieldCheck size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure & Encrypted</span>
        </div>
        <p className="text-[11px] font-medium text-slate-400">
          Secured with end-to-end encryption. Your financial data is never stored.
        </p>
      </div>
    </div>
  );
}
