"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import createSettlement from "../../_actions/createSettlement";
import verifyStatus from "../../_actions/verifyStatus";
import { useRouter } from "next/navigation";
import SettlementHeader from "./SettlementHeader";
import PaymentAmount from "./PaymentAmount";
import ImageUploadProof from "./ImageUploadProof";
import NotificationPreferences from "./NotificationPreferences";
import SecureFooter from "./SecureFooter";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

type MemberOption = {
  _id: string;
  name: string;
};

type PendingApproval = {
  _id: string;
  amount: number;
  from?: { name?: string };
};

type SettlementPageShellProps = {
  currentMemberId: string;
  houseId: string;
  members: MemberOption[];
  pendingApprovals: PendingApproval[];
  initialAmount: string;
  initialToMemberId: string;
};

export default function SettlementPageShell({
  currentMemberId,
  houseId,
  members,
  pendingApprovals,
  initialAmount,
  initialToMemberId,
}: SettlementPageShellProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<string>(initialAmount || "");
  const [toMemberId, setToMemberId] = useState<string>(initialToMemberId || members[0]?._id || "");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [approvalState, setApprovalState] = useState<Record<string, boolean>>({});

  const selectedRecipientName = useMemo(
    () => members.find((member) => member._id === toMemberId)?.name ?? "member",
    [members, toMemberId]
  );

  const submitSettlement = () => {
    setStatus(null);

    if (!toMemberId) {
      setStatus({ type: "error", message: "Select a recipient for settlement." });
      return;
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setStatus({ type: "error", message: "Enter an amount greater than 0." });
      return;
    }

    startTransition(async () => {
      const response = await createSettlement({
        amount: Number(amount),
        from: currentMemberId,
        to: toMemberId,
        houseId,
        file: proofFile || undefined,
      });

      if (!response.success) {
        setStatus({ type: "error", message: response.message });
        return;
      }

      setStatus({ type: "success", message: response.message });
      router.refresh();
    });
  };

  const onApprovalAction = (settlementId: string, isAccepted: boolean) => {
    setApprovalState((prev) => ({ ...prev, [settlementId]: true }));

    startTransition(async () => {
      const response = await verifyStatus({
        isAccepted,
        settlementId,
        currentMemberId,
      });

      setApprovalState((prev) => ({ ...prev, [settlementId]: false }));

      if (!response.success) {
        setStatus({ type: "error", message: response.message });
        return;
      }

      setStatus({ type: "success", message: response.message });
      router.refresh();
    });
  };

  return (
    <section className="relative min-h-full p-4 pb-28 md:p-8 bg-slate-50/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.08),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.07),transparent_40%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-3xl"
      >
        <motion.div variants={itemVariants}>
          <SettlementHeader />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden mt-6 md:mt-10 rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_4px_30px_-5px_rgba(15,23,42,0.05)] md:p-10 md:pb-12"
        >
          {/* Subtle accent blob in background corner */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-dash-primary/5 blur-3xl" />

          <div className="relative z-10 w-full max-w-xl mx-auto">
            <motion.div variants={itemVariants}>
              <PaymentAmount amount={amount} onChange={setAmount} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-8 space-y-2">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Pay To</h2>
                <select
                  value={toMemberId}
                  onChange={(event) => setToMemberId(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-dash-primary"
                >
                  {members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ImageUploadProof
                file={proofFile}
                previewUrl={previewUrl}
                onFileChange={(file, nextPreview) => {
                  setProofFile(file);
                  setPreviewUrl(nextPreview);
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <NotificationPreferences />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SecureFooter onSubmit={submitSettlement} isPending={isPending} />
            </motion.div>

            {status && (
              <motion.div variants={itemVariants}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    status.type === "error"
                      ? "border border-red-200 bg-red-50 text-red-700"
                      : "border border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {status.message}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                <h3 className="text-sm font-semibold text-slate-700">Pending Approvals</h3>
                <p className="mt-1 text-xs text-slate-500">Review payments submitted to you.</p>

                <div className="mt-4 space-y-3">
                  {pendingApprovals.length === 0 && (
                    <p className="text-sm text-slate-500">No pending approvals right now.</p>
                  )}

                  {pendingApprovals.map((approval) => (
                    <div
                      key={approval._id}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {approval.from?.name || "Member"} paid you
                          </p>
                          <p className="text-xs text-slate-500">₹{Number(approval.amount).toLocaleString("en-IN")}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onApprovalAction(approval._id, false)}
                            disabled={approvalState[approval._id] || isPending}
                            className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => onApprovalAction(approval._id, true)}
                            disabled={approvalState[approval._id] || isPending}
                            className="rounded-full bg-dash-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-dash-primary-hover disabled:opacity-60"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <p className="text-xs text-slate-500">You are currently settling payment with {selectedRecipientName}.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
