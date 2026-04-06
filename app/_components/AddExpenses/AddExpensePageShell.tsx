"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import addExpenses from "@/app/_actions/addExpenses";
import AddExpenseHeader from "./AddExpenseHeader";
import AmountField from "./AmountField";
import ExpenseDetailsField from "./ExpenseDetailsField";
import ExpenseDateField from "./ExpenseDateField";
import SharedWithPicker, { type ExpenseMember } from "./SharedWithPicker";
import ImageProofDropzone from "./ImageProofDropzone";

const memberTones = ["bg-rose-200", "bg-slate-300", "bg-cyan-200", "bg-amber-200", "bg-lime-200"];

const container = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type AddExpensePageShellProps = {
  currentMemberId: string;
  currentHouseId: string;
  members: Array<{ _id: string; name: string }>;
};

export default function AddExpensePageShell({
  currentMemberId,
  currentHouseId,
  members,
}: AddExpensePageShellProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(getTodayString());
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [proof, setProof] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const pickerMembers: ExpenseMember[] = useMemo(
    () =>
      members.map((member, index) => ({
        id: member._id,
        name: member.name,
        tone: memberTones[index % memberTones.length],
      })),
    [members]
  );

  const allSelected = useMemo(
    () => pickerMembers.length > 0 && selectedMembers.length === pickerMembers.length,
    [pickerMembers.length, selectedMembers.length]
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
    setSelectedMembers(allSelected ? [] : pickerMembers.map((member) => member.id));
  };

  const submitExpense = () => {
    setStatus(null);

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setStatus({ type: "error", message: "Enter a valid amount greater than 0." });
      return;
    }

    if (selectedMembers.length === 0) {
      setStatus({ type: "error", message: "Select at least one member to split with." });
      return;
    }

    const formData = new FormData();
    formData.set("amount", amount);
    formData.set("note", note);
    formData.set("date", date);
    selectedMembers.forEach((memberId) => formData.append("sharedWith", memberId));

    if (proof) {
      formData.set("proof", proof);
    }

    startTransition(async () => {
      const response = await addExpenses(formData, currentMemberId);

      if (!response.success) {
        setStatus({ type: "error", message: response.message });
        return;
      }

      setStatus({ type: "success", message: response.message });
      router.push(
        `/dashboard?houseId=${encodeURIComponent(currentHouseId)}&memberId=${encodeURIComponent(currentMemberId)}`
      );
      router.refresh();
    });
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
              members={pickerMembers}
              selectedMembers={selectedMembers}
              allSelected={allSelected}
              onToggleMember={toggleMember}
              onToggleSelectAll={toggleSelectAll}
            />

            <ImageProofDropzone file={proof} onFileChange={setProof} />

            {status && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  status.type === "error"
                    ? "border border-red-200 bg-red-50 text-red-700"
                    : "border border-green-200 bg-green-50 text-green-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Auto-split active</p>
              <p className="mt-1 text-sm text-slate-500">
                Expense will be split equally among selected members.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={submitExpense}
              disabled={isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className="w-full rounded-full bg-dash-primary px-6 py-4 text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(79,70,229,0.8)] transition-colors hover:bg-dash-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Adding Expense..." : "Add Expense"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
