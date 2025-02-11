import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function FinancialReports() {
  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-deepBlue">Financial Reports</CardTitle>
        <CardDescription className="text-deepBlue/70">Generate and view financial reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button size="sm" variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Monthly Report
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Quarterly Report
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Annual Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

