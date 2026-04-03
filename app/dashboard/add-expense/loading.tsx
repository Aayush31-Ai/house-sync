export default function AddExpenseLoading() {
  return (
    <section className="relative min-h-full p-4 pb-28 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.08),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.07),transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-4xl animate-[fadeIn_260ms_ease-out]">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm">
          <div className="h-7 w-40 rounded-md bg-slate-200/80 animate-pulse" />
          <div className="h-10 w-10 rounded-xl bg-indigo-200/70 animate-pulse" />
        </div>

        <div className="mt-4 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_50px_-26px_rgba(15,23,42,0.38)] md:p-8">
          <div className="space-y-6 md:space-y-7">
            <div>
              <div className="h-3 w-20 rounded bg-slate-200/80 animate-pulse" />
              <div className="mt-3 h-24 rounded-2xl bg-slate-200/70 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent animate-[shimmer_1.4s_infinite]" />
              </div>
            </div>

            <div className="h-24 rounded-2xl bg-slate-200/70 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent animate-[shimmer_1.4s_infinite]" />
            </div>

            <div className="h-12 rounded-2xl bg-slate-200/70 animate-pulse" />

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="mx-auto h-14 w-14 rounded-full bg-slate-200/80 animate-pulse" />
                  <div className="mx-auto h-3 w-10 rounded bg-slate-200/80 animate-pulse" />
                </div>
              ))}
            </div>

            <div className="h-40 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/25 animate-pulse" />

            <div className="h-14 rounded-full bg-indigo-300/70 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
