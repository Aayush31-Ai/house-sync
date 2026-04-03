type ExpenseDetailsFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

export default function ExpenseDetailsField({ value, onChange }: ExpenseDetailsFieldProps) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">What was it for?</span>
        <span className="text-xs text-slate-400">{wordCount}/10</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={60}
        placeholder="e.g., Groceries"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-base font-medium text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-300"
      />
    </label>
  );
}
