import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/user/emails - Get user's email automation settings
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's email automation settings from pages config
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('id, title, config')
      .eq('user_id', user.id)

    if (pagesError) {
      console.error('Error fetching pages:', pagesError)
      return NextResponse.json({ error: 'Failed to fetch email settings' }, { status: 500 })
    }

    // Extract email settings from page configs
    const emailSettings = pages?.map(page => {
      const config = page.config || {}
      return {
        pageId: page.id,
        pageTitle: page.title,
        emailAutomation: config.emailAutomation || {
          welcomeEmail: {
            enabled: true,
            subject: "Welcome to our waitlist!",
            body: "Thanks for joining our waitlist. We'll keep you updated on our progress.",
            delay: 0
          },
          referralEmail: {
            enabled: true,
            subject: "You've unlocked a reward!",
            body: "Congratulations! You've referred someone and unlocked early access.",
            delay: 0
          },
          reminderEmail: {
            enabled: false,
            subject: "Don't forget about us!",
            body: "We're making great progress and wanted to share an update with you.",
            delay: 7
          },
          milestoneEmail: {
            enabled: true,
            subject: "Milestone reached!",
            body: "You've reached a referral milestone and earned special rewards.",
            delay: 0
          }
        }
      }
    }) || []

    return NextResponse.json({
      success: true,
      emailSettings
    })

  } catch (error) {
    console.error('User emails API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/user/emails - Update email automation settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, emailType, settings } = await request.json()

    if (!pageId || !emailType || !settings) {
      return NextResponse.json({ error: 'Page ID, email type, and settings are required' }, { status: 400 })
    }

    // Verify the page belongs to the user
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('id, config')
      .eq('id', pageId)
      .eq('user_id', user.id)
      .single()

    if (pageError || !page) {
      return NextResponse.json({ error: 'Page not found or access denied' }, { status: 404 })
    }

    // Update the email automation settings in the page config
    const currentConfig = page.config || {}
    const updatedConfig = {
      ...currentConfig,
      emailAutomation: {
        ...currentConfig.emailAutomation,
        [emailType]: settings
      }
    }

    // Update the page config
    const { data: updatedPage, error: updateError } = await supabase
      .from('pages')
      .update({ config: updatedConfig })
      .eq('id', pageId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating email settings:', updateError)
      return NextResponse.json({ error: 'Failed to update email settings' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Email settings updated successfully',
      page: updatedPage
    })

  } catch (error) {
    console.error('User emails update API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/user/emails/test - Send test email
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, emailType, testEmail } = await request.json()

    if (!pageId || !emailType || !testEmail) {
      return NextResponse.json({ error: 'Page ID, email type, and test email are required' }, { status: 400 })
    }

    // Verify the page belongs to the user
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('id, config')
      .eq('id', pageId)
      .eq('user_id', user.id)
      .single()

    if (pageError || !page) {
      return NextResponse.json({ error: 'Page not found or access denied' }, { status: 404 })
    }

    // Get email settings from config
    const config = page.config || {}
    const emailSettings = config.emailAutomation?.[emailType]

    if (!emailSettings) {
      return NextResponse.json({ error: 'Email type not found' }, { status: 404 })
    }

    // In a real implementation, you would send the email here
    // For now, we'll just log it
    console.log('Sending test email:', {
      to: testEmail,
      subject: emailSettings.subject,
      body: emailSettings.body,
      pageId,
      emailType
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      email: {
        to: testEmail,
        subject: emailSettings.subject,
        body: emailSettings.body
      }
    })

  } catch (error) {
    console.error('User emails test API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 