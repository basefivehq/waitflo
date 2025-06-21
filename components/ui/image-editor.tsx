"use client"

import { useState, useRef } from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Input } from "./input"
import { Label } from "./label"
import { Badge } from "./badge"
import { Image, Upload, Trash2, Edit, Eye, Download } from "lucide-react"

interface ImageEditorProps {
  images: {
    hero?: string
    logo?: string
    featureImages: string[]
    testimonialImages: string[]
  }
  onImagesChange: (images: {
    hero?: string
    logo?: string
    featureImages: string[]
    testimonialImages: string[]
  }) => void
  industry?: string
}

export function ImageEditor({ images, onImagesChange, industry }: ImageEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      // Simulate image upload - in real app, upload to cloud storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        
        const updatedImages = { ...images }
        
        switch (type) {
          case 'hero':
            updatedImages.hero = imageUrl
            break
          case 'logo':
            updatedImages.logo = imageUrl
            break
          case 'feature':
            updatedImages.featureImages = [...updatedImages.featureImages, imageUrl]
            break
          case 'testimonial':
            updatedImages.testimonialImages = [...updatedImages.testimonialImages, imageUrl]
            break
        }
        
        onImagesChange(updatedImages)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Image upload error:', error)
      setUploading(false)
    }
  }

  const removeImage = (type: string, index?: number) => {
    const updatedImages = { ...images }
    
    switch (type) {
      case 'hero':
        updatedImages.hero = undefined
        break
      case 'logo':
        updatedImages.logo = undefined
        break
      case 'feature':
        if (index !== undefined) {
          updatedImages.featureImages.splice(index, 1)
        }
        break
      case 'testimonial':
        if (index !== undefined) {
          updatedImages.testimonialImages.splice(index, 1)
        }
        break
    }
    
    onImagesChange(updatedImages)
  }

  const ImageUploadSection = ({ 
    title, 
    type, 
    currentImage, 
    multiple = false,
    index 
  }: { 
    title: string
    type: string
    currentImage?: string | string[]
    multiple?: boolean
    index?: number
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{title}</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, type)}
        className="hidden"
      />
      
      {currentImage && (
        <div className="relative group">
          <img
            src={multiple ? (currentImage as string[])[index!] : currentImage as string}
            alt={title}
            className="w-full h-32 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedImage(multiple ? (currentImage as string[])[index!] : currentImage as string)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeImage(type, index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Image Management
        </CardTitle>
        <CardDescription>
          Upload and manage images for your page. You can replace default images with your own.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hero Image */}
        <ImageUploadSection
          title="Hero Image"
          type="hero"
          currentImage={images.hero}
        />

        {/* Logo */}
        <ImageUploadSection
          title="Logo"
          type="logo"
          currentImage={images.logo}
        />

        {/* Feature Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Feature Images</Label>
            <Badge variant="secondary">{images.featureImages.length} images</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {images.featureImages.map((image, index) => (
              <ImageUploadSection
                key={index}
                title={`Feature ${index + 1}`}
                type="feature"
                currentImage={images.featureImages}
                multiple={true}
                index={index}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Feature Image
          </Button>
        </div>

        {/* Testimonial Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Testimonial Images</Label>
            <Badge variant="secondary">{images.testimonialImages.length} images</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {images.testimonialImages.map((image, index) => (
              <ImageUploadSection
                key={index}
                title={`Testimonial ${index + 1}`}
                type="testimonial"
                currentImage={images.testimonialImages}
                multiple={true}
                index={index}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Testimonial Image
          </Button>
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl max-h-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Image Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </Button>
              </div>
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 