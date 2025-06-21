'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Calendar, Mail, Users, TrendingUp, Globe } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/utils"
import { useEffect, useState } from "react"

interface SignupsViewerProps {}

interface Subscription {
  id: number
  email: string
  subscribed_at: string
  page: {
    id: number
    title: string
    slug: string
  }
}

interface Page {
  id: number
  title: string
  slug: string
}

export function SignupsViewer({}: SignupsViewerProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPage, setSelectedPage] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Fetch user's pages
      const { data: pagesData } = await supabase
        .from('pages')
        .select('id, title, slug')
        .eq('user_id', user.id)

      setPages(pagesData || [])

      // Fetch subscriptions for user's pages
      if (pagesData && pagesData.length > 0) {
        const pageIds = pagesData.map(page => page.id)
        const { data: subscriptionsData } = await supabase
          .from('subscriptions')
          .select(`
            id,
            email,
            subscribed_at,
            page:pages(id, title, slug)
          `)
          .in('page_id', pageIds)
          .order('subscribed_at', { ascending: false })

        // Process the data to fix the type mismatch
        const processedSubscriptions = (subscriptionsData || []).map((subscription: any) => ({
          id: subscription.id,
          email: subscription.email,
          subscribed_at: subscription.subscribed_at,
          page: Array.isArray(subscription.page) ? subscription.page[0] : subscription.page
        }))

        setSubscriptions(processedSubscriptions)
      }
    }
    setLoading(false)
  }

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.page.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPage = selectedPage === "all" || subscription.page.id.toString() === selectedPage
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && isToday(new Date(subscription.subscribed_at))) ||
                       (dateFilter === "week" && isThisWeek(new Date(subscription.subscribed_at))) ||
                       (dateFilter === "month" && isThisMonth(new Date(subscription.subscribed_at)))
    
    return matchesSearch && matchesPage && matchesDate
  })

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isThisWeek = (date: Date) => {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return date >= weekAgo
  }

  const isThisMonth = (date: Date) => {
    const today = new Date()
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
  }

  const exportData = () => {
    const csvContent = [
      ['Email', 'Page', 'Subscribed At'],
      ...filteredSubscriptions.map(sub => [
        sub.email,
        sub.page.title,
        new Date(sub.subscribed_at).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `waitlist-subscriptions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: subscriptions.length,
    today: subscriptions.filter(sub => isToday(new Date(sub.subscribed_at))).length,
    thisWeek: subscriptions.filter(sub => isThisWeek(new Date(sub.subscribed_at))).length,
    thisMonth: subscriptions.filter(sub => isThisMonth(new Date(sub.subscribed_at))).length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[#1a1a2e] border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Signups</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-400/20">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.today}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-400/20">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">This Week</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.thisWeek}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-400/20">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">This Month</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.thisMonth}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-400/20">
                <Mail className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email or page..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pages</SelectItem>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id.toString()}>
                    {page.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={exportData}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Waitlist Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No subscriptions found</h3>
              <p className="text-gray-400">
                {searchTerm || selectedPage !== "all" || dateFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Subscriptions will appear here once people join your waitlists"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Page</TableHead>
                    <TableHead className="text-gray-300">Subscribed At</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id} className="border-gray-800">
                      <TableCell className="text-white">{subscription.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{subscription.page.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(subscription.subscribed_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(subscription.email)}
                          className="text-gray-400 hover:text-white"
                        >
                          Copy Email
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
