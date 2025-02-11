"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateFundRequest } from "@/components/create-fund-request"

interface FundRequest {
  id: string
  title: string
  amount: number
  status: "pending" | "approved" | "rejected"
  requestedBy: string
  requestedAt: string
}

export function FundRequests({ onSettingsChange }: { onSettingsChange: (hasChanges: boolean) => void }) {
  const [fundRequests] = useState<FundRequest[]>([
    {
      id: "1",
      title: "Emergency Fund Request",
      amount: 1000,
      status: "pending",
      requestedBy: "John Doe",
      requestedAt: "2024-03-10",
    },
    {
      id: "2",
      title: "Community Event Funding",
      amount: 500,
      status: "approved",
      requestedBy: "Jane Smith",
      requestedAt: "2024-03-08",
    },
  ])

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-deepBlue">Fund Requests</CardTitle>
        <CardDescription className="text-deepBlue/70">Manage and create fund requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CreateFundRequest onSettingsChange={onSettingsChange} />
          {fundRequests.map((request) => (
            <div key={request.id} className="py-4 border-b last:border-b-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{request.title}</p>
                  <p className="text-sm text-gray-500">Requested by: {request.requestedBy}</p>
                  <p className="text-xs text-gray-500">{new Date(request.requestedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${request.amount}</p>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "success"
                        : request.status === "rejected"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

