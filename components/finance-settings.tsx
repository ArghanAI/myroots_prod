"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionHistory } from "@/components/transaction-history"
import { FinancialReports } from "@/components/financial-reports"
import { FundRequests } from "@/components/fund-requests"
import { BudgetPlanning } from "@/components/budget-planning"

export function FinanceSettings({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-primary/10 border-primary/20 col-span-2">
        <CardHeader>
          <CardTitle className="text-deepBlue">Financial Overview</CardTitle>
          <CardDescription className="text-deepBlue/70">
            View and manage community financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionHistory />
        </CardContent>
      </Card>

      <FinancialReports />
      <FundRequests onSettingsChange={onSettingsChange} />
      <BudgetPlanning onSettingsChange={onSettingsChange} />
    </div>
  )
}

