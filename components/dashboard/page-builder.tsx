"use client"
import { useState, useRef, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/utils"

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

export function PageBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>("prompt")
  const [editStep, setEditStep] = useState(1)
  const [prompt, setPrompt] = useState("")
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

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generatePage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const content = await response.json()
      setGeneratedContent(content)

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
              user_id: user.id,
              title: content.companyName,
              slug: slug,
              config: content,
            })
            .select()
            .single()

          if (error) throw error

          if (newPage) {
            setNewPageId(newPage.id)
            setCurrentStep("preview")
          }
      }

    } catch (error) {
      console.error(error)
      // Handle error state in UI
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) handleFileUpload(file)
  }

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setEditData((prev) => ({ ...prev, logo: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }, [])

  const addOnboardingStep = () => {
    const newStep = {
      id: Date.now().toString(),
      question: "",
      answer: "",
    }
    setEditData((prev) => ({
      ...prev,
      onboardingSteps: [...prev.onboardingSteps, newStep],
    }))
  }

  const removeOnboardingStep = (id: string) => {
    setEditData((prev) => ({
      ...prev,
      onboardingSteps: prev.onboardingSteps.filter((step) => step.id !== id),
    }))
  }

  const updateOnboardingStep = (id: string, field: "question" | "answer", value: string) => {
    setEditData((prev) => ({
      ...prev,
      onboardingSteps: prev.onboardingSteps.map((step) => (step.id === id ? { ...step, [field]: value } : step)),
    }))
  }

  const addFeature = () => {
    setEditData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const addHowItWorksStep = () => {
    const newStep = {
      id: Date.now().toString(),
      title: "",
      description: "",
    }
    setEditData((prev) => ({
      ...prev,
      howItWorksSteps: [...prev.howItWorksSteps, newStep],
    }))
  }

  const removeHowItWorksStep = (id: string) => {
    setEditData((prev) => ({
      ...prev,
      howItWorksSteps: prev.howItWorksSteps.filter((step) => step.id !== id),
    }))
  }

  const updateHowItWorksStep = (id: string, field: "title" | "description", value: string) => {
    setEditData((prev) => ({
      ...prev,
      howItWorksSteps: prev.howItWorksSteps.map((step) => (step.id === id ? { ...step, [field]: value } : step)),
    }))
  }

  const addBenefit = () => {
    setEditData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const removeBenefit = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => (i === index ? value : benefit)),
    }))
  }

  const addPricingPlan = () => {
    const newPlan = {
      id: Date.now().toString(),
      name: "",
      price: "",
      features: [""],
    }
    setEditData((prev) => ({
      ...prev,
      pricing: [...prev.pricing, newPlan],
    }))
  }

  const removePricingPlan = (id: string) => {
    setEditData((prev) => ({
      ...prev,
      pricing: prev.pricing.filter((plan) => plan.id !== id),
    }))
  }

  const updatePricingPlan = (id: string, field: "name" | "price", value: string) => {
    setEditData((prev) => ({
      ...prev,
      pricing: prev.pricing.map((plan) => (plan.id === id ? { ...plan, [field]: value } : plan)),
    }))
  }

  const addPricingFeature = (planId: string) => {
    setEditData((prev) => ({
      ...prev,
      pricing: prev.pricing.map((plan) => (plan.id === planId ? { ...plan, features: [...plan.features, ""] } : plan)),
    }))
  }

  const removePricingFeature = (planId: string, featureIndex: number) => {
    setEditData((prev) => ({
      ...prev,
      pricing: prev.pricing.map((plan) =>
        plan.id === planId ? { ...plan, features: plan.features.filter((_, i) => i !== featureIndex) } : plan,
      ),
    }))
  }

  const updatePricingFeature = (planId: string, featureIndex: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      pricing: prev.pricing.map((plan) =>
        plan.id === planId
          ? { ...plan, features: plan.features.map((feature, i) => (i === featureIndex ? value : feature)) }
          : plan,
      ),
    }))
  }

  const addFAQ = () => {
    const newFAQ = {
      id: Date.now().toString(),
      question: "",
      answer: "",
    }
    setEditData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ],
    }))
  }

  const removeFAQ = (id: string) => {
    setEditData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== id),
    }))
  }

  const updateFAQ = (id: string, field: "question" | "answer", value: string) => {
    setEditData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    }))
  }

  const nextEditStep = () => {
    if (editStep < 10) {
      setEditStep(editStep + 1)
    } else {
      setCurrentStep("final-preview")
    }
  }

  const prevEditStep = () => {
    if (editStep > 1) {
      setEditStep(editStep - 1)
    } else {
      setCurrentStep("preview")
    }
  }

  const handlePublish = () => {
    setCurrentStep("publish")
  }

  const copyLink = () => {
    navigator.clipboard.writeText("https://waitly.com/p/your-page-name")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const HeaderComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {editData.logo ? (
            <img src={editData.logo || "/placeholder.svg"} alt="Logo" className="w-8 h-8 rounded-lg" />
          ) : (
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          )}
          <span className="text-xl font-bold text-white">{editData.pageName || content.companyName}</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Pricing
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
        </nav>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
      </div>
    </div>
  )

  const HeroComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">{content.tagline}</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {editData.about || content.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">
            Join Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>10,000+ users</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>
    </div>
  )

  const FeaturesComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300">Everything you need to succeed</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(editData.features.length > 0 ? editData.features : content.features).map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                <p className="text-gray-400 text-sm">Advanced capabilities that drive results</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const HowItWorksComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300">Get started in simple steps</p>
        </div>
        <div className="space-y-12">
          {(editData.howItWorksSteps.length > 0 ? editData.howItWorksSteps : content.steps).map((step: any, index) => (
            <div key={index} className="flex items-center space-x-8">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const BenefitsComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
        <p className="text-xl text-gray-300 mb-12">Join thousands who have transformed their experience</p>
        <div className="grid md:grid-cols-3 gap-8">
          {(editData.benefits.length > 0 ? editData.benefits : content.benefits).map((benefit, index) => (
            <div key={index} className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{benefit}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const PricingComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
          <p className="text-xl text-gray-300">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {(editData.pricing.length > 0 ? editData.pricing : content.pricing).map((plan, index) => (
            <Card
              key={index}
              className={`bg-gray-800/50 border-gray-700 ${index === 1 ? "ring-2 ring-purple-500" : ""}`}
            >
              <CardContent className="p-8 text-center">
                {index === 1 && (
                  <div className="bg-purple-600 text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-lg text-gray-400">/month</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${index === 1 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const FAQComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">Everything you need to know</p>
        </div>
        <div className="space-y-4">
          {(editData.faqs.length > 0 ? editData.faqs : content.faqs).map((faq, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-800/70 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const OnboardingComponent = ({ content }: { content: GeneratedContent }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<string[]>([])
    const [isComplete, setIsComplete] = useState(false)

    const onboardingSteps = content.onboardingSteps || [
      { question: "What's your primary goal?", answer: "Help us understand what you want to achieve" },
      { question: "What's your timeline?", answer: "When do you need results?" },
      { question: "What's your budget range?", answer: "This helps us recommend the right solution" }
    ]

    const handleAnswer = (answer: string) => {
      const newAnswers = [...answers]
      newAnswers[currentStep] = answer
      setAnswers(newAnswers)

      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsComplete(true)
      }
    }

    const handleSubmit = () => {
      // Here you would typically send the answers to your backend
      console.log('Onboarding answers:', answers)
      // You could show a success message or redirect
    }

    if (isComplete) {
      return (
        <div className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Perfect! We've Got Your Info</h2>
            <p className="text-xl text-gray-300">
              Thanks for sharing your details. We'll use this information to personalize your experience and provide the best possible solution for your needs.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                Get Started Now
              </Button>
              <p className="text-gray-400 text-sm">
                We'll be in touch within 24 hours with your personalized plan.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Get Started</h2>
            <p className="text-xl text-gray-300">Help us understand your needs better</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Step {currentStep + 1} of {onboardingSteps.length}</span>
              <span className="text-sm text-gray-400">{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                {onboardingSteps[currentStep].question}
              </h3>
              <p className="text-gray-300 text-lg">
                {onboardingSteps[currentStep].answer}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              {getAnswerOptions(onboardingSteps[currentStep].question).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-6 text-left bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-lg">{option}</span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* Skip Option */}
            <div className="text-center">
              <button
                onClick={() => handleAnswer("Skip")}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Skip this question
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getAnswerOptions = (question: string) => {
    const questionLower = question.toLowerCase()
    
    if (questionLower.includes('use case') || questionLower.includes('goal')) {
      return [
        "Increase efficiency and productivity",
        "Reduce costs and save money", 
        "Improve customer experience",
        "Scale and grow the business",
        "Solve a specific problem"
      ]
    } else if (questionLower.includes('team size')) {
      return [
        "Just me (1 person)",
        "Small team (2-10 people)",
        "Medium team (11-50 people)",
        "Large team (50+ people)",
        "Enterprise (100+ people)"
      ]
    } else if (questionLower.includes('timeline')) {
      return [
        "ASAP - within a week",
        "Soon - within a month",
        "Flexible - within 3 months",
        "Long-term - 6+ months",
        "No specific timeline"
      ]
    } else if (questionLower.includes('budget')) {
      return [
        "Under $100",
        "$100 - $500",
        "$500 - $2,000",
        "$2,000 - $10,000",
        "$10,000+"
      ]
    } else if (questionLower.includes('primary goal')) {
      return [
        "Save time and automate tasks",
        "Generate more leads and sales",
        "Improve team collaboration",
        "Enhance customer satisfaction",
        "Reduce operational costs"
      ]
    } else {
      return [
        "Yes, absolutely",
        "Yes, but I'm not sure",
        "Maybe, I need more info",
        "No, not right now",
        "I'll decide later"
      ]
    }
  }

  const FooterComponent = ({ content }: { content: GeneratedContent }) => (
    <div className="bg-gray-900 py-16 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {editData.logo ? (
                <img src={editData.logo || "/placeholder.svg"} alt="Logo" className="w-8 h-8 rounded-lg" />
              ) : (
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              )}
              <span className="text-xl font-bold text-white">{editData.pageName || content.companyName}</span>
            </div>
            <p className="text-gray-400">{editData.about || content.description}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{editData.footer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{editData.footer.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {editData.pageName || content.companyName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  )

  const renderComponent = (component: ComponentData) => {
    if (!component.visible || !generatedContent) return null

    const componentMap = {
      Header: HeaderComponent,
      Hero: HeroComponent,
      Features: FeaturesComponent,
      HowItWorks: HowItWorksComponent,
      Benefits: BenefitsComponent,
      Pricing: PricingComponent,
      FAQ: FAQComponent,
      Footer: FooterComponent,
      Onboarding: OnboardingComponent,
    }

    const Component = componentMap[component.type as keyof typeof componentMap]
    if (!Component) return null

    return (
      <div
        key={component.id}
        className={`transition-all duration-500 ${component.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="relative">
          <div className="absolute -top-2 left-4 z-10">
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {component.title}
            </span>
          </div>
          <Component content={generatedContent} />
        </div>
      </div>
    )
  }

  // Step 1: Prompt Entry
  if (currentStep === "prompt") {
    return (
      <div className="space-y-8">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-white">AI Landing Page Builder</h1>
                <p className="text-gray-400">
                  Describe your product or service, and watch AI create a complete landing page
                </p>
              </div>

              <div className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your product or service... (e.g., 'A SaaS platform for team collaboration', 'An e-commerce store for handmade jewelry', 'A fintech app for personal budgeting')"
                  className="w-full h-32 text-lg bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 rounded-xl p-6 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

                <div className="text-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Landing Page
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 2: Live Preview
  if (currentStep === "preview") {
    return (
      <div className="space-y-8">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-0">
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Live Preview</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Globe className="h-4 w-4" />
                  <span>Generated Landing Page</span>
                </div>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto">
              <div className="space-y-0">{components.map(renderComponent)}</div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setCurrentStep("edit")}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-purple-500/25"
          >
            Edit Page
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  // Step 3: Edit Form Wizard
  if (currentStep === "edit") {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Customize Your Page</h1>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${step <= editStep ? "bg-purple-600" : "bg-gray-600"}`}
              />
            ))}
          </div>
          <p className="text-gray-400">Step {editStep} of 10</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 max-w-4xl mx-auto">
          <CardContent className="p-8">
            {editStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Upload Your Logo</h2>
                  <p className="text-gray-400">Add your brand logo to personalize your page</p>
                </div>

                <div className="space-y-4">
                  {editData.logo && (
                    <div className="flex justify-center">
                      <img
                        src={editData.logo || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
                      />
                    </div>
                  )}

                  <div
                    className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium">Click to upload logo</p>
                    <p className="text-gray-400 text-sm">PNG, JPG up to 2MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {editStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Set Page Name</h2>
                  <p className="text-gray-400">What should we call your company or product?</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Page Title</Label>
                  <Input
                    value={editData.pageName}
                    onChange={(e) => setEditData((prev) => ({ ...prev, pageName: e.target.value }))}
                    placeholder="Your Company Name"
                    className="bg-gray-800 border-gray-700 text-white text-lg p-4"
                  />
                </div>
              </div>
            )}

            {editStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">About Section</h2>
                  <p className="text-gray-400">Describe what makes your product or service special</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={editData.about}
                    onChange={(e) => setEditData((prev) => ({ ...prev, about: e.target.value }))}
                    placeholder="Tell visitors about your amazing product or service..."
                    rows={5}
                    className="bg-gray-800 border-gray-700 text-white resize-none"
                  />
                </div>
              </div>
            )}

            {editStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Onboarding Questions</h2>
                  <p className="text-gray-400">Create questions to learn about your users</p>
                </div>

                <div className="space-y-4">
                  {editData.onboardingSteps.map((step, index) => (
                    <div key={step.id} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Question {index + 1}</Label>
                        {editData.onboardingSteps.length > 1 && (
                          <Button
                            onClick={() => removeOnboardingStep(step.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={step.question}
                        onChange={(e) => updateOnboardingStep(step.id, "question", e.target.value)}
                        placeholder="What question do you want to ask?"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Textarea
                        value={step.answer}
                        onChange={(e) => updateOnboardingStep(step.id, "answer", e.target.value)}
                        placeholder="Why is this question important? (internal note)"
                        rows={2}
                        className="bg-gray-800 border-gray-700 text-white resize-none"
                      />
                    </div>
                  ))}

                  <Button
                    onClick={addOnboardingStep}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Question
                  </Button>
                </div>
              </div>
            )}

            {editStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Powerful Features</h2>
                  <p className="text-gray-400">Edit your product features</p>
                </div>

                <div className="space-y-4">
                  {editData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Feature name"
                        className="bg-gray-800 border-gray-700 text-white flex-1"
                      />
                      {editData.features.length > 1 && (
                        <Button
                          onClick={() => removeFeature(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={addFeature}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>
            )}

            {editStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
                  <p className="text-gray-400">Edit your process steps</p>
                </div>

                <div className="space-y-4">
                  {editData.howItWorksSteps.map((step, index) => (
                    <div key={step.id} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Step {index + 1}</Label>
                        {editData.howItWorksSteps.length > 1 && (
                          <Button
                            onClick={() => removeHowItWorksStep(step.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={step.title}
                        onChange={(e) => updateHowItWorksStep(step.id, "title", e.target.value)}
                        placeholder="Step title"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateHowItWorksStep(step.id, "description", e.target.value)}
                        placeholder="Step description"
                        rows={2}
                        className="bg-gray-800 border-gray-700 text-white resize-none"
                      />
                    </div>
                  ))}

                  <Button
                    onClick={addHowItWorksStep}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Step
                  </Button>
                </div>
              </div>
            )}

            {editStep === 7 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Why Choose Us?</h2>
                  <p className="text-gray-400">Edit your key benefits</p>
                </div>

                <div className="space-y-4">
                  {editData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        placeholder="Benefit description"
                        className="bg-gray-800 border-gray-700 text-white flex-1"
                      />
                      {editData.benefits.length > 1 && (
                        <Button
                          onClick={() => removeBenefit(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={addBenefit}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Benefit
                  </Button>
                </div>
              </div>
            )}

            {editStep === 8 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Simple Pricing</h2>
                  <p className="text-gray-400">Edit your pricing plans</p>
                </div>

                <div className="space-y-6">
                  {editData.pricing.map((plan, planIndex) => (
                    <div key={plan.id} className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Plan {planIndex + 1}</Label>
                        {editData.pricing.length > 1 && (
                          <Button
                            onClick={() => removePricingPlan(plan.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 text-sm">Plan Name</Label>
                          <Input
                            value={plan.name}
                            onChange={(e) => updatePricingPlan(plan.id, "name", e.target.value)}
                            placeholder="Plan name"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 text-sm">Price</Label>
                          <Input
                            value={plan.price}
                            onChange={(e) => updatePricingPlan(plan.id, "price", e.target.value)}
                            placeholder="$19/mo"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-300 text-sm">Features</Label>
                        <div className="space-y-2 mt-2">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <Input
                                value={feature}
                                onChange={(e) => updatePricingFeature(plan.id, featureIndex, e.target.value)}
                                placeholder="Feature description"
                                className="bg-gray-800 border-gray-700 text-white flex-1"
                              />
                              {plan.features.length > 1 && (
                                <Button
                                  onClick={() => removePricingFeature(plan.id, featureIndex)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            onClick={() => addPricingFeature(plan.id)}
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={addPricingPlan}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Pricing Plan
                  </Button>
                </div>
              </div>
            )}

            {editStep === 9 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
                  <p className="text-gray-400">Edit your FAQ section</p>
                </div>

                <div className="space-y-4">
                  {editData.faqs.map((faq, index) => (
                    <div key={faq.id} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">FAQ {index + 1}</Label>
                        {editData.faqs.length > 1 && (
                          <Button
                            onClick={() => removeFAQ(faq.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                        placeholder="Question"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                        placeholder="Answer"
                        rows={3}
                        className="bg-gray-800 border-gray-700 text-white resize-none"
                      />
                    </div>
                  ))}

                  <Button
                    onClick={addFAQ}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add FAQ
                  </Button>
                </div>
              </div>
            )}

            {editStep === 10 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Footer Section</h2>
                  <p className="text-gray-400">Edit your contact information</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Email Address</Label>
                    <Input
                      value={editData.footer.email}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, footer: { ...prev.footer, email: e.target.value } }))
                      }
                      placeholder="hello@company.com"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Phone Number</Label>
                    <Input
                      value={editData.footer.phone}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, footer: { ...prev.footer, phone: e.target.value } }))
                      }
                      placeholder="+1 (555) 123-4567"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Address (Optional)</Label>
                    <Textarea
                      value={editData.footer.address}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, footer: { ...prev.footer, address: e.target.value } }))
                      }
                      placeholder="123 Innovation St, Tech City, TC 12345"
                      rows={2}
                      className="bg-gray-800 border-gray-700 text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={prevEditStep}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {editStep === 1 ? "Back to Preview" : "Previous"}
          </Button>
          <Button onClick={nextEditStep} className="bg-purple-600 hover:bg-purple-700 text-white px-8">
            {editStep === 10 ? "Preview Changes" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Step 4: Final Preview
  if (currentStep === "final-preview") {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Final Preview</h1>
          <p className="text-gray-400">Review your customized page before publishing</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-0">
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Updated Preview</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Globe className="h-4 w-4" />
                  <span>With Your Customizations</span>
                </div>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto">
              <div className="space-y-0">{components.map(renderComponent)}</div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setCurrentStep("edit")}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Edit
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25"
          >
            <Globe className="mr-2 h-5 w-5" />
            Publish Page
          </Button>
        </div>
      </div>
    )
  }

  // Step 5: Publish Success
  if (currentStep === "publish") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Your page is live! 🎉</h1>
          <p className="text-xl text-gray-300">Your customized waitlist page has been successfully published</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 max-w-md w-full">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <Label className="text-gray-300 text-sm">Your page URL:</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  value="https://waitly.com/p/your-page-name"
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
                <Button onClick={copyLink} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              {linkCopied && <p className="text-green-400 text-sm mt-2">Link copied to clipboard!</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button
            onClick={() => window.open("https://waitly.com/p/your-page-name", "_blank")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Live Page
          </Button>
          <Button
            onClick={() => {
              setCurrentStep("prompt")
              setEditStep(1)
              setPrompt("")
              setComponents([])
              setGeneratedContent(null)
              setEditData({
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
            }}
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
          >
            Create Another Page
          </Button>
        </div>
      </div>
    )
  }

  return null
}
