import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Search, Filter } from "lucide-react"

export function SignupsViewer() {
  const signups = [
    {
      email: "sarah@example.com",
      source: "Direct",
      date: "2024-01-15",
      referrer: "-",
      status: "Confirmed",
    },
    {
      email: "mike@example.com",
      source: "Referral",
      date: "2024-01-15",
      referrer: "sarah@example.com",
      status: "Confirmed",
    },
    {
      email: "emma@example.com",
      source: "Direct",
      date: "2024-01-14",
      referrer: "-",
      status: "Pending",
    },
    {
      email: "david@example.com",
      source: "Referral",
      date: "2024-01-14",
      referrer: "mike@example.com",
      status: "Confirmed",
    },
    {
      email: "lisa@example.com",
      source: "Direct",
      date: "2024-01-13",
      referrer: "-",
      status: "Confirmed",
    },
  ]

  // Chart data for signup trends
  const signupTrends = [
    { date: "Jan 10", signups: 23 },
    { date: "Jan 11", signups: 34 },
    { date: "Jan 12", signups: 28 },
    { date: "Jan 13", signups: 45 },
    { date: "Jan 14", signups: 52 },
    { date: "Jan 15", signups: 67 },
    { date: "Jan 16", signups: 43 },
  ]

  const maxSignups = Math.max(...signupTrends.map((d) => d.signups))

  // Source distribution data
  const sourceData = [
    { source: "Direct", count: 1847, percentage: 65 },
    { source: "Referral", count: 892, percentage: 31 },
    { source: "Social", count: 108, percentage: 4 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">View and manage all waitlist signups</p>
        <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signup Trends Chart */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Daily Signup Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="flex items-end justify-between h-full space-x-2">
                {signupTrends.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm min-h-[4px] relative group"
                      style={{
                        height: `${(data.signups / maxSignups) * 140}px`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.signups} signups
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs mt-2 transform -rotate-45 origin-center">{data.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Distribution Chart */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Signup Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{source.source}</span>
                    <span className="text-white font-semibold">{source.count}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? "bg-purple-600" : index === 1 ? "bg-purple-500" : "bg-purple-400"
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-xs">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate Trends */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Conversion Rate Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="relative h-full">
                {/* Background grid */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-gray-800/20"
                      style={{ top: `${i * 25}%` }}
                    ></div>
                  ))}
                </div>

                {/* Conversion rate data */}
                {(() => {
                  const conversionData = [
                    { date: "Jan 10", rate: 2.1 },
                    { date: "Jan 11", rate: 2.8 },
                    { date: "Jan 12", rate: 2.3 },
                    { date: "Jan 13", rate: 3.2 },
                    { date: "Jan 14", rate: 3.8 },
                    { date: "Jan 15", rate: 4.1 },
                    { date: "Jan 16", rate: 3.6 },
                  ]
                  const maxRate = Math.max(...conversionData.map((d) => d.rate))

                  return (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
                      {/* Gradient area */}
                      <defs>
                        <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#06d6a0" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#06d6a0" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <polygon
                        fill="url(#conversionGradient)"
                        points={`0,150 ${conversionData
                          .map(
                            (data, index) =>
                              `${(index * 400) / (conversionData.length - 1)},${150 - (data.rate / maxRate) * 120}`,
                          )
                          .join(" ")} 400,150`}
                      />

                      {/* Line */}
                      <polyline
                        fill="none"
                        stroke="#06d6a0"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={conversionData
                          .map(
                            (data, index) =>
                              `${(index * 400) / (conversionData.length - 1)},${150 - (data.rate / maxRate) * 120}`,
                          )
                          .join(" ")}
                      />

                      {/* Data points */}
                      {conversionData.map((data, index) => (
                        <circle
                          key={index}
                          cx={(index * 400) / (conversionData.length - 1)}
                          cy={150 - (data.rate / maxRate) * 120}
                          r="4"
                          fill="#06d6a0"
                          stroke="#1a1a2e"
                          strokeWidth="2"
                          className="hover:r-6 transition-all cursor-pointer"
                        >
                          <title>{`${data.date}: ${data.rate}% conversion`}</title>
                        </circle>
                      ))}
                    </svg>
                  )
                })()}

                {/* Labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-xs -mb-6">
                  {["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"].map((date, index) => (
                    <span key={index}>{date}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by email..." className="pl-10 bg-gray-900 border-gray-700 text-white" />
            </div>
            <Button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Source</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Referrer</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4">
                      <p className="text-white">{signup.email}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signup.source === "Direct"
                            ? "bg-blue-900/50 text-blue-400"
                            : "bg-purple-900/50 text-purple-400"
                        }`}
                      >
                        {signup.source}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{signup.date}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{signup.referrer}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signup.status === "Confirmed"
                            ? "bg-green-900/50 text-green-400"
                            : "bg-yellow-900/50 text-yellow-400"
                        }`}
                      >
                        {signup.status}
                      </span>
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
