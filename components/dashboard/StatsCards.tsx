'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { title: 'Total JP Earned', amount: 1000 },
  { title: 'Total Spend JP', amount: 750 },
  { title: 'JP Balance', amount: 250 },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl ${
            index === 0 ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/images/coin.svg"
              alt="JP"
              width={40}
              height={40}
              className={index === 0 ? 'text-white' : ''}
            />
            <div>
              <p className={`text-2xl font-bold ${
                index === 0 ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.amount}
              </p>
              <p className={
                index === 0 ? 'text-white/80' : 'text-gray-500'
              }>
                {stat.title}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 