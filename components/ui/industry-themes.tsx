"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export interface IndustryStyle {
  theme: string
  colorScheme: string
  layout: string
  visualStyle: string
  typography: string
  animations: string
}

interface IndustryThemeProviderProps {
  industry: string
  children: ReactNode
  className?: string
}

export function IndustryThemeProvider({ industry, children, className }: IndustryThemeProviderProps) {
  const getThemeClasses = (industry: string) => {
    const themes: Record<string, string> = {
      // Health & Wellness
      health: "bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-900",
      wellness: "bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-900",
      
      // Technology
      tech: "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-900",
      saas: "bg-gradient-to-br from-indigo-50 to-purple-100 text-indigo-900",
      "mobile-app": "bg-gradient-to-br from-purple-50 to-pink-100 text-purple-900",
      
      // Gaming
      game: "bg-gradient-to-br from-gray-900 to-black text-white",
      gaming: "bg-gradient-to-br from-gray-900 to-black text-white",
      
      // Creative & Arts
      creative: "bg-gradient-to-br from-pink-50 to-rose-100 text-pink-900",
      comic: "bg-gradient-to-br from-yellow-50 to-orange-100 text-orange-900",
      artistic: "bg-gradient-to-br from-pink-50 to-rose-100 text-pink-900",
      
      // Books & Literature
      book: "bg-gradient-to-br from-amber-50 to-orange-100 text-amber-900",
      literary: "bg-gradient-to-br from-amber-50 to-orange-100 text-amber-900",
      
      // Business & Professional
      service: "bg-gradient-to-br from-gray-50 to-slate-100 text-gray-900",
      professional: "bg-gradient-to-br from-gray-50 to-slate-100 text-gray-900",
      productivity: "bg-gradient-to-br from-orange-50 to-red-100 text-orange-900",
      
      // Social & Community
      social: "bg-gradient-to-br from-pink-50 to-rose-100 text-pink-900",
      
      // Analytics & Data
      analytics: "bg-gradient-to-br from-teal-50 to-cyan-100 text-teal-900",
      data: "bg-gradient-to-br from-teal-50 to-cyan-100 text-teal-900",
      
      // E-commerce
      ecommerce: "bg-gradient-to-br from-yellow-50 to-amber-100 text-yellow-900",
      elegant: "bg-gradient-to-br from-yellow-50 to-amber-100 text-yellow-900",
      
      // Education
      education: "bg-gradient-to-br from-green-50 to-emerald-100 text-green-900",
      educational: "bg-gradient-to-br from-green-50 to-emerald-100 text-green-900",
      
      // Finance
      finance: "bg-gradient-to-br from-purple-50 to-violet-100 text-purple-900",
      financial: "bg-gradient-to-br from-purple-50 to-violet-100 text-purple-900",
      
      // Real Estate
      "real-estate": "bg-gradient-to-br from-amber-50 to-yellow-100 text-amber-900",
      residential: "bg-gradient-to-br from-amber-50 to-yellow-100 text-amber-900",
      
      // Food & Culinary
      food: "bg-gradient-to-br from-red-50 to-pink-100 text-red-900",
      culinary: "bg-gradient-to-br from-red-50 to-pink-100 text-red-900",
      
      // Travel & Adventure
      travel: "bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-900",
      adventure: "bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-900",
      
      // Entertainment
      entertainment: "bg-gradient-to-br from-pink-50 to-purple-100 text-pink-900",
      
      // Digital Products
      "digital-product": "bg-gradient-to-br from-green-50 to-emerald-100 text-green-900",
      digital: "bg-gradient-to-br from-green-50 to-emerald-100 text-green-900",
      
      // Default
      general: "bg-gradient-to-br from-gray-50 to-slate-100 text-gray-900",
      generic: "bg-gradient-to-br from-gray-50 to-slate-100 text-gray-900"
    }
    
    return themes[industry] || themes.general
  }

  const getTypographyClasses = (industry: string) => {
    const typography: Record<string, string> = {
      // Modern sans-serif for tech
      tech: "font-sans",
      saas: "font-sans",
      "mobile-app": "font-sans",
      analytics: "font-sans",
      productivity: "font-sans",
      social: "font-sans",
      "digital-product": "font-sans",
      
      // Display fonts for creative
      creative: "font-display",
      comic: "font-display",
      artistic: "font-display",
      game: "font-display",
      gaming: "font-display",
      
      // Serif for traditional
      book: "font-serif",
      literary: "font-serif",
      education: "font-serif",
      "real-estate": "font-serif",
      food: "font-serif",
      entertainment: "font-serif",
      
      // Default
      general: "font-sans"
    }
    
    return typography[industry] || typography.general
  }

  const getAnimationClasses = (industry: string) => {
    const animations: Record<string, string> = {
      // Health - gentle pulse
      health: "animate-pulse",
      wellness: "animate-pulse",
      
      // Tech - smooth fade
      tech: "animate-fade-in",
      saas: "animate-fade-in",
      analytics: "animate-fade-in",
      
      // Gaming - bold pulse
      game: "animate-pulse",
      gaming: "animate-pulse",
      
      // Creative - bounce
      creative: "animate-bounce",
      comic: "animate-bounce",
      artistic: "animate-bounce",
      
      // Mobile - slide
      "mobile-app": "animate-slide-in",
      
      // Default
      general: "animate-fade-in"
    }
    
    return animations[industry] || animations.general
  }

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      getThemeClasses(industry),
      getTypographyClasses(industry),
      getAnimationClasses(industry),
      className
    )}>
      {children}
    </div>
  )
}

// Industry-specific color schemes
export const industryColors = {
  health: {
    primary: "teal",
    secondary: "emerald",
    accent: "cyan",
    background: "from-teal-50 to-emerald-100",
    text: "text-teal-900"
  },
  tech: {
    primary: "blue",
    secondary: "indigo",
    accent: "cyan",
    background: "from-blue-50 to-indigo-100",
    text: "text-blue-900"
  },
  saas: {
    primary: "indigo",
    secondary: "purple",
    accent: "violet",
    background: "from-indigo-50 to-purple-100",
    text: "text-indigo-900"
  },
  game: {
    primary: "gray",
    secondary: "black",
    accent: "neon",
    background: "from-gray-900 to-black",
    text: "text-white"
  },
  creative: {
    primary: "pink",
    secondary: "rose",
    accent: "purple",
    background: "from-pink-50 to-rose-100",
    text: "text-pink-900"
  },
  book: {
    primary: "amber",
    secondary: "orange",
    accent: "yellow",
    background: "from-amber-50 to-orange-100",
    text: "text-amber-900"
  },
  comic: {
    primary: "yellow",
    secondary: "orange",
    accent: "red",
    background: "from-yellow-50 to-orange-100",
    text: "text-orange-900"
  },
  service: {
    primary: "gray",
    secondary: "slate",
    accent: "zinc",
    background: "from-gray-50 to-slate-100",
    text: "text-gray-900"
  },
  education: {
    primary: "green",
    secondary: "emerald",
    accent: "teal",
    background: "from-green-50 to-emerald-100",
    text: "text-green-900"
  },
  finance: {
    primary: "purple",
    secondary: "violet",
    accent: "indigo",
    background: "from-purple-50 to-violet-100",
    text: "text-purple-900"
  },
  ecommerce: {
    primary: "yellow",
    secondary: "amber",
    accent: "orange",
    background: "from-yellow-50 to-amber-100",
    text: "text-yellow-900"
  },
  food: {
    primary: "red",
    secondary: "pink",
    accent: "rose",
    background: "from-red-50 to-pink-100",
    text: "text-red-900"
  },
  travel: {
    primary: "blue",
    secondary: "cyan",
    accent: "sky",
    background: "from-blue-50 to-cyan-100",
    text: "text-blue-900"
  },
  entertainment: {
    primary: "pink",
    secondary: "purple",
    accent: "rose",
    background: "from-pink-50 to-purple-100",
    text: "text-pink-900"
  },
  general: {
    primary: "gray",
    secondary: "slate",
    accent: "zinc",
    background: "from-gray-50 to-slate-100",
    text: "text-gray-900"
  }
}

// Industry-specific layouts
export const industryLayouts = {
  health: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  tech: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  saas: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  game: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  creative: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  comic: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  book: "flex flex-col space-y-6",
  service: "flex flex-col space-y-6",
  education: "flex flex-col space-y-6",
  "real-estate": "flex flex-col space-y-6",
  social: "grid grid-cols-1 md:grid-cols-2 gap-6",
  analytics: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  general: "flex flex-col space-y-6"
}

// Industry-specific visual styles
export const industryVisualStyles = {
  health: "natural",
  tech: "clean",
  saas: "professional",
  game: "bold",
  creative: "artistic",
  comic: "creative",
  book: "elegant",
  service: "minimalist",
  education: "vintage",
  finance: "modern",
  ecommerce: "luxury",
  food: "artistic",
  travel: "modern",
  entertainment: "bright",
  general: "minimalist"
} 