import { NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user, token } = await signUp(body)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword, token })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error creating account' },
      { status: 400 }
    )
  }
} 