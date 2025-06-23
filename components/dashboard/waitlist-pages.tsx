'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Copy, Settings, Globe, Calendar, Users, TrendingUp, Share2, ExternalLink } from "lucide-react"
import { createSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react"
import Link from "next/link"

interface WaitlistPagesProps {}

interface Page {
  id: number
  title: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
  config: any
}

export function WaitlistPages({}: WaitlistPagesProps) {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    const supabase = createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: pagesData } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setPages(pagesData || [])
    }
    setLoading(false)
  }

  const handlePublishToggle = async (pageId: number, currentStatus: boolean) => {
    const supabase = createSupabaseClient()
    
    const { error } = await supabase
      .from('pages')
      .update({ published: !currentStatus })
      .eq('id', pageId)

    if (!error) {
      setPages(pages.map(page => 
        page.id === pageId ? { ...page, published: !currentStatus } : page
      ))
    }
  }

  const handleUpdatePage = async () => {
    if (!selectedPage) return

    const supabase = createSupabaseClient()
    
    const { error } = await supabase
      .from('pages')
      .update({
        title: editForm.title,
        slug: editForm.slug,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedPage.id)

    if (!error) {
      setPages(pages.map(page => 
        page.id === selectedPage.id 
          ? { ...page, title: editForm.title, slug: editForm.slug }
          : page
      ))
      setIsEditDialogOpen(false)
      setSelectedPage(null)
    }
  }

  const handleDeletePage = async (pageId: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    const supabase = createSupabaseClient()
    
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', pageId)

    if (!error) {
      setPages(pages.filter(page => page.id !== pageId))
    }
  }

  const copyPageLink = (slug: string) => {
    const link = `${window.location.origin}/p/${slug}`
    navigator.clipboard.writeText(link)
    // You could add a toast notification here
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "published" && page.published) ||
                         (filterStatus === "draft" && !page.published)
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: pages.length,
    published: pages.filter(p => p.published).length,
    draft: pages.filter(p => !p.published).length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1a1a2e] border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Pages</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-400/20">
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Published</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.published}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-400/20">
                <Share2 className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Drafts</p>
                <p className="text-2xl font-bold mt-1 text-white">{stats.draft}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-400/20">
                <Edit className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-[#1a1a2e] border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pages</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/dashboard?tab=waitlist-builder">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Page
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <div className="space-y-4">
        {filteredPages.length === 0 ? (
          <Card className="bg-[#1a1a2e] border-gray-800">
            <CardContent className="p-12 text-center">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No pages found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first waitlist page"
                }
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Link href="/dashboard?tab=waitlist-pages">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Page
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPages.map((page) => (
            <Card key={page.id} className="bg-[#1a1a2e] border-gray-800 hover:bg-gray-800/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{page.title}</h3>
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        /p/{page.slug}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(page.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {page.published && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPageLink(page.slug)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                    {page.published && (
                      <Link href={`/p/${page.slug}`} target="_blank">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPage(page)
                        setEditForm({ title: page.title, slug: page.slug })
                        setIsEditDialogOpen(true)
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePublishToggle(page.id, page.published)}
                      className={page.published ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-white"}
                    >
                      {page.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Page</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update your page details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Page Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-gray-300">Page Slug</Label>
              <Input
                id="slug"
                value={editForm.slug}
                onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="my-awesome-page"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePage}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
