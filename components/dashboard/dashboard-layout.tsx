"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Users,
  Share2,
  Mail,
  Palette,
  BarChart3,
  Settings,
  Key,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  Wand2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, SettingsIcon } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
}

export function DashboardLayout({ children, activeTab, setActiveTab, theme, setTheme }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navigation = [
    { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
    { name: "Waitlist Pages", id: "waitlist-pages", icon: FileText },
    { name: "Page Builder", id: "page-builder", icon: Wand2 },
    { name: "Signups", id: "signups", icon: Users },
    { name: "Referrals", id: "referrals", icon: Share2 },
    { name: "Emails", id: "emails", icon: Mail },
    { name: "Templates", id: "templates", icon: Palette },
    { name: "Analytics", id: "analytics", icon: BarChart3 },
    { name: "Settings", id: "settings", icon: Settings },
    { name: "API Keys", id: "api-keys", icon: Key },
  ]

  const getWelcomeMessage = () => {
    if (activeTab === "dashboard") {
      return {
        title: "Welcome back, John! 👋",
        subtitle: "Here's an overview of your dashboard",
      }
    }

    const currentPage = navigation.find((item) => item.id === activeTab)
    return {
      title: currentPage?.name || "Dashboard",
      subtitle: "",
    }
  }

  const handleLogout = () => {
    // Clear any stored auth tokens/data
    localStorage.removeItem("authToken")
    sessionStorage.clear()

    // Redirect to login page
    window.location.href = "/login"
  }

  const { title, subtitle } = getWelcomeMessage()

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0f0f1a] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div
            className={`fixed left-0 top-0 h-full w-64 border-r transition-colors duration-300 ${
              theme === "dark" ? "bg-[#1a1a2e] border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold">Waitly</span>
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
                      ? theme === "dark"
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-900"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:border-r lg:block transition-colors duration-300 ${
          theme === "dark" ? "lg:bg-[#1a1a2e] lg:border-gray-800" : "lg:bg-white lg:border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2 p-4 border-b border-gray-800">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-xl font-bold">Waitly</span>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? theme === "dark"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-900"
                  : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header
          className={`border-b px-4 py-3 transition-colors duration-300 ${
            theme === "dark" ? "bg-[#1a1a2e] border-gray-800" : "bg-white border-gray-200"
          }`}
        >
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
                <h1 className="text-xl font-semibold">{title}</h1>
                {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                } backdrop-blur-sm`}
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={`transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                } backdrop-blur-sm`}
              >
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <span className="text-white font-semibold text-sm">JD</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`w-56 border transition-colors duration-300 ${
                    theme === "dark" ? "bg-[#1a1a2e] border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john.doe@example.com</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className={`cursor-pointer transition-colors ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`cursor-pointer transition-colors ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
