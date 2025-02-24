'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  { name: 'Home', icon: HomeIcon, href: '/dashboard' },
  { name: 'Insights', icon: ChartBarIcon, href: '/dashboard/insights' },
  { name: 'Recommends', icon: DocumentTextIcon, href: '/dashboard/recommends' },
  { name: 'Messages', icon: ChatBubbleLeftIcon, href: '/dashboard/messages', badge: 2 },
]

const settingsItems = [
  { name: 'Profile', icon: UserIcon, href: '/dashboard/profile' },
  { name: "FAQ's", icon: QuestionMarkCircleIcon, href: '/dashboard/faqs' },
  { name: 'Contact us', icon: PhoneIcon, href: '/dashboard/contact' },
  { name: 'Logout', icon: ArrowRightOnRectangleIcon, href: '/logout' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/images/avatar.png"
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">Hello 👋</h2>
            <p className="text-lg font-bold">Martin M</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Menu</h3>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Settings</h3>
            <nav className="space-y-2">
              {settingsItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 