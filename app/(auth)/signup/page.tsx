'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUpPage() {
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

            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600 mb-8">
              Join our community of solopreneurs
            </p>

            <SignUpForm />

            <p className="text-center mt-8">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
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
              Welcome to MyThriveBuddy
            </h2>
            <p className="text-lg opacity-90">
              Connect, grow, and thrive with like-minded solopreneurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 