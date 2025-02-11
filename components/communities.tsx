"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import CreateCommunityForm from "@/components/create-community-form"

const communities = [
  {
    name: "Hometown Association",
    privacy: "private",
    lastActive: "2 hours ago",
    activeMembers: 120,
    dues: "$10 - Weekly",
    website: "Learn More",
    status: "request",
  },
  {
    name: "Professional Network",
    privacy: "public",
    lastActive: "1 day ago",
    activeMembers: 80,
    dues: "$15 - Monthly",
    website: "Learn More",
    status: "view",
  },
  {
    name: "Local Charity Group",
    privacy: "public",
    lastActive: "3 days ago",
    activeMembers: 40,
    dues: "$5 - Weekly",
    website: "Learn More",
    status: "request",
  },
  {
    name: "Sports Club",
    privacy: "private",
    lastActive: "1 week ago",
    activeMembers: 50,
    dues: "$20 - Monthly",
    website: "Learn More",
    status: "view",
  },
]

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false)

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateCommunity = async (data: any) => {
    // Here you would typically send the data to your backend
    console.log("Creating community with data:", data)
    // Close the dialog after submission
    setIsCreateCommunityOpen(false)
  }

  return (
    <div className="p-4">
      {/* Back Navigation */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="rounded-xl bg-primary p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Communities</h1>
        <p className="text-primary-foreground/80">Connect with 2,543 members across 127 vibrant communities</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Dialog open={isCreateCommunityOpen} onOpenChange={setIsCreateCommunityOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <CreateCommunityForm onClose={() => setIsCreateCommunityOpen(false)} onSubmit={handleCreateCommunity} />
          </DialogContent>
        </Dialog>
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <Card key={community.name} className="p-6 bg-white/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{community.name}</h2>
              <Badge variant={community.privacy === "public" ? "default" : "secondary"} className="capitalize">
                {community.privacy}
              </Badge>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Active</span>
                <span>{community.lastActive}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Active Members:</span>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {community.activeMembers}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dues:</span>
                <span>{community.dues}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Website:</span>
                <Link href="#" className="text-secondary hover:text-secondary/80 hover:underline">
                  {community.website}
                </Link>
              </div>
            </div>

            <Link href={`/communities/${community.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <Button
                className={
                  community.status === "request"
                    ? "w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "w-full bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {community.status === "request" ? "Request to Join" : "View Community"}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

