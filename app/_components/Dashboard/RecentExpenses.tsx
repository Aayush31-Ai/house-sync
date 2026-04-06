"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type ExpenseItem = {
  id: string;
  name: string;
  payer: string;
  payerId: string;
  date: string;
  amount: number;
};

const iconPath = "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z";

export default function RecentExpenses({
  expenses,
  currentMemberId,
}: {
  expenses: ExpenseItem[];
  currentMemberId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.payer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      <div className="dash-card p-4 md:p-6 flex flex-col gap-6 relative">
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Expenses</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            </button>
          </div>
          <div className="relative w-full">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search expenses or the payer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-dash-primary border border-gray-100" 
            />
          </div>
        </div>

        {/* Unified Mobile and Desktop Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
            <button className="dash-btn-primary px-4 py-2 shrink-0 snap-center">Latest</button>
            <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold shrink-0 snap-center hover:bg-gray-50 transition-colors">This Month</button>
            <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold shrink-0 snap-center hover:bg-gray-50 transition-colors">All</button>
        </div>

        <div className="flex flex-col gap-5">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, idx) => {
              const paidByMe = expense.payerId === currentMemberId;

              return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${paidByMe ? "bg-green-50" : "bg-red-50"} flex items-center justify-center shrink-0`}>
                  <svg className={`w-6 h-6 ${paidByMe ? "text-green-500" : "text-red-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{expense.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">Payer: {expense.payer} • {expense.date}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">₹{expense.amount.toLocaleString()}</h3>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${paidByMe ? "text-green-500" : "text-dash-danger-text"}`}>
                  {paidByMe ? "YOU PAID" : "YOU OWE"}
                </p>
              </div>
            </motion.div>
          );
          })
          ) : (
            <div className="text-center py-6 text-gray-500">
              No expenses found matching "{searchQuery}"
            </div>
          )}
        </div>

        <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold py-3 rounded-full transition-colors">   
          View Full History
        </button>
      </div>
    </div>
  );
}
