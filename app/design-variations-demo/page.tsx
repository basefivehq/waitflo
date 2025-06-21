"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MagicCard } from "@/components/ui/magic-ui"
import { IndustryThemeProvider } from "@/components/ui/industry-themes"
import { 
  Sparkles, 
  Palette, 
  Layers, 
  Settings, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown,
  GripVertical
} from "lucide-react"

const designVariations = [
  "modern-minimalist",
  "classic-elegant", 
  "bold-dynamic",
  "soft-friendly",
  "professional-corporate",
  "creative-artistic",
  "tech-futuristic",
  "natural-organic"
]

const industries = [
  { id: "health", name: "Health & Wellness", color: "teal" },
  { id: "tech", name: "Technology", color: "blue" },
  { id: "gaming", name: "Gaming", color: "purple" },
  { id: "creative", name: "Creative", color: "pink" },
  { id: "pet", name: "Pet Care", color: "brown" }
]

const sections = [
  { id: "hero", title: "Hero Section", description: "Main banner with company name and call-to-action" },
  { id: "features", title: "Features", description: "Key features and capabilities" },
  { id: "benefits", title: "Benefits", description: "Value propositions and benefits" },
  { id: "pricing", title: "Pricing", description: "Pricing plans and packages" },
  { id: "faq", title: "FAQ", description: "Frequently asked questions" },
  { id: "testimonials", title: "Testimonials", description: "Customer reviews and testimonials" }
]

export default function DesignVariationsDemo() {
  const [selectedIndustry, setSelectedIndustry] = useState("health")
  const [selectedVariation, setSelectedVariation] = useState("modern-minimalist")
  const [enabledSections, setEnabledSections] = useState({
    hero: true,
    features: true,
    benefits: true,
    pricing: true,
    faq: true,
    testimonials: true
  })

  const toggleSection = (sectionId: string) => {
    setEnabledSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId as keyof typeof prev]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Design Variations Demo
            </h1>
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore how the same industry can have completely different designs, and learn about section management capabilities.
          </p>
        </div>

        <Tabs defaultValue="variations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variations" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design Variations
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Section Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="variations" className="space-y-6">
            {/* Industry Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Selection</CardTitle>
                <CardDescription>
                  Choose an industry to see how design variations work within the same industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {industries.map((industry) => (
                    <Button
                      key={industry.id}
                      variant={selectedIndustry === industry.id ? "default" : "outline"}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className="h-20 flex flex-col gap-2"
                    >
                      <div className={`w-4 h-4 rounded-full bg-${industry.color}-500`} />
                      <span className="text-xs">{industry.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Design Variation Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Design Variation</CardTitle>
                <CardDescription>
                  Select a design variation to see how it changes the visual style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {designVariations.map((variation) => (
                    <Button
                      key={variation}
                      variant={selectedVariation === variation ? "default" : "outline"}
                      onClick={() => setSelectedVariation(variation)}
                      className="h-16 text-sm"
                    >
                      {variation.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <IndustryThemeProvider industry={selectedIndustry}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Page Preview</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {selectedVariation.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <Badge variant="secondary">
                        {industries.find(i => i.id === selectedIndustry)?.name}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Live preview of the selected industry and design variation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 bg-background space-y-8">
                    {/* Hero Section */}
                    <MagicCard className="p-8 text-center">
                      <h1 className="text-4xl font-bold mb-4">HealthFlow</h1>
                      <p className="text-xl mb-6">Your Personal Health Companion</p>
                      <p className="text-muted-foreground mb-8">
                        Track your wellness journey with AI-powered insights and personalized recommendations
                      </p>
                      <Button size="lg" className="px-8">
                        Start Your Journey
                      </Button>
                    </MagicCard>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <MagicCard className="p-6">
                        <h3 className="font-semibold mb-2">AI Health Insights</h3>
                        <p className="text-sm text-muted-foreground">
                          Get personalized health recommendations based on your data
                        </p>
                      </MagicCard>
                      <MagicCard className="p-6">
                        <h3 className="font-semibold mb-2">Wellness Tracking</h3>
                        <p className="text-sm text-muted-foreground">
                          Monitor your daily habits and wellness metrics
                        </p>
                      </MagicCard>
                      <MagicCard className="p-6">
                        <h3 className="font-semibold mb-2">Expert Guidance</h3>
                        <p className="text-sm text-muted-foreground">
                          Access to certified health professionals and coaches
                        </p>
                      </MagicCard>
                    </div>

                    {/* Benefits Section */}
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">Why Choose HealthFlow?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MagicCard className="p-4">
                          <p className="text-sm">Improve your overall health with data-driven insights</p>
                        </MagicCard>
                        <MagicCard className="p-4">
                          <p className="text-sm">Stay motivated with personalized goals and progress tracking</p>
                        </MagicCard>
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Plan</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MagicCard className="p-6 text-center">
                          <h3 className="font-semibold mb-2">Basic</h3>
                          <p className="text-2xl font-bold mb-4">$9/month</p>
                          <ul className="text-sm space-y-2">
                            <li>Basic health tracking</li>
                            <li>Daily insights</li>
                            <li>Community support</li>
                          </ul>
                        </MagicCard>
                        <MagicCard className="p-6 text-center">
                          <h3 className="font-semibold mb-2">Premium</h3>
                          <p className="text-2xl font-bold mb-4">$19/month</p>
                          <ul className="text-sm space-y-2">
                            <li>Advanced analytics</li>
                            <li>AI recommendations</li>
                            <li>Expert consultations</li>
                          </ul>
                        </MagicCard>
                        <MagicCard className="p-6 text-center">
                          <h3 className="font-semibold mb-2">Pro</h3>
                          <p className="text-2xl font-bold mb-4">$29/month</p>
                          <ul className="text-sm space-y-2">
                            <li>Everything in Premium</li>
                            <li>Personal health coach</li>
                            <li>Custom meal plans</li>
                          </ul>
                        </MagicCard>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </IndustryThemeProvider>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            {/* Section Management Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Section Management
                </CardTitle>
                <CardDescription>
                  Enable or disable sections and see how it affects the page layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                        enabledSections[section.id as keyof typeof enabledSections]
                          ? 'bg-background border-border' 
                          : 'bg-muted/50 border-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">
                            {sections.indexOf(section) + 1}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {enabledSections[section.id as keyof typeof enabledSections] ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{section.title}</p>
                            <p className="text-xs text-muted-foreground">{section.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={sections.indexOf(section) === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={sections.indexOf(section) === sections.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant={enabledSections[section.id as keyof typeof enabledSections] ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSection(section.id)}
                        >
                          {enabledSections[section.id as keyof typeof enabledSections] ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Page Summary</p>
                      <p className="text-xs text-muted-foreground">
                        {Object.values(enabledSections).filter(Boolean).length} of {sections.length} sections enabled
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {Object.values(enabledSections).filter(Boolean).length} Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview with Section Toggles */}
            <IndustryThemeProvider industry="health">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview with Section Management</CardTitle>
                  <CardDescription>
                    See how enabling/disabling sections affects the page layout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 bg-background space-y-8">
                    {enabledSections.hero && (
                      <MagicCard className="p-8 text-center">
                        <h1 className="text-4xl font-bold mb-4">HealthFlow</h1>
                        <p className="text-xl mb-6">Your Personal Health Companion</p>
                        <Button size="lg" className="px-8">
                          Start Your Journey
                        </Button>
                      </MagicCard>
                    )}

                    {enabledSections.features && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <MagicCard className="p-6">
                            <h3 className="font-semibold mb-2">AI Health Insights</h3>
                            <p className="text-sm text-muted-foreground">
                              Get personalized health recommendations
                            </p>
                          </MagicCard>
                          <MagicCard className="p-6">
                            <h3 className="font-semibold mb-2">Wellness Tracking</h3>
                            <p className="text-sm text-muted-foreground">
                              Monitor your daily habits
                            </p>
                          </MagicCard>
                          <MagicCard className="p-6">
                            <h3 className="font-semibold mb-2">Expert Guidance</h3>
                            <p className="text-sm text-muted-foreground">
                              Access to health professionals
                            </p>
                          </MagicCard>
                        </div>
                      </div>
                    )}

                    {enabledSections.benefits && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <MagicCard className="p-4">
                            <p className="text-sm">Improve your overall health with data-driven insights</p>
                          </MagicCard>
                          <MagicCard className="p-4">
                            <p className="text-sm">Stay motivated with personalized goals</p>
                          </MagicCard>
                        </div>
                      </div>
                    )}

                    {enabledSections.pricing && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">Pricing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <MagicCard className="p-6 text-center">
                            <h3 className="font-semibold mb-2">Basic</h3>
                            <p className="text-2xl font-bold mb-4">$9/month</p>
                          </MagicCard>
                          <MagicCard className="p-6 text-center">
                            <h3 className="font-semibold mb-2">Premium</h3>
                            <p className="text-2xl font-bold mb-4">$19/month</p>
                          </MagicCard>
                          <MagicCard className="p-6 text-center">
                            <h3 className="font-semibold mb-2">Pro</h3>
                            <p className="text-2xl font-bold mb-4">$29/month</p>
                          </MagicCard>
                        </div>
                      </div>
                    )}

                    {enabledSections.faq && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">FAQ</h2>
                        <div className="space-y-4">
                          <MagicCard className="p-6">
                            <h3 className="font-semibold mb-2">How does the AI work?</h3>
                            <p className="text-sm text-muted-foreground">
                              Our AI analyzes your health data to provide personalized recommendations
                            </p>
                          </MagicCard>
                          <MagicCard className="p-6">
                            <h3 className="font-semibold mb-2">Is my data secure?</h3>
                            <p className="text-sm text-muted-foreground">
                              Yes, we use enterprise-grade encryption to protect your health data
                            </p>
                          </MagicCard>
                        </div>
                      </div>
                    )}

                    {enabledSections.testimonials && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <MagicCard className="p-6">
                            <p className="text-sm mb-4">"HealthFlow helped me improve my wellness routine significantly!"</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">Sarah Johnson</p>
                                <p className="text-xs text-muted-foreground">Fitness Enthusiast</p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-yellow-400">★</span>
                                ))}
                              </div>
                            </div>
                          </MagicCard>
                          <MagicCard className="p-6">
                            <p className="text-sm mb-4">"The AI insights are incredibly accurate and helpful."</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">Mike Chen</p>
                                <p className="text-xs text-muted-foreground">Health Coach</p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-yellow-400">★</span>
                                ))}
                              </div>
                            </div>
                          </MagicCard>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </IndustryThemeProvider>
          </TabsContent>
        </Tabs>

        {/* Key Features Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Key Features Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Design Variations</h3>
                <p className="text-sm text-muted-foreground">
                  8 unique design variations ensure no two pages look the same, even within the same industry
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🖼️ Image Management</h3>
                <p className="text-sm text-muted-foreground">
                  Upload custom images, replace defaults, and manage hero, logo, feature, and testimonial images
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚙️ Section Control</h3>
                <p className="text-sm text-muted-foreground">
                  Enable/disable sections, reorder them, and see live previews of your changes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 