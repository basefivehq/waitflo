import { createSupabaseClient } from '@/lib/supabase/utils'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/user/analytics - Get user's analytics data
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseClient(true)
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    // If pageId is provided, return specific page analytics
    if (pageId) {
      // Get specific page analytics
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select(`
          id,
          title,
          slug,
          published,
          created_at,
          updated_at,
          subscriptions(id, subscribed_at, email),
          onboarding_responses(id, completed_at, email, answers)
        `)
        .eq('id', pageId)
        .eq('user_id', user.id)
        .single()

      if (pageError || !page) {
        return NextResponse.json({ error: 'Page not found or access denied' }, { status: 404 })
      }

      // Calculate page-specific metrics
      const signupsCount = page.subscriptions?.length || 0
      const onboardingCount = page.onboarding_responses?.length || 0
      const views = Math.floor(Math.random() * 10000) + 1000 // Mock data
      const conversion = signupsCount > 0 ? ((signupsCount / views) * 100).toFixed(1) : '0.0'

      // Calculate daily signups for the last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const dailySignups = []
      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dayStart = new Date(date.setHours(0, 0, 0, 0))
        const dayEnd = new Date(date.setHours(23, 59, 59, 999))

        const daySignups = page.subscriptions?.filter((s: any) => {
          const signupDate = new Date(s.subscribed_at)
          return signupDate >= dayStart && signupDate <= dayEnd
        }).length || 0

        dailySignups.push({
          date: date.toISOString().split('T')[0],
          signups: daySignups
        })
      }

      return NextResponse.json({
        success: true,
        page: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          published: page.published,
          created_at: page.created_at,
          updated_at: page.updated_at,
          signups: signupsCount,
          onboarding: onboardingCount,
          views,
          conversion: parseFloat(conversion),
          url: `${page.slug}.waitly.co`
        },
        dailySignups,
        recentSignups: page.subscriptions?.slice(0, 10) || [],
        recentOnboarding: page.onboarding_responses?.slice(0, 10) || []
      })
    }

    // Get user's pages with signup data (general analytics)
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select(`
        id,
        title,
        slug,
        published,
        created_at,
        updated_at,
        subscriptions(id, subscribed_at),
        onboarding_responses(id, completed_at)
      `)
      .eq('user_id', user.id)

    if (pagesError) {
      console.error('Error fetching pages:', pagesError)
      return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    // Calculate analytics for each page
    const pageAnalytics = pages?.map(page => {
      const signupsCount = page.subscriptions?.length || 0
      const onboardingCount = page.onboarding_responses?.length || 0
      const views = Math.floor(Math.random() * 10000) + 1000 // Mock data for now
      const conversion = signupsCount > 0 ? ((signupsCount / views) * 100).toFixed(1) : '0.0'

      return {
        id: page.id,
        title: page.title,
        slug: page.slug,
        published: page.published,
        created_at: page.created_at,
        updated_at: page.updated_at,
        signups: signupsCount,
        onboarding: onboardingCount,
        views,
        conversion: parseFloat(conversion),
        url: `${page.slug}.waitly.co`,
        subscriptions: page.subscriptions,
        onboarding_responses: page.onboarding_responses
      }
    }) || []

    // Calculate overall metrics
    const totalPages = pageAnalytics.length
    const publishedPages = pageAnalytics.filter(p => p.published).length
    const totalSignups = pageAnalytics.reduce((sum, p) => sum + p.signups, 0)
    const totalOnboarding = pageAnalytics.reduce((sum, p) => sum + p.onboarding, 0)
    const totalViews = pageAnalytics.reduce((sum, p) => sum + p.views, 0)
    const avgConversion = totalViews > 0 ? ((totalSignups / totalViews) * 100).toFixed(1) : '0.0'

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentSignups = pageAnalytics.reduce((sum, page) => {
      const recentPageSignups = page.subscriptions?.filter((s: any) => 
        new Date(s.subscribed_at) >= sevenDaysAgo
      ).length || 0
      return sum + recentPageSignups
    }, 0)

    const recentOnboarding = pageAnalytics.reduce((sum, page) => {
      const recentPageOnboarding = page.onboarding_responses?.filter((o: any) => 
        new Date(o.completed_at) >= sevenDaysAgo
      ).length || 0
      return sum + recentPageOnboarding
    }, 0)

    // Generate daily data for the last 7 days
    const dailyData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const daySignups = pageAnalytics.reduce((sum, page) => {
        const dayPageSignups = page.subscriptions?.filter((s: any) => {
          const signupDate = new Date(s.subscribed_at)
          return signupDate >= dayStart && signupDate <= dayEnd
        }).length || 0
        return sum + dayPageSignups
      }, 0)

      const dayOnboarding = pageAnalytics.reduce((sum, page) => {
        const dayPageOnboarding = page.onboarding_responses?.filter((o: any) => {
          const onboardingDate = new Date(o.completed_at)
          return onboardingDate >= dayStart && onboardingDate <= dayEnd
        }).length || 0
        return sum + dayPageOnboarding
      }, 0)

      dailyData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        signups: daySignups,
        onboarding: dayOnboarding
      })
    }

    // Top performing pages
    const topPages = [...pageAnalytics]
      .sort((a, b) => b.signups - a.signups)
      .slice(0, 5)
      .map(page => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        signups: page.signups,
        conversion: page.conversion,
        url: page.url
      }))

    // Recent signups (last 10)
    const allSignups = pageAnalytics.flatMap(page => 
      (page.subscriptions || []).map((s: any) => ({
        ...s,
        pageTitle: page.title,
        pageSlug: page.slug
      }))
    ).sort((a, b) => new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime())
    .slice(0, 10)

    return NextResponse.json({
      success: true,
      overview: {
        totalPages,
        publishedPages,
        totalSignups,
        totalOnboarding,
        totalViews,
        avgConversion: `${avgConversion}%`,
        recentSignups,
        recentOnboarding
      },
      dailyData,
      topPages,
      recentSignups,
      pageAnalytics: pageAnalytics.map(page => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        published: page.published,
        created_at: page.created_at,
        updated_at: page.updated_at,
        signups: page.signups,
        onboarding: page.onboarding,
        views: page.views,
        conversion: page.conversion,
        url: page.url
      }))
    })

  } catch (error) {
    console.error('User analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 