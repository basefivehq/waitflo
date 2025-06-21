"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Plus, Trash2, RefreshCw, Eye, EyeOff } from "lucide-react"

export function AdminApiKeys() {
  const [showKeys, setShowKeys] = useState<{ [key: number]: boolean }>({})

  const apiKeys = [
    {
      id: 1,
      name: "Master Admin Key",
      key: "wly_admin_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      permissions: ["read", "write", "delete", "admin"],
      status: "active",
    },
    {
      id: 2,
      name: "Analytics API Key",
      key: "wly_analytics_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      permissions: ["read"],
      status: "active",
    },
    {
      id: 3,
      name: "Webhook Integration",
      key: "wly_webhook_567890abcdef1234",
      created: "2024-01-08",
      lastUsed: "3 days ago",
      permissions: ["read", "write"],
      status: "inactive",
    },
  ]

  const webhookLogs = [
    {
      id: 1,
      endpoint: "https://api.example.com/webhooks/waitly",
      event: "user.signup",
      status: "success",
      timestamp: "2024-01-16 14:30:25",
      responseTime: "245ms",
    },
    {
      id: 2,
      endpoint: "https://analytics.company.com/webhook",
      event: "page.created",
      status: "success",
      timestamp: "2024-01-16 14:28:12",
      responseTime: "156ms",
    },
    {
      id: 3,
      endpoint: "https://slack.com/api/webhooks/...",
      event: "milestone.reached",
      status: "failed",
      timestamp: "2024-01-16 14:25:08",
      responseTime: "timeout",
    },
    {
      id: 4,
      endpoint: "https://api.example.com/webhooks/waitly",
      event: "referral.completed",
      status: "success",
      timestamp: "2024-01-16 14:22:45",
      responseTime: "189ms",
    },
  ]

  const toggleKeyVisibility = (keyId: number) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 4)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleCreateApiKey = () => {
    console.log("Creating new API key")
  }

  const handleRevokeKey = (keyId: number) => {
    if (confirm("Are you sure you want to revoke this API key?")) {
      console.log(`Revoking API key ${keyId}`)
    }
  }

  const handleRegenerateKey = (keyId: number) => {
    if (confirm("Are you sure you want to regenerate this API key? The old key will stop working immediately.")) {
      console.log(`Regenerating API key ${keyId}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage system API keys and webhook integrations</p>
        <Button onClick={handleCreateApiKey} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* API Keys */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">System API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="border border-purple-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-white font-semibold">{apiKey.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apiKey.status === "active" ? "bg-green-900/50 text-green-400" : "bg-gray-900/50 text-gray-400"
                      }`}
                    >
                      {apiKey.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRegenerateKey(apiKey.id)}
                      className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <code className="bg-[#0f0f1a] px-3 py-2 rounded text-gray-300 font-mono flex-1">
                      {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                    <div className="flex items-center space-x-2">
                      <span>Permissions:</span>
                      <div className="flex space-x-1">
                        {apiKey.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl" className="text-gray-300">
              Global Webhook URL
            </Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-api.com/webhooks/waitly"
              className="bg-[#0f0f1a] border-purple-700/30 text-white"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-gray-300">Event Types</Label>
            {[
              { name: "user.signup", description: "Triggered when a new user signs up" },
              { name: "page.created", description: "Triggered when a new waitlist page is created" },
              { name: "referral.completed", description: "Triggered when a referral is successful" },
              { name: "milestone.reached", description: "Triggered when a user reaches a referral milestone" },
              { name: "payment.completed", description: "Triggered when a payment is processed" },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-purple-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">{event.name}</p>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </div>
                <Switch defaultChecked={index < 3} />
              </div>
            ))}
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">Save Webhook Settings</Button>
        </CardContent>
      </Card>

      {/* Webhook Logs */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Recent Webhook Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-800/30">
                  <th className="text-left p-3 text-gray-400 font-medium">Endpoint</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Event</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Response Time</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {webhookLogs.map((log) => (
                  <tr key={log.id} className="border-b border-purple-800/20 hover:bg-purple-900/10">
                    <td className="p-3">
                      <p className="text-gray-300 text-sm font-mono truncate max-w-xs">{log.endpoint}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs font-medium">
                        {log.event}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === "success" ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="text-gray-300 text-sm">{log.responseTime}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-gray-300 text-sm">{log.timestamp}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
