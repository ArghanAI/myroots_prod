"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Member = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "active" | "pending"
  joinDate: string
}

export function MembershipManagement() {
  const [members] = useState<Member[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", joinDate: "2024-01-01" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
      status: "active",
      joinDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Member",
      status: "pending",
      joinDate: "2024-01-01",
    },
  ])

  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="bg-primary/20 border-primary/30 col-span-2">
        <CardHeader>
          <CardTitle className="text-deepBlue">Member Management</CardTitle>
          <CardDescription className="text-deepBlue/70">View and manage community members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search members..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-secondary text-white hover:bg-secondary/90">Add Member</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt="Avatar" />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>{member.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" className="text-deepBlue hover:text-deepBlue/70">
                        Edit
                      </Button>
                      <Button variant="ghost" className="text-red-500 hover:text-red-700">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Join Requests Card */}
      <Card className="bg-primary/20 border-primary/30">
        <CardHeader>
          <CardTitle className="text-deepBlue">Join Requests</CardTitle>
          <CardDescription className="text-deepBlue/70">Review and manage membership requests</CardDescription>
        </CardHeader>
        <CardContent>{/* Similar structure to members list but for pending requests */}</CardContent>
      </Card>

      {/* Invite Settings Card */}
      <Card className="bg-primary/20 border-primary/30">
        <CardHeader>
          <CardTitle className="text-deepBlue">Invite Settings</CardTitle>
          <CardDescription className="text-deepBlue/70">Configure how new members can join</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="inviteMethod" className="text-deepBlue">
                Invite Method
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select invite method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Add more settings as needed */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

