import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await verifyAuth()
    // Remove sensitive data before sending
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
} 