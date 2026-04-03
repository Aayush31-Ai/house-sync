'use client';
import React from 'react';
import { ArrowUp } from 'lucide-react';

interface TotalBalanceProps {
  balance?: number;
  owedByCount?: number;
  nextSettlementDate?: string;
  onSettleClick?: () => void;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({
  balance = 1250,
  owedByCount = 3,
  nextSettlementDate,
  onSettleClick = () => {}
}) => {
  // Calculate next month from current date
  const getNextMonthDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
    
    return lastDayOfNextMonth.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const displayDate = nextSettlementDate || getNextMonthDate();

  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-6">
      {/* Card Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md p-6 sm:p-8">
        
        {/* Header Label */}
        <p className="text-sm sm:text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase mb-2">
          Your Total Balance
        </p>

        {/* Balance Amount with Icon */}
        <div className="flex items-center gap-2 mb-3">
          <ArrowUp 
            size={32} 
            className="text-teal-500 dark:text-teal-400 flex-shrink-0" 
            strokeWidth={3}
          />
          <h2 className="text-4xl sm:text-5xl font-bold text-teal-600 dark:text-teal-400">
            ₹{balance.toLocaleString('en-IN')}
          </h2>
        </div>

        {/* Status Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6">
          You are owed by {owedByCount} {owedByCount === 1 ? 'person' : 'people'}
        </p>

        {/* Bottom Section - Settlement & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Settlement Date */}
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              Next settlement
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              {displayDate}
            </p>
          </div>

          {/* Settle Button */}
          <button
            onClick={onSettleClick}
            className="w-full sm:w-auto px-8 py-3 sm:py-3 rounded-full font-semibold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Settle Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;