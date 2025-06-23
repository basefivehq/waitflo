'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Sparkles, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { WaitlistPagePreview } from "@/components/dashboard/WaitlistPagePreview"

interface WaitlistBuilderProps {}

export function WaitlistBuilder({}: WaitlistBuilderProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPage, setGeneratedPage] = useState<any>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<any>(null)
  const [publishing, setPublishing] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      // 1. Call OpenRouter AI
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          // Provide your OpenRouter API key in .env as NEXT_PUBLIC_OPENROUTER_API_KEY
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/devstral-small",
          messages: [
            { role: "system", content: "You are an expert at generating structured waitlist landing page configurations as JSON. Output only the JSON config, no explanations." },
            { role: "user", content: prompt }
          ],
          max_tokens: 1024,
          temperature: 0.2
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate page')
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content || ""
      let config
      try {
        config = JSON.parse(content)
      } catch (e) {
        throw new Error("AI did not return valid JSON. Please try a more specific prompt.")
      }

      // 2. Save to Supabase
      const supabase = createSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { data: savedPage, error: saveError } = await supabase
        .from('pages')
        .insert([{
          user_id: user.id,
          title: config.companyName || 'Generated Page',
          slug: generateSlug(config.companyName || 'generated-page'),
          config,
          html: '', // You can generate HTML from config if needed
          published: false
        }])
        .select()
        .single()

      if (saveError) throw new Error('Failed to save page to database')

      setGeneratedPage(savedPage)

    } catch (error: any) {
      console.error('Error generating page:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate page. Please try again.",
        variant: "destructive"
      })
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

  // Section update handler
  const handleUpdateSection = async (section: string, data: any) => {
    if (!editingPage) return
    const updatedConfig = { ...editingPage.config }
    if (section === 'hero') {
      updatedConfig.companyName = data.companyName
      updatedConfig.tagline = data.tagline
      updatedConfig.callToAction = data.callToAction
    } else if (section === 'features') {
      updatedConfig.features = data.features
    } else if (section === 'onboarding') {
      updatedConfig.onboardingSteps = data.steps
    } else if (section === 'benefits') {
      updatedConfig.benefits = data.benefits
    } else if (section === 'pricing') {
      updatedConfig.pricing = data.pricing
    } else if (section === 'faq') {
      updatedConfig.faqs = data.faqs
    } else if (section === 'testimonials') {
      updatedConfig.testimonials = data.testimonials
    }
    // Update in DB
    const supabase = createSupabaseClient()
    await supabase.from('pages').update({ config: updatedConfig, updated_at: new Date().toISOString() }).eq('id', editingPage.id)
    // Update in state
    setEditingPage((p: any) => p ? { ...p, config: updatedConfig } : p)
    setGeneratedPage((p: any) => p && p.id === editingPage.id ? { ...p, config: updatedConfig } : p)
  }

  // Publish handler
  const handlePublish = async () => {
    if (!editingPage) return
    setPublishing(true)
    const supabase = createSupabaseClient()
    const { error } = await supabase.from('pages').update({ published: true, updated_at: new Date().toISOString() }).eq('id', editingPage.id)
    setPublishing(false)
    if (!error) {
      setEditingPage((p: any) => p ? { ...p, published: true } : p)
      setGeneratedPage((p: any) => p && p.id === editingPage.id ? { ...p, published: true } : p)
      toast({ title: "Page Published!", description: "Your page is now live.", variant: "default" })
    } else {
      toast({ title: "Error", description: "Failed to publish page.", variant: "destructive" })
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
                <strong>Status:</strong> {generatedPage.published ? 'Published' : 'Draft'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => { setEditingPage(generatedPage); setEditDialogOpen(true); }}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Preview & Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit & Publish Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">Preview & Edit Page</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <WaitlistPagePreview config={editingPage.config} onUpdateSection={handleUpdateSection} />
          )}
          <DialogFooter className="mt-4">
            <Button onClick={handlePublish} disabled={publishing || (editingPage && editingPage.published)} className="bg-green-600 hover:bg-green-700 text-white">
              {publishing ? 'Publishing...' : (editingPage && editingPage.published ? 'Published' : 'Publish')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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