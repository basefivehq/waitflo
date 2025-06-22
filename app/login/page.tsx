'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [email, setEmail] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle error from URL parameters
    const errorParam = searchParams.get('error')
    if (errorParam === 'confirmation_failed') {
      setError('Email confirmation failed. Please try again or contact support.')
    }
  }, [searchParams])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    setNeedsConfirmation(false)
    
    const formData = new FormData(event.currentTarget)
    const emailValue = formData.get('email') as string
    setEmail(emailValue)
    
    // Add returnUrl to form data if available
    const returnUrl = searchParams.get('returnUrl')
    if (returnUrl) {
      formData.append('returnUrl', returnUrl)
    }
    
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    })
    
    if (response.ok) {
      // Handle server-side redirect
      if (response.redirected) {
        window.location.href = response.url
      } else {
        // Fallback to client-side redirect
        const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/dashboard'
        window.location.href = redirectUrl
      }
    } else {
      const data = await response.json()
      if (data.needsConfirmation) {
        setNeedsConfirmation(true)
        setError(data.message)
      } else {
        setError(data.message || "Login failed")
      }
      setIsLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setIsLoading(true)
    setError("")
    
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: 'dummy-password-for-resend', // This will be ignored by the signup API
        resend: true
      }),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      setError("Confirmation email sent! Please check your inbox.")
    } else {
      setError(data.message || "Failed to resend confirmation email")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Brand Content */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-800 to-purple-900 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md text-center lg:text-left">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <span className="text-white font-bold text-xl">W</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">Launch Early. Grow Faster.</h1>

          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Join thousands of startups using Waitly to capture early users with AI-powered waitlists.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold">180,000+ signups generated</span>
            </div>
            <p className="text-purple-100 text-sm">
              "The analytics dashboard shows exactly what's working. Love the insights!" - Marcus Rodriguez, GrowthLab
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form with Starfield Background */}
      <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-12 bg-[#0f0f1a] overflow-hidden">
        <StarfieldBackground />
        <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-white mb-2">Welcome back</CardTitle>
            <p className="text-gray-300">Sign in to your Waitly account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {needsConfirmation ? (
              <div className="space-y-4">
                <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-yellow-300 font-semibold">Email confirmation required</span>
                  </div>
                  <p className="text-yellow-200 text-sm mb-4">
                    Please check your email and click the confirmation link before signing in.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={handleResendConfirmation}
                      disabled={isLoading}
                      className="w-full h-12 bg-yellow-600/80 hover:bg-yellow-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-yellow-500/30"
                    >
                      {isLoading ? "Sending..." : "Resend Confirmation Email"}
                    </Button>
                    <Button 
                      onClick={() => setNeedsConfirmation(false)}
                      className="w-full h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-white/20"
                    >
                      Back to Login
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-purple-400 focus:ring-purple-400 border-white/30 rounded bg-white/10"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-purple-300 hover:text-purple-200">
                    Forgot password?
                  </Link>
                </div>

                <Button className="w-full h-12 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-purple-500/30" disabled={isLoading}>
                  {isLoading ? <span className="loader mr-2"></span> : null} Sign In
                </Button>
                {error && (
                  <p className="text-sm text-center text-red-400">{error}</p>
                )}
              </form>
            )}

            <div className="text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-300 hover:text-purple-200 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
