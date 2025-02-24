'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <header className="bg-white/80 backdrop-blur-md fixed w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="MyThriveBuddy Logo"
            width={40}
            height={40}
          />
          <span className="ml-2 text-xl font-bold">MyThriveBuddy</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/blog" className="hover:text-secondary">Blog</Link>
          <Link href="/contact" className="hover:text-secondary">Contact Us</Link>
          {!isAuthenticated ? (
            <>
              <Link 
                href="/signup"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Sign Up
              </Link>
              <Link 
                href="/signin"
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="hover:text-secondary">Dashboard</Link>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          {/* Hamburger icon */}
          <div className="w-6 h-6 flex flex-col justify-around">
            <span className="w-full h-0.5 bg-gray-800"></span>
            <span className="w-full h-0.5 bg-gray-800"></span>
            <span className="w-full h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-4 py-2 bg-white">
            <Link href="/blog" className="block py-2">Blog</Link>
            <Link href="/contact" className="block py-2">Contact Us</Link>
            {!isAuthenticated ? (
              <>
                <Link href="/signup" className="block py-2">Sign Up</Link>
                <Link href="/signin" className="block py-2">Sign In</Link>
              </>
            ) : (
              <Link href="/dashboard" className="block py-2">Dashboard</Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
} 