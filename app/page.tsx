import React from "react";
import {
  ArrowRight,
  Home,
  Menu,
  CheckCircle2,
  ShieldCheck,
  Zap,
  House,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HowItWorks from "./_components/HomePage/HowItWorks";
import WhySwitch from "./_components/HomePage/WhySwitch";
import ModernLiving from "./_components/HomePage/ModernLiving";
import Testimonal from "./_components/HomePage/Testimonal";
import Faq from "./_components/HomePage/Faq";
import Hero from "./_components/HomePage/Hero";
import Navbar from "./_components/HomePage/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-700 font-sans ">
      {/* --- Navbar --- */}
      <Navbar />
      {/* --- Hero Section --- */}

      <Hero />

      {/* How it Works Section */}

      <HowItWorks />

      {/* Why Switch */}
      <WhySwitch />

      {/* Modern Living */}
      <ModernLiving />

      {/* testimonals */}
      <Testimonal />

      {/* Faqs */}

      <Faq />
      {/* --- Features Strip (Bonus) --- */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:justify-around text-gray-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Instant Calculations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Monthly Reports</span>
          </div>
        </div>
      </section>
    </div>
  );
}
