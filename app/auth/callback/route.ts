import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.log('Auth callback error:', error)
      // Redirect to login with error
      return NextResponse.redirect(`${requestUrl.origin}/login?error=confirmation_failed`)
    }
  }

  // Redirect to dashboard after successful confirmation
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
} 