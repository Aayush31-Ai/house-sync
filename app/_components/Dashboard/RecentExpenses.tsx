"use client";
import React from "react";
import { motion } from "framer-motion";

const expenses = [
  { id: 1, name: "Groceries - Reliance", payer: "Me", date: "Oct 24", amount: 3450, status: "YOU PAID", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", bg: "bg-blue-50", color: "text-blue-500" },
  { id: 2, name: "Electricity Bill", payer: "Rahul", date: "Oct 22", amount: 1250, status: "YOU OWE", icon: "M13 10V3L4 14h7v7l9-11h-7z", bg: "bg-green-50", color: "text-green-500" },
  { id: 3, name: "Dinner Outing", payer: "Me", date: "Oct 21", amount: 5600, status: "YOU PAID", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", bg: "bg-orange-50", color: "text-orange-500" },
  { id: 4, name: "Fiber Internet", payer: "Ananya", date: "Oct 19", amount: 999, status: "YOU OWE", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0", bg: "bg-purple-50", color: "text-purple-500" },
];

export default function RecentExpenses() {
  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      <div className="dash-card p-4 md:p-6 flex flex-col gap-6 relative">
        <div className="flex justify-between items-center mb-2">      
          <h2 className="text-xl font-bold">Recent Expenses</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
        </div>

        {/* Unified Mobile and Desktop Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
           <button className="dash-btn-primary px-4 py-2 flex-shrink-0 snap-center">October</button>
           <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 snap-center hover:bg-gray-50 transition-colors">September</button>
           <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 snap-center hover:bg-gray-50 transition-colors">August</button>
        </div>

        <div className="flex flex-col gap-5">
          {expenses.map((expense, idx) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${expense.bg} flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-6 h-6 ${expense.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={expense.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{expense.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">Payer: {expense.payer} • {expense.date}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">₹{expense.amount.toLocaleString()}</h3>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${expense.status === 'YOU PAID' ? 'text-green-500' : 'text-dash-danger-text'}`}>      
                  {expense.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold py-3 rounded-full transition-colors">   
          View Full History
        </button>
      </div>
    </div>
  );
}
