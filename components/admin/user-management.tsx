"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Shield, Trash2, Download } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@example.com",
      signupDate: "2024-01-15",
      role: "user",
      pagesCount: 3,
      signupsCollected: 1247,
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@example.com",
      signupDate: "2024-01-12",
      role: "user",
      pagesCount: 2,
      signupsCollected: 892,
      status: "active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      signupDate: "2024-01-08",
      role: "admin",
      pagesCount: 5,
      signupsCollected: 2156,
      status: "active",
      lastLogin: "30 minutes ago",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      signupDate: "2024-01-14",
      role: "user",
      pagesCount: 1,
      signupsCollected: 456,
      status: "inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa@example.com",
      signupDate: "2024-01-11",
      role: "user",
      pagesCount: 4,
      signupsCollected: 1834,
      status: "active",
      lastLogin: "3 hours ago",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePromoteToAdmin = (userId: number) => {
    console.log(`Promoting user ${userId} to admin`)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.log(`Deleting user ${userId}`)
    }
  }

  const handleViewUser = (userId: number) => {
    console.log(`Viewing user ${userId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">Manage platform users and their permissions</p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          <Download className="h-4 w-4 mr-2" />
          Export Users
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{users.filter((u) => u.status === "active").length}</p>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{users.filter((u) => u.role === "admin").length}</p>
              <p className="text-gray-400 text-sm">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{users.reduce((sum, u) => sum + u.pagesCount, 0)}</p>
              <p className="text-gray-400 text-sm">Total Pages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a2e] border-purple-800/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0f0f1a] border-purple-700/30 text-white"
              />
            </div>
            <Button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 text-purple-300 hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-800/30">
                  <th className="text-left p-4 text-gray-400 font-medium">User</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Signup Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Role</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Pages</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Signups</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Last Login</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-purple-800/20 hover:bg-purple-900/10">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{user.name[0]}</span>
                        </div>
                        <p className="text-white font-medium">{user.name}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{user.signupDate}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin" ? "bg-purple-900/50 text-purple-400" : "bg-blue-900/50 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{user.pagesCount}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{user.signupsCollected.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active" ? "bg-green-900/50 text-green-400" : "bg-gray-900/50 text-gray-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300 text-sm">{user.lastLogin}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user.id)}
                          className="text-gray-400 hover:text-white hover:bg-purple-600/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.role !== "admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePromoteToAdmin(user.id)}
                            className="text-gray-400 hover:text-purple-400 hover:bg-purple-600/20"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
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
