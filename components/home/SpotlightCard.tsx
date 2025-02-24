'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function SpotlightCard() {
  return (
    <motion.div 
      className="bg-navy-900 text-white rounded-3xl p-8 max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4">Spotlight of the Day.</h2>
      <p className="text-gray-300 mb-6">
        Meet the inspiring solopreneur leading the way today.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/images/avatar.png"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">Arlene M</h3>
          <p className="text-gray-300">Marketing Coordinator</p>
        </div>
      </div>

      <p className="text-gray-300 mb-6">
        This creates a sense of recognition and highlights the individual in focus, while
        maintaining the overall theme of growth and inspiration.
      </p>

      <button className="bg-white text-navy-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
        Let's Connect
      </button>
    </motion.div>
  )
} 