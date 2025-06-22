"use client"
import { useState, useRef, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  MagicCard, 
  FeatureCard, 
  GradientHero, 
  PricingCard, 
  FAQItem, 
  OnboardingStep, 
  StatsCard, 
  MagicButton 
} from "@/components/ui/magic-ui"
import { IndustryThemeProvider, industryColors, industryLayouts } from "@/components/ui/industry-themes"
import { ColorCustomizer } from "@/components/ui/color-customizer"
import { ImageEditor } from "@/components/ui/image-editor"
import { SectionManager } from "@/components/ui/section-manager"
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Star,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  Globe,
  Mail,
  Phone,
  Upload,
  Plus,
  Trash2,
  Copy,
  Eye,
  Building,
  ShoppingCart,
  GraduationCap,
  Heart,
  DollarSign,
  Home,
  Utensils,
  Plane,
  Gamepad2,
  Palette,
  Wand2,
  Image as ImageIcon,
  Settings,
  Download,
  Layers,
  Layout
} from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type Step = "prompt" | "preview" | "edit" | "final-preview" | "publish"

interface ComponentData {
  id: string
  type: string
  title: string
  content: any
  visible: boolean
}

interface GeneratedContent {
  companyName: string
  tagline: string
  description: string
  features: string[]
  benefits: string[]
  steps: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  pricing: { name: string; price: string; features: string[] }[]
  onboardingSteps: { question: string; answer: string }[]
  targetAudience: string
  valueProposition: string
  callToAction: string
  industry: string
  businessType: string
  socialProof: { [key: string]: string }
  testimonials: { name: string; role: string; content: string; rating: number }[]
  pageStyle: {
    theme: string
    colorScheme: string
    layout: string
    visualStyle: string
    typography: string
    animations: string
    customColors: {
      primary: string
      secondary: string
      accent: string
      text: string
      background: string
    }
    designVariation: string
  }
  images: {
    hero: string
    features: string[]
    testimonials: string[]
    icons: string[]
    customImages: {
      logo?: string
      heroImage?: string
      featureImages: string[]
      testimonialImages: string[]
    }
  }
  components: {
    hero: string
    features: string[]
    pricing: string[]
    testimonials: string[]
  }
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
}

interface EditData {
  logo: string | null
  pageName: string
  about: string
  onboardingSteps: { id: string; question: string; answer: string }[]
  features: string[]
  howItWorksSteps: { id: string; title: string; description: string }[]
  benefits: string[]
  pricing: { id: string; name: string; price: string; features: string[] }[]
  faqs: { id: string; question: string; answer: string }[]
  footer: {
    email: string
    phone: string
    address: string
  }
}

const industryOptions = [
  { value: "tech", label: "Technology", icon: Building },
  { value: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { value: "service", label: "Professional Services", icon: Users },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "health", label: "Health & Wellness", icon: Heart },
  { value: "finance", label: "Finance", icon: DollarSign },
  { value: "real-estate", label: "Real Estate", icon: Home },
  { value: "food", label: "Food & Dining", icon: Utensils },
  { value: "travel", label: "Travel & Tourism", icon: Plane },
  { value: "entertainment", label: "Entertainment", icon: Gamepad2 },
]

const businessTypeOptions = [
  { value: "b2b", label: "B2B (Business to Business)" },
  { value: "b2c", label: "B2C (Business to Consumer)" },
  { value: "marketplace", label: "Marketplace" },
  { value: "subscription", label: "Subscription" },
  { value: "one-time", label: "One-time Purchase" },
]

export function EnhancedPageBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>("prompt")
  const [editStep, setEditStep] = useState(1)
  const [prompt, setPrompt] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedBusinessType, setSelectedBusinessType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [components, setComponents] = useState<ComponentData[]>([])
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [newPageId, setNewPageId] = useState<number | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [editData, setEditData] = useState<EditData>({
    logo: null,
    pageName: "",
    about: "",
    onboardingSteps: [{ id: "1", question: "", answer: "" }],
    features: [],
    howItWorksSteps: [],
    benefits: [],
    pricing: [],
    faqs: [],
    footer: {
      email: "",
      phone: "",
      address: "",
    },
  })

  const [customColors, setCustomColors] = useState({
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#dc3545",
    text: "#333",
    background: "#fff"
  })

  const [customImages, setCustomImages] = useState({
    hero: "",
    logo: "",
    featureImages: [] as string[],
    testimonialImages: [] as string[]
  })

  const [sections, setSections] = useState({
    hero: { enabled: true, order: 1 },
    features: { enabled: true, order: 2 },
    benefits: { enabled: true, order: 3 },
    pricing: { enabled: true, order: 4 },
    faq: { enabled: true, order: 5 },
    onboarding: { enabled: true, order: 6 },
    stats: { enabled: true, order: 7 },
    testimonials: { enabled: true, order: 8 },
    contact: { enabled: true, order: 9 }
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generatePage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          industry: selectedIndustry,
          businessType: selectedBusinessType,
          customColors
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const content = await response.json()
      setGeneratedContent(content)
      setCustomColors(content.pageStyle.customColors)
      setCustomImages(content.images.customImages)
      setSections(content.sections)

      // Create components array with all sections including onboarding
      const generatedComponents: ComponentData[] = [
        {
          id: "header",
          type: "Header",
          title: "Header",
          content: content,
          visible: true,
        },
        {
          id: "hero",
          type: "Hero",
          title: "Hero Section",
          content: content,
          visible: true,
        },
        {
          id: "features",
          type: "Features",
          title: "Features",
          content: content,
          visible: true,
        },
        {
          id: "how-it-works",
          type: "HowItWorks",
          title: "How It Works",
          content: content,
          visible: true,
        },
        {
          id: "benefits",
          type: "Benefits",
          title: "Benefits",
          content: content,
          visible: true,
        },
        {
          id: "onboarding",
          type: "Onboarding",
          title: "Onboarding Flow",
          content: content,
          visible: true,
        },
        {
          id: "pricing",
          type: "Pricing",
          title: "Pricing",
          content: content,
          visible: true,
        },
        {
          id: "faq",
          type: "FAQ",
          title: "FAQ",
          content: content,
          visible: true,
        },
        {
          id: "footer",
          type: "Footer",
          title: "Footer",
          content: content,
          visible: true,
        },
      ]
      
      setComponents(generatedComponents)

      const supabase = createSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
          // Create a slug from the company name
          const slug = content.companyName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + Date.now().toString().slice(-6)

          const { data: newPage, error } = await supabase
            .from('pages')
            .insert({
              title: content.companyName,
              slug: slug,
              content: content,
              user_id: user.id,
              published: false
            })
            .select()
            .single()

          if (error) {
            console.error('Error creating page:', error)
          } else {
            setNewPageId(newPage.id)
          }
      }

      setCurrentStep("preview")
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Enhanced Hero Component with Industry-specific styling
  const HeroComponent = ({ content }: { content: GeneratedContent }) => {
    const colors = industryColors[content.industry as keyof typeof industryColors] || industryColors.general
    
    return (
      <GradientHero
        title={content.companyName}
        subtitle={content.tagline}
        ctaText={content.callToAction}
        background="gradient"
        onCtaClick={() => setCurrentStep("edit")}
      />
    )
  }

  // Enhanced Features Component with Industry-specific styling
  const FeaturesComponent = ({ content }: { content: GeneratedContent }) => {
    const colors = industryColors[content.industry as keyof typeof industryColors] || industryColors.general
    const layout = industryLayouts[content.industry as keyof typeof industryLayouts] || industryLayouts.general
    
    return (
      <div className={layout}>
        {content.features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={<Zap className="h-6 w-6" />}
            title={feature}
            description={`Advanced ${feature.toLowerCase()} capabilities for your business`}
            delay={index * 0.1}
          />
        ))}
      </div>
    )
  }

  // Enhanced Pricing Component with Industry-specific styling
  const PricingComponent = ({ content }: { content: GeneratedContent }) => {
    const colors = industryColors[content.industry as keyof typeof industryColors] || industryColors.general
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.pricing.map((plan, index) => (
          <PricingCard
            key={index}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            popular={index === 1}
            delay={index * 0.2}
            onSelect={() => console.log(`Selected ${plan.name}`)}
          />
        ))}
      </div>
    )
  }

  // Enhanced FAQ Component with Industry-specific styling
  const FAQComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="space-y-4">
      {content.faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={expandedFAQ === index}
          onToggle={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
        />
      ))}
    </div>
  )

  // Enhanced Onboarding Component with Industry-specific styling
  const OnboardingComponent = ({ content }: { content: GeneratedContent }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [answers, setAnswers] = useState<string[]>([])

    const handleAnswer = (answer: string) => {
      const newAnswers = [...answers]
      newAnswers[currentStepIndex] = answer
      setAnswers(newAnswers)
      
      if (currentStepIndex < content.onboardingSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1)
      } else {
        // Submit onboarding responses
        handleSubmit()
      }
    }

    const handleSubmit = async () => {
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'user@example.com', // This would come from user input
            pageId: newPageId,
            answers: answers,
            questions: content.onboardingSteps.map(step => step.question)
          }),
        })

        if (response.ok) {
          console.log('Onboarding completed successfully')
        }
      } catch (error) {
        console.error('Onboarding error:', error)
      }
    }

    if (currentStepIndex >= content.onboardingSteps.length) {
      return (
        <MagicCard variant="gradient" className="text-center">
          <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">We've received your responses and will be in touch soon.</p>
        </MagicCard>
      )
    }

    const currentStep = content.onboardingSteps[currentStepIndex]
    const options = currentStep.answer.split(', ')

    return (
      <OnboardingStep
        question={currentStep.question}
        options={options}
        onAnswer={handleAnswer}
        currentStep={currentStepIndex + 1}
        totalSteps={content.onboardingSteps.length}
      />
    )
  }

  // Enhanced Stats Component with Industry-specific styling
  const StatsComponent = ({ content }: { content: GeneratedContent }) => {
    const colors = industryColors[content.industry as keyof typeof industryColors] || industryColors.general
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(content.socialProof).map(([key, value], index) => (
          <StatsCard
            key={key}
            value={value}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            delay={index * 0.1}
          />
        ))}
      </div>
    )
  }

  // Enhanced Testimonials Component with Industry-specific styling
  const TestimonialsComponent = ({ content }: { content: GeneratedContent }) => {
    const colors = industryColors[content.industry as keyof typeof industryColors] || industryColors.general
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.testimonials.map((testimonial, index) => (
          <MagicCard key={index} variant="glass" delay={index * 0.2}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-3">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    )
  }

  const renderComponent = (component: ComponentData) => {
    if (!generatedContent) return null

    switch (component.type) {
      case "Hero":
        return <HeroComponent content={generatedContent} />
      case "Features":
        return <FeaturesComponent content={generatedContent} />
      case "Pricing":
        return <PricingComponent content={generatedContent} />
      case "FAQ":
        return <FAQComponent content={generatedContent} />
      case "Onboarding":
        return <OnboardingComponent content={generatedContent} />
      case "Stats":
        return <StatsComponent content={generatedContent} />
      case "Testimonials":
        return <TestimonialsComponent content={generatedContent} />
      default:
        return null
    }
  }

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ))
  }

  const handleColorsChange = (colors: any) => {
    setCustomColors(colors)
    if (generatedContent) {
      setGeneratedContent({
        ...generatedContent,
        pageStyle: {
          ...generatedContent.pageStyle,
          customColors: colors
        }
      })
    }
  }

  const handleImagesChange = (images: any) => {
    setCustomImages(images)
    if (generatedContent) {
      setGeneratedContent({
        ...generatedContent,
        images: {
          ...generatedContent.images,
          customImages: images
        }
      })
    }
  }

  const handleSectionsChange = (newSections: any) => {
    setSections(newSections)
    if (generatedContent) {
      setGeneratedContent({
        ...generatedContent,
        sections: newSections
      })
    }
  }

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(JSON.stringify(generatedContent, null, 2))
    }
  }

  const downloadPage = () => {
    if (generatedContent) {
      const dataStr = JSON.stringify(generatedContent, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "waitlist-page.json"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  if (currentStep === "prompt") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create Your Waitlist Page</h1>
          <p className="text-muted-foreground">
            Describe your business and let AI generate a beautiful, industry-specific waitlist page
          </p>
        </div>

        <MagicCard variant="gradient" className="mb-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((industry) => {
                    const Icon = industry.icon
                    return (
                      <SelectItem key={industry.value} value={industry.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {industry.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prompt">Describe your business or product</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., A SaaS platform that helps small businesses automate their marketing campaigns with AI-powered tools..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <MagicButton
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full"
              variant="gradient"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Page
                </>
              )}
            </MagicButton>
          </div>
        </MagicCard>
      </div>
    )
  }

  if (currentStep === "preview") {
    return (
      <IndustryThemeProvider industry={generatedContent?.industry || 'general'}>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Preview Your Page</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep("prompt")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <MagicButton onClick={() => setCurrentStep("edit")} variant="gradient">
                Customize
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagicButton>
            </div>
          </div>

          <div className={cn(
            "space-y-8",
            industryLayouts[generatedContent?.industry as keyof typeof industryLayouts] || industryLayouts.general
          )}>
            {components.map((component) => (
              <div key={component.id} className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{component.title}</h3>
                {renderComponent(component)}
              </div>
            ))}
          </div>
        </div>
      </IndustryThemeProvider>
    )
  }

  if (currentStep === "final-preview") {
    return (
      <IndustryThemeProvider industry={generatedContent?.industry || 'general'}>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Final Preview</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep("edit")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Edit
              </Button>
              <MagicButton onClick={() => setCurrentStep("publish")} variant="gradient">
                Publish Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagicButton>
            </div>
          </div>

          <div className={cn(
            "space-y-8",
            industryLayouts[generatedContent?.industry as keyof typeof industryLayouts] || industryLayouts.general
          )}>
            {components.map((component) => (
              <div key={component.id}>
                {renderComponent(component)}
              </div>
            ))}
          </div>
        </div>
      </IndustryThemeProvider>
    )
  }

  if (currentStep === "edit") {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customize Your Page</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep("preview")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Preview
            </Button>
            <MagicButton onClick={() => setCurrentStep("final-preview")} variant="gradient">
              Preview Final
              <ArrowRight className="ml-2 h-4 w-4" />
            </MagicButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Color Customization */}
          <div className="lg:col-span-1">
            <ColorCustomizer
              colors={customColors}
              onColorsChange={handleColorsChange}
              industry={generatedContent?.industry}
            />
          </div>

          {/* Image Customization */}
          <div className="lg:col-span-1">
            <ImageEditor
              images={customImages}
              onImagesChange={handleImagesChange}
              industry={generatedContent?.industry}
            />
          </div>

          {/* Component Customization */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Components</CardTitle>
                <CardDescription>
                  Customize the content and styling of your page components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {components.map((component) => (
                    <div key={component.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
                      <div className="space-y-2">
                        <Label>Component Type</Label>
                        <Select
                          value={component.type}
                          onValueChange={(value) => updateComponent(component.id, { type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hero">Hero Section</SelectItem>
                            <SelectItem value="features">Features</SelectItem>
                            <SelectItem value="pricing">Pricing</SelectItem>
                            <SelectItem value="faq">FAQ</SelectItem>
                            <SelectItem value="onboarding">Onboarding</SelectItem>
                            <SelectItem value="stats">Statistics</SelectItem>
                            <SelectItem value="testimonials">Testimonials</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "publish") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Page Builder</h1>
          <p className="text-muted-foreground">
            Customize your waitlist page with advanced features
          </p>
        </div>

        <MagicCard variant="glass">
          <p className="text-center text-muted-foreground">
            Enhanced page builder with Magic UI components coming soon...
          </p>
        </MagicCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Page Builder</h1>
          <p className="text-muted-foreground">
            Create stunning waitlist and onboarding pages with AI-powered content generation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            Magic UI
          </Badge>
        </div>
      </div>

      <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Publish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generate AI Content
              </CardTitle>
              <CardDescription>
                Describe your business or product, and AI will generate tailored content and design.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe your business or product</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., Create a waitlist for a dog sitting app launch use brown and white colors"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Page
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          {generatedContent ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ColorCustomizer
                  colors={customColors}
                  onColorsChange={handleColorsChange}
                  industry={generatedContent.industry}
                />
                
                <ImageEditor
                  images={customImages}
                  onImagesChange={handleImagesChange}
                  industry={generatedContent.industry}
                />
              </div>
              
              <SectionManager
                sections={sections}
                onSectionsChange={handleSectionsChange}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Generated Content Preview</CardTitle>
                  <CardDescription>
                    Review and edit the AI-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input 
                        value={generatedContent.companyName} 
                        onChange={(e) => setGeneratedContent({
                          ...generatedContent,
                          companyName: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Tagline</Label>
                      <Input 
                        value={generatedContent.tagline} 
                        onChange={(e) => setGeneratedContent({
                          ...generatedContent,
                          tagline: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={generatedContent.description} 
                        onChange={(e) => setGeneratedContent({
                          ...generatedContent,
                          description: e.target.value
                        })}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Generate content first to edit</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedContent ? (
            <IndustryThemeProvider industry={generatedContent.industry}>
              <div className="border rounded-lg p-6 bg-background">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Page Preview</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {generatedContent.pageStyle.designVariation}
                    </Badge>
                    <Badge variant="secondary">
                      {generatedContent.industry}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Hero Section */}
                  {sections.hero.enabled && (
                    <MagicCard className="p-8 text-center">
                      <h1 className="text-4xl font-bold mb-4">{generatedContent.companyName}</h1>
                      <p className="text-xl mb-6">{generatedContent.tagline}</p>
                      <p className="text-muted-foreground mb-8">{generatedContent.description}</p>
                      <Button size="lg" className="px-8">
                        {generatedContent.callToAction}
                      </Button>
                    </MagicCard>
                  )}

                  {/* Features Section */}
                  {sections.features.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {generatedContent.features.map((feature, index) => (
                        <MagicCard key={index} className="p-6">
                          <h3 className="font-semibold mb-2">Feature {index + 1}</h3>
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </MagicCard>
                      ))}
                    </div>
                  )}

                  {/* Benefits Section */}
                  {sections.benefits.enabled && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">Benefits</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedContent.benefits.map((benefit, index) => (
                          <MagicCard key={index} className="p-4">
                            <p className="text-sm">{benefit}</p>
                          </MagicCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Section */}
                  {sections.pricing.enabled && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">Pricing</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {generatedContent.pricing.map((plan, index) => (
                          <MagicCard key={index} className="p-6 text-center">
                            <h3 className="font-semibold mb-2">{plan.name}</h3>
                            <p className="text-2xl font-bold mb-4">{plan.price}</p>
                            <ul className="text-sm space-y-2">
                              {plan.features.map((feature, fIndex) => (
                                <li key={fIndex}>{feature}</li>
                              ))}
                            </ul>
                          </MagicCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ Section */}
                  {sections.faq.enabled && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">FAQ</h2>
                      <div className="space-y-4">
                        {generatedContent.faqs.map((faq, index) => (
                          <MagicCard key={index} className="p-6">
                            <h3 className="font-semibold mb-2">{faq.question}</h3>
                            <p className="text-sm text-muted-foreground">{faq.answer}</p>
                          </MagicCard>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Testimonials Section */}
                  {sections.testimonials.enabled && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {generatedContent.testimonials.map((testimonial, index) => (
                          <MagicCard key={index} className="p-6">
                            <p className="text-sm mb-4">"{testimonial.content}"</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                              </div>
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <span key={i} className="text-yellow-400">★</span>
                                ))}
                              </div>
                            </div>
                          </MagicCard>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </IndustryThemeProvider>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Generate content first to preview</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          {generatedContent ? (
            <Card>
              <CardHeader>
                <CardTitle>Publish Your Page</CardTitle>
                <CardDescription>
                  Export your page or copy the generated content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={copyToClipboard} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Content
                  </Button>
                  <Button onClick={downloadPage} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Page Summary</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Industry</p>
                      <p className="text-muted-foreground">{generatedContent.industry}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Design Variation</p>
                      <p className="text-muted-foreground">{generatedContent.pageStyle.designVariation}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Sections</p>
                      <p className="text-muted-foreground">
                        {Object.values(sections).filter(s => s.enabled).length} active
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Features</p>
                      <p className="text-muted-foreground">{generatedContent.features.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Generate content first to publish</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 