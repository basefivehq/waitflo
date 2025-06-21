"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Book,
  Code,
  Zap,
  Users,
  Mail,
  BarChart3,
  Settings,
  ChevronRight,
  Copy,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", id: "quick-start", icon: Zap },
      { title: "Authentication", id: "authentication", icon: Settings },
      { title: "Your First Waitlist", id: "first-waitlist", icon: Users },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Overview", id: "api-overview", icon: Code },
      { title: "Waitlists", id: "api-waitlists", icon: Users },
      { title: "Subscribers", id: "api-subscribers", icon: Mail },
      { title: "Analytics", id: "api-analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Referral System", id: "referrals", icon: Users },
      { title: "Email Automation", id: "email-automation", icon: Mail },
      { title: "Custom Domains", id: "custom-domains", icon: Settings },
      { title: "Webhooks", id: "webhooks", icon: Zap },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quick-start")
  const [searchQuery, setSearchQuery] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "quick-start":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Quick Start Guide</h1>
              <p className="text-xl text-gray-300 mb-8">Get up and running with Waitly in just a few minutes.</p>
            </div>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-400" />
                  1. Create Your Account
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">Sign up for a free Waitly account to get started:</p>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <code className="text-green-400">https://waitly.com/signup</code>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  2. Create Your First Waitlist
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">Use our AI-powered page builder or choose from templates:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Describe your product in the prompt box</li>
                  <li>Customize colors, copy, and components</li>
                  <li>Add your logo and branding</li>
                  <li>Publish and start collecting signups</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  3. Track Your Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Monitor your waitlist performance with our analytics dashboard:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Real-time signup tracking</li>
                  <li>Referral performance metrics</li>
                  <li>Conversion rate analysis</li>
                  <li>Email engagement stats</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )

      case "api-overview":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">API Overview</h1>
              <p className="text-xl text-gray-300 mb-8">
                The Waitly API allows you to programmatically manage your waitlists and subscribers.
              </p>
            </div>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white">Base URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                  <code className="text-green-400">https://api.waitly.com/v1</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard("https://api.waitly.com/v1")}
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white">Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">All API requests require authentication using your API key:</p>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.waitly.com/v1/waitlists`}
                  </pre>
                </div>
                <p className="text-gray-400 text-sm">
                  Get your API key from the{" "}
                  <Link href="/dashboard/api-keys" className="text-purple-400 hover:text-purple-300">
                    API Keys
                  </Link>{" "}
                  section in your dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white">Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">1000</div>
                    <div className="text-gray-300 text-sm">Requests per hour</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">100</div>
                    <div className="text-gray-300 text-sm">Requests per minute</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">10</div>
                    <div className="text-gray-300 text-sm">Requests per second</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "api-waitlists":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Waitlists API</h1>
              <p className="text-xl text-gray-300 mb-8">Manage your waitlist pages programmatically.</p>
            </div>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                  List Waitlists
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <code className="text-green-400">GET /waitlists</code>
                </div>
                <p className="text-gray-300">Retrieve all waitlists for your account.</p>

                <div>
                  <h4 className="text-white font-semibold mb-2">Example Response:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`{
  "data": [
    {
      "id": "wl_123456789",
      "name": "Product Launch Waitlist",
      "slug": "product-launch",
      "status": "active",
      "subscribers_count": 1247,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:22:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 1
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-mono mr-3">POST</span>
                  Create Waitlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <code className="text-green-400">POST /waitlists</code>
                </div>
                <p className="text-gray-300">Create a new waitlist page.</p>

                <div>
                  <h4 className="text-white font-semibold mb-2">Request Body:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`{
  "name": "New Product Launch",
  "slug": "new-product-launch",
  "description": "Get early access to our revolutionary new product",
  "settings": {
    "referral_enabled": true,
    "email_notifications": true,
    "custom_domain": "launch.mycompany.com"
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "api-subscribers":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Subscribers API</h1>
              <p className="text-xl text-gray-300 mb-8">Manage waitlist subscribers and their data.</p>
            </div>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-mono mr-3">POST</span>
                  Add Subscriber
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <code className="text-green-400">POST /waitlists/{`{waitlist_id}`}/subscribers</code>
                </div>
                <p className="text-gray-300">Add a new subscriber to a waitlist.</p>

                <div>
                  <h4 className="text-white font-semibold mb-2">Request Body:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`{
  "email": "user@example.com",
  "name": "John Doe",
  "referral_code": "FRIEND123",
  "metadata": {
    "source": "landing_page",
    "utm_campaign": "launch_2024"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Example Response:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`{
  "id": "sub_987654321",
  "email": "user@example.com",
  "name": "John Doe",
  "position": 1248,
  "referral_code": "USER123",
  "referred_by": "FRIEND123",
  "referral_count": 0,
  "status": "active",
  "created_at": "2024-01-20T15:30:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "webhooks":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Webhooks</h1>
              <p className="text-xl text-gray-300 mb-8">
                Receive real-time notifications when events occur in your waitlists.
              </p>
            </div>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white">Supported Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <code className="text-sm">subscriber.created</code>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <code className="text-sm">subscriber.updated</code>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <code className="text-sm">referral.completed</code>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <code className="text-sm">waitlist.launched</code>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      <code className="text-sm">waitlist.paused</code>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <code className="text-sm">milestone.reached</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-purple-700/30">
              <CardHeader>
                <CardTitle className="text-white">Webhook Payload Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {`{
  "event": "subscriber.created",
  "timestamp": "2024-01-20T15:30:00Z",
  "data": {
    "subscriber": {
      "id": "sub_987654321",
      "email": "user@example.com",
      "name": "John Doe",
      "position": 1248,
      "waitlist_id": "wl_123456789"
    }
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Section Not Found</h2>
            <p className="text-gray-400">The requested documentation section could not be found.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f0f1a]/90 backdrop-blur-sm border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white">
                Waitly
              </Link>
              <span className="ml-4 text-gray-400">/</span>
              <span className="ml-4 text-gray-300">Documentation</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {sidebarSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                              activeSection === item.id
                                ? "bg-purple-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none">{renderContent()}</div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
              <div className="text-gray-400 text-sm">
                Need help?{" "}
                <Link href="mailto:support@waitly.com" className="text-purple-400 hover:text-purple-300">
                  Contact Support
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://github.com/waitly/examples"
                  className="flex items-center text-gray-400 hover:text-white text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Examples
                </Link>
                <Link href="/dashboard" className="flex items-center text-purple-400 hover:text-purple-300 text-sm">
                  Dashboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
