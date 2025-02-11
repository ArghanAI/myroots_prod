"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { GeneralSettings } from "@/components/general-settings"
import { MembershipManagement } from "@/components/membership-management"
import { RolesPermissions } from "@/components/roles-permissions"
import { FinanceSettings } from "@/components/finance-settings"

export function CommunitySettings() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("general")
  const [hasChanges, setHasChanges] = useState(false)

  const communityId = params.id as string
  const communityName = decodeURIComponent(communityId.replace(/-/g, " "))
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const handleTabChange = (value: string) => {
    if (hasChanges) {
      // Show a confirmation dialog before changing tabs
      if (window.confirm("You have unsaved changes. Are you sure you want to leave this tab?")) {
        setActiveTab(value)
        setHasChanges(false)
      }
    } else {
      setActiveTab(value)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-background to-yellow-50/50 p-4 md:pl-24">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        {hasChanges && <Button onClick={() => alert("Changes saved!")}>Save Changes</Button>}
      </div>
      <h1 className="text-3xl font-bold mb-6">{communityName} Settings</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings onSettingsChange={setHasChanges} />
        </TabsContent>
        <TabsContent value="membership">
          <MembershipManagement />
        </TabsContent>
        <TabsContent value="roles">
          <RolesPermissions />
        </TabsContent>
        <TabsContent value="finance">
          <FinanceSettings onSettingsChange={setHasChanges} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

