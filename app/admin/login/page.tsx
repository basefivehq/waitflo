"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"
import { Shield, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin112@gmail.com")
  const [password, setPassword] = useState("admin112")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin112@gmail.com" && password === "admin112") {
      router.push("/admin/dashboard")
    } else {
      alert("Invalid credentials")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-8 bg-[#0f0f1a] overflow-hidden">
      <StarfieldBackground />

      <Card className="relative z-10 w-full max-w-md bg-[#1a1a2e]/90 backdrop-blur-xl border border-purple-700/30 shadow-2xl shadow-purple-500/10">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-purple-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-400/30">
            <Shield className="w-8 h-8 text-purple-300" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">Admin Portal</CardTitle>
          <p className="text-gray-300">Sign in to access the admin dashboard</p>
          <p className="text-purple-300 text-sm mt-2">Demo Admin Login</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-white/20 focus:border-purple-400 focus:ring-purple-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 border border-purple-500/30"
            >
              {isLoading ? "Signing in..." : "Login as Admin"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">Default Demo Credentials:</p>
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-sm">
              <p className="text-purple-300">Email: admin112@gmail.com</p>
              <p className="text-purple-300">Password: admin112</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
