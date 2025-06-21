import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users, Share2, MousePointer } from "lucide-react"

export function Analytics() {
  const metrics = [
    { title: "Click-through Rate", value: "3.2%", change: "+0.5%", icon: MousePointer },
    { title: "Shares", value: "1,847", change: "+12%", icon: Share2 },
    { title: "Referral Success Rate", value: "68%", change: "+3%", icon: TrendingUp },
    { title: "Active Users", value: "2,847", change: "+8%", icon: Users },
  ]

  // Signup growth data
  const signupGrowth = [
    { date: "Jan 1", signups: 120 },
    { date: "Jan 5", signups: 180 },
    { date: "Jan 10", signups: 240 },
    { date: "Jan 15", signups: 320 },
    { date: "Jan 20", signups: 280 },
    { date: "Jan 25", signups: 380 },
    { date: "Jan 30", signups: 450 },
  ]

  const maxSignupGrowth = Math.max(...signupGrowth.map((d) => d.signups))

  // Traffic sources data
  const trafficSources = [
    { source: "Direct", percentage: 45, color: "bg-purple-600" },
    { source: "Referral", percentage: 35, color: "bg-blue-600" },
    { source: "Social Media", percentage: 15, color: "bg-green-600" },
    { source: "Email", percentage: 5, color: "bg-yellow-600" },
  ]

  // Conversion funnel data
  const conversionFunnel = [
    { stage: "Page Views", count: 12847, percentage: 100 },
    { stage: "Email Entered", count: 3847, percentage: 30 },
    { stage: "Email Confirmed", count: 2847, percentage: 74 },
    { stage: "Referral Shared", count: 1203, percentage: 42 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Track your waitlist performance</p>
        <div className="flex items-center space-x-2">
          <Button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-[#1a1a2e] border-gray-800">
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
        {/* Enhanced Line Chart */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Signup Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="relative h-full">
                {/* Chart background grid */}
                <div className="absolute inset-0">
                  {/* Horizontal grid lines */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-gray-800/30"
                      style={{ top: `${(i * 100) / 5}%` }}
                    ></div>
                  ))}
                  {/* Vertical grid lines */}
                  {signupGrowth.map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-full border-l border-gray-800/30"
                      style={{ left: `${(i * 100) / (signupGrowth.length - 1)}%` }}
                    ></div>
                  ))}
                </div>

                {/* SVG Line Chart */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="signupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area under the line */}
                  <polygon
                    fill="url(#signupGradient)"
                    points={`0,200 ${signupGrowth
                      .map(
                        (data, index) =>
                          `${(index * 400) / (signupGrowth.length - 1)},${200 - (data.signups / maxSignupGrowth) * 160}`,
                      )
                      .join(" ")} 400,200`}
                  />

                  {/* Main line */}
                  <polyline
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={signupGrowth
                      .map(
                        (data, index) =>
                          `${(index * 400) / (signupGrowth.length - 1)},${200 - (data.signups / maxSignupGrowth) * 160}`,
                      )
                      .join(" ")}
                  />

                  {/* Data points */}
                  {signupGrowth.map((data, index) => (
                    <g key={index}>
                      <circle
                        cx={(index * 400) / (signupGrowth.length - 1)}
                        cy={200 - (data.signups / maxSignupGrowth) * 160}
                        r="5"
                        fill="#1a1a2e"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        className="hover:r-7 transition-all cursor-pointer"
                      />
                      <circle
                        cx={(index * 400) / (signupGrowth.length - 1)}
                        cy={200 - (data.signups / maxSignupGrowth) * 160}
                        r="12"
                        fill="transparent"
                        className="hover:fill-purple-600/10 cursor-pointer"
                      >
                        <title>{`${data.date}: ${data.signups} signups`}</title>
                      </circle>
                    </g>
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs -ml-8">
                  {[
                    maxSignupGrowth,
                    Math.floor(maxSignupGrowth * 0.75),
                    Math.floor(maxSignupGrowth * 0.5),
                    Math.floor(maxSignupGrowth * 0.25),
                    0,
                  ].map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-xs -mb-6">
                  {signupGrowth.map((data, index) => (
                    <span key={index} className="transform -rotate-45 origin-center">
                      {data.date}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Pie chart representation */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#374151" strokeWidth="2" />
                    {/* Direct - 45% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#7c3aed"
                      strokeWidth="2"
                      strokeDasharray="45 55"
                      strokeDashoffset="0"
                    />
                    {/* Referral - 35% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="35 65"
                      strokeDashoffset="-45"
                    />
                    {/* Social - 15% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeDasharray="15 85"
                      strokeDashoffset="-80"
                    />
                    {/* Email - 5% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#ca8a04"
                      strokeWidth="2"
                      strokeDasharray="5 95"
                      strokeDashoffset="-95"
                    />
                  </svg>
                </div>
              </div>

              {/* Legend */}
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${source.color}`}></div>
                    <span className="text-gray-300 text-sm">{source.source}</span>
                  </div>
                  <span className="text-white font-semibold">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">{stage.count.toLocaleString()}</span>
                    {index > 0 && <span className="text-gray-400 text-sm">({stage.percentage}%)</span>}
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      index === 0
                        ? "bg-purple-600"
                        : index === 1
                          ? "bg-purple-500"
                          : index === 2
                            ? "bg-purple-400"
                            : "bg-purple-300"
                    }`}
                    style={{ width: `${(stage.count / conversionFunnel[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics Table */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Page</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Views</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Signups</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Conversion</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Referrals</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="p-4 text-white">SaaS Product Launch</td>
                  <td className="p-4 text-gray-300">12,847</td>
                  <td className="p-4 text-gray-300">1,247</td>
                  <td className="p-4 text-green-400">9.7%</td>
                  <td className="p-4 text-gray-300">523</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="p-4 text-white">Mobile App Beta</td>
                  <td className="p-4 text-gray-300">8,923</td>
                  <td className="p-4 text-gray-300">892</td>
                  <td className="p-4 text-green-400">10.0%</td>
                  <td className="p-4 text-gray-300">341</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="p-4 text-white">E-commerce Store</td>
                  <td className="p-4 text-gray-300">5,634</td>
                  <td className="p-4 text-gray-300">456</td>
                  <td className="p-4 text-yellow-400">8.1%</td>
                  <td className="p-4 text-gray-300">189</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
