"use client";

import { motion } from "framer-motion";

type AmountFieldProps = {
  value: string;
  amountLabel: string;
  onChange: (nextValue: string) => void;
};

export default function AmountField({ value, amountLabel, onChange }: AmountFieldProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Amount</p>

      <motion.label
        whileFocus={{ scale: 1.005 }}
        className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 md:px-6 md:py-4"
      >
        <span className="text-3xl font-bold text-dash-primary md:text-4xl">₹</span>

        <input
          type="number"
          min="0"
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
              event.preventDefault();
            }
          }}
          placeholder="0"
          className="grow rounded-lg border-0 bg-transparent text-4xl font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-0 md:text-5xl"
        />
      </motion.label>

      <div className="mt-3 flex flex-wrap gap-2">
        {["25", "50", "100", "250"].map((quickValue) => (
          <button
            key={quickValue}
            type="button"
            onClick={() => onChange(quickValue)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-700"
          >
            ₹{quickValue}
          </button>
        ))}
      </div>
    </div>
  );
}
