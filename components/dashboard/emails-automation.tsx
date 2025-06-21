import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Eye, Save } from "lucide-react"

export function EmailsAutomation() {
  const emailTypes = [
    {
      title: "Welcome Email",
      description: "Sent immediately after signup",
      enabled: true,
      subject: "Welcome to our waitlist!",
      body: "Thanks for joining our waitlist. We'll keep you updated on our progress.",
    },
    {
      title: "Referral Milestone Email",
      description: "Sent when user reaches referral milestones",
      enabled: true,
      subject: "You've unlocked a reward!",
      body: "Congratulations! You've referred 5 people and unlocked early access.",
    },
    {
      title: "Reminder Email",
      description: "Periodic updates to keep users engaged",
      enabled: false,
      subject: "Don't forget about us!",
      body: "We're making great progress and wanted to share an update with you.",
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-gray-400">Configure automated email sequences</p>

      <div className="space-y-6">
        {emailTypes.map((email, index) => (
          <Card key={index} className="bg-[#1a1a2e] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{email.title}</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">{email.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={email.enabled} />
                  <span className="text-gray-400 text-sm">{email.enabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`subject-${index}`} className="text-gray-300">
                  Subject Line
                </Label>
                <Input
                  id={`subject-${index}`}
                  defaultValue={email.subject}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`body-${index}`} className="text-gray-300">
                  Email Body
                </Label>
                <Textarea
                  id={`body-${index}`}
                  defaultValue={email.body}
                  rows={4}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
