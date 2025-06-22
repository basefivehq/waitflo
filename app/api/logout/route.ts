import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.log('Logout error:', error)
    return NextResponse.json({ success: false, message: 'Logout failed' }, { status: 500 })
  }
  
  return NextResponse.json({ success: true, message: 'Logged out successfully' })
} 