"use client"

import { useState } from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Label } from "./label"
import { Switch } from "./switch"
import { Badge } from "./badge"
import { Settings, Eye, EyeOff, GripVertical, ArrowUp, ArrowDown } from "lucide-react"

interface Section {
  id: string
  title: string
  description: string
  enabled: boolean
  order: number
  icon: React.ReactNode
}

interface SectionManagerProps {
  sections: {
    hero: { enabled: boolean; order: number }
    features: { enabled: boolean; order: number }
    benefits: { enabled: boolean; order: number }
    pricing: { enabled: boolean; order: number }
    faq: { enabled: boolean; order: number }
    onboarding: { enabled: boolean; order: number }
    stats: { enabled: boolean; order: number }
    testimonials: { enabled: boolean; order: number }
    contact: { enabled: boolean; order: number }
  }
  onSectionsChange: (sections: {
    hero: { enabled: boolean; order: number }
    features: { enabled: boolean; order: number }
    benefits: { enabled: boolean; order: number }
    pricing: { enabled: boolean; order: number }
    faq: { enabled: boolean; order: number }
    onboarding: { enabled: boolean; order: number }
    stats: { enabled: boolean; order: number }
    testimonials: { enabled: boolean; order: number }
    contact: { enabled: boolean; order: number }
  }) => void
}

export function SectionManager({ sections, onSectionsChange }: SectionManagerProps) {
  const [draggedSection, setDraggedSection] = useState<string | null>(null)

  const sectionConfigs: Section[] = [
    {
      id: "hero",
      title: "Hero Section",
      description: "Main banner with company name and call-to-action",
      enabled: sections.hero.enabled,
      order: sections.hero.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "features",
      title: "Features",
      description: "Key features and capabilities of your product/service",
      enabled: sections.features.enabled,
      order: sections.features.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "benefits",
      title: "Benefits",
      description: "Value propositions and benefits for users",
      enabled: sections.benefits.enabled,
      order: sections.benefits.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "pricing",
      title: "Pricing",
      description: "Pricing plans and packages",
      enabled: sections.pricing.enabled,
      order: sections.pricing.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Frequently asked questions and answers",
      enabled: sections.faq.enabled,
      order: sections.faq.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "onboarding",
      title: "Onboarding",
      description: "Multi-step onboarding process",
      enabled: sections.onboarding.enabled,
      order: sections.onboarding.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "stats",
      title: "Statistics",
      description: "Social proof and key metrics",
      enabled: sections.stats.enabled,
      order: sections.stats.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Customer reviews and testimonials",
      enabled: sections.testimonials.enabled,
      order: sections.testimonials.order,
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "contact",
      title: "Contact",
      description: "Contact information and form",
      enabled: sections.contact.enabled,
      order: sections.contact.order,
      icon: <Eye className="h-4 w-4" />
    }
  ]

  const toggleSection = (sectionId: string) => {
    const updatedSections = { ...sections }
    updatedSections[sectionId as keyof typeof sections].enabled = !updatedSections[sectionId as keyof typeof sections].enabled
    onSectionsChange(updatedSections)
  }

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const updatedSections = { ...sections }
    const currentOrder = updatedSections[sectionId as keyof typeof sections].order
    
    if (direction === 'up' && currentOrder > 1) {
      // Find section with order - 1
      const targetSection = Object.keys(updatedSections).find(
        key => updatedSections[key as keyof typeof sections].order === currentOrder - 1
      )
      
      if (targetSection) {
        updatedSections[sectionId as keyof typeof sections].order = currentOrder - 1
        updatedSections[targetSection as keyof typeof sections].order = currentOrder
      }
    } else if (direction === 'down' && currentOrder < 9) {
      // Find section with order + 1
      const targetSection = Object.keys(updatedSections).find(
        key => updatedSections[key as keyof typeof sections].order === currentOrder + 1
      )
      
      if (targetSection) {
        updatedSections[sectionId as keyof typeof sections].order = currentOrder + 1
        updatedSections[targetSection as keyof typeof sections].order = currentOrder
      }
    }
    
    onSectionsChange(updatedSections)
  }

  const sortedSections = sectionConfigs.sort((a, b) => a.order - b.order)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Section Management
        </CardTitle>
        <CardDescription>
          Enable or disable sections and reorder them to customize your page layout.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSections.map((section) => (
          <div
            key={section.id}
            className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
              section.enabled 
                ? 'bg-background border-border' 
                : 'bg-muted/50 border-muted'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {section.order}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                {section.enabled ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <Label className="text-sm font-medium">
                    {section.title}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={section.order === 1}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={section.order === 9}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
              
              <Switch
                checked={section.enabled}
                onCheckedChange={() => toggleSection(section.id)}
              />
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Page Summary</p>
              <p className="text-xs text-muted-foreground">
                {sortedSections.filter(s => s.enabled).length} of {sortedSections.length} sections enabled
              </p>
            </div>
            <Badge variant="secondary">
              {sortedSections.filter(s => s.enabled).length} Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 