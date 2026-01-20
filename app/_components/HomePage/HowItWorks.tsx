import { Handshake, HouseWifi, ReceiptText } from "lucide-react"

type StepsData = {
  title: string
  description: string
  icon: React.ReactNode
}[]

const HowItWorks = () => {
  const stepsData: StepsData = [
    {
      title: "Create a House",
      description: "Invite your roommates and set up your shared digital space instantly.",
      icon: <HouseWifi className="text-blue-700" />,
    },
    {
      title: "Add Expenses",
      description: "Log bills, groceries, and takeout as they happen. We do the math for you.",
      icon: <ReceiptText className="text-blue-700" />,
    },
    {
      title: "Settle Up",
      description: "Clear dues instantly with smart calculations that minimize transactions.",
      icon: <Handshake className="text-blue-700" />,
    },
  ]

  const card =
    "group bg-white/70 backdrop-blur-sm p-5 sm:p-6 lg:p-7 rounded-xl border border-blue-50 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"

  return (
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-8 lg:px-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">How it Works</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps for financial peace.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
          {stepsData.map((step, index) => (
            <div key={index} className={card}>
              <div className="flex items-start gap-4">
                <span className="inline-flex size-12 sm:size-14 lg:size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 shadow-sm group-hover:scale-105 transition">
                  {step.icon}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks