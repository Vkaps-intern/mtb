'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const buddies = [
  { name: 'Jaquiline', status: 'Full Access', avatar: '/images/avatar-1.png' },
  { name: 'Sennorita', status: 'Limited Access', avatar: '/images/avatar-2.png' },
  { name: 'Firoz', status: 'Full Access', avatar: '/images/avatar-3.png' },
]

export default function BuddiesList() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Buddies</h2>
        <button className="text-blue-500 text-sm hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {buddies.map((buddy, index) => (
          <motion.div
            key={buddy.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Image
                src={buddy.avatar}
                alt={buddy.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{buddy.name}</p>
                <p className="text-sm text-gray-500">{buddy.status}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
        Add Member
      </button>
    </div>
  )
} 