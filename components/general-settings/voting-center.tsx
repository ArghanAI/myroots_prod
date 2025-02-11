import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, X } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface PollsElectionsProps {
  onSettingsChange: (hasChanges: boolean) => void
}

interface PollOption {
  id: string
  text: string
}

export function VotingCenter({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  const [options, setOptions] = useState<PollOption[]>([])
  const [pollType, setPollType] = useState<"election" | "general">("general")

  const handleAddOption = () => {
    setOptions((prev) => [...prev, { id: uuidv4(), text: "" }])
    onSettingsChange(true)
  }

  const handleOptionChange = (optionId: string, value: string) => {
    setOptions((prev) => prev.map((option) => (option.id === optionId ? { ...option, text: value } : option)))
    onSettingsChange(true)
  }

  const handleRemoveOption = (optionId: string) => {
    setOptions((prev) => prev.filter((option) => option.id !== optionId))
    onSettingsChange(true)
  }

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-purple-800">Voting Center</CardTitle>
        <CardDescription className="text-purple-600">Create and manage polls and elections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Poll/Election
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Poll/Election</DialogTitle>
              <DialogDescription>Set up a new poll or election for your community</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select
                  onValueChange={(value: "election" | "general") => {
                    setPollType(value)
                    onSettingsChange(true)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="election">Election</SelectItem>
                    <SelectItem value="general">General Poll</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input placeholder="Enter poll title" onChange={() => onSettingsChange(true)} />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the purpose of this poll/election"
                  className="min-h-[100px]"
                  onChange={() => onSettingsChange(true)}
                />
              </div>

              {/* Dynamic Options/Roles Section */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>{pollType === "election" ? "Roles" : "Options"}</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddOption}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add {pollType === "election" ? "Role" : "Option"}
                  </Button>
                </div>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={option.id} className="flex gap-2">
                      <Input
                        placeholder={
                          pollType === "election" ? `Role ${index + 1} (e.g., President)` : `Option ${index + 1}`
                        }
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(option.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="anonymous" onCheckedChange={() => onSettingsChange(true)} />
                  <Label htmlFor="anonymous">Anonymous Voting</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="multiple" onCheckedChange={() => onSettingsChange(true)} />
                  <Label htmlFor="multiple">Allow Multiple Selections</Label>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Duration</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="datetime-local" onChange={() => onSettingsChange(true)} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="datetime-local" onChange={() => onSettingsChange(true)} />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Eligible Voters</Label>
                <Select onValueChange={() => onSettingsChange(true)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select eligible voters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="specific-roles">Specific Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Create Poll/Election
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

