"use client";

import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between py-6 px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-4">
        {/* Desktop Title */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                  <Image src={`/assets/avatars/avatar-${i}.png`} alt="trust" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium">Trusted by housemates</p>
          </div>
        </div>

        {/* Mobile Header profile area */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100 shadow-sm">
            <Image src="/assets/avatars/avatar-4.png" alt="Sarah" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Welcome back,</p>
            <h2 className="text-xl font-bold text-gray-900 leading-none">Sarah 👋</h2>
          </div>
        </div>
      </div>

      {/* Desktop Search & Bell */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="pl-11 pr-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200/80 focus:bg-white focus:ring-2 focus:ring-indigo-100 text-sm font-medium w-64 transition-all outline-none border border-transparent focus:border-indigo-100"
          />
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-gray-50" />
        </button>
      </div>

      {/* Mobile Bell */}
      <div className="block lg:hidden">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 active:bg-gray-100 transition-colors text-gray-700 relative shadow-sm">
          <Bell size={20} />
          <span className="absolute top-2 right-[6px] w-2 h-2 bg-indigo-600 rounded-full border border-gray-50" />
        </button>
      </div>
    </header>
  );
}
