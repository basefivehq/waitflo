"use client"

import { IndustryThemeProvider, industryColors, industryLayouts } from "./industry-themes"
import { MagicCard, MagicButton } from "./magic-ui"
import { Badge } from "./badge"

interface IndustryStyleDemoProps {
  industry: string
  title?: string
  children?: React.ReactNode
}

export function IndustryStyleDemo({ industry, title, children }: IndustryStyleDemoProps) {
  const colors = industryColors[industry as keyof typeof industryColors] || industryColors.general
  const layout = industryLayouts[industry as keyof typeof industryLayouts] || industryLayouts.general

  return (
    <IndustryThemeProvider industry={industry}>
      <div className="p-6">
        <div className="mb-6">
          <Badge variant="outline" className="mb-2">
            {industry.toUpperCase()} Theme
          </Badge>
          <h2 className="text-2xl font-bold mb-2">{title || `${industry} Industry Style`}</h2>
          <p className="text-muted-foreground">
            This page uses the {industry} industry theme with {colors.primary} primary colors and {layout.includes('grid') ? 'grid' : 'column'} layout.
          </p>
        </div>

        <div className={layout}>
          <MagicCard variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Primary Color: {colors.primary}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This card demonstrates the {colors.primary} color scheme used for {industry} industry pages.
            </p>
            <MagicButton variant="gradient" size="sm">
              {industry} CTA
            </MagicButton>
          </MagicCard>

          <MagicCard variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Secondary Color: {colors.secondary}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Secondary colors provide depth and hierarchy to {industry} industry designs.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{colors.secondary}</Badge>
              <Badge variant="outline">{colors.accent}</Badge>
            </div>
          </MagicCard>

          <MagicCard variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Layout: {layout.includes('grid') ? 'Grid' : 'Column'}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {industry} industry uses {layout.includes('grid') ? 'grid' : 'column'} layout for optimal content presentation.
            </p>
            <div className="text-xs font-mono bg-muted p-2 rounded">
              {layout}
            </div>
          </MagicCard>
        </div>

        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </IndustryThemeProvider>
  )
}

// Demo component showing multiple industry styles
export function IndustryStylesComparison() {
  const industries = [
    'health',
    'tech', 
    'saas',
    'game',
    'creative',
    'book',
    'ecommerce',
    'finance'
  ]

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Industry-Specific Page Styles</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Each industry gets a unique visual theme, color scheme, layout, and styling that's appropriate for their target audience and business type.
        </p>
      </div>

      {industries.map((industry) => (
        <IndustryStyleDemo 
          key={industry} 
          industry={industry}
          title={`${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Example`}
        />
      ))}
    </div>
  )
} 