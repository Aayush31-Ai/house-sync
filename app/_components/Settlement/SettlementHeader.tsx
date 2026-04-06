"use client";

import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SettlementHeader() {
  return (
    <header className="mb-6 md:mb-10">
      <div>
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center text-sm font-semibold text-dash-primary hover:underline group"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 mr-2 group-hover:bg-indigo-100 transition-colors">
            <ArrowLeft size={14} />
          </span>
          Back to Dashboard
        </Link>
        <div className="mb-2">
          <p className="text-xs font-bold tracking-widest text-dash-primary uppercase">Settle Expenses</p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Pay & Upload Proof</h1>
        <p className="text-base text-slate-600 max-w-lg">
          Complete your payment and upload proof to keep your household accounts transparent and up-to-date. It's quick, secure, and hassle-free!
        </p>
      </div>
    </header>
  );
}
