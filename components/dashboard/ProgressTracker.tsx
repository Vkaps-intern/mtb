'use client'

import { motion } from 'framer-motion'

interface ProgressTrackerProps {
  steps: string[]
  currentStep: number
  descriptions: string[]
}

export default function ProgressTracker({
  steps,
  currentStep,
  descriptions
}: ProgressTrackerProps) {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="relative">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
              >
                {index <= currentStep ? '✓' : ''}
              </motion.div>
              <p className="mt-2 font-medium">{step}</p>
              <p className="text-sm text-gray-500">{descriptions[index]}</p>
            </div>
          ))}
        </div>
        
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>
    </div>
  )
} 