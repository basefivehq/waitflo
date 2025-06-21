"use client"
import { useState, useRef, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"

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

  const generateContent = (userPrompt: string): GeneratedContent => {
    // AI simulation - in real app, this would call an AI service
    const isEcommerce =
      userPrompt.toLowerCase().includes("shop") ||
      userPrompt.toLowerCase().includes("store") ||
      userPrompt.toLowerCase().includes("buy")
    const isSaaS =
      userPrompt.toLowerCase().includes("software") ||
      userPrompt.toLowerCase().includes("app") ||
      userPrompt.toLowerCase().includes("platform")
    const isFintech =
      userPrompt.toLowerCase().includes("finance") ||
      userPrompt.toLowerCase().includes("payment") ||
      userPrompt.toLowerCase().includes("money")

    let content: GeneratedContent

    if (isEcommerce) {
      content = {
        companyName: "ShopFlow",
        tagline: "The Future of Online Shopping",
        description:
          "Transform your shopping experience with our AI-powered platform that finds the best deals and products tailored just for you.",
        features: ["Smart Product Discovery", "Price Comparison", "Personalized Recommendations", "Secure Checkout"],
        benefits: ["Save up to 40% on purchases", "Find products 10x faster", "Never miss a deal again"],
        steps: [
          { title: "Browse Products", description: "Explore our curated collection of premium products" },
          { title: "Compare Prices", description: "Our AI finds the best deals across multiple stores" },
          { title: "Shop with Confidence", description: "Secure checkout with buyer protection guarantee" },
        ],
        faqs: [
          {
            question: "How does price comparison work?",
            answer: "Our AI scans thousands of retailers in real-time to find you the best prices.",
          },
          {
            question: "Is my payment information secure?",
            answer: "Yes, we use bank-level encryption to protect all your data.",
          },
          { question: "Can I return items?", answer: "We offer a 30-day return policy on all purchases." },
        ],
        pricing: [
          { name: "Basic", price: "Free", features: ["Basic search", "Price alerts", "5 saved items"] },
          {
            name: "Pro",
            price: "$9.99/mo",
            features: ["Advanced search", "Unlimited alerts", "Unlimited saves", "Priority support"],
          },
          {
            name: "Premium",
            price: "$19.99/mo",
            features: ["Everything in Pro", "Personal shopper", "Exclusive deals", "Early access"],
          },
        ],
      }
    } else if (isSaaS) {
      content = {
        companyName: "CloudSync",
        tagline: "Streamline Your Workflow",
        description:
          "The all-in-one productivity platform that helps teams collaborate, manage projects, and achieve more together.",
        features: ["Real-time Collaboration", "Project Management", "Time Tracking", "Advanced Analytics"],
        benefits: ["Increase productivity by 50%", "Reduce project delays", "Improve team communication"],
        steps: [
          { title: "Set Up Your Workspace", description: "Create your team workspace in under 2 minutes" },
          { title: "Invite Your Team", description: "Add team members and assign roles and permissions" },
          { title: "Start Collaborating", description: "Begin working together with powerful collaboration tools" },
        ],
        faqs: [
          {
            question: "How many team members can I add?",
            answer: "Our plans support from 5 to unlimited team members depending on your subscription.",
          },
          {
            question: "Is there a mobile app?",
            answer: "Yes, we have native iOS and Android apps with full feature parity.",
          },
          {
            question: "Can I integrate with other tools?",
            answer: "We support 100+ integrations including Slack, Google Workspace, and more.",
          },
        ],
        pricing: [
          {
            name: "Starter",
            price: "$12/user/mo",
            features: ["Up to 10 projects", "Basic reporting", "Email support"],
          },
          {
            name: "Professional",
            price: "$24/user/mo",
            features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"],
          },
          {
            name: "Enterprise",
            price: "Custom",
            features: ["Everything in Pro", "SSO", "Advanced security", "Dedicated manager"],
          },
        ],
      }
    } else if (isFintech) {
      content = {
        companyName: "PayFlow",
        tagline: "Smart Financial Management",
        description:
          "Take control of your finances with AI-powered insights, automated savings, and intelligent spending recommendations.",
        features: ["Expense Tracking", "Smart Budgeting", "Investment Insights", "Bill Management"],
        benefits: ["Save 25% more each month", "Reduce financial stress", "Build wealth automatically"],
        steps: [
          { title: "Connect Your Accounts", description: "Securely link your bank accounts and credit cards" },
          { title: "Set Your Goals", description: "Define your financial goals and let AI create a plan" },
          { title: "Watch Your Money Grow", description: "Track progress and receive personalized recommendations" },
        ],
        faqs: [
          {
            question: "Is my financial data secure?",
            answer: "We use 256-bit encryption and never store your banking credentials.",
          },
          {
            question: "How does automated saving work?",
            answer: "Our AI analyzes your spending patterns and automatically saves spare change and surplus funds.",
          },
          {
            question: "Can I cancel anytime?",
            answer: "Yes, you can cancel your subscription at any time with no penalties.",
          },
        ],
        pricing: [
          { name: "Basic", price: "Free", features: ["Expense tracking", "Basic budgeting", "Account linking"] },
          {
            name: "Plus",
            price: "$4.99/mo",
            features: ["Advanced analytics", "Goal setting", "Bill reminders", "Investment tracking"],
          },
          {
            name: "Premium",
            price: "$9.99/mo",
            features: ["Everything in Plus", "Personal advisor", "Tax optimization", "Priority support"],
          },
        ],
      }
    } else {
      // Generic/default content
      content = {
        companyName: "InnovateLab",
        tagline: "Innovation Made Simple",
        description:
          "Join thousands of forward-thinking individuals who are shaping the future. Be part of something extraordinary.",
        features: ["Cutting-edge Technology", "Expert Support", "Seamless Integration", "Advanced Security"],
        benefits: ["10x faster results", "Reduce costs by 60%", "24/7 expert support"],
        steps: [
          { title: "Get Started", description: "Sign up and complete your profile in minutes" },
          { title: "Customize", description: "Tailor the experience to your specific needs" },
          { title: "Launch", description: "Go live and start seeing results immediately" },
        ],
        faqs: [
          {
            question: "How quickly can I get started?",
            answer: "You can be up and running in less than 5 minutes with our quick setup process.",
          },
          {
            question: "Do you offer customer support?",
            answer: "Yes, we provide 24/7 customer support via chat, email, and phone.",
          },
          {
            question: "Is there a free trial?",
            answer: "We offer a 14-day free trial with full access to all features.",
          },
        ],
        pricing: [
          { name: "Starter", price: "$19/mo", features: ["Core features", "Email support", "Basic analytics"] },
          {
            name: "Professional",
            price: "$49/mo",
            features: ["Advanced features", "Priority support", "Advanced analytics", "Integrations"],
          },
          {
            name: "Enterprise",
            price: "$99/mo",
            features: ["Everything included", "Custom solutions", "Dedicated support", "SLA guarantee"],
          },
        ],
      }
    }

    return content
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const content = generateContent(prompt)
    setGeneratedContent(content)

    // Initialize edit data with generated content
    setEditData({
      logo: null,
      pageName: content.companyName,
      about: content.description,
      onboardingSteps: [
        { id: "1", question: "What's your primary goal?", answer: "Help users understand their main objective" },
        { id: "2", question: "How did you hear about us?", answer: "Track our marketing effectiveness" },
        { id: "3", question: "What's your company size?", answer: "Tailor the experience to their scale" },
      ],
      features: [...content.features],
      howItWorksSteps: content.steps.map((step, index) => ({
        id: (index + 1).toString(),
        title: step.title,
        description: step.description,
      })),
      benefits: [...content.benefits],
      pricing: content.pricing.map((plan, index) => ({
        id: (index + 1).toString(),
        name: plan.name,
        price: plan.price,
        features: [...plan.features],
      })),
      faqs: content.faqs.map((faq, index) => ({
        id: (index + 1).toString(),
        question: faq.question,
        answer: faq.answer,
      })),
      footer: {
        email: `hello@${content.companyName.toLowerCase()}.com`,
        phone: "+1 (555) 123-4567",
        address: "123 Innovation St, Tech City, TC 12345",
      },
    })

    // Generate components based on content
    const newComponents: ComponentData[] = [
      { id: "header", type: "Header", title: "Header Section", content, visible: false },
      { id: "hero", type: "Hero", title: "Hero Section", content, visible: false },
      { id: "features", type: "Features", title: "Features Grid", content, visible: false },
      { id: "how-it-works", type: "HowItWorks", title: "How It Works", content, visible: false },
      { id: "benefits", type: "Benefits", title: "Benefits Section", content, visible: false },
      { id: "pricing", type: "Pricing", title: "Pricing Table", content, visible: false },
      { id: "faq", type: "FAQ", title: "FAQ Section", content, visible: false },
      { id: "footer", type: "Footer", title: "Footer Section", content, visible: false },
    ]

    setComponents(newComponents)
    setCurrentStep("preview")
    setIsGenerating(false)

    // Animate components in with stagger
    newComponents.forEach((_, index) => {
      setTimeout(() => {
        setComponents((prev) => prev.map((comp, i) => (i === index ? { ...comp, visible: true } : comp)))
      }, index * 200)
    })
  }

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setEditData((prev) => ({ ...prev, logo: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) handleFileUpload(file)
  }

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
          {(editData.howItWorksSteps.length > 0 ? editData.howItWorksSteps : content.steps).map((step, index) => (
            <div key={index} className="flex items-center space-x-8">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-2">{"title" in step ? step.title : step.title}</h3>
                <p className="text-gray-300 text-lg">{"description" in step ? step.description : step.description}</p>
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
