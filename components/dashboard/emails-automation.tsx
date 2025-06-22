"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Eye, Save, Loader2, Mail } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface EmailSettings {
  pageId: number
  pageTitle: string
  emailAutomation: {
    welcomeEmail: EmailConfig
    referralEmail: EmailConfig
    reminderEmail: EmailConfig
    milestoneEmail: EmailConfig
  }
}

interface EmailConfig {
  enabled: boolean
  subject: string
  body: string
  delay: number
}

export function EmailsAutomation() {
  const [emailSettings, setEmailSettings] = useState<EmailSettings[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [testEmail, setTestEmail] = useState("")
  const [selectedPage, setSelectedPage] = useState<number | null>(null)

  useEffect(() => {
    fetchEmailSettings()
  }, [])

  const fetchEmailSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/emails')
      
      if (!response.ok) {
        throw new Error('Failed to fetch email settings')
      }

      const data = await response.json()
      setEmailSettings(data.emailSettings)
      
      if (data.emailSettings.length > 0) {
        setSelectedPage(data.emailSettings[0].pageId)
      }
    } catch (error) {
      console.error('Error fetching email settings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch email settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailToggle = async (pageId: number, emailType: string, enabled: boolean) => {
    try {
      setSaving(`${pageId}-${emailType}`)
      
      const currentSettings = emailSettings.find(s => s.pageId === pageId)
      if (!currentSettings) return

      const emailConfig = currentSettings.emailAutomation[emailType as keyof typeof currentSettings.emailAutomation]
      const updatedSettings = { ...emailConfig, enabled }

      const response = await fetch('/api/user/emails', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          emailType,
          settings: updatedSettings
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update email settings')
      }

      // Update local state
      setEmailSettings(prev => prev.map(setting => {
        if (setting.pageId === pageId) {
          return {
            ...setting,
            emailAutomation: {
              ...setting.emailAutomation,
              [emailType]: updatedSettings
            }
          }
        }
        return setting
      }))

      toast({
        title: "Success",
        description: "Email settings updated successfully"
      })
    } catch (error) {
      console.error('Error updating email settings:', error)
      toast({
        title: "Error",
        description: "Failed to update email settings",
        variant: "destructive"
      })
    } finally {
      setSaving(null)
    }
  }

  const handleEmailUpdate = async (pageId: number, emailType: string, field: string, value: string | number) => {
    try {
      setSaving(`${pageId}-${emailType}`)
      
      const currentSettings = emailSettings.find(s => s.pageId === pageId)
      if (!currentSettings) return

      const emailConfig = currentSettings.emailAutomation[emailType as keyof typeof currentSettings.emailAutomation]
      const updatedSettings = { ...emailConfig, [field]: value }

      const response = await fetch('/api/user/emails', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          emailType,
          settings: updatedSettings
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update email settings')
      }

      // Update local state
      setEmailSettings(prev => prev.map(setting => {
        if (setting.pageId === pageId) {
          return {
            ...setting,
            emailAutomation: {
              ...setting.emailAutomation,
              [emailType]: updatedSettings
            }
          }
        }
        return setting
      }))

      toast({
        title: "Success",
        description: "Email settings updated successfully"
      })
    } catch (error) {
      console.error('Error updating email settings:', error)
      toast({
        title: "Error",
        description: "Failed to update email settings",
        variant: "destructive"
      })
    } finally {
      setSaving(null)
    }
  }

  const handleTestEmail = async (pageId: number, emailType: string) => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Please enter a test email address",
        variant: "destructive"
      })
      return
    }

    try {
      setSaving(`test-${pageId}-${emailType}`)
      
      const response = await fetch('/api/user/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          emailType,
          testEmail
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send test email')
      }

      toast({
        title: "Success",
        description: "Test email sent successfully"
      })
      setTestEmail("")
    } catch (error) {
      console.error('Error sending test email:', error)
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive"
      })
    } finally {
      setSaving(null)
    }
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

  if (emailSettings.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">Configure automated email sequences</p>
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No pages found. Create a waitlist page first to configure email automation.</p>
        </div>
      </div>
    )
  }

  const selectedSettings = emailSettings.find(s => s.pageId === selectedPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
      <p className="text-gray-400">Configure automated email sequences</p>
        {emailSettings.length > 1 && (
          <select
            value={selectedPage || ""}
            onChange={(e) => setSelectedPage(Number(e.target.value))}
            className="bg-gray-900 border-gray-700 text-white rounded px-3 py-2"
          >
            {emailSettings.map(setting => (
              <option key={setting.pageId} value={setting.pageId}>
                {setting.pageTitle}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedSettings && (
      <div className="space-y-6">
          {Object.entries(selectedSettings.emailAutomation).map(([emailType, email]) => (
            <Card key={emailType} className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-white capitalize">
                      {emailType.replace(/([A-Z])/g, ' $1').trim()} Email
                    </CardTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      {emailType === 'welcomeEmail' && "Sent immediately after signup"}
                      {emailType === 'referralEmail' && "Sent when user refers someone"}
                      {emailType === 'reminderEmail' && "Periodic updates to keep users engaged"}
                      {emailType === 'milestoneEmail' && "Sent when user reaches referral milestones"}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch 
                      checked={email.enabled}
                      onCheckedChange={(enabled) => handleEmailToggle(selectedSettings.pageId, emailType, enabled)}
                      disabled={saving === `${selectedSettings.pageId}-${emailType}`}
                    />
                  <span className="text-gray-400 text-sm">{email.enabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor={`subject-${emailType}`} className="text-gray-300">
                  Subject Line
                </Label>
                <Input
                    id={`subject-${emailType}`}
                    value={email.subject}
                    onChange={(e) => handleEmailUpdate(selectedSettings.pageId, emailType, 'subject', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                    disabled={saving === `${selectedSettings.pageId}-${emailType}`}
                />
              </div>
              <div className="space-y-2">
                  <Label htmlFor={`body-${emailType}`} className="text-gray-300">
                  Email Body
                </Label>
                <Textarea
                    id={`body-${emailType}`}
                    value={email.body}
                    onChange={(e) => handleEmailUpdate(selectedSettings.pageId, emailType, 'body', e.target.value)}
                  rows={4}
                    className="bg-gray-900 border-gray-700 text-white"
                    disabled={saving === `${selectedSettings.pageId}-${emailType}`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                    onClick={() => handleTestEmail(selectedSettings.pageId, emailType)}
                    disabled={saving === `test-${selectedSettings.pageId}-${emailType}`}
                  >
                    {saving === `test-${selectedSettings.pageId}-${emailType}` ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    Test Email
                  </Button>
                  {saving === `${selectedSettings.pageId}-${emailType}` && (
                    <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Test Email Input */}
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Test Email Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="testEmail" className="text-gray-300">
                  Test Email Address
                </Label>
                <Input
                  id="testEmail"
                  type="email"
                  placeholder="Enter email address to test with..."
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>
      </div>
      )}
    </div>
  )
}
