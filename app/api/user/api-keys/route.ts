import { createSupabaseClient } from '@/lib/supabase/utils'
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

// GET /api/user/api-keys - Get user's API keys
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseClient(true)
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's API keys from pages config
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('id, title, config')
      .eq('user_id', user.id)

    if (pagesError) {
      console.error('Error fetching pages:', pagesError)
      return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
    }

    // Extract API keys from page configs
    const apiKeys = pages?.map(page => {
      const config = page.config || {}
      const pageApiKeys = config.apiKeys || []
      
      return {
        pageId: page.id,
        pageTitle: page.title,
        apiKeys: pageApiKeys.map((key: any) => ({
          id: key.id,
          name: key.name,
          key: key.key,
          created: key.created,
          lastUsed: key.lastUsed,
          permissions: key.permissions || ['read', 'write'],
          status: key.status || 'active'
        }))
      }
    }).filter(page => page.apiKeys.length > 0) || []

    // Get webhook settings
    const webhookSettings = pages?.map(page => {
      const config = page.config || {}
      return {
        pageId: page.id,
        pageTitle: page.title,
        webhookUrl: config.webhookUrl || '',
        webhookEvents: config.webhookEvents || [
          { name: "signup.created", enabled: true },
          { name: "referral.completed", enabled: true },
          { name: "milestone.reached", enabled: false }
        ]
      }
    }) || []

    return NextResponse.json({
      success: true,
      apiKeys,
      webhookSettings
    })

  } catch (error) {
    console.error('User API keys API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/user/api-keys - Create new API key
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseClient(true)
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, name, permissions } = await request.json()

    if (!pageId || !name) {
      return NextResponse.json({ error: 'Page ID and name are required' }, { status: 400 })
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

    // Generate new API key
    const apiKey = `wly_${randomBytes(16).toString('hex')}`
    const newApiKey = {
      id: Date.now().toString(),
      name,
      key: apiKey,
      created: new Date().toISOString(),
      lastUsed: null,
      permissions: permissions || ['read', 'write'],
      status: 'active'
    }

    // Update the page config with new API key
    const currentConfig = page.config || {}
    const currentApiKeys = currentConfig.apiKeys || []
    const updatedConfig = {
      ...currentConfig,
      apiKeys: [...currentApiKeys, newApiKey]
    }

    // Update the page config
    const { data: updatedPage, error: updateError } = await supabase
      .from('pages')
      .update({ config: updatedConfig })
      .eq('id', pageId)
      .select()
      .single()

    if (updateError) {
      console.error('Error creating API key:', updateError)
      return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'API key created successfully',
      apiKey: newApiKey,
      page: updatedPage
    })

  } catch (error) {
    console.error('User API keys create API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/user/api-keys - Update API key or webhook settings
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseClient(true)
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, type, data } = await request.json()

    if (!pageId || !type || !data) {
      return NextResponse.json({ error: 'Page ID, type, and data are required' }, { status: 400 })
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

    const currentConfig = page.config || {}
    let updatedConfig

    if (type === 'webhook') {
      // Update webhook settings
      updatedConfig = {
        ...currentConfig,
        webhookUrl: data.webhookUrl,
        webhookEvents: data.webhookEvents
      }
    } else if (type === 'apiKey') {
      // Update API key (e.g., regenerate, change permissions)
      const currentApiKeys = currentConfig.apiKeys || []
      const updatedApiKeys = currentApiKeys.map((key: any) => 
        key.id === data.keyId ? { ...key, ...data.updates } : key
      )
      
      updatedConfig = {
        ...currentConfig,
        apiKeys: updatedApiKeys
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
      console.error('Error updating settings:', updateError)
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      page: updatedPage
    })

  } catch (error) {
    console.error('User API keys update API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/user/api-keys - Delete API key
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseClient(true)
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')
    const keyId = searchParams.get('keyId')

    if (!pageId || !keyId) {
      return NextResponse.json({ error: 'Page ID and key ID are required' }, { status: 400 })
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

    // Remove the API key from config
    const currentConfig = page.config || {}
    const currentApiKeys = currentConfig.apiKeys || []
    const updatedApiKeys = currentApiKeys.filter((key: any) => key.id !== keyId)
    
    const updatedConfig = {
      ...currentConfig,
      apiKeys: updatedApiKeys
    }

    // Update the page config
    const { data: updatedPage, error: updateError } = await supabase
      .from('pages')
      .update({ config: updatedConfig })
      .eq('id', pageId)
      .select()
      .single()

    if (updateError) {
      console.error('Error deleting API key:', updateError)
      return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'API key deleted successfully',
      page: updatedPage
    })

  } catch (error) {
    console.error('User API keys delete API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 