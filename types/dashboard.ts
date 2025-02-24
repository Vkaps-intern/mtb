export interface User {
  id: string
  name: string
  email: string
  avatar: string
  jpBalance: number
}

export interface Transaction {
  id: number
  title: string
  date: string
  amount: number
  type: 'credit' | 'debit'
}

export interface Buddy {
  id: string
  name: string
  status: 'Full Access' | 'Limited Access'
  avatar: string
}

export interface ProgressStep {
  id: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
} 