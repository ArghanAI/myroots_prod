"use client"

import { useState } from "react"
import { BasicInformation } from "./general-settings/basic-information"
import { CommunicationSettings } from "./general-settings/communication-settings"
import { Announcements } from "./general-settings/announcements"
import { VotingCenter } from "./general-settings/voting-center"
import { DocumentManagement } from "./general-settings/document-management"
import { CreateRecognition } from "./general-settings/create-recognition"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface GeneralSettingsProps {
  onSettingsChange: (hasChanges: boolean) => void
}

export function GeneralSettings({ onSettingsChange }: GeneralSettingsProps) {
  const [community, setCommunity] = useState({
    name: "Hometown Association",
    description: "A community dedicated to supporting our hometown development initiatives.",
    logo: "/community-logos/hometown.png",
    isPrivate: true,
  })

  const [communicationSettings, setCommunicationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    announcementFrequency: "daily",
  })

  const handleCommunityChange = (field: string, value: any) => {
    setCommunity((prev) => ({ ...prev, [field]: value }))
    onSettingsChange(true)
  }

  const handleCommunicationSettingsChange = (field: string, value: any) => {
    setCommunicationSettings((prev) => ({ ...prev, [field]: value }))
    onSettingsChange(true)
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="bg-primary/20 border-primary/30">
        <CardHeader>
          <CardTitle className="text-deepBlue">General Settings</CardTitle>
          <CardDescription className="text-deepBlue/70">Manage your community's general settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <BasicInformation community={community} onSettingsChange={handleCommunityChange} />
              <Separator className="md:hidden" />
              <CommunicationSettings
                settings={communicationSettings}
                onSettingsChange={handleCommunicationSettingsChange}
              />
              <Separator className="md:hidden" />
              <div className="bg-blue-50 p-4 rounded-lg">
                <Announcements onSettingsChange={onSettingsChange} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <VotingCenter onSettingsChange={onSettingsChange} />
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4 text-deepBlue">Member Recognition</h3>
                <p className="text-deepBlue/70 mb-4">Recognize and celebrate member achievements</p>
                <CreateRecognition onSettingsChange={onSettingsChange} />
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-800">Danger Zone</h3>
                <p className="text-red-700 mb-4">Irreversible and destructive actions</p>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                  Delete Community
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary/10 border-primary/20 col-span-2">
        <CardHeader>
          <CardTitle className="text-deepBlue">Document Management</CardTitle>
          <CardDescription className="text-deepBlue/70">
            Upload and manage community documents such as bills, receipts, and bylaws
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentManagement onSettingsChange={onSettingsChange} />
        </CardContent>
      </Card>
    </div>
  )
}

