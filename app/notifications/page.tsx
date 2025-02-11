import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-background to-yellow-50/50 p-4 md:pl-24 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Notifications Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">We're working on bringing you a comprehensive notifications system. Stay tuned!</p>
          <Link href="/dashboard">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

