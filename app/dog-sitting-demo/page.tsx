'use client'

import { IndustryThemeProvider } from "@/components/ui/industry-themes"
import { MagicCard, MagicButton, FeatureCard, PricingCard, FAQItem, StatsCard } from "@/components/ui/magic-ui"
import { PawPrint, Users, Star, Shield } from "lucide-react"

export default function DogSittingDemoPage() {
  const dogSittingContent = {
    companyName: "PawSitter",
    tagline: "Trusted Dog Sitting Services in Your Neighborhood",
    description: "Connect with reliable, vetted dog sitters in your area. Your furry friend deserves the best care when you're away.",
    features: [
      "Vetted & Background-Checked Sitters",
      "Real-Time GPS Tracking",
      "Photo & Video Updates",
      "24/7 Customer Support",
      "Flexible Scheduling",
      "Insurance Coverage"
    ],
    pricing: [
      {
        name: "Basic",
        price: "$25/night",
        features: ["Overnight care", "2 walks per day", "Photo updates", "Basic insurance"]
      },
      {
        name: "Premium",
        price: "$35/night",
        features: ["Overnight care", "3 walks per day", "Video updates", "Full insurance", "Medication administration"]
      },
      {
        name: "Luxury",
        price: "$50/night",
        features: ["Overnight care", "Unlimited walks", "Live video calls", "Premium insurance", "Grooming included"]
      }
    ],
    faqs: [
      {
        question: "How do you vet your dog sitters?",
        answer: "All our sitters undergo thorough background checks, reference verification, and training before being approved."
      },
      {
        question: "What if my dog has special needs?",
        answer: "We have sitters trained in special needs care, including medication administration and mobility assistance."
      }
    ],
    socialProof: {
      "Happy Dogs": "10,000+",
      "Trusted Sitters": "500+",
      "Cities Served": "50+",
      "Satisfaction Rate": "99%"
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Dog Parent",
        content: "PawSitter has been a lifesaver! My golden retriever Max loves his sitter and I get daily photo updates.",
        rating: 5
      }
    ],
    customColors: {
      primary: "#8B4513",
      secondary: "#D2B48C",
      accent: "#F5F5DC",
      text: "#333333",
      background: "#ffffff"
    }
  }

  return (
    <IndustryThemeProvider industry="pet">
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: dogSittingContent.customColors.background,
          color: dogSittingContent.customColors.text
        }}
      >
        {/* Hero Section */}
        <div 
          className="relative overflow-hidden"
          style={{ backgroundColor: dogSittingContent.customColors.primary }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center">
              <div className="mb-6">
                <PawPrint className="h-16 w-16 mx-auto" style={{ color: dogSittingContent.customColors.accent }} />
              </div>
              <h1 className="text-5xl font-bold mb-6" style={{ color: dogSittingContent.customColors.background }}>
                {dogSittingContent.companyName}
              </h1>
              <p className="text-xl mb-8" style={{ color: dogSittingContent.customColors.accent }}>
                {dogSittingContent.tagline}
              </p>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: dogSittingContent.customColors.background }}>
                {dogSittingContent.description}
              </p>
              <MagicButton 
                size="lg"
                style={{ 
                  backgroundColor: dogSittingContent.customColors.accent,
                  color: dogSittingContent.customColors.text
                }}
              >
                Find a Sitter
              </MagicButton>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: dogSittingContent.customColors.primary }}>
              Why Choose PawSitter?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogSittingContent.features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={<Shield className="h-6 w-6" />}
                title={feature}
                description={`Professional ${feature.toLowerCase()} for your dog's safety and comfort`}
                delay={index * 0.1}
                style={{
                  borderColor: dogSittingContent.customColors.secondary,
                  backgroundColor: dogSittingContent.customColors.background
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className="py-16"
          style={{ backgroundColor: dogSittingContent.customColors.secondary }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(dogSittingContent.socialProof).map(([key, value], index) => (
                <StatsCard
                  key={key}
                  value={value}
                  label={key}
                  delay={index * 0.1}
                  style={{
                    backgroundColor: dogSittingContent.customColors.background,
                    color: dogSittingContent.customColors.text
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: dogSittingContent.customColors.primary }}>
              Choose Your Plan
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dogSittingContent.pricing.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                popular={index === 1}
                delay={index * 0.2}
                onSelect={() => console.log(`Selected ${plan.name}`)}
                style={{
                  borderColor: dogSittingContent.customColors.secondary,
                  backgroundColor: dogSittingContent.customColors.background
                }}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div 
          className="py-16"
          style={{ backgroundColor: dogSittingContent.customColors.accent }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: dogSittingContent.customColors.primary }}>
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {dogSittingContent.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={false}
                  onToggle={() => {}}
                  style={{
                    backgroundColor: dogSittingContent.customColors.background,
                    color: dogSittingContent.customColors.text
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer 
          className="py-8 text-center"
          style={{ backgroundColor: dogSittingContent.customColors.primary, color: dogSittingContent.customColors.background }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <p>&copy; 2024 {dogSittingContent.companyName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </IndustryThemeProvider>
  )
} 