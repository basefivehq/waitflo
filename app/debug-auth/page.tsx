'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DebugAuthPage() {
  const [authStatus, setAuthStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cookies, setCookies] = useState<string[]>([])

  useEffect(() => {
    // Get all cookies
    const allCookies = document.cookie.split(';').map(cookie => cookie.trim())
    setCookies(allCookies)

    // Check auth status
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user')
      const data = await response.json()
      setAuthStatus(data)
    } catch (error) {
      setAuthStatus({ error: error instanceof Error ? error.message : 'Unknown error' })
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })
      if (response.ok) {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Authentication Debug</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-auto">
                {JSON.stringify(authStatus, null, 2)}
              </pre>
            )}
            <Button onClick={checkAuthStatus} className="mt-4">
              Refresh Status
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cookies.map((cookie, index) => (
                <div key={index} className="bg-gray-800 text-green-400 p-2 rounded text-sm">
                  {cookie}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
} 