import { IndustryThemeProvider } from "@/components/ui/industry-themes"
import { MagicCard, MagicButton, FeatureCard, GradientHero, PricingCard, FAQItem, StatsCard } from "@/components/ui/magic-ui"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Users, Star, MapPin, Clock, Shield } from "lucide-react"

export default function DogSittingDemoPage() {
  // Simulated content for a dog sitting app with brown and white colors
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
    benefits: [
      "Peace of mind knowing your dog is in safe hands",
      "Convenient booking with instant confirmation",
      "Affordable rates starting at $25/night",
      "Local sitters who know your neighborhood"
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
      },
      {
        question: "Is my dog covered by insurance?",
        answer: "Yes, all bookings include comprehensive pet insurance coverage for your peace of mind."
      },
      {
        question: "Can I meet the sitter before booking?",
        answer: "Absolutely! We encourage meet-and-greets to ensure the perfect match between your dog and the sitter."
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
      },
      {
        name: "Mike Chen",
        role: "Frequent Traveler",
        content: "As someone who travels often for work, PawSitter gives me complete peace of mind about my dog's care.",
        rating: 5
      }
    ],
    customColors: {
      primary: "#8B4513", // Brown
      secondary: "#D2B48C", // Tan
      accent: "#F5F5DC", // Beige
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
            <p className="text-lg text-muted-foreground">
              Professional, reliable, and loving care for your furry family member
            </p>
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
            <p className="text-lg text-muted-foreground">
              Flexible pricing options to fit your needs and budget
            </p>
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

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: dogSittingContent.customColors.primary }}>
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dogSittingContent.testimonials.map((testimonial, index) => (
              <MagicCard 
                key={index} 
                variant="glass" 
                delay={index * 0.2}
                style={{
                  borderColor: dogSittingContent.customColors.secondary,
                  backgroundColor: dogSittingContent.customColors.background
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: dogSittingContent.customColors.primary }}
                    >
                      <Users className="h-6 w-6" style={{ color: dogSittingContent.customColors.background }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-3">{testimonial.content}</p>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer 
          className="py-8 text-center"
          style={{ backgroundColor: dogSittingContent.customColors.primary, color: dogSittingContent.customColors.background }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <p>&copy; 2024 {dogSittingContent.companyName}. All rights reserved.</p>
            <p className="text-sm mt-2" style={{ color: dogSittingContent.customColors.accent }}>
              Trusted dog sitting services in your neighborhood
            </p>
          </div>
        </footer>
      </div>
    </IndustryThemeProvider>
  )
} 