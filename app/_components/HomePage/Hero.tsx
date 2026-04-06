'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  IndianRupee,
  SplitSquareVertical,
  Wallet,
  ArrowLeft
} from 'lucide-react';

const spring = {
  type: 'spring' as const,
  stiffness: 170,
  damping: 22,
  mass: 0.9,
};

const floatTween = (duration: number, delay = 0) => ({
  type: 'tween' as const,
  duration,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
  delay,
});

function HeroButtons() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
        <Link
          href="/create-house"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4f46e5] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(79,70,229,0.20)]"
        >
          Get Started
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
      <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
        <Link
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/84 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          View Demo
          <CreditCard className="size-4" />
        </Link>
      </motion.div>
    </div>
  );
}

function ConnectedCard({
  className,
  children,
  duration,
  delay = 0,
}: {
  className: string;
  children: React.ReactNode;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ y: floatTween(duration, delay) }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`rounded-[28px] border border-white/75 bg-white/88 shadow-[0_22px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DesktopOverlay() {
  return (
    <div className="absolute inset-0 hidden xl:block">
      <svg viewBox="0 0 1440 900" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <motion.path
          d="M740 520 C 620 450, 450 370, 300 305"
          stroke="url(#hero-arrow)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.path
          d="M760 500 C 860 410, 1010 340, 1150 285"
          stroke="url(#hero-arrow)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.2 }}
        />
        <motion.path
          d="M690 540 C 560 600, 420 670, 290 748"
          stroke="url(#hero-arrow)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.3 }}
        />
        <motion.path
          d="M790 538 C 940 590, 1070 650, 1184 730"
          stroke="url(#hero-arrow)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.4 }}
        />

        <motion.path
          d="M304 297 L292 305 L304 313"
          stroke="#4f46e5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.12 }}
        />
        <motion.path
          d="M1140 282 L1152 285 L1143 296"
          stroke="#4f46e5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.22 }}
        />
        <motion.path
          d="M295 741 L283 748 L295 755"
          stroke="#4f46e5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.32 }}
        />
        <motion.path
          d="M1175 724 L1186 730 L1176 739"
          stroke="#4f46e5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...spring, delay: 0.42 }}
        />

        <defs>
          <linearGradient id="hero-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>

      <ConnectedCard className="absolute left-[6%] top-[28%] w-[240px] p-5" duration={5.8} delay={0.1}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Expense</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Dinner ₹1200</p>
          </div>
          <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600">
            <IndianRupee className="size-4" />
          </div>
        </div>
        <p className="text-sm text-slate-600">Paid by Aayush</p>
      </ConnectedCard>

      <ConnectedCard className="absolute right-[7%] top-[26%] w-[248px] p-5" duration={6.1} delay={0.2}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Split</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Split between 3</p>
          </div>
          <div className="rounded-2xl bg-cyan-50 p-2.5 text-cyan-600">
            <SplitSquareVertical className="size-4" />
          </div>
        </div>
        <p className="text-sm text-slate-600">₹400 each</p>
      </ConnectedCard>

      <ConnectedCard className="absolute bottom-[12%] left-[8%] w-[250px] p-5" duration={6.3} delay={0.3}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Balance</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">You owe Rahul ₹400</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-600">
            <Wallet className="size-4" />
          </div>
        </div>
        <p className="text-sm text-slate-600">Updated instantly for everyone</p>
      </ConnectedCard>

      <ConnectedCard className="absolute bottom-[13%] right-[8%] w-[238px] p-5" duration={6.6} delay={0.4}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settlement</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Payment completed</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600">
            <BadgeCheck className="size-4" />
          </div>
        </div>
        <div className="rounded-[18px] bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          All settled
        </div>
      </ConnectedCard>
    </div>
  );
}

function MobileHero() {
  return (
      <div className="relative z-10 xl:hidden">
      <div className="mx-auto max-w-xl rounded-[30px] border border-white/70 bg-white/72 p-5 text-center shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-[24px]">
          <Image
            src="/assets/landing-page/try3.png"
            alt="Three roommates sitting on a sofa using phones"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(79,70,229,0.06))]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm">
          Expense Sharing For Roommates
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Evenly
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          Split expenses effortlessly with your roommates.
          <br />
          Track, settle, and stay stress-free together.
        </p>

        <HeroButtons />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfcff_0%,#f5f7ff_52%,#ffffff_100%)]">
      <div className="absolute inset-0">
        <Image
          src="/assets/landing-page/try3.png"
          alt="Three roommates sitting on a sofa using phones"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center xl:block"
        />
        <div className="hidden xl:block absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.86)_0%,rgba(248,250,252,0.28)_26%,rgba(248,250,252,0.12)_54%,rgba(248,250,252,0.42)_100%)]" />
        <div className="hidden xl:block absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.86),transparent_18%),radial-gradient(circle_at_64%_28%,rgba(79,70,229,0.08),transparent_20%)]" />
      </div>

      <div className="relative hidden min-h-screen xl:block">
        <div className="absolute inset-x-0 top-[18%] z-20 mx-auto flex max-w-[760px] flex-col items-center px-6 text-center 2xl:top-[20%]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm backdrop-blur-xl">
            Expense Sharing For Roommates
          </div>

          <h1 className="mt-6 text-6xl font-semibold tracking-tight text-slate-950 2xl:text-7xl">
            Evenly
          </h1>

          <p className="mt-5 text-2xl leading-9 text-slate-700">
            Split expenses effortlessly with your roommates.
            <br />
            Track, settle, and stay stress-free together.
          </p>

          <HeroButtons />
        </div>

        <DesktopOverlay />
      </div>

      <div className="px-4 py-14 sm:px-6 lg:px-8 xl:hidden">
        <MobileHero />
      </div>
    </section>
  );
}
