import { ShieldCheck } from "lucide-react";

export default function SettlementLoading() {
  return (
    <section className="relative min-h-full p-4 pb-28 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.08),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.07),transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-3xl animate-[fadeIn_260ms_ease-out]">
        <div className="mb-6 hidden md:block">
          <div className="h-6 w-48 rounded-md bg-slate-200/80 animate-pulse mb-2" />
          <div className="h-8 w-72 rounded-md bg-slate-200/80 animate-pulse mt-3" />
          <div className="h-4 w-60 rounded-md bg-slate-200/70 animate-pulse mt-2" />
        </div>

        <div className="mt-4 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_50px_-26px_rgba(15,23,42,0.38)] md:p-10">
          <div className="space-y-8">
            <div className="h-28 rounded-2xl bg-slate-100/80 animate-pulse" />
            <div className="h-40 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/25 animate-pulse" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center h-14 rounded-2xl bg-slate-50 p-4 animate-pulse">
                 <div className="h-4 w-32 bg-slate-200 rounded" />
                 <div className="h-6 w-10 bg-slate-200 rounded-full" />
              </div>
              <div className="flex justify-between items-center h-14 rounded-2xl bg-slate-50 p-4 animate-pulse">
                 <div className="h-4 w-32 bg-slate-200 rounded" />
                 <div className="h-6 w-10 bg-slate-200 rounded-full" />
              </div>
            </div>

            <div className="h-14 rounded-2xl bg-dash-primary/60 animate-pulse" />
            
            <div className="flex justify-center text-slate-300">
               <ShieldCheck size={16} className="mr-2" />
               <div className="h-3 w-32 bg-slate-200/80 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}