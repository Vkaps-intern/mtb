'use client'

import { BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Anything Here..."
              className="w-80 px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
              <Image
                src="/images/coin.svg"
                alt="JP"
                width={20}
                height={20}
              />
              <span className="font-semibold">JP 250</span>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <BellIcon className="w-6 h-6 text-gray-600" />
            </button>
            
            <Image
              src="/images/avatar.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  )
} 