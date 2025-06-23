'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Sparkles, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"

interface WaitlistBuilderProps {}

export function WaitlistBuilder({}: WaitlistBuilderProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPage, setGeneratedPage] = useState<any>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    try {
      const supabase = createSupabaseClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error("User not authenticated")
      }

      // Call the generate page API
      const response = await fetch('/api/generatePage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          userId: user.id
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate page')
      }

      const data = await response.json()
      
      if (data.success && data.data) {
        // Save the generated page to the database
        const { data: savedPage, error: saveError } = await supabase
          .from('pages')
          .insert([
            {
              user_id: user.id,
              title: data.data.companyName || 'Generated Page',
              slug: generateSlug(data.data.companyName || 'generated-page'),
              config: data.data,
              html: '', // Will be generated from config
              published: false
            }
          ])
          .select()
          .single()

        if (saveError) {
          throw new Error('Failed to save page to database')
        }

        setGeneratedPage(savedPage)
      } else {
        throw new Error('Failed to generate page content')
      }
      
    } catch (error) {
      console.error('Error generating page:', error)
      // You could add toast notification here
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Math.random().toString(36).substr(2, 9)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          AI-Powered Waitlist Builder
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Describe your waitlist page and let AI create a stunning, conversion-optimized landing page in seconds.
        </p>
      </div>

      {/* Prompt Box - Same as homepage */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative flex items-center bg-purple-900/50 border-2 border-purple-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <Input
                placeholder="Describe your waitlist page… (e.g., 'A SaaS tool for project management with a modern design')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI-Generated Content</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Intelligent copywriting that matches your brand voice and converts visitors into subscribers.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Conversion Optimized</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Proven design patterns and psychological triggers to maximize signup rates and engagement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-3">
                <ArrowRight className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Ready to Launch</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Fully functional pages with analytics, email collection, and referral tracking built-in.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Generated Page Preview */}
      {generatedPage && (
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              Page Generated Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Generated Page Details:</h4>
              <p className="text-gray-300 text-sm mb-2">
                <strong>Title:</strong> {generatedPage.title || 'Untitled'}
              </p>
              <p className="text-gray-300 text-sm mb-2">
                <strong>Slug:</strong> {generatedPage.slug || 'untitled'}
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Status:</strong> Draft
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <ArrowRight className="h-4 w-4 mr-2" />
                View Page
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                Edit Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">💡 Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Be specific:</strong> "A project management tool for remote teams" works better than "a tool"
              </p>
              <p className="text-gray-300">
                <strong>Include your target audience:</strong> "For designers and developers"
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Mention key features:</strong> "With AI-powered task automation"
              </p>
              <p className="text-gray-300">
                <strong>Add your brand style:</strong> "With a modern, minimalist design"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 