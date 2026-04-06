"use client";

import { motion } from "framer-motion";

type PaymentAmountProps = {
  amount: string;
  onChange: (val: string) => void;
};

export default function PaymentAmount({ amount, onChange }: PaymentAmountProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Amount Payable</h2>
      <label 
        className="flex w-full cursor-text items-center rounded-2xl bg-slate-50/80 px-6 py-5 transition-colors focus-within:bg-slate-100/70"
      >
        <span className="mr-3 text-3xl font-bold text-slate-400 md:text-4xl">₹</span>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-4xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 focus:outline-none md:text-5xl"
          onKeyDown={(event) => {
            if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
              event.preventDefault();
            }
          }}
        />
      </label>
    </div>
  );
}
