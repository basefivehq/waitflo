import { NextRequest, NextResponse } from 'next/server'

// Type definitions for better type safety
type Industry = 'tech' | 'ecommerce' | 'service' | 'education' | 'health' | 'finance' | 'real-estate' | 'food' | 'travel' | 'entertainment' | 'general' | 'saas' | 'mobile-app' | 'game' | 'book' | 'comic' | 'digital-product' | 'creative' | 'productivity' | 'social' | 'analytics'
type BusinessType = 'b2b' | 'b2c' | 'marketplace' | 'subscription' | 'one-time' | 'general'

interface GeneratedContent {
  companyName: string
  tagline: string
  description: string
  features: string[]
  benefits: string[]
  steps: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  pricing: { name: string; price: string; features: string[] }[]
  onboardingSteps: { question: string; answer: string }[]
  targetAudience: string
  valueProposition: string
  callToAction: string
  industry: string
  businessType: string
  socialProof: { [key: string]: string }
  testimonials: { name: string; role: string; content: string; rating: number }[]
  pageStyle: {
    theme: string
    colorScheme: string
    layout: string
    visualStyle: string
    typography: string
    animations: string
    customColors: {
      primary: string
      secondary: string
      accent: string
      text: string
      background: string
    }
    designVariation: string
  }
  images: {
    hero: string
    features: string[]
    testimonials: string[]
    icons: string[]
    customImages: {
      logo?: string
      heroImage?: string
      featureImages: string[]
      testimonialImages: string[]
    }
  }
  components: {
    hero: string
    features: string[]
    pricing: string[]
    testimonials: string[]
  }
  sections: {
    hero: { enabled: boolean; order: number }
    features: { enabled: boolean; order: number }
    benefits: { enabled: boolean; order: number }
    pricing: { enabled: boolean; order: number }
    faq: { enabled: boolean; order: number }
    onboarding: { enabled: boolean; order: number }
    stats: { enabled: boolean; order: number }
    testimonials: { enabled: boolean; order: number }
    contact: { enabled: boolean; order: number }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // Detect industry and business type from prompt
    const detectedIndustry = detectIndustry(prompt)
    const detectedBusinessType = detectBusinessType(prompt)
    
    // Detect custom colors from prompt
    const detectedColors = detectColorsFromPrompt(prompt)

    // Generate content with industry-specific data
    const generatedContent: GeneratedContent = {
      companyName: generateCompanyName(prompt, detectedBusinessType),
      tagline: generateTagline(prompt, detectedBusinessType),
      description: generateDescription(prompt, detectedBusinessType),
      features: generateFeatures(detectedIndustry),
      benefits: generateBenefits(detectedIndustry),
      steps: generateHowItWorks(detectedIndustry),
      faqs: generateFAQs(detectedIndustry),
      pricing: generatePricing(detectedIndustry),
      onboardingSteps: generateOnboardingSteps(prompt, detectedIndustry),
      targetAudience: generateTargetAudience(detectedIndustry),
      valueProposition: generateValueProposition(prompt, detectedIndustry),
      callToAction: generateCallToAction(detectedIndustry),
      industry: detectedIndustry,
      businessType: detectedBusinessType,
      socialProof: generateSocialProof(detectedIndustry),
      testimonials: generateTestimonials(detectedIndustry),
      pageStyle: generatePageStyle(detectedIndustry),
      images: generateImages(detectedIndustry),
      components: generateComponents(detectedIndustry),
      sections: {
        hero: { enabled: true, order: 1 },
        features: { enabled: true, order: 2 },
        benefits: { enabled: true, order: 3 },
        pricing: { enabled: true, order: 4 },
        faq: { enabled: true, order: 5 },
        onboarding: { enabled: true, order: 6 },
        stats: { enabled: true, order: 7 },
        testimonials: { enabled: true, order: 8 },
        contact: { enabled: true, order: 9 }
      }
    }

    // Apply custom colors if detected
    if (detectedColors.length > 0) {
      const customColors = {
        primary: detectedColors[0] || generatedContent.pageStyle.customColors.primary,
        secondary: detectedColors[1] || generatedContent.pageStyle.customColors.secondary,
        accent: detectedColors[2] || generatedContent.pageStyle.customColors.accent,
        text: detectedColors.includes('white') ? '#ffffff' : generatedContent.pageStyle.customColors.text,
        background: detectedColors.includes('white') ? '#ffffff' : generatedContent.pageStyle.customColors.background
      }
      
      generatedContent.pageStyle.customColors = customColors
    }

    return NextResponse.json({ success: true, data: generatedContent })
  } catch (error) {
    console.error('Error generating page:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate page content' },
      { status: 500 }
    )
  }
}

function generateComprehensiveContent(prompt: string, industry?: string, businessType?: string) {
  // Enhanced industry detection
  const detectedIndustry = (industry || detectIndustry(prompt)) as Industry
  const detectedBusinessType = (businessType || detectBusinessType(prompt)) as BusinessType

  // Generate company name from prompt
  const companyName = generateCompanyName(prompt, detectedIndustry)
  
  // Generate comprehensive content based on industry and business type
  const content = {
    companyName,
    tagline: generateTagline(prompt, detectedIndustry),
    description: generateDescription(prompt, detectedIndustry),
    features: generateFeatures(detectedIndustry),
    benefits: generateBenefits(detectedIndustry),
    steps: generateHowItWorks(detectedIndustry),
    faqs: generateFAQs(detectedIndustry),
    pricing: generatePricing(detectedIndustry),
    onboardingSteps: generateOnboardingSteps(prompt, detectedIndustry),
    targetAudience: generateTargetAudience(detectedIndustry),
    valueProposition: generateValueProposition(prompt, detectedIndustry),
    callToAction: generateCallToAction(detectedIndustry),
    industry: detectedIndustry,
    businessType: detectedBusinessType,
    socialProof: generateSocialProof(detectedIndustry),
    testimonials: generateTestimonials(detectedIndustry),
    pageStyle: generatePageStyle(detectedIndustry),
    images: generateImages(detectedIndustry),
    components: generateComponents(detectedIndustry)
  }

  return content
}

function detectIndustry(prompt: string): Industry {
  const isTech = /tech|software|app|platform|saas|startup|ai|machine learning|blockchain|fintech|api|backend|frontend|web app|mobile app|desktop app/i.test(prompt)
  const isSaaS = /saas|software as a service|subscription software|cloud software|web application|b2b software|enterprise software|business software/i.test(prompt)
  const isMobileApp = /mobile app|ios app|android app|app store|play store|smartphone app|phone app|mobile application/i.test(prompt)
  const isGame = /game|gaming|video game|mobile game|pc game|console game|indie game|game development|game studio|esports|gamer/i.test(prompt)
  const isBook = /book|ebook|digital book|publishing|author|novel|fiction|non-fiction|self-publish|kindle|audiobook/i.test(prompt)
  const isComic = /comic|manga|graphic novel|webcomic|digital comic|comic book|illustration|art|drawing|cartoon/i.test(prompt)
  const isEcommerce = /store|shop|product|buy|sell|commerce|retail|marketplace|online store|e-commerce|shopping/i.test(prompt)
  const isService = /service|consulting|agency|freelance|professional|coaching|consultant|agency|freelancer/i.test(prompt)
  const isEducation = /course|learn|education|training|school|academy|university|tutorial|learning|skill|certification/i.test(prompt)
  const isHealth = /health|fitness|wellness|medical|therapy|nutrition|mental health|wellbeing|exercise|workout/i.test(prompt)
  const isFinance = /finance|money|investment|banking|fintech|crypto|trading|financial|wealth|budget|accounting/i.test(prompt)
  const isRealEstate = /real estate|property|housing|rental|mortgage|realty|home|apartment|house|landlord/i.test(prompt)
  const isFood = /food|restaurant|catering|delivery|meal|nutrition|dining|kitchen|chef|cooking/i.test(prompt)
  const isTravel = /travel|tourism|hotel|booking|vacation|trip|journey|destination|tour|adventure/i.test(prompt)
  const isEntertainment = /entertainment|streaming|music|video|movie|tv|show|media|content|podcast|live/i.test(prompt)
  const isDigitalProduct = /digital product|online product|software product|app|tool|utility|plugin|extension|widget|addon/i.test(prompt)
  const isCreative = /creative|design|art|music|video|photography|animation|3d|visual|creative tool|design tool/i.test(prompt)
  const isProductivity = /productivity|workflow|automation|efficiency|time management|task|project management|collaboration|team/i.test(prompt)
  const isSocial = /social|community|network|connect|social media|social network|community platform|forum|chat|messaging/i.test(prompt)
  const isAnalytics = /analytics|data|insights|reporting|dashboard|metrics|kpi|business intelligence|bi|data visualization/i.test(prompt)

  if (isSaaS) return 'saas'
  if (isMobileApp) return 'mobile-app'
  if (isGame) return 'game'
  if (isBook) return 'book'
  if (isComic) return 'comic'
  if (isDigitalProduct) return 'digital-product'
  if (isCreative) return 'creative'
  if (isProductivity) return 'productivity'
  if (isSocial) return 'social'
  if (isAnalytics) return 'analytics'
  if (isTech) return 'tech'
  if (isEcommerce) return 'ecommerce'
  if (isService) return 'service'
  if (isEducation) return 'education'
  if (isHealth) return 'health'
  if (isFinance) return 'finance'
  if (isRealEstate) return 'real-estate'
  if (isFood) return 'food'
  if (isTravel) return 'travel'
  if (isEntertainment) return 'entertainment'
  
  return 'general'
}

function detectBusinessType(prompt: string): BusinessType {
  const isB2B = /b2b|business|enterprise|corporate|saas|platform/i.test(prompt)
  const isB2C = /consumer|personal|individual|retail|direct/i.test(prompt)
  const isMarketplace = /marketplace|platform|connect|match/i.test(prompt)
  const isSubscription = /subscription|monthly|recurring|membership/i.test(prompt)
  const isOneTime = /one-time|single|purchase|buy once/i.test(prompt)

  if (isMarketplace) return 'marketplace'
  if (isB2B) return 'b2b'
  if (isB2C) return 'b2c'
  if (isSubscription) return 'subscription'
  if (isOneTime) return 'one-time'
  
  return 'general'
}

function generateCompanyName(prompt: string, businessType: string) {
  const words = prompt.toLowerCase().split(' ')
  const keyWords = words.filter(word => 
    word.length > 3 && !['the', 'and', 'for', 'with', 'that', 'this', 'will', 'your'].includes(word)
  )
  
  const prefixes = ['Tech', 'Smart', 'Next', 'Pro', 'Elite', 'Prime', 'Core', 'Hub', 'Flow', 'Sync']
  const suffixes = ['Hub', 'Flow', 'Sync', 'Pro', 'Plus', 'Labs', 'Works', 'Studio', 'Co', 'App']
  
  if (keyWords.length > 0) {
    const mainWord = keyWords[0].charAt(0).toUpperCase() + keyWords[0].slice(1)
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
    
    return `${prefix}${mainWord}${suffix}`
  }
  
  return 'InnovateFlow'
}

function generateTagline(prompt: string, businessType: string) {
  const taglines = {
    tech: [
      "Revolutionizing the future of technology",
      "Building tomorrow's solutions today",
      "Empowering innovation through technology",
      "Where ideas become digital reality"
    ],
    saas: [
      "Streamlining business operations",
      "Enterprise solutions for modern teams",
      "Scalable software for growing businesses",
      "Powerful tools for productivity"
    ],
    "mobile-app": [
      "Mobile-first solutions for modern life",
      "Apps that make life easier",
      "Innovation in your pocket",
      "Seamless mobile experiences"
    ],
    game: [
      "Immersive gaming experiences",
      "Where fun meets innovation",
      "Next-generation entertainment",
      "Creating worlds of adventure"
    ],
    book: [
      "Stories that inspire and educate",
      "Knowledge at your fingertips",
      "Digital publishing reimagined",
      "Books for the modern reader"
    ],
    comic: [
      "Visual storytelling redefined",
      "Art that tells stories",
      "Comics for every reader",
      "Where art meets narrative"
    ],
    "digital-product": [
      "Digital solutions for modern needs",
      "Innovative products for digital life",
      "Tools that enhance productivity",
      "Digital excellence delivered"
    ],
    creative: [
      "Unleashing creative potential",
      "Tools for artistic expression",
      "Where creativity meets technology",
      "Empowering creators worldwide"
    ],
    productivity: [
      "Maximizing your productivity",
      "Tools for efficient workflows",
      "Streamlining your work process",
      "Productivity reimagined"
    ],
    social: [
      "Connecting people worldwide",
      "Building meaningful communities",
      "Social experiences redefined",
      "Where connections happen"
    ],
    analytics: [
      "Data-driven insights",
      "Turning data into decisions",
      "Analytics for modern business",
      "Insights that drive growth"
    ],
    ecommerce: [
      "Your one-stop shopping destination",
      "Quality products, exceptional service",
      "Shop smarter, live better",
      "Curated products for modern life"
    ],
    service: [
      "Professional services delivered with excellence",
      "Solutions that exceed expectations",
      "Expert guidance for your success",
      "Service that makes a difference"
    ],
    education: [
      "Learning reimagined for the digital age",
      "Knowledge that transforms lives",
      "Education accessible to everyone",
      "Skills for tomorrow's challenges"
    ],
    health: [
      "Wellness solutions for modern life",
      "Health and fitness redefined",
      "Your journey to better health",
      "Wellness made simple"
    ],
    finance: [
      "Financial solutions for your future",
      "Smart money management",
      "Building wealth through technology",
      "Financial freedom starts here"
    ],
    "real-estate": [
      "Finding your perfect home",
      "Real estate made simple",
      "Your property journey starts here",
      "Homes that inspire"
    ],
    food: [
      "Culinary experiences redefined",
      "Food that brings people together",
      "Taste the difference",
      "Culinary excellence delivered"
    ],
    travel: [
      "Adventures that inspire",
      "Travel experiences reimagined",
      "Your journey begins here",
      "Exploring the world together"
    ],
    entertainment: [
      "Entertainment for modern audiences",
      "Content that captivates",
      "Where entertainment meets innovation",
      "Experiences that entertain"
    ],
    general: [
      "Innovation meets excellence",
      "Building better tomorrows",
      "Your vision, our mission",
      "Excellence in everything we do"
    ]
  }
  
  return taglines[businessType as keyof typeof taglines]?.[Math.floor(Math.random() * taglines[businessType as keyof typeof taglines]?.length || 1)] || taglines.general[0]
}

function generateDescription(prompt: string, businessType: string) {
  const descriptions = {
    tech: "We're building cutting-edge technology solutions that solve real-world problems. Our platform combines innovation with usability to deliver exceptional user experiences.",
    saas: "Enterprise-grade software solutions designed to streamline your business operations. Our cloud-based platform offers scalability, security, and powerful features for modern teams.",
    "mobile-app": "Mobile-first applications that enhance your daily life. We create intuitive, powerful apps that work seamlessly across all devices and platforms.",
    game: "Immersive gaming experiences that captivate and entertain. Our games combine cutting-edge technology with engaging storytelling to create unforgettable adventures.",
    book: "Digital publishing platform that brings stories to life. We provide authors and readers with innovative tools for creating, publishing, and enjoying digital content.",
    comic: "Visual storytelling platform for creators and fans. Our digital comics reader and creator tools empower artists to share their stories with the world.",
    "digital-product": "High-quality digital products that enhance your digital lifestyle. From tools to content, we deliver value through innovative digital solutions.",
    creative: "Creative tools and platforms that unleash artistic potential. We provide creators with the tools they need to bring their visions to life.",
    productivity: "Productivity tools designed to maximize your efficiency. Our solutions help teams and individuals work smarter, not harder.",
    social: "Social platforms that connect people and build communities. We create spaces where meaningful connections and conversations happen.",
    analytics: "Data analytics and business intelligence solutions. We help organizations turn data into actionable insights that drive growth and success.",
    ecommerce: "Discover carefully curated products that enhance your lifestyle. We bring you quality, convenience, and exceptional customer service in every purchase.",
    service: "Professional services delivered with integrity and excellence. We understand your needs and provide tailored solutions that drive real results.",
    education: "Transform your skills and knowledge with our comprehensive learning platform. Expert-led courses designed for real-world application and career growth.",
    health: "Comprehensive wellness solutions designed to improve your quality of life. From fitness to nutrition, we support your journey to better health.",
    finance: "Smart financial tools and services to help you build wealth and secure your future. Professional guidance for all your financial needs.",
    "real-estate": "Modern real estate solutions that simplify your property journey. From search to purchase, we make real estate transactions seamless and transparent.",
    food: "Culinary experiences that delight and inspire. We connect food lovers with exceptional dining experiences and quality ingredients.",
    travel: "Travel experiences that create lasting memories. We help you discover amazing destinations and plan unforgettable adventures.",
    entertainment: "Entertainment content that captivates and engages. We deliver high-quality entertainment experiences for modern audiences.",
    general: "We're passionate about delivering exceptional value and innovative solutions. Our commitment to excellence drives everything we do."
  }
  
  return descriptions[businessType as keyof typeof descriptions] || descriptions.general
}

function generateFeatures(businessType: Industry) {
  const featureSets: Record<Industry, string[]> = {
    tech: [
      "AI-Powered Automation",
      "Real-time Analytics",
      "Cloud Integration",
      "Advanced Security",
      "Mobile Optimization",
      "API Access"
    ],
    saas: [
      "Cloud-Based Platform",
      "Multi-tenant Architecture",
      "Subscription Management",
      "Advanced Analytics",
      "API Integration",
      "White-label Options"
    ],
    "mobile-app": [
      "Cross-platform Support",
      "Offline Functionality",
      "Push Notifications",
      "In-app Purchases",
      "Social Integration",
      "Performance Optimization"
    ],
    game: [
      "Multiplayer Support",
      "Achievement System",
      "In-game Purchases",
      "Social Features",
      "Cross-platform Play",
      "Regular Updates"
    ],
    book: [
      "Digital Publishing",
      "Multi-format Support",
      "Reading Analytics",
      "Author Dashboard",
      "Royalty Tracking",
      "Marketing Tools"
    ],
    comic: [
      "Digital Comics Reader",
      "Art Gallery",
      "Creator Tools",
      "Community Features",
      "Merchandise Store",
      "Subscription Access"
    ],
    "digital-product": [
      "Instant Download",
      "Multiple Formats",
      "License Management",
      "Update System",
      "Support Portal",
      "Affiliate Program"
    ],
    creative: [
      "Creative Tools",
      "Asset Library",
      "Collaboration Features",
      "Export Options",
      "Template Gallery",
      "Community Showcase"
    ],
    productivity: [
      "Task Management",
      "Team Collaboration",
      "Time Tracking",
      "Project Templates",
      "Integration Hub",
      "Reporting Dashboard"
    ],
    social: [
      "User Profiles",
      "Community Forums",
      "Messaging System",
      "Content Sharing",
      "Moderation Tools",
      "Analytics Dashboard"
    ],
    analytics: [
      "Data Visualization",
      "Real-time Dashboards",
      "Custom Reports",
      "API Access",
      "Export Options",
      "Alert System"
    ],
    ecommerce: [
      "Secure Payment Processing",
      "Fast Shipping",
      "Easy Returns",
      "Product Reviews",
      "Wishlist Management",
      "Loyalty Program"
    ],
    service: [
      "24/7 Support",
      "Custom Solutions",
      "Expert Consultation",
      "Quality Assurance",
      "Flexible Scheduling",
      "Progress Tracking"
    ],
    education: [
      "Interactive Learning",
      "Expert Instructors",
      "Progress Tracking",
      "Certificate Programs",
      "Community Access",
      "Lifetime Access"
    ],
    health: [
      "Personalized Plans",
      "Expert Guidance",
      "Progress Tracking",
      "Nutrition Support",
      "Community Access",
      "Mobile App"
    ],
    finance: [
      "Portfolio Management",
      "Risk Assessment",
      "Tax Optimization",
      "Retirement Planning",
      "Investment Advice",
      "Financial Education"
    ],
    "real-estate": [
      "Property Search",
      "Virtual Tours",
      "Market Analysis",
      "Financing Options",
      "Agent Matching",
      "Document Management"
    ],
    food: [
      "Menu Management",
      "Order Processing",
      "Delivery Tracking",
      "Customer Reviews",
      "Inventory Management",
      "Analytics Dashboard"
    ],
    travel: [
      "Trip Planning",
      "Booking Management",
      "Travel Insurance",
      "Local Guides",
      "Real-time Updates",
      "Customer Support"
    ],
    entertainment: [
      "Content Streaming",
      "Personalized Recommendations",
      "Social Features",
      "Offline Downloads",
      "Multi-device Sync",
      "Premium Content"
    ],
    general: [
      "Quality Assurance",
      "Customer Support",
      "Flexible Options",
      "Expert Guidance",
      "Results Tracking",
      "Continuous Improvement"
    ]
  }
  
  return featureSets[businessType] || featureSets.general
}

function generateBenefits(businessType: Industry) {
  const benefitSets: Record<Industry, string[]> = {
    tech: [
      "Save 50% of development time",
      "Reduce operational costs by 30%",
      "Improve efficiency by 200%",
      "Scale without limits"
    ],
    saas: [
      "Reduce IT costs by 60%",
      "Deploy in minutes, not months",
      "Scale automatically with growth",
      "Access from anywhere, anytime"
    ],
    "mobile-app": [
      "Reach users on any device",
      "Increase engagement by 300%",
      "Reduce development time by 40%",
      "Monetize through multiple channels"
    ],
    game: [
      "Engage players for hours",
      "Generate recurring revenue",
      "Build loyal communities",
      "Cross-platform reach"
    ],
    book: [
      "Publish instantly worldwide",
      "Earn 70% royalty rates",
      "Reach global audiences",
      "Reduce publishing costs"
    ],
    comic: [
      "Build engaged fan base",
      "Monetize through multiple channels",
      "Reach global audience",
      "Create recurring revenue"
    ],
    "digital-product": [
      "Sell 24/7 automatically",
      "Zero inventory costs",
      "Instant global delivery",
      "High profit margins"
    ],
    creative: [
      "Streamline creative workflow",
      "Collaborate seamlessly",
      "Access professional tools",
      "Showcase work globally"
    ],
    productivity: [
      "Save 10+ hours per week",
      "Improve team collaboration",
      "Track progress automatically",
      "Make data-driven decisions"
    ],
    social: [
      "Build engaged communities",
      "Increase user retention",
      "Generate user-generated content",
      "Create viral growth"
    ],
    analytics: [
      "Make data-driven decisions",
      "Identify growth opportunities",
      "Optimize performance",
      "Predict future trends"
    ],
    ecommerce: [
      "Find products 3x faster",
      "Save money with smart deals",
      "Get personalized recommendations",
      "Shop with confidence"
    ],
    service: [
      "Get results 2x faster",
      "Save time and money",
      "Professional expertise",
      "Peace of mind"
    ],
    education: [
      "Learn at your own pace",
      "Access expert knowledge",
      "Build practical skills",
      "Advance your career"
    ],
    health: [
      "Achieve your health goals",
      "Get personalized guidance",
      "Track your progress",
      "Join a supportive community"
    ],
    finance: [
      "Build wealth faster",
      "Make informed decisions",
      "Secure your future",
      "Achieve financial freedom"
    ],
    "real-estate": [
      "Find your dream home faster",
      "Save on closing costs",
      "Get expert guidance",
      "Secure the best deals"
    ],
    food: [
      "Order food 50% faster",
      "Save money on delivery",
      "Discover new restaurants",
      "Track your orders"
    ],
    travel: [
      "Plan trips 3x faster",
      "Save money on bookings",
      "Get insider tips",
      "Travel with confidence"
    ],
    entertainment: [
      "Access unlimited content",
      "Discover new favorites",
      "Watch anywhere, anytime",
      "Ad-free experience"
    ],
    general: [
      "Get better results",
      "Save time and money",
      "Professional quality",
      "Ongoing support"
    ]
  }
  
  return benefitSets[businessType] || benefitSets.general
}

function generateHowItWorks(businessType: Industry) {
  const stepSets: Record<Industry, { title: string; description: string }[]> = {
    tech: [
      { title: "Sign Up", description: "Create your account in under 2 minutes" },
      { title: "Configure", description: "Set up your preferences and requirements" },
      { title: "Launch", description: "Deploy your solution and start using it immediately" }
    ],
    saas: [
      { title: "Start Free Trial", description: "Sign up for a 14-day free trial" },
      { title: "Configure Setup", description: "Customize the platform for your needs" },
      { title: "Go Live", description: "Launch and start growing your business" }
    ],
    "mobile-app": [
      { title: "Download", description: "Get the app from App Store or Google Play" },
      { title: "Create Account", description: "Sign up and personalize your experience" },
      { title: "Start Using", description: "Begin using all features immediately" }
    ],
    game: [
      { title: "Download & Install", description: "Get the game from your preferred platform" },
      { title: "Create Character", description: "Customize your gaming experience" },
      { title: "Start Playing", description: "Jump into the action and have fun" }
    ],
    book: [
      { title: "Purchase", description: "Buy your digital book instantly" },
      { title: "Download", description: "Get your book in multiple formats" },
      { title: "Start Reading", description: "Enjoy your book on any device" }
    ],
    comic: [
      { title: "Subscribe", description: "Choose your subscription plan" },
      { title: "Browse Library", description: "Access thousands of comics" },
      { title: "Start Reading", description: "Enjoy comics on any device" }
    ],
    "digital-product": [
      { title: "Purchase", description: "Buy your digital product securely" },
      { title: "Instant Access", description: "Get immediate download access" },
      { title: "Start Using", description: "Begin using your product right away" }
    ],
    creative: [
      { title: "Sign Up", description: "Create your creative workspace" },
      { title: "Choose Tools", description: "Select the tools you need" },
      { title: "Start Creating", description: "Begin your creative journey" }
    ],
    productivity: [
      { title: "Set Up Workspace", description: "Configure your team workspace" },
      { title: "Invite Team", description: "Add your team members" },
      { title: "Start Working", description: "Begin collaborating effectively" }
    ],
    social: [
      { title: "Join Community", description: "Create your profile and join" },
      { title: "Connect", description: "Find and connect with others" },
      { title: "Engage", description: "Start participating and sharing" }
    ],
    analytics: [
      { title: "Connect Data", description: "Connect your data sources" },
      { title: "Configure Dashboards", description: "Set up your analytics views" },
      { title: "Get Insights", description: "Start making data-driven decisions" }
    ],
    ecommerce: [
      { title: "Browse", description: "Explore our curated collection of products" },
      { title: "Select", description: "Choose items that match your needs and style" },
      { title: "Purchase", description: "Complete your order with secure payment" }
    ],
    service: [
      { title: "Consultation", description: "Schedule a free consultation to discuss your needs" },
      { title: "Planning", description: "We create a customized plan for your success" },
      { title: "Execution", description: "We implement the solution and track progress" }
    ],
    education: [
      { title: "Enroll", description: "Choose your course and create your account" },
      { title: "Learn", description: "Access video lessons and interactive content" },
      { title: "Achieve", description: "Complete assignments and earn your certificate" }
    ],
    health: [
      { title: "Assessment", description: "Complete a comprehensive health assessment" },
      { title: "Plan", description: "Receive your personalized wellness plan" },
      { title: "Transform", description: "Follow your plan and track your progress" }
    ],
    finance: [
      { title: "Analysis", description: "Complete a comprehensive financial assessment" },
      { title: "Strategy", description: "Receive your personalized financial strategy" },
      { title: "Execute", description: "Implement your plan with ongoing support" }
    ],
    "real-estate": [
      { title: "Search", description: "Browse properties that match your criteria" },
      { title: "Connect", description: "Connect with agents and schedule viewings" },
      { title: "Purchase", description: "Complete your purchase with expert guidance" }
    ],
    food: [
      { title: "Browse", description: "Explore restaurants and menus in your area" },
      { title: "Order", description: "Place your order with customizations" },
      { title: "Enjoy", description: "Track delivery and enjoy your meal" }
    ],
    travel: [
      { title: "Plan", description: "Research destinations and create your itinerary" },
      { title: "Book", description: "Secure your flights, hotels, and activities" },
      { title: "Travel", description: "Enjoy your trip with 24/7 support" }
    ],
    entertainment: [
      { title: "Sign Up", description: "Create your account and choose your plan" },
      { title: "Browse", description: "Discover content tailored to your interests" },
      { title: "Enjoy", description: "Stream unlimited content on any device" }
    ],
    general: [
      { title: "Connect", description: "Get in touch and discuss your needs" },
      { title: "Plan", description: "We create a customized solution for you" },
      { title: "Deliver", description: "We implement and monitor your success" }
    ]
  }
  
  return stepSets[businessType] || stepSets.general
}

function generateFAQs(businessType: Industry) {
  const faqSets: Record<Industry, { question: string; answer: string }[]> = {
    tech: [
      { question: "How secure is your platform?", answer: "We implement enterprise-grade security measures including encryption, regular audits, and compliance with industry standards." },
      { question: "Can I integrate with existing systems?", answer: "Yes, our platform offers comprehensive API access and supports integration with most popular business tools." },
      { question: "What kind of support do you provide?", answer: "We offer 24/7 technical support, documentation, and dedicated account managers for enterprise clients." }
    ],
    saas: [
      { question: "Is my data safe in the cloud?", answer: "Yes, we use advanced encryption and regular security audits to keep your data safe." },
      { question: "Can I upgrade or downgrade my plan?", answer: "Absolutely! You can change your subscription at any time from your dashboard." },
      { question: "Do you offer integrations?", answer: "We support integrations with popular business tools and custom APIs." }
    ],
    "mobile-app": [
      { question: "Is the app available on iOS and Android?", answer: "Yes, our app is available on both the App Store and Google Play." },
      { question: "Does the app work offline?", answer: "Many features are available offline, and your data syncs when you reconnect." },
      { question: "How do I get support?", answer: "You can contact our support team directly from the app or via our website." }
    ],
    ecommerce: [
      { question: "What is your return policy?", answer: "We offer a 30-day return policy for all products. Returns are free and easy to process." },
      { question: "How fast is shipping?", answer: "Most orders ship within 24 hours and arrive within 3-5 business days." },
      { question: "Do you ship internationally?", answer: "Yes, we ship to most countries worldwide with competitive international shipping rates." }
    ],
    service: [
      { question: "How long does a typical project take?", answer: "Project timelines vary based on complexity, but we typically deliver results within 2-4 weeks." },
      { question: "Do you offer ongoing support?", answer: "Yes, we provide ongoing support and maintenance to ensure continued success." },
      { question: "What if I'm not satisfied?", answer: "We offer a satisfaction guarantee and will work to resolve any issues to your complete satisfaction." }
    ],
    education: [
      { question: "How long do I have access to courses?", answer: "You have lifetime access to all purchased courses and their updates." },
      { question: "Are certificates included?", answer: "Yes, all courses include completion certificates that you can add to your resume." },
      { question: "Can I get a refund?", answer: "We offer a 30-day money-back guarantee if you're not completely satisfied." }
    ],
    health: [
      { question: "How personalized are the plans?", answer: "All plans are customized based on your specific goals, current health status, and preferences." },
      { question: "What if I have health conditions?", answer: "We work with your healthcare providers and adapt plans to accommodate any health conditions." },
      { question: "How do I track my progress?", answer: "Our platform provides detailed progress tracking, analytics, and regular check-ins with your coach." }
    ],
    finance: [
      { question: "How do you ensure my financial security?", answer: "We use bank-level security measures and never store sensitive financial information on our servers." },
      { question: "What if I'm new to investing?", answer: "We provide comprehensive education and start with conservative strategies suitable for beginners." },
      { question: "How often do you review my portfolio?", answer: "We conduct quarterly portfolio reviews and provide monthly performance updates." }
    ],
    "real-estate": [
      { question: "How do you verify property listings?", answer: "All listings are verified by our team and include detailed information and photos." },
      { question: "What fees are involved?", answer: "We're transparent about all fees. Most services are free for buyers, with standard real estate fees for sellers." },
      { question: "Do you offer financing options?", answer: "Yes, we partner with multiple lenders to offer competitive financing options." }
    ],
    food: [
      { question: "How fast is delivery?", answer: "Most orders are delivered within 30-45 minutes, depending on your location and restaurant." },
      { question: "What if my order is wrong?", answer: "We offer a satisfaction guarantee and will replace or refund any incorrect orders." },
      { question: "Do you offer dietary options?", answer: "Yes, we provide detailed dietary information and filtering options for all restaurants." }
    ],
    travel: [
      { question: "Are prices guaranteed?", answer: "Yes, all prices are guaranteed at the time of booking with no hidden fees." },
      { question: "What if I need to cancel?", answer: "Cancellation policies vary by booking type, but we offer flexible options for most reservations." },
      { question: "Do you offer travel insurance?", answer: "Yes, we offer comprehensive travel insurance options for all bookings." }
    ],
    entertainment: [
      { question: "Can I download content offline?", answer: "Yes, premium subscribers can download content for offline viewing on mobile devices." },
      { question: "How many devices can I use?", answer: "You can stream on up to 4 devices simultaneously with a premium subscription." },
      { question: "Is there a free trial?", answer: "Yes, we offer a 30-day free trial for all new subscribers." }
    ],
    general: [
      { question: "What makes you different?", answer: "We combine expertise with personalized service to deliver results that exceed expectations." },
      { question: "How do I get started?", answer: "Simply contact us for a free consultation to discuss your needs and how we can help." },
      { question: "What is your success rate?", answer: "We have a 95% client satisfaction rate and consistently deliver measurable results." }
    ]
  }
  
  return faqSets[businessType] || faqSets.general
}

function generatePricing(businessType: Industry) {
  const pricingSets: Record<Industry, { name: string; price: string; features: string[] }[]> = {
    tech: [
      { name: "Starter", price: "$29", features: ["Basic Features", "Email Support", "1 Project", "5GB Storage"] },
      { name: "Professional", price: "$99", features: ["Advanced Features", "Priority Support", "10 Projects", "50GB Storage", "API Access"] },
      { name: "Enterprise", price: "Custom", features: ["All Features", "Dedicated Support", "Unlimited Projects", "Custom Storage", "White Label"] }
    ],
    saas: [
      { name: "Basic", price: "$49/month", features: ["Cloud Platform", "Multi-tenant", "Email Support", "API Access"] },
      { name: "Growth", price: "$149/month", features: ["Advanced Analytics", "Priority Support", "Custom Integrations", "White-label"] },
      { name: "Enterprise", price: "Custom", features: ["All Features", "Dedicated Manager", "Custom SLAs", "Unlimited Users"] }
    ],
    "mobile-app": [
      { name: "Free", price: "$0", features: ["Core Features", "Sync Across Devices", "Basic Support"] },
      { name: "Pro", price: "$4.99/month", features: ["Offline Mode", "Priority Support", "Custom Themes"] },
      { name: "Team", price: "$19.99/month", features: ["Team Collaboration", "Admin Controls", "Advanced Analytics"] }
    ],
    ecommerce: [
      { name: "Basic", price: "Free", features: ["Browse Products", "Basic Account", "Email Support"] },
      { name: "Premium", price: "$19/month", features: ["Free Shipping", "Priority Support", "Exclusive Deals", "Wishlist"] },
      { name: "VIP", price: "$49/month", features: ["All Premium Features", "Personal Shopper", "Early Access", "Concierge Service"] }
    ],
    service: [
      { name: "Consultation", price: "$150", features: ["1-Hour Session", "Action Plan", "Email Follow-up", "30-Day Support"] },
      { name: "Project", price: "$2,500", features: ["Full Implementation", "3 Months Support", "Progress Reports", "Guaranteed Results"] },
      { name: "Ongoing", price: "$500/month", features: ["Continuous Support", "Monthly Reviews", "Strategy Updates", "Priority Access"] }
    ],
    education: [
      { name: "Single Course", price: "$97", features: ["Lifetime Access", "Certificate", "Community Access", "Email Support"] },
      { name: "All Access", price: "$297", features: ["All Courses", "Certificates", "Community Access", "Priority Support"] },
      { name: "Mentorship", price: "$997", features: ["All Access", "1-on-1 Coaching", "Custom Projects", "Career Guidance"] }
    ],
    health: [
      { name: "Basic Plan", price: "$49/month", features: ["Assessment", "Basic Plan", "Email Support", "Progress Tracking"] },
      { name: "Premium Plan", price: "$99/month", features: ["Comprehensive Assessment", "Custom Plan", "Coach Support", "Advanced Tracking"] },
      { name: "Elite Plan", price: "$199/month", features: ["All Premium Features", "1-on-1 Coaching", "Nutritionist", "24/7 Support"] }
    ],
    finance: [
      { name: "Basic", price: "$29/month", features: ["Portfolio Tracking", "Basic Analysis", "Email Support"] },
      { name: "Professional", price: "$99/month", features: ["Advanced Analytics", "Advisor Support", "Tax Optimization", "Retirement Planning"] },
      { name: "Wealth Management", price: "$299/month", features: ["All Professional Features", "Personal Advisor", "Estate Planning", "Priority Support"] }
    ],
    "real-estate": [
      { name: "Basic", price: "Free", features: ["Property Search", "Basic Listings", "Email Support"] },
      { name: "Premium", price: "$29/month", features: ["Advanced Search", "Market Analysis", "Agent Matching", "Priority Support"] },
      { name: "Professional", price: "$99/month", features: ["All Premium Features", "Personal Agent", "Financing Help", "Concierge Service"] }
    ],
    food: [
      { name: "Basic", price: "Free", features: ["Browse Restaurants", "Basic Orders", "Email Support"] },
      { name: "Premium", price: "$9/month", features: ["Free Delivery", "Priority Support", "Exclusive Deals", "Loyalty Rewards"] },
      { name: "VIP", price: "$19/month", features: ["All Premium Features", "Personal Concierge", "Early Access", "Premium Support"] }
    ],
    travel: [
      { name: "Basic", price: "Free", features: ["Trip Planning", "Basic Bookings", "Email Support"] },
      { name: "Premium", price: "$19/month", features: ["Priority Support", "Exclusive Deals", "Travel Insurance", "Concierge Service"] },
      { name: "Elite", price: "$49/month", features: ["All Premium Features", "Personal Travel Agent", "VIP Access", "24/7 Support"] }
    ],
    entertainment: [
      { name: "Basic", price: "$9/month", features: ["Standard Streaming", "Ad-supported", "1 Device", "Email Support"] },
      { name: "Premium", price: "$15/month", features: ["Ad-free Streaming", "4K Quality", "4 Devices", "Offline Downloads"] },
      { name: "Family", price: "$20/month", features: ["All Premium Features", "6 Devices", "Parental Controls", "Priority Support"] }
    ],
    general: [
      { name: "Starter", price: "$29", features: ["Basic Features", "Email Support", "Standard Service"] },
      { name: "Professional", price: "$99", features: ["Advanced Features", "Priority Support", "Custom Solutions"] },
      { name: "Enterprise", price: "Custom", features: ["All Features", "Dedicated Support", "White Label Options"] }
    ]
  }
  
  return pricingSets[businessType] || pricingSets.general
}

function generateOnboardingSteps(prompt: string, businessType: Industry) {
  const onboardingSets: Record<Industry, { question: string; answer: string }[]> = {
    tech: [
      { question: "What type of software are you looking to build?", answer: "Web App, Mobile App, Desktop App, API, Other" },
      { question: "What's your team size?", answer: "1-5 people, 6-20 people, 21-50 people, 50+ people" },
      { question: "What's your budget range?", answer: "Under $10k, $10k-$50k, $50k-$200k, $200k+" },
      { question: "When do you need this completed?", answer: "ASAP, 1-3 months, 3-6 months, 6+ months" }
    ],
    saas: [
      { question: "What business process do you want to automate?", answer: "CRM, HR, Accounting, Project Management, Other" },
      { question: "How many users will you have?", answer: "1-10, 11-50, 51-200, 200+" },
      { question: "What integrations do you need?", answer: "Slack, Zapier, Salesforce, Custom API, None" },
      { question: "What is your preferred billing cycle?", answer: "Monthly, Annual, Custom" }
    ],
    "mobile-app": [
      { question: "What platform do you use?", answer: "iOS, Android, Both" },
      { question: "Do you need offline support?", answer: "Yes, No, Not Sure" },
      { question: "Will you use push notifications?", answer: "Yes, No, Maybe" },
      { question: "How many users do you expect?", answer: "1-100, 101-1,000, 1,001-10,000, 10,000+" }
    ],
    ecommerce: [
      { question: "What type of products do you want to sell?", answer: "Physical Products, Digital Products, Services, Mixed" },
      { question: "What's your target market?", answer: "B2B, B2C, Both, Niche Market" },
      { question: "Do you have existing inventory?", answer: "Yes, No, Planning to source, Dropshipping" },
      { question: "What's your monthly sales goal?", answer: "Under $5k, $5k-$20k, $20k-$100k, $100k+" }
    ],
    service: [
      { question: "What type of service do you provide?", answer: "Consulting, Design, Development, Marketing, Other" },
      { question: "Who is your target client?", answer: "Small Business, Enterprise, Individuals, Specific Industry" },
      { question: "What's your service delivery model?", answer: "One-time, Recurring, Project-based, Retainer" },
      { question: "What's your average project value?", answer: "Under $1k, $1k-$5k, $5k-$20k, $20k+" }
    ],
    education: [
      { question: "What type of education do you offer?", answer: "Online Courses, Workshops, Certifications, Coaching" },
      { question: "Who is your target audience?", answer: "Students, Professionals, Entrepreneurs, Specific Industry" },
      { question: "What's your teaching format?", answer: "Video, Live Sessions, Interactive, Mixed" },
      { question: "What's your pricing model?", answer: "One-time, Subscription, Freemium, Premium" }
    ],
    health: [
      { question: "What type of health service do you offer?", answer: "Fitness, Nutrition, Mental Health, Wellness, Medical" },
      { question: "Who is your target audience?", answer: "Individuals, Athletes, Seniors, Specific Conditions" },
      { question: "What's your service delivery?", answer: "In-person, Online, Hybrid, Mobile App" },
      { question: "What's your pricing model?", answer: "One-time, Monthly, Annual, Pay-per-session" }
    ],
    finance: [
      { question: "What type of financial service do you offer?", answer: "Investment, Banking, Insurance, Planning, Trading" },
      { question: "Who is your target client?", answer: "Individuals, Small Business, Enterprise, High Net Worth" },
      { question: "What's your service model?", answer: "Self-service, Robo-advisor, Human advisor, Hybrid" },
      { question: "What's your fee structure?", answer: "Percentage-based, Fixed fee, Commission, Mixed" }
    ],
    "real-estate": [
      { question: "What type of real estate do you focus on?", answer: "Residential, Commercial, Investment, Land" },
      { question: "Who is your target client?", answer: "Buyers, Sellers, Investors, Renters" },
      { question: "What's your service area?", answer: "Local, Regional, National, International" },
      { question: "What's your commission structure?", answer: "Standard, Discounted, Flat fee, Hybrid" }
    ],
    food: [
      { question: "What type of food service do you offer?", answer: "Restaurant, Delivery, Catering, Meal Prep" },
      { question: "What cuisine do you specialize in?", answer: "American, International, Healthy, Specialty" },
      { question: "What's your delivery area?", answer: "Local, Regional, National, International" },
      { question: "What's your pricing model?", answer: "Fixed menu, Variable pricing, Subscription, Pay-per-order" }
    ],
    travel: [
      { question: "What type of travel service do you offer?", answer: "Booking, Planning, Tours, Accommodation" },
      { question: "What destinations do you focus on?", answer: "Domestic, International, Specific regions, Worldwide" },
      { question: "Who is your target traveler?", answer: "Leisure, Business, Adventure, Luxury" },
      { question: "What's your pricing model?", answer: "Commission-based, Fixed fee, Subscription, Pay-per-booking" }
    ],
    entertainment: [
      { question: "What type of entertainment do you offer?", answer: "Streaming, Gaming, Music, Video, Events" },
      { question: "What content do you specialize in?", answer: "Movies, TV Shows, Original Content, User-generated" },
      { question: "What's your platform?", answer: "Web, Mobile, Desktop, Smart TV, Gaming Console" },
      { question: "What's your pricing model?", answer: "Free with ads, Subscription, Pay-per-view, Freemium" }
    ],
    general: [
      { question: "What industry are you in?", answer: "Technology, Healthcare, Finance, Education, Other" },
      { question: "What's your business size?", answer: "Startup, Small Business, Medium Business, Enterprise" },
      { question: "What's your primary goal?", answer: "Increase Sales, Improve Efficiency, Reduce Costs, Other" },
      { question: "What's your timeline?", answer: "Immediate, 1-3 months, 3-6 months, 6+ months" }
    ]
  }
  
  return onboardingSets[businessType] || onboardingSets.general
}

function generateTargetAudience(businessType: Industry) {
  const audienceSets: Record<Industry, string> = {
    tech: "Tech-savvy professionals, startups, and enterprises looking for innovative solutions",
    saas: "Businesses and teams seeking scalable, cloud-based software solutions",
    "mobile-app": "Mobile users looking for powerful, easy-to-use apps on the go",
    ecommerce: "Online shoppers seeking quality products and convenient shopping experiences",
    service: "Businesses and individuals seeking professional expertise and reliable solutions",
    education: "Lifelong learners, professionals, and students looking to advance their skills",
    health: "Health-conscious individuals and wellness enthusiasts seeking personalized guidance",
    finance: "Individuals and businesses looking to optimize their financial strategies",
    "real-estate": "Homebuyers, sellers, and investors seeking expert real estate guidance",
    food: "Food enthusiasts and busy professionals seeking convenient dining solutions",
    travel: "Adventure seekers and business travelers looking for seamless travel experiences",
    entertainment: "Content consumers seeking high-quality entertainment and streaming options",
    general: "Professionals and businesses seeking reliable solutions and expert guidance"
  }
  
  return audienceSets[businessType] || audienceSets.general
}

function generateValueProposition(prompt: string, businessType: Industry) {
  const valueProps: Record<Industry, string> = {
    tech: "Cutting-edge technology solutions that streamline operations and drive innovation",
    saas: "Cloud-based software that automates business processes and scales with your growth",
    "mobile-app": "A seamless mobile experience that keeps you connected and productive anywhere",
    ecommerce: "Curated products and seamless shopping experiences that save time and money",
    service: "Expert solutions delivered with professionalism and guaranteed results",
    education: "Comprehensive learning experiences that accelerate career growth and skill development",
    health: "Personalized wellness solutions that transform health and improve quality of life",
    finance: "Smart financial strategies that build wealth and secure financial futures",
    "real-estate": "Expert guidance and innovative tools that simplify the real estate journey",
    food: "Delicious food delivered with speed, quality, and exceptional service",
    travel: "Seamless travel experiences that create unforgettable memories and adventures",
    entertainment: "Premium entertainment content that captivates and inspires audiences",
    general: "Innovative solutions that deliver exceptional value and measurable results"
  }
  
  return valueProps[businessType] || valueProps.general
}

function generateCallToAction(businessType: Industry) {
  const ctaSets: Record<Industry, string> = {
    tech: "Start Building Today",
    saas: "Start Your Free Trial",
    "mobile-app": "Download the App",
    ecommerce: "Shop Now",
    service: "Get Started",
    education: "Start Learning",
    health: "Begin Your Journey",
    finance: "Start Investing",
    "real-estate": "Find Your Home",
    food: "Order Now",
    travel: "Plan Your Trip",
    entertainment: "Start Watching",
    general: "Get Started"
  }
  
  return ctaSets[businessType] || ctaSets.general
}

function generateSocialProof(industry: Industry) {
  const socialProofData: Record<Industry, { [key: string]: string }> = {
    tech: {
      users: "10,000+",
      companies: "500+",
      countries: "50+",
      satisfaction: "98%"
    },
    ecommerce: {
      customers: "50,000+",
      products: "10,000+",
      countries: "30+",
      satisfaction: "96%"
    },
    service: {
      clients: "1,000+",
      projects: "5,000+",
      industries: "20+",
      satisfaction: "99%"
    },
    education: {
      students: "25,000+",
      courses: "100+",
      countries: "40+",
      satisfaction: "97%"
    },
    health: {
      members: "15,000+",
      programs: "50+",
      countries: "25+",
      satisfaction: "95%"
    },
    finance: {
      clients: "5,000+",
      portfolios: "10,000+",
      countries: "15+",
      satisfaction: "98%"
    },
    "real-estate": {
      clients: "2,000+",
      properties: "5,000+",
      cities: "100+",
      satisfaction: "97%"
    },
    food: {
      customers: "100,000+",
      restaurants: "1,000+",
      cities: "50+",
      satisfaction: "94%"
    },
    travel: {
      travelers: "20,000+",
      destinations: "200+",
      countries: "30+",
      satisfaction: "96%"
    },
    entertainment: {
      subscribers: "500,000+",
      titles: "10,000+",
      countries: "60+",
      satisfaction: "95%"
    },
    general: {
      clients: "10,000+",
      projects: "20,000+",
      countries: "30+",
      satisfaction: "96%"
    }
  }
  
  return socialProofData[industry] || socialProofData.general
}

function generateTestimonials(industry: Industry) {
  const testimonialSets: Record<Industry, { name: string; role: string; content: string; rating: number }[]> = {
    tech: [
      {
        name: "Sarah Chen",
        role: "CTO at TechFlow",
        content: "This platform revolutionized our development process. We've reduced deployment time by 70% and our team is more productive than ever.",
        rating: 5
      },
      {
        name: "Michael Rodriguez",
        role: "Lead Developer",
        content: "The integration was seamless and the support team is incredibly responsive. Highly recommended for any tech company.",
        rating: 5
      }
    ],
    saas: [
      {
        name: "Olivia Martinez",
        role: "COO at CloudSuite",
        content: "Our operations are more efficient and our team collaborates better than ever. The SaaS platform is a game changer!",
        rating: 5
      },
      {
        name: "Daniel Lee",
        role: "IT Manager",
        content: "The onboarding was smooth and the support is top-notch. We love the flexibility and integrations!",
        rating: 5
      }
    ],
    "mobile-app": [
      {
        name: "Sophia Turner",
        role: "App User",
        content: "The app is fast, reliable, and easy to use. I love being able to access everything on the go!",
        rating: 5
      },
      {
        name: "Liam Walker",
        role: "Mobile Developer",
        content: "The cross-platform support and offline features are fantastic. Highly recommended for anyone building mobile apps!",
        rating: 5
      }
    ],
    ecommerce: [
      {
        name: "Emma Thompson",
        role: "Store Owner",
        content: "Our sales increased by 300% within the first month. The platform is intuitive and our customers love the experience.",
        rating: 5
      },
      {
        name: "David Kim",
        role: "E-commerce Manager",
        content: "The analytics and optimization features are game-changing. We've seen significant improvements in conversion rates.",
        rating: 5
      }
    ],
    service: [
      {
        name: "Jennifer Adams",
        role: "CEO at GrowthCo",
        content: "They delivered results beyond our expectations. Our revenue increased by 150% in just 6 months.",
        rating: 5
      },
      {
        name: "Robert Wilson",
        role: "Marketing Director",
        content: "Professional, reliable, and results-driven. They transformed our marketing strategy completely.",
        rating: 5
      }
    ],
    education: [
      {
        name: "Lisa Park",
        role: "Student",
        content: "The courses are well-structured and the instructors are experts in their fields. I've learned so much!",
        rating: 5
      },
      {
        name: "James Miller",
        role: "Career Changer",
        content: "This platform helped me transition into a new career. The practical projects were invaluable.",
        rating: 5
      }
    ],
    health: [
      {
        name: "Maria Garcia",
        role: "Fitness Enthusiast",
        content: "I've achieved my health goals faster than ever. The personalized plans and support are amazing.",
        rating: 5
      },
      {
        name: "Alex Johnson",
        role: "Wellness Coach",
        content: "My clients love the platform. It makes tracking progress and staying motivated so much easier.",
        rating: 5
      }
    ],
    finance: [
      {
        name: "Thomas Brown",
        role: "Investor",
        content: "The investment strategies are sound and the returns have exceeded my expectations. Great platform!",
        rating: 5
      },
      {
        name: "Rachel Green",
        role: "Financial Advisor",
        content: "This platform helps me provide better service to my clients. The tools and insights are invaluable.",
        rating: 5
      }
    ],
    "real-estate": [
      {
        name: "Sarah Johnson",
        role: "Homebuyer",
        content: "Found my dream home in just 2 weeks! The platform made the entire process so much easier.",
        rating: 5
      },
      {
        name: "Mark Davis",
        role: "Real Estate Investor",
        content: "The market analysis tools are incredible. I've made better investment decisions than ever before.",
        rating: 5
      }
    ],
    food: [
      {
        name: "Emily Chen",
        role: "Food Enthusiast",
        content: "The variety of restaurants and fast delivery make this my go-to for all my food needs.",
        rating: 5
      },
      {
        name: "Carlos Rodriguez",
        role: "Busy Professional",
        content: "Saves me so much time! The food is always fresh and delivery is incredibly reliable.",
        rating: 5
      }
    ],
    travel: [
      {
        name: "Jessica Lee",
        role: "Travel Blogger",
        content: "The trip planning features are amazing. I've discovered incredible destinations I never knew existed.",
        rating: 5
      },
      {
        name: "Kevin Smith",
        role: "Business Traveler",
        content: "Makes business travel so much easier. The booking process is seamless and support is excellent.",
        rating: 5
      }
    ],
    entertainment: [
      {
        name: "Amanda Wilson",
        role: "Movie Buff",
        content: "The content library is massive and the recommendations are spot-on. Love the streaming quality!",
        rating: 5
      },
      {
        name: "Ryan Taylor",
        role: "Gaming Enthusiast",
        content: "The gaming content is incredible. I've discovered so many amazing games through this platform.",
        rating: 5
      }
    ],
    general: [
      {
        name: "Amanda White",
        role: "Business Owner",
        content: "Exceptional service and outstanding results. They truly understand our business needs.",
        rating: 5
      },
      {
        name: "Chris Davis",
        role: "Project Manager",
        content: "Professional, efficient, and delivers on promises. Highly recommended for any business.",
        rating: 5
      }
    ]
  }
  
  return testimonialSets[industry] || testimonialSets.general
}

function generatePageStyle(industry: Industry) {
  // Generate a random design variation for the same industry
  const designVariations = [
    "modern-minimalist",
    "classic-elegant", 
    "bold-dynamic",
    "soft-friendly",
    "professional-corporate",
    "creative-artistic",
    "tech-futuristic",
    "natural-organic"
  ]
  
  const randomVariation = designVariations[Math.floor(Math.random() * designVariations.length)]
  
  const styles: Record<Industry, { theme: string; colorScheme: string; layout: string; visualStyle: string; typography: string; animations: string; customColors: { primary: string; secondary: string; accent: string; text: string; background: string }; designVariation: string }> = {
    tech: {
      theme: "Modern",
      colorScheme: "Blue",
      layout: "Grid",
      visualStyle: "Clean",
      typography: "Sans-serif",
      animations: "FadeIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#007bff",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    saas: {
      theme: "Enterprise",
      colorScheme: "Indigo",
      layout: "Grid",
      visualStyle: "Professional",
      typography: "Sans-serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#6610f2",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    "mobile-app": {
      theme: "Mobile",
      colorScheme: "Purple",
      layout: "Card",
      visualStyle: "Modern",
      typography: "Sans-serif",
      animations: "BounceIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#6f42c1",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    game: {
      theme: "Gaming",
      colorScheme: "Neon",
      layout: "Grid",
      visualStyle: "Bold",
      typography: "Display",
      animations: "PulseIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#ff007f",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    book: {
      theme: "Literary",
      colorScheme: "Warm",
      layout: "Column",
      visualStyle: "Elegant",
      typography: "Serif",
      animations: "FadeIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#ffc107",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    comic: {
      theme: "Artistic",
      colorScheme: "Vibrant",
      layout: "Gallery",
      visualStyle: "Creative",
      typography: "Display",
      animations: "ZoomIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#e83e8c",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    "digital-product": {
      theme: "Digital",
      colorScheme: "Green",
      layout: "Grid",
      visualStyle: "Clean",
      typography: "Sans-serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#28a745",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    creative: {
      theme: "Creative",
      colorScheme: "Rainbow",
      layout: "Gallery",
      visualStyle: "Artistic",
      typography: "Display",
      animations: "SpinIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#ff007f",
        secondary: "#ffc107",
        accent: "#28a745",
        text: "#333",
        background: "#fff"
      }
    },
    productivity: {
      theme: "Productive",
      colorScheme: "Orange",
      layout: "Grid",
      visualStyle: "Minimalist",
      typography: "Sans-serif",
      animations: "FadeIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#fd7e14",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    social: {
      theme: "Social",
      colorScheme: "Pink",
      layout: "Feed",
      visualStyle: "Friendly",
      typography: "Sans-serif",
      animations: "BounceIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#e83e8c",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    analytics: {
      theme: "Data",
      colorScheme: "Teal",
      layout: "Dashboard",
      visualStyle: "Clean",
      typography: "Sans-serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#20c997",
        secondary: "#6c757d",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    ecommerce: {
      theme: "Elegant",
      colorScheme: "Gold",
      layout: "Grid",
      visualStyle: "Luxury",
      typography: "Serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#ffc107",
        secondary: "#6c757d",
        accent: "#28a745",
        text: "#333",
        background: "#fff"
      }
    },
    service: {
      theme: "Professional",
      colorScheme: "Gray",
      layout: "Column",
      visualStyle: "Minimalist",
      typography: "Sans-serif",
      animations: "ZoomIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#6c757d",
        secondary: "#fff",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    },
    education: {
      theme: "Educational",
      colorScheme: "Green",
      layout: "Column",
      visualStyle: "Vintage",
      typography: "Serif",
      animations: "BounceIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#28a745",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    health: {
      theme: "Wellness",
      colorScheme: "Teal",
      layout: "Grid",
      visualStyle: "Natural",
      typography: "Sans-serif",
      animations: "PulseIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#20c997",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    finance: {
      theme: "Financial",
      colorScheme: "Purple",
      layout: "Grid",
      visualStyle: "Modern",
      typography: "Sans-serif",
      animations: "SpinIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#6f42c1",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    "real-estate": {
      theme: "Residential",
      colorScheme: "Brown",
      layout: "Column",
      visualStyle: "Traditional",
      typography: "Serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#343a40",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#fff",
        background: "#fff"
      }
    },
    food: {
      theme: "Culinary",
      colorScheme: "Red",
      layout: "Grid",
      visualStyle: "Artistic",
      typography: "Serif",
      animations: "FadeIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#dc3545",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    travel: {
      theme: "Adventure",
      colorScheme: "Blue",
      layout: "Grid",
      visualStyle: "Modern",
      typography: "Sans-serif",
      animations: "SlideIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#007bff",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    entertainment: {
      theme: "Entertainment",
      colorScheme: "Pink",
      layout: "Grid",
      visualStyle: "Bright",
      typography: "Serif",
      animations: "ZoomIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#e83e8c",
        secondary: "#6c757d",
        accent: "#ffc107",
        text: "#333",
        background: "#fff"
      }
    },
    general: {
      theme: "Generic",
      colorScheme: "Gray",
      layout: "Column",
      visualStyle: "Minimalist",
      typography: "Sans-serif",
      animations: "FadeIn",
      designVariation: randomVariation,
      customColors: {
        primary: "#6c757d",
        secondary: "#fff",
        accent: "#dc3545",
        text: "#333",
        background: "#fff"
      }
    }
  }
  
  return styles[industry] || styles.general
}

function detectColorsFromPrompt(prompt: string) {
  const colorKeywords = {
    brown: ['brown', 'tan', 'beige', 'chocolate', 'coffee'],
    white: ['white', 'cream', 'ivory', 'snow', 'pearl'],
    blue: ['blue', 'navy', 'azure', 'cobalt', 'sapphire'],
    green: ['green', 'emerald', 'forest', 'mint', 'sage'],
    red: ['red', 'crimson', 'scarlet', 'ruby', 'burgundy'],
    purple: ['purple', 'violet', 'lavender', 'plum', 'magenta'],
    pink: ['pink', 'rose', 'fuchsia', 'coral', 'salmon'],
    yellow: ['yellow', 'gold', 'amber', 'mustard', 'lemon'],
    orange: ['orange', 'tangerine', 'peach', 'apricot', 'coral'],
    gray: ['gray', 'grey', 'silver', 'charcoal', 'slate'],
    black: ['black', 'onyx', 'ebony', 'jet', 'coal']
  }

  const detectedColors: string[] = []
  const lowerPrompt = prompt.toLowerCase()

  for (const [color, keywords] of Object.entries(colorKeywords)) {
    if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
      detectedColors.push(color)
    }
  }

  return detectedColors
}

function generateImages(industry: Industry) {
  const imageSets: Record<Industry, { hero: string; features: string[]; testimonials: string[]; icons: string[]; customImages: { logo?: string; heroImage?: string; featureImages: string[]; testimonialImages: string[] } }> = {
    tech: {
      hero: "/images/tech-hero.jpg",
      features: ["/images/tech-feature1.jpg", "/images/tech-feature2.jpg", "/images/tech-feature3.jpg"],
      testimonials: ["/images/tech-testimonial1.jpg", "/images/tech-testimonial2.jpg"],
      icons: ["/images/tech-icon1.svg", "/images/tech-icon2.svg", "/images/tech-icon3.svg"],
      customImages: {
        logo: "/images/tech-logo.svg",
        heroImage: "/images/tech-hero-custom.jpg",
        featureImages: ["/images/tech-feature-custom1.jpg", "/images/tech-feature-custom2.jpg"],
        testimonialImages: ["/images/tech-testimonial-custom1.jpg"]
      }
    },
    saas: {
      hero: "/images/saas-hero.jpg",
      features: ["/images/saas-feature1.jpg", "/images/saas-feature2.jpg", "/images/saas-feature3.jpg"],
      testimonials: ["/images/saas-testimonial1.jpg", "/images/saas-testimonial2.jpg"],
      icons: ["/images/saas-icon1.svg", "/images/saas-icon2.svg", "/images/saas-icon3.svg"],
      customImages: {
        logo: "/images/saas-logo.svg",
        heroImage: "/images/saas-hero-custom.jpg",
        featureImages: ["/images/saas-feature-custom1.jpg", "/images/saas-feature-custom2.jpg"],
        testimonialImages: ["/images/saas-testimonial-custom1.jpg"]
      }
    },
    "mobile-app": {
      hero: "/images/mobile-hero.jpg",
      features: ["/images/mobile-feature1.jpg", "/images/mobile-feature2.jpg", "/images/mobile-feature3.jpg"],
      testimonials: ["/images/mobile-testimonial1.jpg", "/images/mobile-testimonial2.jpg"],
      icons: ["/images/mobile-icon1.svg", "/images/mobile-icon2.svg", "/images/mobile-icon3.svg"],
      customImages: {
        logo: "/images/mobile-logo.svg",
        heroImage: "/images/mobile-hero-custom.jpg",
        featureImages: ["/images/mobile-feature-custom1.jpg", "/images/mobile-feature-custom2.jpg"],
        testimonialImages: ["/images/mobile-testimonial-custom1.jpg"]
      }
    },
    game: {
      hero: "/images/game-hero.jpg",
      features: ["/images/game-feature1.jpg", "/images/game-feature2.jpg", "/images/game-feature3.jpg"],
      testimonials: ["/images/game-testimonial1.jpg", "/images/game-testimonial2.jpg"],
      icons: ["/images/game-icon1.svg", "/images/game-icon2.svg", "/images/game-icon3.svg"],
      customImages: {
        logo: "/images/game-logo.svg",
        heroImage: "/images/game-hero-custom.jpg",
        featureImages: ["/images/game-feature-custom1.jpg", "/images/game-feature-custom2.jpg"],
        testimonialImages: ["/images/game-testimonial-custom1.jpg"]
      }
    },
    book: {
      hero: "/images/book-hero.jpg",
      features: ["/images/book-feature1.jpg", "/images/book-feature2.jpg", "/images/book-feature3.jpg"],
      testimonials: ["/images/book-testimonial1.jpg", "/images/book-testimonial2.jpg"],
      icons: ["/images/book-icon1.svg", "/images/book-icon2.svg", "/images/book-icon3.svg"],
      customImages: {
        logo: "/images/book-logo.svg",
        heroImage: "/images/book-hero-custom.jpg",
        featureImages: ["/images/book-feature-custom1.jpg", "/images/book-feature-custom2.jpg"],
        testimonialImages: ["/images/book-testimonial-custom1.jpg"]
      }
    },
    comic: {
      hero: "/images/comic-hero.jpg",
      features: ["/images/comic-feature1.jpg", "/images/comic-feature2.jpg", "/images/comic-feature3.jpg"],
      testimonials: ["/images/comic-testimonial1.jpg", "/images/comic-testimonial2.jpg"],
      icons: ["/images/comic-icon1.svg", "/images/comic-icon2.svg", "/images/comic-icon3.svg"],
      customImages: {
        logo: "/images/comic-logo.svg",
        heroImage: "/images/comic-hero-custom.jpg",
        featureImages: ["/images/comic-feature-custom1.jpg", "/images/comic-feature-custom2.jpg"],
        testimonialImages: ["/images/comic-testimonial-custom1.jpg"]
      }
    },
    "digital-product": {
      hero: "/images/digital-hero.jpg",
      features: ["/images/digital-feature1.jpg", "/images/digital-feature2.jpg", "/images/digital-feature3.jpg"],
      testimonials: ["/images/digital-testimonial1.jpg", "/images/digital-testimonial2.jpg"],
      icons: ["/images/digital-icon1.svg", "/images/digital-icon2.svg", "/images/digital-icon3.svg"],
      customImages: {
        logo: "/images/digital-logo.svg",
        heroImage: "/images/digital-hero-custom.jpg",
        featureImages: ["/images/digital-feature-custom1.jpg", "/images/digital-feature-custom2.jpg"],
        testimonialImages: ["/images/digital-testimonial-custom1.jpg"]
      }
    },
    creative: {
      hero: "/images/creative-hero.jpg",
      features: ["/images/creative-feature1.jpg", "/images/creative-feature2.jpg", "/images/creative-feature3.jpg"],
      testimonials: ["/images/creative-testimonial1.jpg", "/images/creative-testimonial2.jpg"],
      icons: ["/images/creative-icon1.svg", "/images/creative-icon2.svg", "/images/creative-icon3.svg"],
      customImages: {
        logo: "/images/creative-logo.svg",
        heroImage: "/images/creative-hero-custom.jpg",
        featureImages: ["/images/creative-feature-custom1.jpg", "/images/creative-feature-custom2.jpg"],
        testimonialImages: ["/images/creative-testimonial-custom1.jpg"]
      }
    },
    productivity: {
      hero: "/images/productivity-hero.jpg",
      features: ["/images/productivity-feature1.jpg", "/images/productivity-feature2.jpg", "/images/productivity-feature3.jpg"],
      testimonials: ["/images/productivity-testimonial1.jpg", "/images/productivity-testimonial2.jpg"],
      icons: ["/images/productivity-icon1.svg", "/images/productivity-icon2.svg", "/images/productivity-icon3.svg"],
      customImages: {
        logo: "/images/productivity-logo.svg",
        heroImage: "/images/productivity-hero-custom.jpg",
        featureImages: ["/images/productivity-feature-custom1.jpg", "/images/productivity-feature-custom2.jpg"],
        testimonialImages: ["/images/productivity-testimonial-custom1.jpg"]
      }
    },
    social: {
      hero: "/images/social-hero.jpg",
      features: ["/images/social-feature1.jpg", "/images/social-feature2.jpg", "/images/social-feature3.jpg"],
      testimonials: ["/images/social-testimonial1.jpg", "/images/social-testimonial2.jpg"],
      icons: ["/images/social-icon1.svg", "/images/social-icon2.svg", "/images/social-icon3.svg"],
      customImages: {
        logo: "/images/social-logo.svg",
        heroImage: "/images/social-hero-custom.jpg",
        featureImages: ["/images/social-feature-custom1.jpg", "/images/social-feature-custom2.jpg"],
        testimonialImages: ["/images/social-testimonial-custom1.jpg"]
      }
    },
    analytics: {
      hero: "/images/analytics-hero.jpg",
      features: ["/images/analytics-feature1.jpg", "/images/analytics-feature2.jpg", "/images/analytics-feature3.jpg"],
      testimonials: ["/images/analytics-testimonial1.jpg", "/images/analytics-testimonial2.jpg"],
      icons: ["/images/analytics-icon1.svg", "/images/analytics-icon2.svg", "/images/analytics-icon3.svg"],
      customImages: {
        logo: "/images/analytics-logo.svg",
        heroImage: "/images/analytics-hero-custom.jpg",
        featureImages: ["/images/analytics-feature-custom1.jpg", "/images/analytics-feature-custom2.jpg"],
        testimonialImages: ["/images/analytics-testimonial-custom1.jpg"]
      }
    },
    ecommerce: {
      hero: "/images/ecommerce-hero.jpg",
      features: ["/images/ecommerce-feature1.jpg", "/images/ecommerce-feature2.jpg", "/images/ecommerce-feature3.jpg"],
      testimonials: ["/images/ecommerce-testimonial1.jpg", "/images/ecommerce-testimonial2.jpg"],
      icons: ["/images/ecommerce-icon1.svg", "/images/ecommerce-icon2.svg", "/images/ecommerce-icon3.svg"],
      customImages: {
        logo: "/images/ecommerce-logo.svg",
        heroImage: "/images/ecommerce-hero-custom.jpg",
        featureImages: ["/images/ecommerce-feature-custom1.jpg", "/images/ecommerce-feature-custom2.jpg"],
        testimonialImages: ["/images/ecommerce-testimonial-custom1.jpg"]
      }
    },
    service: {
      hero: "/images/service-hero.jpg",
      features: ["/images/service-feature1.jpg", "/images/service-feature2.jpg", "/images/service-feature3.jpg"],
      testimonials: ["/images/service-testimonial1.jpg", "/images/service-testimonial2.jpg"],
      icons: ["/images/service-icon1.svg", "/images/service-icon2.svg", "/images/service-icon3.svg"],
      customImages: {
        logo: "/images/service-logo.svg",
        heroImage: "/images/service-hero-custom.jpg",
        featureImages: ["/images/service-feature-custom1.jpg", "/images/service-feature-custom2.jpg"],
        testimonialImages: ["/images/service-testimonial-custom1.jpg"]
      }
    },
    education: {
      hero: "/images/education-hero.jpg",
      features: ["/images/education-feature1.jpg", "/images/education-feature2.jpg", "/images/education-feature3.jpg"],
      testimonials: ["/images/education-testimonial1.jpg", "/images/education-testimonial2.jpg"],
      icons: ["/images/education-icon1.svg", "/images/education-icon2.svg", "/images/education-icon3.svg"],
      customImages: {
        logo: "/images/education-logo.svg",
        heroImage: "/images/education-hero-custom.jpg",
        featureImages: ["/images/education-feature-custom1.jpg", "/images/education-feature-custom2.jpg"],
        testimonialImages: ["/images/education-testimonial-custom1.jpg"]
      }
    },
    health: {
      hero: "/images/health-hero.jpg",
      features: ["/images/health-feature1.jpg", "/images/health-feature2.jpg", "/images/health-feature3.jpg"],
      testimonials: ["/images/health-testimonial1.jpg", "/images/health-testimonial2.jpg"],
      icons: ["/images/health-icon1.svg", "/images/health-icon2.svg", "/images/health-icon3.svg"],
      customImages: {
        logo: "/images/health-logo.svg",
        heroImage: "/images/health-hero-custom.jpg",
        featureImages: ["/images/health-feature-custom1.jpg", "/images/health-feature-custom2.jpg"],
        testimonialImages: ["/images/health-testimonial-custom1.jpg"]
      }
    },
    finance: {
      hero: "/images/finance-hero.jpg",
      features: ["/images/finance-feature1.jpg", "/images/finance-feature2.jpg", "/images/finance-feature3.jpg"],
      testimonials: ["/images/finance-testimonial1.jpg", "/images/finance-testimonial2.jpg"],
      icons: ["/images/finance-icon1.svg", "/images/finance-icon2.svg", "/images/finance-icon3.svg"],
      customImages: {
        logo: "/images/finance-logo.svg",
        heroImage: "/images/finance-hero-custom.jpg",
        featureImages: ["/images/finance-feature-custom1.jpg", "/images/finance-feature-custom2.jpg"],
        testimonialImages: ["/images/finance-testimonial-custom1.jpg"]
      }
    },
    "real-estate": {
      hero: "/images/real-estate-hero.jpg",
      features: ["/images/real-estate-feature1.jpg", "/images/real-estate-feature2.jpg", "/images/real-estate-feature3.jpg"],
      testimonials: ["/images/real-estate-testimonial1.jpg", "/images/real-estate-testimonial2.jpg"],
      icons: ["/images/real-estate-icon1.svg", "/images/real-estate-icon2.svg", "/images/real-estate-icon3.svg"],
      customImages: {
        logo: "/images/real-estate-logo.svg",
        heroImage: "/images/real-estate-hero-custom.jpg",
        featureImages: ["/images/real-estate-feature-custom1.jpg", "/images/real-estate-feature-custom2.jpg"],
        testimonialImages: ["/images/real-estate-testimonial-custom1.jpg"]
      }
    },
    food: {
      hero: "/images/food-hero.jpg",
      features: ["/images/food-feature1.jpg", "/images/food-feature2.jpg", "/images/food-feature3.jpg"],
      testimonials: ["/images/food-testimonial1.jpg", "/images/food-testimonial2.jpg"],
      icons: ["/images/food-icon1.svg", "/images/food-icon2.svg", "/images/food-icon3.svg"],
      customImages: {
        logo: "/images/food-logo.svg",
        heroImage: "/images/food-hero-custom.jpg",
        featureImages: ["/images/food-feature-custom1.jpg", "/images/food-feature-custom2.jpg"],
        testimonialImages: ["/images/food-testimonial-custom1.jpg"]
      }
    },
    travel: {
      hero: "/images/travel-hero.jpg",
      features: ["/images/travel-feature1.jpg", "/images/travel-feature2.jpg", "/images/travel-feature3.jpg"],
      testimonials: ["/images/travel-testimonial1.jpg", "/images/travel-testimonial2.jpg"],
      icons: ["/images/travel-icon1.svg", "/images/travel-icon2.svg", "/images/travel-icon3.svg"],
      customImages: {
        logo: "/images/travel-logo.svg",
        heroImage: "/images/travel-hero-custom.jpg",
        featureImages: ["/images/travel-feature-custom1.jpg", "/images/travel-feature-custom2.jpg"],
        testimonialImages: ["/images/travel-testimonial-custom1.jpg"]
      }
    },
    entertainment: {
      hero: "/images/entertainment-hero.jpg",
      features: ["/images/entertainment-feature1.jpg", "/images/entertainment-feature2.jpg", "/images/entertainment-feature3.jpg"],
      testimonials: ["/images/entertainment-testimonial1.jpg", "/images/entertainment-testimonial2.jpg"],
      icons: ["/images/entertainment-icon1.svg", "/images/entertainment-icon2.svg", "/images/entertainment-icon3.svg"],
      customImages: {
        logo: "/images/entertainment-logo.svg",
        heroImage: "/images/entertainment-hero-custom.jpg",
        featureImages: ["/images/entertainment-feature-custom1.jpg", "/images/entertainment-feature-custom2.jpg"],
        testimonialImages: ["/images/entertainment-testimonial-custom1.jpg"]
      }
    },
    general: {
      hero: "/images/general-hero.jpg",
      features: ["/images/general-feature1.jpg", "/images/general-feature2.jpg", "/images/general-feature3.jpg"],
      testimonials: ["/images/general-testimonial1.jpg", "/images/general-testimonial2.jpg"],
      icons: ["/images/general-icon1.svg", "/images/general-icon2.svg", "/images/general-icon3.svg"],
      customImages: {
        logo: "/images/general-logo.svg",
        heroImage: "/images/general-hero-custom.jpg",
        featureImages: ["/images/general-feature-custom1.jpg", "/images/general-feature-custom2.jpg"],
        testimonialImages: ["/images/general-testimonial-custom1.jpg"]
      }
    }
  }

  return imageSets[industry] || imageSets.general
}

function generateComponents(industry: Industry) {
  const componentSets: Record<Industry, { hero: string; features: string[]; pricing: string[]; testimonials: string[] }> = {
    tech: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    saas: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    "mobile-app": {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    game: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    book: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    comic: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    "digital-product": {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    creative: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    productivity: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    social: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    analytics: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    ecommerce: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    service: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    education: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    health: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    finance: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    "real-estate": {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    food: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    travel: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    entertainment: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    },
    general: {
      hero: "GradientHero",
      features: ["FeatureCard", "StatsCard", "MagicCard"],
      pricing: ["PricingCard", "MagicCard"],
      testimonials: ["MagicCard", "StatsCard"]
    }
  }

  return componentSets[industry] || componentSets.general
} 