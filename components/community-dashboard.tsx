"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Users,
  Calendar,
  AlertCircle,
  ScrollText,
  BarChart3,
  Activity,
  Award,
  Wallet,
  Send,
  FileText,
  Download,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function CommunityDashboard() {
  const params = useParams()
  const communityName = params.id
    ? decodeURIComponent(params.id.toString().replace(/-/g, " "))
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Community"

  const executiveTeam = [
    { name: "John Doe", role: "President", avatar: "JD" },
    { name: "Jane Smith", role: "Vice President", avatar: "JS" },
    { name: "Alice Johnson", role: "Secretary", avatar: "AJ" },
    { name: "Bob Wilson", role: "Treasurer", avatar: "BW" },
  ]

  const communityRules = [
    "Regular attendance at monthly meetings is mandatory",
    "Dues must be paid by the 15th of each month",
    "Members must participate in at least 2 community events per quarter",
    "Emergency fund contributions are required monthly",
  ]

  const recentActivity = [
    {
      type: "payment",
      user: "John Doe",
      action: "Monthly dues payment completed",
      date: "2024-03-01",
    },
    {
      type: "announcement",
      user: "Admin",
      action: "New announcement posted",
      date: "2024-02-28",
    },
  ]

  const announcements = [
    {
      type: "emergency",
      title: "Emergency Fund Goal Update",
      content: "We've reached 50% of our emergency fund goal. Keep up the great work!",
      date: "2024-03-01",
    },
    {
      type: "info",
      title: "New Member Welcome",
      content: "Please welcome Jane Smith to our community!",
      date: "2024-03-02",
    },
  ]

  const finances = {
    totalContributions: 1250,
    pendingDues: 150,
    recentTransactions: [
      {
        type: "Monthly Dues",
        amount: -50,
        date: "2/29/2024",
      },
      {
        type: "Emergency Fund",
        amount: 200,
        date: "2/14/2024",
      },
    ],
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/communities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </div>
        <Link href={`/communities/${params.id}/settings`}>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Manage Community</Button>
        </Link>
      </div>

      {/* Community Header */}
      <div className="bg-primary/20 text-deepBlue rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{communityName}</h1>
        <p className="text-deepBlue/80">A community dedicated to supporting our hometown development initiatives.</p>
      </div>

      {/* New Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Announcements Card */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-deepBlue">Announcements</CardTitle>
            <Send className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span
                      className={`h-2 w-2 mt-2 rounded-full ${
                        announcement.type === "emergency" ? "bg-red-500" : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <h3 className="font-medium text-deepBlue">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Finance Card */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-bold text-deepBlue">My Finance</CardTitle>
              <p className="text-sm text-muted-foreground">Your financial summary</p>
            </div>
            <Wallet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold text-green-600">${finances.totalContributions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Dues</p>
                <p className="text-2xl font-bold text-red-500">${finances.pendingDues}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-deepBlue">Recent Transactions</h3>
              {finances.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <span className={transaction.amount < 0 ? "text-red-500" : "text-green-600"}>
                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Executive Bureau */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Executive Bureau</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executiveTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Health */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Financial Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Treasury</p>
                <p className="text-2xl font-bold text-primary">$25,450</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Dues</span>
                  <span>$10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Collection Rate</span>
                  <span>85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Members</span>
                  <span>120/150</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Due Date</span>
                  <span>3/14/2024</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events & Meetings */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Events & Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Monthly General Meeting</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  2024-03-15 at 14:00
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Community Center
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Community Fundraiser</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  2024-03-20 at 15:00
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Town Hall
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Monthly Dues</p>
                  <p className="text-sm text-muted-foreground">Due by 3/14/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$50</p>
                  <Button size="sm" className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Pay Now
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Emergency Fund</p>
                  <p className="font-medium">Emergency Fund</p>
                  <p className="text-sm text-muted-foreground">Due by 3/19/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$100</p>
                  <Button size="sm" className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Report */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Attendance Report</CardTitle>
            <ScrollText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Meetings Attended</p>
                    <p className="text-2xl font-bold">17/20</p>
                  </div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Recent Meetings</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Monthly Meeting</p>
                      <p className="text-xs text-muted-foreground">2/28/2024</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10">
                      present
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Emergency Meeting</p>
                      <p className="text-xs text-muted-foreground">2/15/2024</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary/10">
                      excused
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Monthly Meeting</p>
                      <p className="text-xs text-muted-foreground">1/31/2024</p>
                    </div>
                    <Badge variant="outline" className="bg-destructive/10">
                      absent
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Recognition</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium text-sm">Member of the Month</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Outstanding contribution to emergency fund</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Top Contributor</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">Highest community engagement</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All Recognition
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Rules */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Community Rules</CardTitle>
            <ScrollText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <p className="text-sm">{rule}</p>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View Full Rules
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Polls */}
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Active Polls</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="font-medium text-sm">What should be our next community project?</p>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Community Garden</span>
                    <span>36%</span>
                  </div>
                  <Progress value={36} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Youth Center</span>
                    <span>43%</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Senior Support</span>
                    <span>21%</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Ends on 2024-03-20</p>
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All Polls
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-deepBlue">Community Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Access important community documents</p>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-sm">March 2024 Electricity Bill</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Community Bylaws 2024</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Annual Financial Report 2023</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                View All Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

