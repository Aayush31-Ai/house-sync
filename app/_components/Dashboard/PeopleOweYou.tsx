"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const owedItems = [
  { id: 1, name: "Samarth Jain", amount: 4200,  },
  { id: 2, name: "Preeti Varma", amount: 8500,  }
];

export default function PeopleOweYou() {
  return (
    <div className="w-full flex-col flex gap-4 mt-6 md:mt-2">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold">People Who Owe You</h2>
        <button className="text-dash-primary text-sm font-semibold hover:text-dash-primary-hover">View All</button>
      </div>

      <div className="flex overflow-x-auto md:overflow-y-auto md:max-h-[700px] md:grid md:grid-cols-2 gap-4 pb-4 snap-x snap-mandatory scrollbar-green md:pr-1">
        {owedItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-shrink-0 w-[85vw] md:w-auto bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow snap-center flex flex-col relative group"
          >
            {/* Top Row: Avatar & Status Tag */}
            <div className="flex w-full justify-between items-start mb-6">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-white shadow-sm overflow-hidden shrink-0">
                  <img 
                    src={`/assets/avatars/avatar-${item.id}.jpg`} 
                    alt={item.name} 
                    className="object-cover w-full h-full" 
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&background=random` }} 
                  />      
                </div>
              </div>
              <div className="mt-1">
                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Owed
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="w-full flex md:flex-row flex-col justify-between items-center md:items-end gap-2 mb-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>       
                <p className="text-[13px] text-gray-400 mt-0.5">Pending Payment</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold text-green-600">₹{item.amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-green-50 hover:bg-green-600 text-green-700 hover:text-white border border-transparent font-semibold py-3 rounded-full transition-all duration-200 mt-auto text-sm">
              Remind
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
