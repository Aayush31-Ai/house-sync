import { ReactNode } from "react";
import Sidebar from "@/app/_components/Dashboard/Sidebar";
import BottomNav from "@/app/_components/Dashboard/BottomNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f5f6f8] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-100">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0 relative scroll-smooth">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
}
