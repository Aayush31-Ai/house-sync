import React from 'react'

const Testimonal = () => {
    const data = [
        {
            name: "Satyam Gupta",
            about: "Student, Shared Apartment",
            description: "No more passive-aggressive notes on the fridge. HouseSync made splitting groceries super easy.",
            initials: "SG"
        },
        {
            name: "Priyanshu Pal",
            about: "Hostel Resident",
            description: "Finally, I don't have to keep track of every coffee I bought for my roommates. It just works. Thank you HouseSync!",
            initials: "PP"
        },
        {
            name: "Yogendra Singh",
            about: "Young Professional",
            description: "The transparency is key. Everyone knows exactly where we stand, and it stopped all the arguments.",
            initials: "YS"
        }
    ]

    const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400']

    return (
        <div className='bg-bg-secondary py-16 md:py-24 px-4 sm:px-6'>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                .testimonial-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .testimonial-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
            `}</style>

            <div className='max-w-6xl mx-auto'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-center text-text-primary mb-3 animate-fadeInUp'>
                    What Our Users Say
                </h1>
                <p className='text-center text-text-secondary text-sm sm:text-base mb-12 lg:mb-16 animate-fadeInUp' style={{ animationDelay: '100ms' }}>
                    Join thousands of households simplifying their finances
                </p>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {data.map((user, index) => (
                        <div
                            className='bg-[#eeedeea3] rounded-xl p-6 sm:p-8 testimonial-card animate-fadeInUp'
                            key={index}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Avatar & Name Section */}
                            <div className='flex items-center gap-4 mb-2'>
                                <div className={`${colors[index]} w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-base sm:text-lg`}>
                                    {user.initials}
                                </div>
                                <div className='min-w-0 flex-1'>
                                    <h3 className='text-text-primary font-semibold text-base sm:text-lg leading-tight'>
                                        {user.name}
                                    </h3>
                                    <p className='text-text-secondary text-xs sm:text-sm mt-0.5'>
                                        {user.about}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className='text-text-secondary text-sm sm:text-base italic leading-relaxed text-justify'>
                                "{user.description}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonal
     