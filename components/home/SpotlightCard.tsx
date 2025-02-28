'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import avtarImg from '@/public/avtar.png'

export default function SpotlightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0B1C] rounded-[32px] md:px-8 px-4 text-white relative overflow-hidden h-full"
    >
      <div className="">
        <h2 className="text-[32px] font-bold leading-tight my-8">
          Spotlight of
          <br />
          the Day.
        </h2>
        
        <p className="text-[#B4B4B4] text-[16px] mb-6">
          Meet the inspiring solopreneur leading the way today.
        </p>

        <div className="flex items-center space-x-5 mb-6">
          <div className="relative w-[80px] h-[80px]">
            <Image
              src={avtarImg}
              alt="Profile"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-[24px] font-bold">Arlene M</h3>
            <p className="text-[#B4B4B4] text-[16px]">Marketing Coordinator</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6  md:mt-[160px]">
          <p className="text-[#636363] text-[16px] leading-relaxed mb-6">
            This creates a sense of recognition and highlights the individual in focus, while maintaining the overall theme of growth and inspiration. Let&apos;s know if you&apos;d like any changes!
          </p>

          <button 
            className="w-full bg-[#1E2875] text-white py-3 rounded-lg font-medium hover:bg-[#1E2875]/90 transition-colors"
          >
            Let&apos;s Connect
          </button>
        </div>

        {/* <p className="text-gray-600 mb-4">
          Here&apos;s what others are saying...
        </p>
        <p className="italic">
          &quot;I couldn&apos;t be happier with my experience...&quot;
        </p> */}
      </div>
    </motion.div>
  )
} 