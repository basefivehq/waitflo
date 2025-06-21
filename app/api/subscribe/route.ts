import { createSupabaseClient } from '@/lib/supabase/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, pageId, pageSlug } = await request.json()

    if (!email || !pageId) {
      return NextResponse.json(
        { error: 'Email and page ID are required' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseClient(true)

    // Check if the page exists and is published
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('id, title')
      .eq('id', pageId)
      .eq('published', true)
      .single()

    if (pageError || !page) {
      return NextResponse.json(
        { error: 'Page not found or not published' },
        { status: 404 }
      )
    }

    // Check if email already exists for this page
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('email', email)
      .eq('page_id', pageId)
      .single()

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Email already subscribed to this waitlist' },
        { status: 409 }
      )
    }

    // Insert the subscription
    const { data: subscription, error: insertError } = await supabase
      .from('subscriptions')
      .insert({
        email,
        page_id: pageId,
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Subscription insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to waitlist',
      subscription
    })

  } catch (error) {
    console.error('Subscribe API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 