"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "@/components/general-settings"
import { MembershipManagement } from "@/components/membership-management"
import { FinanceSettings } from "@/components/finance-settings"

export default function ManageCommunity() {
  const [hasChanges, setHasChanges] = useState(false)

  return (
    <div className="container mx-auto py-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Manage Community</h1>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-blue-100"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="membership"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-800 dark:data-[state=active]:text-green-100"
          >
            Membership
          </TabsTrigger>
          <TabsTrigger
            value="finance"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800 dark:data-[state=active]:bg-yellow-800 dark:data-[state=active]:text-yellow-100"
          >
            Finance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings onSettingsChange={setHasChanges} />
        </TabsContent>
        <TabsContent value="membership">
          <MembershipManagement />
        </TabsContent>
        <TabsContent value="finance">
          <FinanceSettings onSettingsChange={setHasChanges} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

