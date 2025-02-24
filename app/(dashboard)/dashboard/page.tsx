'use client'

import { motion } from 'framer-motion'
import StatsCards from '@/components/dashboard/StatsCards'
import ProgressTracker from '@/components/dashboard/ProgressTracker'
import BuddiesList from '@/components/dashboard/BuddiesList'
import TransactionHistory from '@/components/dashboard/TransactionHistory'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <StatsCards />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Spotlight</h2>
          <ProgressTracker 
            steps={['Applied', 'In Review', 'Approved', 'Disapproved']}
            currentStep={1}
            descriptions={[
              "You've taken the first step!",
              'Under assessment stay tuned!',
              "You're in! Get ready to shine",
              'Try again with improvements!'
            ]}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Prosperity</h2>
          <ProgressTracker 
            steps={['Applied', 'In Review', 'Approved', 'Disapproved']}
            currentStep={1}
            descriptions={[
              "You've taken the first step!",
              'Under assessment stay tuned!',
              "You're in! Get ready to shine",
              'Try again with improvements!'
            ]}
          />
        </div>
      </div>

      <div className="col-span-3">
        <BuddiesList />
        <TransactionHistory />
      </div>
    </div>
  )
} 