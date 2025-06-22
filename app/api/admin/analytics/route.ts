import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/analytics - Get platform analytics and metrics
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

    // Get platform metrics
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, created_at')

    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('id, published, created_at')

    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('id, subscribed_at')

    const { data: onboardingResponses, error: onboardingError } = await supabase
      .from('onboarding_responses')
      .select('id, completed_at')

    if (usersError || pagesError || subscriptionsError || onboardingError) {
      console.error('Error fetching analytics data:', { usersError, pagesError, subscriptionsError, onboardingError })
      return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    // Calculate metrics
    const totalUsers = users?.length || 0
    const totalPages = pages?.length || 0
    const publishedPages = pages?.filter(p => p.published).length || 0
    const totalSignups = subscriptions?.length || 0
    const totalOnboarding = onboardingResponses?.length || 0

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentUsers = users?.filter(u => new Date(u.created_at) >= sevenDaysAgo).length || 0
    const recentPages = pages?.filter(p => new Date(p.created_at) >= sevenDaysAgo).length || 0
    const recentSignups = subscriptions?.filter(s => new Date(s.subscribed_at) >= sevenDaysAgo).length || 0

    // Generate usage data for the last 7 days
    const usageData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const daySignups = subscriptions?.filter(s => {
        const signupDate = new Date(s.subscribed_at)
        return signupDate >= dayStart && signupDate <= dayEnd
      }).length || 0

      const dayUsers = users?.filter(u => {
        const userDate = new Date(u.created_at)
        return userDate >= dayStart && userDate <= dayEnd
      }).length || 0

      usageData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        signups: daySignups,
        users: dayUsers
      })
    }

    // Calculate averages and rates
    const avgSignupsPerPage = totalPages > 0 ? (totalSignups / totalPages).toFixed(1) : '0'
    const avgOnboardingPerPage = totalPages > 0 ? (totalOnboarding / totalPages).toFixed(1) : '0'
    const signupToOnboardingRate = totalSignups > 0 ? ((totalOnboarding / totalSignups) * 100).toFixed(1) : '0'

    // Mock data for some metrics (in a real app, you'd track these)
    const emailDeliveryRate = '99.2'
    const avgPageLoadTime = '1.2s'
    const activeApiIntegrations = Math.floor(Math.random() * 200) + 100

    return NextResponse.json({
      success: true,
      metrics: {
        totalUsers,
        totalPages,
        publishedPages,
        totalSignups,
        totalOnboarding,
        recentUsers,
        recentPages,
        recentSignups
      },
      usageData,
      performance: {
        avgSignupsPerPage,
        avgOnboardingPerPage,
        signupToOnboardingRate: `${signupToOnboardingRate}%`,
        emailDeliveryRate: `${emailDeliveryRate}%`,
        avgPageLoadTime,
        activeApiIntegrations
      },
      trends: {
        userGrowth: recentUsers > 0 ? `+${Math.floor((recentUsers / totalUsers) * 100)}%` : '0%',
        pageGrowth: recentPages > 0 ? `+${Math.floor((recentPages / totalPages) * 100)}%` : '0%',
        signupGrowth: recentSignups > 0 ? `+${Math.floor((recentSignups / totalSignups) * 100)}%` : '0%'
      }
    })

  } catch (error) {
    console.error('Admin analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 