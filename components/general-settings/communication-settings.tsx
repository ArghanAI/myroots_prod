import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CommunicationSettingsProps {
  settings: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    announcementFrequency: string
  }
  onSettingsChange: (field: string, value: any) => void
}

export function CommunicationSettings({ settings, onSettingsChange }: CommunicationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black dark:text-white">Communication Settings</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Configure notification preferences and announcement settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-900 dark:text-white flex-1">Email Notifications</Label>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => onSettingsChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-900 dark:text-white flex-1">SMS Notifications</Label>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => onSettingsChange("smsNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-900 dark:text-white flex-1">Push Notifications</Label>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => onSettingsChange("pushNotifications", checked)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <div>
            <Label className="text-gray-900 dark:text-white">Announcement Frequency</Label>
            <Select
              value={settings.announcementFrequency}
              onValueChange={(value) => onSettingsChange("announcementFrequency", value)}
            >
              <SelectTrigger className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate" className="text-gray-900 dark:text-white">
                  Immediate
                </SelectItem>
                <SelectItem value="daily" className="text-gray-900 dark:text-white">
                  Daily Digest
                </SelectItem>
                <SelectItem value="weekly" className="text-gray-900 dark:text-white">
                  Weekly Summary
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

