import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ImageEditor } from "@/components/ui/image-editor"
import { ColorCustomizer } from "@/components/ui/color-customizer"

interface WaitlistPagePreviewProps {
  config: any
  onUpdateSection: (section: string, data: any) => void
}

export function WaitlistPagePreview({ config, onUpdateSection }: WaitlistPagePreviewProps) {
  // Hero Edit State
  const [heroOpen, setHeroOpen] = useState(false)
  const [heroForm, setHeroForm] = useState({
    companyName: config.companyName || '',
    tagline: config.tagline || '',
    callToAction: config.callToAction || ''
  })

  // Features Edit State
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [featuresForm, setFeaturesForm] = useState({
    features: config.features || []
  })

  // Onboarding Edit State
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [onboardingForm, setOnboardingForm] = useState({
    steps: config.onboardingSteps || []
  })

  // Benefits Edit State
  const [benefitsOpen, setBenefitsOpen] = useState(false)
  const [benefitsForm, setBenefitsForm] = useState({
    benefits: config.benefits || []
  })

  // Pricing Edit State
  const [pricingOpen, setPricingOpen] = useState(false)
  const [pricingForm, setPricingForm] = useState({
    pricing: config.pricing || []
  })

  // FAQ Edit State
  const [faqOpen, setFaqOpen] = useState(false)
  const [faqForm, setFaqForm] = useState({
    faqs: config.faqs || []
  })

  // Testimonials Edit State
  const [testimonialsOpen, setTestimonialsOpen] = useState(false)
  const [testimonialsForm, setTestimonialsForm] = useState({
    testimonials: config.testimonials || []
  })

  // SEO & Social Edit State
  const [seoOpen, setSeoOpen] = useState(false)
  const [seoForm, setSeoForm] = useState({
    seoTitle: config.seoTitle || '',
    seoDescription: config.seoDescription || '',
    seoKeywords: config.seoKeywords || '',
    twitter: config.twitter || '',
    facebook: config.facebook || '',
    linkedin: config.linkedin || ''
  })

  // Branding Edit State
  const [brandingOpen, setBrandingOpen] = useState(false)
  const [brandingForm, setBrandingForm] = useState({
    brandColor: config.brandColor || '#6610f2',
    font: config.font || 'Inter'
  })

  // Images Edit State
  const [imagesOpen, setImagesOpen] = useState(false)
  const [imagesForm, setImagesForm] = useState({
    hero: config.heroImage || '',
    logo: config.logo || '',
    featureImages: config.featureImages || [],
    testimonialImages: config.testimonialImages || []
  })

  // Handlers
  const handleHeroSave = () => {
    onUpdateSection('hero', heroForm)
    setHeroOpen(false)
  }
  const handleFeaturesSave = () => {
    onUpdateSection('features', featuresForm)
    setFeaturesOpen(false)
  }
  const handleOnboardingSave = () => {
    onUpdateSection('onboarding', onboardingForm)
    setOnboardingOpen(false)
  }
  const handleBenefitsSave = () => {
    onUpdateSection('benefits', benefitsForm)
    setBenefitsOpen(false)
  }
  const handlePricingSave = () => {
    onUpdateSection('pricing', pricingForm)
    setPricingOpen(false)
  }
  const handleFaqSave = () => {
    onUpdateSection('faq', faqForm)
    setFaqOpen(false)
  }
  const handleTestimonialsSave = () => {
    onUpdateSection('testimonials', testimonialsForm)
    setTestimonialsOpen(false)
  }

  // Handlers for new sections
  const handleSeoSave = () => {
    onUpdateSection('seo', seoForm)
    setSeoOpen(false)
  }
  const handleBrandingSave = () => {
    onUpdateSection('branding', brandingForm)
    setBrandingOpen(false)
  }
  const handleImagesChange = (images: any) => {
    setImagesForm(images)
    onUpdateSection('images', images)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-purple-900 to-gray-900 border-none text-white">
        <CardHeader>
          <CardTitle className="text-3xl">{config.companyName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-xl font-semibold">{config.tagline}</div>
          <div className="mb-4 text-gray-300">{config.description}</div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3">
            {config.callToAction || 'Join Waitlist'}
          </Button>
          <Button variant="outline" className="ml-4 border-gray-600 text-gray-300 hover:text-white" onClick={() => setHeroOpen(true)}>
            Edit Hero
          </Button>
        </CardContent>
      </Card>
      <Dialog open={heroOpen} onOpenChange={setHeroOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Hero Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={heroForm.companyName}
              onChange={e => setHeroForm(f => ({ ...f, companyName: e.target.value }))}
              placeholder="Company Name"
            />
            <Input
              label="Tagline"
              value={heroForm.tagline}
              onChange={e => setHeroForm(f => ({ ...f, tagline: e.target.value }))}
              placeholder="Tagline"
            />
            <Textarea
              value={heroForm.callToAction}
              onChange={e => setHeroForm(f => ({ ...f, callToAction: e.target.value }))}
              placeholder="Call to Action (e.g., 'Join the Waitlist')"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleHeroSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* Features Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-4">
            {config.features?.map((feature: string, i: number) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white" onClick={() => setFeaturesOpen(true)}>
            Edit Features
          </Button>
        </CardContent>
      </Card>
      <Dialog open={featuresOpen} onOpenChange={setFeaturesOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Features</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {featuresForm.features.map((feature: string, i: number) => (
              <Input
                key={i}
                value={feature}
                onChange={e => {
                  const updated = [...featuresForm.features]
                  updated[i] = e.target.value
                  setFeaturesForm(f => ({ ...f, features: updated }))
                }}
                placeholder={`Feature ${i + 1}`}
                className="mb-2"
              />
            ))}
            <Button onClick={() => setFeaturesForm(f => ({ ...f, features: [...f.features, ''] }))} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">Add Feature</Button>
          </div>
          <DialogFooter>
            <Button onClick={handleFeaturesSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* Benefits Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 mb-4">
            {config.benefits?.map((benefit: string, i: number) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white" onClick={() => setBenefitsOpen(true)}>
            Edit Benefits
          </Button>
        </CardContent>
      </Card>
      <Dialog open={benefitsOpen} onOpenChange={setBenefitsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Benefits</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {benefitsForm.benefits.map((benefit: string, i: number) => (
              <Input
                key={i}
                value={benefit}
                onChange={e => {
                  const updated = [...benefitsForm.benefits]
                  updated[i] = e.target.value
                  setBenefitsForm(f => ({ ...f, benefits: updated }))
                }}
                placeholder={`Benefit ${i + 1}`}
                className="mb-2"
              />
            ))}
            <Button onClick={() => setBenefitsForm(f => ({ ...f, benefits: [...f.benefits, ''] }))} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">Add Benefit</Button>
          </div>
          <DialogFooter>
            <Button onClick={handleBenefitsSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* Pricing Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {config.pricing?.map((plan: any, i: number) => (
              <div key={i} className="border border-gray-700 rounded-lg p-4">
                <div className="font-bold text-lg mb-1">{plan.name}</div>
                <div className="text-purple-400 font-semibold mb-2">{plan.price}</div>
                <ul className="list-disc pl-4 text-sm text-gray-300">
                  {plan.features?.map((f: string, j: number) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white" onClick={() => setPricingOpen(true)}>
            Edit Pricing
          </Button>
        </CardContent>
      </Card>
      <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Pricing</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {pricingForm.pricing.map((plan: any, i: number) => (
              <div key={i} className="border-b border-gray-800 pb-4 mb-4 space-y-2">
                <Input
                  value={plan.name}
                  onChange={e => {
                    const updated = [...pricingForm.pricing]
                    updated[i] = { ...updated[i], name: e.target.value }
                    setPricingForm(f => ({ ...f, pricing: updated }))
                  }}
                  placeholder="Plan Name"
                />
                <Input
                  value={plan.price}
                  onChange={e => {
                    const updated = [...pricingForm.pricing]
                    updated[i] = { ...updated[i], price: e.target.value }
                    setPricingForm(f => ({ ...f, pricing: updated }))
                  }}
                  placeholder="Price"
                />
                <Textarea
                  value={plan.features?.join('\n')}
                  onChange={e => {
                    const updated = [...pricingForm.pricing]
                    updated[i] = { ...updated[i], features: e.target.value.split('\n') }
                    setPricingForm(f => ({ ...f, pricing: updated }))
                  }}
                  placeholder="Features (one per line)"
                />
              </div>
            ))}
            <Button onClick={() => setPricingForm(f => ({ ...f, pricing: [...f.pricing, { name: '', price: '', features: [] }] }))} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">Add Plan</Button>
          </div>
          <DialogFooter>
            <Button onClick={handlePricingSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* FAQ Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4">
            {config.faqs?.map((faq: any, i: number) => (
              <li key={i} className="mb-2">
                <div className="font-semibold">Q: {faq.question}</div>
                <div className="text-gray-300">A: {faq.answer}</div>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white" onClick={() => setFaqOpen(true)}>
            Edit FAQ
          </Button>
        </CardContent>
      </Card>
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {faqForm.faqs.map((faq: any, i: number) => (
              <div key={i} className="border-b border-gray-800 pb-4 mb-4 space-y-2">
                <Input
                  value={faq.question}
                  onChange={e => {
                    const updated = [...faqForm.faqs]
                    updated[i] = { ...updated[i], question: e.target.value }
                    setFaqForm(f => ({ ...f, faqs: updated }))
                  }}
                  placeholder="Question"
                />
                <Textarea
                  value={faq.answer}
                  onChange={e => {
                    const updated = [...faqForm.faqs]
                    updated[i] = { ...updated[i], answer: e.target.value }
                    setFaqForm(f => ({ ...f, faqs: updated }))
                  }}
                  placeholder="Answer"
                />
              </div>
            ))}
            <Button onClick={() => setFaqForm(f => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] }))} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">Add FAQ</Button>
          </div>
          <DialogFooter>
            <Button onClick={handleFaqSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* Testimonials Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4">
            {config.testimonials?.map((t: any, i: number) => (
              <li key={i} className="mb-4 border-l-4 border-purple-600 pl-4">
                <div className="font-semibold">{t.name} <span className="text-xs text-gray-400">({t.role})</span></div>
                <div className="text-gray-300 italic mb-1">"{t.content}"</div>
                <div className="text-yellow-400 text-sm">{'★'.repeat(t.rating || 5)}</div>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white" onClick={() => setTestimonialsOpen(true)}>
            Edit Testimonials
          </Button>
        </CardContent>
      </Card>
      <Dialog open={testimonialsOpen} onOpenChange={setTestimonialsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Testimonials</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {testimonialsForm.testimonials.map((t: any, i: number) => (
              <div key={i} className="border-b border-gray-800 pb-4 mb-4 space-y-2">
                <Input
                  value={t.name}
                  onChange={e => {
                    const updated = [...testimonialsForm.testimonials]
                    updated[i] = { ...updated[i], name: e.target.value }
                    setTestimonialsForm(f => ({ ...f, testimonials: updated }))
                  }}
                  placeholder="Name"
                />
                <Input
                  value={t.role}
                  onChange={e => {
                    const updated = [...testimonialsForm.testimonials]
                    updated[i] = { ...updated[i], role: e.target.value }
                    setTestimonialsForm(f => ({ ...f, testimonials: updated }))
                  }}
                  placeholder="Role"
                />
                <Textarea
                  value={t.content}
                  onChange={e => {
                    const updated = [...testimonialsForm.testimonials]
                    updated[i] = { ...updated[i], content: e.target.value }
                    setTestimonialsForm(f => ({ ...f, testimonials: updated }))
                  }}
                  placeholder="Testimonial Content"
                />
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={t.rating || 5}
                  onChange={e => {
                    const updated = [...testimonialsForm.testimonials]
                    updated[i] = { ...updated[i], rating: Number(e.target.value) }
                    setTestimonialsForm(f => ({ ...f, testimonials: updated }))
                  }}
                  placeholder="Rating (1-5)"
                />
              </div>
            ))}
            <Button onClick={() => setTestimonialsForm(f => ({ ...f, testimonials: [...f.testimonials, { name: '', role: '', content: '', rating: 5 }] }))} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">Add Testimonial</Button>
          </div>
          <DialogFooter>
            <Button onClick={handleTestimonialsSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* SEO & Social Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>SEO & Social</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm text-gray-300">SEO and social sharing settings for your page.</div>
          <div className="flex flex-col gap-2">
            <div><span className="font-semibold">SEO Title:</span> {config.seoTitle || '—'}</div>
            <div><span className="font-semibold">SEO Description:</span> {config.seoDescription || '—'}</div>
            <div><span className="font-semibold">SEO Keywords:</span> {config.seoKeywords || '—'}</div>
            <div><span className="font-semibold">Twitter:</span> {config.twitter || '—'}</div>
            <div><span className="font-semibold">Facebook:</span> {config.facebook || '—'}</div>
            <div><span className="font-semibold">LinkedIn:</span> {config.linkedin || '—'}</div>
          </div>
          <Button variant="outline" className="mt-4 border-gray-600 text-gray-300 hover:text-white" onClick={() => setSeoOpen(true)}>
            Edit SEO & Social
          </Button>
        </CardContent>
      </Card>
      <Dialog open={seoOpen} onOpenChange={setSeoOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit SEO & Social</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Title</label>
            <Input value={seoForm.seoTitle} onChange={e => setSeoForm(f => ({ ...f, seoTitle: e.target.value }))} placeholder="SEO Title" />
            <label className="text-sm font-medium">SEO Description</label>
            <Textarea value={seoForm.seoDescription} onChange={e => setSeoForm(f => ({ ...f, seoDescription: e.target.value }))} placeholder="SEO Description" />
            <label className="text-sm font-medium">SEO Keywords</label>
            <Input value={seoForm.seoKeywords} onChange={e => setSeoForm(f => ({ ...f, seoKeywords: e.target.value }))} placeholder="SEO Keywords (comma separated)" />
            <label className="text-sm font-medium">Twitter URL</label>
            <Input value={seoForm.twitter} onChange={e => setSeoForm(f => ({ ...f, twitter: e.target.value }))} placeholder="Twitter URL" />
            <label className="text-sm font-medium">Facebook URL</label>
            <Input value={seoForm.facebook} onChange={e => setSeoForm(f => ({ ...f, facebook: e.target.value }))} placeholder="Facebook URL" />
            <label className="text-sm font-medium">LinkedIn URL</label>
            <Input value={seoForm.linkedin} onChange={e => setSeoForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="LinkedIn URL" />
          </div>
          <DialogFooter>
            <Button onClick={handleSeoSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Branding Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm text-gray-300">Customize your brand color and font.</div>
          <div className="flex flex-col gap-2">
            <div><span className="font-semibold">Brand Color:</span> <span style={{ background: config.brandColor, padding: '0 8px', borderRadius: 4 }}>{config.brandColor || '#6610f2'}</span></div>
            <div><span className="font-semibold">Font:</span> {config.font || 'Inter'}</div>
          </div>
          <Button variant="outline" className="mt-4 border-gray-600 text-gray-300 hover:text-white" onClick={() => setBrandingOpen(true)}>
            Edit Branding
          </Button>
        </CardContent>
      </Card>
      <Dialog open={brandingOpen} onOpenChange={setBrandingOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Branding</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input type="color" value={brandingForm.brandColor} onChange={e => setBrandingForm(f => ({ ...f, brandColor: e.target.value }))} />
            <select value={brandingForm.font} onChange={e => setBrandingForm(f => ({ ...f, font: e.target.value }))} className="w-full p-2 rounded bg-gray-800 text-white">
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Lato">Lato</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
          <DialogFooter>
            <Button onClick={handleBrandingSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Images Section */}
      <Card className="bg-[#1a1a2e] border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Images & Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm text-gray-300">Upload and manage your logo, hero image, and more.</div>
          <ImageEditor images={imagesForm} onImagesChange={handleImagesChange} />
        </CardContent>
      </Card>
    </div>
  )
} 