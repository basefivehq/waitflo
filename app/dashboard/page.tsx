"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { WaitlistPages } from "@/components/dashboard/waitlist-pages"
import { SignupsViewer } from "@/components/dashboard/signups-viewer"
import { ReferralsPage } from "@/components/dashboard/referrals-page"
import { EmailsAutomation } from "@/components/dashboard/emails-automation"
import { TemplatesGallery } from "@/components/dashboard/templates-gallery"
import { Analytics } from "@/components/dashboard/analytics"
import { Settings } from "@/components/dashboard/settings"
import { ApiKeys } from "@/components/dashboard/api-keys"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />
      case "waitlist-pages":
        return <WaitlistPages />
      case "signups":
        return <SignupsViewer />
      case "referrals":
        return <ReferralsPage />
      case "emails":
        return <EmailsAutomation />
      case "templates":
        return <TemplatesGallery />
      case "analytics":
        return <Analytics />
      case "settings":
        return <Settings />
      case "api-keys":
        return <ApiKeys />
      default:
        return <DashboardHome />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
