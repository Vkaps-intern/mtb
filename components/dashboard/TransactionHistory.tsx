'use client'

import { motion } from 'framer-motion'

const transactions = [
  {
    id: 1,
    title: 'Spend on Spotlight..',
    date: 'February 1, 2025',
    amount: 750,
  },
  {
    id: 2,
    title: 'Spend on Spotlight..',
    date: 'February 1, 2025',
    amount: 750,
  },
  {
    id: 3,
    title: 'Spend on Spotlight..',
    date: 'February 1, 2025',
    amount: 750,
  },
  {
    id: 4,
    title: 'Spend on Spotlight..',
    date: 'February 1, 2025',
    amount: 750,
  },
]

export default function TransactionHistory() {
  return (
    <div className="bg-white rounded-xl p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">History</h2>
        <button className="text-blue-500 text-sm hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{transaction.title}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-medium">
                {transaction.amount} JP
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 