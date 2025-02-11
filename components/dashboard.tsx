"use client"

import { useState } from "react"
import { Bell, ChevronDown, LogOut, MessageCircle, Users, Wallet, Award, Zap, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function Dashboard() {
  const { logout } = useAuth()
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [isProfileBarVisible, setIsProfileBarVisible] = useState(true)
  const [isProfileBarPinned, setIsProfileBarPinned] = useState(false)

  const toggleProfileBar = () => {
    if (!isProfileBarPinned) {
      setIsProfileBarVisible(!isProfileBarVisible)
    }
  }

  const toggleProfileBarPin = () => {
    setIsProfileBarPinned(!isProfileBarPinned)
    setIsProfileBarVisible(true)
  }

  const njangiGroups = [
    { name: "Monthly Savings", members: 30, daysLeft: 15, progress: 33 },
    { name: "Business Investment", members: 20, daysLeft: 45, progress: 66 },
    { name: "Emergency Fund", members: 10, daysLeft: 30, progress: 50 },
    { name: "Holiday Savings", members: 15, daysLeft: 60, progress: 25 },
  ]

  const upcomingEvents = [
    { name: "Community Meeting", time: "Tomorrow, 2 PM", type: "In Person" },
    { name: "Njangi Contribution", time: "In 3 days", type: "Online" },
    { name: "Town Hall", time: "Next week", type: "In Person" },
  ]

  const communities = [
    { name: "Hometown Association", members: 150, id: "hometown-association" },
    { name: "Professional Network", members: 89, id: "professional-network" },
    { name: "Local Charity Group", members: 45, id: "local-charity-group" },
  ]

  return (
    <div className="p-4">
      {/* Top Section */}
      <Card className="mb-6 bg-white/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-secondary">
                <AvatarImage alt="Cedric" src="/placeholder.svg" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-deepBlue">Welcome, Cedric</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-deepBlue">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-deepBlue" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-deepBlue">Total Contributions</p>
                  <p className="text-2xl font-bold text-deepBlue">$1,250</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Wallet className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-deepBlue">Njangi Balance</p>
                  <p className="text-2xl font-bold text-deepBlue">$750</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Award className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-deepBlue">Pending Dues</p>
                  <p className="text-2xl font-bold text-red-500">$100</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4">
        {/* Quick Actions */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-deepBlue">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Wallet className="mr-2 h-4 w-4" /> Pay Dues
            </Button>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <MessageCircle className="mr-2 h-4 w-4" /> Start Discussion
            </Button>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <Zap className="mr-2 h-4 w-4" /> Request Support
            </Button>
          </CardContent>
        </Card>

        {/* My Network */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-deepBlue">My Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4"># Groups / # Members</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-deepBlue">Communities</span>
                <span className="text-sm text-secondary">3/284</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-deepBlue">Njangi Groups</span>
                <span className="text-sm text-secondary">4/75</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Communities */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-deepBlue">My Communities</CardTitle>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communities.map((community) => (
                <div key={community.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-deepBlue">{community.name}</p>
                    <p className="text-sm text-muted-foreground">{community.members} members</p>
                  </div>
                  <Link href={`/communities/${community.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Njangi Groups */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-deepBlue">Njangi Groups</CardTitle>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {njangiGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-deepBlue">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{group.daysLeft} days left</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                  <p className="text-sm text-right text-muted-foreground">{group.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-deepBlue">Upcoming Events</CardTitle>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.name} className="space-y-2">
                  <div>
                    <p className="font-medium text-deepBlue">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                    <p className="text-sm text-muted-foreground">{event.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-primary/20 hover:bg-primary/10">
                      Remind
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-primary/20 hover:bg-primary/10">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-deepBlue">My Recognition</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">12 Total</span>
              <Award className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3 text-deepBlue">Recent Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-primary/10 rounded-lg p-2">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-deepBlue">Top Donor</p>
                      <p className="text-xs text-muted-foreground">Hometown Association</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/10 rounded-lg p-2">
                    <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-deepBlue">Community Star</p>
                      <p className="text-xs text-muted-foreground">Professional Network</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-deepBlue">Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deepBlue">Leadership Badge</span>
                      <span className="text-primary">4/5 Tasks</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deepBlue">Mentor Status</span>
                      <span className="text-primary">2/3 Mentees</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All Badges
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

