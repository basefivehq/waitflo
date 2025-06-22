import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createSupabaseServerClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ success: false, message: 'Could not authenticate user' }, { status: 401 })
  }

  // Set cookies for authentication (if needed)
  // Supabase client should handle this, but you may need to forward cookies

  return NextResponse.json({ success: true })
} 