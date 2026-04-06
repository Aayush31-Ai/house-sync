"use client";

import React from "react";
import { motion } from "framer-motion";
import { LifeBuoy, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const spring = {
  type: "spring" as const,
  stiffness: 210,
  damping: 24,
  mass: 0.9,
};

const faqs = [
  {
    question: "Is Evenly free to use?",
    answer:
      "Yes. Evenly is free to get started. You can create a house, add expenses, and track balances without any upfront cost.",
  },
  {
    question: "Do all roommates need their own account?",
    answer:
      "Yes. Each roommate should join with their own account so the shared ledger, balances, and payment history stay accurate for everyone.",
  },
  {
    question: "Can I use Evenly without making payments inside the app?",
    answer:
      "Absolutely. Evenly helps you track, split, and settle expenses clearly. Actual money transfer can still happen through UPI, bank transfer, or however your house already pays.",
  },
  {
    question: "How are expenses split?",
    answer:
      "Expenses can be split equally, by custom amounts, or by percentage. Evenly handles the calculations so every roommate sees the same breakdown instantly.",
  },
  {
    question: "Is my house data safe?",
    answer:
      "Yes. Your data is stored securely and shared only with the people inside your house setup. The product is built around privacy and clarity, not public visibility.",
  },
];

const quickTrust = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    description: "Only your house members see shared expense data.",
  },
  {
    icon: LockKeyhole,
    title: "Clear permissions",
    description: "Every roommate has their own account and activity trail.",
  },
  {
    icon: LifeBuoy,
    title: "Low learning curve",
    description: "The product is designed to feel obvious on first use.",
  },
];

export default function Faq() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_36%),linear-gradient(180deg,#eef2ff_0%,#f8fafc_44%,#ffffff_100%)] py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
              FAQ
            </div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Answers that remove hesitation before you join the house.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              The biggest blockers for an expense-sharing app are trust, setup friction, and whether
              everyone will actually use it. These are the questions people ask right before they switch.
            </p>

            <div className="mt-8 grid gap-4">
              {quickTrust.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    layout
                    transition={spring}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            layout
            transition={spring}
            className="rounded-[32px] border border-white/70 bg-white/82 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map(({ question, answer }, index) => (
                <motion.div
                  key={question}
                  layout
                  transition={spring}
                  whileHover={{ y: -3 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.96))] px-2 shadow-sm"
                  >
                    <AccordionTrigger className="px-4 py-5 text-left text-base font-semibold text-slate-900 hover:no-underline sm:px-5 sm:text-lg">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5 pt-0 text-sm leading-7 text-slate-600 sm:px-5 sm:text-base">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
