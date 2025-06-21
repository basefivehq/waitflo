import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Plus, Trash2, RefreshCw } from "lucide-react"

export function ApiKeys() {
  const apiKeys = [
    {
      name: "Production API Key",
      key: "wly_prod_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
    },
    {
      name: "Development API Key",
      key: "wly_dev_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "1 day ago",
    },
  ]

  const webhookEvents = [
    { name: "signup.created", description: "Triggered when a new signup occurs", enabled: true },
    { name: "referral.completed", description: "Triggered when a referral is successful", enabled: true },
    { name: "milestone.reached", description: "Triggered when a user reaches a referral milestone", enabled: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage your API keys and webhooks</p>
        <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* API Keys */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey, index) => (
              <div key={index} className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{apiKey.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 backdrop-blur-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <code className="bg-gray-900 px-2 py-1 rounded text-gray-300 font-mono">{apiKey.key}</code>
                  <span className="text-gray-500">Created: {apiKey.created}</span>
                  <span className="text-gray-500">Last used: {apiKey.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Webhooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl" className="text-gray-300">
              Webhook URL
            </Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-app.com/webhooks/waitly"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-gray-300">Event Types</Label>
            {webhookEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{event.name}</p>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={event.enabled}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-900"
                  />
                </div>
              </div>
            ))}
          </div>

          <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
            Save Webhook Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
