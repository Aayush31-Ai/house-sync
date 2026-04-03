"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Activity, Home, User, Settings, Plus } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Activity", href: "/dashboard/activity", icon: Activity },
  { name: "Houses", href: "/dashboard/houses", icon: Home },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAddExpenseActive = pathname === "/dashboard/add-expense";

  return (
    <aside className="h-full flex flex-col justify-between py-6 px-4">
      <div>
        <div className="flex items-center gap-3 px-4 mb-10">
           <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">
             {/* Replace with actual logo logic */}
             <Home size={18} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">HouseSync</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Expense Manager</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "text-[#eaff] bg-indigo-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-indigo-600 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex items-center gap-3 ${isActive ? 'text-white' : ''}`}>
                  <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                  <span className="font-medium text-sm">{link.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto px-2">
        <Link
          href="/dashboard/add-expense"
          className={`w-full rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-all font-medium shadow-md active:scale-[0.98] ${
            isAddExpenseActive
              ? "bg-indigo-700 text-white shadow-indigo-700/30"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
          }`}
        >
          <Plus size={18} />
          <span>Add Expense</span>
        </Link>
      </div>
    </aside>
  );
}
