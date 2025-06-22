import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const origin = request.headers.get('origin') || ''
  console.log('Signup attempt:', { email })

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()
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

  console.log('Signup success:', { email })
  return NextResponse.json({ success: true })
} 