"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Ban, Trash2, ExternalLink, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Page {
  id: number
  title: string
  user: string
  userEmail: string
  url: string
  signups: number
  status: string
  createdDate: string
  lastActivity: string
  views: number
  conversion: number
}

interface PageStats {
  total: number
  active: number
  totalSignups: number
  totalViews: number
}

export function WaitlistPagesManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pages, setPages] = useState<Page[]>([])
  const [stats, setStats] = useState<PageStats>({ total: 0, active: 0, totalSignups: 0, totalViews: 0 })
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/pages')
      
      if (!response.ok) {
        throw new Error('Failed to fetch pages')
      }

      const data = await response.json()
      setPages(data.pages)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching pages:', error)
      toast({
        title: "Error",
        description: "Failed to fetch pages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewPage = (pageId: number) => {
    const page = pages.find(p => p.id === pageId)
    if (page) {
      window.open(`/p/${page.url.replace('.waitly.co', '')}`, '_blank')
    }
  }

  const handleDisablePage = async (pageId: number) => {
    try {
      setActionLoading(pageId)
      const response = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, published: false })
      })

      if (!response.ok) {
        throw new Error('Failed to disable page')
      }

      toast({
        title: "Success",
        description: "Page disabled successfully"
      })

      // Refresh pages list
      await fetchPages()
    } catch (error) {
      console.error('Error disabling page:', error)
      toast({
        title: "Error",
        description: "Failed to disable page",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeletePage = async (pageId: number) => {
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      return
    }

    try {
      setActionLoading(pageId)
      const response = await fetch(`/api/admin/pages?id=${pageId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete page')
      }

      toast({
        title: "Success",
        description: "Page deleted successfully"
      })

      // Refresh pages list
      await fetchPages()
    } catch (error) {
      console.error('Error deleting page:', error)
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.url.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-gray-400 text-sm">Total Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              <p className="text-gray-400 text-sm">Active Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {stats.totalSignups.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Signups</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {stats.totalViews.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Views</p>
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
                      <p className="text-gray-400 text-sm">{page.userEmail}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{page.user}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300 text-sm font-mono truncate max-w-xs">{page.url}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{page.views.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{page.signups.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-green-400 font-semibold">{page.conversion}%</span>
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
                      <p className="text-gray-300 text-sm">{new Date(page.createdDate).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewPage(page.id)}
                          className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                          disabled={actionLoading === page.id}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisablePage(page.id)}
                          className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                          disabled={actionLoading === page.id}
                        >
                          {actionLoading === page.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                          <Ban className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePage(page.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          disabled={actionLoading === page.id}
                        >
                          {actionLoading === page.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                          <Trash2 className="h-4 w-4" />
                          )}
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
