import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Share2, TrendingUp, Plus, Clock, UserPlus, Settings, Globe, Mail, Star } from "lucide-react"

interface DashboardHomeProps {
  theme?: "dark" 
}

export function DashboardHome({ theme = "dark" }: DashboardHomeProps) {
  const metrics = [
    {
      title: "Total Signups",
      value: "2,847",
      change: "+12%",
      changeText: "from last month",
      icon: Users,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/20",
    },
    {
      title: "Total Referrals",
      value: "1,203",
      change: "+8%",
      changeText: "from last month",
      icon: Share2,
      iconColor: "text-green-400",
      iconBg: "bg-green-400/20",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      changeText: "from last month",
      icon: TrendingUp,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-400/20",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "signup",
      message: "New user Sarah Chen joined your waitlist",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      id: 2,
      type: "page_created",
      message: "New waitlist page 'TechFlow' was created",
      time: "15 minutes ago",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: 3,
      type: "referral",
      message: "Mike Johnson referred 3 new users",
      time: "1 hour ago",
      icon: Share2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      id: 4,
      type: "email_sent",
      message: "Welcome email sent to 25 new subscribers",
      time: "2 hours ago",
      icon: Mail,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      id: 5,
      type: "settings",
      message: "Page settings updated for 'CloudSync'",
      time: "3 hours ago",
      icon: Settings,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
    },
    {
      id: 6,
      type: "review",
      message: "New 5-star review received from Emma Wilson",
      time: "4 hours ago",
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      id: 7,
      type: "signup",
      message: "David Brown joined via referral link",
      time: "5 hours ago",
      icon: UserPlus,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      id: 8,
      type: "page_created",
      message: "Waitlist page 'PayFlow' went live",
      time: "6 hours ago",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`transition-colors duration-300 ${
              theme === "dark" ? "bg-[#1a1a2e] border-gray-800" : "bg-white border-gray-200 shadow-sm"
            } border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {metric.title}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
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
        className={`transition-colors duration-300 ${
          theme === "dark" ? "bg-[#1a1a2e] border-gray-800" : "bg-white border-gray-200 shadow-sm"
        } border`}
      >
        <CardHeader>
          <CardTitle className={`flex items-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            <Clock className="h-5 w-5 mr-2" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start space-x-4 p-3 rounded-lg transition-colors ${
                  theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {activity.message}
                  </p>
                  <p
                    className={`text-xs mt-1 flex items-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
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
              className={`transition-colors ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 hover:text-gray-900"
              }`}
            >
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card
        className={`transition-colors duration-300 ${
          theme === "dark" ? "bg-[#1a1a2e] border-gray-800" : "bg-white border-gray-200 shadow-sm"
        } border`}
      >
        <CardHeader>
          <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className={`w-full font-semibold transition-colors ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20"
                : "bg-purple-600 hover:bg-purple-700 text-white border border-purple-600"
            }`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Waitlist Page
          </Button>
          <Button
            className={`w-full transition-colors ${
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 hover:text-gray-900"
            }`}
          >
            View All Signups
          </Button>
          <Button
            className={`w-full transition-colors ${
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 hover:text-gray-900"
            }`}
          >
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
