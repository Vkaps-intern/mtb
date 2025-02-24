'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SignInForm from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="flex items-center mb-8">
              <Image
                src="/images/logo.svg"
                alt="MyThriveBuddy Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-bold">MyThriveBuddy</span>
            </Link>

            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-600 mb-8">
              Please enter your details to sign in
            </p>

            <SignInForm />

            <p className="text-center mt-8">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary to-secondary">
        <div className="h-full flex items-center justify-center p-16">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-6">
              Start your journey with MyThriveBuddy
            </h2>
            <p className="text-lg opacity-90">
              Join our community of solopreneurs and unlock your full potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 