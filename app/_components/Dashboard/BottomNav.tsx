"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, User, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Activity", href: "/dashboard/activity", icon: Activity },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <>
      <div className="fixed bottom-24 right-4 z-50">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-indigo-600 rounded-full flex justify-center items-center text-white shadow-xl shadow-indigo-600/30 active:bg-indigo-700 transition-colors"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      <nav className="bg-white border-t border-gray-100 flex justify-between px-8 py-3 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.02)] safe-p-bottom">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex flex-col items-center justify-center p-2 relative"
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  className={isActive ? "text-indigo-600 mb-1" : "text-gray-400 mb-1"} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-active"
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "text-indigo-600" : "text-gray-400"}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
