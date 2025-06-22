import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/user/templates - Get available templates and user's saved templates
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's saved templates from pages config
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('id, title, config')
      .eq('user_id', user.id)

    if (pagesError) {
      console.error('Error fetching pages:', pagesError)
      return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
    }

    // Extract saved templates from page configs
    const savedTemplates = pages?.map(page => {
      const config = page.config || {}
      return {
        pageId: page.id,
        pageTitle: page.title,
        template: config.template || null
      }
    }).filter(page => page.template) || []

    // Available template categories
    const availableTemplates = {
      business: [
        {
          id: "startup-launch",
          name: "Startup Launch",
          description: "Perfect for announcing your new startup",
          category: "Business",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "modern",
            colors: { primary: "#6366f1", secondary: "#8b5cf6" },
            sections: ["hero", "features", "testimonials", "cta"],
            industry: "startup"
          }
        },
        {
          id: "saas-product",
          name: "SaaS Product",
          description: "Professional SaaS product launch page",
          category: "Business",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "professional",
            colors: { primary: "#2563eb", secondary: "#1e40af" },
            sections: ["hero", "features", "pricing", "testimonials", "cta"],
            industry: "saas"
          }
        }
      ],
      mobile: [
        {
          id: "app-pre-launch",
          name: "App Pre-Launch",
          description: "Build excitement for your mobile app",
          category: "Mobile",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "mobile-first",
            colors: { primary: "#10b981", secondary: "#059669" },
            sections: ["hero", "features", "screenshots", "cta"],
            industry: "mobile-app"
          }
        },
        {
          id: "game-launch",
          name: "Game Launch",
          description: "Gaming app launch with engaging visuals",
          category: "Mobile",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "gaming",
            colors: { primary: "#f59e0b", secondary: "#d97706" },
            sections: ["hero", "features", "gameplay", "cta"],
            industry: "gaming"
          }
        }
      ],
      marketing: [
        {
          id: "product-hunt",
          name: "Product Hunt Campaign",
          description: "Maximize your Product Hunt launch",
          category: "Marketing",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "product-hunt",
            colors: { primary: "#ff6b6b", secondary: "#ee5a52" },
            sections: ["hero", "features", "social-proof", "cta"],
            industry: "marketing"
          }
        },
        {
          id: "ecommerce-drop",
          name: "E-commerce Drop",
          description: "Create buzz for product releases",
          category: "Marketing",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "ecommerce",
            colors: { primary: "#8b5cf6", secondary: "#7c3aed" },
            sections: ["hero", "products", "countdown", "cta"],
            industry: "ecommerce"
          }
        }
      ],
      content: [
        {
          id: "newsletter-signup",
          name: "Newsletter Signup",
          description: "Grow your email subscriber base",
          category: "Content",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "content",
            colors: { primary: "#06b6d4", secondary: "#0891b2" },
            sections: ["hero", "benefits", "cta"],
            industry: "content"
          }
        },
        {
          id: "book-launch",
          name: "Book Launch",
          description: "Launch your book with style",
          category: "Content",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "book",
            colors: { primary: "#dc2626", secondary: "#b91c1c" },
            sections: ["hero", "book-details", "author", "cta"],
            industry: "books"
          }
        }
      ],
      events: [
        {
          id: "event-registration",
          name: "Event Registration",
          description: "Collect attendees for your event",
          category: "Events",
          image: "/placeholder.svg?height=200&width=300",
          config: {
            theme: "event",
            colors: { primary: "#7c3aed", secondary: "#6d28d9" },
            sections: ["hero", "event-details", "speakers", "cta"],
            industry: "events"
          }
        }
      ]
    }

    return NextResponse.json({
      success: true,
      availableTemplates,
      savedTemplates
    })

  } catch (error) {
    console.error('User templates API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/user/templates - Apply template to a page
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, templateId } = await request.json()

    if (!pageId || !templateId) {
      return NextResponse.json({ error: 'Page ID and template ID are required' }, { status: 400 })
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

    // Get template configuration
    const templateConfig = getTemplateConfig(templateId)
    if (!templateConfig) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Update the page config with template
    const currentConfig = page.config || {}
    const updatedConfig = {
      ...currentConfig,
      template: templateId,
      theme: templateConfig.config.theme,
      colors: templateConfig.config.colors,
      sections: templateConfig.config.sections,
      industry: templateConfig.config.industry
    }

    // Update the page config
    const { data: updatedPage, error: updateError } = await supabase
      .from('pages')
      .update({ config: updatedConfig })
      .eq('id', pageId)
      .select()
      .single()

    if (updateError) {
      console.error('Error applying template:', updateError)
      return NextResponse.json({ error: 'Failed to apply template' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Template applied successfully',
      page: updatedPage,
      template: templateConfig
    })

  } catch (error) {
    console.error('User templates apply API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to get template configuration
function getTemplateConfig(templateId: string) {
  const allTemplates = {
    "startup-launch": {
      id: "startup-launch",
      name: "Startup Launch",
      description: "Perfect for announcing your new startup",
      category: "Business",
      config: {
        theme: "modern",
        colors: { primary: "#6366f1", secondary: "#8b5cf6" },
        sections: ["hero", "features", "testimonials", "cta"],
        industry: "startup"
      }
    },
    "app-pre-launch": {
      id: "app-pre-launch",
      name: "App Pre-Launch",
      description: "Build excitement for your mobile app",
      category: "Mobile",
      config: {
        theme: "mobile-first",
        colors: { primary: "#10b981", secondary: "#059669" },
        sections: ["hero", "features", "screenshots", "cta"],
        industry: "mobile-app"
      }
    },
    "product-hunt": {
      id: "product-hunt",
      name: "Product Hunt Campaign",
      description: "Maximize your Product Hunt launch",
      category: "Marketing",
      config: {
        theme: "product-hunt",
        colors: { primary: "#ff6b6b", secondary: "#ee5a52" },
        sections: ["hero", "features", "social-proof", "cta"],
        industry: "marketing"
      }
    },
    "newsletter-signup": {
      id: "newsletter-signup",
      name: "Newsletter Signup",
      description: "Grow your email subscriber base",
      category: "Content",
      config: {
        theme: "content",
        colors: { primary: "#06b6d4", secondary: "#0891b2" },
        sections: ["hero", "benefits", "cta"],
        industry: "content"
      }
    },
    "event-registration": {
      id: "event-registration",
      name: "Event Registration",
      description: "Collect attendees for your event",
      category: "Events",
      config: {
        theme: "event",
        colors: { primary: "#7c3aed", secondary: "#6d28d9" },
        sections: ["hero", "event-details", "speakers", "cta"],
        industry: "events"
      }
    }
  }

  return allTemplates[templateId as keyof typeof allTemplates] || null
} 