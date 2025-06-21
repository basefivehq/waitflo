import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, Trash2 } from "lucide-react"

export function Settings() {
  return (
    <div className="space-y-6">
      <p className="text-gray-400">Manage your account and preferences</p>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-[#1a1a2e] border-gray-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
            Profile
          </TabsTrigger>
          <TabsTrigger value="branding" className="data-[state=active]:bg-purple-600">
            Branding
          </TabsTrigger>
          <TabsTrigger value="domain" className="data-[state=active]:bg-purple-600">
            Domain
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-purple-600">
            Billing
          </TabsTrigger>
          <TabsTrigger value="danger" className="data-[state=active]:bg-red-600">
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name
                  </Label>
                  <Input id="firstName" defaultValue="John" className="bg-gray-900 border-gray-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input id="lastName" defaultValue="Doe" className="bg-gray-900 border-gray-700 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input id="email" defaultValue="john@example.com" className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  New Password
                </Label>
                <Input id="password" type="password" className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Branding Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                  <Button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-gray-300">
                  Primary Color
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="primaryColor"
                    defaultValue="#7c3aed"
                    className="bg-gray-900 border-gray-700 text-white w-32"
                  />
                  <div className="w-8 h-8 bg-purple-600 rounded border border-gray-700"></div>
                </div>
              </div>
              <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Custom Domain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-gray-300">
                  Domain
                </Label>
                <Input
                  id="domain"
                  placeholder="waitlist.yourdomain.com"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  Add a CNAME record pointing to waitly.co to use your custom domain.
                </p>
              </div>
              <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                Verify Domain
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Billing & Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Current Plan</Label>
                  <p className="text-white font-semibold">Pro Plan - $29/month</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Usage</Label>
                  <p className="text-white">2,847 / 10,000 signups</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Payment Method</Label>
                <p className="text-white">•••• •••• •••• 4242</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                  Upgrade Plan
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                >
                  Update Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="bg-[#1a1a2e] border-red-800">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-red-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Reset All Data</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    This will permanently delete all your waitlist data, signups, and analytics.
                  </p>
                  <Button className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-red-400 hover:text-red-300 border border-red-500/30">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset Data
                  </Button>
                </div>
                <div className="border border-red-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Delete Account</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-red-400 hover:text-red-300 border border-red-500/30">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
