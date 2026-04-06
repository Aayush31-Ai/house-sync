'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ReceiptText, Wallet } from 'lucide-react';

const spring = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef2ff_52%,#f8fafc_100%)] px-4 py-16 sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.10),transparent_34%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-[36px] border border-white/75 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:grid-cols-[1.15fr_0.85fr] md:items-center md:p-8 lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-indigo-600 shadow-sm">
              Final Step
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Your house does not need more reminders. It needs one shared truth.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Evenly keeps expenses, balances, and settlements visible in one place so roommates
              can spend less time discussing money and more time just living together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
                <Link
                  href="/create-house"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4f46e5] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(79,70,229,0.20)]"
                >
                  Start Your House
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  Watch The Flow
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="grid gap-4">
            <motion.div
              whileHover={{ y: -4, scale: 1.015 }}
              transition={spring}
              className="rounded-[28px] border border-white/80 bg-white/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600">
                  <ReceiptText className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Every expense lands in one place</p>
                  <p className="text-xs text-slate-500">No more scattered chats and notes</p>
                </div>
              </div>
              <div className="rounded-[20px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Dinner ₹1200 → split instantly → visible to everyone
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={spring}
                className="rounded-[24px] border border-emerald-100 bg-emerald-50/90 p-5 shadow-sm"
              >
                <div className="mb-3 rounded-2xl bg-white p-2.5 text-emerald-600 w-fit">
                  <BadgeCheck className="size-4" />
                </div>
                <p className="text-sm font-semibold text-emerald-800">Clear done state</p>
                <p className="mt-2 text-xs leading-5 text-emerald-700/80">Settlements feel finished, not ambiguous.</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={spring}
                className="rounded-[24px] border border-amber-100 bg-amber-50/90 p-5 shadow-sm"
              >
                <div className="mb-3 rounded-2xl bg-white p-2.5 text-amber-600 w-fit">
                  <Wallet className="size-4" />
                </div>
                <p className="text-sm font-semibold text-amber-800">Fair balances</p>
                <p className="mt-2 text-xs leading-5 text-amber-700/80">Everyone knows who owes what right now.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
