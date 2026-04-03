"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AddExpenseHeader from "./AddExpenseHeader";
import AmountField from "./AmountField";
import ExpenseDetailsField from "./ExpenseDetailsField";
import ExpenseDateField from "./ExpenseDateField";
import SharedWithPicker, { type ExpenseMember } from "./SharedWithPicker";
import ImageProofDropzone from "./ImageProofDropzone";

const members: ExpenseMember[] = [
  { id: "m-1", name: "Alice", tone: "bg-rose-200" },
  { id: "m-2", name: "Bob", tone: "bg-slate-300" },
  { id: "m-3", name: "Rahul", tone: "bg-cyan-200" },
  { id: "m-4", name: "Maya", tone: "bg-amber-200" },
];

const container = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AddExpensePageShell() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(getTodayString());
  const [selectedMembers, setSelectedMembers] = useState<string[]>(["m-1", "m-3"]);

  const allSelected = useMemo(
    () => selectedMembers.length === members.length,
    [selectedMembers.length],
  );

  const amountLabel = amount ? Number(amount).toFixed(2) : "0.00";

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId);
      }
      return [...prev, memberId];
    });
  };

  const toggleSelectAll = () => {
    setSelectedMembers(allSelected ? [] : members.map((member) => member.id));
  };

  return (
    <section className="relative min-h-full p-4 pb-28 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.08),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.07),transparent_40%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-4xl"
      >
        <motion.div variants={item}>
          <AddExpenseHeader />
        </motion.div>

        <motion.div
          variants={item}
          className="mt-4 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_50px_-26px_rgba(15,23,42,0.38)] backdrop-blur md:p-8"
        >
          <div className="space-y-6 md:space-y-7">
            <AmountField value={amount} amountLabel={amountLabel} onChange={setAmount} />

            <ExpenseDetailsField value={note} onChange={setNote} />

            <ExpenseDateField value={date} onChange={setDate} />

            <SharedWithPicker
              members={members}
              selectedMembers={selectedMembers}
              allSelected={allSelected}
              onToggleMember={toggleMember}
              onToggleSelectAll={toggleSelectAll}
            />

            <ImageProofDropzone />

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Auto-split active</p>
              <p className="mt-1 text-sm text-slate-500">
                Expense will be split equally among selected members.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className="w-full rounded-full bg-dash-primary px-6 py-4 text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(79,70,229,0.8)] transition-colors hover:bg-dash-primary-hover"
            >
              Add Expense
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
