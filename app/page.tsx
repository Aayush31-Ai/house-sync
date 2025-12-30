import React from 'react';
import { ArrowRight, Home, Menu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-700 font-sans">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">HouseSync</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <Link href="#" className="hover:text-indigo-600 transition">How it works</Link>
              <Link href="#" className="hover:text-indigo-600 transition">Features</Link>
              <Link href="/login" className="text-gray-900 hover:text-indigo-600">Log in</Link>
              <Link 
                href="/create-house" 
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Content (Text) */}
            <div className="lg:col-span-6 text-center lg:text-left relative z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                v1.0 is Live
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6">
                Shared expenses. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                  Zero confusion.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Track hostel, flat, or family <i>hisaab</i> — together. We handle the math, the reminders, and the awkward "who owes whom" talks.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/create-house" 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                >
                  Start a House
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/demo" 
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  View Demo
                </Link>
              </div>

              {/* Social Proof / Trust */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {/* Placeholder Avatars - Replace src with your ImageKit URLs */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                       {/* <Image 
                         src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                         alt="User" 
                         fill
                         className="object-cover"
                       /> */}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-600">
                    +2k
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Trusted by housemates</p>
                  <div className="flex text-yellow-400 text-xs">★★★★★</div>
                </div>
              </div>
            </div>

            {/* Right Content (Illustration/Image) */}
            <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
              {/* Decorative Blobs */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-70 mix-blend-multiply animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-70 mix-blend-multiply animate-blob animation-delay-2000"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl bg-white/40 backdrop-blur-sm border border-white/50 p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 relative">
                   {/* Yahan wo image lagana jo tune reference me di thi */}
                   <Image 
                     src="/hero-illustration.png" // Replace with your image path
                     alt="Friends high fiving"
                     fill
                     className="object-cover"
                   />
                </div>
                
                {/* Floating Card UI Element - Adds depth */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                   <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500">Last Expense</p>
                      <p className="text-sm font-bold text-gray-900">Grocery Run settled</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

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