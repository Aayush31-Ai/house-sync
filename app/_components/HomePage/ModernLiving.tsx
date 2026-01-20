import { Bell, BellRing, Calculator, Wallet, WalletMinimal } from 'lucide-react';
import React from 'react'

const ModernLiving = () => {
    const features = [
  {
    icon: <Calculator size={32}   className='text-white fill-bg-tertiary' />,
    title: "Smart Expense Splits",
    description:
      "Split expenses fairly using equal, custom, or percentage-based splits. We handle the math."
  },
  {
    icon: <WalletMinimal size={32} className='text-white fill-bg-tertiary' /> ,
    title: "Live Balances",
    description:
      "See exactly who owes what in real time. Everything stays transparent."
  },
  {
    icon: <BellRing size={32} className='text-text-tertiary fill-bg-tertiary'/>,
    title: "Clear Settlements",
    description:
      "Know when expenses are fully settled and balances are cleared."
  }
];

  return (
    <div className='bg-bg-primary py-12 md:py-20'>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      <h1 className='text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-12 md:mb-16 animate-fadeInUp px-4'>
        Build for modern Living
      </h1>

      <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-18 px-4 max-w-6xl mx-auto'>
        {features.map((feature, index) => (
          <div 
            className='flex flex-col items-center gap-4 w-full sm:w-80 animate-fadeInUp' 
            key={index}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className='flex items-center justify-center bg-bg-secondary h-16 w-16 sm:h-18 sm:w-18 rounded-full shrink-0 transition-transform duration-300 hover:scale-110 animate-float' style={{ animationDelay: `${index * 200}ms` }}>
              {feature.icon}
            </div>
            <div className='text-text-primary font-semibold text-xl sm:text-2xl text-center'>
              {feature.title}
            </div>
            <div className='text-text-secondary text-base sm:text-lg text-center leading-relaxed'>
              {feature.description}
            </div>
          </div>
        ))}
      </div>
      <div>
              
      </div>
    </div>
  )
}

export default ModernLiving