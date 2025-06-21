"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export function PlatformSettings() {
  const [settings, setSettings] = useState({
    enableReferrals: true,
    enableEmailAutomation: true,
    enableApiAccess: true,
    enableAnalytics: true,
    maxPagesPerUser: 10,
    maxSignupsPerPage: 10000,
    defaultEmailTemplate: "Welcome to our waitlist! We'll keep you updated on our progress.",
    supportEmail: "support@waitly.co",
    platformName: "Waitly",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    // Here you would typically save to your backend
  }

  const pricingTiers = [
    {
      name: "Free",
      price: 0,
      features: ["1 waitlist page", "Up to 100 signups", "Basic email notifications"],
      maxPages: 1,
      maxSignups: 100,
    },
    {
      name: "Pro",
      price: 29,
      features: ["Unlimited pages", "Unlimited signups", "Custom domains", "Email automations"],
      maxPages: -1,
      maxSignups: -1,
    },
    {
      name: "Agency",
      price: 99,
      features: ["Everything in Pro", "White-label solution", "API access", "Priority support"],
      maxPages: -1,
      maxSignups: -1,
    },
  ]

  const featuredTemplates = [
    { id: 1, name: "Startup Launch", featured: true },
    { id: 2, name: "App Pre-Launch", featured: true },
    { id: 3, name: "Product Hunt Campaign", featured: false },
    { id: 4, name: "E-commerce Drop", featured: true },
    { id: 5, name: "Newsletter Signup", featured: false },
    { id: 6, name: "Event Registration", featured: false },
  ]

  return (
    <div className="space-y-6">
      <p className="text-gray-400">Configure platform-wide settings and features</p>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="bg-[#1a1a2e] border-purple-800/30">
          <TabsTrigger value="features" className="data-[state=active]:bg-purple-600">
            Features
          </TabsTrigger>
          <TabsTrigger value="limits" className="data-[state=active]:bg-purple-600">
            Limits
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-purple-600">
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="pricing" className="data-[state=active]:bg-purple-600">
            Pricing
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card className="bg-[#1a1a2e] border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Platform Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/30">
                  <div>
                    <p className="text-white font-medium">Enable Referrals</p>
                    <p className="text-gray-400 text-sm">Allow users to create referral programs</p>
                  </div>
                  <Switch
                    checked={settings.enableReferrals}
                    onCheckedChange={(checked) => handleSettingChange("enableReferrals", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/30">
                  <div>
                    <p className="text-white font-medium">Email Automation</p>
                    <p className="text-gray-400 text-sm">Enable automated email sequences</p>
                  </div>
                  <Switch
                    checked={settings.enableEmailAutomation}
                    onCheckedChange={(checked) => handleSettingChange("enableEmailAutomation", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/30">
                  <div>
                    <p className="text-white font-medium">API Access</p>
                    <p className="text-gray-400 text-sm">Allow users to access the API</p>
                  </div>
                  <Switch
                    checked={settings.enableApiAccess}
                    onCheckedChange={(checked) => handleSettingChange("enableApiAccess", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/30">
                  <div>
                    <p className="text-white font-medium">Analytics</p>
                    <p className="text-gray-400 text-sm">Enable detailed analytics and reporting</p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => handleSettingChange("enableAnalytics", checked)}
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Feature Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits">
          <Card className="bg-[#1a1a2e] border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Platform Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPages" className="text-gray-300">
                    Max Pages Per User (Free Plan)
                  </Label>
                  <Input
                    id="maxPages"
                    type="number"
                    value={settings.maxPagesPerUser}
                    onChange={(e) => handleSettingChange("maxPagesPerUser", Number.parseInt(e.target.value))}
                    className="bg-[#0f0f1a] border-purple-700/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSignups" className="text-gray-300">
                    Max Signups Per Page (Free Plan)
                  </Label>
                  <Input
                    id="maxSignups"
                    type="number"
                    value={settings.maxSignupsPerPage}
                    onChange={(e) => handleSettingChange("maxSignupsPerPage", Number.parseInt(e.target.value))}
                    className="bg-[#0f0f1a] border-purple-700/30 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="text-gray-300">
                  Support Email
                </Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                  className="bg-[#0f0f1a] border-purple-700/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformName" className="text-gray-300">
                  Platform Name
                </Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) => handleSettingChange("platformName", e.target.value)}
                  className="bg-[#0f0f1a] border-purple-700/30 text-white"
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Limit Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="bg-[#1a1a2e] border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultTemplate" className="text-gray-300">
                  Default Welcome Email Template
                </Label>
                <Textarea
                  id="defaultTemplate"
                  value={settings.defaultEmailTemplate}
                  onChange={(e) => handleSettingChange("defaultEmailTemplate", e.target.value)}
                  rows={6}
                  className="bg-[#0f0f1a] border-purple-700/30 text-white resize-none"
                  placeholder="Enter the default email template..."
                />
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  Available variables: {"{user_name}"}, {"{waitlist_name}"}, {"{referral_link}"}, {"{position}"}
                </p>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Email Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="space-y-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="bg-[#1a1a2e] border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">
                    {tier.name} Plan - ${tier.price}/month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Price (USD)</Label>
                      <Input
                        type="number"
                        defaultValue={tier.price}
                        className="bg-[#0f0f1a] border-purple-700/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Max Pages</Label>
                      <Input
                        type="number"
                        defaultValue={tier.maxPages === -1 ? "Unlimited" : tier.maxPages}
                        className="bg-[#0f0f1a] border-purple-700/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Features</Label>
                    <div className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Input defaultValue={feature} className="bg-[#0f0f1a] border-purple-700/30 text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              <Save className="h-4 w-4 mr-2" />
              Save Pricing Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="bg-[#1a1a2e] border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-white">Featured Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-800/30"
                  >
                    <div>
                      <p className="text-white font-medium">{template.name}</p>
                      <p className="text-gray-400 text-sm">Template ID: {template.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked={template.featured} />
                      <span className="text-gray-400 text-sm">Featured</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSaveSettings}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Template Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
