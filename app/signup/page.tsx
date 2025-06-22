'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"
import { useState } from "react"

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError("")
        const formData = new FormData(event.currentTarget)
        const response = await fetch("/api/signup", {
            method: "POST",
            body: formData,
        })
        if (response.ok) {
            window.location.href = "/email-confirmation"
        } else {
            const data = await response.json()
            setError(data.message || "Signup failed")
            setIsLoading(false)
        }
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
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-semibold">Trusted by 3,200+ startups</span>
              </div>
              <p className="text-purple-100 text-sm">
                "Waitly helped us get 10,000 signups before launch. Game changer!" - Sarah Chen, TechStart
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form with Starfield Background */}
        <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-12 bg-[#0f0f1a] overflow-hidden">
          <StarfieldBackground />
          <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white mb-2">Create your account</CardTitle>
              <p className="text-gray-300">Start building your waitlist today</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                    required
                  />
                </div>

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
                    placeholder="Create a password"
                    className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                  />
                </div>

                <Button className="w-full h-12 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-purple-500/30" disabled={isLoading}>
                  {isLoading ? <span className="loader mr-2"></span> : null} Create Account
                </Button>
                {error && (
                  <p className="text-sm text-center text-red-400">{error}</p>
                )}
              </form>

              <div className="text-center">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-300 hover:text-purple-200 font-semibold">
                    Log in
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
