"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Key, Bell, Shield, Menu, X, LogOut } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
    { name: "Users", id: "users", icon: Users },
    { name: "Pages", id: "pages", icon: FileText },
    { name: "Analytics", id: "analytics", icon: BarChart3 },
    { name: "Settings", id: "settings", icon: Settings },
    { name: "API Keys", id: "api-keys", icon: Key },
  ]

  const handleLogout = () => {
    router.push("/admin/login")
  }

  const getPageTitle = () => {
    const currentPage = navigation.find((item) => item.id === activeTab)
    return currentPage ? `Admin ${currentPage.name}` : "Admin Dashboard"
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-[#1a1a2e] border-r border-purple-800/30">
            <div className="flex items-center justify-between p-4 border-b border-purple-800/30">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Admin Portal</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-purple-800/30"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/20 mt-4"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-[#1a1a2e] lg:border-r lg:border-purple-800/30 lg:block">
        <div className="flex items-center space-x-2 p-4 border-b border-purple-800/30">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Admin Portal</span>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-purple-800/30"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/20 mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className="bg-[#1a1a2e] border-b border-purple-800/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
                <p className="text-gray-400 text-sm">Platform administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
