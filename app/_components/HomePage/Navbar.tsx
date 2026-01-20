import { House } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
         <nav className="fixed top-0 w-full z-50 shadow-md bg-white/60 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <House className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900 tracking-tight">HouseSync</span>
                    </div>
        
                    <div className="flex  md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                      <Link 
                        href="/create-house" 
                        className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                      >
                        Get Started
                      </Link>
                    </div>
        
                    {/* Mobile Menu Icon */}
                  
                  </div>
                </div>
              </nav>
        
    </div>
  )
}

export default Navbar