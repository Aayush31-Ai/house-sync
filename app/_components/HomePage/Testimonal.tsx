"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  accent: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Working professional, Bengaluru flatshare",
    quote: "No more awkward money talks. Evenly keeps sab clear without anyone becoming the finance person of the house.",
    avatar: "/assets/profile-picture/pfp1.jpg",
    accent: "from-indigo-500 to-cyan-500",
  },
  {
    name: "Riya Sharma",
    role: "Student, Delhi shared apartment",
    quote: "Bhai ab kaun kitna deta hai, sab clear hai. Groceries aur rent dono manage karna way easier ho gaya.",
    avatar: "/assets/profile-picture/pfp2.jpg",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    name: "Kunal Verma",
    role: "Hostel resident, Pune",
    quote: "Earlier we kept checking old chats to settle up. Now the app just shows the truth instantly.",
    avatar: "/assets/profile-picture/pfp3.jpg",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "Sneha Nair",
    role: "Roommate in a 3BHK, Hyderabad",
    quote: "Roommates ke saath life 10x easier ho gayi. The balances feel trustworthy, and that changes everything.",
    avatar: "/assets/profile-picture/pfp2.jpg",
    accent: "from-amber-500 to-orange-500",
  },
  {
    name: "Rahul Yadav",
    role: "Early-career team flat, Gurgaon",
    quote: "The best part is peace. No one has to remind anyone because Evenly already explains who owes what.",
    avatar: "/assets/profile-picture/pfp1.jpg",
    accent: "from-sky-500 to-indigo-500",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.9,
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function relativePosition(index: number, activeIndex: number, length: number) {
  const direct = index - activeIndex;
  const wrappedPositive = direct + length;
  const wrappedNegative = direct - length;
  return [direct, wrappedPositive, wrappedNegative].reduce((closest, current) =>
    Math.abs(current) < Math.abs(closest) ? current : closest
  );
}

function TestimonialCard({
  item,
  relative,
  onSelect,
}: {
  item: Testimonial;
  relative: number;
  onSelect: () => void;
}) {
  const isCenter = relative === 0;
  const isSide = Math.abs(relative) === 1;

  const desktopMotion =
    relative <= -2
      ? { x: "-82%", scale: 0.84, rotate: -7, filter: "blur(4px)" }
      : relative === -1
        ? { x: "-52%", scale: 0.92, rotate: -4, filter: "blur(1.8px)" }
        : relative === 0
          ? { x: "0%", scale: 1, rotate: 0, filter: "blur(0px)" }
          : relative === 1
            ? { x: "52%", scale: 0.92, rotate: 4, filter: "blur(1.8px)" }
            : { x: "82%", scale: 0.84, rotate: 7, filter: "blur(4px)" };

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      animate={desktopMotion}
      transition={spring}
      whileHover={{ y: -8, scale: isCenter ? 1.02 : 0.96 }}
      className={`absolute left-1/2 top-0 h-full w-[72vw] max-w-[390px] -translate-x-1/2 overflow-hidden rounded-[32px] border text-left backdrop-blur-xl ${
        isCenter
          ? "z-30 border-white/80 bg-white/92 shadow-[0_28px_80px_rgba(79,70,229,0.18)]"
          : isSide
            ? "z-20 border-white/70 bg-white/78 shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
            : "z-10 border-white/60 bg-white/62 shadow-[0_12px_34px_rgba(15,23,42,0.07)]"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.accent}`} />

      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative size-14 overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
              <Image
                src={item.avatar}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm leading-5 text-slate-500">{item.role}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-2.5 text-slate-400">
            <Quote className="size-4" />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={`${item.name}-${index}`} className="size-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-base leading-8 text-slate-700">"{item.quote}"</p>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ type: "tween", duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
        >
          Verified roommate story
        </motion.div>
      </div>
    </motion.button>
  );
}

function MobileTestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      className="min-w-[84%] snap-center overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${item.accent}`} />
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-2xl">
              <Image src={item.avatar} alt={item.name} fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm leading-5 text-slate-500">{item.role}</p>
            </div>
          </div>
          <Quote className="size-4 text-slate-400" />
        </div>
        <div className="mb-4 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={`${item.name}-mobile-${index}`} className="size-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm leading-7 text-slate-700">"{item.quote}"</p>
      </div>
    </motion.article>
  );
}

export default function Testimonal() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, testimonials.length));
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.10),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef2ff_52%,#f8fafc_100%)] py-14 sm:py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 shadow-sm backdrop-blur-xl">
            What Our Users Say
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Loved by roommates who value clarity and peace
          </p>
        </div>

        <div className="relative mt-12 hidden h-[380px] items-center justify-center lg:flex">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

          <div className="relative h-full w-full">
            {testimonials.map((item, index) => (
              <TestimonialCard
                key={item.name}
                item={item}
                relative={relativePosition(index, activeIndex, testimonials.length)}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {testimonials.map((item) => (
              <MobileTestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={`${item.name}-dot`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-8 bg-indigo-500" : "w-2.5 bg-slate-300"
              }`}
              aria-label={`Show testimonial from ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
