import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ImagePlus, X } from "lucide-react"
import { useState } from "react"

interface BasicInformationProps {
  community: {
    name: string
    description: string
    logo: string
    isPrivate: boolean
    monthlyDues?: number
    annualDues?: number
    minAttendance?: number
    probationPeriod?: number
  }
  onSettingsChange: (field: string, value: any) => void
}

export function BasicInformation({ community, onSettingsChange }: BasicInformationProps) {
  const [logo, setLogo] = useState<string | null>(community.logo)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
        onSettingsChange("logo", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update your community's basic details and requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Community Name</Label>
            <Input
              placeholder="Enter community name"
              value={community.name}
              onChange={(e) => onSettingsChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your community"
              value={community.description}
              onChange={(e) => onSettingsChange("description", e.target.value)}
              className="h-24"
            />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-white">Community Logo</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                {logo ? (
                  <>
                    <img src={logo || "/placeholder.svg"} alt="Community logo" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex h-full flex-col items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white hover:bg-black/60"
                          onClick={() => document.getElementById("logo-upload")?.click()}
                        >
                          <ImagePlus className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-400 hover:bg-black/60"
                          onClick={() => {
                            setLogo(null)
                            onSettingsChange("logo", null)
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg flex flex-col items-center justify-center p-4">
                    <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("logo-upload")?.click()}>
                      Upload Logo
                    </Button>
                    <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
                  </div>
                )}
                <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Upload a square logo</p>
                <p>PNG, JPG up to 2MB</p>
                <p className="mt-1">Recommended size: 256x256px</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Privacy Setting</Label>
              <p className="text-sm text-gray-500">
                {community.isPrivate
                  ? "Private - Only approved members can view and join"
                  : "Public - Anyone can view and request to join"}
              </p>
            </div>
            <Switch
              checked={community.isPrivate}
              onCheckedChange={(checked) => onSettingsChange("isPrivate", checked)}
              aria-label="Toggle community privacy"
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <h4 className="text-sm font-medium">Membership Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Monthly Dues ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={community.monthlyDues || ""}
                onChange={(e) => onSettingsChange("monthlyDues", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Annual Dues ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={community.annualDues || ""}
                onChange={(e) => onSettingsChange("annualDues", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Minimum Attendance (%)</Label>
              <Input
                type="number"
                placeholder="75"
                min="0"
                max="100"
                value={community.minAttendance || ""}
                onChange={(e) => onSettingsChange("minAttendance", Number.parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <Label>Probationary Period (months)</Label>
              <Input
                type="number"
                placeholder="3"
                min="0"
                value={community.probationPeriod || ""}
                onChange={(e) => onSettingsChange("probationPeriod", Number.parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

