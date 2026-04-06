"use client"

import { House } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
         <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/60 backdrop-blur-md shadow-md border-b border-gray-100' 
              : 'bg-transparent border-transparent'
          }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <House className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900 tracking-tight">Evenly</span>
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