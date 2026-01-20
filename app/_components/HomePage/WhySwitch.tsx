import { Check, X } from 'lucide-react';
import React from 'react'

const WhySwitch = () => {
    const oldWayPoints = [
        "Who Paid Last time ? No one remembers.",
        "Money conversations are awkward.",
        "Tracking expenses is time-consuming.",
    ];

    const newWayPoints =[
        "Smart ,automated expeneses spiltting.",
        "One share Source of truth for all expenses.",
        "Transparent and fair settlements.",
    ]
    const cardBase = 'rounded-2xl p-6 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg';
  return (
    <div className='bg-bg-secondary page-mobile-padding'>
        <div className='mx-auto flex max-w-5xl flex-col gap-2 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-wrap mb-5 items-center justify-center gap-3'>
                <h1 className='text-3xl  md:text-4xl font-semibold md:font-bold text-gray-800'>Why Switch ?</h1>
               
            </div>
            <div className='grid gap-6 sm:gap-8 md:gap-10 lg:gap-14 md:grid-cols-2'>
            <div className={`${cardBase} bg-[#f5f5f5c2]`}>
                <h2 className='font-bold text-gray-500 text-md mb-3'>THE OLD WAY</h2>
                <ul>
                    {oldWayPoints.map((point,index)=>(
                        <li key={index} className='flex text-gray-700 text-base sm:text-lg items-center gap-3 my-3 transition duration-150 hover:translate-x-1'>
                            <span className='inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-red-200 leading-none'><X className='text-red-500' size={14} /></span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${cardBase} border-2 border-[#1313ec61] hover:shadow-[#0000ee1c]`}>
                <h2 className='font-bold text-[#1313ecb0] text-md mb-3'>THE HOUSESYNC WAY</h2>
                <ul>
                    {newWayPoints.map((point,index)=>(
                        <li key={index} className='flex text-gray-700 text-base sm:text-lg items-center gap-3 my-3 transition duration-150 hover:translate-x-1'>
                            <span className='inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1313ec29] leading-none'><Check className='text-[#1313ecb0]' size={14} /></span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    </div>
  )
}

export default WhySwitch