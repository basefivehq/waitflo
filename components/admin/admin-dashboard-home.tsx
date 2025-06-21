import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Mail, Activity, TrendingUp, UserPlus } from "lucide-react"

export function AdminDashboardHome() {
  const metrics = [
    { title: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-blue-400" },
    { title: "Waitlist Pages", value: "342", change: "+8%", icon: FileText, color: "text-purple-400" },
    { title: "Total Signups", value: "28,473", change: "+15%", icon: Mail, color: "text-green-400" },
    { title: "Active Campaigns", value: "89", change: "+3%", icon: Activity, color: "text-yellow-400" },
  ]

  // Platform usage data
  const usageData = [
    { day: "Mon", signups: 245, users: 12 },
    { day: "Tue", signups: 352, users: 18 },
    { day: "Wed", signups: 189, users: 8 },
    { day: "Thu", signups: 467, users: 25 },
    { day: "Fri", signups: 589, users: 34 },
    { day: "Sat", signups: 376, users: 21 },
    { day: "Sun", signups: 243, users: 15 },
  ]

  const maxSignups = Math.max(...usageData.map((d) => d.signups))
  const maxUsers = Math.max(...usageData.map((d) => d.users))

  // Recent activity
  const recentActivity = [
    { action: "New user registered", user: "sarah@example.com", time: "2 minutes ago", type: "user" },
    { action: "Waitlist page created", user: "mike@example.com", time: "5 minutes ago", type: "page" },
    { action: "100 signups milestone", user: "emma@example.com", time: "12 minutes ago", type: "milestone" },
    { action: "API key generated", user: "david@example.com", time: "18 minutes ago", type: "api" },
    { action: "User upgraded to Pro", user: "lisa@example.com", time: "25 minutes ago", type: "upgrade" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <UserPlus className="h-4 w-4 text-blue-400" />
      case "page":
        return <FileText className="h-4 w-4 text-purple-400" />
      case "milestone":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "api":
        return <Activity className="h-4 w-4 text-yellow-400" />
      case "upgrade":
        return <Users className="h-4 w-4 text-orange-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
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

      {/* Platform Usage Chart */}
      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Platform Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="flex items-end justify-between h-full space-x-2">
              {usageData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end h-48 space-y-1">
                    {/* New users bar */}
                    <div
                      className="w-full bg-blue-600/60 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.users / maxUsers) * 60}px`,
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.users} new users
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
                <span className="text-gray-400 text-sm">New Users</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 py-2 border-b border-purple-800/20 last:border-b-0"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.user}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average signups per page</span>
                <span className="text-white font-semibold">83.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Top referral conversion</span>
                <span className="text-green-400 font-semibold">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active API integrations</span>
                <span className="text-white font-semibold">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Email delivery rate</span>
                <span className="text-green-400 font-semibold">99.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average page load time</span>
                <span className="text-white font-semibold">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
