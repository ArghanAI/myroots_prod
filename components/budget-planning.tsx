import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BudgetPlanning({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-deepBlue">Budget Planning</CardTitle>
        <CardDescription className="text-deepBlue/70">Plan and allocate your community's budget</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-secondary text-white hover:bg-secondary/90" onClick={() => onSettingsChange(true)}>
          Create Budget Plan
        </Button>
      </CardContent>
    </Card>
  )
}

