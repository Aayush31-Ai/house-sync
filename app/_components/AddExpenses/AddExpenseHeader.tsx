"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";

export default function AddExpenseHeader() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:border-0 md:bg-transparent md:px-1 md:py-0 md:shadow-none">
      <Link
        href="/dashboard"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 md:hidden"
        aria-label="Close add expense"
      >
        <X size={22} />
      </Link>

      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/dashboard"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-800"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Record Expense</h1>
          <p className="text-sm text-slate-500">Keep household accounts transparent and tidy.</p>
        </div>
      </div>

      <div className="md:hidden">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add Expense</h1>
      </div>

      <motion.div
        initial={{ rotate: -12, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-500/30"
      >
        E
      </motion.div>
    </header>
  );
}
