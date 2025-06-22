import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/settings - Get platform settings
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // For now, return default settings
    // In a real app, you'd store these in a settings table
    const settings = {
      enableReferrals: true,
      enableEmailAutomation: true,
      enableApiAccess: true,
      enableAnalytics: true,
      maxPagesPerUser: 10,
      maxSignupsPerPage: 10000,
      defaultEmailTemplate: "Welcome to our waitlist! We'll keep you updated on our progress.",
      supportEmail: "support@waitly.co",
      platformName: "Waitly",
      pricingTiers: [
        {
          name: "Free",
          price: 0,
          features: ["1 waitlist page", "Up to 100 signups", "Basic email notifications"],
          maxPages: 1,
          maxSignups: 100,
        },
        {
          name: "Pro",
          price: 29,
          features: ["Unlimited pages", "Unlimited signups", "Custom domains", "Email automations"],
          maxPages: -1,
          maxSignups: -1,
        },
        {
          name: "Agency",
          price: 99,
          features: ["Everything in Pro", "White-label solution", "API access", "Priority support"],
          maxPages: -1,
          maxSignups: -1,
        },
      ]
    }

    return NextResponse.json({
      success: true,
      settings
    })

  } catch (error) {
    console.error('Admin settings GET API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/settings - Update platform settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const settings = await request.json()

    // Validate required fields
    if (!settings.platformName || !settings.supportEmail) {
      return NextResponse.json({ error: 'Platform name and support email are required' }, { status: 400 })
    }

    // In a real app, you'd save these to a settings table
    // For now, we'll just return success
    console.log('Saving platform settings:', settings)

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings
    })

  } catch (error) {
    console.error('Admin settings PUT API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 