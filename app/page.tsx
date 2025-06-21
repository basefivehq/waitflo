"use client"
import { useState } from "react"
import { StarfieldBackground } from "@/components/starfield-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users, Mail, Quote } from "lucide-react"
import { Globe, BarChart3, Trophy, Code, Zap, Check } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f0f1a]/90 backdrop-blur-sm border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px:8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-white">Waitly</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                  Docs
                </Link>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-2">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarfieldBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Easiest Way to Launch a Viral Waitlist
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            AI-powered waitlist pages with referrals, analytics, and email flows — in seconds.
          </p>

          {/* Prompt Box */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center bg-purple-900/50 border-2 border-purple-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <Input
                placeholder="Describe your waitlist page…"
                className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
              />
              <Link href="/signup">
                <Button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200">
                  Generate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need to go viral</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Build, launch, and scale your waitlist with powerful features designed for growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-purple-700 border rounded-xl p-6 hover:bg-gray-750 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Search className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Custom Landing Pages</h3>
                </div>
                <p className="text-gray-300">
                  AI-generated landing pages that convert. Customize colors, copy, and components to match your brand
                  perfectly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700 border rounded-xl p-6 hover:bg-gray-750 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Referral Tracking</h3>
                </div>
                <p className="text-gray-300">
                  Built-in referral system with unique codes, leaderboards, and rewards to amplify your growth
                  exponentially.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700 border rounded-xl p-6 hover:bg-gray-750 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Mail className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Email Automation</h3>
                </div>
                <p className="text-gray-300">
                  Automated email sequences, launch notifications, and engagement campaigns to keep your audience
                  excited.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Gallery Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose from proven templates</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start with battle-tested designs that convert visitors into eager subscribers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Startup Launch",
                description: "Perfect for announcing your new startup",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "App Pre-Launch",
                description: "Build excitement for your mobile app",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "Product Hunt Campaign",
                description: "Maximize your Product Hunt launch",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                title: "E-commerce Drop",
                description: "Create buzz for product releases",
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((template, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-purple-700 border rounded-xl overflow-hidden hover:border-purple-500 transition-colors"
              >
                <div className="aspect-video bg-gray-700 relative">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Preview Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">See how it works in 30 seconds</h2>
          <p className="text-xl text-gray-300 mb-8">Watch how easy it is to create a viral waitlist with Waitflo</p>

          <div className="relative bg-gray-800 rounded-2xl p-8 border border-purple-700/30 mb-8">
            <div className="aspect-video bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-600/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-400">Demo Video Placeholder</p>
              </div>
            </div>
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-8 py-3 text-lg">
            Try It Now
          </Button>
        </div>
      </section>

      {/* Feature Breakdown Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced features for growth</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to scale your waitlist and convert signups into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Globe,
                title: "Custom Domains",
                description: "Use your own domain for a professional branded experience that builds trust.",
              },
              {
                icon: Mail,
                title: "Email Automations",
                description: "Drip campaigns, welcome sequences, and launch notifications on autopilot.",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Track signups, conversion rates, referral performance, and user engagement.",
              },
              {
                icon: Trophy,
                title: "Referral Leaderboard",
                description: "Gamify your waitlist with public leaderboards and milestone rewards.",
              },
              {
                icon: Code,
                title: "Embeddable Widget",
                description: "Add waitlist signup forms to any website with our lightweight widget.",
              },
              {
                icon: Zap,
                title: "Developer API",
                description: "Full REST API access for custom integrations and advanced workflows.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-purple-700 border rounded-xl p-6 hover:bg-gray-750 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <feature.icon className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Metrics Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <div className="text-5xl font-bold text-white mb-2">3,200+</div>
              <div className="text-xl text-gray-300">Waitlists Created</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">180,000+</div>
              <div className="text-xl text-gray-300">Early Access Signups</div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-400 mb-8">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-24 h-12 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Logo {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-300 mb-8">Choose the plan that fits your needs</p>

            <div className="flex items-center justify-center mb-8">
              <span className={`text-gray-300 mr-3 ${!isYearly ? "text-white font-semibold" : ""}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-12 h-6 bg-gray-600 rounded-full shadow-inner transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 transition-transform duration-200 ${
                    isYearly ? "translate-x-7" : "translate-x-1"
                  }`}
                ></div>
              </button>
              <span className={`text-gray-300 ml-3 ${isYearly ? "text-white font-semibold" : ""}`}>Yearly</span>
              <span className="ml-2 text-sm bg-purple-600 text-white px-2 py-1 rounded">Save 20%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(() => {
              const plans = [
                {
                  name: "Free",
                  monthlyPrice: 0,
                  yearlyPrice: 0,
                  description: "Perfect for getting started",
                  features: ["1 waitlist page", "Up to 100 signups", "Basic email notifications", "Waitflo branding"],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  name: "Pro",
                  monthlyPrice: 29,
                  yearlyPrice: 23, // 20% discount
                  description: "For growing businesses",
                  features: [
                    "Unlimited waitlist pages",
                    "Unlimited signups",
                    "Custom domains",
                    "Email automations",
                    "Analytics dashboard",
                    "Referral tracking",
                    "Remove branding",
                  ],
                  cta: "Start Free Trial",
                  popular: true,
                },
                {
                  name: "Agency",
                  monthlyPrice: 99,
                  yearlyPrice: 79, // 20% discount
                  description: "For agencies and enterprises",
                  features: [
                    "Everything in Pro",
                    "White-label solution",
                    "API access",
                    "Priority support",
                    "Custom integrations",
                    "Dedicated account manager",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ]

              return plans.map((plan, index) => {
                const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice
                const period = isYearly ? "/year" : "/month"

                return (
                  <Card
                    key={index}
                    className={`relative bg-gray-800 rounded-xl p-6 ${plan.popular ? "border-2 border-purple-500" : "border border-purple-700"}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardContent className="p-0">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline justify-center mb-2">
                          <span className="text-4xl font-bold text-white">${currentPrice}</span>
                          <span className="text-gray-400 ml-1">{period}</span>
                        </div>
                        {isYearly && plan.monthlyPrice > 0 && (
                          <div className="text-sm text-gray-400 line-through">${plan.monthlyPrice}/month</div>
                        )}
                        <p className="text-gray-400 mt-2">{plan.description}</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <Check className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link href="/signup">
                        <Button
                          className={`w-full rounded-lg ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })
            })()}
          </div>
        </div>
      </section>

      {/* Developer/API Teaser Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Built for developers</h2>
              <p className="text-xl text-gray-300 mb-8">
                Use our API or webhooks to build custom flows. Integrate Waitflo into your existing stack with ease.
              </p>
              <Link href="/docs">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3">
                  View Docs
                </Button>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-purple-700/30">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400 text-sm">waitflo-api.js</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`// Add a subscriber to your waitlist
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    referralCode: 'FRIEND123'
  })
});

const data = await response.json();
console.log(data.position); // Queue position`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently asked questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about Waitflo</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How quickly can I set up a waitlist?",
                answer:
                  "You can have a fully functional waitlist page live in under 5 minutes. Just describe what you want, and our AI will generate a custom page for you.",
              },
              {
                question: "Can I use my own domain?",
                answer:
                  "Yes! Pro and Agency plans include custom domain support. You can use your own domain or subdomain for a fully branded experience.",
              },
              {
                question: "How does the referral system work?",
                answer:
                  "Each subscriber gets a unique referral link. When someone signs up using their link, both the referrer and referee move up in the queue. You can customize rewards and milestones.",
              },
              {
                question: "What integrations do you support?",
                answer:
                  "We integrate with popular email platforms (Mailchimp, ConvertKit, etc.), analytics tools, and have a full REST API for custom integrations.",
              },
              {
                question: "Is there a limit on subscribers?",
                answer:
                  "The Free plan supports up to 100 subscribers. Pro and Agency plans have unlimited subscribers with advanced features and analytics.",
              },
              {
                question: "Can I export my subscriber data?",
                answer:
                  "Absolutely! You can export your subscriber list as CSV at any time. You own your data and can take it with you if needed.",
              },
            ].map((faq, index) => (
              <details key={index} className="bg-gray-800/50 rounded-xl border border-purple-700/30">
                <summary className="p-6 cursor-pointer text-white font-semibold hover:bg-gray-800/70 rounded-xl transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to launch your waitlist?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of founders who've built viral waitlists with Waitflo
          </p>
          <Link href="/signup">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-8 py-4 text-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by founders worldwide</h2>
            <p className="text-xl text-gray-300">See what our customers are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Waitly helped us get 10,000 signups in our first week. The referral system is incredible!",
                author: "Sarah Chen",
                title: "Founder, TechStart",
              },
              {
                quote:
                  "The AI-generated landing page converted 40% better than our custom design. Mind-blowing results.",
                author: "Marcus Rodriguez",
                title: "CEO, GrowthLab",
              },
              {
                quote: "Setup took 5 minutes. We launched our waitlist the same day and haven't looked back since.",
                author: "Emily Watson",
                title: "Product Manager, InnovateCo",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30">
                <Quote className="h-8 w-8 text-purple-400 mb-4" />
                <p className="text-white mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-white mb-4 md:mb-0">Waitly</div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Docs
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400">© 2024 Waitly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
