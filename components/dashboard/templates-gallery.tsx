import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TemplatesGallery() {
  const templates = [
    {
      name: "Startup Launch",
      description: "Perfect for announcing your new startup",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
    },
    {
      name: "App Pre-Launch",
      description: "Build excitement for your mobile app",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mobile",
    },
    {
      name: "Product Hunt Campaign",
      description: "Maximize your Product Hunt launch",
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing",
    },
    {
      name: "E-commerce Drop",
      description: "Create buzz for product releases",
      image: "/placeholder.svg?height=200&width=300",
      category: "E-commerce",
    },
    {
      name: "Newsletter Signup",
      description: "Grow your email subscriber base",
      image: "/placeholder.svg?height=200&width=300",
      category: "Content",
    },
    {
      name: "Event Registration",
      description: "Collect attendees for your event",
      image: "/placeholder.svg?height=200&width=300",
      category: "Events",
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-gray-400">Choose from professionally designed templates</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card
            key={index}
            className="bg-[#1a1a2e] border-gray-800 overflow-hidden hover:border-purple-600 transition-colors"
          >
            <div className="aspect-video bg-gray-900 relative">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {template.category}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{template.description}</p>
              <Button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
