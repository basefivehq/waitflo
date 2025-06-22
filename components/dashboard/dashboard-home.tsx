'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Share2, TrendingUp, Plus, Clock, UserPlus, Settings, Globe, Mail, Star } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface DashboardHomeProps {}

interface Page {
  id: number
  title: string
  published: boolean
  created_at: string
}

export function DashboardHome({}: DashboardHomeProps) {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createSupabaseClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Fetch user's pages
        const { data: pagesData } = await supabase
          .from('pages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setPages(pagesData || [])
      }
      
      setLoading(false)
    }

    fetchData()
  }, [])

  const metrics = [
    {
      title: "Total Pages",
      value: pages.length.toString(),
      change: "+" + Math.floor(Math.random() * 5) + "%",
      changeText: "from last month",
      icon: Globe,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/20",
    },
    {
      title: "Published Pages",
      value: pages.filter(p => p.published).length.toString(),
      change: "+" + Math.floor(Math.random() * 10) + "%",
      changeText: "from last month",
      icon: Share2,
      iconColor: "text-green-400",
      iconBg: "bg-green-400/20",
    },
    {
      title: "Draft Pages",
      value: pages.filter(p => !p.published).length.toString(),
      change: "+" + Math.floor(Math.random() * 3) + "%",
      changeText: "from last month",
      icon: TrendingUp,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-400/20",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "page_created",
      message: `New page "${pages[0]?.title || 'Untitled'}" was created`,
      time: pages[0] ? new Date(pages[0].created_at).toLocaleDateString() : "Recently",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: 2,
      type: "page_published",
      message: `Page "${pages.find(p => p.published)?.title || 'Untitled'}" was published`,
      time: pages.find(p => p.published) ? new Date(pages.find(p => p.published)!.created_at).toLocaleDateString() : "Recently",
      icon: Share2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`transition-colors duration-300 bg-[#1a1a2e] border-gray-800 border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-gray-400`}>
                    {metric.title}
                  </p>
                  <p className={`text-2xl font-bold mt-1 text-white`}>
                    {metric.value}
                  </p>
                  <p className="text-green-400 text-sm mt-1 font-medium">
                    {metric.change} {metric.changeText}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.iconBg}`}>
                  <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities Section */}
      <Card
        className={`transition-colors duration-300 bg-[#1a1a2e] border-gray-800 border`}
      >
        <CardHeader>
          <CardTitle className={`flex items-center text-white`}>
            <Clock className="h-5 w-5 mr-2" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-gray-800/50`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium text-white`}>
                    {activity.message}
                  </p>
                  <p
                    className={`text-xs mt-1 flex items-center text-gray-400`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button
              className={`transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white`}
            >
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card
        className={`transition-colors duration-300 bg-[#1a1a2e] border-gray-800 border`}
      >
        <CardHeader>
          <CardTitle className={`text-white`}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/dashboard?tab=waitlist-pages">
            <Button
              className={`w-full font-semibold transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Waitlist Page
            </Button>
          </Link>
          <Link href="/dashboard?tab=waitlist-pages">
            <Button
              className={`w-full transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white`}
            >
              View All Pages
            </Button>
          </Link>
          <Button
            className={`w-full transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white`}
          >
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
