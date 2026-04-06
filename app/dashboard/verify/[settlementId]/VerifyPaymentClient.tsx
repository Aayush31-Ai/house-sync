"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Info, Download, ZoomIn, Image as ImageIcon } from "lucide-react";
import verifyStatus from "../../../_actions/verifyStatus";

type Settlement = {
  _id: string;
  from: {
    _id: string;
    name: string;
  };
  amount: number;
  proofUrl: string;
  createdAt: string;
  status: string;
};

export default function VerifyPaymentClient({
  settlement,
  houseId,
  memberId,
}: {
  settlement: Settlement;
  houseId: string;
  memberId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (isAccepted: boolean) => {
    setLoading(true);
    setError("");
    try {
      const res = await verifyStatus({
        isAccepted,
        settlementId: settlement._id,
        currentMemberId: memberId,
      });
      if (res.success) {
        router.push(`/dashboard?houseId=${houseId}&memberId=${memberId}`);
        router.refresh();
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError("An error occurred while verifying the payment.");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(settlement.createdAt).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(settlement.createdAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <Link
        href={`/dashboard?houseId=${houseId}&memberId=${memberId}`}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Payment</h1>
        <p className="text-gray-500">
          Awaiting confirmation for the settlement transaction from {settlement.from.name}.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
              Did you receive <span className="text-blue-600">₹{settlement.amount}</span> from {settlement.from.name}?
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-50">
                <span className="text-gray-500">Member Name</span>
                <span className="font-semibold text-gray-900">{settlement.from.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-50">
                <span className="text-gray-500">Date Sent</span>
                <span className="font-semibold text-gray-900">{formattedDate}, {formattedTime}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-50">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-semibold text-gray-900">Transfer</span>
              </div>
            </div>

            {settlement.status === "pending" ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleVerify(true)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Check className="w-5 h-5" /> Accept Payment
                </button>
                <button
                  onClick={() => handleVerify(false)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3.5 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" /> Reject & Notify Member
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl text-center font-medium capitalize bg-gray-100 text-gray-700">
                This payment was {settlement.status}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 flex gap-4 text-sm text-gray-600">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Once accepted, the funds will be allocated to {settlement.from.name}'s ledger and
              their balance will be updated automatically in your shared house.
            </p>
          </div>
        </div>

        {/* Right Column: Payment Proof */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <imgIcon className="w-5 h-5 text-gray-400" />
                Payment Proof
              </div>
              {settlement.proofUrl && (
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <a 
                    href={settlement.proofUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex-1 bg-gray-50/50 p-6 flex items-center justify-center min-h-[400px] relative w-full">
              {settlement.proofUrl ? (
                <div className="relative w-full max-w-sm aspect-[1/2] rounded-3xl overflow-hidden border-8 border-gray-800 shadow-2xl">
                   {/* Mobile frame wrap */}
                  <img
                    src={settlement.proofUrl}
                    alt="Payment Proof"
                    
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center gap-2">
                  <imgIcon className="w-12 h-12 opacity-50" />
                  <p>No proof uploaded</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between p-4 border-t border-gray-50 bg-white">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Transaction Details</div>
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                AWAITING REVIEW
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
