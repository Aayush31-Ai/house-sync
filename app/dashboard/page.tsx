 "use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TotalBalanceCard from "../_components/Dashboard/TotalBalanceCard";
import NeedToPay from "../_components/Dashboard/NeedToPay";
import PeopleOweYou from "../_components/Dashboard/PeopleOweYou";
import RecentExpenses from "../_components/Dashboard/RecentExpenses";

// Shimmer utility class in Tailwind: animate-pulse is built-in
const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded-3xl ${className}`} />
);

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fast backend loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-12 max-w-7xl mx-auto p-4 md:p-8">
      {/* Unified Header */}
      <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div className="flex flex-row justify-between items-center w-full md:w-auto">
          <div className="md:hidden">
            <p className="text-gray-500 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold flex items-center gap-2">Sarah 👋</h1>
          </div>
          <h1 className="hidden md:block text-3xl font-bold">Overview</h1>
          <button className="md:hidden bg-white p-2 rounded-full shadow-sm relative">       
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-dash-primary" />
          </div>
          <button className="hidden md:block bg-white p-2.5 text-gray-700 rounded-full shadow-sm relative">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full"
          >
            <div className="flex flex-col bg-gray-200 animate-pulse rounded-[2rem] h-64 md:h-80 w-full shadow-sm relative overflow-hidden">
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
            
            <div className="w-full flex flex-col mt-6 md:mt-2">
              <div className="h-8 bg-gray-200 animate-pulse rounded-md w-48 mb-4"></div>
              <div className="flex gap-4 overflow-hidden">
                <div className="h-[280px] bg-gray-200 animate-pulse rounded-3xl w-full relative overflow-hidden">
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                </div>
                <div className="hidden md:block h-[280px] bg-gray-200 animate-pulse rounded-3xl w-full relative overflow-hidden">
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full"
          >
            <TotalBalanceCard />
            <PeopleOweYou />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-12 md:col-span-4 flex flex-col gap-6 w-full"
          >
            <div className="h-[220px] bg-gray-200 animate-pulse rounded-3xl w-full relative overflow-hidden">
               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
            <div className="h-[400px] bg-gray-200 animate-pulse rounded-3xl w-full relative overflow-hidden">
               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-12 md:col-span-4 flex flex-col gap-6 w-full"
          >
            <NeedToPay />
            <RecentExpenses />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
