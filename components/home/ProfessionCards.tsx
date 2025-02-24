'use client'

import { motion } from 'framer-motion'

const professions = [
  'Trainer', 'Coach', 'Healer', 'Consultant',
  'Designer', 'Developer', 'Astrologer'
]

export default function ProfessionCards() {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {professions.map((profession, index) => (
        <motion.div
          key={profession}
          className="bg-white rounded-full px-6 py-2 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {profession}
        </motion.div>
      ))}
    </div>
  )
} 