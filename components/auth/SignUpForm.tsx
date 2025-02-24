'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { signUpSchema } from '@/lib/validators'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { signUp } = useAuth()
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const password = watch('password', '')

  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return (strength / 5) * 100
  }

  const passwordStrength = getPasswordStrength(password)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      await signUp(data.email, data.password, data.fullName)
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.error || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <input
          {...register('fullName')}
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullName.message as string}
          </p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {password && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Password strength: {passwordStrength >= 80 ? 'Strong' : passwordStrength >= 60 ? 'Medium' : 'Weak'}
            </p>
          </div>
        )}
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <div>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50"
      >
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        Sign up with Google
      </button>
    </form>
  )
} 