import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/pages - Get all pages with user and signup stats
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

    // Get all pages with user info and signup counts
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select(`
        id,
        title,
        slug,
        published,
        created_at,
        updated_at,
        user:users(id, email, name),
        subscriptions(id),
        onboarding_responses(id)
      `)
      .order('created_at', { ascending: false })

    if (pagesError) {
      console.error('Error fetching pages:', pagesError)
      return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
    }

    // Process page data to include stats
    const processedPages = pages?.map(page => {
      const signupsCount = page.subscriptions?.length || 0
      const onboardingCount = page.onboarding_responses?.length || 0
      const views = Math.floor(Math.random() * 10000) + 1000 // Mock data for now
      const conversion = signupsCount > 0 ? ((signupsCount / views) * 100).toFixed(1) : '0.0'

      return {
        id: page.id,
        title: page.title,
        user: (page.user as any)?.name || 'Unknown',
        userEmail: (page.user as any)?.email || 'unknown@example.com',
        url: `${page.slug}.waitly.co`,
        signups: signupsCount,
        status: page.published ? 'active' : 'inactive',
        createdDate: page.created_at,
        lastActivity: page.updated_at,
        views,
        conversion: parseFloat(conversion),
        onboardingCount
      }
    }) || []

    return NextResponse.json({
      success: true,
      pages: processedPages,
      stats: {
        total: processedPages.length,
        active: processedPages.filter(p => p.status === 'active').length,
        totalSignups: processedPages.reduce((sum, p) => sum + p.signups, 0),
        totalViews: processedPages.reduce((sum, p) => sum + p.views, 0)
      }
    })

  } catch (error) {
    console.error('Admin pages API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/pages/:id - Update page status
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

    const { pageId, published } = await request.json()

    if (pageId === undefined || published === undefined) {
      return NextResponse.json({ error: 'Page ID and published status are required' }, { status: 400 })
    }

    // Update page status
    const { data: updatedPage, error: updateError } = await supabase
      .from('pages')
      .update({ published })
      .eq('id', pageId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating page:', updateError)
      return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      page: updatedPage
    })

  } catch (error) {
    console.error('Admin page update API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/pages/:id - Delete page
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('id')

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }

    // Delete page (this will cascade delete subscriptions and onboarding responses)
    const { error: deleteError } = await supabase
      .from('pages')
      .delete()
      .eq('id', pageId)

    if (deleteError) {
      console.error('Error deleting page:', deleteError)
      return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    })

  } catch (error) {
    console.error('Admin page delete API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 