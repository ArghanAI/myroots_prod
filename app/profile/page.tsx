"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UserProfile() {
  const router = useRouter()
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    avatar: "/placeholder.svg",
    bio: "I'm a community enthusiast and love to contribute to local initiatives.",
    dateOfBirth: "1990-01-01",
    gender: "male",
    location: "New York, USA",
    occupation: "Software Engineer",
    interests: ["Community Development", "Technology", "Education"],
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },
    privacySettings: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
  })

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [hasChanges])

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleNotificationPreferenceChange = (field: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      notificationPreferences: { ...prev.notificationPreferences, [field]: value },
    }))
    setHasChanges(true)
  }

  const handlePrivacySettingChange = (field: string, value: string | boolean) => {
    setProfile((prev) => ({
      ...prev,
      privacySettings: { ...prev.privacySettings, [field]: value },
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setHasChanges(false)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }))
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10 min-h-screen p-4 md:pl-24">
      <h1 className="text-3xl font-bold mb-6 text-roots-accent font-display">User Profile</h1>
      {showAlert && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6">
        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-deepBlue">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback>
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 text-sm text-deepBlue hover:text-secondary">
                    <Camera className="h-4 w-4" />
                    <span>Change Profile Picture</span>
                  </div>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={profile.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-deepBlue">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={profile.notificationPreferences.email}
                onCheckedChange={(checked) => handleNotificationPreferenceChange("email", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={profile.notificationPreferences.sms}
                onCheckedChange={(checked) => handleNotificationPreferenceChange("sms", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <Switch
                id="pushNotifications"
                checked={profile.notificationPreferences.push}
                onCheckedChange={(checked) => handleNotificationPreferenceChange("push", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-deepBlue">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <Select
                value={profile.privacySettings.profileVisibility}
                onValueChange={(value) => handlePrivacySettingChange("profileVisibility", value)}
              >
                <SelectTrigger id="profileVisibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends-only">Friends Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showEmail">Show Email to Others</Label>
              <Switch
                id="showEmail"
                checked={profile.privacySettings.showEmail}
                onCheckedChange={(checked) => handlePrivacySettingChange("showEmail", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showPhone">Show Phone Number to Others</Label>
              <Switch
                id="showPhone"
                checked={profile.privacySettings.showPhone}
                onCheckedChange={(checked) => handlePrivacySettingChange("showPhone", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}

