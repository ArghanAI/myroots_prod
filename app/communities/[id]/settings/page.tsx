"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GeneralSettings } from "@/components/general-settings"
import { MembershipManagement } from "@/components/membership-management"
import { FinanceSettings } from "@/components/finance-settings"
import { RolesPermissions } from "@/components/roles-permissions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

export default function CommunitySettings() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [hasChanges, setHasChanges] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleTabChange = (value: string) => {
    if (hasChanges) {
      setIsDialogOpen(true)
    } else {
      setActiveTab(value)
    }
  }

  const handleSaveChanges = () => {
    // Implement save changes logic here
    setHasChanges(false)
    alert("Changes saved successfully!")
  }

  const handleDiscardChanges = () => {
    setHasChanges(false)
    setIsDialogOpen(false)
    setActiveTab(activeTab)
  }

  return (
    <div className="py-10 min-h-screen p-4 md:pl-24">
      <div className="mb-6">
        <Link
          href={`/communities/${params.id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-deepBlue font-display">Community Settings</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="bg-white p-1 rounded-lg">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-deepBlue">
            General
          </TabsTrigger>
          <TabsTrigger value="membership" className="data-[state=active]:bg-primary data-[state=active]:text-deepBlue">
            Membership
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-primary data-[state=active]:text-deepBlue">
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-primary data-[state=active]:text-deepBlue">
            Finance
          </TabsTrigger>
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

      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-secondary text-white p-4 rounded-lg shadow-lg">
          <p className="mb-2">You have unsaved changes</p>
          <div className="flex space-x-2">
            <Button onClick={handleSaveChanges} className="bg-primary text-deepBlue hover:bg-primary/90">
              Save Changes
            </Button>
            <Button
              onClick={() => setHasChanges(false)}
              variant="outline"
              className="text-white border-white hover:bg-white/20"
            >
              Discard Changes
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Do you want to save them before leaving this tab?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSaveChanges} className="bg-primary text-deepBlue hover:bg-primary/90">
              Save Changes
            </Button>
            <Button onClick={handleDiscardChanges} variant="outline">
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}

