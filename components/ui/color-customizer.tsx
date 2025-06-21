"use client"

import { useState } from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Label } from "./label"
import { Input } from "./input"
import { Badge } from "./badge"
import { Palette, Eye, EyeOff } from "lucide-react"

interface ColorCustomizerProps {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  onColorsChange: (colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }) => void
  industry?: string
}

const presetColorSchemes = {
  health: {
    primary: "#20c997",
    secondary: "#6c757d",
    accent: "#ffc107",
    text: "#333333",
    background: "#ffffff"
  },
  tech: {
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#dc3545",
    text: "#333333",
    background: "#ffffff"
  },
  saas: {
    primary: "#6610f2",
    secondary: "#6c757d",
    accent: "#dc3545",
    text: "#333333",
    background: "#ffffff"
  },
  game: {
    primary: "#ff007f",
    secondary: "#6c757d",
    accent: "#dc3545",
    text: "#ffffff",
    background: "#111827"
  },
  creative: {
    primary: "#ff007f",
    secondary: "#ffc107",
    accent: "#28a745",
    text: "#333333",
    background: "#ffffff"
  },
  book: {
    primary: "#ffc107",
    secondary: "#6c757d",
    accent: "#dc3545",
    text: "#333333",
    background: "#ffffff"
  },
  ecommerce: {
    primary: "#ffc107",
    secondary: "#6c757d",
    accent: "#28a745",
    text: "#333333",
    background: "#ffffff"
  },
  finance: {
    primary: "#6f42c1",
    secondary: "#6c757d",
    accent: "#ffc107",
    text: "#333333",
    background: "#ffffff"
  },
  pet: {
    primary: "#8B4513", // Brown
    secondary: "#D2B48C", // Tan
    accent: "#F5F5DC", // Beige
    text: "#333333",
    background: "#ffffff"
  }
}

const popularColors = [
  "#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", 
  "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40",
  "#8B4513", "#D2B48C", "#F5F5DC", "#ffffff", "#000000", "#f8f9fa"
]

export function ColorCustomizer({ colors, onColorsChange, industry }: ColorCustomizerProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [localColors, setLocalColors] = useState(colors)

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    const newColors = { ...localColors, [key]: value }
    setLocalColors(newColors)
    onColorsChange(newColors)
  }

  const applyPreset = (presetName: string) => {
    const preset = presetColorSchemes[presetName as keyof typeof presetColorSchemes]
    if (preset) {
      setLocalColors(preset)
      onColorsChange(preset)
    }
  }

  const ColorInput = ({ label, colorKey, value }: { label: string; colorKey: keyof typeof colors; value: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="w-12 h-10 p-1 border rounded"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Customization
        </CardTitle>
        <CardDescription>
          Customize the colors for your page. You can use hex codes or choose from presets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industry Presets */}
        {industry && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Industry Presets</Label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(presetColorSchemes).map((presetName) => (
                <Button
                  key={presetName}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(presetName)}
                  className="capitalize"
                >
                  {presetName}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Colors */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Popular Colors</Label>
          <div className="grid grid-cols-6 gap-2">
            {popularColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange('primary', color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Color Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorInput label="Primary Color" colorKey="primary" value={localColors.primary} />
          <ColorInput label="Secondary Color" colorKey="secondary" value={localColors.secondary} />
          <ColorInput label="Accent Color" colorKey="accent" value={localColors.accent} />
          <ColorInput label="Text Color" colorKey="text" value={localColors.text} />
          <ColorInput label="Background Color" colorKey="background" value={localColors.background} />
        </div>

        {/* Preview Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          
          <div className="flex gap-2">
            <Badge variant="outline" style={{ backgroundColor: localColors.primary, color: localColors.text }}>
              Primary
            </Badge>
            <Badge variant="outline" style={{ backgroundColor: localColors.secondary, color: localColors.text }}>
              Secondary
            </Badge>
            <Badge variant="outline" style={{ backgroundColor: localColors.accent, color: localColors.text }}>
              Accent
            </Badge>
          </div>
        </div>

        {/* Color Preview */}
        {showPreview && (
          <div 
            className="p-6 rounded-lg border"
            style={{ backgroundColor: localColors.background, color: localColors.text }}
          >
            <h3 className="text-lg font-semibold mb-4">Color Preview</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  style={{ backgroundColor: localColors.primary, color: localColors.text }}
                  className="border-0"
                >
                  Primary Button
                </Button>
                <Button 
                  variant="outline"
                  style={{ borderColor: localColors.secondary, color: localColors.secondary }}
                >
                  Secondary Button
                </Button>
                <Button 
                  style={{ backgroundColor: localColors.accent, color: localColors.text }}
                  className="border-0"
                >
                  Accent Button
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className="p-4 rounded"
                  style={{ backgroundColor: localColors.primary, color: localColors.text }}
                >
                  Primary Card
                </div>
                <div 
                  className="p-4 rounded border"
                  style={{ borderColor: localColors.secondary, color: localColors.text }}
                >
                  Secondary Card
                </div>
                <div 
                  className="p-4 rounded"
                  style={{ backgroundColor: localColors.accent, color: localColors.text }}
                >
                  Accent Card
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 