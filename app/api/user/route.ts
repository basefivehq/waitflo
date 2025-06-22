import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createSupabaseServerClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.json({ 
      authenticated: false, 
      message: 'User not authenticated' 
    }, { status: 401 })
  }
  
  return NextResponse.json({ 
    authenticated: true, 
    user: {
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at
    }
  })
} 