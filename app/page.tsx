import React from "react";
import HowItWorks from "./_components/HomePage/HowItWorks";
import WhySwitch from "./_components/HomePage/WhySwitch";
import ModernLiving from "./_components/HomePage/ModernLiving";
import Testimonal from "./_components/HomePage/Testimonal";
import Faq from "./_components/HomePage/Faq";
import ClosingCta from "./_components/HomePage/ClosingCta";
import LandingFooter from "./_components/HomePage/LandingFooter";
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

      <ClosingCta />
      <LandingFooter />
    </div>
  );
}
