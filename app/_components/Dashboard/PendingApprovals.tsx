"use client";

import Link from "next/link";
import { ReceiptText, Check } from "lucide-react";

type PendingApproval = {
  _id: string;
  amount: number;
  from: {
    _id: string;
    name: string;
  };
  createdAt: string;
  status: string;
};

export default function PendingApprovals({
  approvals,
  houseId,
  memberId,
}: {
  approvals: PendingApproval[];
  houseId: string;
  memberId: string;
}) {
  if (!approvals || approvals.length === 0) return null;

  return (
    <div className="col-span-12 mt-2 w-full">
      <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {approvals.map((approval) => {
          const date = new Date(approval.createdAt).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          });
          const time = new Date(approval.createdAt).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
          });

          return (
            <div
              key={approval._id}
              className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <ReceiptText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Proof</h3>
                    <p className="text-sm text-gray-500">
                      Added by <span className="font-medium text-blue-600">{approval.from.name}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-lg text-gray-900">₹ {approval.amount}</span>
                  <span className="text-xs text-gray-400">
                    {date}, {time}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                 <Link
                  href={`/dashboard/verify/${approval._id}?houseId=${houseId}&memberId=${memberId}`}
                  className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition-colors"
                >
                  <Check className="w-4 h-4" /> Verify
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
