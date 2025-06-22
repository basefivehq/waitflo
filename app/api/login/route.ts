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
  
  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('Supabase login error:', error)
    
    // Provide more specific error messages
    if (error.message.includes('Invalid login credentials')) {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 })
    }
    
    // Handle email confirmation errors
    if (error.message.includes('Email not confirmed') || error.message.includes('Email not verified')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please check your email and click the confirmation link before signing in.',
        needsConfirmation: true 
      }, { status: 401 })
    }
    
    return NextResponse.json({ success: false, message: error.message || 'Could not authenticate user' }, { status: 401 })
  }

  // If login is successful, user is authenticated and session is set via cookies
  return NextResponse.json({ success: true, message: 'Login successful! Redirecting to dashboard...' })
} 