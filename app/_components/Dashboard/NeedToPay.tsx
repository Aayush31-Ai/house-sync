"use client";
import React from "react";
import { motion } from "framer-motion";

type NeedToPayItem = {
  toId: string;
  to: string;
  amount: number;
  avatar?: string;
};

export default function NeedToPay({
  items,
  houseId,
  memberId,
}: {
  items: NeedToPayItem[];
  houseId: string;
  memberId: string;
}) {
  return (
    <div className="flex flex-col gap-4 bg-dash-card-bg rounded-3xl p-6 shadow-sm border border-gray-100 w-full relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">You Need to Pay</h2>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-80 scrollbar-red pr-1">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">You do not have any pending payment right now.</p>
        )}

        {items.map((item, i) => (
          <motion.div
            key={item.toId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden bg-red-50 border border-red-100"
          >
            <div className="flex items-center gap-3">
               <div className="relative">
                 <img src={item.avatar || "/assets/avatars/avatar-1.jpg"} className="w-10 h-10 rounded-full shadow-sm object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.to}&background=random` }} />
               </div>
               <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{item.to}</h3>
                  <div className="text-sm font-bold text-red-600 mt-0.5">₹{item.amount.toLocaleString()}</div>
               </div>
            </div>
            
            <a 
              href={`/dashboard/settlement?to=${item.toId}&amount=${item.amount}&houseId=${encodeURIComponent(houseId)}&memberId=${encodeURIComponent(memberId)}`}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full shadow-sm transition-colors text-center shrink-0 inline-block"
            >
              Pay
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
