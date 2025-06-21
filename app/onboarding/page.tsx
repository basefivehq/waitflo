"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { StarfieldBackground } from "@/components/starfield-background"
import { Check, ChevronRight, Upload, Palette, Rocket, Users } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Welcome to Waitly",
    subtitle: "Let's get you set up in just a few steps",
    icon: Rocket,
  },
  {
    id: 2,
    title: "Tell us about yourself",
    subtitle: "Help us personalize your experience",
    icon: Users,
  },
  {
    id: 3,
    title: "Customize your brand",
    subtitle: "Make your waitlist uniquely yours",
    icon: Palette,
  },
  {
    id: 4,
    title: "You're all set!",
    subtitle: "Ready to create your first waitlist",
    icon: Check,
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    teamSize: "",
    primaryColor: "#8b5cf6",
    logo: null as File | null,
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }))
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to Waitly! 🎉</h2>
              <p className="text-gray-300 text-lg mb-8">
                You're about to join thousands of founders who've built viral waitlists with our platform. Let's get you
                set up in just a few quick steps.
              </p>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-700/30">
              <h3 className="text-white font-semibold mb-4">What you'll accomplish:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Set up your company profile
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Customize your brand colors and logo
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Create your first waitlist page
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
              <p className="text-gray-300">This helps us personalize your experience</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-gray-200 mb-2 block">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="industry" className="text-gray-200 mb-2 block">
                  Industry
                </Label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white rounded-xl px-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="" className="bg-gray-800">
                    Select your industry
                  </option>
                  <option value="saas" className="bg-gray-800">
                    SaaS
                  </option>
                  <option value="ecommerce" className="bg-gray-800">
                    E-commerce
                  </option>
                  <option value="fintech" className="bg-gray-800">
                    Fintech
                  </option>
                  <option value="healthtech" className="bg-gray-800">
                    Healthtech
                  </option>
                  <option value="edtech" className="bg-gray-800">
                    Edtech
                  </option>
                  <option value="other" className="bg-gray-800">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <Label htmlFor="teamSize" className="text-gray-200 mb-2 block">
                  Team Size
                </Label>
                <select
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange("teamSize", e.target.value)}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white rounded-xl px-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="" className="bg-gray-800">
                    Select team size
                  </option>
                  <option value="1" className="bg-gray-800">
                    Just me
                  </option>
                  <option value="2-5" className="bg-gray-800">
                    2-5 people
                  </option>
                  <option value="6-20" className="bg-gray-800">
                    6-20 people
                  </option>
                  <option value="21-50" className="bg-gray-800">
                    21-50 people
                  </option>
                  <option value="50+" className="bg-gray-800">
                    50+ people
                  </option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Customize your brand</h2>
              <p className="text-gray-300">Make your waitlist pages uniquely yours</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-gray-200 mb-4 block">Upload your logo</Label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="logo-upload" />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">
                      {formData.logo ? formData.logo.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-gray-500 text-sm">PNG, JPG, SVG up to 2MB</p>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="primaryColor" className="text-gray-200 mb-4 block">
                  Primary Brand Color
                </Label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    id="primaryColor"
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    className="w-16 h-12 rounded-xl border border-white/20 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    placeholder="#8b5cf6"
                    className="flex-1 h-12 bg-white/10 border-white/20 text-white rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Preview</h3>
                <div
                  className="h-32 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.companyName || "Your Company"} Waitlist
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">You're all set! 🚀</h2>
              <p className="text-gray-300 text-lg mb-8">
                Your account is ready to go. You can now create your first waitlist page and start collecting signups.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-700/30">
                <h3 className="text-white font-semibold mb-2">Quick Start</h3>
                <p className="text-gray-300 text-sm">Use our AI to generate a waitlist page in seconds</p>
              </div>
              <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-700/30">
                <h3 className="text-white font-semibold mb-2">Templates</h3>
                <p className="text-gray-300 text-sm">Choose from proven templates that convert</p>
              </div>
            </div>

            <div className="bg-green-900/20 rounded-xl p-6 border border-green-700/30">
              <h3 className="text-green-400 font-semibold mb-2">🎉 Welcome Bonus</h3>
              <p className="text-gray-300">You've unlocked 30 days of Pro features for free!</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden">
      <StarfieldBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "border-gray-600 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors ${
                        currentStep > step.id ? "bg-purple-600" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </p>
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                disabled={currentStep === 2 && !formData.companyName}
                className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {/* Skip Option */}
          {currentStep < steps.length && (
            <div className="text-center mt-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-300 text-sm">
                Skip onboarding →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
