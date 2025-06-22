"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Plus, Trash2, RefreshCw, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string | null
  permissions: string[]
  status: string
  pageId: number
  pageTitle: string
}

interface WebhookSettings {
  pageId: number
  pageTitle: string
  webhookUrl: string
  webhookEvents: Array<{
    name: string
    enabled: boolean
  }>
}

export function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [webhookSettings, setWebhookSettings] = useState<WebhookSettings[]>([])
  const [loading, setLoading] = useState(true)
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedPage, setSelectedPage] = useState<number | null>(null)
  const [newKeyName, setNewKeyName] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/api-keys')
      
      if (!response.ok) {
        throw new Error('Failed to fetch API keys')
      }

      const data = await response.json()
      
      // Flatten API keys from all pages
      const allApiKeys = data.apiKeys.flatMap((page: any) => 
        page.apiKeys.map((key: any) => ({
          ...key,
          pageId: page.pageId,
          pageTitle: page.pageTitle
        }))
      )
      
      setApiKeys(allApiKeys)
      setWebhookSettings(data.webhookSettings)
      
      if (data.webhookSettings.length > 0) {
        setSelectedPage(data.webhookSettings[0].pageId)
        setWebhookUrl(data.webhookSettings[0].webhookUrl)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
      toast({
        title: "Error",
        description: "Failed to fetch API keys",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key",
        variant: "destructive"
      })
      return
    }

    try {
      setActionLoading('create')
      
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: selectedPage,
          name: newKeyName,
          permissions: ['read', 'write']
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create API key')
      }

      const data = await response.json()
      
      // Add new key to the list
      setApiKeys(prev => [...prev, {
        ...data.apiKey,
        pageId: selectedPage!,
        pageTitle: webhookSettings.find(w => w.pageId === selectedPage)?.pageTitle || ''
      }])

      setNewKeyName("")
      toast({
        title: "Success",
        description: "API key created successfully"
      })
    } catch (error) {
      console.error('Error creating API key:', error)
      toast({
        title: "Error",
        description: "Failed to create API key",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteApiKey = async (keyId: string, pageId: number) => {
    if (!confirm("Are you sure you want to delete this API key? This action cannot be undone.")) {
      return
    }

    try {
      setActionLoading(keyId)
      
      const response = await fetch(`/api/user/api-keys?pageId=${pageId}&keyId=${keyId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      setApiKeys(prev => prev.filter(key => key.id !== keyId))
      toast({
        title: "Success",
        description: "API key deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting API key:', error)
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleRegenerateApiKey = async (keyId: string, pageId: number) => {
    if (!confirm("Are you sure you want to regenerate this API key? The old key will stop working immediately.")) {
      return
    }

    try {
      setActionLoading(`regenerate-${keyId}`)
      
      const response = await fetch('/api/user/api-keys', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          type: 'apiKey',
          data: {
            keyId,
            updates: {
              key: `wly_${Math.random().toString(36).substring(2, 15)}`,
              lastUsed: null
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate API key')
      }

      // Refresh API keys
      await fetchApiKeys()
      toast({
        title: "Success",
        description: "API key regenerated successfully"
      })
    } catch (error) {
      console.error('Error regenerating API key:', error)
      toast({
        title: "Error",
        description: "Failed to regenerate API key",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleUpdateWebhook = async () => {
    if (!selectedPage) return

    try {
      setActionLoading('webhook')
      
      const currentWebhook = webhookSettings.find(w => w.pageId === selectedPage)
      if (!currentWebhook) return

      const response = await fetch('/api/user/api-keys', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: selectedPage,
          type: 'webhook',
          data: {
            webhookUrl,
            webhookEvents: currentWebhook.webhookEvents
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update webhook settings')
      }

      // Update local state
      setWebhookSettings(prev => prev.map(w => 
        w.pageId === selectedPage ? { ...w, webhookUrl } : w
      ))

      toast({
        title: "Success",
        description: "Webhook settings updated successfully"
      })
    } catch (error) {
      console.error('Error updating webhook settings:', error)
      toast({
        title: "Error",
        description: "Failed to update webhook settings",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "API key copied to clipboard"
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage your API keys and webhooks</p>
        <Button 
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20"
          onClick={handleCreateApiKey}
          disabled={actionLoading === 'create' || !selectedPage}
        >
          {actionLoading === 'create' ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
          <Plus className="h-4 w-4 mr-2" />
          )}
          Create API Key
        </Button>
      </div>

      {/* Page Selection */}
      {webhookSettings.length > 1 && (
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-4">
            <Label className="text-gray-300 mb-2 block">Select Page</Label>
            <select
              value={selectedPage || ""}
              onChange={(e) => {
                const pageId = Number(e.target.value)
                setSelectedPage(pageId)
                const webhook = webhookSettings.find(w => w.pageId === pageId)
                setWebhookUrl(webhook?.webhookUrl || "")
              }}
              className="bg-gray-900 border-gray-700 text-white rounded px-3 py-2 w-full"
            >
              {webhookSettings.map(setting => (
                <option key={setting.pageId} value={setting.pageId}>
                  {setting.pageTitle}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {/* Create New API Key */}
      {selectedPage && (
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Create New API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newKeyName" className="text-gray-300">
                API Key Name
              </Label>
              <Input
                id="newKeyName"
                placeholder="e.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button 
              onClick={handleCreateApiKey}
              disabled={actionLoading === 'create' || !newKeyName.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {actionLoading === 'create' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create API Key
            </Button>
          </CardContent>
        </Card>
      )}

      {/* API Keys */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No API keys found. Create one to get started.</p>
          ) : (
          <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                    <div>
                  <h3 className="text-white font-semibold">{apiKey.name}</h3>
                      <p className="text-gray-400 text-sm">{apiKey.pageTitle}</p>
                    </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                      >
                        {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                        onClick={() => handleRegenerateApiKey(apiKey.id, apiKey.pageId)}
                      className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                        disabled={actionLoading === `regenerate-${apiKey.id}`}
                    >
                        {actionLoading === `regenerate-${apiKey.id}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                      <RefreshCw className="h-4 w-4" />
                        )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                        onClick={() => handleDeleteApiKey(apiKey.id, apiKey.pageId)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 backdrop-blur-sm"
                        disabled={actionLoading === apiKey.id}
                    >
                        {actionLoading === apiKey.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                      <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <code className="bg-gray-900 px-2 py-1 rounded text-gray-300 font-mono">
                      {showKeys[apiKey.id] ? apiKey.key : `${apiKey.key.substring(0, 12)}...${apiKey.key.substring(apiKey.key.length - 4)}`}
                    </code>
                    <span className="text-gray-500">Created: {new Date(apiKey.created).toLocaleDateString()}</span>
                    {apiKey.lastUsed && (
                      <span className="text-gray-500">Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                    )}
                </div>
              </div>
            ))}
          </div>
          )}
        </CardContent>
      </Card>

      {/* Webhooks */}
      {selectedPage && (
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
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-gray-300">Event Types</Label>
              {webhookSettings.find(w => w.pageId === selectedPage)?.webhookEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{event.name}</p>
                    <p className="text-gray-400 text-sm">
                      {event.name === "signup.created" && "Triggered when a new signup occurs"}
                      {event.name === "referral.completed" && "Triggered when a referral is successful"}
                      {event.name === "milestone.reached" && "Triggered when a user reaches a referral milestone"}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                      checked={event.enabled}
                      onChange={(e) => {
                        // Update webhook events (simplified for now)
                        console.log('Toggle webhook event:', event.name, e.target.checked)
                      }}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-900"
                  />
                </div>
              </div>
            ))}
          </div>

            <Button 
              onClick={handleUpdateWebhook}
              disabled={actionLoading === 'webhook'}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {actionLoading === 'webhook' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
            Save Webhook Settings
          </Button>
        </CardContent>
      </Card>
      )}
    </div>
  )
}
