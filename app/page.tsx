'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/home/Hero'
import ProfessionCards from '@/components/home/ProfessionCards'
import SpotlightCard from '@/components/home/SpotlightCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-200 to-pink-400">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <ProfessionCards />
          <SpotlightCard />
        </motion.div>
      </div>
    </main>
  )
}
