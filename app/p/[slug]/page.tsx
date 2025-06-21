'use client'

import { createSupabaseClient } from '@/lib/supabase/utils'
import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

interface OnboardingFlowProps {
  config: any
  pageId: number
}

const OnboardingFlow = ({ config, pageId }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onboardingSteps = config.onboardingSteps || [
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
      submitOnboardingResponses(newAnswers)
    }
  }

  const submitOnboardingResponses = async (finalAnswers: string[]) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('subscriber_email') || 'anonymous',
          pageId: pageId,
          answers: finalAnswers,
          questions: onboardingSteps.map((step: any) => step.question)
        }),
      })

      if (!response.ok) {
        console.error('Failed to submit onboarding responses')
      }
    } catch (error) {
      console.error('Error submitting onboarding responses:', error)
    } finally {
      setIsSubmitting(false)
    }
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

  if (isComplete) {
    return (
      <div className="text-center space-y-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h3 className="text-3xl font-bold text-white">Perfect! We've Got Your Info</h3>
        <p className="text-xl text-gray-300">
          Thanks for sharing your details. We'll use this information to personalize your experience and provide the best possible solution for your needs.
        </p>
        <div className="space-y-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg">
            Get Started Now
          </button>
          <p className="text-gray-400 text-sm">
            We'll be in touch within 24 hours with your personalized plan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
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
                <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
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
  )
}

export default function PublicPage({ params }: PageProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setSubscriptionStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          pageId: page?.id,
          pageSlug: params.slug
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionStatus('success')
        setEmail('')
        // Store email for onboarding flow
        localStorage.setItem('subscriber_email', email.trim())
      } else {
        setSubscriptionStatus('error')
        setErrorMessage(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      setSubscriptionStatus('error')
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fetch page data
  const [page, setPage] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      const supabase = createSupabaseClient(true)
      
      const { data: pageData } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

      if (!pageData) {
        notFound()
      }

      setPage(pageData)
      setLoading(false)
    }

    fetchPage()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const config = page.config

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-white">{config.companyName}</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
            <a href="#about" className="text-gray-300 hover:text-white">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">{config.tagline}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-3 rounded-lg"
              required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          {subscriptionStatus === 'success' && (
            <p className="text-green-400 text-sm">Successfully joined the waitlist!</p>
          )}
          {subscriptionStatus === 'error' && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}
        </div>
      </section>

      {/* Onboarding Flow Section */}
      {subscriptionStatus === 'success' && (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Let's Get Started</h2>
              <p className="text-xl text-gray-300">Help us understand your needs better</p>
            </div>

            <OnboardingFlow config={config} pageId={page.id} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300">Everything you need to succeed</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.features.map((feature: string, index: number) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center hover:bg-gray-800/70 transition-all">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                <p className="text-gray-400 text-sm">Advanced capabilities that drive results</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Get started in simple steps</p>
          </div>
          <div className="space-y-12">
            {config.steps.map((step: any, index: number) => (
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
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-300 mb-12">Join thousands who have transformed their experience</p>
          <div className="grid md:grid-cols-3 gap-8">
            {config.benefits.map((benefit: string, index: number) => (
              <div key={index} className="space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-300">Choose the plan that's right for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {config.pricing.map((plan: any, index: number) => (
              <div
                key={index}
                className={`bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center ${index === 1 ? "ring-2 ring-purple-500" : ""}`}
              >
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
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold ${index === 1 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {config.faqs.map((faq: any, index: number) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-white">{config.companyName}</span>
          </div>
          <p className="text-gray-400 mb-8">{config.description}</p>
          <div className="text-gray-500 text-sm">
            © 2024 {config.companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 