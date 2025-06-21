import { createSupabaseClient } from '@/lib/supabase/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, pageId, answers, questions } = await request.json()

    if (!email || !pageId || !answers) {
      return NextResponse.json(
        { error: 'Email, page ID, and answers are required' },
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

    // Store onboarding responses
    const { data: onboardingResponse, error: insertError } = await supabase
      .from('onboarding_responses')
      .insert({
        email,
        page_id: pageId,
        answers: answers,
        questions: questions,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Onboarding response insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save onboarding responses' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding responses saved successfully',
      response: onboardingResponse
    })

  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 