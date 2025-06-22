import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  let email: string
  let password: string
  let isResend = false

  // Check if it's a JSON request (for resend) or form data (for signup)
  const contentType = request.headers.get('content-type')
  
  if (contentType?.includes('application/json')) {
    const body = await request.json()
    email = body.email
    password = body.password
    isResend = body.resend || false
  } else {
    const formData = await request.formData()
    email = formData.get('email') as string
    password = formData.get('password') as string
  }

  const origin = request.headers.get('origin') || ''
  console.log('Signup/resend attempt:', { email, isResend })

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()

  if (isResend) {
    // Handle resending confirmation email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log('Supabase resend error:', error)
      return NextResponse.json({ success: false, message: error.message || 'Could not resend confirmation email' }, { status: 400 })
    }

    console.log('Resend success:', { email })
    return NextResponse.json({ success: true, message: 'Confirmation email sent! Please check your inbox.' })
  }

  // Handle new signup
  if (!password) {
    return NextResponse.json({ success: false, message: 'Password is required.' }, { status: 400 })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.log('Supabase signup error:', error)
    return NextResponse.json({ success: false, message: error.message || 'Could not register user' }, { status: 400 })
  }

  // Insert user into users table
  const user = data.user
  if (user) {
    const { error: dbError } = await supabase.from('users').insert([
      { id: user.id, email: user.email }
    ])
    if (dbError) {
      console.log('Database user insert error:', dbError)
      return NextResponse.json({ success: false, message: dbError.message || 'Could not save user to database' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ success: false, message: 'User not found after signup.' }, { status: 500 })
  }

  // If email confirmation is required, inform the user
  console.log('Signup success:', { email })
  return NextResponse.json({ success: true, message: 'Signup successful! Please check your email to confirm your account.' })
} 