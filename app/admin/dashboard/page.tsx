"use client"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboardHome } from "@/components/admin/admin-dashboard-home"
import { UserManagement } from "@/components/admin/user-management"
import { WaitlistPagesManager } from "@/components/admin/waitlist-pages-manager"
import { PlatformAnalytics } from "@/components/admin/platform-analytics"
import { PlatformSettings } from "@/components/admin/platform-settings"
import { AdminApiKeys } from "@/components/admin/admin-api-keys"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboardHome />
      case "users":
        return <UserManagement />
      case "pages":
        return <WaitlistPagesManager />
      case "analytics":
        return <PlatformAnalytics />
      case "settings":
        return <PlatformSettings />
      case "api-keys":
        return <AdminApiKeys />
      default:
        return <AdminDashboardHome />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  )
}
