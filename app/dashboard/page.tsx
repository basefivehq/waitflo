"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { WaitlistPages } from "@/components/dashboard/waitlist-pages"
import { PageBuilder } from "@/components/dashboard/page-builder"
import { SignupsViewer } from "@/components/dashboard/signups-viewer"
import { ReferralsPage } from "@/components/dashboard/referrals-page"
import { EmailsAutomation } from "@/components/dashboard/emails-automation"
import { TemplatesGallery } from "@/components/dashboard/templates-gallery"
import { Analytics } from "@/components/dashboard/analytics"
import { Settings } from "@/components/dashboard/settings"
import { ApiKeys } from "@/components/dashboard/api-keys"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome theme={theme} />
      case "waitlist-pages":
        return <WaitlistPages theme={theme} />
      case "page-builder":
        return <PageBuilder theme={theme} />
      case "signups":
        return <SignupsViewer theme={theme} />
      case "referrals":
        return <ReferralsPage theme={theme} />
      case "emails":
        return <EmailsAutomation theme={theme} />
      case "templates":
        return <TemplatesGallery theme={theme} />
      case "analytics":
        return <Analytics theme={theme} />
      case "settings":
        return <Settings theme={theme} />
      case "api-keys":
        return <ApiKeys theme={theme} />
      default:
        return <DashboardHome theme={theme} />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} setTheme={setTheme}>
      {renderContent()}
    </DashboardLayout>
  )
}
