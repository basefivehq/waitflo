"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Mail, TrendingUp, Loader2, BarChart3 } from "lucide-react"

interface AnalyticsData {
  overview: {
    totalPages: number
    publishedPages: number
    totalSignups: number
    totalOnboarding: number
    totalViews: number
    avgConversion: string
    recentSignups: number
    recentOnboarding: number
  }
  dailyData: Array<{
    day: string
    signups: number
    onboarding: number
  }>
  topPages: Array<{
    id: number
    title: string
    signups: number
    conversion: number
    url: string
  }>
  recentSignups: Array<{
    id: number
    email: string
    subscribed_at: string
    pageTitle: string
    pageSlug: string
  }>
}

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/analytics')
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const data = await response.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
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

  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Failed to load analytics data</p>
        </div>
      </div>
    )
  }

  const { overview, dailyData, topPages, recentSignups } = analyticsData

  const metrics = [
    { title: "Total Pages", value: overview.totalPages, change: "+2", icon: FileText, color: "text-blue-400" },
    { title: "Published Pages", value: overview.publishedPages, change: "+1", icon: FileText, color: "text-green-400" },
    { title: "Total Signups", value: overview.totalSignups.toLocaleString(), change: "+15%", icon: Mail, color: "text-purple-400" },
    { title: "Avg Conversion", value: overview.avgConversion, change: "+2.1%", icon: TrendingUp, color: "text-yellow-400" },
  ]

  const maxSignups = Math.max(...dailyData.map((d) => d.signups))
  const maxOnboarding = Math.max(...dailyData.map((d) => d.onboarding))

  return (
    <div className="space-y-6">
      <p className="text-gray-400">Track your waitlist performance and growth</p>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-[#1a1a2e] border-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <p className="text-green-400 text-sm mt-1">{metric.change} from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Daily Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="flex items-end justify-between h-full space-x-2">
                {dailyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="flex flex-col items-center justify-end h-48 space-y-1">
                      {/* Onboarding bar */}
                      <div
                        className="w-full bg-blue-600/60 rounded-t-sm min-h-[4px] relative group"
                        style={{
                          height: `${(data.onboarding / maxOnboarding) * 60}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.onboarding} onboarding
                        </div>
                      </div>
                      {/* Signups bar */}
                      <div
                        className="w-full bg-purple-600 rounded-t-sm min-h-[4px] relative group"
                        style={{
                          height: `${(data.signups / maxSignups) * 180}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.signups} signups
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs mt-2">{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded"></div>
                  <span className="text-gray-400 text-sm">Signups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600/60 rounded"></div>
                  <span className="text-gray-400 text-sm">Onboarding</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Pages */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No pages found. Create a waitlist page to see analytics.</p>
              ) : (
                topPages.map((page, index) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-3 border border-purple-800/20 rounded-lg hover:bg-purple-900/10"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{page.title}</p>
                        <p className="text-gray-400 text-sm">{page.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{page.signups.toLocaleString()}</p>
                      <p className="text-green-400 text-sm">{page.conversion}% conversion</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSignups.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No recent signups. Share your waitlist page to start collecting signups.</p>
            ) : (
              recentSignups.map((signup) => (
                <div
                  key={signup.id}
                  className="flex items-center justify-between p-3 border border-purple-800/20 rounded-lg hover:bg-purple-900/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{signup.email}</p>
                      <p className="text-gray-400 text-sm">{signup.pageTitle}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(signup.subscribed_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{overview.totalViews.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Total Page Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <Mail className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{overview.recentSignups}</p>
              <p className="text-gray-400 text-sm">Signups This Week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{overview.recentOnboarding}</p>
              <p className="text-gray-400 text-sm">Onboarding This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
