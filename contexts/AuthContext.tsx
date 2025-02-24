'use client'

import { createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, logout } from '@/lib/store/authSlice'
import { RootState } from '@/lib/store/store'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  const signIn = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    dispatch(setCredentials(data))
    return data
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    dispatch(setCredentials(data))
    return data
  }

  const signOut = () => {
    dispatch(logout())
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 