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
  const { error } = await supabase.auth.signUp({
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

  console.log('Signup success:', { email })
  return NextResponse.json({ success: true })
} 