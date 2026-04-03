import { CalendarDays } from "lucide-react";

type ExpenseDateFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

export default function ExpenseDateField({ value, onChange }: ExpenseDateFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">Date</span>
      <div className="relative">
        <CalendarDays
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dash-primary"
        />
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-indigo-300"
        />
      </div>
    </label>
  );
}
