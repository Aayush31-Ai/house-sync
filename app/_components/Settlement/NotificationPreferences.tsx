"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, BellRing } from "lucide-react";

export default function NotificationPreferences() {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [webEnabled, setWebEnabled] = useState(true);

  return (
    <div className="mb-10 w-full space-y-4 rounded-3xl bg-slate-50/70 p-5 border border-slate-100/80">
      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Notification Preferences</h3>

      {/* Email Notification Toggle */}
      <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            <Mail size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Email Confirmation</p>
            <p className="text-xs font-medium text-slate-400">Get receipt in your inbox</p>
          </div>
        </div>
        <div 
          className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${emailEnabled ? 'bg-dash-primary' : 'bg-slate-200'}`}
        >
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-5 rounded-full bg-white shadow-sm"
            initial={false}
            animate={{ x: emailEnabled ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={emailEnabled}
          onChange={(e) => setEmailEnabled(e.target.checked)}
        />
      </label>

      {/* Web Notification Toggle */}
      <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            <BellRing size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Web Notification</p>
            <p className="text-xs font-medium text-slate-400">Real-time status updates</p>
          </div>
        </div>
        <div 
          className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${webEnabled ? 'bg-dash-primary' : 'bg-slate-200'}`}
        >
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-5 rounded-full bg-white shadow-sm"
            initial={false}
            animate={{ x: webEnabled ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={webEnabled}
          onChange={(e) => setWebEnabled(e.target.checked)}
        />
      </label>
    </div>
  );
}
