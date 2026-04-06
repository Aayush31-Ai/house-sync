import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-slate-950">Evenly</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Expense sharing for roommates who want clarity, fairness, and fewer awkward money conversations.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <Link href="#how-it-works" className="hover:text-slate-950">
              How It Works
            </Link>
            <Link href="/create-house" className="hover:text-slate-950">
              Create House
            </Link>
            <Link href="/create-member" className="hover:text-slate-950">
              Join House
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why Evenly</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <p>Shared source of truth</p>
            <p>Live roommate balances</p>
            <p>Stress-free settlements</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Evenly. Built for calmer shared living.</p>
        <p>Made for roommates, flatmates, and shared homes.</p>
      </div>
    </footer>
  );
}
