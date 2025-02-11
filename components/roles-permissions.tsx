"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Shield, Pencil, Trash, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Switch } from "@/components/ui/switch"

interface Role {
  id: string
  name: string
  level: "admin" | "member"
  description: string
  permissions: string[]
  members: string[]
}

export function RolesPermissions() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "President",
      level: "admin",
      description: "Community leader with full administrative access",
      permissions: ["manage_members", "manage_roles", "manage_finances", "manage_events"],
      members: ["John Doe"],
    },
    {
      id: "2",
      name: "Vice President",
      level: "admin",
      description: "Assists the President and acts in their absence",
      permissions: ["manage_members", "manage_roles", "manage_finances", "manage_events"],
      members: ["Jane Smith"],
    },
    {
      id: "3",
      name: "Treasurer",
      level: "admin",
      description: "Manages community finances and transactions",
      permissions: ["manage_finances", "view_members"],
      members: ["Alice Johnson"],
    },
    {
      id: "4",
      name: "Secretary",
      level: "admin",
      description: "Manages documents and meeting minutes",
      permissions: ["manage_documents", "manage_events", "view_members"],
      members: ["Bob Wilson"],
    },
  ])

  const [members] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "President" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Vice President" },
    { id: "3", name: "Alice Johnson", email: "alice@example.com", role: "Treasurer" },
    { id: "4", name: "Bob Wilson", email: "bob@example.com", role: "Secretary" },
    { id: "5", name: "Eva Brown", email: "eva@example.com", role: "Member" },
  ])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="bg-primary/10 border-primary/20 col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-deepBlue">Roles & Permissions</CardTitle>
              <CardDescription className="text-deepBlue/70">
                Manage community roles and their permissions
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-secondary text-white hover:bg-secondary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>Add a new role with specific permissions</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Role Name</Label>
                    <Input placeholder="e.g., Vice President" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permission Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Input placeholder="Role description..." />
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="manage_members">Manage Members</Label>
                        <Switch id="manage_members" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="manage_finances">Manage Finances</Label>
                        <Switch id="manage_finances" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="manage_events">Manage Events</Label>
                        <Switch id="manage_events" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="manage_documents">Manage Documents</Label>
                        <Switch id="manage_documents" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="p-6 bg-white rounded-lg shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{role.name}</h3>
                      <Badge variant={role.level === "admin" ? "default" : "secondary"}>{role.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Permissions Section */}
                  <div>
                    <h4 className="font-medium mb-2">Permissions</h4>
                    <div className="space-y-2">
                      {role.permissions.map((permission) => (
                        <div key={permission} className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-gray-500" />
                          {permission.replace("_", " ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Members Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Members</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Assign Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Member to Role</DialogTitle>
                            <DialogDescription>Select a member to assign to the {role.name} role</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a member" />
                              </SelectTrigger>
                              <SelectContent>
                                {members
                                  .filter((m) => !role.members.includes(m.name))
                                  .map((member) => (
                                    <SelectItem key={member.id} value={member.id}>
                                      {member.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Assign Member</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-2">
                      {role.members.length > 0 ? (
                        role.members.map((member) => (
                          <div
                            key={member}
                            className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-900 rounded-md"
                          >
                            <span className="text-sm">{member}</span>
                            <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No members assigned</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

