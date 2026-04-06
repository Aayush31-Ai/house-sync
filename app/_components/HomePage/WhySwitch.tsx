'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Check,
  CircleAlert,
  Clock3,
  HandCoins,
  MessagesSquare,
  ReceiptText,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { useState } from 'react';

type ComparisonMode = 'old' | 'evenly';

const spring = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 22,
  mass: 0.9,
};

const loopTween = (duration: number, delay = 0) => ({
  type: 'tween' as const,
  duration,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  delay,
});

const oldChatBubbles = [
  'Bhai tune last time pay kiya tha kya?',
  'Wait, electricity kisne add ki?',
  'I think I already sent mine...',
];

const oldAmounts = ['₹248?', '₹1320', '₹400', '₹90 split?', '₹710'];

const evenlyExpenses = [
  { title: 'Groceries', meta: 'Split across 4 roommates', amount: '₹1,600' },
  { title: 'Electricity', meta: 'Auto-balanced instantly', amount: '₹980' },
  { title: 'Internet', meta: 'Recurring monthly expense', amount: '₹899' },
];

const insightContent = {
  old: {
    label: 'What the old way feels like',
    summary: 'Money tracking stays manual, unclear, and emotionally draining.',
    points: [
      { icon: MessagesSquare, text: 'Confusing payments' },
      { icon: ScanSearch, text: 'No clarity' },
      { icon: Clock3, text: 'Awkward reminders' },
    ],
  },
  evenly: {
    label: 'What Evenly fixes instantly',
    summary: 'Everyone sees the same truth, so the house feels calmer immediately.',
    points: [
      { icon: ShieldCheck, text: 'Clear balances' },
      { icon: ReceiptText, text: 'Automated tracking' },
      { icon: HandCoins, text: 'Stress-free settlements' },
    ],
  },
} satisfies Record<
  ComparisonMode,
  {
    label: string;
    summary: string;
    points: { icon: ComponentType<{ className?: string }>; text: string }[];
  }
>;

function ComparisonToggle({
  mode,
  onChange,
}: {
  mode: ComparisonMode;
  onChange: (mode: ComparisonMode) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-white/70 bg-white/80 p-1 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {(['old', 'evenly'] as const).map((item) => {
        const active = mode === item;
        const label = item === 'old' ? 'Old Way' : 'Evenly Way';

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className="relative min-w-32 rounded-full px-4 py-3 text-sm font-semibold text-slate-700 sm:min-w-40"
          >
            {active ? (
              <motion.span
                layoutId="comparison-toggle"
                transition={spring}
                className={`absolute inset-0 rounded-full ${
                  item === 'old'
                    ? 'bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.25)]'
                    : 'bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] shadow-[0_10px_30px_rgba(79,70,229,0.28)]'
                }`}
              />
            ) : null}
            <span className={`relative z-10 ${active ? 'text-white' : 'text-slate-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StickyInsightBar({ mode }: { mode: ComparisonMode }) {
  const content = insightContent[mode];

  return (
    <div className="sticky top-4 z-40 mb-6 sm:top-8 sm:mb-8">
      <motion.div
        layout
        transition={spring}
        whileHover={{ y: -2, scale: 1.005 }}
        className={`rounded-[28px] border bg-white/72 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-4 ${
          mode === 'old'
            ? 'border-red-200/70'
            : 'border-indigo-200/70'
        }`}
      >
        <motion.div
          key={mode}
          initial={{ y: 24, scale: 0.97 }}
          animate={{ y: 0, scale: 1 }}
          transition={spring}
          className="grid gap-3 lg:grid-cols-[1.1fr_repeat(3,0.9fr)] lg:items-center"
        >
          <div className="rounded-[22px] border border-white/70 bg-white/78 px-4 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {content.label}
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700 sm:text-base">
              {content.summary}
            </p>
          </div>

          {content.points.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={point.text}
                layout
                initial={{ y: 18, scale: 0.96 }}
                animate={{
                  y: [0, -3, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  y: loopTween(2.8 + index * 0.18),
                  scale: loopTween(2.8 + index * 0.18),
                  layout: spring,
                }}
                className={`rounded-[22px] border px-4 py-4 shadow-sm ${
                  mode === 'old'
                    ? 'border-red-100/80 bg-red-50/75'
                    : 'border-indigo-100/80 bg-white/82'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-2xl p-2.5 ${
                      mode === 'old'
                        ? 'bg-white text-red-500'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{point.text}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

function OldWayScene({ mode }: { mode: ComparisonMode }) {
  const isOldActive = mode === 'old';

  return (
    <motion.div
      layout
      transition={spring}
      className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(226,232,240,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_30px_80px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-6"
      animate={{
        scale: isOldActive ? 1.01 : 0.98,
        rotate: isOldActive ? -1.2 : -2.5,
        filter: isOldActive ? 'blur(0px)' : 'blur(1.6px)',
        y: isOldActive ? -4 : 8,
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
            <X className="size-3.5" />
            The Old Way
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-700">
            Manual follow-ups, awkward reminders
          </h3>
        </div>
        <motion.div
          animate={{
            y: isOldActive ? [0, -5, 0] : 0,
            rotate: isOldActive ? 0 : -8,
          }}
          transition={{
            rotate: spring,
            y: loopTween(3.6),
          }}
          className="rounded-2xl border border-red-200 bg-white/70 p-3 text-red-400 shadow-sm"
        >
          <CircleAlert className="size-5" />
        </motion.div>
      </div>

      <div className="relative h-[320px]">
        <motion.div
          className="absolute left-2 top-5 w-[72%] rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-[0_16px_45px_rgba(148,163,184,0.22)]"
          animate={{
            x: isOldActive ? 0 : -18,
            y: isOldActive ? 0 : 12,
            rotate: isOldActive ? -6 : -10,
          }}
          transition={spring}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Roommate chat</span>
            <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
              3 unresolved
            </span>
          </div>
          <div className="space-y-3">
            {oldChatBubbles.map((message, index) => (
              <motion.div
                key={message}
                animate={{
                  x: isOldActive ? [0, index % 2 === 0 ? 6 : -6, 0] : 0,
                  rotate: isOldActive ? [0, index % 2 === 0 ? 0.8 : -0.8, 0] : 0,
                }}
                transition={{
                  x: loopTween(3 + index * 0.4, index * 0.15),
                  rotate: loopTween(3 + index * 0.4, index * 0.15),
                }}
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm font-medium shadow-sm ${
                  index === 1
                    ? 'ml-auto bg-slate-100 text-slate-600'
                    : 'bg-red-50 text-slate-700'
                }`}
              >
                {message}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute right-2 top-20 w-[44%] rounded-[24px] border border-slate-300/70 bg-slate-50/85 p-4 shadow-[0_18px_40px_rgba(148,163,184,0.20)]"
          animate={{
            x: isOldActive ? 0 : 18,
            y: isOldActive ? 0 : -8,
            rotate: isOldActive ? 7 : 11,
          }}
          transition={spring}
        >
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Split notes</span>
            <span className="text-red-400">Edited 6x</span>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="rounded-xl bg-white/80 p-3">Milk + eggs + fruits = maybe equal?</div>
            <div className="rounded-xl bg-white/80 p-3">Rahul paid wifi? or was it Aman?</div>
            <div className="rounded-xl bg-red-50 p-3 text-red-500">Need to recalculate everyone</div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-3 left-3 right-10 rounded-[26px] border border-slate-300/70 bg-white/65 p-4 shadow-[0_20px_60px_rgba(148,163,184,0.2)]"
          animate={{
            x: isOldActive ? 0 : -10,
            y: isOldActive ? 0 : 8,
            rotate: isOldActive ? -2 : -5,
          }}
          transition={spring}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Random tracking</span>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-red-400" />
              <span className="size-2 rounded-full bg-orange-300" />
              <span className="size-2 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {oldAmounts.map((amount, index) => (
              <motion.span
                key={amount}
                animate={{
                  y: isOldActive ? [0, index % 2 === 0 ? -7 : 5, 0] : 0,
                  rotate: isOldActive ? [0, index % 2 === 0 ? -3 : 3, 0] : 0,
                }}
                transition={{
                  y: loopTween(2.8 + index * 0.3),
                  rotate: loopTween(2.8 + index * 0.3),
                }}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  index === 0 || index === 3
                    ? 'bg-red-100 text-red-500'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {amount}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function EvenlyWayScene({ mode }: { mode: ComparisonMode }) {
  const isEvenlyActive = mode === 'evenly';

  return (
    <motion.div
      layout
      transition={spring}
      className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-indigo-200/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,242,255,0.94))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_80px_rgba(79,70,229,0.16)] backdrop-blur-xl sm:p-6"
      animate={{
        scale: isEvenlyActive ? 1.02 : 0.99,
        rotate: isEvenlyActive ? 0 : 1.4,
        y: isEvenlyActive ? -4 : 8,
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isEvenlyActive
            ? 'radial-gradient(circle at 70% 20%, rgba(34,197,94,0.18), transparent 28%), radial-gradient(circle at 30% 0%, rgba(79,70,229,0.18), transparent 30%)'
            : 'radial-gradient(circle at 70% 20%, rgba(34,197,94,0.10), transparent 24%), radial-gradient(circle at 30% 0%, rgba(79,70,229,0.12), transparent 26%)',
        }}
        transition={spring}
      />

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
            <Check className="size-3.5" />
            The Evenly Way
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Calm balances, instant clarity
          </h3>
        </div>
        <motion.div
          animate={{
            y: isEvenlyActive ? [0, -6, 0] : 0,
            scale: isEvenlyActive ? [1, 1.05, 1] : 1,
          }}
          transition={{
            y: loopTween(3.2),
            scale: loopTween(3.2),
          }}
          className="rounded-2xl border border-indigo-100 bg-white/90 p-3 text-indigo-500 shadow-[0_18px_40px_rgba(79,70,229,0.14)]"
        >
          <Sparkles className="size-5" />
        </motion.div>
      </div>

      <div className="relative h-[320px]">
        <motion.div
          className="absolute left-0 right-12 top-0 rounded-[26px] border border-white/80 bg-white/90 p-4 shadow-[0_22px_60px_rgba(79,70,229,0.12)]"
          animate={{
            x: isEvenlyActive ? 0 : 12,
            y: isEvenlyActive ? 0 : 10,
          }}
          transition={spring}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Live balances</p>
              <p className="text-2xl font-semibold text-slate-900">You owe Rahul ₹400</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-500">
              <Wallet className="size-5" />
            </div>
          </div>

          <div className="space-y-3">
            {evenlyExpenses.map((expense, index) => (
              <motion.div
                key={expense.title}
                layout
                transition={spring}
                animate={{
                  x: isEvenlyActive ? 0 : index * 4,
                  y: isEvenlyActive ? 0 : index * 3,
                }}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-800">{expense.title}</p>
                  <p className="text-sm text-slate-500">{expense.meta}</p>
                </div>
                <p className="font-semibold text-slate-900">{expense.amount}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-18 w-[46%] rounded-[24px] border border-indigo-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(238,242,255,0.92))] p-4 shadow-[0_18px_40px_rgba(79,70,229,0.12)]"
          animate={{
            x: isEvenlyActive ? 0 : 16,
            y: isEvenlyActive ? 0 : -10,
          }}
          transition={spring}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-500">
              <BadgeCheck className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Split completed</p>
              <p className="text-sm text-slate-500">Everyone sees the same numbers</p>
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            4/4 roommates synced successfully
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-10 right-0 rounded-[26px] border border-indigo-100 bg-white/92 p-4 shadow-[0_18px_45px_rgba(79,70,229,0.12)]"
          animate={{
            x: isEvenlyActive ? 0 : 8,
            y: isEvenlyActive ? 0 : 12,
          }}
          transition={spring}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <BellRing className="size-4 text-indigo-500" />
              Smart settlement summary
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              Auto-updated
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-500">You owe</p>
              <p className="text-xl font-semibold text-slate-900">₹400</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-700">Status</p>
              <p className="text-xl font-semibold text-emerald-700">All clear</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TransformationRail({ mode }: { mode: ComparisonMode }) {
  const isEvenlyActive = mode === 'evenly';

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-14 w-full max-w-20 items-center justify-center md:h-[430px] md:w-14 md:max-w-none">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-slate-300 via-slate-400 to-indigo-300 md:inset-y-0 md:left-1/2 md:h-full md:w-px md:-translate-x-1/2 md:-translate-y-0 md:bg-gradient-to-b" />
        <motion.div
          animate={{
            x: isEvenlyActive ? 26 : -26,
            y: isEvenlyActive ? 0 : 0,
          }}
          transition={spring}
          className="absolute md:hidden"
        >
          <div className="rounded-full border border-white/80 bg-white/90 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
            <ArrowRight className="size-5 text-indigo-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{
            y: isEvenlyActive ? 154 : -154,
            rotate: isEvenlyActive ? 90 : -90,
          }}
          transition={spring}
          className="absolute hidden md:block"
        >
          <div className="rounded-full border border-white/80 bg-white/90 p-2 shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
            <ArrowRight className="size-5 text-indigo-500" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function WhySwitch() {
  const [mode, setMode] = useState<ComparisonMode>('evenly');
  const activeContent = insightContent[mode];

  return (
    <section className="page-mobile-padding bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm backdrop-blur-xl">
            Before vs After
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Why switch to a calmer way of splitting life together?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Drag your attention from friction to clarity. Evenly turns scattered
            chats, mental math, and awkward reminders into one shared, trustworthy view.
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4 sm:mb-8">
          <ComparisonToggle mode={mode} onChange={setMode} />
          <motion.div
            layout
            transition={spring}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${
              mode === 'old'
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {mode === 'old' ? <X className="size-4" /> : <Check className="size-4" />}
            {activeContent.summary}
          </motion.div>
        </div>

        <StickyInsightBar mode={mode} />

        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <OldWayScene mode={mode} />
          <TransformationRail mode={mode} />
          <EvenlyWayScene mode={mode} />
        </div>
      </div>
    </section>
  );
}
