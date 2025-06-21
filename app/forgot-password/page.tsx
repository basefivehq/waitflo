import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"

export default function ForgotPasswordPage() {
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
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold">Secure & reliable</span>
            </div>
            <p className="text-purple-100 text-sm">
              Your data is protected with enterprise-grade security. We'll help you get back to building your waitlist.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form with Starfield Background */}
      <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-12 bg-[#0f0f1a] overflow-hidden">
        <StarfieldBackground />
        <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-white mb-2">Reset your password</CardTitle>
            <p className="text-gray-300">Enter your email and we'll send you a reset link</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                />
              </div>

              <Button className="w-full h-12 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-purple-500/30">
                Send Reset Link
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-300">
                Remember your password?{" "}
                <Link href="/login" className="text-purple-300 hover:text-purple-200 font-semibold">
                  Sign in
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
