"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trophy, Medal, Award, Copy, Plus, ExternalLink, ToggleLeft, ToggleRight, QrCode } from "lucide-react"
import { useState } from "react"

export function ReferralsPage() {
  const [newLinkName, setNewLinkName] = useState("")
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const referrals = [
    {
      rank: 1,
      user: "Sarah Chen",
      email: "sarah@example.com",
      referralCount: 23,
      dateJoined: "2024-01-10",
    },
    {
      rank: 2,
      user: "Mike Johnson",
      email: "mike@example.com",
      referralCount: 18,
      dateJoined: "2024-01-12",
    },
    {
      rank: 3,
      user: "Emma Wilson",
      email: "emma@example.com",
      referralCount: 15,
      dateJoined: "2024-01-08",
    },
    {
      rank: 4,
      user: "David Brown",
      email: "david@example.com",
      referralCount: 12,
      dateJoined: "2024-01-14",
    },
    {
      rank: 5,
      user: "Lisa Garcia",
      email: "lisa@example.com",
      referralCount: 9,
      dateJoined: "2024-01-11",
    },
  ]

  // Existing referral links
  const [referralLinks, setReferralLinks] = useState([
    {
      id: 1,
      name: "Social Media Campaign",
      code: "SOCIAL2024",
      url: "https://waitly.com/ref/SOCIAL2024",
      clicks: 156,
      signups: 23,
      conversionRate: 14.7,
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Email Newsletter",
      code: "EMAIL-JAN",
      url: "https://waitly.com/ref/EMAIL-JAN",
      clicks: 89,
      signups: 12,
      conversionRate: 13.5,
      isActive: true,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Partner Collaboration",
      code: "PARTNER-X",
      url: "https://waitly.com/ref/PARTNER-X",
      clicks: 234,
      signups: 45,
      conversionRate: 19.2,
      isActive: false,
      createdAt: "2024-01-05",
    },
  ])

  // Referral performance data
  const referralTrends = [
    { week: "Week 1", referrals: 45, successful: 32 },
    { week: "Week 2", referrals: 67, successful: 48 },
    { week: "Week 3", referrals: 52, successful: 38 },
    { week: "Week 4", referrals: 89, successful: 67 },
  ]

  const maxReferrals = Math.max(...referralTrends.map((d) => d.referrals))

  // Top referrer distribution
  const topReferrers = referrals.slice(0, 5)
  const maxReferralCount = Math.max(...topReferrers.map((r) => r.referralCount))

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-400" />
      default:
        return <span className="text-gray-400 font-bold">#{rank}</span>
    }
  }

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleCreateLink = () => {
    if (!newLinkName.trim()) return

    const newCode = generateReferralCode()
    const newLink = {
      id: referralLinks.length + 1,
      name: newLinkName,
      code: newCode,
      url: `https://waitly.com/ref/${newCode}`,
      clicks: 0,
      signups: 0,
      conversionRate: 0,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setReferralLinks([newLink, ...referralLinks])
    setNewLinkName("")
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedLink(url)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const toggleLinkStatus = (id: number) => {
    setReferralLinks(referralLinks.map((link) => (link.id === id ? { ...link, isActive: !link.isActive } : link)))
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-400">Manage referral links and track performance</p>

      {/* Referral Link Generator */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Referral Link</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Enter campaign name (e.g., Social Media, Email Newsletter)"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button
              onClick={handleCreateLink}
              disabled={!newLinkName.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Generate Link
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            A unique referral code will be automatically generated for your campaign
          </p>
        </CardContent>
      </Card>

      {/* Existing Referral Links */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Referral Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralLinks.map((link) => (
              <div key={link.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-white font-medium">{link.name}</h3>
                    <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs font-mono">
                      {link.code}
                    </span>
                    <button
                      onClick={() => toggleLinkStatus(link.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white"
                    >
                      {link.isActive ? (
                        <ToggleRight className="h-4 w-4 text-green-400" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-xs">{link.isActive ? "Active" : "Inactive"}</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(link.url)}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedLink === link.url ? (
                        <span className="text-green-400 text-xs">Copied!</span>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="ml-1 text-xs">Copy</span>
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-300 font-mono text-sm bg-gray-800 px-3 py-1 rounded">{link.url}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-xs">Clicks</p>
                    <p className="text-white font-bold text-lg">{link.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Signups</p>
                    <p className="text-white font-bold text-lg">{link.signups}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Conversion</p>
                    <p
                      className={`font-bold text-lg ${
                        link.conversionRate > 15
                          ? "text-green-400"
                          : link.conversionRate > 10
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {link.conversionRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Created</p>
                    <p className="text-gray-300 text-sm">{link.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Trends Chart */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Referral Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="flex items-end justify-between h-full space-x-4">
                {referralTrends.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="flex flex-col items-center justify-end h-40 space-y-1">
                      {/* Successful referrals bar */}
                      <div
                        className="w-full bg-green-600/60 rounded-t-sm min-h-[4px] relative group"
                        style={{
                          height: `${(data.successful / maxReferrals) * 150}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.successful} successful
                        </div>
                      </div>
                      {/* Total referrals bar */}
                      <div
                        className="w-full bg-purple-600 rounded-t-sm min-h-[4px] relative group"
                        style={{
                          height: `${(data.referrals / maxReferrals) * 150}px`,
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.referrals} total
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs mt-2">{data.week}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded"></div>
                  <span className="text-gray-400 text-sm">Total Referrals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600/60 rounded"></div>
                  <span className="text-gray-400 text-sm">Successful</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers Chart */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReferrers.map((referrer, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(referrer.rank)}
                      <span className="text-gray-300 text-sm">{referrer.user}</span>
                    </div>
                    <span className="text-white font-semibold">{referrer.referralCount}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-orange-400"
                              : "bg-purple-600"
                      }`}
                      style={{ width: `${(referrer.referralCount / maxReferralCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Referral Success Rate Trends */}
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Referral Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 p-4">
              <div className="relative h-full">
                {/* Grid background */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-gray-800/20"
                      style={{ top: `${i * 25}%` }}
                    ></div>
                  ))}
                </div>

                {/* Success rate data and chart */}
                {(() => {
                  const successData = [
                    { week: "W1", rate: 65 },
                    { week: "W2", rate: 72 },
                    { week: "W3", rate: 68 },
                    { week: "W4", rate: 78 },
                    { week: "W5", rate: 82 },
                    { week: "W6", rate: 75 },
                  ]
                  const maxRate = Math.max(...successData.map((d) => d.rate))

                  return (
                    <>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150">
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Area fill */}
                        <polygon
                          fill="url(#successGradient)"
                          points={`0,150 ${successData
                            .map(
                              (data, index) =>
                                `${(index * 400) / (successData.length - 1)},${150 - (data.rate / 100) * 120}`,
                            )
                            .join(" ")} 400,150`}
                        />

                        {/* Main line */}
                        <polyline
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="5,5"
                          points={successData
                            .map(
                              (data, index) =>
                                `${(index * 400) / (successData.length - 1)},${150 - (data.rate / 100) * 120}`,
                            )
                            .join(" ")}
                        />

                        {/* Data points */}
                        {successData.map((data, index) => (
                          <g key={index}>
                            <circle
                              cx={(index * 400) / (successData.length - 1)}
                              cy={150 - (data.rate / 100) * 120}
                              r="6"
                              fill="#1a1a2e"
                              stroke="#f59e0b"
                              strokeWidth="2"
                            />
                            <circle
                              cx={(index * 400) / (successData.length - 1)}
                              cy={150 - (data.rate / 100) * 120}
                              r="3"
                              fill="#f59e0b"
                              className="hover:r-5 transition-all cursor-pointer"
                            >
                              <title>{`${data.week}: ${data.rate}% success rate`}</title>
                            </circle>
                          </g>
                        ))}
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-400 text-xs -mb-6">
                        {successData.map((data, index) => (
                          <span key={index}>{data.week}</span>
                        ))}
                      </div>

                      {/* Y-axis percentage labels */}
                      <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs -mr-8">
                        {[100, 75, 50, 25, 0].map((value, index) => (
                          <span key={index}>{value}%</span>
                        ))}
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white">
              Filter by Date
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-left p-4 text-gray-400 font-medium">User</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Referrals</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4">
                      <div className="flex items-center">{getRankIcon(referral.rank)}</div>
                    </td>
                    <td className="p-4">
                      <p className="text-white font-medium">{referral.user}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{referral.email}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-lg">{referral.referralCount}</span>
                        <span className="text-gray-400 text-sm">referrals</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{referral.dateJoined}</p>
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
