"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { Badge } from "./badge"
import { motion, AnimatePresence } from "framer-motion"

// Magic Card with hover effects and animations
interface MagicCardProps {
  children: React.ReactNode
  variant?: "default" | "gradient" | "glass" | "neon"
  hover?: boolean
  delay?: number
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export function MagicCard({ 
  children, 
  variant = "default", 
  hover = true, 
  delay = 0,
  className,
  onClick,
  style,
  ...props 
}: MagicCardProps) {
  const cardVariants = {
    default: "bg-card text-card-foreground border border-border",
    gradient: "bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20",
    glass: "bg-card/50 backdrop-blur-sm border border-border/50",
    neon: "bg-card border border-primary/50 shadow-lg shadow-primary/25"
  }

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    whileHover: hover ? { scale: 1.02, y: -2 } : undefined,
    className: cn(
      "rounded-lg p-6 transition-all duration-300",
      cardVariants[variant],
      className
    ),
    onClick,
    style
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  )
}

// Animated Feature Card
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  style?: React.CSSProperties
}

export function FeatureCard({ icon, title, description, delay = 0, style }: FeatureCardProps) {
  return (
    <MagicCard variant="glass" delay={delay} className="text-center" style={style}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        {icon}
      </motion.div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </MagicCard>
  )
}

// Gradient Hero Section
interface GradientHeroProps {
  title: string
  subtitle: string
  ctaText?: string
  onCtaClick?: () => void
  background?: "default" | "gradient" | "animated"
}

export function GradientHero({ 
  title, 
  subtitle, 
  ctaText = "Get Started", 
  onCtaClick,
  background = "gradient" 
}: GradientHeroProps) {
  const backgrounds = {
    default: "bg-background",
    gradient: "bg-gradient-to-br from-primary/20 via-background to-secondary/20",
    animated: "bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse"
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-8 text-center",
      backgrounds[background]
    )}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-4xl font-bold tracking-tight lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-lg text-muted-foreground lg:text-xl"
        >
          {subtitle}
        </motion.p>
        {onCtaClick && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" onClick={onCtaClick} className="text-lg px-8 py-3">
              {ctaText}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Interactive Pricing Card
interface PricingCardProps {
  name: string
  price: string
  features: string[]
  popular?: boolean
  delay?: number
  onSelect?: () => void
  style?: React.CSSProperties
}

export function PricingCard({ 
  name, 
  price, 
  features, 
  popular = false, 
  delay = 0,
  onSelect,
  style
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      <MagicCard 
        variant={popular ? "neon" : "default"} 
        className={cn(
          "relative h-full",
          popular && "ring-2 ring-primary/50"
        )}
        style={style}
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <div className="mb-6">
            <span className="text-3xl font-bold">{price}</span>
            {price !== "Free" && <span className="text-muted-foreground">/month</span>}
          </div>
          <ul className="space-y-3 mb-6 text-left">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                {feature}
              </motion.li>
            ))}
          </ul>
          <Button 
            variant={popular ? "default" : "outline"} 
            className="w-full"
            onClick={onSelect}
          >
            Choose Plan
          </Button>
        </div>
      </MagicCard>
    </motion.div>
  )
}

// Animated FAQ Accordion
interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  style?: React.CSSProperties
}

export function FAQItem({ question, answer, isOpen, onToggle, style }: FAQItemProps) {
  return (
    <Card className="mb-4" style={style}>
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 text-muted-foreground">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// Interactive Onboarding Step
interface OnboardingStepProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  currentStep: number
  totalSteps: number
}

export function OnboardingStep({ 
  question, 
  options, 
  onAnswer, 
  currentStep, 
  totalSteps 
}: OnboardingStepProps) {
  return (
    <MagicCard variant="glass" className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">{question}</h3>
      </div>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onAnswer(option)}
            className="w-full p-4 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </MagicCard>
  )
}

// Animated Stats Card
interface StatsCardProps {
  value: string
  label: string
  icon?: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}

export function StatsCard({ value, label, icon, delay = 0, style }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <MagicCard variant="gradient" className="p-6" style={style}>
        {icon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </MagicCard>
    </motion.div>
  )
}

// Magic Button with animations
interface MagicButtonProps {
  variant?: "default" | "gradient" | "neon" | "glass"
  size?: "sm" | "default" | "lg"
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  style?: React.CSSProperties
}

export function MagicButton({ 
  variant = "default", 
  size = "default", 
  children, 
  className,
  style,
  ...props 
}: MagicButtonProps) {
  const buttonVariants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70",
    neon: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40",
    glass: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 backdrop-blur-sm"
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={cn(buttonVariants[variant], className)}
        size={size}
        style={style}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
} 