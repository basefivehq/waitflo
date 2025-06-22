import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Show the real error to the user
    console.log('Supabase login error:', error)
    return NextResponse.json({ success: false, message: error.message || 'Could not authenticate user' }, { status: 401 })
  }

  // If login is successful, user is authenticated and session is set via cookies
  // You can redirect on the frontend or just return success
  return NextResponse.json({ success: true, message: 'Login successful! Redirecting to dashboard...' })
} 