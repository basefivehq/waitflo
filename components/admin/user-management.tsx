"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Shield, Trash2, Download, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  signupDate: string
  role: string
  pagesCount: number
  signupsCollected: number
  status: string
  lastLogin: string
}

interface UserStats {
  total: number
  active: number
  admins: number
  totalPages: number
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats>({ total: 0, active: 0, admins: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data.users)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      setActionLoading(userId)
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: 'admin' })
      })

      if (!response.ok) {
        throw new Error('Failed to promote user')
      }

      toast({
        title: "Success",
        description: "User promoted to admin successfully"
      })

      // Refresh users list
      await fetchUsers()
    } catch (error) {
      console.error('Error promoting user:', error)
      toast({
        title: "Error",
        description: "Failed to promote user",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This will also delete all their pages and data.")) {
      return
    }

    try {
      setActionLoading(userId)
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      toast({
        title: "Success",
        description: "User deleted successfully"
      })

      // Refresh users list
      await fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleViewUser = (userId: string) => {
    console.log(`Viewing user ${userId}`)
    // You could navigate to a user detail page here
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </div>
    )
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
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{stats.admins}</p>
              <p className="text-gray-400 text-sm">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-purple-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{stats.totalPages}</p>
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
                      <p className="text-gray-300">{new Date(user.signupDate).toLocaleDateString()}</p>
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
                          disabled={actionLoading === user.id}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.role !== 'admin' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePromoteToAdmin(user.id)}
                            className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                            disabled={actionLoading === user.id}
                          >
                            {actionLoading === user.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Shield className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          disabled={actionLoading === user.id}
                        >
                          {actionLoading === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
