import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [stats, buddies, transactions] = await Promise.all([
      supabase.from('stats').select('*').single(),
      supabase.from('buddies').select('*').limit(3),
      supabase.from('transactions').select('*').limit(4).order('date', { ascending: false }),
    ])

    return NextResponse.json({
      stats: stats.data,
      buddies: buddies.data,
      transactions: transactions.data,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
} 