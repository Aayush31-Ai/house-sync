"use client";
import { motion } from "framer-motion";
import { useState } from "react";

type TotalBalanceCardProps = {
  totalReceivable: number;
  totalPayable: number;
  invitePath: string;
  houseName: string;
};

export default function TotalBalanceCard({
  totalReceivable,
  totalPayable,
  invitePath,
  houseName,
}: TotalBalanceCardProps) {
  const netBalance = totalReceivable - totalPayable;
  const [inviteStatus, setInviteStatus] = useState("");

  const onInvite = async () => {
    try {
      const inviteUrl = `${window.location.origin}${invitePath}`;

      if (navigator.share) {
        await navigator.share({
          title: `Join ${houseName} on Evenly`,
          text: `Use this link to create your profile and join ${houseName}.`,
          url: inviteUrl,
        });
        setInviteStatus("Invite shared successfully");
      } else {
        await navigator.clipboard.writeText(
          `Join ${houseName} on Evenly: ${inviteUrl}`
        );
        setInviteStatus("Invite link copied");
      }

      setTimeout(() => setInviteStatus(""), 2500);
    } catch {
      setInviteStatus("Unable to share invite right now");
      setTimeout(() => setInviteStatus(""), 2500);
    }
  };

  return (
    <>
      {/* Unified Card for Mobile & Desktop */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col bg-dash-primary text-white rounded-4xl p-6 md:p-10 w-full relative overflow-hidden shadow-xl shadow-blue-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>  
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <p className="text-blue-100 text-xs md:text-sm font-medium tracking-wider uppercase mb-2 relative z-10">Total Balance</p>
        <h2 className="text-5xl md:text-6xl font-bold mb-8 md:mb-12 relative z-10">
          {netBalance >= 0 ? "+" : "-"}₹{Math.abs(netBalance).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-0 relative z-10">
          <div className="flex gap-8 md:gap-16">
            <div>
              <p className="text-blue-200 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">You are owed</p>
              <p className="text-xl md:text-2xl font-bold">₹{totalReceivable.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">You owe</p>
              <p className="text-xl md:text-2xl font-bold">₹{totalPayable.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-white text-dash-primary hover:bg-gray-50 font-semibold py-3 px-8 rounded-full transition-colors shadow-lg">
            Settle Up
          </button>
        </div>
      </motion.div>

      {/* Invite Banner (Unified but optional for desktop styling) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 border border-blue-100 rounded-full p-2 flex items-center justify-between mt-2"
      >
        <div className="flex items-center gap-3 pl-2">
           <div className="bg-white p-2 rounded-full text-dash-primary shadow-sm">  
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
           </div>
           <div>
             <h3 className="text-sm font-semibold text-gray-900">Invite Friends</h3>
             <p className="text-xs text-gray-500">Add new housemates</p>        
           </div>
        </div>
        <button className="dash-btn-primary py-2 px-5 mr-1" onClick={onInvite}>
          Invite
        </button>
      </motion.div>

      {inviteStatus && (
        <p className="mt-2 text-sm text-blue-700 font-medium">{inviteStatus}</p>
      )}
    </>
  );
}
