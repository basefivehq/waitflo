import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye, Trash2, ExternalLink } from "lucide-react"

export function WaitlistPages() {
  const pages = [
    {
      name: "SaaS Product Launch",
      url: "saas-launch.waitly.co",
      signups: 1247,
      referrals: 523,
      status: "Active",
      views: 12847,
      conversion: 9.7,
    },
    {
      name: "Mobile App Beta",
      url: "mobile-beta.waitly.co",
      signups: 892,
      referrals: 341,
      status: "Active",
      views: 8923,
      conversion: 10.0,
    },
    {
      name: "E-commerce Store",
      url: "store-launch.waitly.co",
      signups: 456,
      referrals: 189,
      status: "Draft",
      views: 5634,
      conversion: 8.1,
    },
    {
      name: "Newsletter Signup",
      url: "newsletter.waitly.co",
      signups: 234,
      referrals: 67,
      status: "Paused",
      views: 3421,
      conversion: 6.8,
    },
  ]

  // Performance comparison chart
  const maxSignups = Math.max(...pages.map((p) => p.signups))
  const maxViews = Math.max(...pages.map((p) => p.views))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage your waitlist landing pages</p>
        <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20">
          <Plus className="h-4 w-4 mr-2" />
          Create New Page
        </Button>
      </div>

      {/* Performance Overview Chart */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Page Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="flex items-end justify-between h-full space-x-4 relative">
              {pages.map((page, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end h-48 space-y-1">
                    {/* Views bar (background) */}
                    <div
                      className="w-full bg-gray-600/30 rounded-t-sm min-h-[4px] relative"
                      style={{
                        height: `${(page.views / maxViews) * 180}px`,
                      }}
                    ></div>
                    {/* Signups bar (foreground) */}
                    <div
                      className="w-full bg-purple-600 rounded-t-sm min-h-[4px] relative group -mt-1"
                      style={{
                        height: `${(page.signups / maxViews) * 180}px`,
                      }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div>{page.signups} signups</div>
                        <div>{page.views} views</div>
                        <div>{page.conversion}% conversion</div>
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2 text-center max-w-20 truncate">{page.name}</span>
                </div>
              ))}
              {/* Trendline overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="performanceTrendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Signups performance trendline */}
                  <line
                    x1="12.5"
                    y1={100 - (pages[0].signups / maxViews) * 80}
                    x2="87.5"
                    y2={100 - (pages[pages.length - 1].signups / maxViews) * 80}
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                    opacity="0.8"
                  />
                  {/* Add trend direction indicator */}
                  <polygon
                    points={`85,${100 - ((pages[pages.length - 1].signups / maxViews) * 80) - 3} 90,${100 - (pages[pages.length - 1].signups / maxViews) * 80} 85,${100 - ((pages[pages.length - 1].signups / maxViews) * 80) + 3}`}
                    fill="#8b5cf6"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span className="text-gray-400 text-sm">Signups</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600/30 rounded"></div>
                <span className="text-gray-400 text-sm">Views</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate Comparison */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Conversion Rate Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pages.map((page, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{page.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{page.conversion}%</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.status === "Active"
                          ? "bg-green-900/50 text-green-400"
                          : page.status === "Draft"
                            ? "bg-yellow-900/50 text-yellow-400"
                            : "bg-gray-900/50 text-gray-400"
                      }`}
                    >
                      {page.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      page.conversion >= 9 ? "bg-green-600" : page.conversion >= 7 ? "bg-yellow-600" : "bg-red-600"
                    }`}
                    style={{ width: `${(page.conversion / 12) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Page Name</th>
                  <th className="text-left p-4 text-gray-400 font-medium">URL</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Views</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Signups</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Conversion</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Referrals</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4">
                      <p className="text-white font-medium">{page.name}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300">{page.url}</p>
                        <ExternalLink className="h-4 w-4 text-gray-500" />
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
                      <p className="text-white">{page.referrals.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          page.status === "Active"
                            ? "bg-green-900/50 text-green-400"
                            : page.status === "Draft"
                              ? "bg-yellow-900/50 text-yellow-400"
                              : "bg-gray-900/50 text-gray-400"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 backdrop-blur-sm"
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
