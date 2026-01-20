import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const Faq = () => {
    const faqs = [
  {
    question: "Is HouseSync free to use?",
    answer:
      "Yes. HouseSync is free to get started. You can create a house, add expenses, and track balances without any cost.",

  },
  {
    question: "Do all roommates need to create an account?",
    answer:
      "Yes. Each roommate needs their own account so expenses and balances stay accurate and transparent for everyone.",

  },
  {
    question: "Can I use HouseSync without making payments?",
    answer:
      "Absolutely. HouseSync helps you track, split, and settle expenses. Actual payments can be done outside the app.",

  },
  {
    question: "How are expenses split?",
    answer:
      "Expenses can be split equally, by custom amounts, or by percentages. HouseSync automatically handles all calculations.",

  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Your data is securely stored and never shared. We follow a privacy-first approach.",

  }
];

  return (
    <div className='bg-bg-primary py-14 md:py-24 px-4 sm:px-6'>
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
        .faq-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: transparent;
          border-radius: 14px;
          margin-bottom: 12px;
          border: 2px solid rgba(19, 19, 236, 0.3);
        }
        .faq-item:hover {
          border-color: rgba(19, 19, 236, 0.6);
          transform: translateY(-2px);
          background-color: rgba(19, 19, 236, 0.08);
        }
        .faq-trigger {
          padding: 20px 24px;
        }
        @media (max-width: 640px) {
          .faq-trigger {
            padding: 16px 18px;
          }
        }
      `}</style>

      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12 md:mb-16'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 animate-fadeInUp'>
            Frequently Asked Questions
          </h1>
          <p className='text-text-secondary text-sm sm:text-base md:text-lg animate-fadeInUp' style={{ animationDelay: '100ms' }}>
            Everything you need to know about HouseSync
          </p>
        </div>

        <div className='animate-fadeInUp' style={{ animationDelay: '200ms' }}>
          <Accordion type="single" collapsible className='w-full space-y-0'>
            {faqs.map(({ question, answer }, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className='faq-item border-0'
              >
                <AccordionTrigger className='faq-trigger text-left hover:no-underline group'>
                  <span className='text-base sm:text-lg md:text-xl font-semibold text-text-primary group-hover:text-text-secondary transition-colors'>
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className='px-6 sm:px-8 pb-5 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed'>
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Faq