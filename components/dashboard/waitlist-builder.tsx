'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Sparkles, ArrowRight, CheckCircle, Loader2, Copy } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface WaitlistBuilderProps {}

export function WaitlistBuilder({}: WaitlistBuilderProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPage, setGeneratedPage] = useState<any>(null)
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiCode, setAiCode] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")
  const { toast } = useToast()

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

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiError("")
    setAiCode("")
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-coder-v2-instruct",
          messages: [
            { role: "system", content: "You are an expert code generator for waitlist landing pages. Output only code, no explanations." },
            { role: "user", content: aiPrompt }
          ],
          max_tokens: 512,
          temperature: 0.2,
        }),
      })
      if (!response.ok) throw new Error("Failed to generate code from AI")
      const data = await response.json()
      const code = data.choices?.[0]?.message?.content || ""
      setAiCode(code)
    } catch (err: any) {
      setAiError("Error generating code. Please try again.")
      toast({ title: "AI Error", description: err.message || String(err), variant: "destructive" })
    } finally {
      setAiLoading(false)
    }
  }

  const handleAICopy = () => {
    if (!aiCode) return
    navigator.clipboard.writeText(aiCode)
    toast({ title: "Copied!", description: "AI-generated code copied to clipboard." })
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

      {/* --- AI Code Generator Section --- */}
      <Card className="bg-[#1a1a2e] border-purple-800 mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Free AI Code Generator for Waitlist Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the code you want for your waitlist page (e.g., 'A React component for a waitlist signup form with email validation')"
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            className="bg-transparent border-gray-700 text-white placeholder:text-white/60 min-h-[80px]"
            disabled={aiLoading}
          />
          <Button
            onClick={handleAIGenerate}
            disabled={aiLoading || !aiPrompt.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3"
          >
            {aiLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : <>Generate Code</>}
          </Button>
          {aiError && <div className="text-red-400 text-sm">{aiError}</div>}
          {aiCode && (
            <div className="relative mt-4">
              <pre className="bg-gray-900 text-green-200 rounded-lg p-4 overflow-x-auto text-sm whitespace-pre-wrap">
                {aiCode}
              </pre>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={handleAICopy}
                aria-label="Copy code"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 