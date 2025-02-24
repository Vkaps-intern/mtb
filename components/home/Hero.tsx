'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="text-center py-16">
      <motion.h1 
        className="text-5xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-primary">Solopreneurship</span>
        <br />
        <span className="text-secondary">Made Amazing</span>
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Join the world's only platform / ecosystem that aims to provide growth, joy, sense of belonging.
      </motion.p>
    </section>
  )
} 