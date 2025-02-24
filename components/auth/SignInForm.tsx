'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signInSchema } from '@/lib/validators'
import { useAuth } from '@/contexts/AuthContext'

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      await signIn(data.email, data.password)
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.error || 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    // try {
    //   await signInWithGoogle()
    // } catch (error: any) {
    //   setError('Error signing in with Google')
    // }
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
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
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
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>
    </form>
  )
} 