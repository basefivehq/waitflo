"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Ban, Trash2, ExternalLink } from "lucide-react"

export function WaitlistPagesManager() {
  const [searchTerm, setSearchTerm] = useState("")

  const pages = [
    {
      id: 1,
      title: "SaaS Product Launch",
      user: "Sarah Chen",
      userEmail: "sarah@example.com",
      url: "saas-launch.waitly.co",
      signups: 1247,
      status: "active",
      createdDate: "2024-01-15",
      lastActivity: "2 hours ago",
      views: 12847,
      conversion: 9.7,
    },
    {
      id: 2,
      title: "Mobile App Beta",
      user: "Mike Johnson",
      userEmail: "mike@example.com",
      url: "mobile-beta.waitly.co",
      signups: 892,
      status: "active",
      createdDate: "2024-01-12",
      lastActivity: "1 day ago",
      views: 8923,
      conversion: 10.0,
    },
    {
      id: 3,
      title: "E-commerce Store",
      user: "Emma Wilson",
      userEmail: "emma@example.com",
      url: "store-launch.waitly.co",
      signups: 456,
      status: "inactive",
      createdDate: "2024-01-08",
      lastActivity: "1 week ago",
      views: 5634,
      conversion: 8.1,
    },
    {
      id: 4,
      title: "Newsletter Signup",
      user: "David Brown",
      userEmail: "david@example.com",
      url: "newsletter.waitly.co",
      signups: 234,
      status: "active",
      createdDate: "2024-01-14",
      lastActivity: "3 hours ago",
      views: 3421,
      conversion: 6.8,
    },
    {
      id: 5,
      title: "Product Hunt Launch",
      user: "Lisa Garcia",
      userEmail: "lisa@example.com",
      url: "ph-launch.waitly.co",
      signups: 1834,
      status: "active",
      createdDate: "2024-01-11",
      lastActivity: "30 minutes ago",
      views: 18340,
      conversion: 10.0,
    },
  ]

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.url.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewPage = (pageId: number) => {
    console.log(`Viewing page ${pageId}`)
  }

  const handleDisablePage = (pageId: number) => {
    if (confirm("Are you sure you want to disable this page?")) {
      console.log(`Disabling page ${pageId}`)
    }
  }

  const handleDeletePage = (pageId: number) => {
    if (confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      console.log(`Deleting page ${pageId}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage all user-created waitlist pages</p>
        <div className="flex space-x-2">
          <Button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 text-purple-300 hover:text-white">
            Export Data
          </Button>
        </div>
      </div>

      {/* Page Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{pages.length}</p>
              <p className="text-gray-400 text-sm">Total Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{pages.filter((p) => p.status === "active").length}</p>
              <p className="text-gray-400 text-sm">Active Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {pages.reduce((sum, p) => sum + p.signups, 0).toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Signups</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {(pages.reduce((sum, p) => sum + p.conversion, 0) / pages.length).toFixed(1)}%
              </p>
              <p className="text-gray-400 text-sm">Avg Conversion</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, user, or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0f0f1a] border-purple-700/30 text-white"
              />
            </div>
            <Button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 text-purple-300 hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-800/30">
                  <th className="text-left p-4 text-gray-400 font-medium">Page Title</th>
                  <th className="text-left p-4 text-gray-400 font-medium">User</th>
                  <th className="text-left p-4 text-gray-400 font-medium">URL</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Views</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Signups</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Conversion</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr key={page.id} className="border-b border-purple-800/20 hover:bg-purple-900/10">
                    <td className="p-4">
                      <p className="text-white font-medium">{page.title}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white text-sm">{page.user}</p>
                        <p className="text-gray-400 text-xs">{page.userEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300 text-sm">{page.url}</p>
                        <ExternalLink className="h-3 w-3 text-gray-500" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{page.views.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{page.signups.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <p
                        className={`font-semibold ${
                          page.conversion >= 9
                            ? "text-green-400"
                            : page.conversion >= 7
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {page.conversion}%
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          page.status === "active" ? "bg-green-900/50 text-green-400" : "bg-gray-900/50 text-gray-400"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300 text-sm">{page.createdDate}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewPage(page.id)}
                          className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisablePage(page.id)}
                          className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePage(page.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
