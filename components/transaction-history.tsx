"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Download } from "lucide-react"

interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export function TransactionHistory() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "income",
      category: "Dues",
      amount: 500,
      description: "Monthly membership dues",
      date: "2024-03-01",
      status: "completed",
    },
    {
      id: "2",
      type: "expense",
      category: "Events",
      amount: 300,
      description: "Community event supplies",
      date: "2024-03-05",
      status: "completed",
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg text-deepBlue">Transaction History</h3>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="py-4 border-b last:border-b-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={transaction.type === "income" ? "success" : "destructive"}>{transaction.type}</Badge>
                  <span className="text-sm font-medium">${transaction.amount}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <Badge variant="outline">{transaction.category}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

