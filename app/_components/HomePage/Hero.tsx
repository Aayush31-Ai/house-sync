import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div>
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
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6"> <span className="whitespace-nowrap">Flawless accounting.</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                          Frictionless living.
                        </span>
                      </h1>
        
                      {/* Description */}
                      <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    The only expense manager designed to keep roommate relationships debt-free. Sync bills, automate splits, and reclaim your peace of mind.
                      </p>
        
                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link 
                          href="/create-house" 
                          className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                          // className='button'
                        >
                          Start a House
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
        
                      {/* Social Proof / Trust */}
                    
                    </div>
        
                    {/* Right Content (Illustration/Image) */}
                    <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
                      {/* Decorative Blobs */}
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-125 h-125 bg-indigo-50 rounded-full blur-3xl opacity-70 mix-blend-multiply animate-blob"></div>
                      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-100 h-100 bg-violet-50 rounded-full blur-3xl opacity-70 mix-blend-multiply animate-blob animation-delay-2000"></div>
                      
                      {/* Main Image Container */}
                      <div className="relative rounded-3xl bg-white/40 backdrop-blur-sm border border-white/50 p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                        <div className="rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 relative">
                           {/* Yahan wo image lagana jo tune reference me di thi */}
                           <Image 
                             src="/assets/test1.jpg"
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
        
                  <div className="md:mt-0 lg:mt-0 mt-14 flex flex-col sm:flex-row items-center justify-center lg:justify-start md:gap-4">
                    <div className="flex -space-x-3">
                      {/* Placeholder Avatars - Replace src with your ImageKit URLs */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                          <Image 
                            src={`/assets/pfp${i}.jpg`} 
                            alt="Users" 
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 ml-1 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
                        +2k
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                      <div className="flex text-yellow-400 items-center justify-center sm:justify-start text-base sm:text-lg mb-0.5">★★★★★</div>
                      <p className="font-semibold text-gray-900">Trusted by housemates</p>
                      <p className='text-text-secondary'> Used by early Users across Shared Homes.</p>
                    </div>
                  </div>
                </div>
              </main>
        
    </div>
  )
}

export default Hero