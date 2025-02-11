"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Award } from "lucide-react"

interface CreateRecognitionProps {
  onSettingsChange: (hasChanges: boolean) => void
}

export function CreateRecognition({ onSettingsChange }: CreateRecognitionProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSettingsChange(true)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary text-white hover:bg-secondary/90">
          <Award className="mr-2 h-4 w-4" />
          Create Recognition
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Recognition</DialogTitle>
          <DialogDescription>Recognize and celebrate member achievements</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Recognition Title</Label>
              <Input id="title" placeholder="Enter recognition title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member">Member</Label>
              <Select onValueChange={() => onSettingsChange(true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="alice-johnson">Alice Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={() => onSettingsChange(true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outstanding-contribution">Outstanding Contribution</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="community-service">Community Service</SelectItem>
                  <SelectItem value="innovation">Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the achievement or contribution"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date of Achievement</Label>
              <Input id="date" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Recognition</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

