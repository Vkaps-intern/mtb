import { compare, hash } from 'bcryptjs'
import { prisma } from './prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_this'

export async function signUp({
  email,
  password,
  fullName,
}: {
  email: string
  password: string
  fullName: string
}) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    })

    // Create JWT token
    const token = createToken(user.id)

    return { user, token }
  } catch (error) {
    throw error
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Verify password
    const isValid = await compare(password, user.password!)

    if (!isValid) {
      throw new Error('Invalid password')
    }

    // Create JWT token
    const token = createToken(user.id)

    return { user, token }
  } catch (error) {
    throw error
  }
}

export function createToken(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
  
  // Move cookie operations to API routes instead
  return token
}

export async function verifyAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export async function signOut() {
  // Move cookie operations to API routes instead
  throw new Error('Move this function to API route')
} 