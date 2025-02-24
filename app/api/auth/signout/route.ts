import { NextResponse } from 'next/server'
import { signOut } from '@/lib/auth'

export async function POST() {
  try {
    await signOut()
    return NextResponse.json({ message: 'Signed out successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error signing out' },
      { status: 500 }
    )
  }
} 