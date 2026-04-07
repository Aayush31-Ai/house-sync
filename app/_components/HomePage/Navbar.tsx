"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/72 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_16px_48px_-28px_rgba(15,23,42,0.28)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center rounded-full px-2 py-2 transition-transform duration-300"
        >
          <div className="relative flex h-25 w-25  items-center justify-center overflow-hidden">
            <Image
              src="/assets/landing-page/logo1.png"
              alt="Evenly logo"
              width={75}
              height={75}
              className="h-25 w-25 object-contain"
              priority
            />
          </div>
        </Link>

        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <Link
            href="/create-house"
            className="group inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-[linear-gradient(135deg,#4f46e5,#4338ca)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(79,70,229,0.95)] transition-shadow duration-300 hover:shadow-[0_22px_38px_-18px_rgba(79,70,229,0.9)]"
          >
            <span>Get Started</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar
