import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, Mail, Activity } from "lucide-react"

export function PlatformAnalytics() {
  const metrics = [
    { title: "Daily New Users", value: "47", change: "+23%", icon: Users },
    { title: "Page Creations", value: "12", change: "+8%", icon: FileText },
    { title: "Email Sends", value: "2,847", change: "+15%", icon: Mail },
    { title: "API Requests", value: "18,392", change: "+12%", icon: Activity },
  ]

  // Daily new users data
  const newUsersData = [
    { date: "Jan 10", users: 23 },
    { date: "Jan 11", users: 34 },
    { date: "Jan 12", users: 28 },
    { date: "Jan 13", users: 45 },
    { date: "Jan 14", users: 52 },
    { date: "Jan 15", users: 67 },
    { date: "Jan 16", users: 43 },
  ]

  const maxUsers = Math.max(...newUsersData.map((d) => d.users))

  // Page creation trends
  const pageCreationData = [
    { week: "Week 1", pages: 45 },
    { week: "Week 2", pages: 67 },
    { week: "Week 3", pages: 52 },
    { week: "Week 4", pages: 89 },
  ]

  const maxPages = Math.max(...pageCreationData.map((d) => d.pages))

  // Top referral sources
  const referralSources = [
    { source: "Twitter", percentage: 35, count: 1247 },
    { source: "Product Hunt", percentage: 28, count: 998 },
    { source: "Direct", percentage: 20, count: 712 },
    { source: "LinkedIn", percentage: 12, count: 427 },
    { source: "Other", percentage: 5, count: 178 },
  ]

  // Email performance
  const emailPerformance = [
    { day: "Mon", sent: 245, delivered: 242, opened: 156 },
    { day: "Tue", sent: 352, delivered: 349, opened: 223 },
    { day: "Wed", sent: 189, delivered: 187, opened: 134 },
    { day: "Thu", sent: 467, delivered: 463, opened: 298 },
    { day: "Fri", sent: 589, delivered: 584, opened: 376 },
    { day: "Sat", sent: 376, delivered: 372, opened: 201 },
    { day: "Sun", sent: 243, delivered: 241, opened: 145 },
  ]

  const maxEmails = Math.max(...emailPerformance.map((d) => d.sent))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Platform-wide analytics and performance metrics</p>
        <div className="flex items-center space-x-2">
          <Button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 text-purple-300 hover:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-[#1a1a2e] border-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <p className="text-green-400 text-sm mt-1">{metric.change}</p>
                </div>
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <metric.icon className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily New Users */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Daily New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="flex items-end justify-between h-full space-x-2">
                {newUsersData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.users / maxUsers) * 140}px`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.users} users
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs mt-2 transform -rotate-45 origin-center">{data.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page Creation Trends */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Page Creation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="flex items-end justify-between h-full space-x-4">
                {pageCreationData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.pages / maxPages) * 140}px`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.pages} pages
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs mt-2">{data.week}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Referral Sources */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Top Referral Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{source.source}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">{source.count}</span>
                    <span className="text-gray-400 text-sm">{source.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0
                        ? "bg-blue-600"
                        : index === 1
                          ? "bg-purple-600"
                          : index === 2
                            ? "bg-green-600"
                            : index === 3
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                    }`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Performance */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Email Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="flex items-end justify-between h-full space-x-2">
              {emailPerformance.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end h-48 space-y-1">
                    {/* Opened emails bar */}
                    <div
                      className="w-full bg-green-600/60 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.opened / maxEmails) * 60}px`,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.opened} opened
                      </div>
                    </div>
                    {/* Delivered emails bar */}
                    <div
                      className="w-full bg-blue-600/60 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.delivered / maxEmails) * 60}px`,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.delivered} delivered
                      </div>
                    </div>
                    {/* Sent emails bar */}
                    <div
                      className="w-full bg-purple-600 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.sent / maxEmails) * 120}px`,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.sent} sent
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
                <span className="text-gray-400 text-sm">Sent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600/60 rounded"></div>
                <span className="text-gray-400 text-sm">Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600/60 rounded"></div>
                <span className="text-gray-400 text-sm">Opened</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
