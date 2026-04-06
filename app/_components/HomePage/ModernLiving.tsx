'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Calculator,
  Check,
  IndianRupee,
  WalletMinimal,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type FeatureId = 'splits' | 'balances' | 'settlements';

type Feature = {
  id: FeatureId;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  icon: typeof Calculator;
};

const spring = {
  type: 'spring' as const,
  stiffness: 210,
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

const features: Feature[] = [
  {
    id: 'splits',
    eyebrow: 'Smart Expense Splits',
    title: 'Split a bill the way real roommates actually need.',
    description:
      'Switch between equal and custom splits without opening a calculator. Evenly keeps the math visible, fair, and impossible to misread.',
    bullets: [
      'Equal and custom splits in one flow',
      'Instant per-person breakdowns',
      'Clear math before anyone pays',
    ],
    icon: Calculator,
  },
  {
    id: 'balances',
    eyebrow: 'Live Balances',
    title: 'See who owes what right now, not after a long chat thread.',
    description:
      'Balances update into a calm shared ledger so everyone sees the same truth. No follow-ups, no duplicate counting, no room for confusion.',
    bullets: [
      'Shared view for every roommate',
      'Net balances that stay readable',
      'Fast clarity after every expense',
    ],
    icon: WalletMinimal,
  },
  {
    id: 'settlements',
    eyebrow: 'Clear Settlements',
    title: 'Turn messy payment confirmations into a clean done state.',
    description:
      'Once someone pays, Evenly makes the outcome obvious. Payment proof, status, and the final all-settled moment are easy to trust at a glance.',
    bullets: [
      'Payment states feel unmistakable',
      'Settlement proof stays organized',
      'Everyone knows when it is done',
    ],
    icon: BadgeCheck,
  },
];

function FeatureTabs({
  active,
  onChange,
}: {
  active: FeatureId;
  onChange: (id: FeatureId) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
      {features.map((feature) => {
        const Icon = feature.icon;
        const isActive = feature.id === active;

        return (
          <button
            key={feature.id}
            type="button"
            onClick={() => onChange(feature.id)}
            className="relative min-w-fit rounded-[24px] px-4 py-4 text-left"
          >
            {isActive ? (
              <motion.div
                layoutId="feature-tab"
                transition={spring}
                className="absolute inset-0 rounded-[24px] border border-indigo-200/80 bg-white/90 shadow-[0_18px_45px_rgba(79,70,229,0.12)] backdrop-blur-xl"
              />
            ) : null}
            <div className="relative z-10 flex items-start gap-3">
              <div
                className={`rounded-2xl p-2.5 ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] text-white'
                    : 'bg-white/80 text-slate-500 shadow-sm'
                }`}
              >
                <Icon className="size-4" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {feature.eyebrow}
                </p>
                <p className="mt-1 max-w-44 text-xs leading-5 text-slate-500">
                  {feature.bullets[0]}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function PreviewShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active: FeatureId;
}) {
  return (
    <motion.div
      layout
      transition={spring}
      className="relative min-h-[460px] overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(238,242,255,0.86))] p-4 shadow-[0_30px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl sm:p-6"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background:
            active === 'splits'
              ? 'radial-gradient(circle at 20% 15%, rgba(79,70,229,0.18), transparent 24%), radial-gradient(circle at 78% 82%, rgba(34,197,94,0.12), transparent 22%)'
              : active === 'balances'
                ? 'radial-gradient(circle at 80% 10%, rgba(6,182,212,0.18), transparent 24%), radial-gradient(circle at 18% 75%, rgba(79,70,229,0.14), transparent 24%)'
                : 'radial-gradient(circle at 82% 16%, rgba(34,197,94,0.20), transparent 26%), radial-gradient(circle at 18% 82%, rgba(79,70,229,0.12), transparent 24%)',
        }}
        transition={spring}
      />
      {children}
    </motion.div>
  );
}

function SplitsPreview() {
  const [splitMode, setSplitMode] = useState<'equal' | 'custom'>('equal');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSplitMode((current) => (current === 'equal' ? 'custom' : 'equal'));
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const members =
    splitMode === 'equal'
      ? [
          { name: 'You', amount: '₹400', accent: 'bg-indigo-50 text-indigo-700' },
          { name: 'Rahul', amount: '₹400', accent: 'bg-slate-100 text-slate-700' },
          { name: 'Sneha', amount: '₹400', accent: 'bg-slate-100 text-slate-700' },
        ]
      : [
          { name: 'You', amount: '₹300', accent: 'bg-indigo-50 text-indigo-700' },
          { name: 'Rahul', amount: '₹500', accent: 'bg-cyan-50 text-cyan-700' },
          { name: 'Sneha', amount: '₹400', accent: 'bg-emerald-50 text-emerald-700' },
        ];

  return (
    <PreviewShell active="splits">
      <div className="relative flex min-h-[412px] flex-col gap-4 lg:justify-between">
        <motion.div
          layout
          transition={spring}
          className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          whileHover={{ y: -4, scale: 1.01 }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Add expense</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">Groceries</h3>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
              <IndianRupee className="size-5" />
            </div>
          </div>

          <div className="mb-4 rounded-[24px] bg-slate-50 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Total amount</p>
                <p className="text-3xl font-semibold text-slate-900">₹1,200</p>
              </div>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={loopTween(3)}
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600"
              >
                Math updates live
              </motion.div>
            </div>
          </div>

          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
            {(['equal', 'custom'] as const).map((item) => {
              const active = item === splitMode;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSplitMode(item)}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold capitalize"
                >
                  {active ? (
                    <motion.span
                      layoutId="split-mode"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                    />
                  ) : null}
                  <span className={`relative z-10 ${active ? 'text-slate-900' : 'text-slate-500'}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                layout
                animate={{ x: [0, index % 2 === 0 ? 3 : -3, 0] }}
                transition={{ layout: spring, x: loopTween(2.8, index * 0.1) }}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${member.accent}`}>
                    {member.name}
                  </div>
                  <span className="text-sm text-slate-500">
                    {splitMode === 'equal' ? 'Equal split' : 'Custom share'}
                  </span>
                </div>
                <span className="text-base font-semibold text-slate-900">{member.amount}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={loopTween(3.4)}
          className="self-end rounded-[24px] border border-indigo-100 bg-white/85 px-4 py-3 shadow-[0_16px_40px_rgba(79,70,229,0.1)]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600">
              <Check className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Split preview ready</p>
              <p className="text-xs text-slate-500">Everyone sees the same breakdown</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PreviewShell>
  );
}

function BalancesPreview() {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHighlight((current) => (current + 1) % 3);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const balances = [
    { label: 'You owe Rahul', amount: '₹400', tone: 'text-amber-600 bg-amber-50' },
    { label: 'Sneha owes you', amount: '₹200', tone: 'text-emerald-600 bg-emerald-50' },
    { label: 'House balance', amount: 'All synced', tone: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <PreviewShell active="balances">
      <div className="relative grid min-h-[412px] gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          layout
          transition={spring}
          whileHover={{ y: -4, scale: 1.01 }}
          className="rounded-[28px] border border-white/80 bg-white/92 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Live balances</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">Updated after every expense</p>
            </div>
            <motion.div
              animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
              transition={{ y: loopTween(3), scale: loopTween(3) }}
              className="rounded-2xl bg-cyan-50 p-3 text-cyan-600"
            >
              <WalletMinimal className="size-5" />
            </motion.div>
          </div>

          <div className="space-y-3">
            {balances.map((balance, index) => (
              <motion.div
                key={balance.label}
                layout
                transition={spring}
                animate={{
                  scale: highlight === index ? 1.02 : 1,
                  y: highlight === index ? -2 : 0,
                }}
                className="flex items-center justify-between rounded-[24px] border border-slate-100 bg-slate-50/80 px-4 py-4"
              >
                <div>
                  <p className="text-sm text-slate-500">{balance.label}</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{balance.amount}</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-semibold ${balance.tone}`}>
                  {index === 0 ? 'To pay' : index === 1 ? 'To receive' : 'Shared truth'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={loopTween(3.5)}
            className="rounded-[24px] border border-indigo-100 bg-white/88 p-4 shadow-[0_16px_40px_rgba(79,70,229,0.10)]"
          >
            <p className="text-sm font-semibold text-slate-500">Balance pulse</p>
            <div className="mt-4 flex items-end gap-2">
              {[42, 64, 88, 58, 96, 72].map((height, index) => (
                <motion.div
                  key={height}
                  animate={{ height: [`${height - 12}px`, `${height}px`, `${height - 8}px`] }}
                  transition={loopTween(2.2, index * 0.12)}
                  className="w-full rounded-full bg-[linear-gradient(180deg,#4f46e5,#06b6d4)]"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[24px] border border-emerald-100 bg-emerald-50/85 p-4 shadow-[0_16px_36px_rgba(34,197,94,0.10)]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2.5 text-emerald-600 shadow-sm">
                <BellRing className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Balance changed instantly</p>
                <p className="text-xs text-emerald-700/80">Rahul covered rent. Everyone updated.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PreviewShell>
  );
}

function SettlementsPreview() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCompleted((current) => !current);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <PreviewShell active="settlements">
      <div className="relative flex min-h-[412px] flex-col gap-4">
        <motion.div
          layout
          transition={spring}
          className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <p className="text-sm font-semibold text-slate-500">Settlement request</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Amount to settle</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">₹400</p>
              </div>
              <div className="rounded-[24px] border border-slate-100 bg-white p-4">
                <p className="text-sm text-slate-500">From</p>
                <p className="mt-1 font-semibold text-slate-900">Rahul paid you via UPI</p>
              </div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={loopTween(3.2)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600"
              >
                Proof attached
                <ArrowRight className="size-3.5" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            layout
            transition={spring}
            animate={{
              scale: completed ? 1.01 : 0.99,
              y: completed ? -2 : 2,
            }}
            className="rounded-[28px] border border-emerald-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,253,245,0.96))] p-5 shadow-[0_20px_60px_rgba(34,197,94,0.12)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Settlement status</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {completed ? 'All settled' : 'Verifying payment'}
                </p>
              </div>
              <motion.div
                animate={{
                  rotate: completed ? 0 : -12,
                  scale: completed ? [1, 1.08, 1] : 1,
                }}
                transition={{ scale: loopTween(2.4), rotate: spring }}
                className="rounded-2xl bg-emerald-100 p-3 text-emerald-600"
              >
                <BadgeCheck className="size-5" />
              </motion.div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Payment received', done: true },
                { label: 'Proof matched', done: completed },
                { label: 'Balance cleared', done: completed },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  layout
                  animate={{
                    x: completed && index > 0 ? [0, 4, 0] : 0,
                  }}
                  transition={{ layout: spring, x: loopTween(2.1, index * 0.08) }}
                  className={`flex items-center justify-between rounded-[22px] border px-4 py-3 ${
                    step.done
                      ? 'border-emerald-100 bg-emerald-50'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <span className={`font-medium ${step.done ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {step.label}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      step.done
                        ? 'bg-white text-emerald-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {step.done ? 'Done' : 'Pending'}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              layout
              transition={spring}
              className="mt-4 rounded-[24px] bg-white/90 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Final state</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {completed ? 'No pending balances left' : 'Waiting for confirmation'}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">
                  {completed ? 'Clear' : 'In progress'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PreviewShell>
  );
}

function FeaturePreview({ active }: { active: FeatureId }) {
  if (active === 'splits') return <SplitsPreview />;
  if (active === 'balances') return <BalancesPreview />;
  return <SettlementsPreview />;
}

export default function ModernLiving() {
  const [active, setActive] = useState<FeatureId>('splits');

  return (
    <section className="bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.10),transparent_34%),linear-gradient(180deg,#eef2ff_0%,#f8fafc_48%,#eefaf8_100%)] py-14 sm:py-18 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm backdrop-blur-xl">
              Built For Modern Living
            </div>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Product moments that make shared expenses feel easy.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Each workflow is designed to feel like the app is already doing the hard part for you.
              Switch through the core features and see how Evenly keeps the experience clear from split to settlement.
            </p>
          </div>

          <div className="mt-8">
            <FeatureTabs active={active} onChange={setActive} />
          </div>

          <motion.div
            layout
            transition={spring}
            className="mt-8 rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          >
            {features.map((feature) =>
              feature.id === active ? (
                <motion.div
                  key={feature.id}
                  layout
                  transition={spring}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                      {feature.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {feature.bullets.map((bullet) => (
                      <motion.div
                        key={bullet}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-4"
                      >
                        <div className="mb-3 inline-flex rounded-2xl bg-indigo-50 p-2 text-indigo-600">
                          <Check className="size-4" />
                        </div>
                        <p className="text-sm font-medium leading-6 text-slate-700">{bullet}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null
            )}
          </motion.div>
        </div>

        <div>
          <FeaturePreview active={active} />
        </div>
      </div>
    </section>
  );
}
