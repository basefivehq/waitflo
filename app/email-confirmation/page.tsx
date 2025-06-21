import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"

export default function EmailConfirmationPage() {
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
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <span className="text-white font-semibold">Almost there!</span>
            </div>
            <p className="text-purple-100 text-sm">
              You're just one click away from joining thousands of successful startups using Waitly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Email Confirmation with Starfield Background */}
      <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-12 bg-[#0f0f1a] overflow-hidden">
        <StarfieldBackground />
        <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-400/30">
              <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">Check your inbox</CardTitle>
            <p className="text-gray-300">We've sent a confirmation link to your email address</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
              <h3 className="font-semibold text-white mb-2">What's next?</h3>
              <ol className="text-sm text-gray-300 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="bg-purple-600/80 backdrop-blur-sm text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                    1
                  </span>
                  Check your email inbox (and spam folder)
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600/80 backdrop-blur-sm text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                    2
                  </span>
                  Click the confirmation link
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600/80 backdrop-blur-sm text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                    3
                  </span>
                  Start building your waitlist!
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button className="w-full h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-white/20">
                Resend Email
              </Button>

              <Button className="w-full h-12 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-purple-500/30">
                <Link href="/login" className="w-full h-full flex items-center justify-center">
                  Go to Login
                </Link>
              </Button>
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
