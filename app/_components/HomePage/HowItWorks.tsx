"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronRight, Home, ReceiptIndianRupee, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";

type StepId = "house" | "expense" | "settle";

type Step = {
  id: StepId;
  number: string;
  title: string;
  headline: string;
  description: string;
  gif: string;
  icon: typeof Home;
  badge: string;
  detailA: string;
  detailB: string;
  detailC: string;
};

const spring = {
  type: "spring" as const,
  stiffness: 210,
  damping: 24,
  mass: 0.9,
};

const floatTween = (duration: number, delay = 0) => ({
  type: "tween" as const,
  duration,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
});

const steps: Step[] = [
  {
    id: "house",
    number: "01",
    title: "Create a House",
    headline: "Start the shared space in minutes, not in a messy group setup.",
    description:
      "Create your house, invite roommates, and give everyone one place to track shared life together from day one.",
    gif: "/assets/how it works/House searching.gif",
    icon: Home,
    badge: "Invite everyone once",
    detailA: "Add house name and roommates",
    detailB: "Shared dashboard becomes the source of truth",
    detailC: "Everyone joins the same financial space",
  },
  {
    id: "expense",
    number: "02",
    title: "Add Expenses",
    headline: "Drop in an expense and let Evenly handle the split logic.",
    description:
      "Track groceries, rent, wifi, and one-off spends with a flow that makes the math obvious before anyone has to ask.",
    gif: "/assets/how it works/Top up credit.gif",
    icon: ReceiptIndianRupee,
    badge: "Math happens instantly",
    detailA: "Equal or custom splits",
    detailB: "Clear per-person amounts",
    detailC: "Balances update live",
  },
  {
    id: "settle",
    number: "03",
    title: "Settle Up",
    headline: "Move from pending payments to a clean all-settled moment.",
    description:
      "When someone pays, Evenly keeps the proof, status, and final outcome easy to verify so nobody wonders what is left.",
    gif: "/assets/how it works/Friendly handshake.gif",
    icon: WalletCards,
    badge: "Everyone knows when it is done",
    detailA: "Track pending payments clearly",
    detailB: "Verify proof without confusion",
    detailC: "Land on a calm settled state",
  },
];

function StepSelector({
  step,
  active,
  onSelect,
}: {
  step: Step;
  active: boolean;
  onSelect: (id: StepId) => void;
}) {
  const Icon = step.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(step.id)}
      className="relative w-full rounded-[28px] p-4 text-left"
    >
      {active ? (
        <motion.div
          layoutId="how-it-works-step"
          transition={spring}
          className="absolute inset-0 rounded-[28px] border border-indigo-200/80 bg-white/92 shadow-[0_18px_50px_rgba(79,70,229,0.12)] backdrop-blur-xl"
        />
      ) : null}

      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
            active
              ? "bg-[linear-gradient(135deg,#4f46e5,#06b6d4)] text-white"
              : "bg-white/80 text-slate-500 shadow-sm"
          }`}
        >
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Step {step.number}
              </p>
              <p className={`mt-1 text-lg font-semibold ${active ? "text-slate-900" : "text-slate-700"}`}>
                {step.title}
              </p>
            </div>
            <ChevronRight className={`size-4 shrink-0 ${active ? "text-indigo-500" : "text-slate-400"}`} />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
        </div>
      </div>
    </button>
  );
}

function ProductPreview({ step }: { step: Step }) {
  return (
    <motion.div
      layout
      transition={spring}
      className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(238,242,255,0.88))] p-4 shadow-[0_30px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl sm:p-5"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background:
            step.id === "house"
              ? "radial-gradient(circle at 12% 18%, rgba(79,70,229,0.18), transparent 22%), radial-gradient(circle at 88% 78%, rgba(6,182,212,0.12), transparent 22%)"
              : step.id === "expense"
                ? "radial-gradient(circle at 18% 82%, rgba(79,70,229,0.16), transparent 24%), radial-gradient(circle at 84% 16%, rgba(34,197,94,0.12), transparent 22%)"
                : "radial-gradient(circle at 18% 18%, rgba(34,197,94,0.18), transparent 24%), radial-gradient(circle at 82% 82%, rgba(79,70,229,0.12), transparent 22%)",
        }}
        transition={spring}
      />

      <div className="relative grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          layout
          transition={spring}
          whileHover={{ y: -4, scale: 1.01 }}
          className="rounded-[28px] border border-white/80 bg-white/92 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">{step.title}</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{step.headline}</h3>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
              {step.badge}
            </div>
          </div>

          <div className="grid gap-3">
            {[step.detailA, step.detailB, step.detailC].map((detail, index) => (
              <motion.div
                key={detail}
                layout
                animate={{ x: [0, index % 2 === 0 ? 4 : -4, 0] }}
                transition={{ layout: spring, x: floatTween(3.1, index * 0.12) }}
                className="flex items-center justify-between rounded-[22px] border border-slate-100 bg-slate-50/90 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                    <Check className="size-4" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{detail}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                  Ready
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Flow outcome</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {step.id === "house"
                    ? "Everyone enters one shared setup"
                    : step.id === "expense"
                      ? "The split is visible before the awkward chat begins"
                      : "Balances move to a clear done state"}
                </p>
              </div>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={floatTween(3)}
                className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm"
              >
                Evenly flow
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div
            layout
            transition={spring}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-100">
              <Image
                src={step.gif}
                alt={step.title}
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={floatTween(3.4)}
            className="rounded-[26px] border border-indigo-100 bg-white/88 p-4 shadow-[0_16px_40px_rgba(79,70,229,0.10)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">What users feel</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Lower friction
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              {step.id === "house"
                ? "Setup feels guided instead of chaotic, so roommates start with alignment."
                : step.id === "expense"
                  ? "The app does the explaining for you, so the split feels fair immediately."
                  : "Payment clarity builds trust because everyone can see when things are resolved."}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<StepId>("house");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        const currentIndex = steps.findIndex((step) => step.id === current);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex].id;
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const active = steps.find((step) => step.id === activeStep) ?? steps[0];

  return (
    <section
      id="how-it-works"
      className="bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.10),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)] py-14 sm:py-18 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm backdrop-blur-xl">
            How It Works
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            From setup to settled, the flow stays obvious.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Evenly guides roommates through the three moments that usually create the most confusion,
            then turns each one into a clean product experience.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Guided steps
              </p>
              <div className="flex items-center gap-2">
                {steps.map((step) => (
                  <span
                    key={step.id}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeStep === step.id ? "w-8 bg-indigo-500" : "w-2.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((step) => (
                <StepSelector
                  key={step.id}
                  step={step}
                  active={step.id === activeStep}
                  onSelect={setActiveStep}
                />
              ))}
            </div>
          </div>

          <ProductPreview step={active} />
        </div>
      </div>
    </section>
  );
}
