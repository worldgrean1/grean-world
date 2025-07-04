"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap, Leaf, Sun, Battery } from "lucide-react"
import { GreanButton } from "@/components/ui/grean-button"
import { GreanCard } from "@/components/ui/grean-card"

export default function GreenPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <GreanButton variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </GreanButton>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3DD56D] rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GREAN WORLD</h1>
              <p className="text-sm text-green-200">Energy Technology</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-[#3DD56D]">GREEN</span> ENERGY
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Welcome to the future of sustainable energy solutions. Experience intelligent power management with GREAN
            WORLD.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GreanCard gradient className="h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#3DD56D] rounded-lg flex items-center justify-center">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Solar Power</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Harness the power of the sun with our advanced photovoltaic systems designed for maximum efficiency and
                reliability.
              </p>
            </GreanCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GreanCard gradient className="h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2bb757] rounded-lg flex items-center justify-center">
                  <Battery className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Energy Storage</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Store excess energy with our intelligent battery systems that ensure power availability when you need it
                most.
              </p>
            </GreanCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GreanCard gradient className="h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#23a455] rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sustainability</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduce your carbon footprint with our eco-friendly energy solutions that contribute to a cleaner,
                greener future.
              </p>
            </GreanCard>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <GreanCard gradient className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Go Green?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Contact us today to learn more about our sustainable energy solutions and how we can help you transition
              to clean energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GreanButton size="lg">Get Started</GreanButton>
              <GreanButton variant="outline" size="lg">
                Learn More
              </GreanButton>
            </div>
          </GreanCard>
        </motion.div>
      </main>
    </div>
  )
}
